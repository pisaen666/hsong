// ทดสอบงาน 2026-10-01 (เจ้าของถาม: ลงสินค้า "ปูอัดซามิ" เลือกหมวดหลัก+หมวดรองแล้ว แต่ไม่ได้เลือก "หมวดย่อย"
// (ระดับ 3 เช่น "ไส้กรอก / ฮอทดอก / ปูอัด") ลูกค้าจะเห็นสินค้านี้ไหมตอนกดดูหมวดย่อยเจาะจง)
// พบว่าหมวดรอง (ระดับ 2) มีลิสต์ SUB_CATEGORY_SYNONYMS ช่วยเดาจากชื่อ/คำอธิบายสินค้าอยู่แล้ว แต่หมวดย่อย
// (ระดับ 3) ไม่มีลิสต์แบบนี้เลย ป้ายหมวดย่อยเองส่วนใหญ่เป็นข้อความรวมคั่นด้วย "/" อยู่แล้ว (เช่น
// "ไส้กรอก / ฮอทดอก / ปูอัด") จึงเพิ่ม splitCompoundCategoryLabel() แตกป้ายนี้เป็นคำเดี่ยวๆ มาใช้เดาแทน
// โดยไม่ต้องเพิ่มลิสต์ synonym ซ้ำอีกชุด - "ปูอัดซามิ" จะแมตช์กับคำว่า "ปูอัด" ที่แตกออกมา
//
// นอกจากนี้เพิ่มการเตือนร้านค้า (ไม่บล็อกการบันทึก) ใน saveMerchantStallData เมื่อมีสินค้าชื่อกรอกแล้ว
// แต่ยังเลือกหมวดรอง/หมวดย่อยไม่ครบ ทั้งฝั่งสินค้า Highlight 10 รายการ และฝั่งตารางสินค้าเพิ่มเติม
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: function " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

function constBlock(name) {
    const start = appSrc.indexOf("const " + name);
    if (start < 0) throw new Error("not found: const " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1) + ";";
}

// ── สร้าง sandbox ที่มีฟังก์ชัน/ค่าคงที่จริงจาก app.js ที่ matchItemToSubCategory ต้องใช้ ──
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(constBlock("CATEGORY_TAXONOMY_3TIER"), ctx);
vm.runInContext(constBlock("SUB_CATEGORY_SYNONYMS"), ctx);
vm.runInContext(fn("normalizeMainCategoryName"), ctx);
vm.runInContext(fn("getSubCategories"), ctx);
vm.runInContext(fn("splitCompoundCategoryLabel"), ctx);
vm.runInContext(fn("matchItemToSubCategory"), ctx);

const MAIN = "🧊 อาหารแปรรูป เส้นก๋วยเตี๋ยว และของแช่แข็ง";
const SUB = "ลูกชิ้น ไส้กรอก หมูยอ";
const MICRO_SAUSAGE = "ไส้กรอก / ฮอทดอก / ปูอัด";
const MICRO_MEATBALL = "ลูกชิ้นหมู / เนื้อ / ปลา / เอ็น";
const MICRO_OTHER = "อื่นๆ";

console.log("== splitCompoundCategoryLabel() แตกป้ายหมวดย่อยเป็นคำเดี่ยวๆ ==");
ok(JSON.stringify(ctx.splitCompoundCategoryLabel(MICRO_SAUSAGE)) === JSON.stringify(["ไส้กรอก", "ฮอทดอก", "ปูอัด"]),
    'แตก "ไส้กรอก / ฮอทดอก / ปูอัด" ได้ 3 คำถูกต้อง');
ok(!ctx.splitCompoundCategoryLabel("อื่นๆ").length, 'ป้าย "อื่นๆ" ไม่ถูกดึงมาเป็นคำเดา (ป้องกันจับมั่วข้ามหมวด)');

console.log('== สินค้า "ปูอัดซามิ" เลือกหมวดหลัก+หมวดรองแล้ว แต่ไม่ได้เลือกหมวดย่อย ==');
const surimi = { name: "ปูอัดซามิ", mainCat: MAIN, subCat: SUB, microCat: "" };

ok(ctx.matchItemToSubCategory(surimi, MAIN, "all_sub", "all_micro"), "กดดูทั้งหมดของหมวดหลัก -> เจอสินค้า");
ok(ctx.matchItemToSubCategory(surimi, MAIN, SUB, "all_micro"), 'กดดูทั้งหมดในหมวดรอง "ลูกชิ้น ไส้กรอก หมูยอ" -> เจอสินค้า');
ok(ctx.matchItemToSubCategory(surimi, MAIN, SUB, MICRO_SAUSAGE),
    'กดเจาะจงหมวดย่อย "ไส้กรอก / ฮอทดอก / ปูอัด" -> ต้องเจอสินค้า (แก้บั๊กนี้แล้ว เพราะชื่อมีคำว่า "ปูอัด")');
ok(!ctx.matchItemToSubCategory(surimi, MAIN, SUB, MICRO_MEATBALL),
    'กดเจาะจงหมวดย่อยอื่นที่ไม่เกี่ยวเลย เช่น "ลูกชิ้นหมู / เนื้อ / ปลา / เอ็น" -> ต้องไม่เจอ (ไม่จับมั่วข้ามหมวด)');
ok(ctx.matchItemToSubCategory(surimi, MAIN, SUB, MICRO_OTHER) === false || ctx.matchItemToSubCategory({ ...surimi, microCat: "" }, MAIN, SUB, MICRO_OTHER),
    'กดหมวดย่อย "อื่นๆ": ถ้าสินค้ายังไม่แมตช์หมวดเฉพาะใดเลย ระบบเดิมจะยังจัดไปกอง "อื่นๆ" ให้ (พฤติกรรมเดิม ไม่เปลี่ยน)');

console.log("== สินค้าที่ชื่อไม่มีคำใบ้อะไรเลย ต้องยังไม่โผล่มั่วในหมวดย่อยที่ไม่เกี่ยว (กันจับผิดเกินจำเป็น) ==");
const noHint = { name: "ของอร่อยจากร้าน", mainCat: MAIN, subCat: SUB, microCat: "" };
ok(!ctx.matchItemToSubCategory(noHint, MAIN, SUB, MICRO_SAUSAGE), 'ชื่อไม่มีคำว่า "ไส้กรอก/ฮอทดอก/ปูอัด" เลย -> ไม่เจอในหมวดย่อยนี้');
ok(ctx.matchItemToSubCategory(noHint, MAIN, SUB, MICRO_OTHER), 'แต่ยังเจอได้ถ้ากดหมวดย่อย "อื่นๆ" (ไม่ได้ระบุหมวดย่อยไว้)');

console.log("== สินค้าที่ระบุหมวดย่อยไว้ตรงๆ อยู่แล้ว ต้องไม่เปลี่ยนพฤติกรรม ==");
const explicit = { name: "ปูอัดตราโออิชิ", mainCat: MAIN, subCat: SUB, microCat: MICRO_SAUSAGE };
ok(ctx.matchItemToSubCategory(explicit, MAIN, SUB, MICRO_SAUSAGE), "สินค้าที่ระบุหมวดย่อยตรงๆ ไว้แล้ว ยังโผล่ถูกหมวดตามเดิม");
ok(!ctx.matchItemToSubCategory(explicit, MAIN, SUB, MICRO_MEATBALL), "และไม่โผล่ในหมวดย่อยอื่นที่ไม่ตรง");

// ── ฝั่งฟอร์มร้านค้า: ต้องมีการเตือน (ไม่บล็อก) เมื่อสินค้ามีชื่อแล้วแต่ยังเลือกหมวดรอง/หมวดย่อยไม่ครบ ──
console.log("== saveMerchantStallData() เตือนร้านค้าเมื่อสินค้าเลือกหมวดหมู่ไม่ครบ (ไม่บล็อกการบันทึก) ==");
const saveFnBody = fn("saveMerchantStallData");
ok(/categoryWarnings/.test(saveFnBody), "มีตัวแปรเก็บรายการสินค้าที่เลือกหมวดหมู่ไม่ครบ (categoryWarnings)");
ok(/ยังไม่เลือกหมวดรอง/.test(saveFnBody) && /ยังไม่เลือกหมวดย่อย/.test(saveFnBody),
    "แจ้งแยกชัดเจนว่าขาดหมวดรองหรือหมวดย่อย");
ok(/confirm\(/.test(saveFnBody), "ใช้ confirm() ถามร้านค้าก่อนว่าจะบันทึกต่อไปเลยหรือกลับไปแก้ (ไม่ใช่ alert บล็อกเฉยๆ)");
ok(/if \(!proceed\)/.test(saveFnBody), "ถ้าร้านค้ากด Cancel ต้องหยุดการบันทึก ไม่ใช่บันทึกต่อไปทั้งที่ไม่ครบ");
ok(/switchMerchantPortalTab\("tab-products"\)/.test(saveFnBody), "กด Cancel แล้วพาไปที่แท็บสินค้าให้แก้ (เหมือนรูปแบบ error อื่นในฟอร์มนี้)");
// ต้องครอบคลุมทั้งสินค้า Highlight (m-p-subcat-/m-p-microcat-) และตารางสินค้าเพิ่มเติม (catalog-sub-cat-select/catalog-micro-cat-select)
ok(/categoryWarnings\.push\(\{ label: name/.test(saveFnBody), "เช็คครบสำหรับสินค้า Highlight 10 รายการ");
ok(/categoryWarnings\.push\(\{ label: itemName/.test(saveFnBody), "เช็คครบสำหรับตารางสินค้าเพิ่มเติมด้วย");
// ต้องไม่เผลอไปเติมเช็คนี้ในฟังก์ชันพรีวิว (previewMerchantLiveStore ไม่ได้บันทึกจริง ไม่ควรมี popup เตือน)
const previewBody = (() => {
    try { return fn("previewMerchantLiveStore"); } catch (e) { return ""; }
})();
ok(!/categoryWarnings/.test(previewBody), "ฟังก์ชันพรีวิว (ไม่ได้บันทึกจริง) ไม่ถูกเพิ่มการเตือนนี้ไปด้วยโดยไม่ตั้งใจ");

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
