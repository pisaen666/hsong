// ทดสอบงาน 2026-09-23 (คำขอเจ้าของ): เอาระบบ "โซน" (A/B/C/D/E) ของแผงค้าออกทั้งหมด
// เหตุผลของเจ้าของ: ตลาดไม่ได้มีพื้นที่ใหญ่ ร้านค้าเปลี่ยนมือบ่อย โซนเดิมไม่เคยตรงกับของที่ขายจริง
// (ดูบั๊กที่เกี่ยวข้อง: merchant-stall-category.test.js / admin-stall-category-edit.test.js)
// แทนที่ด้วยหมวดหมู่ 11 กลุ่มเดียวกับตอนลงทะเบียนร้าน (CATEGORY_TAXONOMY_3TIER / getMainCategories())
// ทุกจุดที่เคยกรอง/แสดง "โซน" ของแผงค้า (ไม่ใช่โซนวิ่งของไรเดอร์ ซึ่งเป็นคนละแนวคิด ต้องคงไว้เหมือนเดิม)
const fs = require("fs");
const path = require("path");
const appSrc = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const htmlSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

console.log("== ฟังก์ชัน/ตัวแปร 'โซนแผงค้า' เดิมต้องไม่เหลืออยู่ใน app.js ==");
[
    "function filterDirectoryZone(",
    "function scrollZoneTabs(",
    "function filterAdminStallsByZone(",
    "_adminStallZoneFilter",
    "currentDirectoryZone",
    "dir-zone-btn",
    "directory-zone-tabs",
    "merchant-edit-zone",
    "m-stall-zone",
    "merchant-header-zone-badge",
    "merchant-portal-zone-text",
    "modal-stall-zone",
].forEach(needle => ok(!appSrc.includes(needle), `ไม่พบ "${needle}" ใน app.js แล้ว`));

console.log("== id/class 'โซนแผงค้า' เดิมต้องไม่เหลืออยู่ใน index.html ==");
[
    "directory-zone-tabs",
    "dir-zone-btn",
    "merchant-edit-zone",
    "m-stall-zone",
    "merchant-header-zone-badge",
    "merchant-portal-zone-text",
    "modal-stall-zone",
].forEach(needle => ok(!htmlSrc.includes(needle), `ไม่พบ "${needle}" ใน index.html แล้ว`));

console.log("== ฟังก์ชัน/ตัวแปร/id ใหม่ (หมวดหมู่แทนโซน) ต้องมีอยู่จริง ==");
ok(appSrc.includes("function filterDirectoryCategory("), "มีฟังก์ชัน filterDirectoryCategory ใน app.js");
ok(appSrc.includes("function scrollDirectoryCategoryTabs("), "มีฟังก์ชัน scrollDirectoryCategoryTabs ใน app.js");
ok(appSrc.includes("function filterAdminStallsByCategory("), "มีฟังก์ชัน filterAdminStallsByCategory ใน app.js");
ok(appSrc.includes("window.filterAdminStallsByCategory = filterAdminStallsByCategory"), "filterAdminStallsByCategory ผูกกับ window แล้ว");
ok(appSrc.includes("let _adminStallCategoryFilter"), "มีตัวแปร _adminStallCategoryFilter ใน app.js");
ok(appSrc.includes("currentDirectoryCategory"), "มี state.currentDirectoryCategory ใน app.js");
ok(htmlSrc.includes('id="directory-category-tabs"'), 'มี id="directory-category-tabs" ใน index.html');
ok(htmlSrc.includes('id="merchant-edit-category"'), 'มี id="merchant-edit-category" ใน index.html');
ok(htmlSrc.includes('id="merchant-header-category-badge"'), 'มี id="merchant-header-category-badge" ใน index.html');
ok(htmlSrc.includes('id="merchant-portal-category-text"'), 'มี id="merchant-portal-category-text" ใน index.html');
ok(htmlSrc.includes('id="modal-stall-category"'), 'มี id="modal-stall-category" ใน index.html');

console.log("== แท็บกรองในหน้าทำเนียบร้านค้า (customer) ต้องมีครบ 11 หมวด + ทั้งหมด ==");
const dirTabsStart = htmlSrc.indexOf('id="directory-category-tabs"');
const dirTabsBlock = htmlSrc.slice(dirTabsStart, dirTabsStart + 4000);
const dirBtnCount = (dirTabsBlock.match(/filterDirectoryCategory\(/g) || []).length;
ok(dirBtnCount === 12, `แท็บกรองทำเนียบร้านค้ามี 12 ปุ่ม (ทั้งหมด + 11 หมวด) พบ ${dirBtnCount}`);

console.log("== ช่องหมวดหมู่ในฟอร์มแก้ไขใบสมัคร (แอดมิน) ต้องมีครบ 11 ตัวเลือก ==");
const editSelStart = htmlSrc.indexOf('id="merchant-edit-category"');
const editSelBlock = htmlSrc.slice(editSelStart, editSelStart + 2500);
const editOptCount = (editSelBlock.match(/<option value=/g) || []).length;
ok(editOptCount === 11, `select merchant-edit-category มี 11 ตัวเลือก พบ ${editOptCount}`);

console.log("== ตัวกรองต้องเทียบด้วย normalizeMainCategoryName (รองรับหมวดหมู่เก่าแบบ 'chicken' ด้วย) ==");
ok(/normalizeMainCategoryName\(s\.category\) === state\.currentDirectoryCategory/.test(appSrc),
    "renderDirectoryList กรองด้วย normalizeMainCategoryName(s.category)");
ok(/normalizeMainCategoryName\(s\.category\) === _adminStallCategoryFilter/.test(appSrc),
    "ตัวกรองแผงค้าฝั่งแอดมิน (อย่างน้อย 1 จุด) กรองด้วย normalizeMainCategoryName(s.category)");

console.log("== ต้องไม่แตะ 'โซนไรเดอร์' (คนละแนวคิด: พื้นที่ที่ไรเดอร์วิ่งส่งสะดวก) ==");
[
    "onpage-rider-zone",
    "rider-form-zone",
    "app-edit-zone",
    "reg-rider-zone",
].forEach(needle => ok(htmlSrc.includes(needle), `id ของไรเดอร์ "${needle}" ยังอยู่ครบ ไม่ถูกแตะต้อง`));
ok(/function loadOnpageRiderForm|reg-rider-zone/.test(appSrc) || appSrc.includes('getElementById("reg-rider-zone")'),
    "โค้ดไรเดอร์ยังอ้างอิง reg-rider-zone ตามเดิม");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
