// ตรวจว่า onclick="..." ทุกปุ่มใน app.js ยังเป็น JavaScript ที่คอมไพล์ได้ (รันหลังแก้เทมเพลตจำนวนมาก)
//   ต้องมี acorn เหมือน scan-unescaped.js  รัน: node firebase-rules/tools/check-handlers.js app.js
// Compile-check every inline handler (on...="...") found in HTML templates of app.js, with sample values substituted.
// usage: node handlers.js <app.js> [--list-fail]
const fs = require("fs");
const acorn = require("acorn");
const walk = require("acorn-walk");
const src = fs.readFileSync(process.argv[2], "utf8");
const ast = acorn.parse(src, { ecmaVersion: "latest", allowHashBang: true });
const decode = s => s.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
let total = 0, bad = [];
walk.full(ast, t => {
    if (t.type !== "TemplateLiteral" || !t.expressions.length) return;
    if (!t.quasis.some(q => /<[a-zA-Z]/.test(q.value.raw))) return;
    let s = "";
    t.quasis.forEach((q, i) => {
        s += q.value.raw;
        if (i < t.expressions.length) {
            const ex = src.slice(t.expressions[i].start, t.expressions[i].end);
            s += /^jsArg\(/.test(ex) ? "&quot;abc&quot;" : "1";
        }
    });
    // sample values may sit inside handler code as quoted args in the OLD style; that's fine (they become 'abc'/1)
    for (const m of s.matchAll(/\bon[a-z]+\s*=\s*"([^"]*)"/g)) {
        total++;
        const code = decode(m[1]);
        try { new Function("event", code); } catch (e) { bad.push({ code: code.slice(0, 140), err: e.message }); }
    }
});
console.log("handlers checked:", total, " not compiling:", bad.length);
if (process.argv[3] === "--list-fail") bad.forEach(b => console.log("-", b.err, "|", b.code));
