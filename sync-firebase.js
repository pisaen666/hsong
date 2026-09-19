// sync-firebase.js
// Script สำหรับดึงข้อมูลสด (Realtime Database) จาก Firebase ลงมาเก็บเป็นไฟล์ในเครื่อง (firebase-rtdb-export.json)

const fs = require('fs');
const path = require('path');

const FIREBASE_DB_URL = 'https://hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app/.json';
const OUTPUT_FILE = path.join(__dirname, 'firebase-rtdb-export.json');

async function syncFirebase() {
    console.log('🔄 กำลังเชื่อมต่อและดาวน์โหลดข้อมูลจาก Firebase Realtime Database...');
    console.log(`📡 URL: ${FIREBASE_DB_URL}`);
    
    const startTime = Date.now();
    try {
        const response = await fetch(FIREBASE_DB_URL);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ ดึงข้อมูลสำเร็จภายใน ${duration} วินาที`);

        const formattedJson = JSON.stringify(data, null, 2);
        fs.writeFileSync(OUTPUT_FILE, formattedJson, 'utf8');

        const stats = fs.statSync(OUTPUT_FILE);
        const sizeKb = (stats.size / 1024).toFixed(2);

        console.log(`💾 บันทึกข้อมูลเรียบร้อยที่: ${OUTPUT_FILE}`);
        console.log(`📦 ขนาดไฟล์: ${sizeKb} KB`);
        console.log('\n📊 สรุปข้อมูลที่ซิงค์ลงมา:');
        
        if (data && typeof data === 'object') {
            for (const [key, value] of Object.entries(data)) {
                const count = (value && typeof value === 'object') ? Object.keys(value).length : 1;
                console.log(`  • ${key}: ${count} รายการ`);
            }
        }
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาดในการซิงค์ข้อมูล:', error.message);
        process.exit(1);
    }
}

syncFirebase();
