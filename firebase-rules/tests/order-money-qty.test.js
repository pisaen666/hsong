// ทดสอบงาน 2026-09-24 (หลังเจ้าของตัดสินใจ 3 ข้อ):
// (ก) เงินของสินค้าต้องเป็น ราคา x จำนวน ทุกจุด: ยอดขายร้าน, เงินโอนให้ร้าน (ฮับ), เงินคืนลูกค้าเมื่อของหมด, ใบเสร็จ, หน้าติดตาม
//     เดิมหลายจุดลืมคูณจำนวน: สั่ง 2 กำ หมด -> คืนเงินแค่ 1 กำ, ฮับโอนเงินให้ร้านขาดไป
// (ข) ฟอร์มเปิดร้านบังคับกรอกบัญชีรับเงินหลัก (merchantBankAccountProblem)
// (ค) หน้าส่งใบสมัครเปิดร้านสำเร็จไม่มีปุ่ม "ไรเดอร์ (Role 4)" แล้ว
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const htmlSrc = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}
const ctx = {};
vm.createContext(ctx);
["orderItemLineTotal", "merchantStallItemsTotal", "merchantBankAccountProblem"].forEach(n => vm.runInContext(fn(n), ctx));

console.log("== (ก) ราคา x จำนวน ==");
const line = ctx.orderItemLineTotal;
ok(line({ price: 20, qty: 2 }) === 40, "ผักบุ้ง 20 x 2 = 40");
ok(line({ price: 20 }) === 20, "ไม่มีจำนวน = 1 หน่วย");
ok(line({ price: 100, actualPrice: 110, qty: 2 }) === 220, "ใช้ราคาชั่งจริงต่อหน่วยถ้ามี");
ok(line({ price: "25", quantity: "3" }) === 75, "รับค่าที่เป็นตัวหนังสือได้");
ok(line(null) === 0 && line({}) === 0, "ข้อมูลว่างไม่พัง");
ok(ctx.merchantStallItemsTotal([{ price: 20, qty: 2 }, { price: 25, qty: 2, outOfStock: true }]) === 40, "ยอดขายร้านไม่นับของหมด");

const bodies = {
    "renderHubSettlement (ฮับโอนเงินให้ร้าน)": fn("renderHubSettlement"),
    "goToRiderTrackingScreen (เงินคืน)": fn("goToRiderTrackingScreen"),
    "renderRiderScreen (ซองเงินทอนของไรเดอร์)": fn("renderRiderScreen"),
    "renderTrackingScreen (หน้าติดตามลูกค้า)": fn("renderTrackingScreen"),
    "renderHubPickingList (หน้าหยิบของฮับ)": fn("renderHubPickingList"),
    "toggleHubItemOutOfStock (ฮับแจ้งของหมด)": fn("toggleHubItemOutOfStock"),
    "sendOutOfStockLineNotice (ข้อความ LINE ของหมด)": fn("sendOutOfStockLineNotice"),
    "openReceiptModal (ใบเสร็จ)": fn("openReceiptModal")
};
Object.entries(bodies).forEach(([label, body]) => {
    ok(/orderItemLineTotal\(|merchantStallItemsTotal\(/.test(body), `${label} ใช้ตัวคิดเงิน ราคา x จำนวน`);
    // รูปแบบเก่าที่คิดเงินจากราคาต่อหน่วยตรง ๆ แล้วบวกเข้ายอด/เงินคืน
    // "+= price" ใช้ได้เฉพาะเมื่อ price มาจาก orderItemLineTotal (ราคา x จำนวน) แล้ว
    const addsVar = /(refundCashTotal|refundTotal|subtotal)\s*\+=\s*(price|pr)\s*;/.test(body);
    const varIsLineTotal = /const (price|pr) = orderItemLineTotal\(/.test(body);
    ok(!addsVar || varIsLineTotal, `${label} ไม่บวกราคาต่อหน่วยเข้ายอดเงินแบบเดิม`);
    ok(!/refund\w*\s*\+=\s*\((it|item|i)\.actualPrice !== undefined/.test(body), `${label} ไม่คิดเงินคืนจากราคาต่อหน่วย`);
});
ok(!/oosItems\.reduce\(\(s,i\)=>s\+\(i\.actualPrice\|\|i\.price\),0\)/.test(appSrc), "ป้ายเงินคืนในหน้าติดตามคูณจำนวนแล้ว");
ok(/const stallItemsTotal = merchantStallItemsTotal\(stall\.items\);/.test(fn("renderHubSettlement")), "ยอดโอนให้ร้านในหน้าฮับใช้ merchantStallItemsTotal");

console.log("== (ข) บังคับบัญชีรับเงินของร้าน ==");
const bank = ctx.merchantBankAccountProblem;
ok(bank("กสิกรไทย (KBank)", "", "ป้าแดง").focusId === "m-bank-account-no", "ไม่กรอกเลขบัญชี -> ไม่ผ่าน ชี้ไปช่องเลขบัญชี");
ok(bank("กสิกรไทย (KBank)", "12345", "ป้าแดง").focusId === "m-bank-account-no", "เลขบัญชีสั้นเกิน -> ไม่ผ่าน");
ok(bank("กสิกรไทย (KBank)", "123-4-56789-0", "") .focusId === "m-bank-account-name", "ไม่กรอกชื่อบัญชี -> ไม่ผ่าน ชี้ไปช่องชื่อบัญชี");
ok(bank("กสิกรไทย (KBank)", "123-4-56789-0", "นางแดง ตัวอย่าง") === null, "เลขบัญชีธนาคาร 10 หลัก (มีขีด) + ชื่อ -> ผ่าน");
ok(bank("พร้อมเพย์ (PromptPay)", "0812345678", "นางแดง") === null, "พร้อมเพย์เบอร์มือถือ 10 หลัก -> ผ่าน");
ok(bank("พร้อมเพย์ (PromptPay)", "1234567890123", "นางแดง") === null, "พร้อมเพย์เลขบัตร 13 หลัก -> ผ่าน");
ok(bank("พร้อมเพย์ (PromptPay)", "12345678901", "นางแดง") !== null, "พร้อมเพย์ 11 หลัก -> ไม่ผ่าน");
ok(bank("กสิกรไทย (KBank)", "12345abcde", "นางแดง") !== null, "เลขบัญชีมีตัวอักษร -> ไม่ผ่าน");
const save = fn("saveMerchantStallData");
const iBank = save.indexOf("merchantBankAccountProblem(");
ok(iBank > 0 && iBank < save.indexOf("if (isNewRegistration)"), "saveMerchantStallData ตรวจบัญชีก่อนบันทึก (ทั้งสมัครใหม่และแก้ไข)");
ok(/m-bank-account-no/.test(save.slice(iBank, iBank + 400)) && /m-bank-account-name/.test(save.slice(iBank, iBank + 400)), "อ่านค่าจากช่องบัญชีหลักที่ 1 จริง");

console.log("== (ค) ไม่มีปุ่มไรเดอร์ในหน้าส่งใบสมัครร้านสำเร็จ ==");
const succ = htmlSrc.slice(htmlSrc.indexOf('id="merchant-portal-step-success"'), htmlSrc.indexOf("MERCHANT PREVIEW MODAL"));
ok(succ.length > 1000, "เจอหน้าส่งใบสมัครสำเร็จ");
ok(!/switchRole\('rider'\)/.test(succ) && !/<span>🛵 ไรเดอร์ \(Role 4\)<\/span>/.test(succ), "ไม่มีปุ่มสลับไปไรเดอร์แล้ว");
ok(/openStatusCheckModal\('merchant'\)/.test(succ), "ปุ่มตรวจสถานะด้วยเบอร์ยังอยู่");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
