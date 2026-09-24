// ทดสอบบั๊กที่พบ 2026-09-22: ตัวฟัง "ออเดอร์ใหม่" (child_added) เคยเขียนทับ state.activeOrder
// ของ "ทุกคน" ที่เปิดเว็บอยู่ ด้วยออเดอร์ล่าสุดของใครก็ได้ — ทำให้คนแปลกหน้าเห็นชื่อ/เบอร์/ที่อยู่ลูกค้าคนอื่น
// บนหน้าติดตามออเดอร์ของตัวเอง (ไม่ต้องรู้ลิงก์หรือรหัสอะไรเลย เพียงแค่เปิดเว็บทิ้งไว้)
//   - ไม่แตะ Firebase จริง: จำลอง callback เดียวกับที่โค้ดลงทะเบียนกับ db.ref("orders").on("child_added", ...)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// ดึง callback ของ child_added ออกมาตรง ๆ จากซอร์ส แล้วรันในบริบทจำลอง (ไม่ใช้ Firebase จริง)
function extractChildAddedCallback() {
    // ตั้งแต่ 2026-09-25 ตัวฟังนี้อยู่ใน attachOrderChildListeners (เปิดเฉพาะเจ้าของ/ไรเดอร์/แม่ค้า)
    const anchor = 'ordersRef.on("child_added", (snapshot) => {';
    const start = src.indexOf(anchor);
    if (start < 0) throw new Error("marker missing: " + anchor);
    let i = src.indexOf("{", start), depth = 0, bodyStart = -1;
    for (; i < src.length; i++) {
        if (src[i] === "{") { if (depth === 0) bodyStart = i + 1; depth++; }
        else if (src[i] === "}") { depth--; if (depth === 0) break; }
    }
    return src.slice(bodyStart, i);
}

const vm = require("vm");
const body = extractChildAddedCallback();
const calls = [];
const ctx = {
    console,
    state: { activeOrder: null, customer: null },
    localStorage: { setItem() { }, getItem: () => null, removeItem() { } },
    isOwnerSignedIn: () => ctx._owner === true,
    getAuthUid: () => ctx._uid || null,
    document: { getElementById: () => null },
    renderTrackingScreen: () => calls.push("renderTrackingScreen"),
    updateHomeActiveOrderBanner: () => calls.push("updateHomeActiveOrderBanner"),
    renderHubPickingList: () => calls.push("renderHubPickingList"),
    renderHubDeliveryView: () => calls.push("renderHubDeliveryView"),
    playOrderAlertSound: () => calls.push("playOrderAlertSound"),
    showToast: m => calls.push("toast:" + m),
    _owner: false
};
vm.createContext(ctx);
const run = snapshot => { ctx._snap = snapshot; vm.runInContext("(function(snapshot){" + body + "})(_snap)", ctx); };
const fakeSnap = orderVal => ({ val: () => orderVal });

console.log("== คนแปลกหน้าเปิดเว็บอยู่เฉย ๆ (ยังไม่ได้ล็อกอิน/ยังไม่มีออเดอร์) ต้องไม่เห็นออเดอร์ของคนอื่น");
ctx.state = { activeOrder: null, customer: null }; ctx._owner = false; calls.length = 0;
const strangersOrder = { orderId: "#TH-9999", customerName: "สมชาย ใจดี", customerPhone: "0899999999", address: "บ้านเลขที่ 1 ถนนลับ", grandTotal: 500, savedAt: Date.now() };
run(fakeSnap(strangersOrder));
ok(ctx.state.activeOrder === null, "state.activeOrder ยังเป็น null อยู่ (ไม่ถูกเขียนทับด้วยออเดอร์คนอื่น)");
ok(!calls.includes("renderTrackingScreen"), "ไม่เรียก renderTrackingScreen ให้คนแปลกหน้า (ไม่โชว์ข้อมูลคนอื่นบนจอ)");

console.log("== ลูกค้า A ล็อกอินด้วยเบอร์ตัวเอง แล้วมีคนอื่น (คนละเบอร์) สั่งของเกือบพร้อมกัน");
ctx.state = { activeOrder: null, customer: { isLoggedIn: true, identifier: "081-111-2222", type: "phone" } }; ctx._owner = false; calls.length = 0;
run(fakeSnap(strangersOrder));
ok(ctx.state.activeOrder === null, "ออเดอร์ของคนอื่น (เบอร์ไม่ตรง) ไม่ถูกเอามาใส่ใน state.activeOrder ของลูกค้า A");

console.log("== แค่เบอร์ตรงกัน ไม่ถือว่าเป็นเจ้าของออเดอร์ (ใครก็พิมพ์เบอร์คนอื่นได้)");
ctx.state = { activeOrder: null, customer: { isLoggedIn: true, identifier: "089-999-9999", type: "phone" } }; ctx._owner = false; ctx._uid = "uid-other"; calls.length = 0;
run(fakeSnap(strangersOrder));
ok(ctx.state.activeOrder === null, "เบอร์ตรงแต่ไม่ใช่เครื่องที่สั่ง: ไม่เอาออเดอร์มาใส่ state.activeOrder");

console.log("== ออเดอร์ของ \"ตัวเอง\" (customerUid = บัตรผ่านของเครื่องนี้) ต้องอัปเดตให้เห็นสถานะสด");
ctx.state = { activeOrder: null, customer: { isLoggedIn: true, identifier: "089-999-9999", type: "phone" } }; ctx._owner = false; ctx._uid = "uid-me"; calls.length = 0;
run(fakeSnap({ ...strangersOrder, customerUid: "uid-me" }));
ok(ctx.state.activeOrder && ctx.state.activeOrder.orderId === "#TH-9999", "ออเดอร์ของตัวเอง (uid ตรง) ถูกอัปเดตเข้า state.activeOrder");
ctx._uid = null;
ok(calls.includes("renderTrackingScreen") && calls.includes("updateHomeActiveOrderBanner"), "รีเฟรชหน้าติดตามให้เจ้าของออเดอร์จริง");

console.log("== ออเดอร์ที่กำลังติดตามอยู่แล้ว (orderId ตรงกัน) ยังอัปเดตสถานะสดได้ตามปกติ");
ctx.state = { activeOrder: { orderId: "#TH-9999", status: "picking" }, customer: null }; ctx._owner = false; calls.length = 0;
run(fakeSnap({ ...strangersOrder, status: "delivering" }));
ok(ctx.state.activeOrder.orderId === "#TH-9999", "ออเดอร์ที่ติดตามอยู่แล้วในเบราว์เซอร์นี้ (มาจากลิงก์ตรวจรหัสแล้ว) อัปเดตสถานะได้ตามปกติ");

console.log("== ฮับ/แอดมิน (ล็อกอินเจ้าของ) ต้องได้รับแจ้งเตือนออเดอร์ใหม่ทุกใบเหมือนเดิม");
ctx.state = { activeOrder: null, customer: null }; ctx._owner = true; calls.length = 0;
run(fakeSnap(strangersOrder));
ok(ctx.state.activeOrder === null, "แม้เป็นเจ้าของ ก็ไม่ต้องยัดใส่ state.activeOrder ของลูกค้า (ฮับใช้รายการของตัวเองแยกต่างหาก)");
ok(calls.includes("renderHubPickingList") && calls.includes("playOrderAlertSound") && calls.some(c => c.startsWith("toast:")), "เจ้าของยังได้ยินเสียง/เห็นแจ้งเตือน/รายการหยิบของอัปเดตเหมือนเดิม");

console.log("== ออเดอร์เก่า (ไม่ใช่ของใหม่ภายใน 30 วิ) ต้องไม่ทำอะไรเลย");
calls.length = 0; ctx.state = { activeOrder: null, customer: null };
run(fakeSnap({ ...strangersOrder, savedAt: Date.now() - 60000 }));
ok(calls.length === 0 && ctx.state.activeOrder === null, "ออเดอร์เก่าเกิน 30 วินาที ไม่ trigger อะไรเลย (กันแตกตอนโหลดหน้าครั้งแรก)");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
