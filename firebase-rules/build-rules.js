// สร้างไฟล์กฎ Firebase รุ่น v2 จากแม่แบบเดียว (ต่างกันแค่ UID เจ้าของของแต่ละโปรเจกต์)
//   node firebase-rules/build-rules.js
// ผลลัพธ์: hsong-test.rules.v2.json และ hsong-1f342.rules.v2.json  (ไฟล์ .rules.json เดิมยังไม่ถูกแตะ)
//
// หลักการ v2 — "ใครก็สมัครได้ แต่อนุมัติ/สร้างรายชื่อจริง/ลบ ต้องเป็นเจ้าของ":
//   rider_applications, merchant_applications : ใครก็สร้างใบสมัครใหม่ได้ แต่ต้องเป็น pending; แก้รายการเดิมได้แต่แก้ status/รหัส/รหัสผ่านไรเดอร์ (loginHash, loginSalt) ไม่ได้; ลบ/อนุมัติ = เจ้าของ
//   community_riders, custom_market_stalls    : สร้าง/ลบ = เจ้าของเท่านั้น; ผู้ใช้ทั่วไปแก้รายการเดิมได้ (สถานะ ตำแหน่ง เปิด-ปิดร้าน) แต่แก้รหัส/เบอร์ที่ผูกตัวตนไม่ได้
//   stall_catalog_database                    : สร้าง = เจ้าของ; แผงค้าแก้สินค้าของตัวเองได้
//   daily_reports                             : เขียน = เจ้าของ (ฮับ/แอดมิน) อ่านได้ทุกคน (แผงค้าดูยอดโอน)
//   orders carts riders rider_status rider_locations active_rider : ยังเปิด (ลูกค้า/ไรเดอร์ยังไม่มี Firebase Auth) และ "ไม่หมดอายุ" แล้ว
//   rider_documents, rider_private            : เหมือนเดิม
const fs = require("fs");
const path = require("path");

const PROJECTS = {
    "hsong-test": ["0muWz0V3goRday826zSnzNMSuHC2", "zDM4Q2uerQNheJ6cQEeJlFwUSy03"],
    "hsong-1f342": ["hloZD0Flzyd0X8CCq6RuDV3GYjQ2", "DIhgzYpqR8c3m8SIBXvQ6h8PqsL2"]
};

function build(uids) {
    const OWNER = "auth != null && (" + uids.map(u => "auth.uid === '" + u + "'").join(" || ") + ")";
    const same = f => "newData.child('" + f + "').val() === data.child('" + f + "').val()";
    const open = { ".read": true, ".write": true };

    return {
        rules: {
            ".read": false,
            ".write": false,

            orders: open,
            carts: open,
            riders: open,
            rider_status: open,
            rider_locations: open,
            active_rider: open,

            daily_reports: { ".read": true, ".write": OWNER },

            rider_applications: {
                ".read": true,
                "$id": {
                    // loginHash/loginSalt = รหัสผ่านเข้าระบบของไรเดอร์ (เก็บเฉพาะค่าแฮช): เจ้าของเท่านั้นตั้ง/เปลี่ยนได้
                    ".write": "(" + OWNER + ") || (!data.exists() && newData.exists()) || (data.exists() && newData.exists() && " + [same("status"), same("accessCode"), same("id"), same("loginHash"), same("loginSalt")].join(" && ") + ")",
                    ".validate": "(" + OWNER + ") || (newData.child('id').val() === $id && newData.hasChildren(['id', 'fullName', 'phone', 'status']) && (data.exists() || (newData.child('status').val() === 'pending' && !newData.child('loginHash').exists() && !newData.child('loginSalt').exists())))"
                }
            },

            merchant_applications: {
                ".read": true,
                "$id": {
                    ".write": "(" + OWNER + ") || (!data.exists() && newData.exists()) || (data.exists() && newData.exists() && " + [same("status"), same("accessCode"), same("id")].join(" && ") + ")",
                    ".validate": "(" + OWNER + ") || (newData.child('id').val() === $id && newData.hasChildren(['id', 'stallData', 'status']) && (data.exists() || (newData.child('status').val() === 'pending' && !newData.child('accessCode').exists())))"
                }
            },

            community_riders: {
                ".read": true,
                "$id": {
                    ".write": "(" + OWNER + ") || (data.exists() && newData.exists() && " + [same("id"), same("accessCode"), same("phone"), same("loginHash"), same("loginSalt")].join(" && ") + ")"
                }
            },

            custom_market_stalls: {
                ".read": true,
                "$id": {
                    ".write": "(" + OWNER + ") || (data.exists() && newData.exists() && " + [same("stallId"), same("accessCode")].join(" && ") + ")"
                }
            },

            stall_catalog_database: {
                ".read": true,
                "$id": {
                    ".write": "(" + OWNER + ") || (data.exists() && newData.exists())"
                }
            },

            rider_documents: {
                ".read": OWNER,
                "$riderId": {
                    ".write": "(" + OWNER + ") || !data.exists()",
                    ".validate": "newData.hasChildren(['selfie','license','registration'])",
                    selfie: { ".validate": "newData.isString() && newData.val().length < 400000" },
                    license: { ".validate": "newData.isString() && newData.val().length < 400000" },
                    registration: { ".validate": "newData.isString() && newData.val().length < 400000" },
                    vehicle: { ".validate": "newData.isString() && newData.val().length < 400000" },
                    savedAt: { ".validate": "newData.isString()" },
                    "$other": { ".validate": false }
                }
            },

            rider_private: {
                ".read": OWNER,
                "$riderId": {
                    ".write": "(" + OWNER + ") || !data.exists()",
                    ".validate": "newData.hasChildren()",
                    idCard: { ".validate": "newData.isString() && newData.val().length < 2000" },
                    address: { ".validate": "newData.isString() && newData.val().length < 2000" },
                    drivingLicense: { ".validate": "newData.isString() && newData.val().length < 2000" },
                    license: { ".validate": "newData.isString() && newData.val().length < 2000" },
                    emergencyContact: { ".validate": true },
                    bankAccounts: { ".validate": true },
                    savedAt: { ".validate": "newData.isString()" },
                    "$other": { ".validate": false }
                }
            }
        }
    };
}

Object.entries(PROJECTS).forEach(([project, uids]) => {
    const file = path.join(__dirname, project + ".rules.v2.json");
    fs.writeFileSync(file, JSON.stringify(build(uids), null, 2) + "\n");
    console.log("wrote", path.basename(file));
});
