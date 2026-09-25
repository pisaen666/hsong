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

ok(makeCtx(undefined).getRiderTripFee() === 40, "ยังไม่เคยตั้งค่าเลย -> ค่าเริ่มต้น 40");
ok(makeCtx({ baseFee: 55 }).getRiderTripFee() === 55, "แอดมินตั้งค่ารอบเป็น 55 -> ได้ 55 ไม่ใช่ 40");
ok(makeCtx({ baseFee: 25 }).getRiderTripFee() === 25, "แอดมินตั้งค่ารอบเป็น 25 -> ได้ 25");
ok(makeCtx({ baseFee: 0 }).getRiderTripFee() === 40, "ค่ารอบตั้งเป็น 0 (ข้อมูลเสีย) -> กลับไป 40");
ok(makeCtx({ baseFee: -10 }).getRiderTripFee() === 40, "ค่ารอบติดลบ -> กลับไป 40");
ok(makeCtx({ baseFee: "abc" }).getRiderTripFee() === 40, "ค่ารอบไม่ใช่ตัวเลข -> กลับไป 40");
ok(makeCtx({}).getRiderTripFee() === 40, "ตั้งค่าไว้แต่ไม่มี baseFee -> ค่าเริ่มต้น 40");

// ── ไม่มี RIDER_TRIP_FEE (ค่าคงที่ตายตัว) หลงเหลืออยู่แล้ว ──
console.log("== เลิกใช้ค่าคงที่ตายตัว ==");
ok(!/RIDER_TRIP_FEE/.test(appSrc), "ไม่มี RIDER_TRIP_FEE (ค่าคงที่ 40 ตายตัว) เหลืออยู่ในไฟล์แล้ว");
ok(/function getRiderTripFee\(\)/.test(appSrc) && /window\.getRiderTripFee = getRiderTripFee;/.test(appSrc), "getRiderTripFee ถูกประกาศและผูก window แล้ว");

// ── จุดที่เคยฝัง 40 ตายตัว ต้องเรียก getRiderTripFee() แทนทุกจุด ──
console.log("== ทุกจุดที่เคยฝัง 40 ตายตัว ใช้ getRiderTripFee() แทนแล้ว ==");

const jobCard = fn("buildRiderJobCard");
ok(/fee:\s*getRiderTripFee\(\)/.test(jobCard), "buildRiderJobCard: ค่ารอบในใบงานย่อใช้ getRiderTripFee()");

const report = fn("aggregateDailyOperations");
ok(/const riderTripFee = getRiderTripFee\(\);/.test(report), "aggregateDailyOperations: อ่านค่ารอบจริงมาเก็บไว้ต้นฟังก์ชัน");
ok(/riderFeeEarned \+= riderTripFee;/.test(report), "aggregateDailyOperations: บวกค่ารอบต่อเที่ยวด้วยค่าจริง ไม่ใช่ += 40");
ok(!/riderFeeEarned \+= 40/.test(report), "aggregateDailyOperations: ไม่มี += 40 ฝังตายตัวเหลืออยู่");

const wallet = fn("renderRiderWallet");
ok(/getRiderTripFee\(\) : 0/.test(wallet), "renderRiderWallet: ค่ารอบเที่ยวล่าสุด (ก่อนมีรายงานจริง) ใช้ getRiderTripFee()");
ok(/trips \* getRiderTripFee\(\)/.test(wallet), "renderRiderWallet: สำรองคำนวณจากเที่ยว x ค่ารอบจริง");
ok(!/\* 40\)/.test(wallet) && !/: 40 : 0/.test(wallet), "renderRiderWallet: ไม่มี 40 ฝังตายตัวเหลืออยู่");
ok(!/>\+฿40</.test(wallet) && !/\(฿40\/รอบ\)/.test(wallet), "renderRiderWallet: ข้อความในหน้าจอไม่ฝัง 40 ตายตัว");

const complete = fn("handleRiderCompleteDelivery");
ok(!/\+฿40 ค่ารอบ/.test(complete) && /getRiderTripFee\(\)/.test(complete), "handleRiderCompleteDelivery: ข้อความแจ้งเตือนส่งสำเร็จใช้ค่ารอบจริง");

// ข้อความในรายงานสรุปยอด (หน้าจอ) และสลิปพิมพ์ ต้องไม่ฝัง ฿40 ตายตัว
ok(!/ค่ารอบ ฿40\/เที่ยว/.test(appSrc), "หัวรายงานเคลียร์เงินไรเดอร์ไม่ฝัง ฿40/เที่ยว ตายตัว");
ok(!/ค่ารอบสะสม \(\+฿40\/เที่ยว\)/.test(appSrc), "สลิปพิมพ์เคลียร์เงินไรเดอร์ไม่ฝัง +฿40/เที่ยว ตายตัว");
ok(/ค่ารอบ ฿\$\{getRiderTripFee\(\)\}\/เที่ยว/.test(appSrc), "หัวรายงานเคลียร์เงินไรเดอร์ใช้ค่ารอบจริงแล้ว");
ok(/ค่ารอบสะสม \(\+฿\$\{getRiderTripFee\(\)\}\/เที่ยว\)/.test(appSrc), "สลิปพิมพ์เคลียร์เงินไรเดอร์ใช้ค่ารอบจริงแล้ว");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
