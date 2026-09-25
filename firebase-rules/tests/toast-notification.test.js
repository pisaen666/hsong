// ทดสอบ (owner-reported 2026-09-25): กดปุ่ม "บันทึกการตั้งค่าค่ารอบ" แล้วไม่มีข้อความแจ้งว่าบันทึกสำเร็จเลย
// พบว่า showToast() หา #toast-message / #toast-text ด้วย getElementById ไม่เคยเจอเลย เพราะ index.html
// ไม่เคยมี element นี้อยู่จริงตั้งแต่คอมมิตแรกของทั้งโปรเจกต์ (ยืนยันด้วย git log -S "toast-message" -- index.html
// ไม่เจอเลยสักคอมมิต) — แปลว่า showToast() เงียบทุกครั้งทั่วทั้งแอปมาตลอด ไม่ใช่แค่จุดนี้จุดเดียว
// แก้โดยเพิ่ม <div id="toast-message"><span id="toast-text"></span></div> ใน index.html
// และเพิ่มสไตล์เริ่มต้น (ซ่อนอยู่, position:fixed) ใน styles.css ที่เดิมมีแค่กติกาตอน .show อย่างเดียว
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const appSrc = fs.readFileSync(path.join(root, "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

console.log("== #toast-message / #toast-text ต้องมีอยู่จริงใน index.html ==");
ok(/<div\s+id="toast-message"/.test(html), "มี <div id=\"toast-message\"> ใน index.html");
ok(/id="toast-text"/.test(html), "มี id=\"toast-text\" อยู่ข้างในเป็นตัวแสดงข้อความ");
{
    const start = html.indexOf('id="toast-message"');
    const openTagEnd = html.indexOf(">", start);
    const closeIdx = html.indexOf("</div>", openTagEnd);
    const inner = html.slice(openTagEnd, closeIdx);
    ok(/id="toast-text"/.test(inner), "toast-text อยู่ข้างใน toast-message จริง (ไม่ใช่แค่มีอยู่ที่อื่นในหน้า)");
}

console.log("== styles.css ต้องมีสถานะเริ่มต้น (ซ่อนอยู่) ไม่ใช่แค่ตอน .show ==");
ok(/#toast-message\s*\{[^}]*opacity:\s*0/.test(css), "มีกติกาเริ่มต้นให้ opacity: 0 (ซ่อนอยู่ก่อนเรียก showToast)");
ok(/#toast-message\s*\{[^}]*position:\s*fixed/.test(css), "ตั้งตำแหน่งแบบ fixed ไว้แต่แรก ไม่ใช่ลอยอยู่กลางหน้าแทรกเนื้อหาอื่น");
ok(/#toast-message\.show\s*\{[^}]*opacity:\s*1/.test(css), "กติกา .show (ตอนแสดง) ยังอยู่ครบเหมือนเดิม ไม่ได้ถูกลบ");

console.log("== showToast() ยังหาสอง id นี้เหมือนเดิม (ไม่ต้องแก้ app.js) ==");
ok(/getElementById\("toast-message"\)/.test(appSrc) && /getElementById\("toast-text"\)/.test(appSrc), "showToast() อ้างอิง id เดียวกับที่เพิ่มใน index.html");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
