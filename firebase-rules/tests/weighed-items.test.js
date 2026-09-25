// ทดสอบงาน 2026-09-24: ของที่ขายตามน้ำหนัก + ปุ่มของแม่ค้าบนการ์ดออเดอร์ต้องบันทึกได้จริง
// เจ้าของตัดสินใจ: (1ก) แม่ค้าพิมพ์น้ำหนักที่ชั่งได้ (2) น้อยกว่าที่สั่ง = คืนส่วนต่างใส่ซอง (3ก) มากกว่าที่สั่ง = ไม่เก็บเพิ่ม
// บั๊กเดิมที่เจอ: "แจ้งหมด" / "เตรียมของเสร็จแล้ว" ของแม่ค้าทำงานเฉพาะเมื่อออเดอร์นั้นเป็น state.activeOrder
// ของเครื่องแม่ค้าเอง บนมือถือแม่ค้าจริงจึงขึ้นว่าสำเร็จแต่ไม่บันทึกอะไร
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

// ---- สภาพแวดล้อมจำลอง (ไม่มีอินเทอร์เน็ต ไม่มีฐานข้อมูลจริง) ----
const store = {};
const patches = [];
const toasts = [];
const inputs = {};
const ctx = {
    console, Math, Number, String, JSON, Object, Array, Date,
    state: { activeOrder: null },
    window: {},
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
    document: { getElementById: id => inputs[id] || null },
    showToast: t => toasts.push(t),
    isMockOrder: () => false,
    toFirebaseKey: s => String(s).replace(/[.#$/[\]]/g, "_"),
    // กฎ v4: แม่ค้าเขียนผ่าน patchMerchantStall = db.ref().update({ "orders/<k>/stalls/<i>/...": v, "stall_orders/<ร้าน>/<k>/stall/...": v })
    isFirebaseReady: () => true,
    isOwnerSignedIn: () => ctx._owner === true, _owner: false,
    staffKeyId: s => String(s).replace(/[.#$/[\]]/g, "_"),
    db: { ref: () => ({ update: u => { patches.push({ body: u }); return Promise.resolve(); } }) },
    renderMerchantIncomingOrders: () => {}, renderMerchantSettlement: () => {}, renderHubPickingList: () => {}, renderTrackingScreen: () => {}
};
vm.createContext(ctx);
vm.runInContext(appSrc.match(/const WEIGHT_UNITS = \[[^\]]*\];/)[0].replace("const ", "var "), ctx);
["orderItemUnitPrice", "orderItemOrderedQty", "orderItemUnit", "isWeighedOrderItem", "orderItemWeighedQty", "orderItemBilledQty",
 "orderItemLineTotal", "orderItemRefund", "orderRefundTotal", "merchantStallItemsTotal",
 "merchantWeighInputId", "mutateOrderEverywhere", "patchMerchantStall", "_merchantOrderStallIndex", "_refreshAfterMerchantOrderChange",
 "merchantMarkStallReady", "merchantToggleItemOutOfStock", "merchantSetItemWeight"].forEach(n => vm.runInContext(fn(n), ctx));
const C = ctx;

console.log("== หน่วยขายและของชั่งน้ำหนัก ==");
ok(C.orderItemUnit({ name: "หมูสับ (กก.)" }) === "กก.", "ออเดอร์เก่า: แกะหน่วยจากท้ายชื่อ");
ok(C.orderItemUnit({ name: "หมูสับ (กก.)", unit: "ขีด" }) === "ขีด", "ออเดอร์ใหม่: ใช้ช่อง unit");
ok(C.isWeighedOrderItem({ name: "หมูสับ (กก.)" }) && C.isWeighedOrderItem({ unit: "กรัม" }) && C.isWeighedOrderItem({ unit: "ขีด" }), "กก. / ขีด / กรัม = ของชั่ง");
ok(!C.isWeighedOrderItem({ name: "ผักบุ้ง (กำ)" }), "กำ ไม่ใช่ของชั่ง");
ok(/unit: item\.unit \|\| 'ชิ้น'/.test(fn("processOrderCheckout") || "") || /unit: item\.unit \|\| 'ชิ้น',\s+\/\/ ใช้รู้ว่าเป็นของชั่ง/.test(appSrc), "ตอนสั่งซื้อเก็บหน่วยขายไว้ในสินค้าด้วย");

console.log("== คิดเงินตามน้ำหนัก (2: น้อยกว่า คืนส่วนต่าง, 3ก: มากกว่า ไม่เก็บเพิ่ม) ==");
const pork = w => ({ name: "หมูสับ (กก.)", unit: "กก.", price: 100, qty: 1, weighedQty: w });
ok(C.orderItemLineTotal(pork(undefined)) === 100 && C.orderItemRefund(pork(undefined)) === 0, "ยังไม่ชั่ง: คิดตามที่สั่ง 100 ไม่คืน");
ok(C.orderItemLineTotal(pork(0.9)) === 90 && C.orderItemRefund(pork(0.9)) === 10, "ชั่งได้ 0.9 กก.: คิด 90 คืน 10");
ok(C.orderItemLineTotal(pork(1.1)) === 100 && C.orderItemRefund(pork(1.1)) === 0, "ชั่งได้ 1.1 กก.: คิด 100 ไม่เก็บเพิ่ม");
ok(C.orderItemLineTotal(pork(0.93)) === 93 && C.orderItemRefund(pork(0.93)) === 7, "ชั่งได้ 0.93: ปัดเป็นบาทเต็ม 93 คืน 7");
ok(C.orderItemLineTotal({ name: "หมู (กก.)", price: 150, qty: 2, weighedQty: 1.75 }) === 263 && C.orderItemRefund({ name: "หมู (กก.)", price: 150, qty: 2, weighedQty: 1.75 }) === 37, "สั่ง 2 กก. ได้ 1.75: คิด 263 คืน 37 (รวม = 300)");
ok(C.orderItemRefund({ ...pork(0.9), outOfStock: true }) === 100, "ของชั่งที่แจ้งหมด: คืนเต็มที่สั่ง 100");
ok(C.orderItemLineTotal({ name: "ผักบุ้ง (กำ)", price: 20, qty: 2, weighedQty: 1 }) === 40, "ของที่ไม่ใช่ของชั่ง ไม่สนน้ำหนัก");
const order = { stalls: [{ items: [pork(0.9), { name: "ผักบุ้ง (กำ)", price: 20, qty: 2, outOfStock: true }] }] };
ok(C.orderRefundTotal(order) === 50, "เงินคืนรวมทั้งออเดอร์ = ชั่งขาด 10 + ของหมด 40");
ok(C.merchantStallItemsTotal(order.stalls[0].items) === 90, "ยอดขายร้าน = 90 (ไม่นับของหมด คิดตามน้ำหนัก)");

console.log("== จุดคิดเงินคืนทั้งหมดใช้ orderItemRefund / orderRefundTotal ==");
[["renderTrackingScreen", /orderItemRefund\(item\)/], ["renderHubPickingList", /orderItemRefund\(item\)/], ["toggleHubItemOutOfStock", /orderRefundTotal\(state\.activeOrder\)/],
 ["goToRiderTrackingScreen", /orderRefundTotal\(state\.activeOrder\)/], ["renderRiderScreen", /orderRefundTotal\(order\)/], ["sendOutOfStockLineNotice", /orderRefundTotal\(order\)/]]
    .forEach(([name, re]) => ok(re.test(fn(name)), `${name} คิดเงินคืนรวมของชั่งขาดด้วย`));

console.log("== ปุ่มแม่ค้าบันทึกได้แม้ออเดอร์ไม่ใช่ของเครื่องนี้ (บั๊กเดิม) ==");
const cloudOrder = {
    orderId: "HS-0924-0212", grandTotal: 170, status: "packing",
    stalls: [
        { stallId: "OTHER", items: [{ name: "ไข่ (แผง)", price: 50, qty: 1 }] },
        { stallId: "APP-SHOP-0001", items: [{ name: "หมูสับ (กก.)", unit: "กก.", price: 100, qty: 1 }, { name: "ผักบุ้ง (กำ)", unit: "กำ", price: 10, qty: 2 }] }
    ]
};
store.talathub_order_history = JSON.stringify([cloudOrder]);
C.state.activeOrder = { orderId: "MY-OWN-ORDER", stalls: [] };   // เครื่องแม่ค้ามีออเดอร์ของตัวเองอีกอัน
const hist = () => JSON.parse(store.talathub_order_history)[0];

inputs[C.merchantWeighInputId("HS-0924-0212", 0)] = { value: "0.9", focus() {} };
C.merchantSetItemWeight("HS-0924-0212", "APP-SHOP-0001", 0);
ok(hist().stalls[1].items[0].weighedQty === 0.9, "บันทึกน้ำหนักลงออเดอร์ในเครื่อง (ร้านที่ 2 ในออเดอร์)");
ok(hist().refundCashTotal === 10 && hist().finalPaidTotal === 160, "เงินคืนในออเดอร์ = 10, ยอดจ่ายสุทธิ = 160");
let p = patches[patches.length - 1];
const O = "orders/HS-0924-0212/";
ok(p && p.body[O + "stalls/1/items/0/weighedQty"] === 0.9, "ส่งขึ้นคลาวด์เฉพาะช่องที่เปลี่ยน (orders/<k>/stalls/1/items/0/weighedQty)");
ok(!((O + "refundCashTotal") in p.body), "แม่ค้าไม่เขียนยอดคืนเงินรวม (กฎ v4 ให้แก้ได้แค่กลุ่มของร้านตัวเอง ยอดรวมคิดจากรายการของ)");
ok(Object.keys(p.body).every(k => k.startsWith(O + "stalls/1/")), "ไม่เขียนทับทั้งออเดอร์ / ไม่แตะสถานะหรือร้านอื่น");
ok(/คืนลูกค้า ฿10/.test(toasts[toasts.length - 1]), "แจ้งแม่ค้าว่าต้องคืน ฿10");

inputs[C.merchantWeighInputId("HS-0924-0212", 0)] = { value: "abc", focus() {} };
const nPatch = patches.length;
C.merchantSetItemWeight("HS-0924-0212", "APP-SHOP-0001", 0);
ok(patches.length === nPatch && hist().stalls[1].items[0].weighedQty === 0.9, "พิมพ์น้ำหนักผิด ไม่บันทึก");

C.merchantToggleItemOutOfStock("HS-0924-0212", "APP-SHOP-0001", 1);
ok(hist().stalls[1].items[1].outOfStock === true && hist().refundCashTotal === 30, "แจ้งหมดผักบุ้ง 2 กำ: คืน 20 + ชั่งขาด 10 = 30");
p = patches[patches.length - 1];
ok(p.body[O + "stalls/1/items/1/outOfStock"] === true, "ส่งสถานะของหมดขึ้นคลาวด์จริง");
C.merchantToggleItemOutOfStock("HS-0924-0212", "APP-SHOP-0001", 1);
ok(hist().stalls[1].items[1].outOfStock === false && hist().refundCashTotal === 10, "กดกู้คืนได้");

C.merchantMarkStallReady("HS-0924-0212", "APP-SHOP-0001");
p = patches[patches.length - 1];
ok(hist().stalls[1].ready === true && p.body[O + "stalls/1/ready"] === true && p.body[O + "stalls/1/items/0/picked"] === true, "เตรียมของเสร็จ: บันทึกและส่งขึ้นคลาวด์");
ok(!((O + "stalls/0/ready") in p.body), "ไม่แตะร้านอื่นในออเดอร์เดียวกัน");
ok(C.state.activeOrder.orderId === "MY-OWN-ORDER", "ไม่เปลี่ยนออเดอร์ของแม่ค้าเอง");

const nBefore = patches.length;
C.merchantToggleItemOutOfStock("NOT-FOUND", "APP-SHOP-0001", 0);
ok(patches.length === nBefore && /ไม่พบออเดอร์/.test(toasts[toasts.length - 1]), "หาออเดอร์ไม่เจอ: บอกตรง ๆ ไม่ขึ้นว่าสำเร็จ");

console.log("== แม่ค้าบนมือถือจริง: มีแค่สำเนาของร้าน (stall_orders) ไม่มีออเดอร์เต็ม ==");
store.talathub_order_history = "[]";
C.state.activeOrder = null;
C.state.merchantStallOrders = [{ orderId: "HS-0925-0001", status: "picking", _stallIndex: 1,
    stalls: [{ stallId: "APP-SHOP-0001", items: [{ name: "หมูสับ (กก.)", unit: "กก.", price: 100, qty: 1 }] }] }];
inputs[C.merchantWeighInputId("HS-0925-0001", 0)] = { value: "0.8", focus() {} };
C.merchantSetItemWeight("HS-0925-0001", "APP-SHOP-0001", 0);
p = patches[patches.length - 1];
ok(C.state.merchantStallOrders[0].stalls[0].items[0].weighedQty === 0.8, "บันทึกน้ำหนักในสำเนาของร้านบนเครื่อง");
ok(p.body["orders/HS-0925-0001/stalls/1/items/0/weighedQty"] === 0.8, "เขียนลงออเดอร์เต็มที่ตำแหน่งจริงของร้าน (stalls/1) ถึงอ่านออเดอร์เต็มไม่ได้");
ok(p.body["stall_orders/APP-SHOP-0001/HS-0925-0001/stall/items/0/weighedQty"] === 0.8, "เขียนลงสำเนาของร้านด้วย (แม่ค้าเห็นค่าที่บันทึกหลังรีเฟรช)");
C.merchantMarkStallReady("HS-0925-0001", "APP-SHOP-0001");
p = patches[patches.length - 1];
ok(p.body["orders/HS-0925-0001/stalls/1/ready"] === true && p.body["stall_orders/APP-SHOP-0001/HS-0925-0001/stall/ready"] === true, "เตรียมของเสร็จ: ทั้งออเดอร์เต็มและสำเนา");

console.log("== เจ้าของสลับเข้าร้าน: ยังบันทึกยอดคืนเงินรวมได้ ==");
C._owner = true;
C.state.merchantStallOrders = [];
store.talathub_order_history = JSON.stringify([cloudOrder]);
C.merchantToggleItemOutOfStock("HS-0924-0212", "APP-SHOP-0001", 1);
p = patches[patches.length - 1];
ok(typeof p.body[O + "refundCashTotal"] === "number" && typeof p.body[O + "finalPaidTotal"] === "number", "เจ้าของ: ส่งยอดคืนเงินรวมด้วย");
C._owner = false;

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
