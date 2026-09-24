// สร้างโฟลเดอร์เว็บทดสอบ (ชี้ไปฐานข้อมูล hsong-test เท่านั้น) จากไฟล์ในโปรเจกต์
//   node firebase-rules/tools/build-test-site.js <โฟลเดอร์ปลายทาง>
//   จากนั้น:  cd <โฟลเดอร์ปลายทาง>  แล้ว  firebase deploy --only hosting --project hsong-test
// สิ่งที่เปลี่ยนจากไฟล์จริง: (1) host ฐานข้อมูลใน app.js (2) firebase-config.js เป็นค่าของ hsong-test + UID เจ้าของทดสอบ (3) ชื่อแท็บขึ้นต้น "[ทดสอบ]"
// ค่าคอนฟิกเว็บของ Firebase ไม่ใช่ความลับ (ใส่ในเว็บอยู่แล้ว)
const fs = require("fs");
const path = require("path");

const out = process.argv[2];
if (!out) { console.error("ต้องระบุโฟลเดอร์ปลายทาง เช่น node firebase-rules/tools/build-test-site.js C:/temp/site-test"); process.exit(1); }
const root = path.join(__dirname, "..", "..");
const pub = path.join(out, "public");
fs.mkdirSync(pub, { recursive: true });

const PROD_HOST = "hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app";
const TEST_HOST = "hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app";
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(pub, f), s);

// app.js
write("app.js", read("app.js").split(PROD_HOST).join(TEST_HOST));

// index.html (ชื่อแท็บ + กันหลงเหลือ host จริง)
let html = read("index.html").split(PROD_HOST).join(TEST_HOST);
html = html.replace("<title>เฮียส่ง", "<title>[ทดสอบ] เฮียส่ง");
write("index.html", html);

// firebase-config.js (ค่าของ hsong-test)
let cfg = read("firebase-config.js")
    .replace(/apiKey: "[^"]*"/, 'apiKey: "AIzaSyBlniAAoBIqN63Bpak9_SvHEP0WF188Mtw"')
    .replace(/authDomain: "[^"]*"/, 'authDomain: "hsong-test.firebaseapp.com"')
    .replace(/databaseURL: "[^"]*"/, 'databaseURL: "https://' + TEST_HOST + '"')
    .replace(/projectId: "[^"]*"/, 'projectId: "hsong-test"')
    .replace(/storageBucket: "[^"]*"/, 'storageBucket: "hsong-test.firebasestorage.app"')
    .replace(/messagingSenderId: "[^"]*"/, 'messagingSenderId: "386167954293"')
    .replace(/appId: "[^"]*"/, 'appId: "1:386167954293:web:b4c5642716d9cfac3f513c"')
    .replace(/const OWNER_UIDS = \[[^\]]*\]/, 'const OWNER_UIDS = ["0muWz0V3goRday826zSnzNMSuHC2", "zDM4Q2uerQNheJ6cQEeJlFwUSy03"]');
write("firebase-config.js", cfg);

// ไฟล์อื่นที่เว็บใช้
["styles.css", "guide.css", "guide-rider.html", "line_oa_qr.png", "promptpay_qr.png", "qrcode_hsong.png"].forEach(f => { if (fs.existsSync(path.join(root, f))) fs.copyFileSync(path.join(root, f), path.join(pub, f)); });
fs.cpSync(path.join(root, "images"), path.join(pub, "images"), { recursive: true });

// ตั้งค่า Firebase CLI ให้ชี้ hsong-test เท่านั้น
fs.writeFileSync(path.join(out, "firebase.json"), JSON.stringify({ hosting: { public: "public" } }));
fs.writeFileSync(path.join(out, ".firebaserc"), JSON.stringify({ projects: { default: "hsong-test" } }));

// ตรวจความปลอดภัย: ต้องไม่เหลือ host จริง และต้องเป็น hsong-test
const left = ["app.js", "index.html", "firebase-config.js"].filter(f => {
    const t = fs.readFileSync(path.join(pub, f), "utf8");
    return t.includes(PROD_HOST) || t.includes('projectId: "hsong-1f342"') || t.includes('"hsong-1f342.firebaseapp.com"') || t.includes("hloZD0Flzyd0X8CCq6RuDV3GYjQ2");
});
if (left.length) { console.error("❌ ยังเหลือค่าของโปรเจกต์จริงใน:", left.join(", ")); process.exit(2); }
console.log("✅ สร้างเว็บทดสอบที่", out, "(ชี้ hsong-test เท่านั้น)");
