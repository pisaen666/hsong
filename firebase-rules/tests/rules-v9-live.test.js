// ทดสอบกฎ v9 ("ไรเดอร์ถ่ายรูปส่งของ") กับฐานข้อมูล hsong-test จริง ผ่าน REST — ห้ามชี้ไปโปรเจกต์จริง
//   ผู้ทดสอบ (บัตรผ่านนิรนาม): คนแปลกหน้า B, ไรเดอร์ที่รับงานนี้ R, ไรเดอร์อีกคน R2 (ไม่ได้รับงานนี้)
//   ค่าพิสูจน์ของไรเดอร์ทดสอบ (staff_keys) และออเดอร์ทดสอบเขียนด้วยสิทธิ์แอดมินของ Firebase CLI (--project hsong-test เท่านั้น)
// ต้องมีก่อนรัน: hsong-test ใช้กฎ hsong-test.rules.v9.json (เจ้าของ publish แล้ว), เปิด Anonymous + sign-up, Firebase CLI ล็อกอินอยู่
// วิธีรัน:  LIVE=1 node firebase-rules/tests/rules-v9-live.test.js   (ไม่ใส่ LIVE=1 = ข้าม)
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

const RUN = "ZZV9" + Date.now().toString(36).toUpperCase();
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
    console.log((ok ? "PASS " : "FAIL ") + name + "  → HTTP " + r.status + (ok ? "" : "  (ต้องการ " + (want ? "อนุญาต" : "ปฏิเสธ") + ") " + r.text.slice(0, 160)));
    ok ? pass++ : fail++;
    return r;
}

(async () => {
    const B = await anonUser(), R = await anonUser(), R2 = await anonUser();
    const RC = RUN + "RC", RC2 = RUN + "RC2";
    const PR = "c".repeat(64), PR2 = "d".repeat(64);
    const ORDER_KEY = RUN + "ORDER";
    try {
        adminUpdate({
            [`staff_keys/rider/${RC}`]: PR,
            [`staff_keys/rider/${RC2}`]: PR2,
            [`orders/${ORDER_KEY}`]: { orderId: "#" + ORDER_KEY, customerUid: "zz-test-customer", assignedRiderId: RC, stalls: [] }
        });
        await expect("R ล็อกอินไรเดอร์ (ผู้รับงานนี้) ได้", true, R, "PUT", `staff_sessions/${R.uid}`, { role: "rider", id: RC, proof: PR, at: 1 });
        await expect("R2 ล็อกอินไรเดอร์ (คนละคน ไม่ได้รับงานนี้) ได้", true, R2, "PUT", `staff_sessions/${R2.uid}`, { role: "rider", id: RC2, proof: PR2, at: 1 });

        console.log("== delivery_photos: ใครเขียน/อ่านอะไรได้บ้าง");
        await expect("คนแปลกหน้า B สร้างรูปส่งของแทนใครก็ได้ไม่ได้", false, B, "PUT", `delivery_photos/${ORDER_KEY}`, { photo: "x", deliveredAt: 1 });
        await expect("ไรเดอร์ R2 (ไม่ได้รับงานนี้) สร้างรูปส่งของให้ออเดอร์นี้ไม่ได้", false, R2, "PUT", `delivery_photos/${ORDER_KEY}`, { photo: "x", deliveredAt: 1 });
        await expect("ไรเดอร์ R (รับงานนี้อยู่) สร้างรูปส่งของได้ครั้งแรก", true, R, "PUT", `delivery_photos/${ORDER_KEY}`, { photo: "data:image/jpeg;base64,xxx", deliveredAt: Date.now() });
        await expect("ไรเดอร์ R คนเดิม แก้รูปที่ส่งไปแล้วไม่ได้ (กันแก้หลักฐาน)", false, R, "PUT", `delivery_photos/${ORDER_KEY}`, { photo: "data:image/jpeg;base64,yyy", deliveredAt: Date.now() });
        await expect("ไรเดอร์ R ลบรูปที่ส่งไปแล้วไม่ได้", false, R, "DELETE", `delivery_photos/${ORDER_KEY}`);
        await expect("คนแปลกหน้า B อ่านรูปส่งของไม่ได้ (ข้อมูลส่วนตัวหน้าบ้านลูกค้า)", false, B, "GET", `delivery_photos/${ORDER_KEY}`);
        await expect("ไรเดอร์ R (คนที่ถ่ายเอง) อ่านรูปตัวเองก็ไม่ได้ (ฮับ/เจ้าของเท่านั้นตามที่เจ้าของตัดสินใจ)", false, R, "GET", `delivery_photos/${ORDER_KEY}`);
        await expect("คนแปลกหน้า B ดูรายการ delivery_photos ทั้งหมดไม่ได้", false, B, "GET", `delivery_photos`);
        await expect("ขาดฟิลด์ deliveredAt ไม่ผ่าน validate (ทดสอบด้วยออเดอร์ใหม่)", false, R2, "PUT", `delivery_photos/${RUN}ORDER2`, { photo: "x" });
    } finally {
        adminUpdate({
            [`staff_keys/rider/${RC}`]: null,
            [`staff_keys/rider/${RC2}`]: null,
            [`staff_sessions/${R.uid}`]: null,
            [`staff_sessions/${R2.uid}`]: null,
            [`orders/${ORDER_KEY}`]: null,
            [`delivery_photos/${ORDER_KEY}`]: null,
            [`delivery_photos/${RUN}ORDER2`]: null
        });
        await deleteUser(B); await deleteUser(R); await deleteUser(R2);
    }
    console.log(`\n${pass} ผ่าน, ${fail} ไม่ผ่าน`);
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error("ทดสอบล้มเหลว:", e.message); process.exit(1); });
