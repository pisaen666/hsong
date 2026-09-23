// ทดสอบบั๊กที่พบ 2026-09-23 (จากการตรวจสอบระบบสุ่มหมุนเวียนร้านค้าตามคำขอเจ้าของ):
//   ทุกร้านค้าที่สมัคร/แก้ไขข้อมูลได้หมวดหมู่ "chicken" (ไก่) ติดตัวไปเสมอ ไม่ว่าจะขายอะไรจริง เพราะช่อง
//   "เลือกหมวดหมู่ร้าน" (id="m-stall-category") ที่โค้ดพยายามอ่านค่า ไม่มีอยู่จริงในหน้าฟอร์มมานานแล้ว
//   (ฟอร์มถูกปรับปรุงใหม่ให้เรียบง่ายลงแต่ลืมเอาช่องนี้กลับมา) - document.getElementById(...)?.value คืนค่า
//   undefined เสมอ จึง fallback ไปที่ "chicken" ทุกครั้ง ไม่มีทางแก้ไขทีหลังได้เลยทั้งฝั่งร้านค้าเองและฝั่งแอดมิน
//   - แก้รอบแรก (2026-09-23 เช้า): เพิ่มช่อง <select id="m-stall-category"> กลับเข้าไป พร้อม 5 หมวดหมู่เดิม
//     (chicken/pork/veggie/curry/seafood) ที่ระบบสุ่ม/ป้ายสีใช้อยู่
//   - เจ้าของสังเกตว่าช่องนี้มีตัวเลือกน้อยกว่าช่องเลือกหมวดหมู่ตอนเพิ่มสินค้า (10 หมวด + อื่นๆ) มาก จึงขอให้
//     "รวมหมวดหมู่ร้านค้าให้ใช้ชุดเดียวกับหมวดหมู่สินค้าทั้งระบบ" (2026-09-23 บ่าย) - แก้รอบสองนี้คือการรวมนั้น:
//     ช่องเลือกตอนนี้ใช้ 11 หมวดเดียวกับ CATEGORY_TAXONOMY_3TIER ทุกตัวอักษร, ค่าเริ่มต้นเปลี่ยนจาก "chicken"
//     เป็น DEFAULT_STALL_CATEGORY (หมวดแรกในชุดเดียวกัน), และป้ายสีร้านโปรด/preview label ก็อ่านหมวดใหม่ถูกต้อง
//     (ค่าเก่า เช่น "chicken" ที่ติดอยู่กับร้านที่สมัครไว้ก่อนหน้านี้ ยังใช้งานได้ผ่าน normalizeMainCategoryName)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}

// ดึง 11 หมวดหมู่จริงจาก CATEGORY_TAXONOMY_3TIER (แหล่งเดียวที่ใช้ทั้งระบบ) มาเทียบ ไม่ hardcode ซ้ำในเทสต์
const taxoStart = src.indexOf("const CATEGORY_TAXONOMY_3TIER");
let ti = src.indexOf("{", taxoStart), td = 0;
for (; ti < src.length; ti++) { if (src[ti] === "{") td++; else if (src[ti] === "}" && --td === 0) break; }
const realCategories = Object.keys(eval("(" + src.slice(src.indexOf("{", taxoStart), ti + 1) + ")"));
ok(realCategories.length === 11, `พบหมวดหมู่หลักครบ 11 หมวด (10 + อื่นๆ) ใน CATEGORY_TAXONOMY_3TIER (เจอ ${realCategories.length})`);

// ต้องมีช่อง select ในฟอร์มจริง ๆ (ไม่ใช่แค่ในโค้ด JS ที่อ่านมัน)
const selectMatch = indexSrc.match(/<select id="m-stall-category"[\s\S]*?<\/select>/);
ok(!!selectMatch, "พบช่อง <select id=\"m-stall-category\"> ในฟอร์มสมัคร/แก้ไขร้านค้าจริง (index.html)");
const selectHtml = selectMatch ? selectMatch[0] : "";
const selectValues = [...selectHtml.matchAll(/<option value="([^"]*)"/g)].map(m => m[1]);

// ช่องหมวดหมู่ร้านค้าต้องมีตัวเลือกตรงกับหมวดหมู่สินค้าทุกตัวอักษร (รวมเป็นชุดเดียวกันแล้ว ไม่ใช่ชุดแยก 5 แบบเหมือนเดิม)
ok(selectValues.length === realCategories.length, `ช่องหมวดหมู่ร้านค้ามีจำนวนตัวเลือกเท่ากับหมวดหมู่สินค้า (${selectValues.length} = ${realCategories.length})`);
realCategories.forEach(cat => {
    ok(selectValues.includes(cat), `ช่องหมวดหมู่ร้านค้ามีตัวเลือก "${cat}" ตรงกับหมวดหมู่สินค้า`);
});
ok(!selectHtml.includes('value="chicken"'), "ช่องหมวดหมู่ร้านค้าไม่มีค่าเก่าแบบสั้น (chicken) หลงเหลืออยู่ - รวมเป็นชุดเดียวกับสินค้าแล้ว");

// จุดที่เคยอ่านค่าจากช่องนี้ (สมัคร/แก้ไข/พรีวิว) ต้องยังอ้างถึง id เดิม - ตอนนี้จะอ่านค่าจริงได้แล้วเพราะช่องมีอยู่จริง
const readSites = src.match(/document\.getElementById\("m-stall-category"\)/g) || [];
ok(readSites.length >= 3, `พบจุดที่อ่านค่าจากช่องนี้ครบ (สมัครใหม่/แก้ไขร้าน/พรีวิว) อย่างน้อย 3 จุด (เจอ ${readSites.length} จุด)`);

// ทุกจุดที่ fallback ค่าเริ่มต้นของหมวดหมู่ร้านค้า ต้องใช้ DEFAULT_STALL_CATEGORY (หมวดแรกของชุดรวม) ไม่ใช่ "chicken" ตรง ๆ อีก
ok(/const DEFAULT_STALL_CATEGORY = getMainCategories\(\)\[0\];/.test(src), "มีค่าคงที่ DEFAULT_STALL_CATEGORY อ่านจากหมวดหมู่แรกของชุดรวม (getMainCategories()[0])");
ok(!/\|\|\s*"chicken"/.test(src), "ไม่มีจุดไหน fallback เป็น \"chicken\" ตรง ๆ หลงเหลืออยู่แล้ว (ใช้ DEFAULT_STALL_CATEGORY แทนทั้งหมด)");

// ระบบสุ่มหมุนเวียนร้านค้า (ตรวจสอบให้ก่อนหน้านี้) ต้องใช้ชุดหมวดหมู่เดียวกันนี้ด้วย ไม่ใช่ array 5 ค่าแบบเดิม
const selectRandomBody = fn("selectRandomStallBatch");
ok(/const categories = getMainCategories\(\);/.test(selectRandomBody), "selectRandomStallBatch ใช้ getMainCategories() แทน array หมวดหมู่ 5 ค่าเดิมแล้ว");

// ป้ายสีในแถบร้านโปรด/ร้านค้าต่าง ๆ ต้องใช้ฟังก์ชันสีใหม่ที่รองรับหมวดหมู่เต็มรูปแบบ (และค่าเก่าผ่าน normalizeMainCategoryName)
ok(/function getStallCategoryColorClass\(/.test(src), "มีฟังก์ชัน getStallCategoryColorClass (แทนเงื่อนไข if/else 5 ทางเดิม)");
ok(/normalizeMainCategoryName/.test(fn("getStallCategoryColorClass")), "getStallCategoryColorClass แปลงผ่าน normalizeMainCategoryName ก่อน (รองรับค่าเก่าอย่าง \"chicken\" ที่ติดร้านเดิมอยู่)");

// บั๊กที่ 2 พบ 2026-09-23 (เจอตอนแก้บั๊กแรก เจ้าของขอให้แก้พร้อมกัน): ปุ่ม "1-Click กรอกข้อมูลตัวอย่าง"
// (fillSampleMerchantRegistration) พังอยู่ อ้างถึง id เก่าที่ไม่มีในฟอร์มแล้ว (m-stall-number, m-stall-zone,
// m-owner-name, m-phone, m-highlight, m-desc - ฟอร์มถูกปรับโครงสร้างใหม่ไปนานแล้ว) รวมถึงอ้าง
// MERCHANT_PRESET_IMAGES.stall.beef ที่ไม่มีคีย์นี้อยู่จริง (มีแค่ chicken/veggie/pork/curry/seafood)
//   - แก้โดยเขียนใหม่ให้ตรงกับฟอร์มปัจจุบัน (ชื่อเล่นเจ้าของ, contact1/contact2, บัญชีธนาคาร) ทุกจุดเช็ค
//     ก่อนเขียนค่า (setVal helper) กันพังอีกถ้าฟอร์มถูกปรับต่อในอนาคต
const fillSampleBody = fn("fillSampleMerchantRegistration");
["m-stall-number", "m-stall-zone", "m-owner-name", '"m-phone"', "m-highlight", "m-desc"].forEach(staleId => {
    ok(!fillSampleBody.includes(staleId), `fillSampleMerchantRegistration ไม่อ้างถึง id เก่าที่ไม่มีแล้ว: ${staleId}`);
});
["m-owner1-nickname", "m-contact1-name", "m-contact1-phone", "m-bank-name", "m-bank-account-no"].forEach(realId => {
    ok(fillSampleBody.includes(realId), `fillSampleMerchantRegistration เติมค่าช่องจริงที่มีอยู่: ${realId}`);
});
ok(!/MERCHANT_PRESET_IMAGES\.stall\.beef/.test(fillSampleBody), "ไม่อ้างถึง MERCHANT_PRESET_IMAGES.stall.beef (คีย์ที่ไม่มีอยู่จริง)");
ok(/const setVal = /.test(fillSampleBody), "ใช้ helper ที่เช็คว่าช่องมีอยู่จริงก่อนเขียนค่าทุกช่อง (กันพังซ้ำในอนาคต)");
ok(/setVal\("m-stall-category", DEFAULT_STALL_CATEGORY\)/.test(fillSampleBody), "fillSampleMerchantRegistration เติมหมวดหมู่ด้วย DEFAULT_STALL_CATEGORY (ไม่ใช่ \"chicken\" ตรง ๆ)");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
