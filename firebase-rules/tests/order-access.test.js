// ทดสอบ "บัตรผ่าน" (Anonymous Auth) + สิทธิ์อ่านออเดอร์ (2026-09-25) แบบไม่ต่อเน็ต
//   - กฎ v3: orders/carts ไม่เปิดให้ทุกคนแล้ว, ค่าพิสูจน์ของไรเดอร์/แม่ค้าอ่านได้เฉพาะเจ้าของ
//   - ค่าพิสูจน์ (staffProof) คำนวณจากรหัสผ่านจริง และต่างจาก loginHash ที่เปิดอ่านได้
//   - ออเดอร์ใหม่ถูกผูกกับ uid ของเครื่องที่สั่ง; ออเดอร์เดิมเก็บ customerUid เดิมไว้
//   - โค้ดที่ดึงออเดอร์ทุกใบ ถูกกั้นด้วย canListAllOrders (ลูกค้าทั่วไปไม่ขอ)
//   กรณีจริงกับฐานข้อมูล hsong-test อยู่ใน rules-v3-live.test.js
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { webcrypto } = require("crypto");
const root = path.join(__dirname, "..", "..");
const src = fs.readFileSync(path.join(root, "app.js"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const re = new RegExp("(async )?function " + name + "\\(");
    const m = re.exec(src);
    if (!m) throw new Error("not found: " + name);
    let i = src.indexOf("{", m.index), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(m.index, i + 1);
}

console.log("== กฎ v3 (ไฟล์ที่สร้างจาก build-rules.js)");
for (const proj of ["hsong-test", "hsong-1f342"]) {
    const rules = JSON.parse(fs.readFileSync(path.join(__dirname, "..", proj + ".rules.v3.json"), "utf8")).rules;
    const o = rules.orders;
    ok(o && o[".read"] !== true && o[".write"] !== true, proj + ": orders ไม่เปิดอ่าน/เขียนให้ทุกคนแล้ว");
    ok(/staff_sessions/.test(o[".read"]) && /staff_keys/.test(o[".read"]), proj + ": ดึงรายการออเดอร์ได้เฉพาะเจ้าของหรือไรเดอร์/แม่ค้าที่พิสูจน์รหัสผ่านแล้ว");
    ok(/customerUid'\)\.val\(\) === auth\.uid/.test(o.$id[".read"]) && /order_viewers/.test(o.$id[".read"]), proj + ": ลูกค้าอ่านได้เฉพาะออเดอร์ของตัวเอง หรือที่ลงชื่อด้วยรหัสติดตาม");
    ok(/newData\.exists\(\)/.test(o.$id[".write"]), proj + ": ลูกค้า/ไรเดอร์ลบออเดอร์ไม่ได้ (ลบได้เฉพาะเจ้าของ)");
    ok(/newData\.child\('customerUid'\)\.val\(\) === data\.child\('customerUid'\)\.val\(\)/.test(o.$id[".validate"]), proj + ": เปลี่ยนเจ้าของออเดอร์ (customerUid) ไม่ได้");
    ok(rules.carts[".read"] !== true && rules.carts.$uid[".write"] === "auth != null && auth.uid === $uid", proj + ": ตะกร้าอ่าน/เขียนได้เฉพาะเครื่องเจ้าของ");
    ok(!/true/.test(String(rules.staff_keys[".read"])) && /auth\.uid ===/.test(rules.staff_keys[".read"]), proj + ": staff_keys อ่านได้เฉพาะเจ้าของ");
    ok(/staff_keys/.test(rules.staff_sessions.$uid[".validate"]), proj + ": เปิดสิทธิ์ไรเดอร์/แม่ค้าได้เฉพาะเมื่อค่าพิสูจน์ตรงกับ staff_keys");
    ok(/order_codes/.test(rules.order_viewers.$id.$uid[".write"]), proj + ": ลงชื่อผู้ชมออเดอร์ได้เฉพาะเมื่อรหัสติดตามถูก");
    ok(rules.rider_applications && rules.merchant_applications && rules.rider_private, proj + ": กฎเดิมของใบสมัคร/ข้อมูลส่วนตัวยังอยู่ครบ");
}
const v2 = fs.readFileSync(path.join(__dirname, "..", "hsong-1f342.rules.v2.json"), "utf8");
ok(/"orders": \{\s*"\.read": true,\s*"\.write": true/.test(v2), "ไฟล์ v2 (รุ่นที่ใช้อยู่/ใช้ถอยกลับ) ไม่ถูกแก้");

console.log("== ค่าพิสูจน์รหัสผ่าน (staffProof)");
const ctx = { console, crypto: webcrypto, TextEncoder, Uint8Array, window: {} };
vm.createContext(ctx);
vm.runInContext([
    "const RIDER_SECRET_ALPHABET = \"ABCDEFGHJKMNPQRSTUVWXYZ23456789\"; const RIDER_SECRET_LENGTH = 8; const RIDER_SECRET_ITERATIONS = 150000;",
    /const STAFF_PROOF_SALT_SUFFIX = "[0-9a-f]+";/.exec(src)[0],
    fn("normalizeRiderSecret"), fn("generateRiderSecret"), fn("_bytesToHex"), fn("_hexToBytes"),
    fn("hashRiderSecret"), fn("staffProofFromSecret"), fn("makeRiderLoginCredential")
].join("\n"), ctx);

(async () => {
    const cred = await vm.runInContext("makeRiderLoginCredential()", ctx);
    ok(/^[0-9a-f]{64}$/.test(cred.staffProof), "สร้างรหัสผ่านแล้วได้ค่าพิสูจน์ 64 ตัว");
    ok(cred.staffProof !== cred.loginHash, "ค่าพิสูจน์ต่างจาก loginHash (ที่ใครก็อ่านได้) — ลอกไปใช้แทนกันไม่ได้");
    ctx._c = cred;
    const again = await vm.runInContext("staffProofFromSecret(_c.secret.toLowerCase(), _c.loginSalt)", ctx);
    ok(again === cred.staffProof, "ไรเดอร์พิมพ์รหัสเดิม (ตัวเล็ก/มีขีดก็ได้) ได้ค่าพิสูจน์ตรงกับที่เจ้าของเก็บไว้");
    const wrong = await vm.runInContext("staffProofFromSecret('AAAA-BBBB', _c.loginSalt)", ctx);
    ok(wrong !== cred.staffProof, "รหัสผิดได้ค่าพิสูจน์คนละค่า (ฐานข้อมูลจะไม่ยอมให้สิทธิ์)");

    console.log("== ผูกออเดอร์กับเครื่องที่สั่ง (stampOrderOwner)");
    const c2 = { window: { _cachedFirebaseOrders: [{ orderId: "#TH-1", customerUid: "uid-A" }, { orderId: "#TH-2" }] }, getAuthUid: () => "uid-ME" };
    vm.createContext(c2);
    vm.runInContext(fn("stampOrderOwner"), c2);
    const newOrder = vm.runInContext("stampOrderOwner({ orderId: '#TH-NEW' })", c2);
    ok(newOrder.customerUid === "uid-ME", "ออเดอร์ใหม่ได้ uid ของเครื่องนี้");
    const known = vm.runInContext("stampOrderOwner({ orderId: '#TH-1', status: 'delivering' })", c2);
    ok(known.customerUid === "uid-A", "ไรเดอร์/ฮับบันทึกออเดอร์คนอื่น: ใช้ uid เดิมของลูกค้า (ไม่แย่งเป็นของตัวเอง)");
    const legacy = vm.runInContext("stampOrderOwner({ orderId: '#TH-2' })", c2);
    ok(!legacy.customerUid, "ออเดอร์เก่าที่ไม่มีเจ้าของ: ไม่ใส่ uid ให้ (ไม่งั้นกฎจะปฏิเสธการบันทึกของไรเดอร์/ฮับ)");
    const kept = vm.runInContext("stampOrderOwner({ orderId: '#TH-NEW2', customerUid: 'uid-X' })", c2);
    ok(kept.customerUid === "uid-X", "ออเดอร์ที่มีเจ้าของแล้ว: ไม่เปลี่ยน");

    console.log("== โค้ดที่ดึงออเดอร์ทุกใบ ต้องกั้นไว้ให้เจ้าของ/ไรเดอร์/แม่ค้าเท่านั้น");
    ["syncAdminOrdersFromCloud", "listenToFirebaseOrdersForAdmin", "syncLatestOrderFromCloud", "attachOrderChildListeners", "_executeClearDailyOrdersAndReport"].forEach(n => {
        ok(/canListAllOrders\(\)/.test(fn(n)), n + " ตรวจ canListAllOrders ก่อนดึง");
    });
    const listingCalls = src.match(/db\.ref\("orders"\)\.(on|once|limitToLast)|ordersRef\.on\(/g) || [];
    const guarded = ["syncAdminOrdersFromCloud", "listenToFirebaseOrdersForAdmin", "syncLatestOrderFromCloud", "attachOrderChildListeners", "_executeClearDailyOrdersAndReport"].map(fn).join("\n");
    const guardedCount = (guarded.match(/db\.ref\("orders"\)\.(on|once|limitToLast)|ordersRef\.on\(/g) || []).length;
    ok(listingCalls.length === guardedCount, "ไม่มีจุดอื่นที่ดึงออเดอร์ทุกใบโดยไม่กั้น (" + guardedCount + "/" + listingCalls.length + ")");
    ok(!/db\.ref\("orders"\)\.limitToLast\(15\)/.test(src), "ตอนลูกค้าล็อกอิน ไม่ดึงออเดอร์ 15 ใบล่าสุดของทุกคนมาเทียบชื่อแล้ว");
    ok(/restoreMyActiveOrderFromCloud\(\)/.test(fn("handleCustomerLoginSubmit")), "ลูกค้าล็อกอิน: ดึงเฉพาะออเดอร์ที่เครื่องนี้เคยสั่ง");
    const pick = fn("pickMyOwnActiveOrder");
    ok(/customerUid === myUid/.test(pick), "pickMyOwnActiveOrder รู้จักออเดอร์ของเครื่องนี้จาก uid");

    console.log("== บัตรผ่านและการล็อกอิน");
    const init = fn("initOwnerAuth");
    ok(/user\.isAnonymous/.test(init) && /_signInAnonymouslyOnce\(\)/.test(init), "เปิดเว็บแล้วขอบัตรผ่านนิรนาม และไม่เตะบัตรนิรนามออก");
    ok(/signInAnonymously\(\)/.test(fn("_signInAnonymouslyOnce")) && /_anonAuthFailed = true/.test(fn("_signInAnonymouslyOnce")), "ถ้ายังไม่ได้เปิด Anonymous ในโปรเจกต์ แอปทำงานต่อแบบเดิม");
    ok(/openStaffSession\("rider"/.test(fn("submitRiderSecretLogin")), "ไรเดอร์ล็อกอินด้วยรหัสผ่าน -> ขอสิทธิ์อ่านออเดอร์");
    ok(/openStaffSession\("merchant"/.test(fn("handleMerchantCodeLoginSubmit")), "แม่ค้าล็อกอินด้วยรหัสผ่าน -> ขอสิทธิ์อ่านออเดอร์");
    ok(/closeStaffSession\(\)/.test(fn("logoutRider")) && /closeStaffSession\(\)/.test(fn("logoutMerchant")), "ออกจากระบบ -> คืนสิทธิ์");
    ok(/saveStaffKey\("rider"/.test(fn("approveRiderApplication")) && /saveStaffKey\("rider"/.test(fn("resetRiderLoginSecret")), "อนุมัติ/สร้างรหัสใหม่ให้ไรเดอร์ -> เก็บค่าพิสูจน์");
    ok(/saveStaffKey\("merchant"/.test(fn("approveMerchantApplication")) && /saveStaffKey\("merchant"/.test(fn("resetMerchantLoginSecret")), "อนุมัติ/สร้างรหัสใหม่ให้ร้าน -> เก็บค่าพิสูจน์");
    ok(/removeStaffKey\("rider"/.test(fn("revokeRiderAccessForApplication")), "ถอนสิทธิ์ไรเดอร์ -> ลบค่าพิสูจน์");
    ["rejectMerchantApplication", "deleteMerchantApplication", "deleteStallByAdmin", "reconsiderMerchantApplication"].forEach(n =>
        ok(/removeStaffKey\("merchant"/.test(fn(n)), n + " -> ลบค่าพิสูจน์ของร้าน"));
    ok(/accessCode \|\| res\.rider\.id/.test(fn("submitRiderSecretLogin")) && /saveStaffKey\("rider", app\.accessCode/.test(fn("approveRiderApplication")), "ไรเดอร์: ใช้เลขไรเดอร์ (accessCode) เป็นชื่อหัวข้อทั้งตอนเก็บและตอนล็อกอิน");

    console.log("== ตะกร้าและคำขอ REST");
    ok(!/carts\/\$\{customerId\}|carts\/\$\{cid\}/.test(src), "ไม่ใช้เบอร์โทร/ชื่อเป็นชื่อหัวข้อตะกร้าแล้ว");
    ok(/db\.ref\(`carts\/\$\{cartUid\}`\)\.set/.test(fn("saveCartToStorage")) && !/customerName/.test(fn("saveCartToStorage")), "ตะกร้าเก็บที่ carts/<uid> ไม่มีชื่อลูกค้า");
    const restOrders = src.match(/fetch\([^\n]*\/orders[^\n]*/g) || [];
    ok(restOrders.length >= 4 && restOrders.every(l => /authQ|authQueryParam/.test(l)), "คำขอ REST ไปที่ orders แนบบัตรผ่านทุกจุด (" + restOrders.length + " จุด)");
    ok(/order_viewers\/\$\{key\}\/\$\{uid\}/.test(fn("handleTrackingDeepLink")), "ลิงก์ติดตาม: ลงชื่อผู้ชมด้วยรหัสก่อนอ่านออเดอร์");
    ok(/saveOrderTrackCodeToCloud\(orderKey, cleanOrder\)/.test(fn("_syncOrderToCloudNow")), "สร้างออเดอร์แล้วเก็บรหัสติดตามไว้ที่ order_codes");

    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
