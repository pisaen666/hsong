// ทดสอบงาน 2026-11-25: ร้านค้ามีเสียงเตือนออเดอร์ใหม่ + ต้องกดรับ (ข้อ 3 ของ 8 เรื่องที่ตรวจไว้ 2026-11-18)
// เจ้าของตัดสินใจ: เสียงดังซ้ำทุก ๆ 8 วินาที จนกว่าร้านจะกดรับ (ไม่ใช่ดังครั้งเดียว)
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const appSrc = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

console.log("== โค้ดต้นฉบับ ==");
ok(/playMerchantNewOrderAlertSound/.test(fn("merchantMarkStallReady")) || /merchantAcknowledgeNewOrder/.test(fn("merchantMarkStallReady")), "กด 'เตรียมของเสร็จแล้ว' ตรง ๆ ก็ถือว่ารับออเดอร์แล้ว (หยุดเสียงด้วย)");
ok(/setInterval\(playMerchantNewOrderAlertSound, MERCHANT_ORDER_ALERT_REPEAT_MS\)/.test(fn("updateMerchantOrderAlertLoop")), "ดังซ้ำเป็นช่วง ๆ ไม่ใช่ครั้งเดียว (เจ้าของเลือก)");
ok(/clearInterval/.test(fn("updateMerchantOrderAlertLoop")), "หยุดเสียงได้เมื่อไม่มีออเดอร์ค้างรับทราบแล้ว");
ok(fn("playMerchantNewOrderAlertSound") !== fn("playOrderAlertSound"), "เสียงร้านค้าคนละเสียงกับเสียง 'เงินโอนเข้า' ของฮับ");

// ---- สภาพแวดล้อมจำลอง (ไม่มีอินเทอร์เน็ต ไม่มีฐานข้อมูลจริง) ----
const store = {};
const toasts = [];
let intervalCalls = 0, clearCalls = 0;
const ctx = {
    console, Math, Number, String, JSON, Object, Array, Date,
    window: {},
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
    showToast: t => toasts.push(t),
    renderMerchantIncomingOrders: () => {},
    setInterval: (f, ms) => { intervalCalls++; return 999; },
    clearInterval: () => { clearCalls++; }
};
vm.createContext(ctx);
vm.runInContext('var MERCHANT_ORDER_ALERT_REPEAT_MS = 8000; var _merchantOrderAlertTimer = null;', ctx);
vm.runInContext('function playMerchantNewOrderAlertSound() {}', ctx);
["merchantAckedOrderIdsSet", "saveMerchantAckedOrderIds", "isMerchantOrderAcked", "merchantAcknowledgeNewOrder", "updateMerchantOrderAlertLoop"]
    .forEach(n => vm.runInContext(fn(n), ctx));
const C = ctx;

console.log("== ออเดอร์ใหม่ยังไม่กดรับ: เริ่มเสียงเตือน ==");
{
    ok(!C.isMerchantOrderAcked("#TH-1001"), "ออเดอร์ใหม่ยังไม่ถูกรับทราบ");
    C.updateMerchantOrderAlertLoop(true);
    ok(intervalCalls === 1, "เริ่มตั้ง interval ให้ดังซ้ำ");
    C.updateMerchantOrderAlertLoop(true);
    ok(intervalCalls === 1, "มีออเดอร์ค้างอยู่เหมือนเดิม ไม่ตั้ง interval ซ้ำซ้อน");
}

console.log("== ร้านกดรับทราบ: หยุดเสียง ==");
{
    C.merchantAcknowledgeNewOrder("#TH-1001");
    ok(C.isMerchantOrderAcked("#TH-1001"), "บันทึกว่ารับทราบออเดอร์นี้แล้ว");
    ok(toasts.some(t => t.includes("รับทราบ")), "ขึ้น toast แจ้งว่ารับทราบแล้ว");
    C.updateMerchantOrderAlertLoop(false);
    ok(clearCalls === 1, "ไม่มีออเดอร์ค้างรับทราบแล้ว -> เคลียร์ interval");
}

console.log("== กดรับทราบซ้ำ: ไม่ขึ้น toast ซ้ำ (idempotent) ==");
{
    const before = toasts.length;
    C.merchantAcknowledgeNewOrder("#TH-1001");
    ok(toasts.length === before, "ออเดอร์ที่รับทราบแล้ว กดซ้ำไม่ขึ้นข้อความซ้ำ");
}

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
