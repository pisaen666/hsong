// ทดสอบฟีเจอร์/บั๊กที่เกี่ยวกับ 2026-09-23 (คำแนะนำข้อ 2 และ 3 จากการตรวจสอบระบบสุ่มร้านค้า):
//   ข้อ 2: ให้แอดมินแก้ไขหมวดหมู่ร้านค้าได้เองจากหน้ารายชื่อร้านค้า (เผื่อร้านค้าเลือกผิด/ขายหลายอย่าง)
//   ข้อ 3: ปรับวิธีสุ่มให้เป็นมาตรฐานถูกต้อง (Fisher-Yates) แทน .sort(() => 0.5 - Math.random())
//
// บั๊กจริงที่พบระหว่างทำข้อ 2 (ไม่ใช่สิ่งที่ตั้งใจแก้แต่แรก): ALL_100_STALLS กับ MARKET_DATA เก็บคนละอ็อบเจกต์
// กันสำหรับ stallId เดียวกัน (ไม่ใช่ reference เดียวกัน) - ฟังก์ชันที่ทำ
// `ALL_100_STALLS.find(...) || MARKET_DATA.find(...)` แล้วแก้แค่ผลลัพธ์ตัวเดียวที่เจอ (เช่น toggleStallOpenStatusByAdmin
// เดิม) จะแก้เฉพาะ ALL_100_STALLS (เพราะเช็คก่อน) - อ็อบเจกต์ที่ตารางแอดมินใช้แสดงผลก็เป็นตัวนี้ ดูเหมือนกดสำเร็จ
// บนจอ แต่ saveMarketDataToStorage() อ่านค่าจาก MARKET_DATA (ซึ่งไม่ได้ถูกแก้) การเปลี่ยนแปลงเลยไม่ถูกบันทึกจริง
// พอโหลดหน้าใหม่/ซิงก์จากคลาวด์ค่าจะเด้งกลับที่เดิม - ตรวจแล้วพบว่า deleteStallByAdmin ไม่มีปัญหานี้ (ลบทั้งคู่แล้ว)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}

console.log("== ข้อ 2: แอดมินแก้ไขหมวดหมู่ร้านค้าเอง ==");
ok(src.includes("function adminUpdateStallCategory("), "พบฟังก์ชัน adminUpdateStallCategory");
ok(/window\.adminUpdateStallCategory = adminUpdateStallCategory/.test(src), "adminUpdateStallCategory ผูกกับ window แล้ว");
const catFnBody = fn("adminUpdateStallCategory");
ok(/if \(s1\) s1\.category = newCategory;/.test(catFnBody) && /if \(s2\) s2\.category = newCategory;/.test(catFnBody),
    "adminUpdateStallCategory แก้ทั้ง ALL_100_STALLS และ MARKET_DATA (ไม่ใช่แค่ตัวใดตัวหนึ่ง)");
ok(src.includes('onchange="adminUpdateStallCategory('), "มีช่องเลือกหมวดหมู่ในตารางรายชื่อร้านค้าฝั่งแอดมินจริง ๆ (ไม่ใช่แค่ในโค้ด JS)");
ok(/getMainCategories\(\)\.map/.test(src), "ช่องเลือกหมวดหมู่ในตารางแอดมินสร้างตัวเลือกจาก getMainCategories() (ชุดเดียวกับทั้งระบบ)");

console.log("== บั๊กที่พบระหว่างทำ: toggleStallOpenStatusByAdmin แก้ไม่ครบ 2 อาเรย์ ==");
const toggleFnBody = fn("toggleStallOpenStatusByAdmin");
ok(/if \(s1\) s1\.isClosed = newState;/.test(toggleFnBody) && /if \(s2\) s2\.isClosed = newState;/.test(toggleFnBody),
    "toggleStallOpenStatusByAdmin แก้ทั้ง ALL_100_STALLS และ MARKET_DATA แล้ว (เดิมแก้ได้แค่ตัวเดียว ไม่บันทึกจริง)");

console.log("== ตรวจว่า deleteStallByAdmin ไม่มีบั๊กแบบเดียวกัน (ลบทั้งคู่อยู่แล้ว) ==");
const deleteFnBody = fn("deleteStallByAdmin");
ok(/MARKET_DATA\[i\]\.stallId === stallId/.test(deleteFnBody) && /ALL_100_STALLS\[i\]\.stallId === stallId/.test(deleteFnBody),
    "deleteStallByAdmin ลบออกจากทั้ง MARKET_DATA และ ALL_100_STALLS (ไม่มีบั๊กเดียวกัน)");

console.log("== ข้อ 3: สุ่มแบบ Fisher-Yates แทน .sort(() => 0.5 - Math.random()) ==");
ok(src.includes("function shuffleArray("), "พบฟังก์ชัน shuffleArray (Fisher-Yates)");
// เช็คเฉพาะโค้ดจริง (ไม่นับบรรทัดคอมเมนต์ที่แค่พูดถึงวิธีเดิมเป็นตัวอย่าง)
const liveSortRandomLines = src.split("\n").filter(l => l.includes(".sort(() => 0.5 - Math.random())") && !l.trim().startsWith("//"));
ok(liveSortRandomLines.length === 0, "ไม่มีการสุ่มแบบ .sort(() => 0.5 - Math.random()) หลงเหลืออยู่ในโค้ดจริงแล้ว (วิธีนี้สุ่มไม่เท่าเทียมกันจริง)");
const selectRandomBody = fn("selectRandomStallBatch");
const shuffleCallCount = (selectRandomBody.match(/shuffleArray\(/g) || []).length;
ok(shuffleCallCount === 3, `selectRandomStallBatch เรียก shuffleArray ครบทั้ง 3 จุดที่เคยสุ่มแบบเดิม (เจอ ${shuffleCallCount})`);

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
