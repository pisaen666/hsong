// ทดสอบงาน 2026-09-23 (คำขอเจ้าของ): ร้านค้าที่ล็อกอินอยู่ไม่ควรเห็นแท็บ "จัดส่ง" (ฮับ, ต้องล็อกอินเจ้าของเท่านั้น)
// และ "ไรเดอร์" (ต้องมีรหัสไรเดอร์แยกต่างหาก) ในแถบสลับบทบาทบนสุด เพราะกดไปก็เจอแค่หน้าล็อกอินที่ไม่เกี่ยวกับ
// ร้านค้า สร้างความสับสนเปล่า ๆ ให้พ่อค้าแม่ค้าที่ไม่ถนัดเทคโนโลยี - แท็บ "ลูกค้า" ยังคงแสดงไว้ตามเดิม
// เพราะร้านค้ามีปุ่ม "ดูหน้าร้านในตลาด" ที่ตั้งใจสลับไปแท็บนี้อยู่แล้ว
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

console.log("== ตัวช่วยซ่อน/แสดงแท็บ จัดส่ง+ไรเดอร์ ตามบทบาทปัจจุบัน ==");
ok(appSrc.includes("function updateHubRiderTabsVisibility("), "มีฟังก์ชัน updateHubRiderTabsVisibility");
ok(appSrc.includes("window.updateHubRiderTabsVisibility = updateHubRiderTabsVisibility"), "ผูกกับ window แล้ว");
const helperBody = fn("updateHubRiderTabsVisibility");
ok(/state\.currentRole === "merchant"/.test(helperBody), "เช็คว่าอยู่ในบทบาทร้านค้าหรือไม่");
ok(/role-btn-hub/.test(helperBody) && /role-btn-rider/.test(helperBody), "จัดการปุ่ม role-btn-hub และ role-btn-rider");
ok(!/role-btn-customer/.test(helperBody), "ไม่แตะปุ่ม role-btn-customer (ต้องแสดงไว้เสมอ)");

console.log("== setActiveRoleView และ renderAuthHeaderButtons ต้องเรียกตัวช่วยนี้ (2 จุดที่เคยแก้ role-btn-admin ไว้) ==");
const setActiveBody = fn("setActiveRoleView");
ok(/updateHubRiderTabsVisibility\(\)/.test(setActiveBody), "setActiveRoleView เรียก updateHubRiderTabsVisibility");
const renderAuthBody = fn("renderAuthHeaderButtons");
ok(/updateHubRiderTabsVisibility\(\)/.test(renderAuthBody), "renderAuthHeaderButtons เรียก updateHubRiderTabsVisibility");

console.log("== แถบ 'สลับบทบาท:' เล็กในหน้าร้านค้าเอง (index.html) ต้องเหลือแค่ปุ่มลูกค้า ==");
const crossRoleStart = htmlSrc.indexOf("Cross-Role Quick Navigation Bar for Merchant");
ok(crossRoleStart >= 0, "พบคอมเมนต์ Cross-Role Quick Navigation Bar for Merchant");
const crossRoleBlock = htmlSrc.slice(crossRoleStart, crossRoleStart + 1500);
ok(crossRoleBlock.includes("switchRole('customer')"), "แถบนี้ยังมีปุ่มไปหน้าลูกค้า");
ok(!crossRoleBlock.includes("switchRole('hub')"), "แถบนี้ไม่มีปุ่มไปหน้าฮับ/จัดส่งแล้ว");
ok(!crossRoleBlock.includes("switchRole('rider')"), "แถบนี้ไม่มีปุ่มไปหน้าไรเดอร์แล้ว");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
