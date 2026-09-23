// ทดสอบด่านตรวจก่อนสั่งซื้อของลูกค้า (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง)
//   - ไม่มีสินค้า / ร้านพักร้าน / ยังไม่ล็อกอิน / ไม่มีเบอร์ / ไม่มีที่อยู่ / ที่อยู่ปลอมเก่า -> สั่งไม่ได้ และบอกเหตุผลชัดเจน
//   - ล็อกอินด้วยเบอร์ + ปักที่อยู่จริง -> สั่งได้
//   - ล็อกอินด้วย LINE ID ต้องกรอกเบอร์ในช่องหน้าชำระเงิน
const fs = require("fs");
const vm = require("vm");
const path = require("path");
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

const els = {};
const mk = () => ({ value: "", textContent: "", classList: { _h: true, toggle(c, on) { this._h = on; }, add() { }, remove() { } }, scrollIntoView() { }, focus() { ctx._focused = true; } });
["checkout-contact-phone-input", "checkout-contact-phone-wrap", "checkout-error-box"].forEach(id => els[id] = mk());
const toasts = [], calls = [];
const ctx = {
    console, localStorage: { getItem: () => null, setItem() { }, removeItem() { } },
    state: { cart: [], customer: null, deliveryLocation: null },
    MARKET_DATA: [], ALL_100_STALLS: [],
    calculateCartTotals: () => ({ itemsCount: (ctx.state.cart || []).reduce((a, i) => a + (i.qty || 1), 0) }),
    showToast: m => toasts.push(m),
    openCustomerLoginModal: () => calls.push("login"), openLocationModal: () => calls.push("location"),
    saveLocationToStorage: () => calls.push("save-null"), updateDeliveryLocationUI: () => { },
    document: { getElementById: id => els[id] || null, querySelector: sel => (/payment_method/.test(sel) ? (ctx._pay ? { value: ctx._pay } : null) : null) },
    generateUniquePaymentAmount: t => ({ exactAmount: Number(t.grandTotal || 100) + 0.37 }),
    clearPromptPaySlip: () => { }, clearSCBSlip: () => { },
    simulatePaymentSuccess: t => calls.push("order:" + t)
};
["promptpay-modal", "scb-transfer-modal", "modal-qr-grand-total", "scb-modal-amount"].forEach(id => els[id] = mk());
vm.createContext(ctx);
vm.runInContext([
    between("const _FAKE_DEFAULT_ADDRESS_PREFIX", "}\n\nfunction loadSavedLocation").replace("\n\nfunction loadSavedLocation", ""),
    fn("getCustomerContactPhone"), fn("formatThaiPhone"), fn("syncCheckoutContactField"), fn("showCheckoutError"),
    fn("validateOrderPrerequisites"), fn("enforceOrderPrerequisites"), fn("processOrderCheckout")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
const cartItem = (stallId, name) => ({ stallId, stallName: name || stallId, qty: 1 });
const realLoc = { isSet: true, lat: 13.3, lng: 101.1, fullAddress: "12 หมู่ 3 ต.บ้านบึง", title: "บ้านฉัน" };
const phoneUser = { isLoggedIn: true, identifier: "081-234-5678", type: "phone" };
const reset = () => { ctx.state.cart = [cartItem("S1", "ร้านผัก")]; ctx.state.customer = { ...phoneUser }; ctx.state.deliveryLocation = { ...realLoc }; ctx.MARKET_DATA.length = 0; ctx.MARKET_DATA.push({ stallId: "S1", stallName: "ร้านผัก", isClosed: false }); els["checkout-contact-phone-input"].value = ""; toasts.length = 0; calls.length = 0; };

console.log("== ผ่านด่าน");
reset();
let r = run("validateOrderPrerequisites()");
ok(r.ok === true, "ล็อกอินด้วยเบอร์ + ที่อยู่จริง + ร้านเปิด → สั่งได้");
ok(run("getCustomerContactPhone()") === "0812345678", "ดึงเบอร์จากบัญชีเป็นตัวเลขล้วน");
ok(run("formatThaiPhone('0812345678')") === "081-234-5678", "จัดรูปแบบเบอร์ 081-234-5678");

console.log("== ไม่ผ่านด่าน (ต้องมีเหตุผลชัดเจน)");
reset(); ctx.state.cart = [];
r = run("validateOrderPrerequisites()");
ok(!r.ok && /ตะกร้า/.test(r.message), "ตะกร้าว่าง → สั่งไม่ได้");

reset(); ctx.MARKET_DATA[0].isClosed = true;
r = run("validateOrderPrerequisites()");
ok(!r.ok && /พักรับออเดอร์/.test(r.message) && r.message.includes("ร้านผัก"), "ร้านพักร้าน → สั่งไม่ได้ และบอกชื่อร้าน (แม้ของอยู่ในตะกร้าก่อนพักร้าน)");

reset(); ctx.state.customer = null;
r = run("validateOrderPrerequisites()");
ok(!r.ok && r.action === "login", "ยังไม่ล็อกอิน → ให้ล็อกอินก่อน (ไม่สร้างลูกค้าปลอม)");
ok(ctx.state.customer === null, "ระบบไม่สร้าง 'คุณลูกค้าทั่วไป' ให้เองแล้ว");

reset(); ctx.state.deliveryLocation = null;
r = run("validateOrderPrerequisites()");
ok(!r.ok && r.action === "location", "ไม่มีที่อยู่ → ให้ปักหมุดก่อน");

reset(); ctx.state.deliveryLocation = { isSet: true, lat: 13.3105, lng: 101.1142, fullAddress: "บ้านเลขที่ 12/3 ซอยเทศบาล 1 ต.บ้านบึง อ.บ้านบึง จ.ชลบุรี" };
r = run("validateOrderPrerequisites()");
ok(!r.ok && r.action === "location" && ctx.state.deliveryLocation === null && calls.includes("save-null"), "ที่อยู่ปลอมที่เวอร์ชันเก่าเคยเก็บไว้ → ไม่ยอมรับ ล้างทิ้ง และให้ปักหมุดใหม่");

reset(); ctx.state.deliveryLocation = { isSet: true, fullAddress: "ที่ไหนสักแห่ง" };
r = run("validateOrderPrerequisites()");
ok(!r.ok && r.action === "location", "ที่อยู่ที่ไม่มีพิกัด → ไม่ผ่าน");

console.log("== ล็อกอินด้วย LINE ID (ไม่มีเบอร์)");
reset(); ctx.state.customer = { isLoggedIn: true, identifier: "mylineid", type: "line" };
r = run("validateOrderPrerequisites()");
ok(!r.ok && r.focusId === "checkout-contact-phone-input", "ต้องกรอกเบอร์ในช่องหน้าชำระเงิน");
run("syncCheckoutContactField()");
ok(els["checkout-contact-phone-wrap"].classList._h === false, "แสดงช่องกรอกเบอร์เมื่อบัญชีไม่มีเบอร์");
els["checkout-contact-phone-input"].value = "12345";
ok(!run("validateOrderPrerequisites()").ok, "เบอร์สั้นเกินไป → ไม่ผ่าน");
els["checkout-contact-phone-input"].value = "089-999-8877";
r = run("validateOrderPrerequisites()");
ok(r.ok && run("getCustomerContactPhone()") === "0899998877", "กรอกเบอร์ถูกต้อง → ผ่าน");
reset();
run("syncCheckoutContactField()");
ok(els["checkout-contact-phone-wrap"].classList._h === true, "บัญชีที่มีเบอร์อยู่แล้ว → ซ่อนช่องกรอกเบอร์");

console.log("== enforceOrderPrerequisites: กล่องแดง + พาไปแก้");
reset(); ctx.state.customer = null;
ok(run("enforceOrderPrerequisites()") === false && els["checkout-error-box"].textContent.includes("เข้าสู่ระบบ") && els["checkout-error-box"].classList._h === false && calls.includes("login"), "ไม่ล็อกอิน → กล่องแดงขึ้น + เปิดหน้าล็อกอิน");
reset(); ctx.state.deliveryLocation = null;
run("enforceOrderPrerequisites()");
ok(calls.includes("location"), "ไม่มีที่อยู่ → เปิดหน้าปักหมุด");
reset();
ok(run("enforceOrderPrerequisites()") === true && els["checkout-error-box"].classList._h === true, "ผ่านแล้ว → กล่องแดงถูกซ่อน");

console.log("== processOrderCheckout ทำงานจริงหลังผ่านด่าน (ไม่ error)");
reset(); ctx._pay = "cod"; ctx.calculateCartTotals = () => ({ itemsCount: 1, grandTotal: 100 });
let threw = null;
try { run("processOrderCheckout()"); } catch (e) { threw = e; }
ok(!threw && calls.includes("order:cod"), "เก็บเงินปลายทาง (COD): ผ่านด่านแล้วสร้างออเดอร์ (" + (threw ? threw.message : "ไม่ error") + ")");
reset(); ctx._pay = "promptpay"; calls.length = 0; threw = null;
try { run("processOrderCheckout()"); } catch (e) { threw = e; }
ok(!threw && !calls.includes("login") && !calls.includes("location"), "PromptPay: ผ่านด่านแล้วไม่ error (" + (threw ? threw.message : "ไม่ error") + ")");
reset(); ctx._pay = "cod"; ctx.state.customer = null; calls.length = 0; threw = null;
try { run("processOrderCheckout()"); } catch (e) { threw = e; }
ok(!threw && !calls.some(c => c.startsWith("order:")) && calls.includes("login"), "ไม่ผ่านด่าน (ยังไม่ล็อกอิน): ไม่สร้างออเดอร์ และเปิดหน้าล็อกอิน");
ctx.calculateCartTotals = () => ({ itemsCount: (ctx.state.cart || []).reduce((a, i) => a + (i.qty || 1), 0) });

console.log("== โค้ดเก่าที่ต้องหายไป");
ok(!/state\.customer = \{\s*name: "คุณลูกค้าทั่วไป"/.test(src), "ไม่มีโค้ดสร้างลูกค้าปลอม 'คุณลูกค้าทั่วไป' แล้ว");
ok(!/บ้านเลขที่ 12\/3 ซอยเทศบาล 1 ต\.บ้านบึง อ\.บ้านบึง จ\.ชลบุรี",\s*\n\s*detail/.test(src), "ไม่มีโค้ดสร้างที่อยู่ปลอมตอนกดสั่งแล้ว");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
