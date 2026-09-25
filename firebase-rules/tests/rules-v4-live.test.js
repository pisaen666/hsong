// ทดสอบกฎ v4 ("ไรเดอร์/แม่ค้าเห็นเฉพาะงานของตัวเอง") กับฐานข้อมูล hsong-test จริง ผ่าน REST — ห้ามชี้ไปโปรเจกต์จริง
//   ผู้ทดสอบ (บัตรผ่านนิรนาม): ลูกค้า A, คนแปลกหน้า B, ไรเดอร์ C, ไรเดอร์ D, แม่ค้า M (ร้าน SHOP) + ร้านอื่น OTHER
//   ค่าพิสูจน์ของไรเดอร์/ร้านทดสอบ (staff_keys) เขียนด้วยสิทธิ์แอดมินของ Firebase CLI (--project hsong-test เท่านั้น)
// ต้องมีก่อนรัน: hsong-test ใช้กฎ hsong-test.rules.v4.json, เปิด Anonymous + sign-up, Firebase CLI ล็อกอินอยู่
// วิธีรัน:  LIVE=1 node firebase-rules/tests/rules-v4-live.test.js   (ไม่ใส่ LIVE=1 = ข้าม)
// ท้ายสคริปต์ลบข้อมูลที่สร้างเองทั้งหมด และลบบัตรผ่านทดสอบ
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

if (process.env.LIVE !== "1") {
    console.log("SKIPPED (ต้องต่อ hsong-test จริง: ใส่ LIVE=1)");
    process.exit(0);
}

const PROJECT = "hsong-test";
const BASE = "https://hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app";
const API_KEY = "AIzaSyBlniAAoBIqN63Bpak9_SvHEP0WF188Mtw";   // web config ของ hsong-test (ไม่ใช่ความลับ)
if (!BASE.includes("hsong-test") || PROJECT !== "hsong-test") throw new Error("ต้องเป็น hsong-test เท่านั้น");

const RUN = "ZZV4" + Date.now().toString(36).toUpperCase();
let pass = 0, fail = 0;

function cli(args) {
    return execSync("firebase " + args + " --project " + PROJECT, { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, MSYS_NO_PATHCONV: "1" } }).toString();
}
function adminUpdate(obj) {
    const f = path.join(os.tmpdir(), RUN + "-" + Date.now() + ".json");
    fs.writeFileSync(f, JSON.stringify(obj));
    try { cli("database:update / \"" + f + "\" --force"); } finally { fs.unlinkSync(f); }
}
async function anonUser() {
    const r = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, {
        method: "POST", headers: { "Content-Type": "application/json", "Referer": "https://hsong-test.web.app/" },
        body: JSON.stringify({ returnSecureToken: true })
    });
    const j = await r.json();
    if (!j.idToken) throw new Error("ขอบัตรผ่านนิรนามไม่ได้: " + JSON.stringify(j.error || j).slice(0, 200));
    return { uid: j.localId, token: j.idToken };
}
async function deleteUser(u) {
    await fetch("https://identitytoolkit.googleapis.com/v1/accounts:delete?key=" + API_KEY, {
        method: "POST", headers: { "Content-Type": "application/json", "Referer": "https://hsong-test.web.app/" },
        body: JSON.stringify({ idToken: u.token })
    }).catch(() => { });
}
async function call(user, method, p, body) {
    const q = user ? "?auth=" + encodeURIComponent(user.token) : "";
    const res = await fetch(BASE + "/" + p + ".json" + q, {
        method, headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    let text = ""; try { text = await res.text(); } catch (e) { }
    return { status: res.status, text };
}
async function expect(name, want, user, method, p, body) {
    const r = await call(user, method, p, body);
    const ok = (r.status === 200) === want;
    console.log((ok ? "PASS " : "FAIL ") + name + "  → HTTP " + r.status + (ok ? "" : "  (ต้องการ " + (want ? "อนุญาต" : "ปฏิเสธ") + ") " + r.text.slice(0, 120)));
    ok ? pass++ : fail++;
    return r;
}

(async () => {
    const A = await anonUser(), B = await anonUser(), C = await anonUser(), D = await anonUser(), M = await anonUser();
    const O1 = RUN + "O1", SHOP = RUN + "SHOP", OTHER = RUN + "OTHER", RC = RUN + "RC", RD = RUN + "RD";
    const PC = "c".repeat(64), PD = "d".repeat(64), PM = "e".repeat(64);
    const order = {
        orderId: "#" + O1, status: "picking", customerUid: A.uid, customerName: "ทดสอบ", customerPhone: "0800000000", address: "บ้านทดสอบ",
        stalls: [{ stallId: SHOP, name: "ร้านทดสอบ", items: [{ name: "หมู (กก.)", unit: "กก.", price: 100, qty: 1 }] },
                 { stallId: OTHER, name: "ร้านอื่น", items: [{ name: "ไข่", price: 50, qty: 1 }] }]
    };
    const job = { orderId: "#" + O1, orderType: "HUB_CONSOLIDATED", pickup: "ฮับรวมตลาดบ้านบึง", area: "บ้านบึง", fee: 40, createdAt: Date.now(), status: "open" };
    const stallCopy = { orderId: "#" + O1, savedAt: Date.now(), stallIndex: 0, stall: order.stalls[0] };
    const claim = (sid, name) => ({
        [`orders/${O1}/assignedRiderId`]: sid, [`orders/${O1}/riderName`]: name, [`orders/${O1}/riderClaimedAt`]: 1,
        [`rider_jobs/${O1}/claimedBy`]: sid, [`rider_jobs/${O1}/status`]: "claimed", [`rider_jobs/${O1}/claimedAt`]: 1
    });
    try {
        adminUpdate({ [`staff_keys/rider/${RC}`]: PC, [`staff_keys/rider/${RD}`]: PD, [`staff_keys/merchant/${SHOP}`]: PM });

        console.log("== ลูกค้าสั่งซื้อ: สร้างออเดอร์ + ใบงานไรเดอร์ + สำเนาของร้าน");
        await expect("A สร้างออเดอร์ได้", true, A, "PUT", `orders/${O1}`, order);
        await expect("B สร้างใบงานให้ออเดอร์ของ A ไม่ได้", false, B, "PUT", `rider_jobs/${O1}`, job);
        await expect("A ใส่ที่อยู่ลูกค้าในใบงานไม่ได้ (ช่องไม่อนุญาต)", false, A, "PUT", `rider_jobs/${O1}`, { ...job, address: "บ้านทดสอบ" });
        await expect("A สร้างใบงานแบบย่อได้", true, A, "PUT", `rider_jobs/${O1}`, job);
        await expect("A สร้างสำเนาของร้านได้", true, A, "PUT", `stall_orders/${SHOP}/${O1}`, stallCopy);
        await expect("A ใส่ชื่อลูกค้าในสำเนาของร้านไม่ได้", false, A, "PUT", `stall_orders/${OTHER}/${O1}`, { ...stallCopy, customerName: "ทดสอบ" });

        console.log("== ไรเดอร์/แม่ค้าล็อกอิน (ฐานข้อมูลตรวจรหัสผ่าน)");
        await expect("C เปิดสิทธิ์ไรเดอร์", true, C, "PUT", `staff_sessions/${C.uid}`, { role: "rider", id: RC, proof: PC, at: 1 });
        await expect("D เปิดสิทธิ์ไรเดอร์", true, D, "PUT", `staff_sessions/${D.uid}`, { role: "rider", id: RD, proof: PD, at: 1 });
        await expect("M เปิดสิทธิ์แม่ค้า", true, M, "PUT", `staff_sessions/${M.uid}`, { role: "merchant", id: SHOP, proof: PM, at: 1 });

        console.log("== ไรเดอร์: เห็นใบงานย่อ แต่เห็นออเดอร์เต็มเฉพาะงานที่รับแล้ว");
        await expect("C ดึงรายการออเดอร์ทั้งหมดไม่ได้แล้ว (v4)", false, C, "GET", `orders`);
        await expect("C ดูใบงานรอรับได้", true, C, "GET", `rider_jobs`);
        await expect("B (ไม่ใช่ไรเดอร์) ดูใบงานไม่ได้", false, B, "GET", `rider_jobs`);
        await expect("M (แม่ค้า) ดูใบงานไรเดอร์ไม่ได้", false, M, "GET", `rider_jobs`);
        await expect("C ยังอ่านออเดอร์เต็มไม่ได้ก่อนกดรับ", false, C, "GET", `orders/${O1}`);
        await expect("C ใส่ชื่อไรเดอร์ D ในงานไม่ได้", false, C, "PATCH", ``, claim(RD, "D"));
        await expect("C กดรับงานได้", true, C, "PATCH", ``, claim(RC, "C"));
        await expect("D กดรับงานที่ C รับไปแล้วไม่ได้", false, D, "PATCH", ``, claim(RD, "D"));
        await expect("C อ่านออเดอร์เต็ม (ชื่อ/ที่อยู่) ได้หลังรับงาน", true, C, "GET", `orders/${O1}`);
        await expect("D อ่านออเดอร์ของ C ไม่ได้", false, D, "GET", `orders/${O1}`);
        await expect("C อัปเดตสถานะงานของตัวเองได้", true, C, "PATCH", `orders/${O1}`, { status: "delivering" });
        await expect("C โอนงานให้ D เองไม่ได้", false, C, "PATCH", `orders/${O1}`, { assignedRiderId: RD });
        await expect("C แจ้งสถานะให้แม่ค้าเห็นได้", true, C, "PUT", `stall_orders/${SHOP}/${O1}/status`, "delivering");
        await expect("D แจ้งสถานะแทนไม่ได้", false, D, "PUT", `stall_orders/${SHOP}/${O1}/status`, "delivered");
        await expect("C ลบออเดอร์ไม่ได้", false, C, "DELETE", `orders/${O1}`);
        await expect("C คืนงานได้", true, C, "PATCH", ``, { [`orders/${O1}/assignedRiderId`]: null, [`orders/${O1}/riderName`]: null, [`rider_jobs/${O1}/claimedBy`]: null, [`rider_jobs/${O1}/status`]: "open", [`rider_jobs/${O1}/claimedAt`]: null });
        await expect("C อ่านออเดอร์ไม่ได้แล้วหลังคืนงาน", false, C, "GET", `orders/${O1}`);
        await expect("D รับงานที่ถูกคืนได้", true, D, "PATCH", ``, claim(RD, "D"));
        await expect("D ปิดใบงาน (ส่งเสร็จ) ได้", true, D, "PUT", `rider_jobs/${O1}/status`, "done");
        await expect("C ปิดใบงานของ D ไม่ได้", false, C, "PUT", `rider_jobs/${O1}/status`, "open");

        console.log("== แม่ค้า: เห็นแค่ของของร้านตัวเอง");
        await expect("M อ่านออเดอร์เต็ม (ชื่อ/เบอร์/ที่อยู่ลูกค้า) ไม่ได้", false, M, "GET", `orders/${O1}`);
        await expect("M ดูสำเนาของร้านตัวเองได้", true, M, "GET", `stall_orders/${SHOP}`);
        await expect("M ดูสำเนาของร้านอื่นไม่ได้", false, M, "GET", `stall_orders/${OTHER}`);
        await expect("M บันทึกน้ำหนักในกลุ่มของร้านตัวเอง (ออเดอร์เต็ม) ได้", true, M, "PATCH", ``, { [`orders/${O1}/stalls/0/items/0/weighedQty`]: 0.9, [`stall_orders/${SHOP}/${O1}/stall/items/0/weighedQty`]: 0.9 });
        await expect("M แก้กลุ่มของร้านอื่นไม่ได้", false, M, "PATCH", `orders/${O1}/stalls/1`, { ready: true });
        await expect("M แก้สถานะ/ยอดเงินของออเดอร์ไม่ได้", false, M, "PATCH", `orders/${O1}`, { refundCashTotal: 999 });
        await expect("M เปลี่ยนเลขร้านในกลุ่มของตัวเองไม่ได้", false, M, "PATCH", `orders/${O1}/stalls/0`, { stallId: OTHER });
        await expect("M สร้างสำเนาออเดอร์ปลอมให้ร้านตัวเองไม่ได้", false, M, "PUT", `stall_orders/${SHOP}/${RUN}FAKE`, stallCopy);
        await expect("C (ไรเดอร์) ดูสำเนาของร้านไม่ได้", false, C, "GET", `stall_orders/${SHOP}`);

        console.log("== ลูกค้ายังใช้ได้เหมือนเดิม");
        await expect("A อ่านออเดอร์ของตัวเองได้ (เห็นน้ำหนักที่แม่ค้าบันทึก)", true, A, "GET", `orders/${O1}/stalls/0/items/0/weighedQty`);
        await expect("A บันทึกออเดอร์ทั้งใบ (คงชื่อไรเดอร์เดิม) ได้", true, A, "PATCH", `orders/${O1}`, { assignedRiderId: RD, note: "ขอบคุณ" });
        await expect("A ใส่ไรเดอร์เองไม่ได้", false, A, "PATCH", `orders/${O1}`, { assignedRiderId: RC });
    } finally {
        console.log("\n== ล้างข้อมูลทดสอบรอบนี้");
        const clean = {};
        [`orders/${O1}`, `orders/${RUN}FAKE`, `rider_jobs/${O1}`, `stall_orders/${SHOP}`, `stall_orders/${OTHER}`, `staff_keys/rider/${RC}`, `staff_keys/rider/${RD}`, `staff_keys/merchant/${SHOP}`,
         `staff_sessions/${C.uid}`, `staff_sessions/${D.uid}`, `staff_sessions/${M.uid}`].forEach(p => { clean[p] = null; });
        try { adminUpdate(clean); } catch (e) { console.log("  (ล้างไม่สำเร็จ: " + e.message.split("\n")[0] + ")"); }
        await Promise.all([A, B, C, D, M].map(deleteUser));
        console.log("ลบข้อมูลและบัตรผ่านทดสอบแล้ว");
    }
    console.log(`\n${fail ? fail + " FAILED" : "ALL PASSED"} (${pass} pass, ${fail} fail)`);
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e.message); process.exit(1); });
