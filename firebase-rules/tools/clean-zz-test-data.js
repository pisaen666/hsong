// ลบข้อมูลทดสอบที่ขึ้นต้นด้วย "ZZ" ออกจาก hsong-test (ชุดทดสอบ rules-anon / rules-v*-live สร้างไว้)
//   node firebase-rules/tools/clean-zz-test-data.js
// ใช้สิทธิ์แอดมินของ Firebase CLI กับ --project hsong-test เท่านั้น (ล็อกไว้ในโค้ด ห้ามแก้เป็นโปรเจกต์จริง)
// หมายเหตุ: ถ้าเจ้าของเปิดเว็บทดสอบค้างไว้และล็อกอินเจ้าของ เบราว์เซอร์อาจส่งข้อมูล ZZ เก่ากลับขึ้นมา
//   ให้ล้างข้อมูลเว็บทดสอบใน Chrome ก่อน (Site settings > Delete data) แล้วค่อยรันสคริปต์นี้
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PROJECT = "hsong-test";
const NODES = ["orders", "order_codes", "order_viewers", "carts", "staff_keys/rider", "staff_keys/merchant", "staff_sessions", "rider_jobs", "stall_orders",
    "rider_applications", "merchant_applications", "community_riders", "custom_market_stalls", "stall_catalog_database",
    "rider_private", "rider_documents", "daily_reports", "riders", "rider_status", "rider_locations", "active_rider", "rider_public"];
// rider_phone_status ใช้ค่าแฮชของเบอร์เป็นชื่อ (ไม่ขึ้นต้นด้วย ZZ) — ลบเองโดยคำนวณค่าแฮชของเบอร์ทดสอบ
const run = args => execSync("firebase " + args + " --project " + PROJECT, { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, MSYS_NO_PATHCONV: "1" } }).toString();

const updates = {};
for (const n of NODES) {
    let keys = {};
    try { keys = JSON.parse(run("database:get /" + n + " --shallow")) || {}; } catch (e) { keys = {}; }
    if (keys && typeof keys === "object") Object.keys(keys).filter(k => /^_?ZZ/.test(k)).forEach(k => { updates[n + "/" + k] = null; });
}
const count = Object.keys(updates).length;
if (!count) { console.log("ไม่มีข้อมูล ZZ ใน hsong-test"); process.exit(0); }
const f = path.join(os.tmpdir(), "zz-clean-" + Date.now() + ".json");
fs.writeFileSync(f, JSON.stringify(updates));
try { run("database:update / \"" + f + "\" --force"); } finally { fs.unlinkSync(f); }
console.log("ลบข้อมูล ZZ ออกจาก hsong-test แล้ว " + count + " รายการ");
