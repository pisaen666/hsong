// ทดสอบล็อกอินแผงค้าแบบ "รหัสร้าน + รหัสผ่านลับ" (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง)
//   - เบอร์โทร / เลขแผง / รหัส 6 หลักเดิม / รหัสร้านอย่างเดียว เข้าไม่ได้
//   - อนุมัติสร้างรหัสผ่าน (เก็บเฉพาะ hash) และสร้างใหม่ได้ รหัสเก่าใช้ไม่ได้
//   - ทางเข้าที่ไม่ใช้รหัส (loginAsMerchantStall) เป็นของเจ้าของเท่านั้น
//   - ผิดหลายครั้งถูกล็อกชั่วคราว (แยกจากไรเดอร์)
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { webcrypto } = require("crypto");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

function fn(name, isAsync) {
    const start = src.indexOf((isAsync ? "async function " : "function ") + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}
function between(a, b) {
    const s = src.indexOf(a); const e = src.indexOf(b, s);
    if (s < 0 || e < 0) throw new Error("marker missing " + a);
    return src.slice(s, e + b.length);
}

const store = {};
let apps = [], owner = false, remoteApps = [];
const toasts = [], sms = [], entered = [];
const ctx = {
    console, window: {}, crypto: webcrypto, TextEncoder, Uint8Array, Date, Math, JSON, Array, Promise,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    showToast: m => toasts.push(String(m)),
    loadMerchantApplications: () => apps,
    saveMerchantApplications: a => { apps = a; },
    MARKET_DATA: [], ALL_100_STALLS: [], STALL_CATALOG_DATABASE: {},
    saveMarketDataToStorage: () => { }, saveStallCatalogDatabaseToStorage: () => { },
    updateAdminStallsBadge: () => { }, renderAdminStalls: () => { }, renderCatalog: () => { }, renderDirectoryList: () => { },
    renderFavoriteStallsBar: () => { }, updateStallRotationUI: () => { },
    isOwnerSignedIn: () => owner,
    requireOwnerAction: () => { if (owner) return true; toasts.push("owner-required"); return false; },
    confirm: () => true,
    openSimulatedSmsModal: (...a) => sms.push(a),
    _enterMerchantStall: id => entered.push(id),
    state: { activeMerchant: null },
    document: { getElementById: () => null },
    loadCommunityRiders: () => [], loadRiderApplications: () => []
};
// ตัวช่วยสิทธิ์อ่านออเดอร์ (staff_keys / staff_sessions) — ทดสอบจริงอยู่ใน order-access.test.js
Object.assign(ctx, {
    staffProofFromSecret: async () => "f".repeat(64),
    saveStaffKey: () => Promise.resolve(true),
    removeStaffKey: () => { },
    openStaffSession: async () => false,
    closeStaffSession: () => { }
});
vm.createContext(ctx);
vm.runInContext([
    between("const RIDER_SECRET_ALPHABET", "window.riderSecretLogin = riderSecretLogin;"),
    between("// =================================================================\n// รหัสผ่านเข้าระบบแผงค้า", "window.merchantSecretLogin = merchantSecretLogin;"),
    "async " + fn("approveMerchantApplication", true).replace(/^async /, ""),
    "async " + fn("resetMerchantLoginSecret", true).replace(/^async /, ""),
    fn("loginAsMerchantStall"), fn("reopenMyMerchantStall")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

(async () => {
    const mkApp = (id, status, extra) => Object.assign({ id, status, accessCode: "123456", stallData: { stallId: id, stallName: "ร้านทดสอบ", stallNumber: "A12", phone: "0812345678", lineId: "line1" } }, extra || {});

    console.log("== อนุมัติ: สร้างรหัสผ่านลับ เก็บเฉพาะ hash");
    apps = [mkApp("APP-SHOP-1111", "pending")];
    ctx.MARKET_DATA.length = 0; ctx.ALL_100_STALLS.length = 0;
    owner = false; toasts.length = 0;
    let r = await run("approveMerchantApplication('APP-SHOP-1111')");
    ok(r === false && apps[0].status === "pending" && toasts.includes("owner-required"), "ผู้ใช้ทั่วไปอนุมัติไม่ได้");
    owner = true; sms.length = 0;
    r = await run("approveMerchantApplication('APP-SHOP-1111')");
    const a1 = apps[0];
    ok(r === true && a1.status === "approved", "เจ้าของอนุมัติได้");
    ok(a1.loginHash && a1.loginHash.length === 64 && a1.loginSalt && a1.loginSalt.length === 32, "ใบสมัครเก็บ hash 64 / salt 32 ตัวอักษร");
    const st = ctx.MARKET_DATA.find(s => s.stallId === "APP-SHOP-1111");
    ok(st && st.loginHash === a1.loginHash && st.loginSalt === a1.loginSalt, "ข้อมูลร้านในตลาดพก hash/salt ตามไปด้วย (กันถูกกฎฐานข้อมูลปฏิเสธตอนบันทึก)");
    ok(sms.length === 1 && sms[0][3] === "merchant" && /^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(sms[0][1]) && sms[0][5] === "APP-SHOP-1111", "หน้าต่างส่งข้อความได้รับ: รหัสผ่านลับรูปแบบ XXXX-XXXX + รหัสร้าน");
    const secret1 = sms[0][1];
    ok(!JSON.stringify(apps).includes(secret1) && !JSON.stringify(ctx.MARKET_DATA).includes(secret1) && !toasts.join(" ").includes(secret1), "รหัสผ่านจริงไม่ถูกเก็บ ไม่โผล่ใน toast");
    ok(a1.accessCode === "123456", "รหัส 6 หลักเดิมของร้านไม่ถูกแตะ (แต่ไม่ใช่รหัสผ่านแล้ว)");
    owner = false;

    console.log("== ล็อกอิน: รหัสร้าน + รหัสผ่าน");
    let keepLock = false;
    const login = (shop, sec, opts) => { if (!keepLock) delete store["talathub_merchant_login_fail"]; ctx._s = shop; ctx._p = sec; ctx._o = opts; return run("merchantSecretLogin(_s, _p, _o)"); };
    r = await login("APP-SHOP-1111", secret1);
    ok(r.ok && r.stall.stallId === "APP-SHOP-1111", "รหัสร้าน + รหัสถูก → เข้าได้");
    r = await login("app-shop-1111", secret1.toLowerCase().replace("-", " "));
    ok(r.ok, "พิมพ์ตัวเล็ก/เว้นวรรคแทนขีด ก็เข้าได้");
    r = await login("APP-SHOP-1111", "AAAA-BBBB");
    ok(!r.ok && r.code === "bad", "รหัสผิด → เข้าไม่ได้");
    r = await login("APP-SHOP-1111", "");
    ok(!r.ok && r.code === "empty", "ไม่กรอกรหัสผ่าน → เข้าไม่ได้ (รหัสร้านอย่างเดียวไม่พอ)");
    r = await login("0812345678", secret1);
    ok(!r.ok && r.code === "bad", "ใช้เบอร์โทรแทนรหัสร้าน → เข้าไม่ได้");
    r = await login("A12", secret1);
    ok(!r.ok && r.code === "bad", "ใช้เลขแผงแทนรหัสร้าน → เข้าไม่ได้");
    r = await login("APP-SHOP-1111", "123456");
    ok(!r.ok && r.code === "bad", "รหัส 6 หลักเดิมใช้เป็นรหัสผ่านไม่ได้แล้ว");
    r = await login("123456", secret1);
    ok(!r.ok && r.code === "bad", "รหัส 6 หลักเดิมใช้แทนรหัสร้านไม่ได้");
    r = await login("APP-SHOP-9999", secret1);
    ok(!r.ok && r.code === "bad", "รหัสร้านที่ไม่มีอยู่ → เข้าไม่ได้");

    console.log("== สถานะใบสมัคร / ร้านเก่าที่ยังไม่มีรหัส");
    apps.push(mkApp("APP-SHOP-2222", "pending"), mkApp("APP-SHOP-3333", "rejected"), mkApp("APP-SHOP-4444", "approved"));
    r = await login("APP-SHOP-2222", "AAAA-BBBB");
    ok(!r.ok && r.code === "pending", "ใบสมัครรออนุมัติ → เข้าไม่ได้ (บอกให้รอ)");
    r = await login("APP-SHOP-3333", "AAAA-BBBB");
    ok(!r.ok && r.code === "rejected", "ใบสมัครไม่ผ่าน → เข้าไม่ได้");
    r = await login("APP-SHOP-4444", "AAAA-BBBB");
    ok(!r.ok && r.code === "no-secret" && /ติดต่อเจ้าของ/.test(r.message), "ร้านเก่าที่ยังไม่มีรหัสผ่าน → เข้าไม่ได้ และบอกให้ติดต่อเจ้าของ");
    ctx.MARKET_DATA.push({ stallId: "seed_stall_1", stallName: "ร้านตั้งต้น", phone: "0800000000", accessCode: "999999" });
    r = await login("seed_stall_1", "AAAA-BBBB");
    ok(!r.ok && r.code === "no-secret", "แผงตั้งต้นที่ไม่มีรหัสผ่าน เข้าเองไม่ได้ (เจ้าของใช้ปุ่มเข้าระบบร้านนี้)");

    console.log("== ดึงข้อมูลจากฐานข้อมูลกลางเมื่อเครื่องนี้ยังไม่มีร้าน");
    const remote = [Object.assign({}, a1)];
    apps = []; ctx.MARKET_DATA.length = 0; ctx.ALL_100_STALLS.length = 0;
    r = await login("APP-SHOP-1111", secret1, { fetchRemote: async () => remote });
    ok(r.ok && r.stall.loginHash === a1.loginHash, "เครื่องใหม่: ดึงใบสมัครจากฐานข้อมูลกลางแล้วเข้าได้ (ร้านที่ได้พก hash มาด้วย)");
    r = await login("APP-SHOP-1111", secret1, { fetchRemote: async () => { throw new Error("offline"); } });
    ok(!r.ok && r.code === "bad", "ดึงข้อมูลไม่ได้ → เข้าไม่ได้ (ไม่พัง)");
    apps = [Object.assign({}, a1)];

    console.log("== กันเดารหัส: ผิด 5 ครั้งถูกล็อก (แยกจากไรเดอร์)");
    delete store["talathub_merchant_login_fail"];
    keepLock = true;
    for (let i = 0; i < 5; i++) await login("APP-SHOP-1111", "AAAA-BBBB");
    r = await login("APP-SHOP-1111", secret1);
    keepLock = false;
    ok(!r.ok && r.code === "locked", "ผิด 5 ครั้ง → แม้ใส่รหัสถูกก็ถูกล็อกชั่วคราว");
    ok(!("talathub_rider_login_fail" in store), "การล็อกของแผงค้าไม่ไปล็อกไรเดอร์");
    delete store["talathub_merchant_login_fail"];
    r = await login("APP-SHOP-1111", secret1);
    ok(r.ok, "พ้นการล็อกแล้วเข้าได้ปกติ");

    console.log("== เจ้าของสร้างรหัสผ่านใหม่: รหัสเก่าใช้ไม่ได้");
    ctx.MARKET_DATA.length = 0; ctx.ALL_100_STALLS.length = 0;
    ctx.MARKET_DATA.push(Object.assign({}, apps[0].stallData, { loginHash: a1.loginHash, loginSalt: a1.loginSalt }));
    owner = false; sms.length = 0; toasts.length = 0;
    await run("resetMerchantLoginSecret('APP-SHOP-1111')");
    ok(sms.length === 0 && toasts.includes("owner-required"), "ผู้ใช้ทั่วไปสร้างรหัสใหม่ไม่ได้");
    owner = true;
    await run("resetMerchantLoginSecret('APP-SHOP-1111')");
    const secret2 = sms[0] && sms[0][1];
    ok(secret2 && secret2 !== secret1 && apps[0].loginHash !== a1.loginHash, "เจ้าของสร้างรหัสใหม่ได้ hash เปลี่ยน");
    ok(ctx.MARKET_DATA[0].loginHash === apps[0].loginHash, "ข้อมูลร้านในตลาดได้ hash ใหม่ตามไปด้วย");
    owner = false;
    r = await login("APP-SHOP-1111", secret1);
    ok(!r.ok && r.code === "bad", "รหัสเก่าเข้าไม่ได้แล้ว");
    delete store["talathub_merchant_login_fail"];
    r = await login("APP-SHOP-1111", secret2);
    ok(r.ok, "รหัสใหม่เข้าได้");
    apps[0].status = "pending";
    owner = true; sms.length = 0;
    await run("resetMerchantLoginSecret('APP-SHOP-1111')");
    ok(sms.length === 0, "ร้านที่ยังไม่อนุมัติ สร้างรหัสผ่านไม่ได้");
    owner = false;

    console.log("== ทางเข้าที่ไม่ใช้รหัสต้องเป็นของเจ้าของเท่านั้น");
    entered.length = 0; toasts.length = 0; ctx.state.activeMerchant = null;
    run("loginAsMerchantStall('APP-SHOP-1111')");
    ok(entered.length === 0 && toasts.includes("owner-required"), "loginAsMerchantStall: ผู้ใช้ทั่วไปเข้าไม่ได้");
    run("reopenMyMerchantStall('APP-SHOP-1111')");
    ok(entered.length === 0, "reopenMyMerchantStall: คนที่ยังไม่ได้ล็อกอินเข้าแผงนี้ไม่ได้");
    ctx.state.activeMerchant = { isLoggedIn: true, stallId: "APP-SHOP-9999" };
    run("reopenMyMerchantStall('APP-SHOP-1111')");
    ok(entered.length === 0, "reopenMyMerchantStall: ล็อกอินแผงอื่นอยู่ ข้ามไปแผงนี้ไม่ได้");
    ctx.state.activeMerchant = { isLoggedIn: true, stallId: "APP-SHOP-1111" };
    run("reopenMyMerchantStall('APP-SHOP-1111')");
    ok(entered.length === 1 && entered[0] === "APP-SHOP-1111", "reopenMyMerchantStall: ล็อกอินแผงนี้อยู่แล้ว กลับเข้าได้");
    owner = true; entered.length = 0;
    run("loginAsMerchantStall('APP-SHOP-1111')");
    ok(entered.length === 1, "loginAsMerchantStall: เจ้าของใช้ได้");
    owner = false;

    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
