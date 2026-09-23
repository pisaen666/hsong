// ทดสอบ "รหัสติดตามออเดอร์" (ไม่ต้องล็อกอิน) — ไม่แตะ Firebase, ไม่แตะ DOM
//   - รหัสสร้างถูกรูปแบบ ไม่ซ้ำ
//   - ตรวจรหัสถูก/ผิด (ยอมพิมพ์ตัวเล็ก/เว้นวรรค/ขีดได้)
//   - ลิงก์ติดตามพกรหัสไปด้วยเสมอ
//   - resolveOrderTrackingAccess: ตัวตัดสินใจว่าเปิดออเดอร์คนอื่นได้ไหม (แกนของฟีเจอร์นี้)
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { webcrypto } = require("crypto");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

function between(a, b) {
    const s = src.indexOf(a); const e = src.indexOf(b, s);
    if (s < 0 || e < 0) throw new Error("marker missing " + a);
    return src.slice(s, e + b.length);
}

const ctx = { console, crypto: webcrypto, Uint8Array, Math, String, window: {} };
vm.createContext(ctx);
vm.runInContext(between("const ORDER_TRACK_CODE_ALPHABET", "window.resolveOrderTrackingAccess = resolveOrderTrackingAccess;"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

console.log("== สร้างรหัส");
const codes = new Set();
let allSixChars = true, allSafeAlphabet = true;
for (let i = 0; i < 500; i++) {
    const c = run("generateOrderTrackCode()");
    codes.add(c);
    if (c.length !== 6) allSixChars = false;
    if (!/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(c)) allSafeAlphabet = false;
}
ok(allSixChars, "รหัสยาว 6 ตัวเสมอ");
ok(allSafeAlphabet, "ใช้เฉพาะตัวอักษรที่อ่านไม่สับสน (ไม่มี 0 O 1 I L)");
ok(codes.size === 500, "สุ่ม 500 ครั้งไม่ซ้ำกันเลย");

console.log("== ตรวจรหัส");
ctx._order = { orderId: "#TH-1234", trackCode: "K7MQ9X" };
ok(run("verifyOrderTrackCode(_order, 'K7MQ9X')") === true, "รหัสถูกต้องเป๊ะ ๆ ผ่าน");
ok(run("verifyOrderTrackCode(_order, 'k7mq9x')") === true, "พิมพ์ตัวเล็กก็ผ่าน");
ok(run("verifyOrderTrackCode(_order, 'K7-MQ-9X')") === true, "มีขีดคั่นก็ผ่าน (ตัดอักขระที่ไม่ใช่ตัวอักษร/ตัวเลขทิ้ง)");
ok(run("verifyOrderTrackCode(_order, ' K7MQ9X ')") === true, "มีช่องว่างหน้า-หลังก็ผ่าน");
ok(run("verifyOrderTrackCode(_order, 'AAAAAA')") === false, "รหัสผิดไม่ผ่าน");
ok(run("verifyOrderTrackCode(_order, '')") === false, "รหัสว่างไม่ผ่าน");
ok(run("verifyOrderTrackCode({orderId:'x'}, 'K7MQ9X')") === false, "ออเดอร์ที่ไม่มีรหัส ไม่ผ่านเสมอ (กันเดา)");

console.log("== ลิงก์ติดตาม");
ctx._o2 = { orderId: "#TH-9988", trackCode: "PQ2W7Z" };
ok(run("buildOrderTrackingUrl(_o2, 'https://pisaen666.github.io/hsong/')") === "https://pisaen666.github.io/hsong/?track=TH-9988&code=PQ2W7Z", "ลิงก์มีทั้งเลขออเดอร์ (ตัด # ออก) และรหัส");
ctx._o3 = { orderId: "#TH-1", trackCode: "" };
ok(run("buildOrderTrackingUrl(_o3, 'https://x/')") === "https://x/?track=TH-1", "ออเดอร์ที่ไม่มีรหัส (เช่นออเดอร์เก่า) ลิงก์ไม่มี &code=");
ok(run("buildOrderTrackingUrl(null, 'https://x/')") === "", "ไม่มีออเดอร์ → ลิงก์ว่าง");

console.log("== resolveOrderTrackingAccess (แกนของฟีเจอร์: เปิดดูออเดอร์คนอื่นได้ไหม)");
const withCode = { orderId: "#TH-1", trackCode: "ABCD12" };
let r = run("(function(){ ctx=arguments; return null; })()");
ctx._w = withCode;
r = () => {};
const call = (order, code) => { ctx._ord = order; ctx._code = code; return run("resolveOrderTrackingAccess(_ord, _code)"); };
r = call(withCode, "ABCD12");
ok(r.ok === true && r.reason === "ok", "รหัสถูก → เปิดดูได้");
r = call(withCode, "WRONG1");
ok(r.ok === false && r.reason === "bad-code", "รหัสผิด → เปิดดูไม่ได้ (ห้ามรั่วแม้รู้เลขออเดอร์)");
r = call(withCode, "");
ok(r.ok === false && r.reason === "bad-code", "ไม่ใส่รหัสมาเลย (เช่น แชร์แค่เลขออเดอร์กันเอง) → เปิดดูไม่ได้");
r = call(null, "ABCD12");
ok(r.ok === false && r.reason === "not-found", "ไม่มีออเดอร์ → ปิด");
const legacyOrder = { orderId: "#TH-OLD", customerName: "ลูกค้าเก่า" }; // ออเดอร์ก่อนมีระบบนี้ ไม่มี trackCode
r = call(legacyOrder, "");
ok(r.ok === true && r.reason === "legacy-no-code", "ออเดอร์เก่าก่อนมีระบบนี้ (ไม่มีรหัส) ยังเปิดได้ตามเดิม (ข้อจำกัดที่ทราบ ย้อนออกรหัสให้ไม่ได้)");

console.log("== ทุกครั้งที่สร้างออเดอร์ต้องได้รหัสติดตามด้วยเสมอ");
ok(/trackCode:\s*generateOrderTrackCode\(\)/.test(src), "simulatePaymentSuccess ใส่ trackCode ให้ทุกออเดอร์ใหม่");
ok(/handleTrackingDeepLink[\s\S]{0,3000}resolveOrderTrackingAccess/.test(src), "handleTrackingDeepLink (ทางเข้าเดียวที่เปิดออเดอร์จากลิงก์) เรียกใช้ตัวตรวจรหัสจริง");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
