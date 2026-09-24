// ทดสอบกฎ v3 ("บัตรผ่าน" ทุกเครื่อง) กับฐานข้อมูล hsong-test จริง ผ่าน REST — ห้ามชี้ไปโปรเจกต์จริง
//   ผู้ทดสอบ: ลูกค้า A, คนแปลกหน้า B, ไรเดอร์ C (บัตรผ่านนิรนาม 3 ใบ) + คนไม่มีบัตรผ่าน
//   ข้อมูลตั้งต้น (ค่าพิสูจน์ของไรเดอร์ทดสอบ) เขียนด้วยสิทธิ์แอดมินของ Firebase CLI (--project hsong-test เท่านั้น)
//
// ต้องมีก่อนรัน:
//   1) hsong-test เปิด Anonymous sign-in แล้ว และเปิด "Enable create (sign-up)" แล้ว
//   2) กฎ hsong-test.rules.v3.json ถูก deploy ไปที่ hsong-test แล้ว
//   3) Firebase CLI ล็อกอินอยู่ (firebase login:list)
// วิธีรัน:  LIVE=1 node firebase-rules/tests/rules-v3-live.test.js
//   (ไม่ใส่ LIVE=1 จะข้ามไปเฉย ๆ เพื่อให้ชุดทดสอบแบบออฟไลน์รันผ่านได้)
// ท้ายสคริปต์ลบข้อมูลที่สร้างเองทั้งหมด และลบบัตรผ่านทดสอบทั้ง 3 ใบ
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

const RUN = "ZZV3" + Date.now().toString(36).toUpperCase();
let pass = 0, fail = 0;

function cli(args) {
    return execSync("firebase " + args + " --project " + PROJECT, { stdio: ["ignore", "pipe", "pipe"] }).toString();
}
function adminUpdate(obj) {
    const f = path.join(os.tmpdir(), RUN + "-" + Date.now() + ".json");
    fs.writeFileSync(f, JSON.stringify(obj));
    try { cli("database:update / \"" + f + "\" --force"); } finally { fs.unlinkSync(f); }
}
function adminRemove(p) { try { cli("database:remove /" + p + " --force"); } catch (e) { console.log("  (ลบ " + p + " ไม่สำเร็จ: " + e.message.split("\n")[0] + ")"); } }

async function anonUser() {
    const r = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, {
        method: "POST", headers: { "Content-Type": "application/json", "Referer": "https://hsong-test.web.app/" },
        body: JSON.stringify({ returnSecureToken: true })
    });
    const j = await r.json();
    if (!j.idToken) throw new Error("ขอบัตรผ่านนิรนามไม่ได้ (เปิด Anonymous + sign-up ใน hsong-test หรือยัง?): " + JSON.stringify(j.error || j).slice(0, 200));
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
    const allowed = r.status === 200;
    const ok = allowed === want;
    console.log((ok ? "PASS " : "FAIL ") + name + "  → HTTP " + r.status + (ok ? "" : "  (ต้องการ " + (want ? "อนุญาต" : "ปฏิเสธ") + ") " + r.text.slice(0, 120)));
    ok ? pass++ : fail++;
    return r;
}

(async () => {
    const A = await anonUser(), B = await anonUser(), C = await anonUser();
    const O1 = RUN + "O1", RD = RUN + "RD", PROOF = "a".repeat(64), CODE = "K7MQ2X";
    const order = extra => Object.assign({ orderId: "#" + O1, status: "picking", customerName: "ทดสอบ", customerUid: A.uid }, extra || {});
    try {
        console.log("== ลูกค้าสร้างออเดอร์");
        await expect("A สร้างออเดอร์ของตัวเองได้", true, A, "PUT", `orders/${O1}`, order());
        await expect("A สร้างออเดอร์โดยใส่ uid คนอื่นไม่ได้", false, A, "PUT", `orders/${RUN}O2`, order({ orderId: "#" + RUN + "O2", customerUid: B.uid }));
        await expect("A สร้างออเดอร์ที่ไม่มีเจ้าของไม่ได้", false, A, "PUT", `orders/${RUN}O3`, { orderId: "#" + RUN + "O3", status: "picking" });
        await expect("ไม่มีบัตรผ่าน สร้างออเดอร์ไม่ได้", false, null, "PUT", `orders/${RUN}O4`, order({ orderId: "#" + RUN + "O4" }));

        console.log("== ใครอ่านออเดอร์ได้");
        await expect("A อ่านออเดอร์ของตัวเองได้", true, A, "GET", `orders/${O1}`);
        await expect("B (คนแปลกหน้า) อ่านออเดอร์ของ A ไม่ได้", false, B, "GET", `orders/${O1}`);
        await expect("ไม่มีบัตรผ่าน อ่านออเดอร์ไม่ได้", false, null, "GET", `orders/${O1}`);
        await expect("B ดึงรายการออเดอร์ทั้งหมดไม่ได้", false, B, "GET", `orders`);
        await expect("A (ลูกค้า) ก็ดึงรายการทั้งหมดไม่ได้", false, A, "GET", `orders`);

        console.log("== ใครแก้/ลบออเดอร์ได้");
        await expect("A แก้สถานะออเดอร์ของตัวเองได้", true, A, "PATCH", `orders/${O1}`, { note: "ขอบคุณ" });
        await expect("A เปลี่ยนเจ้าของออเดอร์ (customerUid) ไม่ได้", false, A, "PATCH", `orders/${O1}`, { customerUid: B.uid });
        await expect("A ลบออเดอร์ไม่ได้ (เจ้าของตลาดเท่านั้น)", false, A, "DELETE", `orders/${O1}`);
        await expect("B แก้ที่อยู่ออเดอร์ของ A ไม่ได้", false, B, "PATCH", `orders/${O1}`, { address: "บ้านโจร" });
        await expect("B ลบออเดอร์ของ A ไม่ได้", false, B, "DELETE", `orders/${O1}`);

        console.log("== รหัสติดตาม (ลิงก์ส่งต่อ)");
        await expect("B เขียนรหัสติดตามของออเดอร์ A ไม่ได้", false, B, "PUT", `order_codes/${O1}`, "AAAAAA");
        await expect("A เก็บรหัสติดตามของออเดอร์ตัวเองได้", true, A, "PUT", `order_codes/${O1}`, CODE);
        await expect("A เปลี่ยนรหัสติดตามทีหลังไม่ได้", false, A, "PUT", `order_codes/${O1}`, "BBBBBB");
        await expect("B อ่านรหัสติดตามไม่ได้", false, B, "GET", `order_codes/${O1}`);
        await expect("B ลงชื่อผู้ชมด้วยรหัสผิดไม่ได้", false, B, "PUT", `order_viewers/${O1}/${B.uid}`, "ZZZZZZ");
        await expect("B ยังอ่านออเดอร์ไม่ได้ (รหัสผิด)", false, B, "GET", `orders/${O1}`);
        await expect("B ลงชื่อผู้ชมด้วยรหัสถูกได้", true, B, "PUT", `order_viewers/${O1}/${B.uid}`, CODE);
        await expect("B อ่านออเดอร์ได้แล้ว (มีลิงก์+รหัสถูก)", true, B, "GET", `orders/${O1}`);
        await expect("B ยังแก้ออเดอร์ไม่ได้ (ดูได้อย่างเดียว)", false, B, "PATCH", `orders/${O1}`, { status: "delivered" });
        await expect("C ลงชื่อแทน B (uid คนอื่น) ไม่ได้", false, C, "PUT", `order_viewers/${O1}/${B.uid}`, CODE);

        console.log("== ตะกร้า");
        await expect("A เขียนตะกร้าของตัวเองได้", true, A, "PUT", `carts/${A.uid}`, { items: [{ name: "หมู" }], updatedAt: 1 });
        await expect("B อ่านตะกร้าของ A ไม่ได้", false, B, "GET", `carts/${A.uid}`);
        await expect("B เขียนตะกร้าของ A ไม่ได้", false, B, "PUT", `carts/${A.uid}`, { items: [] });
        await expect("B ดูรายชื่อตะกร้าทั้งหมดไม่ได้", false, B, "GET", `carts`);

        console.log("== ไรเดอร์ (ต้องพิสูจน์รหัสผ่านที่ฐานข้อมูล)");
        adminUpdate({ ["staff_keys/rider/" + RD]: PROOF });
        await expect("C ไม่มีสิทธิ์ดึงรายการออเดอร์ก่อนล็อกอิน", false, C, "GET", `orders`);
        await expect("C เปิดสิทธิ์ด้วยค่าพิสูจน์ผิดไม่ได้ (รหัสผ่านผิด)", false, C, "PUT", `staff_sessions/${C.uid}`, { role: "rider", id: RD, proof: "b".repeat(64), at: 1 });
        await expect("C อ้างบทบาท admin ไม่ได้", false, C, "PUT", `staff_sessions/${C.uid}`, { role: "admin", id: RD, proof: PROOF, at: 1 });
        await expect("C เขียนสิทธิ์ให้ uid คนอื่นไม่ได้", false, C, "PUT", `staff_sessions/${B.uid}`, { role: "rider", id: RD, proof: PROOF, at: 1 });
        await expect("C อ่านค่าพิสูจน์ (staff_keys) ไม่ได้", false, C, "GET", `staff_keys`);
        await expect("C เปิดสิทธิ์ด้วยค่าพิสูจน์ถูกได้ (รหัสผ่านถูก)", true, C, "PUT", `staff_sessions/${C.uid}`, { role: "rider", id: RD, proof: PROOF, at: 1 });
        await expect("C (ไรเดอร์) ดึงรายการออเดอร์ได้", true, C, "GET", `orders`);
        await expect("C (ไรเดอร์) อัปเดตสถานะออเดอร์ได้", true, C, "PATCH", `orders/${O1}`, { status: "delivering" });
        await expect("C (ไรเดอร์) เปลี่ยนเจ้าของออเดอร์ไม่ได้", false, C, "PATCH", `orders/${O1}`, { customerUid: C.uid });
        await expect("C (ไรเดอร์) ลบออเดอร์ไม่ได้", false, C, "DELETE", `orders/${O1}`);
        adminUpdate({ ["staff_keys/rider/" + RD]: "c".repeat(64) });   // เจ้าของสร้างรหัสผ่านใหม่
        await expect("หลังเจ้าของสร้างรหัสใหม่ C หมดสิทธิ์ดึงรายการทันที", false, C, "GET", `orders`);
        await expect("C ออกจากระบบ (ลบสิทธิ์ของตัวเอง) ได้", true, C, "DELETE", `staff_sessions/${C.uid}`);
    } finally {
        console.log("\n== ล้างข้อมูลทดสอบรอบนี้");
        [`orders/${O1}`, `order_codes/${O1}`, `order_viewers/${O1}`, `carts/${A.uid}`, `staff_sessions/${C.uid}`, `staff_keys/rider/${RD}`].forEach(adminRemove);
        await Promise.all([A, B, C].map(deleteUser));
        console.log("ลบข้อมูลและบัตรผ่านทดสอบแล้ว");
    }
    console.log(`\n${fail ? fail + " FAILED" : "ALL PASSED"} (${pass} pass, ${fail} fail)`);
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e.message); process.exit(1); });
