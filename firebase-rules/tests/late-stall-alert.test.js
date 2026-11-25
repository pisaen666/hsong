// ทดสอบงาน 2026-11-25: ฮับเห็นร้านไหนเกินเวลาที่ตั้งไว้ยังไม่รับ/ไม่พร้อม (ข้อ 4 ของ 8 เรื่องที่ตรวจไว้ 2026-11-18)
// เจ้าของตัดสินใจ: สร้างตัวจับเวลาจริง (เดิมมีแค่ alertPrepMinutes เป็นข้อความอย่างเดียว ไม่มีอะไรนับจริง)
// "ตัดของแทนร้านได้" (toggleHubItemOutOfStock) ของเดิมถูกต้องแล้ว ไม่แตะ
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

console.log("== index.html: มีช่องให้แสดงแผงร้านล่าช้า ==");
const htmlSrc = fs.readFileSync(path.join(root, "index.html"), "utf8");
ok(/id="hub-late-stalls-panel"/.test(htmlSrc), "มี div#hub-late-stalls-panel ในหน้าฮับ");

console.log("== โค้ดต้นฉบับ ==");
ok(/loadMarketStallSettings\(\)\.alertPrepMinutes/.test(fn("lateStallEntries")), "ใช้ค่า alertPrepMinutes เดิมที่ตั้งไว้แล้ว เป็นตัวกำหนดกี่นาทีถึงเตือน");
ok(/o\.orderType === "MERCHANT_EXPRESS"/.test(fn("lateStallEntries")), "ไม่นับออเดอร์งานด่วนของแผงค้าเอง (ไม่เกี่ยวกับการจัดของที่ฮับ)");
ok(/playOrderAlertSound\(\)/.test(fn("checkLateStallAlerts")), "เตือนด้วยเสียงเมื่อพบร้านล่าช้ารายใหม่");
ok(/_lateStallsAlerted/.test(fn("checkLateStallAlerts")), "แต่ละร้าน/ออเดอร์เตือนซ้ำแค่ครั้งแรกที่พบ (ไม่ดังรัวทุก 30 วิ)");
ok(/renderHubLateStallsPanel\(\); checkLateStallAlerts\(\);/.test(appSrc), "ติดตั้งไว้ในลูปเดิมที่เช็คงานไรเดอร์ค้างทุก 30 วิ");
ok(/renderHubLateStallsPanel\(\)/.test(fn("renderHubPickingList")), "เรียกซ้ำทุกครั้งที่หน้าจัดของรีเฟรช ไม่ต้องรอ 30 วิ");

// ---- สภาพแวดล้อมจำลอง (ไม่มีอินเทอร์เน็ต ไม่มีฐานข้อมูลจริง) ----
const toasts = [];
let soundPlays = 0;
const ctx = {
    console, Math, Number, String, JSON, Object, Array, Date,
    window: {},
    document: { getElementById: () => null },
    showToast: t => toasts.push(t),
    escapeHtml: s => String(s == null ? "" : s),
    jsArg: s => JSON.stringify(String(s)),
    isOwnerSignedIn: () => true,
    loadMarketStallSettings: () => ({ alertPrepMinutes: 15 }),
    playOrderAlertSound: () => { soundPlays++; },
    _collectAllOrders: () => ctx._orders
};
vm.createContext(ctx);
["lateStallEntries", "renderHubLateStallsPanel", "checkLateStallAlerts"].forEach(n => vm.runInContext(fn(n), ctx));
vm.runInContext("var _lateStallsAlerted = new Set();", ctx);
const C = ctx;

function orderWithStalls(id, savedMinsAgo, stalls) {
    return { orderId: id, status: "picking", savedAt: Date.now() - savedMinsAgo * 60000, stalls };
}

console.log("== ร้านที่เพิ่งเข้าออเดอร์ 5 นาที (ยังไม่เกิน 15 นาที): ไม่เตือน ==");
{
    C._orders = [orderWithStalls("#TH-2001", 5, [{ stallId: "APP-SHOP-0001", name: "ร้านเอ", ready: false }])];
    const entries = C.lateStallEntries();
    ok(entries.length === 0, "ยังไม่ถึงเวลาที่ตั้งไว้ (15 นาที) -> ไม่มีรายการเตือน");
}

console.log("== ร้านที่เงียบเกิน 15 นาทียังไม่กดเตรียมของเสร็จ: เตือน + มีเสียง ==");
{
    C._orders = [orderWithStalls("#TH-2002", 20, [{ stallId: "APP-SHOP-0002", name: "ร้านบี", ready: false }])];
    const entries = C.lateStallEntries();
    ok(entries.length === 1 && entries[0].stallId === "APP-SHOP-0002", "พบร้านที่ล่าช้าเกิน 15 นาที 1 ร้าน");
    C.checkLateStallAlerts();
    ok(soundPlays === 1, "เล่นเสียงเตือนเมื่อพบร้านล่าช้ารายใหม่");
    ok(toasts.some(t => t.includes("15 นาที")), "toast บอกจำนวนนาทีที่ตั้งไว้");
}

console.log("== ร้านเดิมที่เตือนไปแล้ว: ไม่เล่นเสียงซ้ำรอบถัดไป ==");
{
    const before = soundPlays;
    C.checkLateStallAlerts();
    ok(soundPlays === before, "ร้านเดิมที่เตือนไปแล้ว ไม่เล่นเสียงซ้ำ (กันรำคาญ)");
}

console.log("== ร้านที่กดเตรียมของเสร็จแล้ว (ready=true): ไม่นับว่าล่าช้า ==");
{
    C._orders = [orderWithStalls("#TH-2003", 30, [{ stallId: "APP-SHOP-0003", name: "ร้านซี", ready: true }])];
    const entries = C.lateStallEntries();
    ok(entries.length === 0, "ร้านเตรียมของเสร็จแล้วแม้ผ่านมานาน ก็ไม่นับว่าล่าช้า");
}

console.log("== ออเดอร์ที่ส่งถึงลูกค้าแล้ว: ไม่นับ ==");
{
    const o = orderWithStalls("#TH-2004", 60, [{ stallId: "APP-SHOP-0004", name: "ร้านดี", ready: false }]);
    o.status = "delivered";
    C._orders = [o];
    ok(C.lateStallEntries().length === 0, "ออเดอร์ส่งถึงแล้ว ไม่ต้องเตือนร้านอีก");
}

console.log("== งานด่วนของแผงค้าเอง (MERCHANT_EXPRESS): ไม่เกี่ยวกับการจัดของที่ฮับ ==");
{
    const o = orderWithStalls("#EXP-2005", 60, [{ stallId: "APP-SHOP-0005", name: "ร้านอี", ready: false }]);
    o.orderType = "MERCHANT_EXPRESS";
    C._orders = [o];
    ok(C.lateStallEntries().length === 0, "ไม่นับงานด่วนที่ร้านเรียกไรเดอร์มารับเอง");
}

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
