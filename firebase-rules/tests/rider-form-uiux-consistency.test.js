// ทดสอบงาน 2026-09-23 (คำขอเจ้าของ): ทำแท็บ 2 ของฟอร์มร้านค้า ("สินค้าและราคาที่ต้องการจำหน่าย") และฟอร์ม
// สมัครไรเดอร์ทั้ง 2 จุด (หน้าเพจ #onpage-rider-reg-form และ modal #rider-register-modal) ให้เป็นไปตาม
// หลักการเดียวกับที่ทำในฟอร์มร้านค้าแท็บ 1 (merchant-registration-form-uiux.test.js): กรอบใหญ่เข้มกว่ากรอบย่อย,
// แบนเนอร์แจ้งเตือนทั่วไปกระชับเป็นบรรทัดเดียว, กล่องติดต่อ LINE ย้ายไปก่อนปุ่มส่ง/ยืนยันแทนที่จะอยู่บนสุด,
// placeholder ที่ซ้ำ label เปลี่ยนเป็นตัวอย่างจริง
const fs = require("fs");
const path = require("path");
const appSrc = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const htmlSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

console.log("== แท็บ 2 ฟอร์มร้านค้า (สินค้า/ราคา): แบนเนอร์กระชับ, การ์ดสินค้ามีกรอบเข้ม, placeholder มีตัวอย่าง ==");
ok(!htmlSrc.includes("กรุณาพิจารณาและตัดสินใจเลือกสินค้า 10"), "ตัดข้อความแบนเนอร์ Highlight เดิมที่ยาวเกินไปออกแล้ว");
ok(htmlSrc.includes("สินค้า Highlight 10 รายการ"), "แบนเนอร์ Highlight กระชับเป็นบรรทัดเดียวแล้ว");
ok(!htmlSrc.includes('เพิ่มรายการสินค้าอื่นๆ (สูงสุด 50 รายการ)'), "ตัดหัวข้อ+ย่อหน้ายาวของกล่องสินค้าเพิ่มเติมเดิมออกแล้ว");
ok(appSrc.includes('p-3.5 bg-slate-50 border-2 border-slate-300 rounded-2xl space-y-2.5'), "การ์ดสินค้า Highlight แต่ละรายการมีกรอบเข้มขึ้นแล้ว (renderMerchantTop6ProductsForm)");
ok(appSrc.includes('catalog-item-container p-3.5 bg-white border-2 border-slate-300 rounded-2xl space-y-2.5 relative shadow-sm'), "การ์ดสินค้าเพิ่มเติมแต่ละแถวมีกรอบเข้มขึ้นแล้ว (renderMerchantCatalogTable)");
ok(appSrc.includes('id="m-p-name-${i}" value="${escapeHtml(p.name) || \'\'}" placeholder="เช่น คอหมูย่าง, ไก่ทอด"'), "ช่องชื่อสินค้า Highlight มีตัวอย่างชื่อจริงแทน placeholder ว่างเปล่าเดิม");
ok(appSrc.includes('id="m-p-price-${i}" value="${priceVal}" placeholder="เช่น 50"'), "ช่องราคาสินค้า Highlight มีตัวอย่างราคาแทน placeholder ว่างเปล่าเดิม");

console.log("== renderRiderRegExtras (ใช้ร่วมกันทั้ง 2 ฟอร์มสมัครไรเดอร์): 4 ส่วนมีกรอบเข้ม, กล่องยินยอมเข้มขึ้น ==");
const extrasBody = fn("renderRiderRegExtras");
const boxedSectionCount = (extrasBody.match(/p-3\.5 bg-white border-2 border-slate-300 rounded-2xl space-y-3/g) || []).length;
ok(boxedSectionCount === 4, `พบ 4 ส่วน (ยืนยันตัวตน/ผู้ติดต่อฉุกเฉิน/เอกสาร/บัญชีรับเงิน) มีกรอบเข้มแล้ว พบ ${boxedSectionCount}`);
ok(extrasBody.includes('bg-amber-50/70 border-2 border-amber-300 rounded-2xl'), "กล่องยืนยันและยินยอมมีกรอบเข้มขึ้นแล้ว");
ok(extrasBody.includes('border-b border-slate-100 pb-2'), "เส้นแบ่งหัวข้อภายในกล่อง (head helper) บางกว่ากรอบนอกแล้ว (ลำดับชั้นสายตาถูกต้อง)");
ok(extrasBody.includes('placeholder="เช่น นางสมศรี ใจดี"'), "ช่องชื่อผู้ติดต่อฉุกเฉินมีตัวอย่างชื่อจริงแทน placeholder เดิมที่คลุมเครือ");

console.log("== ฟอร์มสมัครไรเดอร์หน้าเพจ (#onpage-rider-reg-form): ไม่มีกล่องซ้อนกล่อง, 3 ส่วนมีกรอบเข้ม ==");
const onpageFormTag = htmlSrc.slice(htmlSrc.indexOf('id="onpage-rider-reg-form"') - 10, htmlSrc.indexOf('id="onpage-rider-reg-form"') + 200);
ok(!onpageFormTag.includes("shadow-md") && !onpageFormTag.includes("border border-slate-200"), "ฟอร์มหลักไม่มีกรอบ/พื้นขาวซ้อนทับกรอบของแต่ละหัวข้ออีกแล้ว (ลดการซ้อนกล่อง)");
const onpageFormStart = htmlSrc.indexOf('id="onpage-rider-reg-form"');
const onpageFormSlice = htmlSrc.slice(onpageFormStart, onpageFormStart + 8000);
const onpageBoxedCount = (onpageFormSlice.match(/p-3\.5 bg-white border-2 border-slate-300 rounded-2xl space-y-3/g) || []).length;
ok(onpageBoxedCount === 3, `พบ 3 หัวข้อ (ข้อมูลส่วนตัว/ยานพาหนะ/พื้นที่วิ่งส่ง) มีกรอบเข้มแล้ว พบ ${onpageBoxedCount}`);

console.log("== Modal สมัครไรเดอร์ (#rider-register-modal): 4 ส่วนมีกรอบเข้ม, กล่อง LINE ย้ายไปก่อนปุ่มส่งใบสมัคร ==");
const modalStart = htmlSrc.indexOf('id="rider-register-modal"');
const modalEnd = htmlSrc.indexOf('id="rider-reg-step-success"');
const modalSlice = htmlSrc.slice(modalStart, modalEnd);
const modalBoxedCount = (modalSlice.match(/bg-slate-50 p-3\.5 rounded-2xl border-2 border-slate-300 space-y-3/g) || []).length;
ok(modalBoxedCount === 4, `พบ 4 หัวข้อในฟอร์ม modal มีกรอบเข้มแล้ว พบ ${modalBoxedCount}`);
const extrasIdx = modalSlice.indexOf('id="reg-rider-extras"');
const lineIdx = modalSlice.indexOf("แอด LINE");
const submitIdx = modalSlice.indexOf("ส่งใบสมัครให้แอดมินอนุมัติ");
ok(extrasIdx > 0 && lineIdx > extrasIdx, "กล่อง LINE ใน modal อยู่หลังส่วนเสริม (ผู้ติดต่อฉุกเฉิน/เอกสาร/บัญชี/ยินยอม) แล้ว ไม่ได้อยู่บนสุด");
ok(lineIdx > 0 && submitIdx > lineIdx, "กล่อง LINE ใน modal อยู่ก่อนปุ่ม 'ส่งใบสมัครให้แอดมินอนุมัติ' พอดี");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
