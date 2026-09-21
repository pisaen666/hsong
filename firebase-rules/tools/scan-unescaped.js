// สแกนหา ${...} ในเทมเพลต HTML ของ app.js ที่ยังไม่ผ่าน escapeHtml/jsArg (ใช้ตรวจโค้ดใหม่ก่อนขึ้นเว็บ)
//   ติดตั้งครั้งแรก:  npm i acorn acorn-walk   (ในโฟลเดอร์ชั่วคราว ไม่ต้องอยู่ในโปรเจกต์ แล้วรันด้วย NODE_PATH ชี้ไปที่ node_modules นั้น)
//   รัน:  node firebase-rules/tools/scan-unescaped.js app.js out.json
// เสร็จแล้วผลที่เหลือส่วนใหญ่เป็นตัวเลข/ค่าภายในระบบ ให้ดูเฉพาะตัวที่เป็นข้อความจากผู้ใช้ (ชื่อ ที่อยู่ เบอร์ ฯลฯ)
const fs = require("fs");
const acorn = require("acorn");
const walk = require("acorn-walk");
const file = process.argv[2] || require("path").join(__dirname, "..", "..", "app.js");
const src = fs.readFileSync(file, "utf8");
const ast = acorn.parse(src, { ecmaVersion: "latest", locations: true, allowHashBang: true });

const SAFE_CALLS = new Set(["escapeHtml", "_escHtml", "jsArg", "Number", "parseInt", "parseFloat", "String(Number", "Math.round", "Math.max", "Math.min", "Math.floor", "Math.ceil", "Math.abs"]);
const SAFE_METHODS = new Set(["toLocaleString", "toFixed", "toString(16)", "length"]);
const text = n => src.slice(n.start, n.end);
function calleeName(c) {
    if (c.type === "Identifier") return c.name;
    if (c.type === "MemberExpression" && !c.computed) return (c.object.type === "Identifier" ? c.object.name + "." : "") + c.property.name;
    return "";
}
// returns array of unsafe leaf nodes for an expression
function unsafe(n, out) {
    switch (n.type) {
        case "Literal": return;
        case "TemplateLiteral": return; // its own expressions are scanned separately
        case "CallExpression": {
            const name = calleeName(n.callee);
            if (SAFE_CALLS.has(name)) return;
            if (n.callee.type === "MemberExpression" && !n.callee.computed) {
                const m = n.callee.property.name;
                if (m === "toLocaleString" || m === "toFixed" || m === "toISOString" || m === "getTime") return;
                if (m === "join" && n.callee.object.type === "CallExpression") {
                    const inner = n.callee.object.callee;
                    if (inner.type === "MemberExpression" && inner.property.name === "map") return; // template inside map is scanned
                }
                if (m === "join" && n.callee.object.type === "ArrayExpression") return;
            }
            out.push(n); return;
        }
        case "ConditionalExpression": unsafe(n.consequent, out); unsafe(n.alternate, out); return;
        case "LogicalExpression": unsafe(n.left, out); unsafe(n.right, out); return;
        case "BinaryExpression":
            if (["-", "*", "/", "%", "**", "<", ">", "<=", ">=", "===", "!==", "==", "!="].includes(n.operator)) return;
            unsafe(n.left, out); unsafe(n.right, out); return;
        case "UnaryExpression": if (n.operator === "!" || n.operator === "-" || n.operator === "+" || n.operator === "typeof") return; out.push(n); return;
        case "ParenthesizedExpression": unsafe(n.expression, out); return;
        case "SequenceExpression": unsafe(n.expressions[n.expressions.length - 1], out); return;
        default: out.push(n);
    }
}
const looksHtml = t => t.quasis.some(q => /[<>]|=\s*["']|on\w+=/.test(q.value.raw));
const results = [];
walk.full(ast, node => {
    if (node.type !== "TemplateLiteral" || !node.expressions.length) return;
    if (!looksHtml(node)) return;
    node.expressions.forEach((ex, i) => {
        const out = [];
        unsafe(ex, out);
        out.forEach(u => {
            const t = text(u).replace(/\s+/g, " ");
            results.push({ line: u.loc.start.line, expr: t, before: node.quasis[i].value.raw.slice(-40).replace(/\s+/g, " ") });
        });
    });
});
fs.writeFileSync(process.argv[3] || "scan-out.json", JSON.stringify(results, null, 1));
console.log("unsafe-looking interpolations:", results.length);
