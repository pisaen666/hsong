// ทดสอบล็อกอินไรเดอร์แบบ "เลขไรเดอร์ + รหัสผ่านลับ" (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง)
//   - รหัสผ่านสร้างถูกรูปแบบ / แฮชตรวจได้ / ตรวจผิดไม่ผ่าน
//   - เข้าด้วยเบอร์โทร ชื่อ หรือเลขไรเดอร์อย่างเดียวไม่ได้
//   - ทางเข้าที่ไม่ใช้รหัส (loginRiderById, quickLoginRider, เลือกจากรายการ) เป็นของเจ้าของเท่านั้น
//   - ผิดหลายครั้งถูกล็อกชั่วคราว
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { webcrypto } = require("crypto");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}
function between(a, b) {
    const s = src.indexOf(a); const e = src.indexOf(b, s);
    if (s < 0 || e < 0) throw new Error("marker missing " + a);
    return src.slice(s, e + b.length);
}

const store = {};
let riders = [], apps = [], owner = false;
let loggedIn = null;
const toasts = [];
const ctx = {
    console, window: {}, crypto: webcrypto, TextEncoder, Uint8Array, Date, Math, JSON, Array,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    showToast: m => toasts.push(String(m)),
    loadCommunityRiders: () => riders,
    loadRiderApplications: () => apps,
    isOwnerSignedIn: () => owner,
    openAdminLoginModal: () => { },
    loginRiderWithProfile: r => { loggedIn = r; },
    closeRiderLoginModal: () => { }, closeRiderRegisterModal: () => { }, closeStatusCheckModal: () => { },
    switchRole: () => { }, switchRiderGuestTab: () => { },
    document: { getElementById: () => null }
};
vm.createContext(ctx);
vm.runInContext([
    fn("normalizeRiderCode"),
    between("const RIDER_SECRET_ALPHABET", "window.riderSecretLogin = riderSecretLogin;"),
    fn("loginRiderById"), fn("quickLoginRider"), fn("handleRiderLoginSubmit"),
    "function requireOwnerAction() { if (isOwnerSignedIn()) return true; showToast('owner-required'); return false; }"
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

(async () => {
    console.log("== รหัสผ่าน: สร้าง / แฮช / ตรวจ");
    const secrets = new Set();
    let formatOk = true;
    for (let i = 0; i < 200; i++) {
        const sec = run("generateRiderSecret()");
        secrets.add(sec);
        if (!/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}$/.test(sec)) formatOk = false;
    }
    ok(formatOk, "รูปแบบ XXXX-XXXX ใช้เฉพาะตัวอักษรที่อ่านไม่สับสน (ไม่มี 0 O 1 I L)");
    ok(secrets.size === 200, "สุ่ม 200 ครั้งไม่ซ้ำกันเลย");

    const cred = await run("makeRiderLoginCredential()");
    ok(cred.loginHash.length === 64 && cred.loginSalt.length === 32, "hash 64 ตัวอักษร (256 บิต), salt 32 ตัวอักษร (128 บิต)");
    ok(!JSON.stringify({ h: cred.loginHash, s: cred.loginSalt }).includes(cred.secret.replace("-", "")), "ค่าที่เก็บ (hash/salt) ไม่มีรหัสจริงอยู่ในตัว");
    const rider = { id: "RD1111", name: "สมชาย", phone: "0811111111", accessCode: "RD1111", loginHash: cred.loginHash, loginSalt: cred.loginSalt };
    ctx._rider = rider; ctx._secret = cred.secret;
    ok(await run("verifyRiderSecret(_rider, _secret)") === true, "รหัสถูกต้อง ตรวจผ่าน");
    ok(await run("verifyRiderSecret(_rider, _secret.toLowerCase().replace('-', ' '))") === true, "พิมพ์ตัวเล็ก/เว้นวรรคแทนขีด ก็ผ่าน (ผ่อนปรนการพิมพ์)");
    ok(await run("verifyRiderSecret(_rider, 'AAAA-AAAA')") === false, "รหัสผิด ตรวจไม่ผ่าน");
    ok(await run("verifyRiderSecret({id:'x'}, _secret)") === false, "ไรเดอร์ไม่มี hash ตรวจไม่ผ่านเสมอ");
    const cred2 = await run("makeRiderLoginCredential()");
    ok(cred2.loginHash !== cred.loginHash && cred2.loginSalt !== cred.loginSalt, "แต่ละคนได้ salt/hash ต่างกัน");

    console.log("== ล็อกอิน: เลขไรเดอร์ + รหัสผ่าน");
    riders = [rider, { id: "RD2222", name: "ไม่มีรหัส", phone: "0822222222", accessCode: "RD2222" }];
    apps = [{ id: "RD3333", status: "pending" }, { id: "RD4444", status: "rejected" }];
    const login = (n, s) => { ctx._n = n; ctx._s = s; return run("riderSecretLogin(_n, _s)"); };
    let r = await login("RD1111", cred.secret);
    ok(r.ok && r.rider.id === "RD1111", "เลขไรเดอร์ + รหัสถูก → เข้าได้");
    r = await login("rd1111", cred.secret.toLowerCase());
    ok(r.ok, "พิมพ์ตัวเล็กทั้งคู่ก็เข้าได้");
    r = await login("RD1111", "AAAA-AAAA");
    ok(!r.ok && r.code === "bad", "รหัสผิด → เข้าไม่ได้");
    r = await login("RD1111", "");
    ok(!r.ok && r.code === "empty", "ไม่กรอกรหัสผ่าน → เข้าไม่ได้ (เลขไรเดอร์อย่างเดียวไม่พอ)");
    r = await login("0811111111", cred.secret);
    ok(!r.ok && r.code === "bad", "ใช้เบอร์โทรแทนเลขไรเดอร์ + รหัสถูก → เข้าไม่ได้");
    r = await login("สมชาย", cred.secret);
    ok(!r.ok && r.code === "bad", "ใช้ชื่อแทนเลขไรเดอร์ → เข้าไม่ได้");
    r = await login("RD9999", cred.secret);
    ok(!r.ok && r.code === "bad", "เลขไรเดอร์ที่ไม่มีอยู่ → เข้าไม่ได้");
    r = await login("RD2222", "ABCD-EFGH");
    ok(!r.ok && r.code === "no-secret" && /ติดต่อเจ้าของ/.test(r.message), "ไรเดอร์เก่าที่ยังไม่มีรหัสผ่าน → เข้าไม่ได้ และบอกให้ติดต่อเจ้าของ");
    r = await login("RD3333", "ABCD-EFGH");
    ok(!r.ok && r.code === "pending", "ใบสมัครที่ยังรออนุมัติ → เข้าไม่ได้ (บอกให้รอ)");
    r = await login("RD4444", "ABCD-EFGH");
    ok(!r.ok && r.code === "rejected", "ใบสมัครที่ไม่ผ่าน → เข้าไม่ได้");

    console.log("== กันเดารหัส: ผิด 5 ครั้งถูกล็อก");
    delete store["talathub_rider_login_fail"];
    for (let i = 0; i < 5; i++) await login("RD1111", "AAAA-AAAA");
    r = await login("RD1111", cred.secret);
    ok(!r.ok && r.code === "locked", "ผิด 5 ครั้ง → แม้ใส่รหัสถูกก็ถูกล็อกชั่วคราว");
    delete store["talathub_rider_login_fail"];
    r = await login("RD1111", cred.secret);
    ok(r.ok, "พ้นการล็อกแล้วเข้าได้ปกติ");
    for (let i = 0; i < 3; i++) await login("RD1111", "AAAA-AAAA");
    await login("RD1111", cred.secret);
    ok(!("talathub_rider_login_fail" in store), "ใส่รหัสถูกแล้วตัวนับความผิดถูกล้าง");

    console.log("== ทางเข้าที่ไม่ใช้รหัสต้องเป็นของเจ้าของเท่านั้น");
    owner = false;
    loggedIn = null; toasts.length = 0; run("loginRiderById('RD1111')");
    ok(loggedIn === null && toasts.includes("owner-required"), "loginRiderById: ผู้ใช้ทั่วไปเข้าไม่ได้");
    loggedIn = null; run("quickLoginRider('x')");
    ok(loggedIn === null, "quickLoginRider (เข้าเป็นไรเดอร์คนแรก): ผู้ใช้ทั่วไปเข้าไม่ได้");
    loggedIn = null; run("handleRiderLoginSubmit()");
    ok(loggedIn === null, "handleRiderLoginSubmit (เลือกจากรายการ): ผู้ใช้ทั่วไปเข้าไม่ได้");
    owner = true;
    loggedIn = null; run("loginRiderById('RD1111')");
    ok(loggedIn && loggedIn.id === "RD1111", "loginRiderById: เจ้าของใช้ได้ (สลับเข้ารับงาน)");
    loggedIn = null; run("loginRiderById('สมชาย')");
    ok(loggedIn === null, "loginRiderById: ค้นด้วยชื่อ/เบอร์ไม่ได้ ต้องเป็นเลขไรเดอร์ตรงตัว");
    owner = false;

    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
