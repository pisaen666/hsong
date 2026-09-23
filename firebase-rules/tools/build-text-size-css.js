// สร้างบล็อก CSS "ขนาดตัวอักษร ใหญ่ / ใหญ่มาก" ใส่ใน styles.css (ระหว่างเครื่องหมาย TEXT-SIZE:BEGIN/END)
//   node firebase-rules/tools/build-text-size-css.js
// เหตุผล: เว็บใช้ Tailwind และมีตัวหนังสือเล็กมากจำนวนมาก (text-[9px] text-[10px] text-[11px] text-xs ~1,300 จุด) เจ้าของสายตาไม่ดี
// วิธี: ดูว่าโค้ดใช้คลาสขนาดตัวอักษรอะไรบ้าง (รวมแบบมี sm: md: lg: xl:) แล้วสร้างกฎใหม่ที่ขยายตามตาราง
//   ปกติ = ไม่แตะ (ไม่มีคลาสบน <html>)   ใหญ่ = html.text-large (ค่าเริ่มต้น)   ใหญ่มาก = html.text-xlarge
// ถ้าเพิ่มขนาดตัวอักษรแบบใหม่ในโค้ด ให้รันสคริปต์นี้ซ้ำ
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const source = read("app.js") + read("index.html");

const NAMED = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24 };
// px เดิม -> [ใหญ่, ใหญ่มาก]
function scale(px) {
    if (px <= 9.5) return [13, 15];
    if (px <= 10.5) return [14, 16];
    if (px <= 11.5) return [14.5, 16.5];
    if (px <= 12) return [15, 17];
    if (px <= 13) return [15.5, 17.5];
    if (px <= 14) return [16, 18];
    if (px <= 15) return [16.5, 18.5];
    if (px <= 16) return [17, 19];
    if (px <= 18) return [19, 21];
    if (px <= 20) return [21, 23];
    if (px <= 24) return [25, 27];
    return null; // หัวข้อใหญ่มากไม่แตะ
}
const BREAK = { "": null, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

// รวบรวมคลาสที่ใช้จริง: [variant, sizeToken]
const used = new Map();
const re = /(?:(sm|md|lg|xl|2xl):)?text-(\[[0-9.]+px\]|xs|sm|base|lg|xl|2xl)(?![\w-])/g;
let m;
while ((m = re.exec(source))) {
    const v = m[1] || "", tok = m[2];
    used.set(v + "|" + tok, [v, tok]);
}
const px = tok => tok.startsWith("[") ? parseFloat(tok.slice(1)) : NAMED[tok];
const esc = (v, tok) => (v ? v + "\\:" : "") + "text-" + tok.replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\./g, "\\.");

function block(mode) {
    const idx = mode === "large" ? 0 : 1;
    const out = [];
    ["", "sm", "md", "lg", "xl", "2xl"].forEach(v => {
        const rules = [];
        [...used.values()].filter(([vv]) => vv === v).sort((a, b) => px(a[1]) - px(b[1])).forEach(([vv, tok]) => {
            const s = scale(px(tok));
            if (!s) return;
            rules.push(`html.text-${mode} .${esc(vv, tok)}{font-size:${s[idx]}px;line-height:1.45}`);
        });
        if (!rules.length) return;
        if (BREAK[v]) out.push(`@media (min-width:${BREAK[v]}px){\n${rules.join("\n")}\n}`);
        else out.push(rules.join("\n"));
    });
    return out.join("\n");
}

const css = `/* TEXT-SIZE:BEGIN (สร้างโดย firebase-rules/tools/build-text-size-css.js อย่าแก้มือ) */
${block("large")}
${block("xlarge")}
/* ปุ่มที่มีข้อความ (มี padding px-) ให้สูงขึ้นกดง่าย ไม่แตะปุ่มไอคอนกลม/จัตุรัส (w-8 h-8) */
html.text-large button[class*="px-"],html.text-xlarge button[class*="px-"]{min-height:38px}
html.text-xlarge button[class*="px-"]{min-height:42px}
html.text-large input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=file]),html.text-large select,html.text-xlarge input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=file]),html.text-xlarge select{min-height:40px}
/* TEXT-SIZE:END */`;

const p = path.join(root, "styles.css");
let s = fs.readFileSync(p, "utf8");
const eol = s.includes("\r\n") ? "\r\n" : "\n";
const body = css.replace(/\r?\n/g, eol);
const a = s.indexOf("/* TEXT-SIZE:BEGIN"), b = s.indexOf("/* TEXT-SIZE:END */");
if (a >= 0 && b > a) s = s.slice(0, a) + body + s.slice(b + "/* TEXT-SIZE:END */".length);
else s = s.replace(/\s*$/, "") + eol + eol + body + eol;
fs.writeFileSync(p, s);
console.log("classes used:", used.size, " css bytes:", css.length);
