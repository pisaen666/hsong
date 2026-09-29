// เจ้าของสั่ง 2026-09-28:
// 1) ข้อความเด้งอ่านไม่ทัน: ทั่วไป 6 วินาที, ข้อความสำคัญ (บันทึก / ไม่สำเร็จ) ค้างจนกดปิด ตัวใหญ่ขึ้น
// 2) เว็บทดสอบมีแถบแดง "เว็บทดสอบ" (ใส่ตอนสร้างเว็บทดสอบเท่านั้น เว็บจริงไม่มี)
// 3) ลบโฆษณาคูปองทุกจุดที่ลูกค้าเห็น
// 4) ลบโบนัสไรเดอร์ครบเป้าเที่ยว
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const os = require("os");
const { execFileSync } = require("child_process");
const root = path.join(__dirname, "..", "..");
const norm = s => s.replace(/\r\n/g, "\n");
const appSrc = norm(fs.readFileSync(path.join(root, "app.js"), "utf8"));
const html = norm(fs.readFileSync(path.join(root, "index.html"), "utf8"));
const css = norm(fs.readFileSync(path.join(root, "styles.css"), "utf8"));
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, "");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
function fn(name) {
    const start = appSrc.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = appSrc.indexOf("{", start), d = 0;
    for (; i < appSrc.length; i++) { if (appSrc[i] === "{") d++; else if (appSrc[i] === "}" && --d === 0) break; }
    return appSrc.slice(start, i + 1);
}

console.log("== 1) ข้อความเด้ง");
function makeToastCtx() {
    const els = {};
    const mkEl = () => {
        const set = new Set(["hidden"]);
        return { textContent: "", classList: { add: c => set.add(c), remove: c => set.delete(c), toggle: (c, on) => (on ? set.add(c) : set.delete(c)), contains: c => set.has(c) } };
    };
    els["toast-message"] = mkEl(); els["toast-message"].classList.remove("hidden");
    els["toast-text"] = mkEl();
    els["toast-close"] = mkEl();
    const timers = [];
    const ctx = {
        document: { getElementById: id => els[id] || null },
        setTimeout: (f, ms) => { timers.push({ f, ms }); return timers.length; },
        clearTimeout: () => { },
        window: {}, console
    };
    vm.createContext(ctx);
    vm.runInContext("let toastTimeout;\n" + appSrc.slice(appSrc.indexOf("const TOAST_SHOW_MS"), appSrc.indexOf("window.closeToast = closeToast;") + 31), ctx);
    return { ctx, els, timers };
}
let t = makeToastCtx();
t.ctx.showToast("📍 ปักหมุดแล้ว");
ok(t.els["toast-message"].classList.contains("show") && t.timers.length === 1 && t.timers[0].ms === 6000, "ข้อความทั่วไปขึ้น 6 วินาที (เดิม 2.4)");
ok(t.els["toast-close"].classList.contains("hidden") && !t.els["toast-message"].classList.contains("toast-sticky"), "ข้อความทั่วไปไม่มีปุ่มปิด");
t = makeToastCtx();
t.ctx.showToast("💾 บันทึกการตั้งค่าค่ารอบและเกณฑ์ COD สำเร็จ! (ทุกเครื่องเห็นตัวเลขนี้)");
ok(t.timers.length === 0 && t.els["toast-message"].classList.contains("toast-sticky"), "ผลการบันทึก: ค้างไว้ ไม่หายเอง");
ok(!t.els["toast-close"].classList.contains("hidden"), "ผลการบันทึก: มีปุ่มปิด");
t.ctx.closeToast();
ok(!t.els["toast-message"].classList.contains("show"), "กดปิดแล้วข้อความหายไป");
t = makeToastCtx();
t.ctx.showToast("⚠️ คืนงานไม่สำเร็จ กรุณาลองอีกครั้ง");
ok(t.timers.length === 0 && t.els["toast-message"].classList.contains("toast-sticky"), "ทำไม่สำเร็จ: ค้างไว้จนกดปิด");
t = makeToastCtx();
t.ctx.showToast("ข้อความพิเศษ", { sticky: true });
ok(t.timers.length === 0, "สั่งค้างเองได้ด้วย { sticky: true }");
ok(/id="toast-close"[^>]*onclick="closeToast\(\)"/.test(html) && /✕ ปิดข้อความนี้/.test(html), "มีปุ่ม '✕ ปิดข้อความนี้' ในกล่องข้อความ");
ok(/#toast-message\.show\.toast-sticky \{[^}]*pointer-events: auto;[^}]*font-size: 20px;/.test(css), "ข้อความสำคัญ: กดได้ ตัวใหญ่ 20px");
// เลขเวอร์ชันต้องใหม่กว่าก่อนแก้ข้อความเด้ง (10.06b_toast_wide ขึ้นไป) — ไม่ตรึงเลขตายตัว เพราะงานหลังจากนี้เลื่อนเลขต่อได้
ok(/styles\.css\?v=(10\.06b_|10\.0[7-9]|10\.[1-9]\d|1[1-9]\.)/.test(html), "เลื่อนเลขเวอร์ชัน styles.css แล้ว");
ok(/width: max-content;\s*max-width: min\(92vw, 420px\);/.test(css), "กล่องข้อความกว้างตามข้อความ (ไม่หดเหลือครึ่งจอ)");

console.log("== 2) แถบแดงเว็บทดสอบ");
ok(!/test-site-banner/.test(html), "index.html ของเว็บจริงไม่มีแถบทดสอบ");
const out = fs.mkdtempSync(path.join(os.tmpdir(), "hsong-site-"));
execFileSync(process.execPath, [path.join(root, "firebase-rules", "tools", "build-test-site.js"), out], { cwd: root, stdio: "pipe" });
const built = fs.readFileSync(path.join(out, "public", "index.html"), "utf8");
ok(/<body[^>]*><div id="test-site-banner"[^>]*>⚠️ เว็บทดสอบ — ไม่ใช่เว็บจริง/.test(built), "เว็บทดสอบมีแถบแดงเป็นสิ่งแรกในหน้า");
ok(/background:#b91c1c/.test(built) && /font-size:20px/.test(built), "แถบแดงสีเข้ม ตัวหนังสือ 20px");
ok(/<title>\[ทดสอบ\]/.test(built), "ชื่อแท็บยังขึ้นต้น [ทดสอบ]");
fs.rmSync(out, { recursive: true, force: true });

console.log("== 3) ไม่มีโฆษณาคูปองที่ลูกค้าเห็น");
const visibleHtml = htmlNoComments.replace(/<div id="checkout-coupon-card" class="hidden[\s\S]*?<\/label>\s*<\/div>\s*<\/div>/, "");
ok(!/checkout-coupon-card/.test(visibleHtml), "กล่องคูปองหน้าชำระเงิน (ซ่อนอยู่) ถูกตัดออกก่อนตรวจ");
ok(!/FRESH20|FREESHIP|HEASONG50|WELCOMESONG/.test(visibleHtml), "ไม่มีโค้ดคูปองในหน้าเว็บที่แสดง");
ok(!/คูปอง/.test(visibleHtml.replace(/<div class="hidden flex justify-between text-slate-600" id="summary-discount-row">[\s\S]*?<\/div>\s*<\/div>/, "")), "ไม่มีคำว่า 'คูปอง' ในหน้าเว็บที่แสดง (ยกเว้นแถวส่วนลดที่ซ่อนเมื่อเป็น 0)");
ok(!/banner_3\.jpg|hero_banner_3\.png/.test(htmlNoComments), "ป้ายโฆษณาคูปองทั้ง 2 ป้ายถูกลบ");
ok((htmlNoComments.match(/class="hero-dot/g) || []).length === 2 && (htmlNoComments.match(/class="market-hero-dot/g) || []).length === 2, "จุดบอกป้ายเหลือ 2 จุดเท่าจำนวนป้าย");
ok(/track\.children\.length/.test(fn("goToHeroBannerSlide")) && /marketTrack\.children\.length/.test(fn("goToMarketHeroSlide")), "ป้ายเลื่อนนับจำนวนป้ายจริง (ไม่ฝังเลข 3)");
ok(!/index === 2/.test(fn("handleHeroBannerClick")) && !/index === 2/.test(fn("handleMarketHeroClick")), "ไม่มีการกดป้ายที่ 3 แล้ว");
const loyalty = fn("updateCustomerLoyaltyBanner");
ok(!/คูปอง/.test(loyalty) && !/รับ ฿20 ฟรี/.test(loyalty), "ป้ายแต้มสะสมไม่มีคำว่าคูปอง / รับ ฿20 ฟรี");
ok(!/รับส่วนลด ฿20/.test(appSrc), "ไม่มีข้อความ 'รับส่วนลด ฿20' ในโค้ด");
ok(!/และคูปอง FRESH20/.test(appSrc) && !/คูปองถูกบันทึกในกระเป๋า/.test(appSrc), "ข้อความหลังรีวิว / แลกรางวัลไม่พูดถึงคูปอง");
ok(!/cfg-coupon-code/.test(appSrc.replace(/document\.getElementById\("cfg-coupon-code"\)/g, "")), "หน้าตั้งค่าแอดมินไม่มีช่องตั้งคูปองแล้ว (บอกว่าปิดอยู่)");

console.log("== 4) ไม่มีโบนัสครบเป้าเที่ยว");
["renderAdminRiders", "renderFleetPayoutModal", "printFleetPayoutSlip"].forEach(n =>
    ok(!/dailyBonusAmount/.test(fn(n)), n + ": ไม่บวกโบนัสครบเป้าเที่ยว"));
ok(!/fleet-cfg-target-trips|fleet-cfg-bonus-amount/.test(appSrc.replace(/\/\/.*$/gm, "")), "ช่องตั้งโบนัสเป้าเที่ยวถูกลบจากหน้าตั้งค่า");
ok(!/โบนัสเป้าหมายความขยัน/.test(appSrc), "ใบประกาศกติกาค่ารอบไม่มีโบนัสเป้าเที่ยว");

console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
