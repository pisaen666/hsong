// ทดสอบฟีเจอร์ "มอบหมายพนักงานเป็นไรเดอร์" + การพักฟีเจอร์สมัครไรเดอร์ออนไลน์ (2026-11-02, คำสั่งเจ้าของ)
// ไม่แตะ Firebase ใช้ข้อมูลจำลองทั้งหมด
//   - RIDER_SELF_REGISTRATION_ENABLED ต้องเป็น false (พักไว้) แต่โค้ดเดิมต้องยังอยู่ครบ (เปิดกลับมาได้แค่เปลี่ยนเป็น true)
//   - goToRiderRegisterScreen / openRiderRegisterModal ต้องเคารพค่าสถานะนี้ (ปิดแล้วเข้าไม่ได้)
//   - handleRiderFormSubmit (ปุ่ม "+ มอบหมายพนักงานเป็นไรเดอร์"): สร้างรหัสผ่านเข้าระบบจริง ไม่ต้องมีเอกสาร
//   - แก้ไขไรเดอร์เดิม (มี id) ต้องไม่สร้างรหัสผ่านใหม่ซ้ำ
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { webcrypto } = require("crypto");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

function fn(name, isAsync) {
    const start = src.indexOf((isAsync ? "async function " : "function ") + name + "(");
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
function constLine(name) {
    const re = new RegExp("const " + name + "\\s*=\\s*[^;]+;");
    const m = src.match(re);
    if (!m) throw new Error("const not found: " + name);
    return m[0];
}

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// ── 1. ตัวค่าคงที่ & การซ่อนทางเข้าสมัครสาธารณะ (ตรวจจากซอร์สตรงๆ ไม่ต้องรัน) ──
console.log("== พักฟีเจอร์สมัครไรเดอร์ออนไลน์ (ตรวจซอร์ส) ==");
ok(/const RIDER_SELF_REGISTRATION_ENABLED = false;/.test(src), "RIDER_SELF_REGISTRATION_ENABLED ต้องเป็น false ตอนนี้ (พักไว้)");
ok(src.includes("function applyRiderSelfRegistrationVisibility"), "มีฟังก์ชันซ่อน/แสดงทางเข้าสมัครสาธารณะ");
["btn-rider-register", "rider-recruit-banner-card", "rider-guest-tab-btn-register", "rider-login-open-register-btn"].forEach(id => {
    ok(fn("applyRiderSelfRegistrationVisibility", false).includes(`"${id}"`), `ซ่อน/แสดง #${id} เมื่อสลับค่าสถานะ`);
});
ok(fn("switchRiderGuestTab", false).includes("applyRiderSelfRegistrationVisibility()"), "switchRiderGuestTab เรียกซ้ำทุกครั้งที่สลับแท็บ (กันโดนทับคลาสตอนรีเฟรชปุ่ม)");
ok(fn("goToRiderRegisterScreen", false).includes("RIDER_SELF_REGISTRATION_ENABLED"), "goToRiderRegisterScreen เช็คค่าสถานะก่อนเปิดแท็บสมัคร");
ok(fn("openRiderRegisterModal", false).includes("RIDER_SELF_REGISTRATION_ENABLED"), "openRiderRegisterModal เช็คค่าสถานะก่อนเปิด modal สมัคร");
ok(/renderAuthHeaderButtons[\s\S]*?applyRiderSelfRegistrationVisibility\(\)/.test(src), "renderAuthHeaderButtons เรียกซ้ำทุกครั้งที่วาดปุ่มหัวเว็บใหม่ (กันโดนทับคลาส)");

// ── 2. รัน handleRiderFormSubmit จริงใน VM จำลอง ──
let apps = [], riders = [], owner = true, staffKeyCalls = [], smsCalls = [], toasts = [], closedModal = false;
const formValues = {
    "rider-form-id": "",
    "rider-form-name": "ทดสอบ พนักงานร้าน",
    "rider-form-phone": "0891234567",
    "rider-form-plate": "",
    "rider-form-model": "",
    "rider-form-zone": "",
    "rider-form-promptpay": "",
    "rider-form-bank": "กสิกรไทย",
    "rider-form-status": "available",
    "rider-form-basefee": "40"
};
const fakeDoc = {
    getElementById: (id) => {
        if (id in formValues) return { value: formValues[id], trim() { return this.value.trim ? this.value.trim() : this.value; } };
        return null;
    }
};
const ctx = {
    console, window: {}, crypto: webcrypto, TextEncoder, Uint8Array, Date, Math, JSON, Array, Promise, String,
    localStorage: { getItem: () => null, setItem() { }, removeItem() { } },
    document: fakeDoc,
    showToast: m => toasts.push(m),
    loadRiderApplications: () => apps,
    saveRiderApplications: a => { apps = a; },
    loadCommunityRiders: () => riders,
    saveCommunityRiders: r => { riders = r; },
    isOwnerSignedIn: () => owner,
    requireOwnerAction: () => { if (owner) return true; toasts.push("owner-required"); return false; },
    generate6DigitAccessCode: prefix => (prefix || "RD") + "8021",
    MARKET_ORIGIN: { lat: 13.3, lng: 101.1 },
    setTimeout: (f) => f(),
    confirm: () => true,
    state: { activeAdmin: { name: "เจ้าของ" } },
    closeRiderFormModal: () => { closedModal = true; },
    renderAdminRiders: () => { },
    initAdminRiderRadarMap: () => { },
    openSimulatedSmsModal: (...a) => smsCalls.push(a)
};
Object.assign(ctx, {
    staffProofFromSecret: async () => "f".repeat(64),
    saveStaffKey: (role, id, proof) => { staffKeyCalls.push({ role, id, proof }); return Promise.resolve(true); }
});
vm.createContext(ctx);
vm.runInContext([
    between("const RIDER_SECRET_ALPHABET", "window.riderSecretLogin = riderSecretLogin;"),
    "async " + fn("handleRiderFormSubmit", true).replace(/^async /, ""),
    "async " + fn("resetRiderLoginSecretForRider", true).replace(/^async /, "")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);
const runAsync = js => vm.runInContext(`(${js})()`, ctx);

(async () => {
    console.log("== handleRiderFormSubmit: มอบหมายพนักงานใหม่ (ไม่มี id) ==");
    await runAsync("async () => { await handleRiderFormSubmit(); }");
    ok(riders.length === 1, "เพิ่มไรเดอร์ใหม่เข้า community_riders 1 คน");
    const r = riders[0];
    ok(r.name === "ทดสอบ พนักงานร้าน" && r.phone === "0891234567", "ชื่อ/เบอร์ตรงกับที่กรอก");
    ok(!!r.accessCode && !!r.loginSalt && !!r.loginHash, "มีรหัสไรเดอร์ + รหัสผ่านเข้าระบบ (loginSalt/loginHash) ทันที ไม่ใช่ว่างเปล่าเหมือนปุ่มเดิม");
    ok(apps.length === 1 && apps[0].status === "approved", "สร้างใบสมัครสถานะ approved คู่กันไว้ด้วย (ให้ publishAllRiderPublic หาเจอ ไม่งั้นล็อกอินไม่ได้)");
    ok(apps[0].accessCode === r.accessCode && apps[0].loginHash === r.loginHash, "รหัสผ่านในใบสมัครตรงกับที่เก็บไว้ที่ไรเดอร์ (คนละที่ ต้องตรงกัน)");
    ok(!!apps[0].docsVerifiedAt, "ถือว่าตรวจเอกสารแล้วในตัว (ไม่ต้องอัปโหลดรูปจริง เพราะเป็นพนักงานที่เจ้าของรู้จักตัวตนอยู่แล้ว)");
    ok(staffKeyCalls.length === 1 && staffKeyCalls[0].role === "rider" && staffKeyCalls[0].id === r.accessCode, "บันทึกสิทธิ์อ่านออเดอร์ (staff_keys) ให้ไรเดอร์คนนี้");
    ok(smsCalls.length === 1 && smsCalls[0][0] === "0891234567", "เปิดกล่องข้อความส่งรหัสผ่านให้พนักงาน พร้อมเบอร์ที่กรอก");
    ok(closedModal === true, "ปิด modal หลังบันทึกสำเร็จ");

    console.log("== handleRiderFormSubmit: กันกรอกเบอร์ซ้ำ ==");
    const beforeCount = riders.length;
    formValues["rider-form-name"] = "คนที่สอง";
    await runAsync("async () => { await handleRiderFormSubmit(); }");
    ok(riders.length === beforeCount, "เบอร์ซ้ำกับไรเดอร์ที่มีอยู่แล้ว ต้องไม่เพิ่มซ้ำ");
    ok(toasts.some(t => t.includes("เบอร์นี้มีไรเดอร์อยู่แล้ว")), "แจ้งเตือนว่าเบอร์นี้มีคนอยู่แล้ว");

    console.log("== handleRiderFormSubmit: ไม่ใช่เจ้าของ มอบหมายไม่ได้ ==");
    owner = false;
    formValues["rider-form-phone"] = "0899999999";
    const beforeCount2 = riders.length;
    await runAsync("async () => { await handleRiderFormSubmit(); }");
    ok(riders.length === beforeCount2, "ไม่ใช่เจ้าของ ต้องมอบหมายพนักงานเป็นไรเดอร์ไม่ได้");
    owner = true;

    console.log("== handleRiderFormSubmit: แก้ไขไรเดอร์เดิม ไม่สร้างรหัสผ่านใหม่ ==");
    const existing = riders[0];
    const oldHash = existing.loginHash;
    formValues["rider-form-id"] = existing.id;
    formValues["rider-form-name"] = "ทดสอบ พนักงานร้าน (แก้ไข)";
    formValues["rider-form-phone"] = existing.phone;
    const staffKeyCountBefore = staffKeyCalls.length;
    await runAsync("async () => { await handleRiderFormSubmit(); }");
    ok(riders[0].name === "ทดสอบ พนักงานร้าน (แก้ไข)", "แก้ไขชื่อสำเร็จ");
    ok(riders[0].loginHash === oldHash, "แก้ไขข้อมูลทั่วไป ไม่ไปแตะรหัสผ่านเดิม (ต้องใช้ปุ่ม 'รหัสเข้าระบบ' ถ้าจะสร้างใหม่)");
    ok(staffKeyCalls.length === staffKeyCountBefore, "แก้ไขไม่เรียก saveStaffKey ซ้ำ");

    console.log("== resetRiderLoginSecretForRider: ซ่อมไรเดอร์เก่าที่ไม่มีรหัสผ่าน/เลขไรเดอร์เลย (บั๊กที่เจอจริง 2026-11-02) ==");
    riders = [{ id: "RIDER-8768", name: "เฮียส่ง (ทดสอบเก่า)", phone: "0805687733", status: "available" }];
    apps = []; // ไรเดอร์เก่าไม่มีใบสมัครคู่กันเลย (สร้างด้วยปุ่มรุ่นก่อนแก้)
    owner = true; toasts.length = 0; smsCalls.length = 0; staffKeyCalls.length = 0;
    await runAsync("async () => { await resetRiderLoginSecretForRider('RIDER-8768'); }");
    ok(!!riders[0].accessCode && /^RD/.test(riders[0].accessCode), "ซ่อมเลขไรเดอร์ (accessCode) ให้ใหม่ ขึ้นต้นด้วย RD");
    ok(!!riders[0].loginSalt && !!riders[0].loginHash, "ซ่อมรหัสผ่านเข้าระบบให้ใหม่");
    ok(apps.length === 1 && apps[0].id === riders[0].accessCode && apps[0].status === "approved", "สร้างใบสมัครคู่กันให้ใหม่ด้วย (เดิมไม่มีเลย)");
    ok(smsCalls.length === 1 && smsCalls[0][5] === riders[0].accessCode, "เปิดกล่องข้อความแสดงเลขไรเดอร์ + รหัสผ่านใหม่");

    console.log("== resetRiderLoginSecretForRider: ไรเดอร์ปกติที่มีใบสมัครคู่กันอยู่แล้ว ==");
    const prevHash = riders[0].loginHash;
    const prevAccessCode = riders[0].accessCode;
    await runAsync("async () => { await resetRiderLoginSecretForRider('RIDER-8768'); }");
    ok(riders[0].accessCode === prevAccessCode, "เลขไรเดอร์เดิมไม่เปลี่ยน (เปลี่ยนแค่รหัสผ่าน)");
    ok(riders[0].loginHash !== prevHash, "รหัสผ่านเปลี่ยนเป็นค่าใหม่จริง");
    ok(apps.length === 1, "ไม่สร้างใบสมัครซ้ำ (อัปเดตใบเดิม)");

    console.log("== resetRiderLoginSecretForRider: ไม่ใช่เจ้าของทำไม่ได้ ==");
    owner = false; toasts.length = 0;
    const beforeHash = riders[0].loginHash;
    await runAsync("async () => { await resetRiderLoginSecretForRider('RIDER-8768'); }");
    ok(riders[0].loginHash === beforeHash && toasts.includes("owner-required"), "ไม่ใช่เจ้าของ สร้างรหัสผ่านใหม่ไม่ได้");
    owner = true;

    if (fail > 0) { console.log(`\n${fail} FAILED`); process.exit(1); }
    console.log("\nALL PASSED");
})();
