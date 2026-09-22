// ทดสอบ pickMyOwnActiveOrder — ใช้แทนที่ "หยิบออเดอร์ล่าสุดของใครก็ได้" ใน syncLatestOrderFromCloud /
// syncAdminOrdersFromCloud / listenToFirebaseOrdersForAdmin (บั๊กที่พบ 2026-09-22, ดู order-broadcast-leak.test.js)
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

const ctx = { console, state: { activeOrder: null, customer: null } };
vm.createContext(ctx);
vm.runInContext(fn("pickMyOwnActiveOrder"), ctx);
const call = list => { ctx._list = list; return vm.runInContext("pickMyOwnActiveOrder(_list)", ctx); };

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

const orderA = { orderId: "#TH-1", customerPhone: "0811111111", status: "picking", savedAt: 1000 };
const orderB = { orderId: "#TH-2", customerPhone: "0822222222", status: "picking", savedAt: 2000 };
const orderC_delivered = { orderId: "#TH-3", customerPhone: "0833333333", status: "delivered", savedAt: 3000 };

console.log("== ไม่มีลูกค้าล็อกอิน ไม่มีออเดอร์ที่ติดตามอยู่ก่อน");
ctx.state = { activeOrder: null, customer: null };
ok(call([orderA, orderB]) === null, "ไม่รู้ว่าใคร → ไม่หยิบออเดอร์ใครมาให้ทั้งนั้น (แม้จะมีออเดอร์ล่าสุดอยู่ก็ตาม)");
ok(call([]) === null, "รายการว่าง → null");
ok(call(null) === null, "ไม่ใช่ array → null (กันพัง)");

console.log("== ลูกค้าล็อกอินด้วยเบอร์ตัวเอง");
ctx.state = { activeOrder: null, customer: { isLoggedIn: true, identifier: "082-222-2222", type: "phone" } };
ok(call([orderA, orderB]).orderId === "#TH-2", "หยิบเฉพาะออเดอร์ที่เบอร์ตรงกับบัญชีที่ล็อกอิน");
ctx.state.customer.identifier = "081-999-9999";
ok(call([orderA, orderB]) === null, "เบอร์ไม่ตรงกับใครเลย → ไม่หยิบออเดอร์ของคนอื่นมาให้");

console.log("== ออเดอร์ที่ส่งเสร็จแล้วไม่นับ");
ctx.state = { activeOrder: null, customer: { isLoggedIn: true, identifier: "0833333333" } };
ok(call([orderC_delivered]) === null, "ออเดอร์ของตัวเองแต่ส่งเสร็จแล้ว (delivered) ไม่ถูกหยิบมา (ให้ตกไปที่ null ตามเดิม)");

console.log("== ออเดอร์ที่กำลังติดตามอยู่แล้วในเบราว์เซอร์นี้ (มาจากลิงก์ที่ผ่านการตรวจรหัสแล้ว)");
ctx.state = { activeOrder: { orderId: "#TH-1" }, customer: null };
const updatedA = { ...orderA, status: "delivering" };
ok(call([updatedA, orderB]).orderId === "#TH-1", "อัปเดตสถานะของออเดอร์ที่ติดตามอยู่แล้วได้ แม้ไม่ได้ล็อกอินด้วยเบอร์ (เพราะรู้ orderId มาก่อนแล้วอย่างถูกต้อง)");
ok(call([orderB]) === null, "แต่ถ้าออเดอร์ที่ติดตามอยู่ไม่อยู่ในรายการนี้ ก็ไม่สลับไปเอาออเดอร์อื่นแทน");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
