// firebase-config.js — TalatHub (เฮียส่ง) Firebase Realtime Database Setup
// ไฟล์นี้ initialize Firebase และ export database reference สำหรับใช้ใน app.js

const firebaseConfig = {
    apiKey: "AIzaSyAp03Q04UFsdnVxvAPS4zKT4ULHv721HAY",
    authDomain: "hsong-1f342.firebaseapp.com",
    databaseURL: "https://hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hsong-1f342",
    storageBucket: "hsong-1f342.firebasestorage.app",
    messagingSenderId: "227993192509",
    appId: "1:227993192509:web:b92e230f7331092b2c0254"
};

// Initialize Firebase (compat SDK — ใช้งานได้กับ HTML/JS ธรรมดา ไม่ต้อง bundler)
firebase.initializeApp(firebaseConfig);

// Export database reference (global variable)
const db = firebase.database();

// Firebase Authentication — ล็อกอินเจ้าของ (บัญชีเดียวใช้ทั้งหน้าแอดมิน Role 5 และฮับ Role 2)
const auth = (typeof firebase.auth === "function") ? firebase.auth() : null;

// UID ของบัญชีเจ้าของ (ดูได้ในเมนู Authentication > Users ของ Firebase Console; UID ไม่ใช่ความลับ)
// ต้องตรงกับ UID ที่ระบุในกฎ Firebase (Rules). ถ้าเว้นว่าง จะไม่มีใครล็อกอินเป็นแอดมินได้
// ⚠️ ห้ามนำโค้ดชุดนี้ขึ้น main ก่อนใส่ UID ของโปรเจกต์จริง และเปิด Authentication ในโปรเจกต์จริงแล้ว
const OWNER_UIDS = [];

console.log("✅ Firebase Realtime Database connected:", firebaseConfig.databaseURL);
