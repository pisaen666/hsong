// ทดสอบด่านตรวจเอกสารก่อนอนุมัติไรเดอร์ (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง)
//   - เอกสารไม่ครบ (ขาด selfie/license/registration) ต้องอนุมัติไม่ได้เด็ดขาด
//   - เอกสารครบแต่เจ้าของกด "ยกเลิก" ตอนยืนยัน ต้องไม่อนุมัติ (ไม่สร้างรหัสผ่าน ไม่เปลี่ยนสถานะ)
//   - เอกสารครบ + เจ้าของกด "ยืนยัน" → อนุมัติสำเร็จ และบันทึกว่าใคร/เมื่อไหร่ตรวจแล้ว
//   - อนุมัติซ้ำ (เช่นหลัง reconsider) ไม่ต้องถามซ้ำ เพราะตรวจไปแล้วครั้งก่อน
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

let apps = [], owner = true, confirmReturn = true;
const toasts = [], viewCalls = [], smsCalls = [];
const ctx = {
    console, window: {}, crypto: webcrypto, TextEncoder, Uint8Array, Date, Math, JSON, Array, Promise, String,
    localStorage: { getItem: () => null, setItem() { }, removeItem() { } },
    showToast: m => toasts.push(m),
    loadRiderApplications: () => apps,
    saveRiderApplications: a => { apps = a; },
    loadCommunityRiders: () => [],
    saveCommunityRiders: () => { },
    isOwnerSignedIn: () => owner,
    requireOwnerAction: () => { if (owner) return true; toasts.push("owner-required"); return false; },
    confirm: () => confirmReturn,
    normalizeRiderCode: v => String(v || "").toUpperCase(),
    formatRiderAppDate: () => "21 ก.ย. 12:00 น.",
    viewRiderAppDetail: id => viewCalls.push(id),
    openSimulatedSmsModal: (...a) => smsCalls.push(a),
    updateAdminRiderBadges: () => { }, renderAdminRiders: () => { },
    closeRiderAppDetailModal: () => { }, initAdminRiderRadarMap: () => { },
    generate6DigitAccessCode: prefix => (prefix || "RD") + "1234",
    _lastSubmittedRiderApp: null,
    MARKET_ORIGIN: { lat: 13.3, lng: 101.1 },
    setTimeout: (fn) => fn(),
    state: { activeAdmin: { name: "เจ้าของ" } },
    document: { getElementById: () => null }
};
// ตัวช่วยสิทธิ์อ่านออเดอร์ (staff_keys / staff_sessions) — ทดสอบจริงอยู่ใน order-access.test.js
Object.assign(ctx, {
    staffProofFromSecret: async () => "f".repeat(64),
    saveStaffKey: () => Promise.resolve(true),
    removeStaffKey: () => { },
    openStaffSession: async () => false,
    closeStaffSession: () => { }
});
vm.createContext(ctx);
vm.runInContext([
    between("const RIDER_DOC_SLOTS = [", "window.getMissingRequiredRiderDocs = getMissingRequiredRiderDocs;"),
    between("const RIDER_SECRET_ALPHABET", "window.riderSecretLogin = riderSecretLogin;"),
    "async " + fn("approveRiderApplication", true).replace(/^async /, "")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

(async () => {
const fullDocs = { selfie: true, license: true, registration: true, vehicle: false };
const mkApp = (id, docFlags) => ({ id, accessCode: id, fullName: "ทดสอบ ไรเดอร์", nickname: "", phone: "0812345678", status: "pending", docFlags: docFlags || {} });

console.log("== ตรวจว่าเอกสารอะไรขาด");
ok(run("getMissingRequiredRiderDocs({docFlags:{}})").length === 3, "ยังไม่ส่งอะไรเลย → ขาดครบ 3 อย่างที่บังคับ (ไม่รวมรูปรถ)");
ctx._a = { docFlags: fullDocs };
ok(run("getMissingRequiredRiderDocs(_a)").length === 0, "ส่งครบ 3 อย่างที่บังคับ (ไม่ต้องมีรูปรถก็พอ) → ไม่ขาดอะไร");
ctx._b = { docFlags: { selfie: true, registration: true } };
ok(JSON.stringify(run("getMissingRequiredRiderDocs(_b)")).includes("ใบขับขี่"), "ขาดใบขับขี่ → รายงานชื่อเอกสารที่ขาดถูกต้อง");

console.log("== เอกสารไม่ครบ: อนุมัติไม่ได้เด็ดขาด (ไม่ขึ้นกล่องยืนยันด้วยซ้ำ)");
apps = [mkApp("RD1111", { selfie: true })]; owner = true; toasts.length = 0; viewCalls.length = 0; smsCalls.length = 0;
let r = run("approveRiderApplication('RD1111')");
ok(apps[0].status === "pending", "สถานะยังเป็น pending ไม่ถูกอนุมัติ");
ok(toasts.some(t => /ขาดเอกสาร/.test(t)), "แจ้งเตือนว่าขาดเอกสารอะไรบ้าง");
ok(viewCalls.includes("RD1111"), "เปิดหน้ารายละเอียดให้เจ้าของดูทันที");
ok(!apps[0].docsVerifiedAt, "ไม่ถูกทำเครื่องหมายว่าตรวจสอบแล้ว");
ok(smsCalls.length === 0, "ไม่มีการสร้าง/ส่งรหัสผ่านใด ๆ เลย");

console.log("== เอกสารครบ แต่เจ้าของกด \"ยกเลิก\" ตอนถูกถามยืนยัน");
apps = [mkApp("RD2222", fullDocs)]; owner = true; confirmReturn = false; toasts.length = 0; smsCalls.length = 0;
r = run("approveRiderApplication('RD2222')");
ok(apps[0].status === "pending" && !apps[0].docsVerifiedAt, "ยกเลิก → ยังไม่อนุมัติ ยังไม่ถูกทำเครื่องหมายว่าตรวจแล้ว");
ok(toasts.some(t => /ยกเลิก/.test(t)), "แจ้งว่ายกเลิกการอนุมัติ");
ok(smsCalls.length === 0, "ไม่มีการสร้างรหัสผ่าน (ยกเลิกก่อนถึงขั้นตอนนั้น)");

console.log("== เอกสารครบ + เจ้าของยืนยัน → อนุมัติสำเร็จ");
apps = [mkApp("RD3333", fullDocs)]; owner = true; confirmReturn = true; toasts.length = 0; smsCalls.length = 0;
r = await Promise.resolve(run("approveRiderApplication('RD3333')"));
ok(apps[0].status === "approved", "อนุมัติสำเร็จ");
ok(!!apps[0].docsVerifiedAt && apps[0].docsVerifiedBy === "เจ้าของ", "บันทึกว่าใครตรวจ/เมื่อไหร่");
ok(apps[0].loginHash && apps[0].loginHash.length === 64, "สร้างรหัสผ่านเข้าระบบให้เรียบร้อย");
ok(smsCalls.length === 1, "เปิดหน้าต่างส่งรหัสผ่านให้ไรเดอร์");

console.log("== เคยตรวจสอบแล้วครั้งก่อน (เช่นอนุมัติซ้ำหลัง reconsider) ไม่ต้องถามซ้ำ");
apps = [Object.assign(mkApp("RD4444", fullDocs), { docsVerifiedAt: "2026-09-20T00:00:00.000Z", docsVerifiedBy: "เจ้าของ" })];
owner = true; confirmReturn = false; toasts.length = 0; smsCalls.length = 0;   // confirm() คืนค่า false แต่ไม่ควรถูกเรียกเลย
r = await Promise.resolve(run("approveRiderApplication('RD4444')"));
ok(apps[0].status === "approved", "อนุมัติได้เลยโดยไม่ต้องยืนยันซ้ำ (ไม่ถูกบล็อกจาก confirm ที่คืนค่า false)");
ok(apps[0].docsVerifiedAt === "2026-09-20T00:00:00.000Z", "วันที่ตรวจสอบเดิมไม่ถูกเขียนทับ");

console.log("== ผู้ใช้ทั่วไปอนุมัติไม่ได้ (สิทธิ์เจ้าของเท่านั้น เหมือนเดิม)");
apps = [mkApp("RD5555", fullDocs)]; owner = false; toasts.length = 0;
run("approveRiderApplication('RD5555')");
ok(apps[0].status === "pending" && toasts.includes("owner-required"), "ผู้ใช้ทั่วไปอนุมัติไม่ได้");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
})();
