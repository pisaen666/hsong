// ทดสอบคู่มือร้านค้า (guide-merchant.html, คำขอเจ้าของ 2026-09-24): คู่มือต้องตรงกับหน้าจอจริงเสมอ
// - ชื่อปุ่มทุกอันที่คู่มือบอกให้กด (<span class="btn-name">) ต้องยังมีอยู่จริงใน index.html หรือ app.js
// - รูปทุกรูปต้องมีไฟล์อยู่จริง, ลิงก์ในแอปต้องชี้ไปหัวข้อที่มีอยู่ในคู่มือ และเปิดแท็บใหม่ (ข้อมูลที่กรอกไว้ไม่หาย)
// - ตัวเลขกติกาที่คู่มือบอก (GP 10%, สินค้าเด่น 10 / เพิ่มได้ 50, รหัส 8 ตัว, ล็อก 5 ครั้ง/5 นาที) ต้องตรงกับโค้ด
// - ยอดเงินของร้านต้องคิดราคา x จำนวน ที่เดียวกันทั้งการ์ดออเดอร์ สลิป และหน้าสรุปยอด (บั๊กที่เจอตอนทำคู่มือ)
// ถ้าเทสต์นี้พัง แปลว่าแก้หน้าจอแล้วลืมแก้คู่มือ ให้แก้คู่มือ (และถ่ายรูปใหม่ถ้าหน้าตาเปลี่ยน)
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const htmlSrc = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));
const guide = norm(fs.readFileSync(path.join(root, "guide-merchant.html"), "utf8"));
const flat = s => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const screenText = flat(htmlSrc) + " " + appSrc.replace(/\s+/g, " ");   // app.js ดิบ (ตัดแท็กแล้วข้อความหาย เพราะมีเครื่องหมาย < > ในโค้ด)
const unesc = s => s.replace(/&amp;/g, "&");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

console.log("== ชื่อปุ่มในคู่มือต้องมีอยู่จริงบนหน้าจอ ==");
const btnNames = [...guide.matchAll(/<span class="btn-name">([^<]+)<\/span>/g)].map(m => unesc(m[1].trim()));
ok(btnNames.length >= 20, `คู่มืออ้างชื่อปุ่ม ${btnNames.length} อัน`);
[...new Set(btnNames)].forEach(b => ok(screenText.includes(b), `ปุ่ม "${b}" มีอยู่จริง`));

console.log("== ข้อความที่คู่มือยกมา ต้องตรงกับข้อความจริงในโค้ด ==");
[
    "กรุณากรอกข้อมูลสำคัญให้ครบถ้วน: ชื่อร้านค้า และเบอร์โทรศัพท์ผู้ติดต่อ",
    "ซ้ำกับสินค้า Highlight",
    "กรุณากรอกเลขที่บัญชีรับเงิน (บัญชีหลักที่ 1)",
    "เลขที่บัญชีธนาคารต้องเป็นตัวเลข 10-15 หลัก",
    "เลขพร้อมเพย์ต้องเป็นเบอร์มือถือ 10 หลัก หรือเลขบัตรประชาชน 13 หลัก",
    "กรุณากรอกชื่อบัญชี",
    "รหัสร้านหรือรหัสผ่านไม่ถูกต้อง",
    "ใส่รหัสผิดหลายครั้ง กรุณารออีก",
    "ใบสมัครเปิดร้านของคุณยังรอเจ้าของอนุมัติ",
    "ร้านนี้ยังไม่มีรหัสผ่านเข้าระบบ",
    "ใบสมัครนี้ไม่ผ่านการอนุมัติ",
    "ส่งใบสมัครลงทะเบียนเปิดร้านสำเร็จ!",
    "ร้านค้าเข้าสู่ระบบ",
    "เปิดรับออเดอร์ปกติ",
    "พักรับออเดอร์ชั่วคราว",
    "ยังไม่มีออเดอร์ของสดสั่งซื้อเข้ามาในขณะนี้",
    "กำลังบันทึกข้อมูลออนไลน์",
    "หักค่าบริการฮับ (GP",
    "ยอดเงินโอนสุทธิเข้าบัญชี",
    "อัปโหลดรูปที่ 1 แล้ว",
    "รายการสินค้าที่ต้องจัดเตรียม",
    "กดเปิดแผนที่เพื่อปักหมุดจุดส่งของ"
].forEach(t => ok(guide.includes(t) && screenText.includes(t), `ข้อความ "${t}" อยู่ทั้งในคู่มือและในโค้ด`));

console.log("== รูปทุกรูปต้องมีไฟล์จริง ==");
const imgs = [...guide.matchAll(/<img src="([^"]+)"/g)].map(m => m[1]);
ok(imgs.length >= 15, `คู่มือมีรูป ${imgs.length} รูป`);
imgs.forEach(src => ok(fs.existsSync(path.join(root, src)), `มีไฟล์ ${src}`));
ok(/guide\.css/.test(guide) && fs.existsSync(path.join(root, "guide.css")), "มีไฟล์ guide.css");
ok(!/<script/i.test(guide), "คู่มือไม่มี <script> (หน้าเอกสารล้วน ไม่เชื่อมฐานข้อมูล)");

console.log("== ลิงก์จากแอปไปคู่มือ ==");
const anchors = new Set([...guide.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
["merchant-guide-link-register", "merchant-guide-link-success", "merchant-guide-link-login", "merchant-guide-link-workspace"].forEach(id => {
    const m = htmlSrc.match(new RegExp(`<a href="guide-merchant\\.html#([a-z0-9-]+)" target="_blank" rel="noopener" id="${id}"`));
    ok(!!m, `index.html มีลิงก์ ${id} เปิดแท็บใหม่`);
    if (m) ok(anchors.has(m[1]), `ลิงก์ ${id} ชี้ไปหัวข้อ #${m[1]} ที่มีอยู่จริง`);
});
ok(/"guide-merchant\.html"/.test(fs.readFileSync(path.join(root, "firebase-rules", "tools", "build-test-site.js"), "utf8")), "build-test-site.js ใส่ guide-merchant.html ไปเว็บทดสอบด้วย");

console.log("== ตัวเลขกติกาในคู่มือตรงกับโค้ด ==");
ok(/const HIGHLIGHT_COUNT = 10;/.test(appSrc) && guide.includes("สูงสุด 10 อย่าง"), "สินค้าเด่นสูงสุด 10 อย่าง ตรงกัน");
ok(screenText.includes("เพิ่มสินค้าอื่นๆ ได้สูงสุด 50 รายการ") && guide.includes("สูงสุด 50 อย่าง"), "สินค้าเพิ่มเติมสูงสุด 50 อย่าง ตรงกัน");
ok(/const RIDER_SECRET_LENGTH = 8;/.test(appSrc) && guide.includes("รหัสผ่าน 8 ตัว"), "รหัสผ่าน 8 ตัว ตรงกัน");
ok(/riderLoginLockedMs\(_MERCHANT_LOGIN_FAIL_KEY\)/.test(appSrc) && /ผิด 5 ครั้งภายใน 10 นาที ล็อก 5 นาที/.test(appSrc) && guide.includes("ผิดครบ 5 ครั้ง ระบบจะล็อกไว้ 5 นาที"), "กติกาล็อก 5 ครั้ง / 5 นาที ใช้กับร้านค้าด้วย");
const alphabet = appSrc.match(/const RIDER_SECRET_ALPHABET = "([A-Z0-9]+)"/)[1];
ok(!/[01OIL]/.test(alphabet) && guide.includes("ไม่มีตัว O I L และไม่มีเลข 0 1"), "คู่มือบอกถูกว่ารหัสไม่มี O I L 0 1");
ok(guide.includes("GP 10%") && guide.includes("ขายได้ 90 บาท หัก 9 บาท"), "ตัวอย่าง GP 10% ในคู่มือคำนวณถูก");
ok(htmlSrc.includes("<span>รับรหัสผ่าน 8 ตัว</span>") && !htmlSrc.includes("รับรหัส 6 หลัก"), "หน้าส่งใบสมัครสำเร็จไม่พูดถึงรหัส 6 หลักแบบเก่าแล้ว");

console.log("== ยอดเงินร้าน = ราคา x จำนวน ที่เดียวกันทุกจุด ==");
const fnStart = appSrc.indexOf("function merchantStallItemsTotal(");
ok(fnStart >= 0, "มีฟังก์ชัน merchantStallItemsTotal");
let i = appSrc.indexOf("{", fnStart), d = 0;
for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
const ctx = {}; vm.createContext(ctx);
{   // merchantStallItemsTotal ใช้ orderItemLineTotal (ราคา x จำนวน / น้ำหนักที่ชั่ง) ต้องโหลดคู่กัน
    vm.runInContext(appSrc.match(/const WEIGHT_UNITS = \[[^\]]*\];/)[0].replace("const ", "var "), ctx);
    ["orderItemUnitPrice", "orderItemOrderedQty", "orderItemUnit", "isWeighedOrderItem", "orderItemWeighedQty", "orderItemBilledQty", "orderItemLineTotal"].forEach(name => {
        const s2 = appSrc.indexOf("function " + name + "(");
        let j = appSrc.indexOf("{", s2), d2 = 0;
        for (; j < appSrc.length; j++) { if (appSrc[j] === "{") d2++; else if (appSrc[j] === "}" && --d2 === 0) break; }
        vm.runInContext(appSrc.slice(s2, j + 1), ctx);
    });
}
vm.runInContext(appSrc.slice(fnStart, i + 1), ctx);
const total = ctx.merchantStallItemsTotal;
ok(total([{ price: 20, qty: 2 }, { price: 25, qty: 1 }, { price: 25, qty: 1 }]) === 90, "ผักบุ้ง 20x2 + 25 + 25 = 90");
ok(total([{ price: 20, qty: 2 }, { price: 25, qty: 1, outOfStock: true }]) === 40, "ของที่แจ้งหมดไม่นับเงิน");
ok(total([{ price: 30, actualPrice: 35, qty: 1 }]) === 35, "ใช้ราคาชั่งจริง (actualPrice) ถ้ามี");
ok(total(undefined) === 0 && total([null]) === 0, "ข้อมูลว่างไม่พัง");
const uses = (appSrc.match(/merchantStallItemsTotal\(/g) || []).length;
ok(uses >= 4, `ใช้ฟังก์ชันเดียวกันครบ 3 จุด + ประกาศ (${uses})`);
ok(!/stallTotal: matchingStallGroup\.items\.reduce\(\(sum, it\) => sum \+ \(it\.price \|\| 0\), 0\)/.test(appSrc), "การ์ดออเดอร์ไม่รวมแค่ราคาต่อหน่วยแบบเดิมแล้ว");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
