// ทดสอบ "ซ่อนข้อมูลส่วนตัวร้านค้า" (กฎ v6, 2026-09-25) แบบไม่ต่อเน็ต
//   เจ้าของเลือก: เบอร์หลักเห็นได้เฉพาะไรเดอร์ที่ล็อกอินแล้ว, การ์ดร้านแสดงรูปเจ้าของ + ชื่อเล่น
//   กรณีจริงกับฐานข้อมูล hsong-test อยู่ใน rules-v6-live.test.js
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const build = fs.readFileSync(path.join(__dirname, "..", "build-rules.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const m = new RegExp("(async )?function " + name + "\\(").exec(src);
    if (!m) throw new Error("not found: " + name);
    let i = src.indexOf("{", m.index), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(m.index, i + 1);
}

console.log("== กฎ v6");
for (const proj of ["hsong-test", "hsong-1f342"]) {
    const r = JSON.parse(fs.readFileSync(path.join(__dirname, "..", proj + ".rules.v7.json"), "utf8")).rules;
    ok(r.merchant_applications[".read"] !== true && /auth\.uid ===/.test(r.merchant_applications[".read"]), proj + ": ใบสมัครร้านอ่านได้เฉพาะเจ้าของ");
    ok(/'merchant'/.test(r.merchant_applications.$id[".read"]), proj + ": ร้านอ่านใบสมัครของตัวเองได้หลังล็อกอิน");
    ok(/'merchant'/.test(r.merchant_applications.$id[".write"]) && !/\|\| \(data\.exists\(\) && newData\.exists\(\) && newData\.child\('status'\)/.test(r.merchant_applications.$id[".write"]), proj + ": แก้ใบสมัครเดิมได้เฉพาะร้านนั้นเอง (คนทั่วไปไม่ได้แล้ว)");
    ok(r.custom_market_stalls[".read"] === true, proj + ": หน้าร้านยังเปิดอ่าน (ลูกค้าต้องเห็น)");
    ["bankAccountNo", "phone", "lineId", "ownerName", "loginHash", "loginSalt", "contacts"].forEach(f =>
        ok(r.custom_market_stalls.$id[".validate"].includes("!newData.child('" + f + "').exists()"), proj + ": หน้าร้านห้ามมี " + f));
    ok(/'merchant'/.test(r.custom_market_stalls.$id[".write"]) && /\$id ===/.test(r.custom_market_stalls.$id[".write"]), proj + ": แก้หน้าร้านได้เฉพาะเจ้าของ + ร้านนั้นเอง");
    ok(/\$id ===/.test(r.stall_catalog_database.$id[".write"]), proj + ": แก้สินค้า/ราคาได้เฉพาะเจ้าของ + ร้านนั้นเอง");
    ok(/'rider'/.test(r.stall_contacts.$id[".read"]) && r.stall_contacts[".read"] !== true, proj + ": เบอร์ร้านอ่านได้เฉพาะเจ้าของ/ไรเดอร์ที่ล็อกอิน/ร้านนั้น");
    ok(r.merchant_public.$code[".read"] === true && r.merchant_public.$code.$other[".validate"] === false, proj + ": ข้อมูลล็อกอินร้านเปิดอ่านทีละร้าน รับเฉพาะ status/salt");
    ok(/\$h\.length === 64/.test(r.merchant_phone_status.$h[".validate"]), proj + ": เช็กสถานะร้านด้วยค่าแฮชเบอร์");
    ok(r.rider_public && r.rider_jobs && r.orders, proj + ": กฎรุ่นก่อน (ไรเดอร์ ออเดอร์) ยังอยู่ครบ");
}

console.log("== รายการช่องส่วนตัวในโค้ดตรงกับในกฎ");
const appList = JSON.parse(src.match(/const STALL_PRIVATE_FIELDS = (\[[^\]]*\]);/)[1]);
const ruleList = JSON.parse(build.match(/const STALL_PRIVATE_FIELDS = (\[[^\]]*\]);/)[1].replace(/\s+/g, " "));
ok(JSON.stringify(appList) === JSON.stringify(ruleList), "STALL_PRIVATE_FIELDS ใน app.js = ใน build-rules.js");

console.log("== ตัดข้อมูลส่วนตัวออกจากหน้าร้าน (sanitizeStallForPublic)");
const ctx = {};
vm.createContext(ctx);
vm.runInContext("const STALL_PRIVATE_FIELDS = " + JSON.stringify(appList) + ";\n" + fn("sanitizeStallForPublic") + "\n" + fn("stallOwnerDisplayName"), ctx);
const full = { stallId: "APP-SHOP-1", stallName: "ร้านผัก", ownerName: "สมศรี ใจดี", owner1Nickname: "ป้าศรี", phone: "0811111111", bankAccountNo: "123", contacts: [{ phone: "081" }], lineId: "x", loginHash: "h", loginSalt: "s", ownerImage: "img", catalog: [1], stallTag: "ร้านผัก สมศรี ใจดี ผักสด" };
const pub = ctx.sanitizeStallForPublic(full);
ok(!pub.phone && !pub.bankAccountNo && !pub.contacts && !pub.lineId && !pub.loginHash && !pub.ownerName, "ตัดเบอร์ บัญชี LINE ชื่อจริง ค่ารหัสผ่าน");
ok(pub.stallName === "ร้านผัก" && pub.ownerImage === "img" && pub.owner1Nickname === "ป้าศรี" && pub.catalog.length === 1, "เก็บชื่อร้าน รูปเจ้าของ ชื่อเล่น สินค้า");
ok(!pub.stallTag.includes("สมศรี ใจดี") && pub.stallTag.includes("ผักสด"), "คำค้นหาร้านไม่มีชื่อจริงแล้ว");
ok(full.phone === "0811111111", "ไม่แก้ข้อมูลตัวจริงในเครื่อง (คืนสำเนาใหม่)");
ok(ctx.stallOwnerDisplayName(full) === "ป้าศรี" && ctx.stallOwnerDisplayName({ ownerName: "ชื่อจริง" }) === "เจ้าของแผงค้า", "ชื่อที่ลูกค้าเห็น = ชื่อเล่นเท่านั้น");

console.log("== การเชื่อมต่อในโค้ด");
ok(/custom_market_stalls: sanitizeStallForPublic/.test(src), "ทุกการบันทึกหน้าร้านขึ้นคลาวด์ผ่านตัวตัดข้อมูลส่วนตัว");
ok(/_merchantLoginViaServer\(code, secret\)/.test(fn("merchantSecretLogin")), "ล็อกอินร้านให้ฐานข้อมูลตรวจรหัสก่อน");
ok(/merchant_public\//.test(fn("_merchantLoginViaServer")) && /staff_sessions\//.test(fn("_merchantLoginViaServer")) && !/loginHash/.test(fn("_merchantLoginViaServer")), "ตรวจรหัสร้านด้วย merchant_public + staff_sessions ไม่ใช้ค่ารหัสผ่าน");
ok(/res\.sessionOpened/.test(fn("handleMerchantCodeLoginSubmit")), "ไม่ขอสิทธิ์ซ้ำเมื่อฐานข้อมูลเปิดให้แล้ว");
ok(/if \(!isOwnerSignedIn\(\)\) return;/.test(fn("initMerchantRealtimeSync")) && /publishAllMerchantPublic\(\)/.test(fn("initMerchantRealtimeSync")), "ผู้เข้าชมไม่ดึงใบสมัครร้าน; เจ้าของเผยแพร่ข้อมูลขั้นต่ำ");
ok(/sanitizePublicStallsInCloud\(\)/.test(fn("refreshOrderAccess")) && /loadMyMerchantApplication\(myMerchantStaffId\(\)\)/.test(fn("refreshOrderAccess")), "เจ้าของล้างข้อมูลเก่า; ร้านโหลดข้อมูลเต็มของตัวเอง");
ok(/talathub_merchant_applications/.test(fn("purgeRiderListCachesForVisitors")) && /sanitizeStallForPublic/.test(fn("purgeRiderListCachesForVisitors")), "ผู้เข้าชม: ลบ/ตัดข้อมูลร้านที่เคยเก็บในเครื่อง");
ok(/createMerchantPublicPending/.test(fn("saveMerchantApplications")) && /removeMerchantPublic\(appToDelete\)/.test(fn("deleteMerchantApplication")), "ผู้สมัครบันทึกสถานะรออนุมัติ; ลบใบสมัครลบข้อมูลสาธารณะด้วย");
ok(/merchant_phone_status/.test(fn("handleCheckApplicationStatusSubmit")), "เช็กสถานะร้านด้วยเบอร์: ค้นด้วยค่าแฮช");
ok(/stallOwnerDisplayName\(stall\)/.test(fn("renderCatalog")) && /stallOwnerDisplayName\(stall\)/.test(fn("openStallCatalogModal")), "การ์ดร้านและหน้าร้านแสดงชื่อเล่น");
ok(!/081-234-5678/.test(fn("renderCatalog")), "การ์ดร้านไม่มีเบอร์สมมติ/เบอร์ร้านแล้ว");
ok(/fetchStallContactPhone\(origin\.stallId\)/.test(fn("callMerchantFromRiderUI")), "ไรเดอร์ดึงเบอร์ร้านจาก stall_contacts เมื่อออเดอร์ไม่มีเบอร์");
ok(!/081-444-5555/.test(src), "ไม่มีเบอร์ร้านสมมติ 081-444-5555 แล้ว");
ok(/saveMyStallContact\(stallObj\)/.test(fn("saveMerchantStallData")), "ร้านแก้ข้อมูล -> เบอร์หลักที่ไรเดอร์เห็นอัปเดตตาม");

console.log("== ป้ายร้านในผังแผง / หัวตาราง (เจ้าของขอแก้ 2026-09-25)");
vm.runInContext(fn("stallShortLabel"), ctx);
ok(ctx.stallShortLabel({ stallNumber: "-", stallName: "ร้าน ส.ไก่สด" }) === "ร้าน ส.ไก่สด", "เลขแผงเป็น \"-\" -> แสดงชื่อร้านแทน");
ok(ctx.stallShortLabel({ stallNumber: "A-04", stallName: "x" }) === "A-04", "ร้านที่ยังมีเลขแผงจริง -> แสดงเลขแผง");
ok(ctx.stallShortLabel({ stallName: "ร้านผักสดป้าแดงตลาดเช้า" }).length <= 14, "ชื่อยาวถูกย่อ");
const adminStalls = fn("renderAdminStalls");
ok(!adminStalls.includes("รหัสผ่าน 6 หลัก") && adminStalls.includes("รหัสร้าน / รหัสผ่าน"), "หัวคอลัมน์เปลี่ยนเป็น รหัสร้าน / รหัสผ่าน");
ok(!/<th class="p-3">เลขแผง<\/th>/.test(adminStalls), "ตารางร้านไม่มีคอลัมน์เลขแผงแล้ว");
ok(/stallShortLabel\(s\)/.test(src), "ผังแผงของฮับใช้ป้ายชื่อร้าน");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
