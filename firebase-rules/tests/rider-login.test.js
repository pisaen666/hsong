// ทดสอบล็อกอินไรเดอร์: เข้าได้ด้วยรหัส/ไอดี/เบอร์ แต่ "ชื่อ" ต้องเข้าไม่ได้ (ไม่แตะ Firebase, ใช้ข้อมูลจำลอง)
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}

const riders = [
    { id: "RD1111", name: "สมชาย ว่องไว (ชาย)", phone: "081-111-1111", accessCode: "RD1111" },
    { id: "RD2222", name: "อรทัย ใจดี (อร)", phone: "082-222-2222", accessCode: "RD2222" }
];
const apps = [
    { id: "RD3333", accessCode: "RD3333", fullName: "มานะ ขยัน", phone: "0833333333", status: "approved" },
    { id: "RD4444", accessCode: "RD4444", fullName: "ปิติ รอนาน", phone: "0844444444", status: "pending" }
];

let inputValue = "", logged = null, approvedLogin = null;
const toasts = [];
const ctx = {
    console,
    document: { getElementById: id => ({ value: inputValue, focus() { } }) },
    showToast: m => toasts.push(String(m)),
    loadCommunityRiders: () => riders,
    loadRiderApplications: () => apps,
    isOwnerSignedIn: () => false,
    loginRiderWithProfile: r => { logged = r; },
    approveAndLoginRider: id => { approvedLogin = id; }
};
vm.createContext(ctx);
vm.runInContext([fn("normalizeRiderCode"), fn("handleOnPageRiderLoginSubmit"), fn("handleRiderPhoneLoginSubmit")].join("\n"), ctx);

function tryLogin(fnName, value) {
    inputValue = value; logged = null; approvedLogin = null; toasts.length = 0;
    vm.runInContext(fnName + "()", ctx);
    return { logged, approvedLogin, toast: toasts[toasts.length - 1] };
}

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

for (const fnName of ["handleOnPageRiderLoginSubmit", "handleRiderPhoneLoginSubmit"]) {
    console.log("== " + fnName);
    ok(tryLogin(fnName, "RD1111").logged?.id === "RD1111", "รหัส RD1111 เข้าได้");
    ok(tryLogin(fnName, "rd2222").logged?.id === "RD2222", "รหัสตัวพิมพ์เล็ก rd2222 เข้าได้");
    ok(tryLogin(fnName, "081-111-1111").logged?.id === "RD1111", "เบอร์โทร (มีขีด) เข้าได้");
    ok(tryLogin(fnName, "0822222222").logged?.id === "RD2222", "เบอร์โทรไม่มีขีด เข้าได้");
    // ชื่อทุกแบบต้องเข้าไม่ได้
    for (const name of ["a", "ส", "สมชาย", "สมชาย ว่องไว (ชาย)", "สมชาย ว่องไว", "อร", "ชาย", "มานะ ขยัน", "มานะ"]) {
        const r = tryLogin(fnName, name);
        ok(!r.logged && !r.approvedLogin, "ชื่อ \"" + name + "\" เข้าไม่ได้ (" + (r.toast || "").slice(0, 40) + ")");
    }
}
console.log("== ใบสมัคร (เฉพาะทางล็อกอินด้วยรหัส/เบอร์ในหน้าต่างล็อกอิน)");
ok(tryLogin("handleRiderPhoneLoginSubmit", "RD3333").approvedLogin === "RD3333", "ใบสมัครที่อนุมัติแล้ว ใช้รหัสเข้าได้");
const p = tryLogin("handleRiderPhoneLoginSubmit", "RD4444");
ok(!p.logged && !p.approvedLogin && /รอเจ้าของอนุมัติ/.test(p.toast || ""), "ใบสมัครที่ยังรออยู่ เข้าไม่ได้ และไม่ถูกอนุมัติเอง");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
