// ทดสอบงาน 2026-11-25: ไรเดอร์ถ่ายรูปส่งของ (ข้อ 5 ของ 8 เรื่องที่ตรวจไว้ 2026-11-18)
// เจ้าของตัดสินใจ: (1) บังคับถ่ายก่อนกด "ส่งมอบสำเร็จ" (2) ฮับ/เจ้าของเท่านั้นดูรูปได้ (3) เก็บตลอดไป
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const appSrc = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");
const htmlSrc = fs.readFileSync(path.join(root, "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

console.log("== กฎ v9 (delivery_photos) ==");
for (const name of ["hsong-test", "hsong-1f342"]) {
    const r = JSON.parse(fs.readFileSync(path.join(root, "firebase-rules", name + ".rules.v9.json"), "utf8")).rules;
    const v8 = JSON.parse(fs.readFileSync(path.join(root, "firebase-rules", name + ".rules.v8.json"), "utf8")).rules;
    const dp = r.delivery_photos;
    ok(dp && !/true/.test(String(dp[".read"])) && /auth\.uid ===/.test(dp[".read"]), name + ": delivery_photos อ่านได้เฉพาะเจ้าของ");
    ok(/!data\.exists\(\)/.test(dp.$oid[".write"]) && /assignedRiderId/.test(dp.$oid[".write"]), name + ": ไรเดอร์ที่รับงานนั้นสร้างได้ครั้งเดียว แก้/ลบทีหลังไม่ได้");
    ok(/photo.*deliveredAt/.test(dp.$oid[".validate"]), name + ": ต้องมีทั้งรูปและเวลาที่ส่ง");
    const copy = JSON.parse(JSON.stringify(r)); delete copy.delivery_photos;
    ok(JSON.stringify(copy) === JSON.stringify(v8), name + ": v9 = v8 + delivery_photos เท่านั้น");
}

console.log("== index.html: ช่องถ่ายรูปในหน้าไรเดอร์ + ปุ่มดูรูปในรายงานฮับ ==");
ok(/id="rider-delivery-photo-box"/.test(htmlSrc), "มีกล่องถ่ายรูปส่งของในหน้าไรเดอร์");
ok(/handleDeliveryPhotoUpload/.test(htmlSrc), "ช่องอัปโหลดรูปเรียก handleDeliveryPhotoUpload");

console.log("== ล้างโค้ด/UI เก่าที่ซ้ำซ้อนหรือตายแล้วเรื่องรูปถ่ายส่งของ (พบระหว่างทำงานนี้) ==");
ok(!/rider-proof-upload-modal/.test(htmlSrc), "ลบ modal 'ถ่ายรูปหลักฐานการจัดส่ง' ที่ไม่มีปุ่มไหนเปิดได้เลย (ตายอยู่ก่อนแล้ว)");
ok(!/confirmRiderDeliveryWithProof|openRiderProofModal|handleRiderProofFileUpload/.test(appSrc), "ลบฟังก์ชันของ modal ที่ตายแล้ว (มีบั๊กใส่รูป stock ปลอมถ้าไม่แนบรูปด้วย)");
ok(!/deliveryProofImage|rider-proof-btn-text|handleRiderDeliveryProofUpload/.test(appSrc + htmlSrc), "ลบปุ่มแนบรูปเดิมในหน้าสรุปหลังส่งของ (เก็บแค่ในเครื่องไรเดอร์เอง ไม่เคยส่งขึ้นคลาวด์ ฮับไม่เคยเห็น) ถูกแทนที่ด้วยระบบใหม่แล้ว");

console.log("== โค้ดต้นฉบับ: บังคับถ่ายรูปก่อนส่งมอบสำเร็จ ==");
const complete = fn("handleRiderCompleteDelivery");
ok(/if \(!state\.currentDeliveryPhoto\)/.test(complete), "เช็คว่ามีรูปแล้วหรือยังก่อนทำอย่างอื่น");
ok(/return;/.test(complete.slice(0, complete.indexOf("order.status = \"delivered\""))), "ไม่มีรูป -> หยุดทันที ไม่ไปต่อจนถึงขั้นเปลี่ยนสถานะ");
ok(/saveDeliveryPhotoToCloud/.test(complete), "บันทึกรูปขึ้นคลาวด์ตอนส่งมอบสำเร็จ");
ok(/db\.ref\(`delivery_photos\/\$\{.*\}`\)\.set/.test(fn("saveDeliveryPhotoToCloud")), "เก็บรูปแยกโหนด delivery_photos ไม่ปนกับ orders");
ok(!/db\.ref\(`orders/.test(fn("saveDeliveryPhotoToCloud")), "ไม่เขียนรูปลง orders/<k> โดยตรง (ลูกค้า/ไรเดอร์คนอื่นจะอ่านเจอ)");
ok(/_withTimeout\(db\.ref\(`delivery_photos/.test(fn("openDeliveryPhotoModal")), "โหลดรูปมีกันไทม์เอาต์ (เหมือนจุดอื่นที่อ่านฐานข้อมูลทั้งหมด) ไม่ค้างตลอดไปถ้าเน็ตมีปัญหา");

// ---- สภาพแวดล้อมจำลอง (ไม่มีอินเทอร์เน็ต ไม่มีฐานข้อมูลจริง) ----
const toasts = [];
const writes = [];
const ctx = {
    console, Math, Number, String, JSON, Object, Array, Date,
    state: { currentDeliveryPhoto: null, activeOrder: null, activeRider: null },
    window: {},
    document: { getElementById: () => null },
    showToast: t => toasts.push(t),
    isFirebaseReady: () => true,
    toFirebaseKey: s => String(s).replace(/[.#$/[\]]/g, "_"),
    db: { ref: p => ({ set: d => { writes.push({ path: p, data: d }); return Promise.resolve(); } }) }
};
vm.createContext(ctx);
["saveDeliveryPhotoToCloud"].forEach(n => vm.runInContext(fn(n), ctx));
const C = ctx;

console.log("== บันทึกรูปขึ้นคลาวด์ ==");
{
    C.saveDeliveryPhotoToCloud("#TH-3001", "data:image/jpeg;base64,xxx");
    const w = writes.find(x => x.path === "delivery_photos/_TH-3001");
    ok(!!w && w.data.photo === "data:image/jpeg;base64,xxx" && typeof w.data.deliveredAt === "number", "เขียน {photo, deliveredAt} ไปที่ delivery_photos/<รหัสออเดอร์>");
}

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
