// โครงสร้างราคาใหม่ (เจ้าของตัดสินใจ 2026-09-28) — เป้าหมาย: แอปกำไร >= 10% ของค่าสินค้าทุกออเดอร์
//   ค่ารอบไรเดอร์ 30 (ไม่เกิน 3 กม.) / ค่าส่งลูกค้า 20 / เกิน 3 กม. +5 ทุกครึ่ง กม. / ส่งไกลสุด 7 กม.
//   ยอดไม่ถึง 200: +5 (100-199) / +10 (< 100) / GP 15% / งานด่วนแม่ค้า = ค่ารอบ + 20 / คูปองปิด
// รันฟังก์ชันจริงจาก app.js ใน vm (ไม่ต่อเน็ต)
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const html = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}
function between(a, b) {
    const i = appSrc.indexOf(a), j = appSrc.indexOf(b, i);
    if (i < 0 || j < 0) throw new Error("block not found: " + a);
    return appSrc.slice(i, j + b.length);
}

const store = {};
const ctx = {
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
    MARKET_ORIGIN: { lat: 13.3080, lng: 101.1214 },
    state: { cart: [], deliveryLocation: null, isExpressDelivery: false, activeCoupon: null },
    console, Math, Number, JSON, isFinite
};
vm.createContext(ctx);
vm.runInContext([
    between("const PRICING = Object.freeze({", "const COUPONS_ENABLED = false;"),
    fn("calculateDistanceKm"), fn("loadRiderFleetSettings"), fn("getRiderTripFee"),
    fn("pricingKm"), fn("distanceStepCount"), fn("isBeyondDeliveryRange"), fn("calculateDeliveryFee"),
    fn("smallOrderFee"), fn("riderTripFeeForKm"), fn("orderDistanceKm"), fn("riderTripFeeForOrder"),
    fn("merchantExpressFeeForKm"), fn("merchantExpressFeeLabel"), fn("deliveryFeeLabel"),
    fn("isValidGpRate"), fn("getMerchantGpRate"), fn("calculateCartTotals")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);

console.log("== ตารางค่ารอบ / ค่าส่งตามระยะ (ตามที่เจ้าของตกลง)");
const table = [[0, 30, 20], [1.2, 30, 20], [3.0, 30, 20], [3.04, 30, 20], [3.1, 35, 25], [3.5, 35, 25], [3.6, 40, 30],
    [4.0, 40, 30], [4.5, 45, 35], [5.0, 50, 40], [5.5, 55, 45], [6.0, 60, 50], [6.5, 65, 55], [7.0, 70, 60]];
table.forEach(([km, rider, cust]) => {
    ok(run(`riderTripFeeForKm(${km})`) === rider && run(`calculateDeliveryFee(${km})`) === cust,
        `${km} กม. -> ไรเดอร์ ฿${rider}, ลูกค้า ฿${cust}`);
});
ok(!run("isBeyondDeliveryRange(7.0)") && !run("isBeyondDeliveryRange(7.04)"), "7.0 กม. (และ 7.04 ที่แสดงเป็น 7.0) ยังส่งได้");
ok(run("isBeyondDeliveryRange(7.1)") && run("isBeyondDeliveryRange(12)"), "เกิน 7 กม. ส่งไม่ได้");
ok(/ส่งไม่ถึง/.test(run("deliveryFeeLabel(8)")) && run("deliveryFeeLabel(3)") === "฿20", "ป้ายค่าส่งบนแผนที่บอก 'ส่งไม่ถึง' เมื่อเกิน 7 กม.");

console.log("== ค่าส่งเพิ่มเมื่อยอดไม่ถึง 200");
[[0, 10], [50, 10], [99, 10], [99.5, 10], [100, 5], [150, 5], [199, 5], [200, 0], [950, 0]].forEach(([s, f]) =>
    ok(run(`smallOrderFee(${s})`) === f, `ยอด ฿${s} -> ค่าส่งเพิ่ม ฿${f}`));

console.log("== ค่ารอบเริ่มต้นตั้งได้ในแอดมิน (ค่าส่งลูกค้าไม่เปลี่ยนตาม)");
store.talathub_fleet_settings = JSON.stringify({ baseFee: 35 });
ok(run("riderTripFeeForKm(4)") === 45 && run("calculateDeliveryFee(4)") === 30, "ตั้งค่ารอบเริ่มต้น 35 -> 4 กม. ไรเดอร์ ฿45, ลูกค้ายัง ฿30");
delete store.talathub_fleet_settings;

console.log("== กำไรแอป >= 10% ของค่าสินค้า ทุกยอด ทุกระยะ (GP 15%, ร้านเดียว = กรณีแย่สุด)");
const gp = run("getMerchantGpRate()") / 100;
ok(gp === 0.15, "GP ตั้งต้น 15%");
let worst = null, bad = 0;
for (let s = 1; s <= 3000; s += 1) {
    for (let km10 = 0; km10 <= 70; km10++) {
        const km = km10 / 10;
        const profit = gp * s + run(`calculateDeliveryFee(${km})`) + run(`smallOrderFee(${s})`) - run(`riderTripFeeForKm(${km})`);
        const pct = profit / s;
        if (pct < 0.10 - 1e-9) bad++;
        if (!worst || pct < worst.pct) worst = { s, km, pct };
    }
}
ok(bad === 0, `ไม่มีกรณีที่กำไรต่ำกว่า 10% (ตรวจ ${3000 * 71} กรณี; ต่ำสุด ${(worst.pct * 100).toFixed(2)}% ที่ยอด ฿${worst.s} ${worst.km} กม.)`);
ok(Math.abs(worst.pct - 0.10) < 1e-9, "กรณีต่ำสุดได้ 10% พอดี (ตัวเลขชุดนี้ไม่เผื่อเกินและไม่ขาด)");

console.log("== งานด่วนของแม่ค้า = ค่ารอบไรเดอร์ + ค่าธรรมเนียมแอป 20");
[[2, 50], [3.5, 55], [5, 70], [7, 90]].forEach(([km, fee]) =>
    ok(run(`merchantExpressFeeForKm(${km})`) === fee && fee - run(`riderTripFeeForKm(${km})`) === 20, `${km} กม. -> แม่ค้าจ่าย ฿${fee} (แอปได้ ฿20)`));
const call = fn("submitMerchantCall");
ok(/isBeyondDeliveryRange\(distKm\)/.test(call), "เรียกไรเดอร์ด่วนเกิน 7 กม. ไม่ได้");
ok(/riderFee: riderFee/.test(call) && /appFee: PRICING\.expressAppFee/.test(call), "ออเดอร์ด่วนเก็บค่ารอบและค่าแอปแยกไว้");
ok(/const fee = merchantExpressFeeForKm\(distKm\)/.test(fn("calculateMerchantFee")), "หน้าจอแม่ค้าคิดค่าส่งใหม่ทุกครั้ง (ไม่ใช้ค่าเก่าที่ค้าง)");

console.log("== ค่ารอบของออเดอร์คิดจากพิกัด ไม่เชื่อตัวเลขระยะที่ส่งมา");
const far = run("(() => { const d = 5 / 111.0; return { lat: MARKET_ORIGIN.lat + d, lng: MARKET_ORIGIN.lng, distanceKm: 1 }; })()");
ok(run(`riderTripFeeForOrder(${JSON.stringify(far)})`) === 50, "ออเดอร์ห่าง 5 กม. แต่ใส่ distanceKm: 1 -> ค่ารอบ ฿50 ตามพิกัดจริง");
ok(run("riderTripFeeForOrder({ distanceKm: 4 })") === 40, "ออเดอร์ไม่มีพิกัด -> ใช้ distanceKm");
ok(run("riderTripFeeForOrder({})") === 30, "ไม่มีทั้งพิกัดและระยะ -> ค่ารอบเริ่มต้น");

console.log("== ตะกร้า / หน้าชำระเงิน");
const pin = km => ({ isSet: true, lat: 13.3080 + km / 111.0, lng: 101.1214, fee: 20 });
ctx.state.cart = [{ stallId: "A", price: 60, qty: 2 }];
ctx.state.deliveryLocation = pin(4.2);
let t = run("calculateCartTotals()");
ok(t.itemsSubtotal === 120 && t.deliveryFee === 35 && t.smallOrderFee === 5, "ยอด ฿120 ระยะ 4.2 กม. -> ค่าส่ง ฿35 + ค่าส่งเพิ่ม ฿5 (ไม่ใช้ fee เก่า ฿20 ที่ค้างในที่อยู่)");
ok(t.amountToSkipSmallFee === 80, "บอกลูกค้าว่าซื้อเพิ่มอีก ฿80 จะไม่ต้องจ่ายค่าส่งเพิ่ม");
ok(t.grandTotal === 120 + 35 + 5, "ยอดรวม = สินค้า + ค่าส่ง + ค่าส่งเพิ่ม");
ctx.state.activeCoupon = { code: "HEASONG50", discount: 50 };
t = run("calculateCartTotals()");
ok(t.discountAmount === 0 && t.grandTotal === 160, "คูปองปิด: ต่อให้มีคูปองค้างใน state ก็ไม่ลดราคา");
ctx.state.activeCoupon = null;
ctx.state.cart = [{ stallId: "A", price: 100, qty: 1 }, { stallId: "B", price: 150, qty: 1 }];
ctx.state.deliveryLocation = pin(2);
t = run("calculateCartTotals()");
ok(t.smallOrderFee === 0 && t.multiStallFee === 10 && t.grandTotal === 250 + 10 + 20, "ยอด ฿250 สองร้าน 2 กม. -> ไม่มีค่าส่งเพิ่ม, ค่าหลายร้าน ฿10 คงเดิม");
ctx.state.deliveryLocation = pin(8);
t = run("calculateCartTotals()");
ok(t.beyondRange === true, "ที่อยู่ 8 กม. -> beyondRange");
ok(/totals\.beyondRange/.test(fn("validateOrderPrerequisites")), "ด่านก่อนสั่งซื้อไม่ให้สั่งเมื่อเกิน 7 กม.");
ok(/smallOrderFee: Number\(totals\.smallOrderFee/.test(appSrc) && /distanceKm: Number\(totals\.distanceKm/.test(appSrc), "ออเดอร์เก็บค่าส่งเพิ่มและระยะไว้");

console.log("== คูปองปิด (เจ้าของสั่ง 2026-09-28)");
ok(/const COUPONS_ENABLED = false;/.test(appSrc), "COUPONS_ENABLED = false");
ok(/activeCoupon: null,/.test(appSrc) && !/activeCoupon: \{ code: "FRESH20"/.test(appSrc), "ไม่เลือก FRESH20 ให้อัตโนมัติแล้ว");
ok(/!COUPONS_ENABLED/.test(fn("applyManualCouponCode")) && /!COUPONS_ENABLED/.test(fn("selectCheckoutCoupon")) && /!COUPONS_ENABLED/.test(fn("applyCouponAndGoCheckout")), "พิมพ์โค้ด / เลือกคูปอง / ใช้คูปองจากกระเป๋า ถูกปิดทุกทาง");
ok(/id="checkout-coupon-card" class="hidden/.test(html), "กล่องคูปองในหน้าชำระเงินซ่อนอยู่");
ok(!/value="FRESH20" checked/.test(html) && /value="none" checked/.test(html), "ปุ่มตัวเลือกเริ่มต้น = ไม่ใช้คูปอง");
ok(/id="summary-small-order-row"/.test(html) && /id="summary-beyond-range-box"/.test(html), "หน้าชำระเงินมีแถวค่าส่งเพิ่ม และกล่องแจ้งเกินระยะ");

console.log("== GP มาจากฐานข้อมูลกลางแหล่งเดียว");
store.talathub_pricing = JSON.stringify({ gpRate: 18 });
ok(run("getMerchantGpRate()") === 18, "ค่าจากฐานข้อมูลกลาง (สำเนาในเครื่อง) ถูกใช้");
delete store.talathub_pricing;
ok(/const gpRate = getMerchantGpRate\(\);/.test(fn("aggregateDailyOperations")), "รายงานประจำวันใช้ getMerchantGpRate()");
ok(/orderItemLineTotal\(it\)/.test(fn("aggregateDailyOperations")), "ยอดร้านในรายงานคิดตามน้ำหนักที่ชั่งจริง (orderItemLineTotal)");
ok(/listenPricingFromCloud\(\);/.test(appSrc), "ทุกเครื่องฟังค่า GP จากฐานข้อมูลกลาง");
ok(!/merchantGP: 10,/.test(appSrc), "ไม่มีค่า GP 10 ฝังตายตัวในค่าตั้งต้นแล้ว");

console.log("== กฎ v8");
for (const name of ["hsong-test", "hsong-1f342"]) {
    const r = JSON.parse(fs.readFileSync(path.join(root, "firebase-rules", name + ".rules.v8.json"), "utf8")).rules;
    const v7 = JSON.parse(fs.readFileSync(path.join(root, "firebase-rules", name + ".rules.v7.json"), "utf8")).rules;
    const p = r.app_settings && r.app_settings.pricing;
    ok(p && p[".read"] === true && /auth\.uid === '/.test(p[".write"]) && !/true/.test(p[".write"]), name + ": pricing ทุกคนอ่าน เจ้าของเขียน");
    ok(p && /> 0/.test(p.gpRate[".validate"]) && /<= 50/.test(p.gpRate[".validate"]) && p.$other[".validate"] === false, name + ": GP ต้อง 0-50 และห้ามช่องแปลกปลอม");
    const copy = JSON.parse(JSON.stringify(r)); delete copy.app_settings.pricing;
    ok(JSON.stringify(copy) === JSON.stringify(v7), name + ": v8 = v7 + app_settings/pricing เท่านั้น");
}

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
