// ค่ารอบไรเดอร์เก็บที่ฐานข้อมูลกลาง app_settings/rider_fleet (เจ้าของสั่ง 2026-09-26: ทุกเครื่องเห็นตัวเลขเดียวกัน)
// + หน้า "ตั้งค่าระบบ > ไรเดอร์" (หน้า B) ไม่มีช่องค่ารอบ/COD ที่ไม่มีใครอ่านอีกแล้ว
// ไม่แตะ Firebase จริง: ใช้ db จำลองในหน่วยความจำ
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const src = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");
const rulesTest = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "hsong-test.rules.v7.json"), "utf8")).rules;
const rulesProd = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "hsong-1f342.rules.v7.json"), "utf8")).rules;
const rulesV6 = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "hsong-1f342.rules.v6.json"), "utf8")).rules;

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
function between(a, b) {
    const s = src.indexOf(a), e = src.indexOf(b, s);
    if (s < 0 || e < 0) throw new Error("marker missing " + a);
    return src.slice(s, e + b.length);
}

// ---------- ฐานข้อมูลจำลอง ----------
let cloud = null, owner = false, writeFails = false;
const listeners = [], toasts = [], renders = [];
const db = {
    ref: p => ({
        set: v => {
            if (p !== "app_settings/rider_fleet") throw new Error("unexpected path " + p);
            if (writeFails) return Promise.reject(new Error("PERMISSION_DENIED"));
            cloud = JSON.parse(JSON.stringify(v));
            listeners.forEach(cb => cb({ val: () => cloud }));
            return Promise.resolve();
        },
        on: (ev, cb) => { listeners.push(cb); cb({ val: () => cloud }); }
    })
};
const store = {};
const inputs = {};
const ctx = {
    console, Date, JSON, Number, Math, Object, Promise, isFinite, setTimeout,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
    window: {}, db,
    isFirebaseReady: () => true,
    isOwnerSignedIn: () => owner,
    showToast: m => toasts.push(String(m)),
    renderAdminRiders: () => renders.push(1),
    document: {
        getElementById: id => (id in inputs ? { value: inputs[id] } : (id === "admin-content-riders" ? { classList: { contains: () => false } } : null))
    }
};
vm.createContext(ctx);
vm.runInContext([
    fn("loadRiderFleetSettings"),
    between("const FLEET_SETTINGS_CLOUD_PATH", "window.listenFleetSettingsFromCloud = listenFleetSettingsFromCloud;"),
    fn("saveRiderFleetSettings"), fn("fleetSettingsSavedToast"),
    fn("getRiderTripFee"), fn("_withTimeout"),
    fn("toggleRainSurcharge"), fn("saveFleetSettingsFromUI")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);
const tick = () => new Promise(r => setTimeout(r, 0));

(async () => {
    console.log("== ไฟล์กฎ v7");
    for (const [name, r] of [["hsong-test", rulesTest], ["hsong-1f342", rulesProd]]) {
        const f = r.app_settings && r.app_settings.rider_fleet;
        ok(f && f[".read"] === true, name + ": ทุกคนอ่านค่ารอบได้");
        ok(f && /auth\.uid === '/.test(f[".write"]) && !/true/.test(f[".write"]), name + ": เขียนได้เฉพาะเจ้าของ");
        ok(f && f.$other && f.$other[".validate"] === false, name + ": ห้ามช่องแปลกปลอม");
        ok(f && /newData\.val\(\) > 0/.test(f.baseFee[".validate"]), name + ": ค่ารอบต้องมากกว่า 0");
    }
    const v7 = Object.assign({}, rulesProd); delete v7.app_settings;
    ok(JSON.stringify(v7) === JSON.stringify(rulesV6), "v7 = v6 + app_settings เท่านั้น (ส่วนอื่นไม่เปลี่ยน)");

    console.log("== ค่าจากฐานข้อมูลกลางลงมาทุกเครื่อง");
    ok(run("getRiderTripFee()") === 40, "ยังไม่มีค่าไหนเลย -> 40 บาท");
    cloud = { baseFee: 55, rainSurcharge: false, rainSurchargeAmount: 15, dailyBonusTrips: 10, dailyBonusAmount: 100, maxCodLimit: 2500, updatedAt: 1 };
    owner = false;
    run("listenFleetSettingsFromCloud()");
    ok(run("getRiderTripFee()") === 55, "เครื่องลูกค้า/ไรเดอร์ (ไม่ใช่เจ้าของ) ได้ค่ารอบ 55 จากฐานข้อมูลกลาง");
    ok(!("updatedAt" in JSON.parse(store.talathub_fleet_settings)), "ไม่เก็บ updatedAt ลงสำเนาในเครื่อง (กันวาดหน้าซ้ำโดยไม่จำเป็น)");
    let r0 = renders.length;
    listeners[0]({ val: () => Object.assign({}, cloud, { baseFee: 60 }) });
    ok(run("getRiderTripFee()") === 60 && renders.length === r0 + 1, "เจ้าของเปลี่ยนจากอีกเครื่อง -> เครื่องนี้เปลี่ยนตาม + วาดหน้าแอดมินใหม่");
    r0 = renders.length;
    listeners[0]({ val: () => Object.assign({}, cloud, { baseFee: 60, updatedAt: 99 }) });
    ok(renders.length === r0, "ตัวเลขไม่เปลี่ยน (แค่เวลา) -> ไม่วาดหน้าใหม่");
    listeners[0]({ val: () => ({ baseFee: "abc", maxCodLimit: -5 }) });
    ok(run("getRiderTripFee()") === 60, "ค่าเสียจากฐานข้อมูล (ไม่ใช่ตัวเลข/ติดลบ) ถูกข้าม ใช้ค่าเดิม");

    console.log("== เจ้าของบันทึก -> ขึ้นฐานข้อมูลกลาง");
    owner = true; toasts.length = 0;
    Object.assign(inputs, { "fleet-cfg-base-fee": "65", "fleet-cfg-rain-bonus": "20", "fleet-cfg-target-trips": "12", "fleet-cfg-bonus-amount": "150", "fleet-cfg-max-cod": "3000" });
    await run("saveFleetSettingsFromUI()");
    ok(cloud.baseFee === 65 && cloud.rainSurchargeAmount === 20 && cloud.dailyBonusTrips === 12 && cloud.dailyBonusAmount === 150 && cloud.maxCodLimit === 3000, "ทุกช่องขึ้นฐานข้อมูลกลาง");
    ok(Object.keys(cloud).every(k => ["baseFee", "rainSurcharge", "rainSurchargeAmount", "dailyBonusTrips", "dailyBonusAmount", "maxCodLimit", "updatedAt"].includes(k)), "ส่งเฉพาะช่องที่กฎอนุญาต");
    ok(typeof cloud.updatedAt === "number" && typeof cloud.rainSurcharge === "boolean", "updatedAt เป็นตัวเลข, rainSurcharge เป็น true/false");
    ok(/ทุกเครื่องเห็น/.test(toasts.pop()), "ข้อความบอกว่าทุกเครื่องเห็นตัวเลขนี้");

    await run("toggleRainSurcharge()");
    ok(cloud.rainSurcharge === true && cloud.baseFee === 65, "เปิดโหมดฝนตก -> ขึ้นฐานข้อมูลกลาง ค่ารอบเดิมไม่หาย");

    console.log("== บันทึกไม่สำเร็จต้องบอกตรง ๆ");
    writeFails = true; inputs["fleet-cfg-base-fee"] = "70";
    await run("saveFleetSettingsFromUI()");
    ok(/ไม่สำเร็จ/.test(toasts.pop()) && cloud.baseFee === 65, "ฐานข้อมูลปฏิเสธ -> แจ้งว่าเครื่องอื่นยังเห็นค่าเดิม");
    writeFails = false;
    owner = false; inputs["fleet-cfg-base-fee"] = "75";
    await run("saveFleetSettingsFromUI()");
    ok(/ไม่สำเร็จ/.test(toasts.pop()) && cloud.baseFee === 65, "ไม่ใช่เจ้าของ -> ไม่ส่งขึ้นฐานข้อมูลกลาง");
    owner = true;
    for (const bad of ["0", "-5", "abc", "5000"]) {
        inputs["fleet-cfg-base-fee"] = bad; toasts.length = 0;
        await run("saveFleetSettingsFromUI()");
        ok(cloud.baseFee === 65 && /ต้องเป็นตัวเลขมากกว่า 0/.test(toasts[0] || ""), "ค่ารอบ '" + bad + "' ถูกปฏิเสธ ไม่บันทึก");
    }

    console.log("== ฐานข้อมูลกลางยังว่าง: เจ้าของส่งค่าตั้งต้นขึ้นไป");
    cloud = null; listeners.length = 0; owner = false;
    run("_fleetSettingsListening = false; listenFleetSettingsFromCloud()");
    ok(cloud === null, "คนทั่วไปเปิดเว็บ ฐานข้อมูลว่าง -> ไม่ส่งอะไรขึ้นไป");
    owner = true;
    run("listenFleetSettingsFromCloud()");
    await tick();
    ok(cloud && cloud.baseFee > 0, "เจ้าของล็อกอินภายหลัง -> ส่งค่าในเครื่องขึ้นไปเป็นค่าตั้งต้น");

    console.log("== เชื่อมกับหน้าเว็บ");
    ok(/listenFleetSettingsFromCloud\(\);/.test(fn("refreshOrderAccess")), "refreshOrderAccess เรียก listenFleetSettingsFromCloud (ทุกเครื่อง)");
    ok(/window\.goToRiderFleetSettings = goToRiderFleetSettings/.test(src), "ปุ่มไปหน้าตั้งค่าค่ารอบผูก window แล้ว");

    console.log("== หน้า B (ตั้งค่าระบบ > ไรเดอร์) ไม่มีช่องที่ไม่มีใครอ่าน");
    for (const id of ["cfg-rider-base-fare", "cfg-rider-extra-km", "cfg-rider-rain-bonus", "cfg-max-cod", "cfg-rider-cutoff"]) {
        ok(!src.includes('"' + id + '"'), "ไม่มีช่อง " + id);
    }
    ok(!/riderBaseFare:|riderExtraKm:|riderRainBonus:/.test(fn("loadSavedHubSettings")), "ค่าเริ่มต้นเก่าของหน้า B ถูกลบ");
    ok(!/roleKey === "rider"/.test(fn("saveAdminSettingsConfig")), "ตัวบันทึกหน้า B ไม่มีส่วนไรเดอร์แล้ว");
    ok(/goToRiderFleetSettings\(\)/.test(src.slice(src.indexOf('_activeSettingsSubTab === "rider"'), src.indexOf('_activeSettingsSubTab === "rider"') + 2500)), "หน้า B มีปุ่มพาไปหน้าตั้งค่าค่ารอบที่ใช้จริง");

    console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
