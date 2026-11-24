// ทดสอบงาน 2026-11-25: ออเดอร์โอนเงิน (พร้อมเพย์/SCB) ต้อง "รอ" ฮับกดยืนยันสลิปก่อน ถึงจะส่งให้ร้าน/ไรเดอร์เห็น
// เจ้าของตัดสินใจ (ข้อ 2 ของ 8 เรื่องที่ตรวจไว้ 2026-11-18): เดิมส่งออเดอร์ให้ร้านเตรียมของทันทีโดยไม่รอฮับตรวจสลิป
// ตอนนี้: saveOrderSideCopiesToCloud ข้ามการสร้าง rider_jobs/stall_orders ถ้ายังไม่ยืนยัน, approveOrderPayment เรียก releaseOrderSideCopies เองตอนยืนยันผ่าน
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

console.log("== โค้ดต้นฉบับ: ข้ามรอบกัน false negative ==");
ok(/if \(orderNeedsPaymentVerification\(order\)\) return;/.test(fn("saveOrderSideCopiesToCloud")), "saveOrderSideCopiesToCloud ข้ามเมื่อยังไม่ยืนยันสลิป");
ok(/releaseOrderSideCopies\(toFirebaseKey\(order\.orderId\), order\);/.test(fn("approveOrderPayment")), "approveOrderPayment เรียก releaseOrderSideCopies ตอนยืนยันผ่าน");

// ---- สภาพแวดล้อมจำลอง (ไม่มีอินเทอร์เน็ต ไม่มีฐานข้อมูลจริง) ----
const writes = []; // { path: "rider_jobs/<k>" | "stall_orders/<sid>/<k>", data }
const toasts = [];
const ctx = {
    console, Math, Number, String, JSON, Object, Array, Date,
    state: { activeOrder: null, activeAdmin: { name: "เจ้าของ" } },
    window: {},
    document: { getElementById: () => null },
    showToast: t => toasts.push(t),
    playOrderAlertSound: () => {},
    renderHubPickingList: () => {}, renderTrackingScreen: () => {}, renderAdminReport: () => {},
    saveActiveOrderToStorage: () => {},
    updateOrderStatusInFirebase: () => {},
    _collectAllOrders: () => [],
    isFirebaseReady: () => true,
    getAuthUid: () => "uid-customer-1",
    toFirebaseKey: s => String(s).replace(/[.#$/[\]]/g, "_"),
    staffKeyId: s => String(s).replace(/[.#$/[\]]/g, "_"),
    riderTripFeeForOrder: () => 30,
    orderDistanceKm: () => 2,
    db: {
        ref: p => ({
            set: d => { writes.push({ path: p, data: d }); return Promise.resolve(); },
            update: d => { writes.push({ path: p, data: d, kind: "update" }); return Promise.resolve(); },
            catch: () => {}
        })
    }
};
vm.createContext(ctx);
vm.runInContext("var _newOrderIds = new Set();", ctx);
["buildRiderJobCard", "buildStallOrderCopy", "orderNeedsPaymentVerification", "releaseOrderSideCopies",
 "saveOrderSideCopiesToCloud", "approveOrderPayment"].forEach(n => vm.runInContext(fn(n), ctx));
const C = ctx;

function freshOrder(overrides) {
    return Object.assign({
        orderId: "#TH-0001",
        customerUid: "uid-customer-1",
        paymentType: "promptpay",
        paymentVerified: false,
        savedAt: Date.now(),
        stalls: [{ stallId: "APP-SHOP-0001", name: "ร้านทดสอบ", items: [] }]
    }, overrides);
}

console.log("== ออเดอร์โอนเงินที่ยังไม่ยืนยัน: ไม่ส่งให้ร้าน/ไรเดอร์เห็น ==");
{
    const order = freshOrder();
    C._newOrderIds.add(order.orderId);
    C.saveOrderSideCopiesToCloud("TH-0001", order);
    ok(writes.length === 0, "ยังไม่ยืนยันสลิป: ไม่เขียน rider_jobs / stall_orders เลย");
    ok(C._newOrderIds.has(order.orderId), "ยังค้างใน _newOrderIds รอให้ approveOrderPayment มาปล่อยทีหลัง");
}

console.log("== ฮับกดยืนยันสลิปผ่าน: ส่งให้ร้าน/ไรเดอร์เห็นทันที ==");
{
    writes.length = 0;
    const order = freshOrder();
    C.state.activeOrder = order;
    C.approveOrderPayment(order.orderId);
    ok(order.paymentVerified === true, "ออเดอร์ถูกตั้งเป็นยืนยันแล้ว");
    const key = C.toFirebaseKey(order.orderId);
    const riderWrite = writes.find(w => w.path === `rider_jobs/${key}`);
    const stallWrite = writes.find(w => w.path === `stall_orders/APP-SHOP-0001/${key}`);
    ok(!!riderWrite, "สร้างใบงานไรเดอร์ (rider_jobs) หลังยืนยัน");
    ok(!!stallWrite, "สร้างสำเนาของร้าน (stall_orders) หลังยืนยัน");
}

console.log("== ออเดอร์ COD/ที่ยืนยันแล้วตั้งแต่ต้น: ส่งทันทีไม่ต้องรอ ==");
{
    writes.length = 0;
    const order = freshOrder({ orderId: "#TH-0002", paymentVerified: true });
    C._newOrderIds.add(order.orderId);
    C.saveOrderSideCopiesToCloud("TH-0002", order);
    ok(writes.some(w => w.path === "rider_jobs/TH-0002"), "ยืนยันแล้วตั้งแต่สร้างออเดอร์ (เช่น ออเดอร์เก่า/ยืนยันไว้แล้ว): ส่งทันที ไม่ต้องรอซ้ำ");
}

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
