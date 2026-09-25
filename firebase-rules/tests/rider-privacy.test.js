// ทดสอบ "ซ่อนข้อมูลส่วนตัวไรเดอร์" (กฎ v5, 2026-09-25) แบบไม่ต่อเน็ต
//   - กฎ: รายชื่อไรเดอร์/ใบสมัครอ่านได้เฉพาะเจ้าของ, ข้อมูลสาธารณะมีแค่สถานะ+salt, โหนดเก่า 4 โหนดปิด
//   - ล็อกอินไรเดอร์ให้ฐานข้อมูลตรวจรหัส (ไม่ใช้แฮชจากรายชื่อที่เคยเปิด)
//   - ผู้เข้าชมไม่ดึง/ไม่เก็บรายชื่อไรเดอร์ในเครื่อง
//   กรณีจริงกับฐานข้อมูล hsong-test อยู่ใน rules-v5-live.test.js
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const m = new RegExp("(async )?function " + name + "\\(").exec(src);
    if (!m) throw new Error("not found: " + name);
    let i = src.indexOf("{", m.index), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(m.index, i + 1);
}

console.log("== กฎ v5");
for (const proj of ["hsong-test", "hsong-1f342"]) {
    const r = JSON.parse(fs.readFileSync(path.join(__dirname, "..", proj + ".rules.v5.json"), "utf8")).rules;
    ok(r.community_riders[".read"] !== true && /auth\.uid ===/.test(r.community_riders[".read"]), proj + ": รายชื่อไรเดอร์อ่านได้เฉพาะเจ้าของ");
    ok(/'rider'/.test(r.community_riders.$id[".read"]) && /accessCode/.test(r.community_riders.$id[".read"]), proj + ": ไรเดอร์อ่านได้เฉพาะของตัวเอง");
    ok(r.rider_applications[".read"] !== true && /auth\.uid ===/.test(r.rider_applications[".read"]), proj + ": ใบสมัครอ่านได้เฉพาะเจ้าของ");
    ok(r.rider_public.$code[".read"] === true && r.rider_public[".read"] !== true, proj + ": ข้อมูลสาธารณะอ่านทีละเลขได้ ดูรายการทั้งหมดไม่ได้");
    ok(r.rider_public.$code.$other[".validate"] === false && !r.rider_public.$code.phone && !r.rider_public.$code.loginHash && !r.rider_public.$code.name, proj + ": ข้อมูลสาธารณะรับเฉพาะ status/loginSalt/profileKey");
    ok(/!newData\.child\('loginSalt'\)\.exists\(\)/.test(r.rider_public.$code[".write"]), proj + ": คนทั่วไปสร้างได้แค่ pending ที่ไม่มี salt");
    ok(/\$h\.length === 64/.test(r.rider_phone_status.$h[".validate"]), proj + ": เช็กสถานะด้วยเบอร์ต้องใช้ค่าแฮช 64 ตัว");
    ["riders", "rider_status", "rider_locations", "active_rider"].forEach(n =>
        ok(r[n][".read"] !== true && r[n][".write"] !== true, proj + ": ปิดโหนดเก่า " + n));
    ok(r.orders && r.rider_jobs && r.stall_orders && r.staff_sessions, proj + ": กฎ v4 (ออเดอร์/ใบงาน) ยังอยู่ครบ");
}

console.log("== ข้อมูลสาธารณะของไรเดอร์ (buildRiderPublic)");
const ctx = { _keyOfCommunityRider: r => r && (r.id || r.riderId || r.accessCode), _cloudSafeKey: k => String(k).replace(/[.#$\/\[\]]/g, "_") };
vm.createContext(ctx);
vm.runInContext(fn("buildRiderPublic"), ctx);
const app = { id: "RD1234", accessCode: "RD1234", status: "approved", phone: "081-111-2222", promptPayNumber: "1234567890123", lineId: "me", loginSalt: "aa", loginHash: "bb" };
const pub = ctx.buildRiderPublic(app, [{ id: "RIDER-9", accessCode: "RD1234", phone: "0811112222", loginSalt: "cc", loginHash: "dd" }]);
ok(pub.status === "approved" && pub.loginSalt === "cc" && pub.profileKey === "RIDER-9", "อนุมัติแล้ว: มีสถานะ + salt ของรายชื่อไรเดอร์ + ที่อยู่ข้อมูลของตัวเอง");
ok(Object.keys(pub).every(k => ["status", "loginSalt", "profileKey"].includes(k)), "ไม่มีเบอร์ พร้อมเพย์ LINE หรือแฮชรหัสผ่าน");
const pend = ctx.buildRiderPublic({ id: "RD5555", status: "pending", phone: "0800000000" }, []);
ok(JSON.stringify(pend) === JSON.stringify({ status: "pending" }), "รออนุมัติ: มีแค่สถานะ");

console.log("== ล็อกอินและการเก็บข้อมูลในเครื่อง");
const login = fn("riderSecretLogin");
ok(/_riderLoginViaServer\(number, secret\)/.test(login), "ล็อกอินไรเดอร์ลองให้ฐานข้อมูลตรวจรหัสก่อน");
const server = fn("_riderLoginViaServer");
ok(/rider_public\//.test(server) && /staff_sessions\//.test(server) && !/loginHash/.test(server), "ตรวจรหัสด้วย rider_public + staff_sessions ไม่ใช้แฮชรหัสผ่าน");
ok(/_noteRiderLoginFail\(\)/.test(server), "รหัสผิดยังนับครั้งเพื่อล็อกชั่วคราว");
ok(/community_riders\/\$\{pub\.profileKey\}/.test(server), "ล็อกอินแล้วอ่านข้อมูลของตัวเองเท่านั้น");
ok(/res\.sessionOpened/.test(fn("submitRiderSecretLogin")), "ไม่ขอสิทธิ์ซ้ำเมื่อฐานข้อมูลเปิดสิทธิ์ให้ตอนล็อกอินแล้ว");
ok(!/loadCommunityRiders/.test(fn("loadSavedRider")), "เปิดเว็บใหม่: ไม่เตะไรเดอร์ออกเพราะเครื่องไม่มีรายชื่อ");
ok(/if \(!isOwnerSignedIn\(\)\) return;/.test(fn("initRiderRealtimeSync")), "ผู้เข้าชมไม่ดึงรายชื่อไรเดอร์/ใบสมัคร");
ok(/purgeRiderListCachesForVisitors\(\)/.test(fn("refreshOrderAccess")) && /talathub_community_riders/.test(fn("purgeRiderListCachesForVisitors")), "ผู้เข้าชม: ลบรายชื่อไรเดอร์ที่เคยเก็บไว้ในเครื่อง");
ok(/publishAllRiderPublic\(\)/.test(fn("initRiderRealtimeSync")), "เจ้าของ: อัปเดตข้อมูลสาธารณะทุกครั้งที่รายชื่อเปลี่ยน");
ok(/createRiderPublicPending/.test(fn("saveRiderApplications")), "ผู้สมัคร: บันทึกสถานะรออนุมัติของตัวเอง");
ok(/removeRiderPublic\(appToDelete\)/.test(fn("deleteRiderApplication")), "ลบใบสมัคร: ลบข้อมูลสาธารณะด้วย");
ok(/rider_phone_status/.test(fn("handleCheckApplicationStatusSubmit")) && /riderPhoneKey/.test(fn("handleCheckApplicationStatusSubmit")), "เช็กสถานะด้วยเบอร์: ค้นด้วยค่าแฮช");
ok(/setMyRiderStatus\("on_delivery"\)/.test(fn("handleRiderStartDelivery")) && /setMyRiderStatus\("available"\)/.test(fn("handleRiderCompleteDelivery")), "ไรเดอร์อัปเดตสถานะของตัวเองได้");
ok(!/firebasedatabase\.app\/(rider_applications|community_riders)\.json"\)/.test(src), "ไม่มีการดึงรายชื่อไรเดอร์แบบไม่แนบบัตรผ่าน");

console.log("== ผู้สมัครส่งใบสมัครได้ แม้อ่านรายการทั้งโหนดไม่ได้ (บั๊กที่พบหลังขึ้น v5)");
const sync = fn("syncKeyedToCloud");
ok(/_BLIND_WRITE_NODES\.has\(node\)/.test(sync) && /_blindWriteItems\(/.test(sync), "อ่านรายการไม่ได้ + ไม่ใช่เจ้าของ -> เขียนใบสมัครของตัวเองตรง ๆ (ไม่ข้ามเงียบ ๆ)");
ok(/new Set\(\["rider_applications", "merchant_applications"\]\)/.test(src), "ใช้กับใบสมัครไรเดอร์และร้านเท่านั้น");
const writes = [];
const c3 = {
    db: { ref: p => ({ set: v => { writes.push([p, v]); return Promise.resolve(); } }) },
    _withTimeout: p => p, console, JSON, Promise, Object,
    _canonJson: v => JSON.stringify(v), staffKeyId: s => String(s), myMerchantStaffId: () => null
};
vm.createContext(c3);
vm.runInContext("const _blindWritten = {};\n" + fn("_blindWriteItems"), c3);
(async () => {
    await c3._blindWriteItems("rider_applications", { RD1: { id: "RD1", status: "pending" }, RD2: { id: "RD2", status: "approved" } }, null);
    ok(writes.length === 1 && writes[0][0] === "rider_applications/RD1", "ส่งเฉพาะใบที่รออนุมัติ (ข้อมูลเก่าที่อนุมัติแล้วในเครื่อง ไม่ถูกเขียนทับของคนอื่น)");
    await c3._blindWriteItems("rider_applications", { RD1: { id: "RD1", status: "pending" } }, null);
    ok(writes.length === 1, "ข้อมูลเดิมไม่เปลี่ยน ไม่ส่งซ้ำ");
    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
