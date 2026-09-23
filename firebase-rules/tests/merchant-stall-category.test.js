// ทดสอบบั๊กที่พบ 2026-09-23 (จากการตรวจสอบระบบสุ่มหมุนเวียนร้านค้าตามคำขอเจ้าของ):
//   ทุกร้านค้าที่สมัคร/แก้ไขข้อมูลได้หมวดหมู่ "chicken" (ไก่) ติดตัวไปเสมอ ไม่ว่าจะขายอะไรจริง เพราะช่อง
//   "เลือกหมวดหมู่ร้าน" (id="m-stall-category") ที่โค้ดพยายามอ่านค่า ไม่มีอยู่จริงในหน้าฟอร์มมานานแล้ว
//   (ฟอร์มถูกปรับปรุงใหม่ให้เรียบง่ายลงแต่ลืมเอาช่องนี้กลับมา) - document.getElementById(...)?.value คืนค่า
//   undefined เสมอ จึง fallback ไปที่ "chicken" ทุกครั้ง ไม่มีทางแก้ไขทีหลังได้เลยทั้งฝั่งร้านค้าเองและฝั่งแอดมิน
//   - แก้โดยเพิ่มช่อง <select id="m-stall-category"> กลับเข้าไปในฟอร์มสมัคร/แก้ไขร้านค้า พร้อม 5 หมวดหมู่
//     ที่ตรงกับที่ระบบสุ่ม/ป้ายสี/รายชื่อแอดมินใช้อยู่แล้ว (chicken/pork/veggie/curry/seafood)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// ต้องมีช่อง select ในฟอร์มจริง ๆ (ไม่ใช่แค่ในโค้ด JS ที่อ่านมัน)
const selectMatch = indexSrc.match(/<select id="m-stall-category"[\s\S]*?<\/select>/);
ok(!!selectMatch, "พบช่อง <select id=\"m-stall-category\"> ในฟอร์มสมัคร/แก้ไขร้านค้าจริง (index.html)");
const selectHtml = selectMatch ? selectMatch[0] : "";

// ต้องมีครบ 5 หมวดหมู่ที่ระบบอื่น ๆ ใช้อยู่แล้ว (สุ่มหมุนเวียน, ป้ายสีร้านโปรด, รายชื่อแอดมิน)
["chicken", "pork", "veggie", "curry", "seafood"].forEach(cat => {
    ok(new RegExp('value="' + cat + '"').test(selectHtml), `ช่องเลือกหมวดหมู่มีตัวเลือก "${cat}" (ตรงกับที่ระบบสุ่ม/ป้ายสีใช้อยู่แล้ว)`);
});

// จุดที่เคยอ่านค่าจากช่องนี้ (สมัคร/แก้ไข/พรีวิว) ต้องยังอ้างถึง id เดิม - ตอนนี้จะอ่านค่าจริงได้แล้วเพราะช่องมีอยู่จริง
const readSites = src.match(/document\.getElementById\("m-stall-category"\)/g) || [];
ok(readSites.length >= 3, `พบจุดที่อ่านค่าจากช่องนี้ครบ (สมัครใหม่/แก้ไขร้าน/พรีวิว) อย่างน้อย 3 จุด (เจอ ${readSites.length} จุด)`);

// บั๊กที่ 2 พบ 2026-09-23 (เจอตอนแก้บั๊กแรก เจ้าของขอให้แก้พร้อมกัน): ปุ่ม "1-Click กรอกข้อมูลตัวอย่าง"
// (fillSampleMerchantRegistration) พังอยู่ อ้างถึง id เก่าที่ไม่มีในฟอร์มแล้ว (m-stall-number, m-stall-zone,
// m-owner-name, m-phone, m-highlight, m-desc - ฟอร์มถูกปรับโครงสร้างใหม่ไปนานแล้ว) รวมถึงอ้าง
// MERCHANT_PRESET_IMAGES.stall.beef ที่ไม่มีคีย์นี้อยู่จริง (มีแค่ chicken/veggie/pork/curry/seafood)
//   - แก้โดยเขียนใหม่ให้ตรงกับฟอร์มปัจจุบัน (ชื่อเล่นเจ้าของ, contact1/contact2, บัญชีธนาคาร) ทุกจุดเช็ค
//     ก่อนเขียนค่า (setVal helper) กันพังอีกถ้าฟอร์มถูกปรับต่อในอนาคต
function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}
const fillSampleBody = fn("fillSampleMerchantRegistration");
["m-stall-number", "m-stall-zone", "m-owner-name", '"m-phone"', "m-highlight", "m-desc"].forEach(staleId => {
    ok(!fillSampleBody.includes(staleId), `fillSampleMerchantRegistration ไม่อ้างถึง id เก่าที่ไม่มีแล้ว: ${staleId}`);
});
["m-owner1-nickname", "m-contact1-name", "m-contact1-phone", "m-bank-name", "m-bank-account-no"].forEach(realId => {
    ok(fillSampleBody.includes(realId), `fillSampleMerchantRegistration เติมค่าช่องจริงที่มีอยู่: ${realId}`);
});
ok(!/MERCHANT_PRESET_IMAGES\.stall\.beef/.test(fillSampleBody), "ไม่อ้างถึง MERCHANT_PRESET_IMAGES.stall.beef (คีย์ที่ไม่มีอยู่จริง)");
ok(/const setVal = /.test(fillSampleBody), "ใช้ helper ที่เช็คว่าช่องมีอยู่จริงก่อนเขียนค่าทุกช่อง (กันพังซ้ำในอนาคต)");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
