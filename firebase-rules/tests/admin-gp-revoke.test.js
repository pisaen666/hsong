// Isolated logic test: extracts real functions from app.js and runs them against stubs (no Firebase, no network)
const fs = require("fs");
const vm = require("vm");
const src = fs.readFileSync(require("path").join(__dirname, "..", "..", "app.js"), "utf8");

function extract(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), depth = 0;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}" && --depth === 0) break;
    }
    return src.slice(start, i + 1);
}

const store = {};
const ctx = {
    localStorage: {
        getItem: k => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: k => { delete store[k]; }
    },
    state: { activeRider: null },
    console,
    savedRiders: null
};
ctx.saveCommunityRiders = list => { ctx.savedRiders = list; };
ctx.loadCommunityRiders = () => JSON.parse(JSON.stringify(ctx.ridersDb));
// ตัวช่วยสิทธิ์อ่านออเดอร์ (staff_keys / staff_sessions) — ทดสอบจริงอยู่ใน order-access.test.js
Object.assign(ctx, {
    staffProofFromSecret: async () => "f".repeat(64),
    saveStaffKey: () => Promise.resolve(true),
    removeStaffKey: () => { },
    openStaffSession: async () => false,
    closeStaffSession: () => { }
});
vm.createContext(ctx);
["loadSavedHubSettings", "loadMarketStallSettings", "revokeRiderAccessForApplication"].forEach(n => vm.runInContext(extract(n), ctx));

let fail = 0;
const ok = (c, msg) => { console.log((c ? "PASS " : "FAIL ") + msg); if (!c) fail++; };

// ---- GP: single source of truth = 10
ok(vm.runInContext("loadMarketStallSettings().gpRate", ctx) === 10, "GP default is 10 (no saved settings)");
store["talathub_market_stall_settings"] = JSON.stringify({ gpRate: 0, openHour: "05:00" });
ok(vm.runInContext("loadMarketStallSettings().gpRate", ctx) === 10, "stale market gpRate=0 is ignored, still 10");
ok(vm.runInContext("loadMarketStallSettings().openHour", ctx) === "05:00", "other market settings preserved");
store["hsong_hub_settings"] = JSON.stringify({ merchantGP: 0 });
ok(vm.runInContext("loadMarketStallSettings().gpRate", ctx) === 10, "hub merchantGP=0 becomes 10");
store["hsong_hub_settings"] = JSON.stringify({ merchantGP: 12 });
ok(vm.runInContext("loadMarketStallSettings().gpRate", ctx) === 12, "owner-set GP 12 is honoured everywhere");

// ---- Revoke rider access
ctx.ridersDb = [
    { id: "RD1111", name: "A", phone: "081-111-1111", accessCode: "RD1111" },
    { id: "RD2222", name: "B", phone: "082-222-2222", accessCode: "RD2222" }
];
store["talathub_logged_in_rider"] = JSON.stringify({ id: "RD1111", phone: "081-111-1111" });
ctx.state.activeRider = { id: "RD1111", phone: "0811111111", isLoggedIn: true };
const removed = vm.runInContext('revokeRiderAccessForApplication({id:"RD1111", phone:"0811111111", accessCode:"RD1111"})', ctx);
ok(removed === true, "revoke returns true when a rider was removed");
ok(ctx.savedRiders && ctx.savedRiders.length === 1 && ctx.savedRiders[0].id === "RD2222", "only the matching rider removed, other kept");
ok(!("talathub_logged_in_rider" in store), "saved login on this device cleared");
ok(ctx.state.activeRider === null, "active rider session cleared");

ctx.savedRiders = null;
const none = vm.runInContext('revokeRiderAccessForApplication({id:"RD9999", phone:"0999999999", accessCode:"RD9999"})', ctx);
ok(none === false && ctx.savedRiders === null, "no match -> nothing saved, returns false");
ok(vm.runInContext("revokeRiderAccessForApplication(null)", ctx) === false, "null app handled");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
