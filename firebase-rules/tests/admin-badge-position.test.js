// ทดสอบบั๊กที่พบ 2026-09-22: ทุกครั้งที่สลับบทบาท (switchRole) โค้ดจะเขียนทับ className ของปุ่ม
// "5. แอดมิน" ทั้งก้อน และ 2 เทมเพลต (ตอนแอดมิน active / ไม่ active) ลืมใส่คลาส "relative" ทำให้
// ป้ายแจ้งเตือนสีแดง (role-admin-badge, position:absolute) ไปยึดตำแหน่งกับกล่องแถบ 5 ปุ่มทั้งแถบแทน
// ที่จะยึดกับปุ่มแอดมินปุ่มเดียว ป้ายเลยไปโผล่ทับปุ่มอื่น (เช่น "4. ไรเดอร์") แทนที่จะอยู่มุมปุ่ม "5. แอดมิน"
//   - ตรวจแบบ static: เทมเพลต className ทั้ง 2 แบบต้องมีคำว่า "relative" อยู่เสมอ
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// ดึงเทมเพลต className ทั้ง 2 บรรทัดของปุ่มแอดมินใน setActiveRoleView ออกมาตรง ๆ
const lines = src.split("\n").filter(l => l.includes('btn.className = "role-btn') && /purple/.test(l));
ok(lines.length === 2, "พบเทมเพลต className ของปุ่มแอดมินครบ 2 แบบ (ตอน active และไม่ active)");
lines.forEach((l, i) => {
    ok(/\brelative\b/.test(l), `เทมเพลตที่ ${i + 1} มีคลาส "relative" (จำเป็นสำหรับให้ป้ายแจ้งเตือนยึดตำแหน่งกับปุ่มนี้ ไม่ใช่ทั้งแถบ)`);
    ok(/\bshrink-0\b/.test(l), `เทมเพลตที่ ${i + 1} ยังมีคลาส "shrink-0" อยู่ (กันปุ่มถูกบีบเมื่อแถบล้น ไม่ถูกลบไปพร้อมกับที่แก้ครั้งนี้)`);
});

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
