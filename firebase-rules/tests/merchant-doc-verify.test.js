// ทดสอบด่านตรวจรูปก่อนอนุมัติร้านค้า (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง) — คู่กับ rider-doc-verify.test.js
// เดิม approveMerchantApplication ไม่เคยตรวจอะไรเลย อนุมัติได้ทันทีแม้ร้านยังไม่เคยอัปโหลดรูปเจ้าของร้าน/
// รูปหน้าร้านจริงสักรูป (ระบบใส่รูปสต็อก Unsplash ให้เองเงียบ ๆ เวลาไม่กรอก)
//   - ยังเป็นรูปสต็อก (ไม่ใช่รูปจริงที่อัปโหลด) ต้องอนุมัติไม่ได้เด็ดขาด
//   - รูปครบแต่เจ้าของกด "ยกเลิก" ตอนยืนยัน ต้องไม่อนุมัติ (ไม่สร้างรหัสผ่าน ไม่เปลี่ยนสถานะ)
//   - รูปครบ + เจ้าของกด "ยืนยัน" → อนุมัติสำเร็จ และบันทึกว่าใคร/เมื่อไหร่ตรวจแล้ว
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
let MARKET_DATA = [], ALL_100_STALLS = [], STALL_CATALOG_DATABASE = {};
const ctx = {
    console, window: {}, crypto: webcrypto, TextEncoder, Uint8Array, Date, Math, JSON, Array, Promise, String,
    localStorage: { getItem: () => null, setItem() { }, removeItem() { } },
    showToast: m => toasts.push(m),
    loadMerchantApplications: () => apps,
    saveMerchantApplications: a => { apps = a; },
    isOwnerSignedIn: () => owner,
    requireOwnerAction: () => { if (owner) return true; toasts.push("owner-required"); return false; },
    confirm: () => confirmReturn,
    viewMerchantAppDetail: id => viewCalls.push(id),
    openSimulatedSmsModal: (...a) => smsCalls.push(a),
    updateAdminStallsBadge: () => { }, renderAdminStalls: () => { },
    saveMarketDataToStorage: () => { }, saveStallCatalogDatabaseToStorage: () => { },
    get MARKET_DATA() { return MARKET_DATA; },
    get ALL_100_STALLS() { return ALL_100_STALLS; },
    get STALL_CATALOG_DATABASE() { return STALL_CATALOG_DATABASE; },
    state: { activeAdmin: { name: "เจ้าของ" } },
    document: { getElementById: () => null }
};
Object.assign(ctx, {
    staffProofFromSecret: async () => "f".repeat(64),
    saveStaffKey: () => Promise.resolve(true)
});
vm.createContext(ctx);
vm.runInContext([
    between("const RIDER_SECRET_ALPHABET", "window.riderSecretLogin = riderSecretLogin;"),   // generateRiderSecret / hashRiderSecret / makeRiderLoginCredential
    between("function isRealMerchantPhoto", "window.getMissingMerchantVerificationItems = getMissingMerchantVerificationItems;"),
    fn("stallFromApp"),
    "async " + fn("approveMerchantApplication", true).replace(/^async /, "")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

(async () => {
const realPhoto = "data:image/jpeg;base64,AAAA";
const stockOwnerPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80";
const stockStallPhoto = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80";
const fullPhotos = { ownerImage: realPhoto, stallImage: realPhoto };
const mkApp = (id, stallExtra) => ({
    id, status: "pending",
    stallData: Object.assign({ stallId: id, stallName: "ร้านทดสอบ", ownerName: "ทดสอบ เจ้าของร้าน" }, stallExtra || {})
});

console.log("== ตรวจว่ารูปอะไรยังขาด/ยังเป็นรูปตัวอย่าง");
ok(run("getMissingMerchantVerificationItems({stallData:{}})").length === 2, "ไม่มีรูปเลย → ขาดครบ 2 อย่าง");
ctx._a = { stallData: fullPhotos };
ok(run("getMissingMerchantVerificationItems(_a)").length === 0, "อัปโหลดรูปจริงครบ 2 รูป → ไม่ขาดอะไร");
ctx._b = { stallData: { ownerImage: stockOwnerPhoto, stallImage: realPhoto } };
ok(JSON.stringify(run("getMissingMerchantVerificationItems(_b)")).includes("เจ้าของร้าน"), "รูปเจ้าของร้านยังเป็นรูปตัวอย่าง Unsplash → นับว่าขาด");
ctx._c = { stallData: { ownerImage: realPhoto, stallImage: stockStallPhoto } };
ok(JSON.stringify(run("getMissingMerchantVerificationItems(_c)")).includes("หน้าร้าน"), "รูปหน้าร้านยังเป็นรูปตัวอย่าง Unsplash → นับว่าขาด");
ok(run(`isRealMerchantPhoto(${JSON.stringify(realPhoto)})`) === true, "data: URL ถือเป็นรูปจริง");
ok(run(`isRealMerchantPhoto(${JSON.stringify(stockOwnerPhoto)})`) === false, "ลิงก์ Unsplash ถือเป็นรูปตัวอย่าง ไม่ใช่รูปจริง");
ok(run("isRealMerchantPhoto('')") === false && run("isRealMerchantPhoto(undefined)") === false, "ว่างเปล่า/ไม่มีค่า ไม่ใช่รูปจริง");

console.log("== รูปยังไม่ครบ (ยังเป็นรูปตัวอย่าง): อนุมัติไม่ได้เด็ดขาด (ไม่ขึ้นกล่องยืนยันด้วยซ้ำ)");
apps = [mkApp("APP-SHOP-1111", { ownerImage: stockOwnerPhoto, stallImage: stockStallPhoto })];
owner = true; toasts.length = 0; viewCalls.length = 0; smsCalls.length = 0;
await run("approveMerchantApplication('APP-SHOP-1111')");
ok(apps[0].status === "pending", "สถานะยังเป็น pending ไม่ถูกอนุมัติ");
ok(toasts.some(t => /ยังขาด/.test(t)), "แจ้งเตือนว่าขาดรูปอะไรบ้าง");
ok(viewCalls.includes("APP-SHOP-1111"), "เปิดหน้ารายละเอียดให้เจ้าของดูทันที");
ok(!apps[0].photosVerifiedAt, "ไม่ถูกทำเครื่องหมายว่าตรวจสอบแล้ว");
ok(smsCalls.length === 0, "ไม่มีการสร้าง/ส่งรหัสผ่านใด ๆ เลย");

console.log("== รูปครบ แต่เจ้าของกด \"ยกเลิก\" ตอนถูกถามยืนยัน");
apps = [mkApp("APP-SHOP-2222", fullPhotos)]; owner = true; confirmReturn = false; toasts.length = 0; smsCalls.length = 0;
await run("approveMerchantApplication('APP-SHOP-2222')");
ok(apps[0].status === "pending" && !apps[0].photosVerifiedAt, "ยกเลิก → ยังไม่อนุมัติ ยังไม่ถูกทำเครื่องหมายว่าตรวจแล้ว");
ok(toasts.some(t => /ยกเลิก/.test(t)), "แจ้งว่ายกเลิกการอนุมัติ");
ok(smsCalls.length === 0, "ไม่มีการสร้างรหัสผ่าน (ยกเลิกก่อนถึงขั้นตอนนั้น)");

console.log("== รูปครบ + เจ้าของยืนยัน → อนุมัติสำเร็จ");
apps = [mkApp("APP-SHOP-3333", fullPhotos)]; owner = true; confirmReturn = true; toasts.length = 0; smsCalls.length = 0;
MARKET_DATA = []; ALL_100_STALLS = []; STALL_CATALOG_DATABASE = {};
await run("approveMerchantApplication('APP-SHOP-3333')");
ok(apps[0].status === "approved", "อนุมัติสำเร็จ");
ok(!!apps[0].photosVerifiedAt && apps[0].photosVerifiedBy === "เจ้าของ", "บันทึกว่าใครตรวจ/เมื่อไหร่");
ok(apps[0].loginHash && apps[0].loginHash.length === 64, "สร้างรหัสผ่านเข้าระบบให้เรียบร้อย");
ok(smsCalls.length === 1, "เปิดหน้าต่างส่งรหัสผ่านให้ร้านค้า");
ok(MARKET_DATA.some(s => s.stallId === "APP-SHOP-3333"), "สร้างร้านใน MARKET_DATA แล้ว");

console.log("== เคยตรวจสอบแล้วครั้งก่อน (เช่นอนุมัติซ้ำหลัง reconsider) ไม่ต้องถามซ้ำ");
apps = [Object.assign(mkApp("APP-SHOP-4444", fullPhotos), { photosVerifiedAt: "2026-09-20T00:00:00.000Z", photosVerifiedBy: "เจ้าของ" })];
owner = true; confirmReturn = false; toasts.length = 0; smsCalls.length = 0;   // confirm() คืนค่า false แต่ไม่ควรถูกเรียกเลย
MARKET_DATA = []; ALL_100_STALLS = []; STALL_CATALOG_DATABASE = {};
await run("approveMerchantApplication('APP-SHOP-4444')");
ok(apps[0].status === "approved", "อนุมัติได้เลยโดยไม่ต้องยืนยันซ้ำ (ไม่ถูกบล็อกจาก confirm ที่คืนค่า false)");
ok(apps[0].photosVerifiedAt === "2026-09-20T00:00:00.000Z", "วันที่ตรวจสอบเดิมไม่ถูกเขียนทับ");

console.log("== ผู้ใช้ทั่วไปอนุมัติไม่ได้ (สิทธิ์เจ้าของเท่านั้น เหมือนเดิม)");
apps = [mkApp("APP-SHOP-5555", fullPhotos)]; owner = false; toasts.length = 0;
await run("approveMerchantApplication('APP-SHOP-5555')");
ok(apps[0].status === "pending" && toasts.includes("owner-required"), "ผู้ใช้ทั่วไปอนุมัติไม่ได้");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
})();
