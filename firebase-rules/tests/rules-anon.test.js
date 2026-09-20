// ทดสอบกฎ v2 บน hsong-test ด้วยคำขอ "ไม่ล็อกอิน" (มุมมองคนแปลกหน้า/ผู้ไม่หวังดี) ผ่าน REST
// ห้ามชี้ไปโปรเจกต์จริง: host ถูกล็อกเป็น hsong-test เท่านั้น
//
// วิธีรัน (จากโฟลเดอร์โปรเจกต์; ต้องใส่ --project hsong-test ทุกครั้ง ห้ามพลาดไปโดนโปรเจกต์จริง):
//   1) เตรียมข้อมูลตั้งต้นสำหรับข้อ "แก้ของเดิม" (สิทธิ์แอดมินของ CLI ใช้ได้เฉพาะที่ test):
//        MSYS_NO_PATHCONV=1 firebase database:update / firebase-rules/tests/rules-anon.seed.json --project hsong-test --force
//      (คำสั่งนี้เขียนทับโหนด community_riders/merchant_applications/custom_market_stalls/stall_catalog_database ของ hsong-test ทั้งโหนด)
//   2) node firebase-rules/tests/rules-anon.test.js
//   3) ท้ายสคริปต์จะพิมพ์คำสั่งล้างข้อมูลที่รอบนี้สร้างไว้
const RUN = Date.now().toString(36).toUpperCase();   // รหัสใหม่ทุกรอบ ให้ข้อ "สร้าง" รันซ้ำได้
const BASE = "https://hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app";
if (!BASE.includes("hsong-test")) throw new Error("ต้องเป็น hsong-test เท่านั้น");

let pass = 0, fail = 0;
async function call(method, path, body) {
    const res = await fetch(BASE + "/" + path + ".json", {
        method,
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    let text = ""; try { text = await res.text(); } catch (e) { }
    return { status: res.status, text };
}
async function expect(name, wantAllowed, method, path, body) {
    const r = await call(method, path, body);
    const allowed = r.status === 200;
    const ok = allowed === wantAllowed;
    console.log((ok ? "PASS " : "FAIL ") + name + "  → HTTP " + r.status + (ok ? "" : "  (ต้องการ " + (wantAllowed ? "อนุญาต" : "ปฏิเสธ") + ") " + r.text.slice(0, 120)));
    ok ? pass++ : fail++;
}

(async () => {
    const T = "ZZ" + RUN;   // รหัสสำหรับข้อ "สร้างใหม่" (ไม่ซ้ำทุกรอบ)
    const SEED = "ZZSEED";   // รหัสของข้อมูลตั้งต้นที่มีอยู่แล้ว (ดู rules-anon.seed.json)
    const created = [];
    const riderApp = (id, status, extra) => Object.assign({ id, accessCode: id, fullName: "ทดสอบ", phone: "0800000000", status }, extra || {});

    console.log("== rider_applications ==");
    await expect("สร้างใบสมัคร pending ได้", true, "PUT", `rider_applications/${T}1`, riderApp(`${T}1`, "pending"));
    await expect("สร้างใบสมัครที่ status=approved ไม่ได้ (อนุมัติตัวเอง)", false, "PUT", `rider_applications/${T}2`, riderApp(`${T}2`, "approved"));
    await expect("สร้างโดย id ในข้อมูลไม่ตรงคีย์ ไม่ได้", false, "PUT", `rider_applications/${T}3`, riderApp("OTHER", "pending"));
    await expect("แก้ status เป็น approved ไม่ได้", false, "PUT", `rider_applications/${T}1`, riderApp(`${T}1`, "approved"));
    await expect("แก้ accessCode ไม่ได้", false, "PUT", `rider_applications/${T}1`, riderApp(`${T}1`, "pending", { accessCode: "HACKED" }));
    await expect("แก้ฟิลด์อื่น (โดย status/รหัสเดิม) ได้", true, "PUT", `rider_applications/${T}1`, riderApp(`${T}1`, "pending", { nickname: "แก้ได้" }));
    await expect("ลบใบสมัครไม่ได้", false, "DELETE", `rider_applications/${T}1`);
    await expect("เขียนทับทั้งก้อน (วิธีเก่า) ไม่ได้", false, "PUT", `rider_applications`, [riderApp(`${T}9`, "approved")]);
    await expect("อ่านได้", true, "GET", `rider_applications/${T}1`);

    console.log("== community_riders ==");
    await expect("สร้างไรเดอร์ใหม่เองไม่ได้", false, "PUT", `community_riders/${T}R1`, { id: `${T}R1`, name: "x", phone: "0811111111", accessCode: `${T}R1`, status: "available" });
    await expect("แก้ไรเดอร์เดิม: เปลี่ยนสถานะ/พิกัด ได้", true, "PUT", `community_riders/${SEED}R0`, { id: `${SEED}R0`, name: "เดิม", phone: "0822222222", accessCode: `${SEED}R0`, status: "busy", lat: 13.3 });
    await expect("แก้ accessCode ของไรเดอร์เดิมไม่ได้", false, "PUT", `community_riders/${SEED}R0`, { id: `${SEED}R0`, name: "เดิม", phone: "0822222222", accessCode: "STOLEN", status: "busy" });
    await expect("แก้ phone ของไรเดอร์เดิมไม่ได้", false, "PUT", `community_riders/${SEED}R0`, { id: `${SEED}R0`, name: "เดิม", phone: "0899999999", accessCode: `${SEED}R0`, status: "busy" });
    await expect("ลบไรเดอร์ไม่ได้", false, "DELETE", `community_riders/${SEED}R0`);

    console.log("== merchant_applications ==");
    const mApp = (id, status, extra) => Object.assign({ id, status, stallData: { stallId: id, stallName: "ทดสอบ", phone: "0833333333" } }, extra || {});
    await expect("สร้างใบสมัครแผงค้า pending ได้", true, "PUT", `merchant_applications/${T}M1`, mApp(`${T}M1`, "pending"));
    await expect("สร้างใบสมัครแผงค้า approved ไม่ได้", false, "PUT", `merchant_applications/${T}M2`, mApp(`${T}M2`, "approved"));
    await expect("สร้างพร้อม accessCode มาเองไม่ได้", false, "PUT", `merchant_applications/${T}M3`, mApp(`${T}M3`, "pending", { accessCode: "123456" }));
    await expect("แก้ status เป็น approved ไม่ได้", false, "PUT", `merchant_applications/${T}M1`, mApp(`${T}M1`, "approved"));
    await expect("แผงค้าอนุมัติแล้วแก้ข้อมูลร้านตัวเองได้ (status/รหัสเดิม)", true, "PUT", `merchant_applications/${SEED}M0`, mApp(`${SEED}M0`, "approved", { accessCode: "654321", stallData: { stallId: `${SEED}M0`, stallName: "ชื่อใหม่", phone: "0833333333" } }));
    await expect("แผงค้าอนุมัติแล้วเปลี่ยนรหัสตัวเองไม่ได้", false, "PUT", `merchant_applications/${SEED}M0`, mApp(`${SEED}M0`, "approved", { accessCode: "000000" }));
    await expect("ลบใบสมัครแผงค้าไม่ได้", false, "DELETE", `merchant_applications/${T}M1`);

    console.log("== custom_market_stalls / stall_catalog_database ==");
    await expect("สร้างแผงใหม่เองไม่ได้", false, "PUT", `custom_market_stalls/${T}S1`, { stallId: `${T}S1`, stallName: "x", accessCode: "111111" });
    await expect("แก้แผงเดิม (ปิดร้าน) ได้", true, "PUT", `custom_market_stalls/${SEED}S0`, { stallId: `${SEED}S0`, stallName: "เดิม", accessCode: "222222", isClosed: true });
    await expect("แก้ accessCode แผงเดิมไม่ได้", false, "PUT", `custom_market_stalls/${SEED}S0`, { stallId: `${SEED}S0`, stallName: "เดิม", accessCode: "999999" });
    await expect("ลบแผงไม่ได้", false, "DELETE", `custom_market_stalls/${SEED}S0`);
    await expect("สร้างแคตตาล็อกแผงใหม่ไม่ได้", false, "PUT", `stall_catalog_database/${T}S1`, [{ name: "หมู" }]);
    await expect("แก้แคตตาล็อกแผงเดิมได้", true, "PUT", `stall_catalog_database/${SEED}S0`, [{ name: "หมูสด", price: 120 }]);

    console.log("== daily_reports / open nodes / unknown ==");
    await expect("เขียน daily_reports ไม่ได้", false, "PUT", `daily_reports/${T}`, { x: 1 });
    await expect("อ่าน daily_reports ได้", true, "GET", `daily_reports/${T}`);
    await expect("ลูกค้าสร้างออเดอร์ได้ (ยังเปิด)", true, "PUT", `orders/${T}O1`, { orderId: `${T}O1`, status: "new" });
    await expect("ไรเดอร์อัปเดตพิกัดได้ (ยังเปิด)", true, "PUT", `rider_locations/${SEED}R0`, { lat: 13.3, lng: 101.1 });
    await expect("โหนดที่ไม่รู้จักเขียนไม่ได้", false, "PUT", `unknown_node/${T}`, { x: 1 });
    await expect("อ่านรากทั้งฐานข้อมูลไม่ได้", false, "GET", ``);
    await expect("อ่าน rider_private ไม่ได้ (เฉพาะเจ้าของ)", false, "GET", `rider_private`);
    await expect("สร้าง rider_private ใหม่ได้ (create-only)", true, "PUT", `rider_private/${T}P1`, { idCard: "1", savedAt: "2026-09-21" });
    await expect("เขียนทับ rider_private ที่มีอยู่ไม่ได้", false, "PUT", `rider_private/${T}P1`, { idCard: "2", savedAt: "x" });

    console.log(`\n${fail ? fail + " FAILED" : "ALL PASSED"} (${pass} pass, ${fail} fail)`);
    process.exit(fail ? 1 : 0);
})();
