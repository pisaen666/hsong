// (ปรับ 2026-09-28: ค่ารอบเริ่มต้น 30 และคิดตามระยะ ดู pricing-structure.test.js)
// ทดสอบงาน 2026-09-25: ค่ารอบไรเดอร์เคยฝังตายตัวที่ 40 บาทในรายงาน/สลิป/กระเป๋าเงินไรเดอร์
// ไม่ตามค่า "ค่ารอบมาตรฐาน" ที่แอดมินตั้งไว้จริง (talathub_fleet_settings.baseFee, แท็บ "ตั้งค่าค่ารอบ")
// แก้โดยเพิ่ม getRiderTripFee() จุดเดียว อ่านจากค่าที่ตั้งไว้ (fallback 40 ถ้ายังไม่เคยตั้งหรือค่าเสีย) แล้วใช้แทนเลข 40 ทุกจุด
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

// ── ส่วนคำนวณ: getRiderTripFee() ต้องอ่านจาก talathub_fleet_settings.baseFee จริง ──
console.log("== getRiderTripFee() อ่านค่าจากการตั้งค่าจริง ==");
function makeCtx(storedSettings) {
    const store = {};
    if (storedSettings !== undefined) store["talathub_fleet_settings"] = JSON.stringify(storedSettings);
    const ctx = {
        localStorage: {
            getItem: k => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = v; }
        },
        console
    };
    vm.createContext(ctx);
    vm.runInContext(fn("loadRiderFleetSettings"), ctx);
    vm.runInContext(fn("getRiderTripFee"), ctx);
    return ctx;
}

ok(makeCtx(undefined).getRiderTripFee() === 30, "ยังไม่เคยตั้งค่าเลย -> ค่ารอบเริ่มต้น 30 (โครงสร้างราคา 2026-09-28)");
ok(makeCtx({ baseFee: 55 }).getRiderTripFee() === 55, "แอดมินตั้งค่ารอบเริ่มต้นเป็น 55 -> ได้ 55");
ok(makeCtx({ baseFee: 25 }).getRiderTripFee() === 25, "แอดมินตั้งค่ารอบเริ่มต้นเป็น 25 -> ได้ 25");
ok(makeCtx({ baseFee: 0 }).getRiderTripFee() === 30, "ค่ารอบตั้งเป็น 0 (ข้อมูลเสีย) -> กลับไป 30");
ok(makeCtx({ baseFee: -10 }).getRiderTripFee() === 30, "ค่ารอบติดลบ -> กลับไป 30");
ok(makeCtx({ baseFee: "abc" }).getRiderTripFee() === 30, "ค่ารอบไม่ใช่ตัวเลข -> กลับไป 30");
ok(makeCtx({}).getRiderTripFee() === 30, "ตั้งค่าไว้แต่ไม่มี baseFee -> ค่าเริ่มต้น 30");

// ── ไม่มี RIDER_TRIP_FEE (ค่าคงที่ตายตัว) หลงเหลืออยู่แล้ว ──
console.log("== เลิกใช้ค่าคงที่ตายตัว ==");
ok(!/RIDER_TRIP_FEE/.test(appSrc), "ไม่มี RIDER_TRIP_FEE (ค่าคงที่ตายตัว) เหลืออยู่ในไฟล์แล้ว");
ok(/function getRiderTripFee\(\)/.test(appSrc) && /window\.getRiderTripFee = getRiderTripFee;/.test(appSrc), "getRiderTripFee ถูกประกาศและผูก window แล้ว");

// ── ค่ารอบจริงของแต่ละเที่ยวคิดตามระยะ (riderTripFeeForOrder) ทุกจุด ──
console.log("== ทุกจุดใช้ค่ารอบตามระยะของเที่ยวนั้น ==");

const jobCard = fn("buildRiderJobCard");
ok(/fee:\s*riderTripFeeForOrder\(order\)/.test(jobCard), "buildRiderJobCard: ค่ารอบในใบงานย่อคิดตามระยะของออเดอร์");

const report = fn("aggregateDailyOperations");
ok(/riderFeeEarned \+= riderTripFeeForOrder\(o\)/.test(report), "aggregateDailyOperations: บวกค่ารอบตามระยะของแต่ละเที่ยว");
ok(!/riderFeeEarned \+= 40/.test(report) && !/riderFeeEarned \+= riderTripFee;/.test(report), "aggregateDailyOperations: ไม่มีค่ารอบเดียวทุกเที่ยวเหลืออยู่");

const wallet = fn("renderRiderWallet");
ok(/riderTripFeeForOrder\(state\.activeOrder\) : 0/.test(wallet), "renderRiderWallet: ค่ารอบเที่ยวล่าสุด (ก่อนมีรายงานจริง) คิดตามระยะ");
ok(/trips \* getRiderTripFee\(\)/.test(wallet), "renderRiderWallet: สำรองคำนวณจากเที่ยว x ค่ารอบเริ่มต้น");
ok(!/\* 40\)/.test(wallet) && !/: 40 : 0/.test(wallet), "renderRiderWallet: ไม่มี 40 ฝังตายตัวเหลืออยู่");
ok(!/>\+฿40</.test(wallet) && !/\(฿40\/รอบ\)/.test(wallet), "renderRiderWallet: ข้อความในหน้าจอไม่ฝัง 40 ตายตัว");

const complete = fn("handleRiderCompleteDelivery");
ok(!/\+฿40 ค่ารอบ/.test(complete) && /riderTripFeeForOrder\(order\)/.test(complete), "handleRiderCompleteDelivery: ข้อความส่งสำเร็จบอกค่ารอบของเที่ยวนี้");

ok(!/ค่ารอบ ฿40\/เที่ยว/.test(appSrc), "หัวรายงานเคลียร์เงินไรเดอร์ไม่ฝัง ฿40/เที่ยว ตายตัว");
ok(/ค่ารอบ \$\{riderFeeRuleText\(\)\}/.test(appSrc), "หัวรายงานเคลียร์เงินไรเดอร์บอกสูตรค่ารอบตามระยะ");
ok(/ค่ารอบสะสม \(\$\{riderFeeRuleText\(\)\}\)/.test(appSrc), "สลิปพิมพ์เคลียร์เงินไรเดอร์บอกสูตรค่ารอบตามระยะ");

// หน้าต่างโอนเงินไรเดอร์ทั้งฝูง / สลิปพิมพ์ ต้องใช้ค่ารอบจากรายงาน (ตามระยะ) ไม่ใช่ เที่ยว x ค่ารอบเดียว
ok(/rep\.riderFeeEarned/.test(fn("renderFleetPayoutModal")) && !/r\.baseFee \|\| settings\.baseFee \|\| 40/.test(fn("renderFleetPayoutModal")), "renderFleetPayoutModal: ใช้ค่ารอบรวมจากรายงาน");
ok(/rep\.riderFeeEarned/.test(fn("printFleetPayoutSlip")) && !/r\.baseFee \|\| settings\.baseFee \|\| 40/.test(fn("printFleetPayoutSlip")), "printFleetPayoutSlip: ใช้ค่ารอบรวมจากรายงาน");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
