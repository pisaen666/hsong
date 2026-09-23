// ทดสอบบั๊กที่พบ 2026-09-23 (เจ้าของกดปุ่ม "ล้างข้อมูลทดสอบ" ในหน้าจัดการไรเดอร์ แล้วข้อมูลไม่หายจากคลาวด์เลย
// แม้จะล็อกอินเป็นเจ้าของ/Super Admin อยู่ก็ตาม):
//   clearFleetTestData() และ cleanRiderDatabase() เคยเขียน db.ref("rider_applications").set([]) /
//   db.ref("community_riders").remove() (และอื่น ๆ) แบบ "ทั้งก้อนที่โหนดแม่" - แต่กฎ v2 (build-rules.js)
//   ใส่ .write ไว้เฉพาะระดับลูก $id/$riderId เท่านั้น (ไม่มี .write ที่ตัวโหนดแม่เอง) Firebase จะปฏิเสธ
//   การเขียน/ลบที่ตัวโหนดแม่เสมอไม่ว่าใครล็อกอินอยู่ก็ตาม เพราะกฎไม่ "มองลึก" ลงไปหาลูกเวลาตัวเขียนคือโหนดแม่
//   (เหมือนกับที่ syncKeyedToCloud/syncListToCloud เขียนทีละ id อยู่แล้ว - ดู CLAUDE.md 5c)
//   - แก้โดยเก็บรายชื่อ id ไว้ก่อนล้าง local แล้วลบทีละ id (db.ref("community_riders/"+id).remove()) แทน
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name, isAsync) {
    const start = src.indexOf((isAsync ? "async function " : "function ") + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}

const clearFleetTestDataBody = fn("clearFleetTestData");
const cleanRiderDatabaseBody = fn("cleanRiderDatabase", true);

// ห้ามมี set([]) หรือ .remove() แบบทั้งก้อนที่ rider_applications / community_riders / rider_documents / rider_private
// (โหนดที่กฎ v2 ล็อกไว้ระดับลูก $id/$riderId เท่านั้น) ในทั้ง 2 ฟังก์ชันนี้
const restrictedNodes = ["rider_applications", "community_riders", "rider_documents", "rider_private"];
[["clearFleetTestData", clearFleetTestDataBody], ["cleanRiderDatabase", cleanRiderDatabaseBody]].forEach(([name, body]) => {
    restrictedNodes.forEach(node => {
        const wholeNodeSet = new RegExp('db\\.ref\\("' + node + '"\\)\\.(set|remove)\\(').test(body);
        ok(!wholeNodeSet, `${name}: ไม่มีการ .set()/.remove() ทั้งก้อนที่โหนดแม่ "${node}" (ต้องลบทีละ id เท่านั้น)`);
    });
});

// ต้องมีการลบแบบทีละ id (เทมเพลตสตริง "node/" + id) แทน
ok(/db\.ref\("rider_applications\/" \+ id\)\.remove\(\)/.test(clearFleetTestDataBody), "clearFleetTestData: ลบใบสมัครทีละ id (rider_applications/<id>)");
ok(/db\.ref\("community_riders\/" \+ id\)\.remove\(\)/.test(clearFleetTestDataBody), "clearFleetTestData: ลบไรเดอร์ทีละ id (community_riders/<id>)");
ok(/requireOwnerAction\(\)/.test(clearFleetTestDataBody), "clearFleetTestData: มีด่านตรวจสิทธิ์เจ้าของ (requireOwnerAction)");

ok(/db\.ref\("rider_applications\/" \+ id\)\.remove\(\)/.test(cleanRiderDatabaseBody), "cleanRiderDatabase: ลบใบสมัครทีละ id (rider_applications/<id>)");
ok(/db\.ref\("community_riders\/" \+ id\)\.remove\(\)/.test(cleanRiderDatabaseBody), "cleanRiderDatabase: ลบไรเดอร์ทีละ id (community_riders/<id>)");
ok(/db\.ref\("rider_documents\/" \+ id\)\.remove\(\)/.test(cleanRiderDatabaseBody), "cleanRiderDatabase: ลบเอกสารทีละ id (rider_documents/<id>)");
ok(/db\.ref\("rider_private\/" \+ id\)\.remove\(\)/.test(cleanRiderDatabaseBody), "cleanRiderDatabase: ลบข้อมูลส่วนตัวทีละ id (rider_private/<id>)");

// โหนดที่เปิดกว้างอยู่แล้ว (.write:true ที่ตัวโหนดแม่เอง ตาม build-rules.js) ยังลบทั้งก้อนได้ตามปกติ ไม่ต้องแก้
["active_rider", "rider_locations", "rider_status", "riders"].forEach(node => {
    ok(new RegExp('db\\.ref\\("' + node + '"\\)\\.remove\\(\\)').test(cleanRiderDatabaseBody), `cleanRiderDatabase: โหนดเปิด "${node}" ยังลบทั้งก้อนได้ตามเดิม (ไม่ผิดกฎ)`);
});

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
