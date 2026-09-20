// sync-firebase.js
// Script สำหรับดึงข้อมูลสด (Realtime Database) จาก Firebase ลงมาเก็บเป็นไฟล์ในเครื่อง (firebase-rtdb-export.json)
//
// ดึง "ทีละโหนด" ไม่อ่านทั้งฐานข้อมูลที่ราก เพราะกฎ Firebase ปัจจุบันไม่อนุญาตให้อ่านที่ราก
// โหนดลับ (rider_documents, rider_private) เจ้าของอ่านได้เฉพาะตอนล็อกอิน สคริปต์นี้ไม่ล็อกอินจึงข้ามโหนดเหล่านี้
//
// ใช้กับโปรเจกต์ทดสอบได้: FIREBASE_DB_URL=https://hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app node sync-firebase.js

const fs = require('fs');
const path = require('path');

const DB_BASE = (process.env.FIREBASE_DB_URL || 'https://hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app').replace(/\/+$/, '');
const OUTPUT_FILE = path.join(__dirname, 'firebase-rtdb-export.json');

// โหนดสาธารณะที่แอปใช้ (ต้องตรงกับกฎ Firebase)
const PUBLIC_NODES = [
    'orders', 'carts', 'daily_reports',
    'rider_applications', 'community_riders', 'merchant_applications',
    'custom_market_stalls', 'stall_catalog_database',
    'riders', 'rider_status', 'rider_locations', 'active_rider'
];
// โหนดลับ: ข้ามเสมอ (เจ้าของดูได้จาก Firebase Console หรือในหน้าแอดมินหลังล็อกอิน)
const PROTECTED_NODES = ['rider_documents', 'rider_private'];

async function fetchNode(node) {
    const response = await fetch(`${DB_BASE}/${node}.json`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return response.json();
}

async function syncFirebase() {
    console.log('🔄 กำลังเชื่อมต่อและดาวน์โหลดข้อมูลจาก Firebase Realtime Database...');
    console.log(`📡 ฐานข้อมูล: ${DB_BASE}`);

    const startTime = Date.now();
    const data = {};
    const failed = [];

    for (const node of PUBLIC_NODES) {
        try {
            const value = await fetchNode(node);
            if (value !== null) data[node] = value;
        } catch (error) {
            failed.push(`${node} (${error.message})`);
        }
    }

    if (failed.length === PUBLIC_NODES.length) {
        console.error('❌ ดึงข้อมูลไม่ได้เลยสักโหนด (เครือข่ายหลุด หรือกฎ Firebase หมดอายุ/ปฏิเสธการอ่าน):');
        failed.forEach(f => console.error('   - ' + f));
        process.exit(1);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ ดึงข้อมูลสำเร็จภายใน ${duration} วินาที`);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
    const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);

    console.log(`💾 บันทึกข้อมูลเรียบร้อยที่: ${OUTPUT_FILE}`);
    console.log(`📦 ขนาดไฟล์: ${sizeKb} KB`);
    console.log('\n📊 สรุปข้อมูลที่ซิงค์ลงมา:');
    for (const [key, value] of Object.entries(data)) {
        const count = (value && typeof value === 'object') ? Object.keys(value).length : 1;
        console.log(`  • ${key}: ${count} รายการ`);
    }
    console.log(`\n🔒 ข้ามโหนดลับ (ไม่ได้ดาวน์โหลด): ${PROTECTED_NODES.join(', ')}`);
    if (failed.length) {
        console.warn('\n⚠️ ดึงบางโหนดไม่สำเร็จ:');
        failed.forEach(f => console.warn('   - ' + f));
    }
}

syncFirebase();
