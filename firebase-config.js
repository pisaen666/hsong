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

console.log("✅ Firebase Realtime Database connected:", firebaseConfig.databaseURL);
