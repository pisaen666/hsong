// ทดสอบกฎ v5 ("ซ่อนข้อมูลส่วนตัวไรเดอร์") กับฐานข้อมูล hsong-test จริง ผ่าน REST — ห้ามชี้ไปโปรเจกต์จริง
//   ผู้ทดสอบ (บัตรผ่านนิรนาม): ลูกค้า A, คนแปลกหน้า B, ไรเดอร์ C, ไรเดอร์ D, แม่ค้า M (ร้าน SHOP) + ร้านอื่น OTHER
//   ค่าพิสูจน์ของไรเดอร์/ร้านทดสอบ (staff_keys) เขียนด้วยสิทธิ์แอดมินของ Firebase CLI (--project hsong-test เท่านั้น)
// ต้องมีก่อนรัน: hsong-test ใช้กฎ hsong-test.rules.v5.json, เปิด Anonymous + sign-up, Firebase CLI ล็อกอินอยู่
// วิธีรัน:  LIVE=1 node firebase-rules/tests/rules-v5-live.test.js   (ไม่ใส่ LIVE=1 = ข้าม)
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

const RUN = "ZZV5" + Date.now().toString(36).toUpperCase();
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
    const B = await anonUser(), C = await anonUser(), D = await anonUser();
    const RC = RUN + "RC", RD = RUN + "RD", PC = "c".repeat(64), PD = "d".repeat(64);
    const H = require("crypto").createHash("sha256").update(RUN).digest("hex");
    const rider = (code, phone) => ({ id: code, accessCode: code, name: "ไรเดอร์ " + code, phone, promptPay: "1234567890123", status: "available", loginSalt: "ab".repeat(16), loginHash: "f".repeat(64) });
    try {
        adminUpdate({
            [`staff_keys/rider/${RC}`]: PC, [`staff_keys/rider/${RD}`]: PD,
            [`community_riders/${RC}`]: rider(RC, "0811111111"), [`community_riders/${RD}`]: rider(RD, "0822222222"),
            [`rider_applications/${RC}`]: { id: RC, accessCode: RC, fullName: "ไรเดอร์", phone: "0811111111", status: "approved" },
            [`rider_public/${RC}`]: { status: "approved", loginSalt: "ab".repeat(16), profileKey: RC }
        });

        console.log("== คนแปลกหน้า: ไม่เห็นเบอร์ พร้อมเพย์ หรือค่ารหัสผ่านของไรเดอร์");
        await expect("B ดูรายชื่อไรเดอร์ไม่ได้", false, B, "GET", `community_riders`);
        await expect("B ดูข้อมูลไรเดอร์ทีละคนไม่ได้", false, B, "GET", `community_riders/${RC}`);
        await expect("B ดูใบสมัครไม่ได้", false, B, "GET", `rider_applications/${RC}`);
        await expect("ไม่มีบัตรผ่าน ดูรายชื่อไรเดอร์ไม่ได้", false, null, "GET", `community_riders`);
        const pub = await expect("B อ่านข้อมูลสาธารณะสำหรับล็อกอินได้", true, B, "GET", `rider_public/${RC}`);
        const pubObj = JSON.parse(pub.text || "{}");
        const clean = !("phone" in pubObj) && !("loginHash" in pubObj) && !("name" in pubObj) && !("promptPay" in pubObj);
        console.log((clean ? "PASS " : "FAIL ") + "ข้อมูลสาธารณะไม่มีเบอร์/ชื่อ/พร้อมเพย์/ค่ารหัสผ่าน"); clean ? pass++ : fail++;
        await expect("B ดูรายการ rider_public ทั้งหมดไม่ได้", false, B, "GET", `rider_public`);
        await expect("B แก้ข้อมูลสาธารณะของไรเดอร์ที่อนุมัติแล้วไม่ได้", false, B, "PUT", `rider_public/${RC}`, { status: "pending" });

        console.log("== ไรเดอร์ล็อกอินแล้ว: เห็น/แก้ได้เฉพาะของตัวเอง");
        await expect("C ล็อกอิน (ฐานข้อมูลตรวจรหัส) ได้", true, C, "PUT", `staff_sessions/${C.uid}`, { role: "rider", id: RC, proof: PC, at: 1 });
        await expect("D ล็อกอินด้วยค่าพิสูจน์ผิดไม่ได้", false, D, "PUT", `staff_sessions/${D.uid}`, { role: "rider", id: RD, proof: PC, at: 1 });
        await expect("D ล็อกอินด้วยค่าพิสูจน์ถูกได้", true, D, "PUT", `staff_sessions/${D.uid}`, { role: "rider", id: RD, proof: PD, at: 1 });
        await expect("C อ่านข้อมูลของตัวเองได้", true, C, "GET", `community_riders/${RC}`);
        await expect("C อ่านข้อมูลของ D ไม่ได้", false, C, "GET", `community_riders/${RD}`);
        await expect("C ดูรายชื่อไรเดอร์ทั้งหมดไม่ได้", false, C, "GET", `community_riders`);
        await expect("C เปลี่ยนสถานะตัวเองได้", true, C, "PUT", `community_riders/${RC}/status`, "on_delivery");
        await expect("C เปลี่ยนสถานะของ D ไม่ได้", false, C, "PUT", `community_riders/${RD}/status`, "offline");
        await expect("C เปลี่ยนเบอร์ตัวเองไม่ได้", false, C, "PUT", `community_riders/${RC}/phone`, "0899999999");
        await expect("C เปลี่ยนค่ารหัสผ่านตัวเองไม่ได้", false, C, "PUT", `community_riders/${RC}/loginHash`, "0".repeat(64));
        await expect("C อ่านใบสมัครของตัวเองไม่ได้ (เจ้าของเท่านั้น)", false, C, "GET", `rider_applications/${RC}`);

        console.log("== เช็กสถานะด้วยเบอร์ (ค่าแฮช)");
        await expect("ผู้สมัครสร้างสถานะ pending ด้วยค่าแฮชเบอร์ได้", true, B, "PUT", `rider_phone_status/${H}`, { code: RUN + "APP", status: "pending" });
        await expect("อ่านสถานะด้วยค่าแฮชเบอร์ได้", true, null, "GET", `rider_phone_status/${H}`);
        await expect("ดูรายการสถานะทั้งหมดไม่ได้", false, B, "GET", `rider_phone_status`);
        await expect("เขียนทับสถานะ (แอบอนุมัติ) ไม่ได้", false, B, "PUT", `rider_phone_status/${H}`, { code: RUN + "APP", status: "approved" });
        await expect("คีย์ที่ไม่ใช่ค่าแฮช 64 ตัวไม่ได้", false, B, "PUT", `rider_phone_status/0812345678`, { code: "X", status: "pending" });

        console.log("== โหนดเก่าที่ไม่ได้ใช้");
        for (const n of ["riders", "rider_status", "rider_locations", "active_rider"]) {
            await expect(`เขียน ${n} ไม่ได้`, false, B, "PUT", `${n}/${RUN}`, { x: 1 });
            await expect(`อ่าน ${n} ไม่ได้`, false, B, "GET", `${n}`);
        }
    } finally {
        console.log("\n== ล้างข้อมูลทดสอบรอบนี้");
        const clean = {};
        [`staff_keys/rider/${RC}`, `staff_keys/rider/${RD}`, `community_riders/${RC}`, `community_riders/${RD}`, `rider_applications/${RC}`, `rider_public/${RC}`,
         `rider_phone_status/${H}`, `staff_sessions/${C.uid}`, `staff_sessions/${D.uid}`].forEach(p => { clean[p] = null; });
        try { adminUpdate(clean); } catch (e) { console.log("  (ล้างไม่สำเร็จ: " + e.message.split("\n")[0] + ")"); }
        await Promise.all([B, C, D].map(deleteUser));
        console.log("ลบข้อมูลและบัตรผ่านทดสอบแล้ว");
    }
    console.log(`\n${fail ? fail + " FAILED" : "ALL PASSED"} (${pass} pass, ${fail} fail)`);
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e.message); process.exit(1); });
