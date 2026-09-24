// ทดสอบคู่มือไรเดอร์ (guide-rider.html, คำขอเจ้าของ 2026-09-24): คู่มือต้องตรงกับหน้าจอจริงเสมอ
// - ชื่อปุ่มทุกอันที่คู่มือบอกให้กด (<span class="btn-name">) ต้องยังมีอยู่จริงใน index.html หรือ app.js
// - รูปทุกรูปต้องมีไฟล์อยู่จริง, ลิงก์ในแอปต้องชี้ไปหัวข้อที่มีอยู่ในคู่มือ และเปิดแท็บใหม่ (ข้อมูลที่กรอกไว้ไม่หาย)
// - ตัวเลขกติกาที่คู่มือบอก (เอกสารบังคับ, 15 MB, 3 บัญชี, ล็อก 5 ครั้ง/5 นาที, รหัส 8 ตัว) ต้องตรงกับโค้ด
// ถ้าเทสต์นี้พัง แปลว่าแก้หน้าจอแล้วลืมแก้คู่มือ ให้แก้คู่มือ (และถ่ายรูปใหม่ถ้าหน้าตาเปลี่ยน)
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const htmlSrc = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));
const guide = norm(fs.readFileSync(path.join(root, "guide-rider.html"), "utf8"));
const flat = s => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const screenText = flat(htmlSrc) + " " + appSrc.replace(/\s+/g, " ");   // app.js ดิบ (ตัดแท็กแล้วข้อความหาย เพราะมีเครื่องหมาย < > ในโค้ด)

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

console.log("== ชื่อปุ่มในคู่มือต้องมีอยู่จริงบนหน้าจอ ==");
const btnNames = [...guide.matchAll(/<span class="btn-name">([^<]+)<\/span>/g)].map(m => m[1].trim());
ok(btnNames.length >= 20, `คู่มืออ้างชื่อปุ่ม ${btnNames.length} อัน`);
[...new Set(btnNames)].forEach(b => ok(screenText.includes(b), `ปุ่ม "${b}" มีอยู่จริง`));

console.log("== ข้อความเตือนที่คู่มือยกมา ต้องตรงกับข้อความจริงในโค้ด ==");
[
    "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง",
    "กรุณากรอกที่อยู่ปัจจุบันให้ครบถ้วน",
    "เลขพร้อมเพย์ต้องเป็นเบอร์มือถือ 10 หลัก",
    "กรุณาติ๊กยืนยันและยินยอมเงื่อนไข",
    "เบอร์นี้ส่งใบสมัครไว้แล้ว",
    "ส่งข้อมูลส่วนตัวไม่สำเร็จ",
    "บันทึกรูปเอกสารไม่สำเร็จ",
    "เลขไรเดอร์หรือรหัสผ่านไม่ถูกต้อง",
    "ใส่รหัสผิดหลายครั้ง กรุณารออีก",
    "ใบสมัครของคุณยังรอเจ้าของอนุมัติ",
    "บัญชีนี้ยังไม่มีรหัสผ่านเข้าระบบ",
    "ใบสมัครนี้ไม่ผ่านการอนุมัติ",
    "ส่งใบสมัครแล้ว รอเจ้าของอนุมัติ",
    "มีซองเงินทอนคืนลูกค้า",
    "ยังไม่มีงานรอรับในขณะนี้",
    "เงินสด COD ถือติดตัว",
    "สรุปยอดเงินต้องเคลียร์กับฮับตลาด",
    "อัปโหลดแล้ว"
].forEach(t => ok(guide.includes(t) && screenText.includes(t), `ข้อความ "${t}" อยู่ทั้งในคู่มือและในโค้ด`));

console.log("== รูปทุกรูปต้องมีไฟล์จริง ==");
const imgs = [...guide.matchAll(/<img src="([^"]+)"/g)].map(m => m[1]);
ok(imgs.length >= 20, `คู่มือมีรูป ${imgs.length} รูป`);
imgs.forEach(src => ok(fs.existsSync(path.join(root, src)), `มีไฟล์ ${src}`));
ok(/guide\.css/.test(guide) && fs.existsSync(path.join(root, "guide.css")), "มีไฟล์ guide.css");
ok(!/<script/i.test(guide), "คู่มือไม่มี <script> (หน้าเอกสารล้วน ไม่เชื่อมฐานข้อมูล)");

console.log("== ลิงก์จากแอปไปคู่มือ ==");
const anchors = new Set([...guide.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
["rider-guide-link-onpage", "rider-guide-link-login", "rider-guide-link-workspace", "rider-guide-link-modal"].forEach(id => {
    const m = htmlSrc.match(new RegExp(`<a href="guide-rider\\.html#([a-z0-9-]+)" target="_blank" rel="noopener" id="${id}"`));
    ok(!!m, `index.html มีลิงก์ ${id} เปิดแท็บใหม่`);
    if (m) ok(anchors.has(m[1]), `ลิงก์ ${id} ชี้ไปหัวข้อ #${m[1]} ที่มีอยู่จริง`);
});
const noticeLinks = [...appSrc.matchAll(/guide-rider\.html#\$\{[^}]*"([a-z0-9-]+)"\s*:\s*"([a-z0-9-]+)"\}/g)];
ok(noticeLinks.length === 1, "กล่องแจ้งผลใบสมัคร (renderRiderApplicationNotice) มีลิงก์คู่มือ");
noticeLinks.forEach(m => ok(anchors.has(m[1]) && anchors.has(m[2]), `ลิงก์ในกล่องแจ้งผลชี้ #${m[1]} / #${m[2]} ที่มีอยู่จริง`));

console.log("== ตัวเลขกติกาในคู่มือตรงกับโค้ด ==");
const slots = appSrc.match(/const RIDER_DOC_SLOTS = \[([\s\S]*?)\];/)[1];
const required = [...slots.matchAll(/label: "([^"]+)"[^\n]*required: true/g)].map(m => m[1]);
ok(required.length === 3, "เอกสารบังคับ 3 ใบ (ตามที่คู่มือบอก)");
ok(guide.includes("3 ใบที่ต้องมี"), "คู่มือบอกว่าต้องมี 3 ใบ");
ok(/file\.size > 15 \* 1024 \* 1024/.test(appSrc) && guide.includes("15 MB"), "ขนาดรูปสูงสุด 15 MB ตรงกัน");
ok(/const RIDER_MAX_ACCOUNTS = 3;/.test(appSrc) && guide.includes("สูงสุด 3 บัญชี"), "บัญชีรับเงินสูงสุด 3 บัญชี ตรงกัน");
ok(/const RIDER_SECRET_LENGTH = 8;/.test(appSrc) && guide.includes("รหัสผ่าน 8 ตัว"), "รหัสผ่าน 8 ตัว ตรงกัน");
ok(/ผิด 5 ครั้งภายใน 10 นาที ล็อก 5 นาที/.test(appSrc) && guide.includes("ผิดครบ 5 ครั้ง ระบบจะล็อกไว้ 5 นาที"), "กติกาล็อก 5 ครั้ง / 5 นาที ตรงกัน");
const alphabet = appSrc.match(/const RIDER_SECRET_ALPHABET = "([A-Z0-9]+)"/)[1];
ok(!/[01OIL]/.test(alphabet) && guide.includes("ไม่มีตัว O I L และไม่มีเลข 0 1"), "คู่มือบอกถูกว่ารหัสไม่มี O I L 0 1");
ok(/baseFee: 40/.test(appSrc) && guide.includes("ได้ 40 บาทต่อรอบ"), "ค่ารอบ 40 บาท ตรงกับโค้ด");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
