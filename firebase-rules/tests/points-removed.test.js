// เจ้าของสั่ง 2026-09-28: ลบระบบแต้มสะสม / แลกของรางวัล (ของตัวอย่าง: ทุกคน 160 แต้ม Platinum, แลกแล้วไม่มีใครส่งของ)
// และข้อความ "ค่ารอบ ฿40" ที่ตกค้างในหน้าเว็บหลังเปลี่ยนเป็นค่ารอบเริ่มต้น 30 บาท + ตามระยะ
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const html = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));
const noComments = s => s.replace(/<!--[\s\S]*?-->/g, "");
const appCode = appSrc.replace(/^\s*\/\/.*$/gm, "");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) return null;
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

console.log("== ไม่มีระบบแต้มสะสมแล้ว");
ok(!/แต้ม/.test(noComments(html)), "หน้าเว็บไม่มีคำว่า 'แต้ม'");
ok(!/แต้ม|Platinum|customerPoints/.test(appCode.replace(/\/\/.*$/gm, "")), "โค้ดไม่มีแต้ม / Platinum / customerPoints");
ok(!/id="rewards-modal"|id="review-reward-modal"|wallet-points-display|wallet-progress-bar/.test(html), "หน้าแลกของรางวัล / หน้าฉลองรับแต้ม / การ์ดแต้มในกระเป๋า ถูกลบ");
["openRewardsModal", "closeRewardsModal", "redeemRewardItem", "openReviewRewardModal", "closeReviewRewardModal"].forEach(n => {
    ok(fn(n) === null && !new RegExp(n + "\\(").test(html), n + " ถูกลบ และไม่มีปุ่มไหนเรียกใช้");
});
const rating = fn("submitOrderRating");
ok(rating && /ขอบคุณสำหรับรีวิว/.test(rating) && !/Modal\(\)/.test(rating.replace("closeRatingModal()", "")), "ส่งรีวิวแล้วขึ้นแค่ 'ขอบคุณ' ไม่เปิดหน้ารับแต้ม");
ok(/<span>ส่งคะแนนรีวิว<\/span>/.test(html), "ปุ่มรีวิวไม่สัญญาว่าได้แต้ม");
const banner = fn("updateCustomerLoyaltyBanner");
ok(/ออเดอร์ของฉัน/.test(banner) && /openCustomerWalletModal\(\)/.test(banner) && /escapeHtml\(id\)/.test(banner), "ป้ายหน้าแรก (ล็อกอินแล้ว) พาไปดูออเดอร์ล่าสุด และชื่อผ่าน escapeHtml");
ok(/>ออเดอร์ของฉัน<\/h3>/.test(html) && /id="wallet-recent-order-section"/.test(html), "หน้าต่าง 'ออเดอร์ของฉัน' ยังมีปุ่มสั่งซ้ำออเดอร์ล่าสุด");

console.log("== ไม่มีค่ารอบ ฿40 ตกค้าง");
ok(!/฿40/.test(noComments(html)), "หน้าเว็บไม่มี ฿40 แล้ว");
ok((noComments(html).match(/ค่ารอบเริ่มต้น (<strong>)?฿30/g) || []).length >= 3, "ประกาศรับสมัครไรเดอร์บอกค่ารอบเริ่มต้น ฿30");
ok(/id="rdc-rider-fee"/.test(html) && /setVal\("rdc-rider-fee", `\+฿\$\{riderTripFeeForOrder\(o\)\} ค่ารอบจัดส่ง`\)/.test(appSrc), "การ์ดส่งสำเร็จแสดงค่ารอบตามระยะของเที่ยวนั้น");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
