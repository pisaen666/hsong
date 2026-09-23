// ทดสอบงาน 2026-09-23 (คำขอเจ้าของ, ปรับ UI/UX ฟอร์มลงทะเบียนเปิดแผงค้าใหม่ ตามข้อสังเกต 4 ข้อของเจ้าของ
// + ข้อเสนอเพิ่มเติม 2 ข้อ ที่เจ้าของเห็นด้วยและให้ "จัดการได้เลย" โดยยึดหลัก "สื่อสารให้ผู้ลงทะเบียนเข้าใจ
// มากที่สุดว่าต้องทำอะไร"):
//   1. แท็บ "1. ชื่อร้านค้าฯ" / "2. สินค้าฯ" ต้องมีสีตัดกันชัดเจนว่าอันไหน active (เดิมขาว-บนพื้นเทา แยกไม่ออก)
//   2. ฟิลด์ "ชื่อร้านค้า/หมวดหมู่" ต้องอยู่ในกล่องมีหัวข้อกำกับเหมือนส่วนอื่น (เดิมลอยไม่มีกล่อง)
//   3. "ผู้ติดต่อคนที่ 2" ต้องมีป้าย "(ไม่บังคับ)" ให้ชัดเหมือนส่วนอื่น (บัญชีสำรอง, รูปเจ้าของร้านคนที่ 2)
//   4. Placeholder ที่ซ้ำกับ label เฉยๆ (เช่น "กรอกชื่อร้าน") เปลี่ยนเป็นตัวอย่างจริงที่มีประโยชน์
//   5. ย้ายกล่องติดต่อ LINE จากบนสุด (แย่งความสนใจจากฟิลด์กรอกข้อมูล) ไปไว้ก่อนปุ่ม "ถัดไป" ท้ายฟอร์ม
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
function tag(idAttr) {
    const start = htmlSrc.indexOf(idAttr);
    if (start < 0) return "";
    const tagStart = htmlSrc.lastIndexOf("<", start);
    const tagEnd = htmlSrc.indexOf(">", start);
    return htmlSrc.slice(tagStart, tagEnd + 1);
}

console.log("== ข้อ 1: แท็บ 1/2 ต้องมีสีตัดกันชัดเจนตอน active (เขียวเข้ม+ขาว) ==");
const tabInfoTag = tag('id="btn-tab-info"');
const tabProductsTag = tag('id="btn-tab-products"');
ok(tabInfoTag.includes("bg-emerald-700") && tabInfoTag.includes("text-white"), "แท็บ 1 (active ตอนเริ่ม) พื้นเขียวเข้ม+ตัวหนังสือขาว");
ok(tabProductsTag.includes("bg-white") && tabProductsTag.includes("text-slate-500"), "แท็บ 2 (inactive ตอนเริ่ม) พื้นขาว+ตัวหนังสือเทา");
const switchFnBody = fn("switchMerchantPortalTab");
ok(/bg-emerald-700/.test(switchFnBody) && /text-white/.test(switchFnBody), "switchMerchantPortalTab สลับสีด้วยชุดเดียวกัน (เขียวเข้ม+ขาว) ไม่ใช่สีเดิม");

console.log("== ข้อ 2: ฟิลด์ชื่อร้าน/หมวดหมู่ ต้องอยู่ในกล่องมีหัวข้อกำกับ ==");
ok(htmlSrc.includes("ข้อมูลร้านค้าเบื้องต้น"), "มีหัวข้อ 'ข้อมูลร้านค้าเบื้องต้น' กำกับกล่องนี้แล้ว");
const stallNameBoxStart = htmlSrc.indexOf("ข้อมูลร้านค้าเบื้องต้น");
const stallNameBoxSlice = htmlSrc.slice(stallNameBoxStart, stallNameBoxStart + 1500);
ok(stallNameBoxSlice.includes('id="m-stall-name"') && stallNameBoxSlice.includes('id="m-stall-category"'),
    "ช่องชื่อร้านและหมวดหมู่อยู่ในกล่องเดียวกับหัวข้อ 'ข้อมูลร้านค้าเบื้องต้น'");

console.log("== ข้อ 3: ผู้ติดต่อคนที่ 2 ต้องมีป้าย (ไม่บังคับ) ==");
const contact2Start = htmlSrc.indexOf("ผู้ติดต่อคนที่ 2");
const contact2Slice = htmlSrc.slice(contact2Start, contact2Start + 150);
ok(contact2Slice.includes("ไม่บังคับ"), "หัวข้อ 'ผู้ติดต่อคนที่ 2' มีป้าย (ไม่บังคับ) กำกับแล้ว");

console.log("== ข้อ 4: Placeholder ที่ซ้ำ label เฉยๆ ต้องเปลี่ยนเป็นตัวอย่างจริง ==");
ok(!htmlSrc.includes('id="m-stall-name" placeholder="กรอกชื่อร้าน"'), "ช่องชื่อร้านไม่ใช้ placeholder ซ้ำ label เดิมแล้ว");
ok(htmlSrc.includes('id="m-stall-name" placeholder="เช่น ร้านผักสดป้าแดง"'), "ช่องชื่อร้านมีตัวอย่างชื่อจริงแทน");
ok(!htmlSrc.includes('id="m-bank-account-no" placeholder="กรอกเลขที่บัญชี"'), "ช่องเลขบัญชี 1 ไม่ใช้ placeholder ซ้ำ label เดิมแล้ว");
ok(!htmlSrc.includes('id="m-bank-account-no-2" placeholder="กรอกเลขที่บัญชี"'), "ช่องเลขบัญชี 2 ไม่ใช้ placeholder ซ้ำ label เดิมแล้ว");
ok(!htmlSrc.includes('id="m-bank-account-name" placeholder="กรอกชื่อบัญชี"'), "ช่องชื่อบัญชี 1 ไม่ใช้ placeholder ซ้ำ label เดิมแล้ว");
ok(htmlSrc.includes('id="m-contact1-phone" placeholder="08x-xxx-xxxx"'), "ช่องเบอร์โทรผู้ติดต่อ 1 มีตัวอย่างรูปแบบเบอร์แล้ว (เดิมว่างเปล่า)");
ok(htmlSrc.includes('id="m-contact2-phone" placeholder="08x-xxx-xxxx"'), "ช่องเบอร์โทรผู้ติดต่อ 2 มีตัวอย่างรูปแบบเบอร์แล้ว (เดิมว่างเปล่า)");

console.log("== ข้อ 5: กล่องติดต่อ LINE ต้องย้ายไปไว้ก่อนปุ่ม 'ถัดไป' ท้ายฟอร์ม ไม่ใช่บนสุด ==");
const infoTabStart = htmlSrc.indexOf('id="tab-info"');
const paymentIdx = htmlSrc.indexOf("ช่องทางการรับชำระเงิน", infoTabStart);
const lineIdx = htmlSrc.indexOf("แอด LINE", infoTabStart);
const nextBtnIdx = htmlSrc.indexOf("ถัดไป: ใส่สินค้าและราคาที่ต้องการจำหน่าย", infoTabStart);
ok(paymentIdx > 0 && lineIdx > paymentIdx, "กล่อง LINE อยู่หลังกล่องช่องทางการรับชำระเงินแล้ว (ไม่ได้อยู่บนสุดของแท็บ)");
ok(lineIdx > 0 && nextBtnIdx > lineIdx, "กล่อง LINE อยู่ก่อนปุ่ม 'ถัดไป' ท้ายฟอร์มพอดี");

console.log("== ข้อ 6 (เพิ่มทีหลัง 2026-09-23): กรอบใหญ่ที่คลุมกรอบย่อยต้องเข้มกว่ากรอบย่อยด้านใน ==");
ok(htmlSrc.includes('p-3.5 bg-white border-2 border-slate-300 rounded-2xl space-y-3 shadow-2xs'),
    "กรอบ 'ข้อมูลร้านค้าเบื้องต้น' เข้มขึ้นแล้ว (border-2 border-slate-300)");
ok(htmlSrc.includes('p-3.5 bg-white border-2 border-slate-300 rounded-2xl space-y-4 shadow-2xs'),
    "กรอบ 'อัปโหลดรูปภาพร้านค้า/เจ้าของร้าน' เข้มขึ้นแล้ว (border-2 border-slate-300)");
ok((htmlSrc.match(/p-3 bg-white border-2 border-slate-300 rounded-2xl space-y-2\.5/g) || []).length === 2,
    "กรอบ 'ผู้ติดต่อคนที่ 1' และ 'คนที่ 2' เข้มขึ้นทั้งคู่ (border-2 border-slate-300)");
ok(htmlSrc.includes('p-3 bg-amber-50/80 border-2 border-amber-300 rounded-2xl space-y-2.5'),
    "กรอบ 'ช่องทางการรับชำระเงิน' เข้มขึ้นแล้ว (border-2 border-amber-300)");
// กรอบย่อยด้านใน (ช่องรูปแต่ละรูป, บัญชี 1/2) ต้องยังคงบางกว่ากรอบใหญ่ ไม่ถูกแก้ไปด้วย - รักษาลำดับชั้นสายตา
ok(htmlSrc.includes('bg-slate-50 p-3 rounded-xl border border-slate-200/80'),
    "กรอบย่อย (ช่องอัปโหลดรูปหน้าร้านแต่ละรูป) ยังบางเหมือนเดิม ไม่ได้ถูกทำให้เข้มไปด้วย");
ok(htmlSrc.includes('bg-white p-2.5 rounded-xl border border-amber-200/50 mb-2'),
    "กรอบย่อย (บัญชีหลักที่ 1) ยังบางเหมือนเดิม ไม่ได้ถูกทำให้เข้มไปด้วย");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
