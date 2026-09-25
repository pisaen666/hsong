// ทดสอบกฎ v6 ("ซ่อนข้อมูลส่วนตัวร้านค้า") กับฐานข้อมูล hsong-test จริง ผ่าน REST — ห้ามชี้ไปโปรเจกต์จริง
//   ผู้ทดสอบ (บัตรผ่านนิรนาม): คนแปลกหน้า B, แม่ค้า M (ร้าน SHOP), แม่ค้า N (ร้าน OTHER), ไรเดอร์ R
//   ค่าพิสูจน์ของร้าน/ไรเดอร์ทดสอบ (staff_keys) เขียนด้วยสิทธิ์แอดมินของ Firebase CLI (--project hsong-test เท่านั้น)
// ต้องมีก่อนรัน: hsong-test ใช้กฎ hsong-test.rules.v6.json, เปิด Anonymous + sign-up, Firebase CLI ล็อกอินอยู่
// วิธีรัน:  LIVE=1 node firebase-rules/tests/rules-v6-live.test.js   (ไม่ใส่ LIVE=1 = ข้าม)
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

const RUN = "ZZV6" + Date.now().toString(36).toUpperCase();
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
    const B = await anonUser(), M = await anonUser(), N = await anonUser(), R = await anonUser();
    const SHOP = RUN + "SHOP", OTHER = RUN + "OTHER", RC = RUN + "RC";
    const PM = "e".repeat(64), PN = "f".repeat(64), PR = "c".repeat(64);
    const H = require("crypto").createHash("sha256").update(RUN).digest("hex");
    const stallData = id => ({ stallId: id, stallName: "ร้าน " + id, phone: "0811111111", bankName: "กสิกร", bankAccountNo: "1234567890", ownerName: "ชื่อจริง นามสกุล", owner1Nickname: "ป้าแดง" });
    const pubStall = id => ({ stallId: id, stallName: "ร้าน " + id, owner1Nickname: "ป้าแดง", isClosed: false, category: "ผัก" });
    try {
        adminUpdate({
            [`staff_keys/merchant/${SHOP}`]: PM, [`staff_keys/merchant/${OTHER}`]: PN, [`staff_keys/rider/${RC}`]: PR,
            [`merchant_applications/${SHOP}`]: { id: SHOP, status: "approved", accessCode: SHOP, loginSalt: "ab".repeat(16), loginHash: "1".repeat(64), stallData: stallData(SHOP) },
            [`merchant_applications/${OTHER}`]: { id: OTHER, status: "approved", accessCode: OTHER, stallData: stallData(OTHER) },
            [`custom_market_stalls/${SHOP}`]: pubStall(SHOP), [`custom_market_stalls/${OTHER}`]: pubStall(OTHER),
            [`stall_catalog_database/${SHOP}`]: [{ name: "ผักบุ้ง", price: 10 }], [`stall_catalog_database/${OTHER}`]: [{ name: "ไข่", price: 5 }],
            [`stall_contacts/${SHOP}`]: { phone: "0811111111", name: "ป้าแดง" },
            [`merchant_public/${SHOP}`]: { status: "approved", loginSalt: "ab".repeat(16) }
        });
        await expect("M ล็อกอินร้าน (ฐานข้อมูลตรวจรหัส) ได้", true, M, "PUT", `staff_sessions/${M.uid}`, { role: "merchant", id: SHOP, proof: PM, at: 1 });
        await expect("ล็อกอินร้าน SHOP ด้วยค่าพิสูจน์ของร้านอื่นไม่ได้", false, B, "PUT", `staff_sessions/${B.uid}`, { role: "merchant", id: SHOP, proof: PN, at: 1 });
        await expect("N ล็อกอินร้าน OTHER ได้", true, N, "PUT", `staff_sessions/${N.uid}`, { role: "merchant", id: OTHER, proof: PN, at: 1 });
        await expect("R ล็อกอินไรเดอร์ได้", true, R, "PUT", `staff_sessions/${R.uid}`, { role: "rider", id: RC, proof: PR, at: 1 });

        console.log("== ใบสมัครร้าน (บัญชีธนาคาร เบอร์ ชื่อจริง)");
        await expect("B (คนแปลกหน้า) อ่านใบสมัครร้านไม่ได้", false, B, "GET", `merchant_applications/${SHOP}`);
        await expect("B ดูรายการใบสมัครร้านไม่ได้", false, B, "GET", `merchant_applications`);
        await expect("R (ไรเดอร์) อ่านใบสมัครร้านไม่ได้", false, R, "GET", `merchant_applications/${SHOP}`);
        await expect("M อ่านใบสมัครของร้านตัวเองได้", true, M, "GET", `merchant_applications/${SHOP}`);
        await expect("M อ่านใบสมัครร้านอื่นไม่ได้", false, M, "GET", `merchant_applications/${OTHER}`);
        await expect("M แก้เลขบัญชีร้านตัวเองได้", true, M, "PUT", `merchant_applications/${SHOP}/stallData/bankAccountNo`, "9999999999");
        await expect("M แก้สถานะใบสมัครตัวเองไม่ได้", false, M, "PUT", `merchant_applications/${SHOP}/status`, "pending");
        await expect("M แก้ค่ารหัสผ่านตัวเองไม่ได้", false, M, "PUT", `merchant_applications/${SHOP}/loginHash`, "0".repeat(64));
        await expect("M แก้เลขบัญชีร้านอื่นไม่ได้ (กันโกงเงินโอน)", false, M, "PUT", `merchant_applications/${OTHER}/stallData/bankAccountNo`, "9999999999");
        await expect("B แก้เลขบัญชีร้านไม่ได้", false, B, "PUT", `merchant_applications/${SHOP}/stallData/bankAccountNo`, "9999999999");

        console.log("== หน้าร้านที่ลูกค้าเห็น");
        await expect("B อ่านหน้าร้านได้ (ลูกค้าต้องเห็นร้าน)", true, B, "GET", `custom_market_stalls/${SHOP}`);
        await expect("M เปิด/ปิดร้านตัวเองได้", true, M, "PUT", `custom_market_stalls/${SHOP}/isClosed`, true);
        await expect("M ใส่เลขบัญชีในหน้าร้านไม่ได้ (ห้ามข้อมูลส่วนตัวในข้อมูลที่เปิดอ่าน)", false, M, "PUT", `custom_market_stalls/${SHOP}/bankAccountNo`, "123");
        await expect("M ใส่เบอร์ในหน้าร้านไม่ได้", false, M, "PUT", `custom_market_stalls/${SHOP}/phone`, "0811111111");
        await expect("M ใส่ชื่อจริงในหน้าร้านไม่ได้", false, M, "PUT", `custom_market_stalls/${SHOP}/ownerName`, "ชื่อจริง");
        await expect("M ใส่ค่ารหัสผ่านในหน้าร้านไม่ได้", false, M, "PUT", `custom_market_stalls/${SHOP}/loginHash`, "0".repeat(64));
        await expect("M แก้หน้าร้านอื่นไม่ได้", false, M, "PUT", `custom_market_stalls/${OTHER}/isClosed`, true);
        await expect("B แก้หน้าร้านไม่ได้", false, B, "PUT", `custom_market_stalls/${SHOP}/stallName`, "ร้านปลอม");
        await expect("M สร้างร้านใหม่เองไม่ได้", false, M, "PUT", `custom_market_stalls/${RUN}NEW`, pubStall(RUN + "NEW"));
        await expect("M แก้สินค้า/ราคาร้านตัวเองได้", true, M, "PUT", `stall_catalog_database/${SHOP}`, [{ name: "ผักบุ้ง", price: 12 }]);
        await expect("M แก้สินค้า/ราคาร้านอื่นไม่ได้", false, M, "PUT", `stall_catalog_database/${OTHER}`, [{ name: "ไข่", price: 1 }]);
        await expect("B แก้สินค้า/ราคาไม่ได้", false, B, "PUT", `stall_catalog_database/${SHOP}`, [{ name: "ผักบุ้ง", price: 1 }]);

        console.log("== เบอร์หลักของร้าน (เฉพาะไรเดอร์ที่ล็อกอิน)");
        await expect("B อ่านเบอร์ร้านไม่ได้", false, B, "GET", `stall_contacts/${SHOP}`);
        await expect("R (ไรเดอร์ที่ล็อกอิน) อ่านเบอร์ร้านได้", true, R, "GET", `stall_contacts/${SHOP}`);
        await expect("N (ร้านอื่น) อ่านเบอร์ร้านนี้ไม่ได้", false, N, "GET", `stall_contacts/${SHOP}`);
        await expect("M อ่านเบอร์ร้านตัวเองได้", true, M, "GET", `stall_contacts/${SHOP}`);
        await expect("M แก้เบอร์ร้านตัวเองได้", true, M, "PUT", `stall_contacts/${SHOP}`, { phone: "0822222222", name: "ป้าแดง" });
        await expect("M แก้เบอร์ร้านอื่นไม่ได้", false, M, "PUT", `stall_contacts/${OTHER}`, { phone: "0833333333" });
        await expect("R แก้เบอร์ร้านไม่ได้", false, R, "PUT", `stall_contacts/${SHOP}`, { phone: "0844444444" });
        await expect("ใส่ข้อมูลอื่น (เช่น เลขบัญชี) ในเบอร์ร้านไม่ได้", false, M, "PUT", `stall_contacts/${SHOP}`, { phone: "0822222222", bankAccountNo: "1" });

        console.log("== ข้อมูลสาธารณะสำหรับล็อกอิน / เช็กสถานะ");
        const pub = await expect("B อ่าน merchant_public ของร้านได้", true, B, "GET", `merchant_public/${SHOP}`);
        const po = JSON.parse(pub.text || "{}");
        const clean = Object.keys(po).every(k => ["status", "loginSalt", "updatedAt"].includes(k));
        console.log((clean ? "PASS " : "FAIL ") + "merchant_public มีแค่สถานะ + salt"); clean ? pass++ : fail++;
        await expect("B แก้ merchant_public ของร้านที่อนุมัติแล้วไม่ได้", false, B, "PUT", `merchant_public/${SHOP}`, { status: "pending" });
        await expect("ผู้สมัครสร้างสถานะด้วยค่าแฮชเบอร์ได้", true, B, "PUT", `merchant_phone_status/${H}`, { code: RUN + "APP", status: "pending" });
        await expect("แอบอนุมัติด้วยค่าแฮชเบอร์ไม่ได้", false, B, "PUT", `merchant_phone_status/${H}`, { code: RUN + "APP", status: "approved" });
        await expect("ผู้สมัครส่งใบสมัครร้านใหม่ได้ (pending)", true, B, "PUT", `merchant_applications/${RUN}NEWAPP`, { id: `${RUN}NEWAPP`, status: "pending", stallData: { stallName: "x" } });
        await expect("ผู้สมัครแก้ใบสมัครที่ส่งแล้วไม่ได้ (v6: ต้องล็อกอินเป็นร้าน)", false, B, "PUT", `merchant_applications/${RUN}NEWAPP/stallData/stallName`, "y");
    } finally {
        console.log("\n== ล้างข้อมูลทดสอบรอบนี้");
        const clean = {};
        [`staff_keys/merchant/${SHOP}`, `staff_keys/merchant/${OTHER}`, `staff_keys/rider/${RC}`, `merchant_applications/${SHOP}`, `merchant_applications/${OTHER}`, `merchant_applications/${RUN}NEWAPP`,
            `custom_market_stalls/${SHOP}`, `custom_market_stalls/${OTHER}`, `stall_catalog_database/${SHOP}`, `stall_catalog_database/${OTHER}`, `stall_contacts/${SHOP}`, `stall_contacts/${OTHER}`,
            `merchant_public/${SHOP}`, `merchant_phone_status/${H}`, `staff_sessions/${M.uid}`, `staff_sessions/${N.uid}`, `staff_sessions/${R.uid}`].forEach(p => { clean[p] = null; });
        try { adminUpdate(clean); } catch (e) { console.log("  (ล้างไม่สำเร็จ: " + e.message.split("\n")[0] + ")"); }
        await Promise.all([B, M, N, R].map(deleteUser));
        console.log("ลบข้อมูลและบัตรผ่านทดสอบแล้ว");
    }
    console.log(`\n${fail ? fail + " FAILED" : "ALL PASSED"} (${pass} pass, ${fail} fail)`);
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e.message); process.exit(1); });
