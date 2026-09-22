// ทดสอบบั๊กที่พบ 2026-09-22: ทุกครั้งที่สลับบทบาท (switchRole) โค้ดจะเขียนทับ className ของปุ่ม
// "5. แอดมิน" ทั้งก้อน และ 2 เทมเพลต (ตอนแอดมิน active / ไม่ active) ลืมใส่คลาส "relative" ทำให้
// ป้ายแจ้งเตือนสีแดง (role-admin-badge, position:absolute) ไปยึดตำแหน่งกับกล่องแถบ 5 ปุ่มทั้งแถบแทน
// ที่จะยึดกับปุ่มแอดมินปุ่มเดียว ป้ายเลยไปโผล่ทับปุ่มอื่น (เช่น "4. ไรเดอร์") แทนที่จะอยู่มุมปุ่ม "5. แอดมิน"
//   - ตรวจแบบ static: เทมเพลต className ทั้ง 2 แบบต้องมีคำว่า "relative" อยู่เสมอ
//
// บั๊กที่ 2 พบ 2026-09-22 (แม้แก้บั๊กแรกแล้ว): ปุ่มแอดมินเป็นปุ่มขวาสุดในแถบ 5 ปุ่ม บนจอมือถือแคบที่แถบล้น
// ขอบขวาของปุ่มแอดมิน (และป้ายแดงที่ยึดมุมขวาบน "-right-1") จะโดนตัดพ้นจอเสมอ ป้ายเลยแอบไปโผล่ตรงขอบ
// ที่มองเห็นพอดี (ใกล้ปุ่มไรเดอร์) ทำให้ดูเหมือนบั๊กเดิมยังไม่หาย ทั้งที่จริง ๆ ยึดถูกปุ่มแล้ว
//   - แก้โดยย้ายป้ายไปมุมซ้ายบนแทน ("-left-1") เพราะขอบซ้ายของปุ่มแอดมินจะเห็นได้ก่อนขอบขวาเสมอ
//   - และเพิ่ม auto-scroll ใน setActiveRoleView ให้ปุ่มที่กำลังเลือกเลื่อนเข้ามาในจอเต็มปุ่มเสมอ
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// ดึงเทมเพลต className ทั้ง 2 บรรทัดของปุ่มแอดมินใน setActiveRoleView ออกมาตรง ๆ
const lines = src.split("\n").filter(l => l.includes('btn.className = "role-btn') && /purple/.test(l));
ok(lines.length === 2, "พบเทมเพลต className ของปุ่มแอดมินครบ 2 แบบ (ตอน active และไม่ active)");
lines.forEach((l, i) => {
    ok(/\brelative\b/.test(l), `เทมเพลตที่ ${i + 1} มีคลาส "relative" (จำเป็นสำหรับให้ป้ายแจ้งเตือนยึดตำแหน่งกับปุ่มนี้ ไม่ใช่ทั้งแถบ)`);
    ok(/\bshrink-0\b/.test(l), `เทมเพลตที่ ${i + 1} ยังมีคลาส "shrink-0" อยู่ (กันปุ่มถูกบีบเมื่อแถบล้น ไม่ถูกลบไปพร้อมกับที่แก้ครั้งนี้)`);
});

// ป้ายแจ้งเตือนต้องยึดมุม "ซ้าย" บน ไม่ใช่มุมขวา (มุมขวาของปุ่มขวาสุดจะโดนตัดพ้นจอบนมือถือแคบ)
const badgeLine = indexSrc.split("\n").find(l => l.includes('id="role-admin-badge"'));
ok(!!badgeLine, "พบแท็กป้ายแจ้งเตือน role-admin-badge ใน index.html");
ok(/-left-1/.test(badgeLine), "ป้ายแจ้งเตือนยึดมุมซ้ายบน (-left-1) ไม่ใช่มุมขวา (กันโดนตัดพ้นจอบนมือถือแคบ)");
ok(!/-right-1/.test(badgeLine), "ป้ายแจ้งเตือนไม่มีคลาส -right-1 หลงเหลืออยู่");

// setActiveRoleView ต้องมี auto-scroll ให้ปุ่มที่กำลังเลือกเลื่อนเข้ามาเต็มปุ่มเสมอ
ok(/roleBar\.scrollLeft/.test(src), "setActiveRoleView มีโค้ดเลื่อนแถบ (scrollLeft) ให้ปุ่มที่กำลังเลือกเห็นเต็มปุ่ม");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
