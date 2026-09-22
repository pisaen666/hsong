// ทดสอบบั๊กที่พบ 2026-09-22: ทุกครั้งที่สลับบทบาท (switchRole) โค้ดจะเขียนทับ className ของปุ่ม
// "5. แอดมิน" ทั้งก้อน และ 2 เทมเพลต (ตอนแอดมิน active / ไม่ active) ลืมใส่คลาส "relative" ทำให้
// ป้ายแจ้งเตือนสีแดง (role-admin-badge, position:absolute) ไปยึดตำแหน่งกับกล่องแถบ 5 ปุ่มทั้งแถบแทน
// ที่จะยึดกับปุ่มแอดมินปุ่มเดียว ป้ายเลยไปโผล่ทับปุ่มอื่น (เช่น "4. ไรเดอร์") แทนที่จะอยู่มุมปุ่ม "5. แอดมิน"
//   - ตรวจแบบ static: เทมเพลต className ทั้ง 2 แบบต้องมีคำว่า "relative" อยู่เสมอ
//
// บั๊กที่ 2 พบ 2026-09-22 (แม้แก้บั๊กแรกแล้ว): ปุ่มแอดมินเป็นปุ่มขวาสุดในแถบ 5 ปุ่ม บนจอมือถือแคบที่แถบล้น
// ขอบขวาของปุ่มแอดมิน (และป้ายแดงที่ยึดมุมขวาบน "-right-1") จะโดนตัดพ้นจอเสมอ ป้ายเลยแอบไปโผล่ตรงขอบ
// ที่มองเห็นพอดี (ใกล้ปุ่มไรเดอร์) ทำให้ดูเหมือนบั๊กเดิมยังไม่หาย ทั้งที่จริง ๆ ยึดถูกปุ่มแล้ว
//   - แก้โดยย้ายป้ายไปมุมซ้ายบนแทน เพราะขอบซ้ายของปุ่มแอดมินจะเห็นได้ก่อนขอบขวาเสมอ
//   - และเพิ่ม auto-scroll ใน setActiveRoleView ให้ปุ่มที่กำลังเลือกเลื่อนเข้ามาในจอเต็มปุ่มเสมอ
//
// บั๊กที่ 2b พบ 2026-09-22 (เจ้าของเทสอีกรอบ ยังเห็นจุดแดงคาบเกี่ยวปุ่มไรเดอร์): ตอนแรกใช้ "-left-1" (ค่าติดลบ)
// ซึ่งใน Tailwind แปลว่า "ยื่นออกไปนอกกล่องปุ่ม 4px" ไม่ใช่ "ชิดขอบในกล่อง" - ปุ่มแอดมิน/ไรเดอร์อยู่ชิดกันมาก
// (ช่องว่างแค่ 2px) ป้ายเลยยื่นทับขอบปุ่มไรเดอร์จริง แม้ offsetParent จะยึดปุ่มแอดมินถูกต้องแล้วก็ตาม
//   - แก้โดยเปลี่ยนเป็น "left-1" (ไม่มีเครื่องหมายลบ = ชิดขอบในกล่อง) เหมือนแบบที่ป้าย NEW ของปุ่มจัดส่งใช้อยู่แล้ว
//     (hub-badge-count ใช้ "right-1" ไม่ใช่ "-right-1" มาตั้งแต่แรก จึงไม่เคยมีปัญหานี้)
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
// และต้องเป็นมุม "ข้างใน" กล่องปุ่ม (left-1, ไม่ใช่ -left-1) ไม่งั้นป้ายจะโผล่ยื่นออกไปทับปุ่มข้าง ๆ
// (บั๊กที่ 2b พบ 2026-09-22 หลังแก้บั๊กที่ 2: -left-1 ทำให้ป้ายยื่นออกนอกขอบซ้ายของปุ่มแอดมิน 4px
//  ไปทับขอบขวาของปุ่มไรเดอร์ที่อยู่ติดกัน ทั้งที่ offsetParent ยึดถูกปุ่มแอดมินแล้วจริง ๆ)
const badgeLine = indexSrc.split("\n").find(l => l.includes('id="role-admin-badge"'));
ok(!!badgeLine, "พบแท็กป้ายแจ้งเตือน role-admin-badge ใน index.html");
ok(/(?<!-)\bleft-1\b/.test(badgeLine), "ป้ายแจ้งเตือนยึดมุมซ้ายบน แบบอยู่ข้างในกล่องปุ่ม (left-1 ไม่ใช่ -left-1) กันยื่นออกไปทับปุ่มไรเดอร์ข้าง ๆ");
ok(!/-right-1/.test(badgeLine), "ป้ายแจ้งเตือนไม่มีคลาส -right-1 หลงเหลืออยู่");
ok(!/-left-1/.test(badgeLine), "ป้ายแจ้งเตือนไม่มีคลาส -left-1 (แบบยื่นออกนอกกล่อง) หลงเหลืออยู่");

// setActiveRoleView ต้องมี auto-scroll ให้ปุ่มที่กำลังเลือกเลื่อนเข้ามาเต็มปุ่มเสมอ
ok(/roleBar\.scrollLeft/.test(src), "setActiveRoleView มีโค้ดเลื่อนแถบ (scrollLeft) ให้ปุ่มที่กำลังเลือกเห็นเต็มปุ่ม");

// บั๊กที่ 3 พบ 2026-09-22 (เจอตอนไล่หาบั๊กที่ 1): ป้าย "NEW" ของปุ่ม "2. จัดส่ง" (hub-badge-count) โดนบั๊กเดียวกันเป๊ะ -
// เทมเพลต className ของปุ่มที่ไม่ใช่แอดมิน/ลูกค้า (ใช้กับ จัดส่ง/แผงค้า/ไรเดอร์) ก็ไม่มีคลาส "relative" เหมือนกัน
// ทำให้ป้าย NEW ไปยึดกับทั้งแถบแทนปุ่ม "จัดส่ง" ลอยไปโผล่ใกล้ปุ่มไรเดอร์/แอดมินแทน (ทั้งที่มีไว้แจ้งเตือนเรื่องปุ่มจัดส่ง)
const setActiveRoleViewStart = src.indexOf("function setActiveRoleView(role)");
const setActiveRoleViewEnd = src.indexOf("\nfunction ", setActiveRoleViewStart + 10);
const setActiveRoleViewBody = src.slice(setActiveRoleViewStart, setActiveRoleViewEnd);
const nonAdminLines = setActiveRoleViewBody.split("\n").filter(l => l.includes('btn.className = "role-btn') && !/purple/.test(l));
ok(nonAdminLines.length === 2, "พบเทมเพลต className ของปุ่ม จัดส่ง/แผงค้า/ไรเดอร์ ครบ 2 แบบ (ตอน active และไม่ active)");
nonAdminLines.forEach((l, i) => {
    ok(/\brelative\b/.test(l), `เทมเพลตที่ ${i + 1} (จัดส่ง/แผงค้า/ไรเดอร์) มีคลาส "relative" (กันป้าย NEW ของปุ่มจัดส่งไปยึดกับทั้งแถบ)`);
});
const hubBadgeLine = indexSrc.split("\n").find(l => l.includes('id="hub-badge-count"'));
ok(!!hubBadgeLine, "พบแท็กป้ายแจ้งเตือน hub-badge-count ใน index.html");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
