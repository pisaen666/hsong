// ทดสอบตรรกะฝั่งเจ้าของด้วยฐานข้อมูลจำลอง (ไม่แตะ Firebase จริง): migrate ข้อมูลเก่า, ลบรายการ, ตัวเทียบ
const fs = require("fs");
const vm = require("vm");
const src = fs.readFileSync(require("path").join(__dirname, "..", "..", "app.js"), "utf8");

function fn(name) {
    const start = src.indexOf("function " + name + "(");
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

// ---- in-memory Firebase stub
function makeDb(initial) {
    // Firebase จริงเก็บ array เป็น object คีย์ 0,1,2... (ไม่มี array จริงในต้นไม้)
    const toObj = v => Array.isArray(v) ? Object.fromEntries(v.map((x, i) => [String(i), toObj(x)])) : (v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toObj(x)])) : v);
    const root = toObj(JSON.parse(JSON.stringify(initial || {})));
    const log = [];
    const get = p => p.split("/").filter(Boolean).reduce((o, k) => (o == null ? undefined : o[k]), root);
    const setAt = (p, v) => {
        const parts = p.split("/").filter(Boolean); const last = parts.pop();
        let o = root; parts.forEach(k => { if (o[k] == null || typeof o[k] !== "object") o[k] = {}; o = o[k]; });
        if (v === null || v === undefined) delete o[last]; else o[last] = JSON.parse(JSON.stringify(v));
    };
    return {
        root, log,
        ref: p => ({
            once: async () => ({ val: () => { const v = get(p); return v === undefined ? null : JSON.parse(JSON.stringify(v)); } }),
            set: async v => { log.push(["set", p]); setAt(p, v); },
            remove: async () => { log.push(["remove", p]); setAt(p, null); },
            update: async u => { Object.entries(u).forEach(([k, v]) => { log.push([v === null ? "remove" : "set", p + "/" + k]); setAt(p + "/" + k, v); }); }
        })
    };
}

const ctx = { console, owner: true, ready: true, window: {}, setTimeout, clearTimeout };
vm.createContext(ctx);
const code = [
    fn("normalizeRiderCode"),
    src.match(/const RIDER_PRIVATE_KEYS = [^;]*;/)[0],
    fn("stripRiderPrivate"),
    src.match(/const STALL_PRIVATE_FIELDS = \[[^\]]*\];/)[0],
    fn("sanitizeStallForPublic"),
    fn("_withTimeout"),
    "function staffKeyId(s){return String(s);} function myMerchantStaffId(){return null;}",
    "function isFirebaseReady(){return ready;} function isOwnerSignedIn(){return owner;}",
    between("const _cloudBaselines = {};", "window.migrateLegacyCloudLists = migrateLegacyCloudLists;")
].join("\n");
vm.runInContext(code, ctx);
const run = (js) => vm.runInContext(js, ctx);

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

(async () => {
    // ---------- migrate: legacy array -> id keys
    ctx.db = makeDb({
        rider_applications: [{ id: "RD1", status: "approved", phone: "1" }, { id: "rd2", status: "pending", phone: "2" }],
        community_riders: [{ id: "RD1", name: "a", accessCode: "RD1", phone: "1" }],
        merchant_applications: [{ id: "APP-SHOP-1", status: "approved", stallData: { stallId: "APP-SHOP-1" } }],
        custom_market_stalls: [{ stallId: "S1", accessCode: "1" }, { stallId: "S2", accessCode: "2" }]
    });
    await run("migrateLegacyCloudLists()");
    const r = ctx.db.root;
    ok(!Array.isArray(r.rider_applications) && r.rider_applications.RD1 && r.rider_applications.RD2, "rider_applications ย้ายเป็นคีย์ id (รหัส rd2 ถูก normalize เป็น RD2)");
    ok(!("0" in r.rider_applications) && !("1" in r.rider_applications), "คีย์เก่า 0/1 ถูกลบ");
    ok(r.community_riders.RD1 && r.merchant_applications["APP-SHOP-1"] && r.custom_market_stalls.S1 && r.custom_market_stalls.S2, "อีก 3 โหนดย้ายครบ");
    ok(r.rider_applications.RD1.status === "approved" && r.rider_applications.RD2.status === "pending", "เนื้อหาไม่เปลี่ยน (สถานะยังเหมือนเดิม)");

    // ---------- migrate again = ไม่ทำอะไร (idempotent)
    ctx.db.log.length = 0;
    await run("migrateLegacyCloudLists()");
    ok(ctx.db.log.length === 0, "รันซ้ำแล้วไม่เขียนอะไรเลย (ย้ายแล้ว)");

    // ---------- คีย์ id ที่เป็นตัวเลขล้วน ต้องไม่ถูกลบผิด
    ctx.db = makeDb({ custom_market_stalls: [{ stallId: "0", accessCode: "x" }, { stallId: "S9", accessCode: "y" }] });
    await run("migrateLegacyCloudLists()");
    ok(ctx.db.root.custom_market_stalls["0"] && ctx.db.root.custom_market_stalls["0"].stallId === "0" && ctx.db.root.custom_market_stalls.S9, "แผงที่ stallId เป็น '0' ไม่ถูกลบผิด");

    // ---------- ข้อมูลเก่าและใหม่ปนกัน (ก่อนเจ้าของ migrate): ห้ามซ้ำ และรายการคีย์ id ชนะ
    const mixed = { 0: { id: "RD1", status: "approved", fullName: "เก่า" }, RD1: { id: "RD1", status: "pending", fullName: "ใหม่" }, RD5: { id: "RD5", status: "pending" } };
    const list = run("cloudValToList(" + JSON.stringify(mixed) + ", _keyOfRiderApp)");
    ok(list.length === 2 && list.find(a => a.id === "RD1").fullName === "ใหม่", "เก่า+ใหม่ปนกัน: ไม่ซ้ำ และรายการคีย์ id (ใหม่กว่า) ชนะ");

    // ---------- sync: เจ้าของลบรายการที่หายไป, ผู้ใช้ทั่วไปไม่ลบ
    ctx.db = makeDb({ community_riders: { A: { id: "A", name: "a", accessCode: "A", phone: "1" }, B: { id: "B", name: "b", accessCode: "B", phone: "2" } } });
    ctx.owner = true;
    await run("syncListToCloud('community_riders', [{id:'A',name:'a',accessCode:'A',phone:'1'}], _keyOfCommunityRider, {canCreate:true})");
    ok(!("B" in ctx.db.root.community_riders) && ("A" in ctx.db.root.community_riders), "เจ้าของ: รายการที่หายไป (B) ถูกลบ, A อยู่");
    ctx.db = makeDb({ community_riders: { A: { id: "A", name: "a", accessCode: "A", phone: "1" }, B: { id: "B", name: "b", accessCode: "B", phone: "2" } } });
    ctx.owner = false;
    await run("syncListToCloud('community_riders', [{id:'A',name:'a',accessCode:'A',phone:'1'}], _keyOfCommunityRider, {canCreate:false})");
    ok("B" in ctx.db.root.community_riders && ctx.db.log.length === 0, "ผู้ใช้ทั่วไป: ไม่ลบ B และไม่เขียนอะไร");

    // ---------- ตัวเทียบ: ไม่เขียนซ้ำ แม้คีย์เรียงต่างกัน/มีอาร์เรย์ว่าง/มี null
    ctx.db = makeDb({ rider_applications: { RD1: { id: "RD1", status: "pending", phone: "1", fullName: "x" } } });
    ctx.owner = false;
    const res = await run("syncListToCloud('rider_applications', [{fullName:'x', phone:'1', shifts:[], notes:null, status:'pending', id:'RD1'}], _keyOfRiderApp)");
    ok(res.written === 0 && !res.failed && !res.skipped && ctx.db.log.length === 0, "ข้อมูลเท่ากัน (ต่างแค่ลำดับคีย์/ค่าว่าง) → ไม่เขียน");

    // ---------- ตัวเทียบตัดข้อมูลส่วนตัวฝั่งคลาวด์: ไม่เขียนทับข้อมูลที่ติดมา
    ctx.db = makeDb({ rider_applications: { RD1: { id: "RD1", status: "pending", phone: "1", fullName: "x", address: "บ้านเลขที่ลับ" } } });
    const res2 = await run("syncListToCloud('rider_applications', [{id:'RD1', status:'pending', phone:'1', fullName:'x'}], _keyOfRiderApp)");
    ok(res2.written === 0 && !res2.failed && !res2.skipped, "คลาวด์มีที่อยู่ติดมา แต่ในเครื่องตัดออกแล้ว → ไม่ถือว่าเปลี่ยน (ไม่ลบข้อมูลส่วนตัวเอง)");

    // ---------- undefined ในข้อมูลไม่ทำให้ลูปพัง
    ctx.db = makeDb({});
    ctx.owner = true;
    const res3 = await run("syncListToCloud('merchant_applications', [{id:'M1', status:'pending', stallData:{stallId:'M1', img: undefined}}, {id:'M2', status:'pending', stallData:{stallId:'M2'}}], _keyOfMerchantApp)");
    ok(res3.written === 2 && !res3.failed && ctx.db.root.merchant_applications.M1 && ctx.db.root.merchant_applications.M2, "ค่า undefined ในรายการไม่ทำให้รายการอื่นเขียนไม่สำเร็จ");

    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
