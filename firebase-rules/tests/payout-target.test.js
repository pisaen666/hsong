// หน้าโอนเงินให้ร้าน/ไรเดอร์: ไม่มีเลขพร้อมเพย์ = กล่องเตือน ไม่สร้าง QR ไปเบอร์สมมติ 089-123-4567 อีก (เจ้าของสั่ง 2026-09-26)
// ร้านที่ใช้บัญชีธนาคาร = แสดงเลขบัญชีให้โอนผ่านแอป (QR พร้อมเพย์ใช้กับเลขบัญชีธนาคารไม่ได้)
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const src = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8").replace(/\r\n/g, "\n");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const m = new RegExp("(async )?function " + name + "\\(").exec(src);
    if (!m) throw new Error("not found: " + name);
    let i = src.indexOf("{", m.index), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(m.index, i + 1);
}

// ---------- DOM จำลอง ----------
const els = {};
function el(id) {
    if (!els[id]) {
        const cls = new Set(id.endsWith("-target-warning") ? ["hidden"] : []);
        els[id] = {
            id, textContent: "", innerHTML: "", src: "", onerror: null,
            classList: { add: c => cls.add(c), remove: c => cls.delete(c), contains: c => cls.has(c), toggle: (c, on) => (on ? cls.add(c) : cls.delete(c)) },
            removeAttribute(a) { if (a === "src") this.src = ""; },
            set className(v) { cls.clear(); String(v).split(/\s+/).filter(Boolean).forEach(c => cls.add(c)); },
            get className() { return [...cls].join(" "); }
        };
    }
    return els[id];
}
let apps = [], riders = [];
const toasts = [];
const ctx = {
    console, JSON, Math, Number, String, Object, Array, encodeURIComponent,
    window: {}, navigator: {},
    document: { getElementById: el },
    escapeHtml: s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    showToast: m => toasts.push(String(m)),
    generatePromptPayPayload: (id, amt) => "PAYLOAD:" + id + ":" + amt,
    loadMerchantApplications: () => apps,
    loadCommunityRiders: () => riders,
    findStallInfo: (id, name) => ({ stallId: id, stallName: name || "ร้านทดสอบ", ownerName: "ป้าแดง", stallNumber: "-", phone: "" })
};
vm.createContext(ctx);
vm.runInContext([
    "let _currentPayoutStall = null, _currentRiderPayout = null, _activeReportDateKey = '2026-09-26', _currentRiderPayoutSlipBase64 = null, _currentRiderPayoutSlipNote = '';",
    "function getReportDateKey() { return '2026-09-26'; } function _loadRiderSettlementState() { return {}; }",
    fn("normalizePromptPayId"), fn("formatPromptPayId"), fn("merchantBankAccountsFor"), fn("resolveMerchantPayoutTarget"),
    fn("applyPayoutTargetToModal"), fn("loadPromptPayQrImage"),
    fn("openVendorPayoutModal"), fn("openSingleRiderPayoutModal"),
    fn("copyPayoutPromptPayNumber"), fn("copyRiderPayoutPromptPayNumber")
].join("\n"), ctx);
const run = js => vm.runInContext(js, ctx);
const reset = () => Object.keys(els).forEach(k => delete els[k]);

console.log("== รูปแบบเลขพร้อมเพย์");
ok(run("normalizePromptPayId('081-234-5678')") === "0812345678", "เบอร์มือถือมีขีด -> 10 หลัก");
ok(run("normalizePromptPayId('1-2345-67890-12-3')") === "1234567890123", "เลขบัตรประชาชน 13 หลัก");
ok(run("normalizePromptPayId('123456789012345')") === "123456789012345", "e-Wallet 15 หลัก");
for (const bad of ["", "12345", "1234567890", "08123", "-", "undefined"]) ok(run(`normalizePromptPayId(${JSON.stringify(bad)})`) === "", "ไม่รับ '" + bad + "'");

console.log("== ร้าน: ใช้บัญชีที่ร้านกรอกตอนสมัคร");
const mkApp = (stallId, sd) => ({ id: stallId, stallData: Object.assign({ stallId, stallName: "ร้าน " + stallId }, sd) });
apps = [
    mkApp("S-PP", { bankName: "พร้อมเพย์ (PromptPay)", bankAccountNo: "081-234-5678", bankAccountName: "นางแดง" }),
    mkApp("S-BANK", { bankName: "กสิกรไทย (KBank)", bankAccountNo: "123-4-56789-0", bankAccountName: "นางดำ" }),
    mkApp("S-BOTH", { bankName: "กสิกรไทย (KBank)", bankAccountNo: "1234567890", bankAccountName: "นางขาว", bankName2: "พร้อมเพย์", bankAccountNo2: "0898887777", bankAccountName2: "นางขาว" }),
    mkApp("S-NONE", { phone: "0812223333" })
];
let t = run("resolveMerchantPayoutTarget('S-PP', '', null)");
ok(t.type === "promptpay" && t.id === "0812345678", "ร้านใช้พร้อมเพย์ -> ได้เลขพร้อมเพย์");
t = run("resolveMerchantPayoutTarget('S-BANK', '', null)");
ok(t.type === "bank" && t.accountNo === "123-4-56789-0" && t.accountName === "นางดำ", "ร้านใช้บัญชีธนาคาร -> ได้เลขบัญชี + ชื่อบัญชี");
t = run("resolveMerchantPayoutTarget('S-BOTH', '', null)");
ok(t.type === "promptpay" && t.id === "0898887777", "มีทั้งบัญชีธนาคารและพร้อมเพย์ -> เลือกพร้อมเพย์ (สแกน QR ได้)");
t = run("resolveMerchantPayoutTarget('S-NONE', '', null)");
ok(t.type === "none", "มีแต่เบอร์ติดต่อ ไม่มีบัญชี -> ไม่เดาเบอร์ติดต่อเป็นพร้อมเพย์");
ok(run("resolveMerchantPayoutTarget('S-UNKNOWN', 'ไม่มี', null)").type === "none", "ร้านที่ไม่มีใบสมัครในเครื่อง -> none");
ok(run("resolveMerchantPayoutTarget('', 'ร้าน S-BANK', null)").type === "bank", "หาจากชื่อร้านได้เมื่อไม่มีรหัสร้าน");

console.log("== หน้าต่างโอนเงินให้ร้าน");
reset();
run("openVendorPayoutModal('S-PP', 'ร้าน S-PP', 900, '', 'ป้าแดง', '-', 1000, 100, 10)");
ok(el("payout-qr-section").classList.contains("hidden") === false && /promptpay\.io\/0812345678\/900/.test(el("payout-qr-image").src), "พร้อมเพย์: แสดง QR ไปเลขของร้าน ยอด 900");
ok(el("payout-promptpay-number").textContent === "081-234-5678" && el("payout-target-warning").classList.contains("hidden"), "แสดงเลขพร้อมเพย์ ไม่มีกล่องเตือน");

reset();
run("openVendorPayoutModal('S-BANK', 'ร้าน S-BANK', 500)");
ok(el("payout-qr-section").classList.contains("hidden") && !el("payout-qr-image").src, "บัญชีธนาคาร: ซ่อน QR");
ok(!el("payout-target-warning").classList.contains("hidden") && /123-4-56789-0/.test(el("payout-target-warning").innerHTML) && /นางดำ/.test(el("payout-target-warning").innerHTML), "บัญชีธนาคาร: กล่องแสดงเลขบัญชี + ชื่อบัญชี");

reset(); toasts.length = 0;
run("openVendorPayoutModal('S-NONE', 'ร้าน S-NONE', 500, '0812223333')");
const w = el("payout-target-warning");
ok(el("payout-qr-section").classList.contains("hidden") && !el("payout-qr-image").src, "ไม่มีเลข: ไม่มี QR");
ok(!w.classList.contains("hidden") && /ยังไม่มีเลขพร้อมเพย์หรือเลขบัญชี/.test(w.innerHTML) && /border-rose/.test(w.className), "ไม่มีเลข: กล่องเตือนสีแดง");
ok(el("payout-scan-hint").classList.contains("hidden"), "ไม่มีเลข: ซ่อนข้อความ 'สแกน QR ...'");
ok(!JSON.stringify(els).includes("0891234567") && !JSON.stringify(els).includes("089-123-4567"), "ไม่มีเบอร์สมมติ 089-123-4567 ที่ไหนในหน้าต่างเลย");
run("copyPayoutPromptPayNumber()");
ok(/ไม่มีเลขพร้อมเพย์ให้คัดลอก/.test(toasts.pop()), "ปุ่มคัดลอกบอกว่าไม่มีเลข");

reset();
run("openVendorPayoutModal('ร้าน S-PP', 1000, 100, 900)");
ok(/promptpay\.io\/0812345678\/900/.test(el("payout-qr-image").src), "เรียกแบบเก่า 4 ค่า (ชื่อร้าน, ยอดขาย, GP, ยอดโอน) ยังหาเลขของร้านได้");

console.log("== หน้าต่างโอนเงินให้ไรเดอร์");
riders = [{ id: "RD1", name: "สมชาย", promptPay: "0865554444", phone: "0865554444", plate: "กข 1" }, { id: "RD2", name: "สมหญิง", phone: "12", plate: "-" }];
reset();
run("openSingleRiderPayoutModal('RD1', 400, '0865554444', 'สมชาย', 'กข 1', 10, 400, 0)");
ok(/promptpay\.io\/0865554444\/400/.test(el("rider-payout-qr-image").src) && el("rider-payout-target-warning").classList.contains("hidden"), "มีเลขพร้อมเพย์: QR ปกติ");
reset(); toasts.length = 0;
run("openSingleRiderPayoutModal('RD2', 300, '', 'สมหญิง', '-', 5, 300, 0)");
ok(el("rider-payout-qr-section").classList.contains("hidden") && !el("rider-payout-qr-image").src, "ไม่มีเลข: ไม่มี QR");
ok(/ไรเดอร์คนนี้ยังไม่มีเลขพร้อมเพย์/.test(el("rider-payout-target-warning").innerHTML), "ไม่มีเลข: กล่องเตือนสีแดง");
ok(!JSON.stringify(els).includes("0891234567") && !JSON.stringify(els).includes("089-123-4567"), "ไม่มีเบอร์สมมติในหน้าต่างไรเดอร์");
run("copyRiderPayoutPromptPayNumber()");
ok(/ไม่มีเลขพร้อมเพย์ให้คัดลอก/.test(toasts.pop()), "ปุ่มคัดลอกบอกว่าไม่มีเลข");
reset();
run("openSingleRiderPayoutModal('RD9', 300, '<img src=x onerror=alert(1)>', 'x')");
ok(!/<img/.test(el("rider-payout-target-warning").innerHTML), "ข้อความในกล่องเตือนผ่าน escapeHtml");

console.log("== ปุ่ม 'QR โอน' ในตารางร้าน (แอดมิน) ใช้ยอดจริงจากรายงานประจำวัน");
vm.runInContext(fn("findVendorPayoutEntry"), ctx);
ctx._vs = [
    { stallId: "S-A", stallName: "ร้านเอ", totalAmount: 1000, gpAmount: 100, payoutAmount: 900, gpRate: 10 },
    { stallName: "ร้านไม่มีรหัส", totalAmount: 200, gpAmount: 20, payoutAmount: 180 }
];
ok(run("findVendorPayoutEntry(_vs, { stallId: 'S-A', stallName: 'ชื่ออื่น' })").payoutAmount === 900, "หาจากรหัสร้าน");
ok(run("findVendorPayoutEntry(_vs, { stallId: 'S-X', stallName: 'ร้านไม่มีรหัส' })").payoutAmount === 180, "รายการในรายงานไม่มีรหัสร้าน -> หาจากชื่อ");
ok(run("findVendorPayoutEntry(_vs, { stallId: 'S-B', stallName: 'ร้านเอ' })") === null, "ชื่อซ้ำแต่รหัสไม่ตรง -> ไม่เอายอดร้านอื่นมา");
ok(run("findVendorPayoutEntry(null, { stallId: 'S-A' })") === null && run("findVendorPayoutEntry(_vs, null)") === null, "ไม่มีข้อมูล -> null");
const roster = fn("renderAdminStalls");
ok(!/openVendorPayoutModal\([^)]*,\s*500\s*,/.test(roster), "ไม่ส่งยอดตายตัว 500 บาทแล้ว");
ok(/findVendorPayoutEntry\(vendorSettlement\.stalls, s\)/.test(roster) && /ไม่มียอดโอน/.test(roster), "ใช้ยอดจากรายงาน และแสดง 'ไม่มียอดโอน' เมื่อไม่มียอด");

console.log("== หน้าเว็บ + ไม่มีเลขสมมติเหลือในหน้าโอนเงิน");
for (const pre of ["payout", "rider-payout"]) {
    ok(html.includes(`id="${pre}-target-warning"`) && html.includes(`id="${pre}-qr-section"`), pre + ": มีกล่องเตือน + ส่วน QR ในหน้าเว็บ");
}
ok(!/089-123-4567|0891234567/.test(fn("openVendorPayoutModal") + fn("openSingleRiderPayoutModal")), "ฟังก์ชันหน้าโอนเงินไม่มีเลขสมมติ");
ok(!/id="(rider-)?payout-(phone|promptpay-number)"[^>]*>\s*089-123-4567/.test(html), "หน้าเว็บไม่มีเลขสมมติในช่องเบอร์/พร้อมเพย์");
ok(!/089-123-4567/.test(src.slice(src.indexOf("const bank = "), src.indexOf("const bank = ") + 400)), "หน้ายอดโอนของร้านเองไม่แสดงบัญชีสมมติ");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
