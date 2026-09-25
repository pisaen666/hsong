// ทดสอบงาน 2026-09-25 (เจ้าของเลือกทำจากลิสต์งานค้าง): เดิมเวลาร้าน/ไรเดอร์ไม่มีเลขพร้อมเพย์
// openVendorPayoutModal / openSingleRiderPayoutModal จะใส่เลขตัวอย่าง 089-123-4567 ให้เงียบ ๆ
// แล้วสร้าง QR ที่สแกนโอนเงินได้จริง (เสี่ยงโอนเงินไปเลขที่ไม่มีใครเป็นเจ้าของ)
// แก้โดยเช็ก hasRealPhone ก่อน ถ้าไม่มีเลขจริง: ซ่อน QR/เลขพร้อมเพย์ (รวมปุ่มคัดลอกที่อยู่ในบล็อกเดียวกัน)
// และโชว์กล่องเตือนสีแดงแทน
const fs = require("fs");
const path = require("path");
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

console.log("== index.html: กล่องเตือน + ส่วน QR แยกกันคนละ id ทั้งสองหน้าต่าง ==");
["payout-no-number-warning", "payout-qr-section", "rider-payout-no-number-warning", "rider-payout-qr-section"].forEach(id => {
    ok(new RegExp(`id="${id}"`).test(htmlSrc), `มี id="${id}" ใน index.html`);
});
ok(/id="payout-no-number-warning" class="hidden/.test(htmlSrc), "กล่องเตือนร้านค้า ซ่อนอยู่เป็นค่าเริ่มต้น");
ok(/id="rider-payout-no-number-warning" class="hidden/.test(htmlSrc), "กล่องเตือนไรเดอร์ ซ่อนอยู่เป็นค่าเริ่มต้น");
{
    const s = htmlSrc.indexOf('id="payout-qr-section"');
    const e = htmlSrc.indexOf("Attach Transfer Slip Section", s);
    const block = htmlSrc.slice(s, e);
    ok(/id="payout-qr-image"/.test(block) && /id="payout-promptpay-number"/.test(block) && /copyPayoutPromptPayNumber/.test(block),
        "ปุ่มคัดลอก/เลขพร้อมเพย์/QR ร้านค้า อยู่ในบล็อกเดียวกับที่จะถูกซ่อน");
}
{
    const s = htmlSrc.indexOf('id="rider-payout-qr-section"');
    const e = htmlSrc.indexOf("Attach Transfer Slip Section", s);
    const block = htmlSrc.slice(s, e);
    ok(/id="rider-payout-qr-image"/.test(block) && /id="rider-payout-promptpay-number"/.test(block) && /copyRiderPayoutPromptPayNumber/.test(block),
        "ปุ่มคัดลอก/เลขพร้อมเพย์/QR ไรเดอร์ อยู่ในบล็อกเดียวกับที่จะถูกซ่อน");
}

console.log("== app.js: openVendorPayoutModal เช็ก hasRealPhone ก่อนใส่เลขตัวอย่าง ==");
{
    const body = fn("openVendorPayoutModal");
    ok(/const hasRealPhone = /.test(body), "คำนวณ hasRealPhone ก่อนใส่ค่า fallback");
    ok(/warningEl\.classList\.toggle\("hidden", hasRealPhone\)/.test(body), "สลับการซ่อน/โชว์กล่องเตือนตาม hasRealPhone");
    ok(/qrSectionEl\.classList\.toggle\("hidden", !hasRealPhone\)/.test(body), "สลับการซ่อน/โชว์ส่วน QR ตาม hasRealPhone");
    ok(/if \(qrImg && hasRealPhone\)/.test(body), "ไม่สร้าง QR เลย ถ้าไม่มีเลขจริง (กันสแกนโอนไปเลขตัวอย่าง)");
    ok(/hasRealPhone \? _currentPayoutStall\.phone : "ยังไม่มีเลข"/.test(body), "ช่องแสดงเบอร์บนการ์ดร้านก็ไม่โชว์เลขตัวอย่างด้วย");
}

console.log("== app.js: openSingleRiderPayoutModal เช็ก hasRealPhone ก่อนใส่เลขตัวอย่าง ==");
{
    const body = fn("openSingleRiderPayoutModal");
    ok(/const hasRealPhone = /.test(body), "คำนวณ hasRealPhone ก่อนใส่ค่า fallback");
    ok(/warningEl\.classList\.toggle\("hidden", hasRealPhone\)/.test(body), "สลับการซ่อน/โชว์กล่องเตือนตาม hasRealPhone");
    ok(/qrSectionEl\.classList\.toggle\("hidden", !hasRealPhone\)/.test(body), "สลับการซ่อน/โชว์ส่วน QR ตาม hasRealPhone");
    ok(/if \(qrImg && hasRealPhone\)/.test(body), "ไม่สร้าง QR เลย ถ้าไม่มีเลขจริง (กันสแกนโอนไปเลขตัวอย่าง)");
    ok(/hasRealPhone \? _currentRiderPayout\.phone : "ยังไม่มีเลข"/.test(body), "ช่องแสดงเบอร์บนการ์ดไรเดอร์ก็ไม่โชว์เลขตัวอย่างด้วย");
}

console.log("== จุดต้นทางที่เคยใส่เลขตัวอย่างให้เงียบ ๆ ก่อนถึงสองฟังก์ชันข้างบน ต้องเลิกใส่แล้ว ==");
// เดิมแม้ในสองฟังก์ชันหลักจะเช็ก hasRealPhone แล้ว แต่จุดเรียกใช้เหล่านี้ดันแทนที่ "ไม่มีเลข" ด้วยเลขตัวอย่าง
// ที่หน้าตาเหมือนเลขจริง (9-10 หลัก) มาก่อนแล้ว ทำให้ hasRealPhone ตรวจไม่พบว่าเป็นเลขปลอม
{
    const findStallInfoBody = fn("findStallInfo");
    ok(/phone: ""/.test(findStallInfoBody), "findStallInfo (ไม่เจอร้านเลย): เบอร์ค่าเริ่มต้นเป็นค่าว่าง ไม่ใช่เบอร์ตัวอย่าง");
}
{
    const reportBody = fn("aggregateDailyOperations");
    ok(/phone: \(meta && meta\.phone\) \|\| "",/.test(reportBody), "aggregateDailyOperations (stallsMap): เบอร์ร้านไม่มีเลขตัวอย่างมาแทนแล้ว");
    ok(!/"089-123-4567"/.test(reportBody), "aggregateDailyOperations: ไม่มีเลขตัวอย่างหลงเหลืออยู่เลย");
}
{
    const settlementBody = fn("renderHubSettlement");
    ok(/const stallPhone = meta\.phone \|\| "";/.test(settlementBody), "renderHubSettlement (ปุ่มโอนเคลียร์เงินต่อร้าน): เบอร์ไม่มีเลขตัวอย่างมาแทนแล้ว");
}
{
    const rosterBody = fn("renderAdminStalls");
    ok(!/jsArg\(s\.phone \|\| '089-123-4567'\)/.test(rosterBody), "renderAdminStalls (ปุ่ม QR โอน ในตารางร้านค้า): เบอร์ไม่มีเลขตัวอย่างมาแทนแล้ว");
}
{
    const riderModalBody = fn("openSingleRiderPayoutModal");
    ok(/phone: phone \|\| ""/.test(riderModalBody), "openSingleRiderPayoutModal: ตัวแปรสำรอง r ก็ไม่ใส่เลขตัวอย่างแล้ว (จุดนี้ป้อนเข้า fallback chain ของ finalPhone)");
}

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
