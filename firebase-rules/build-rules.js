// สร้างไฟล์กฎ Firebase รุ่น v3 จากแม่แบบเดียว (ต่างกันแค่ UID เจ้าของของแต่ละโปรเจกต์)
//   node firebase-rules/build-rules.js
// ผลลัพธ์: hsong-test.rules.v3.json และ hsong-1f342.rules.v3.json
//   (ไฟล์ .rules.v2.json = รุ่นก่อนหน้า เก็บไว้ถอยกลับ ห้ามแก้มือ)
//
// v3 (2026-09-25) — "บัตรผ่าน" (Firebase Anonymous Auth) ทุกเครื่อง:
//   orders        : เจ้าของ + ไรเดอร์/แม่ค้าที่ล็อกอินด้วยรหัสผ่านจริง (staff) ดึงรายการทั้งหมดได้
//                   ลูกค้าอ่าน/แก้ได้เฉพาะใบที่ customerUid = uid ของตัวเอง; สร้างใหม่ต้องใส่ customerUid ของตัวเอง
//                   เปลี่ยน customerUid ไม่ได้; ลบ = เจ้าของ; เครื่องอื่นอ่านได้ถ้าลงชื่อด้วยรหัสติดตามถูก (order_viewers)
//   order_codes   : รหัสติดตาม 6 ตัว (เจ้าของอ่านได้คนเดียว) ลูกค้าเจ้าของออเดอร์เขียนได้ครั้งเดียว
//   order_viewers : <order>/<uid> = รหัสติดตาม เขียนได้เฉพาะเมื่อรหัสตรงกับ order_codes
//   carts         : carts/<uid> เครื่องนั้นอ่าน/เขียนได้คนเดียว
//   staff_keys    : ค่าพิสูจน์รหัสผ่านไรเดอร์/แม่ค้า (เจ้าของอ่าน/เขียนคนเดียว)
//   staff_sessions: staff_sessions/<uid> เขียนได้เฉพาะเมื่อค่าพิสูจน์ตรงกับ staff_keys (= รู้รหัสผ่านจริง)
//
// หลักการ v2 — "ใครก็สมัครได้ แต่อนุมัติ/สร้างรายชื่อจริง/ลบ ต้องเป็นเจ้าของ":
//   rider_applications, merchant_applications : ใครก็สร้างใบสมัครใหม่ได้ แต่ต้องเป็น pending; แก้รายการเดิมได้แต่แก้ status/รหัส/รหัสผ่าน (loginHash, loginSalt) ไม่ได้; ลบ/อนุมัติ = เจ้าของ
//   community_riders, custom_market_stalls    : สร้าง/ลบ = เจ้าของเท่านั้น; ผู้ใช้ทั่วไปแก้รายการเดิมได้ (สถานะ ตำแหน่ง เปิด-ปิดร้าน) แต่แก้รหัส/เบอร์ที่ผูกตัวตนไม่ได้
//   stall_catalog_database                    : สร้าง = เจ้าของ; แผงค้าแก้สินค้าของตัวเองได้
//   daily_reports                             : เขียน = เจ้าของ (ฮับ/แอดมิน) อ่านได้ทุกคน (แผงค้าดูยอดโอน)
//   riders rider_status rider_locations active_rider : ยังเปิด (งานรอบหน้า)
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
    // ไรเดอร์/แม่ค้าที่ล็อกอินด้วยรหัสผ่านจริง: มีบันทึกที่ staff_sessions/<uid> และค่าพิสูจน์ยังตรงกับ staff_keys
    // (เจ้าของสร้างรหัสใหม่/ถอนสิทธิ์ = staff_keys เปลี่ยน/หาย = เครื่องที่ใช้รหัสเก่าหมดสิทธิ์ทันที)
    const S = "root.child('staff_sessions/' + auth.uid + '/";
    const STAFF = "auth != null && " + S + "proof').exists() && root.child('staff_keys/' + " + S + "role').val() + '/' + " + S + "id').val()).val() === " + S + "proof').val()";
    const SELF = "auth != null && auth.uid === $uid";

    return {
        rules: {
            ".read": false,
            ".write": false,

            orders: {
                ".read": "(" + OWNER + ") || (" + STAFF + ")",
                ".write": OWNER,
                "$id": {
                    ".read": "auth != null && (data.child('customerUid').val() === auth.uid || root.child('order_viewers/' + $id + '/' + auth.uid).exists())",
                    ".write": "auth != null && newData.exists() && ((!data.exists() && newData.child('customerUid').val() === auth.uid) || (data.exists() && (data.child('customerUid').val() === auth.uid || (" + STAFF + "))))",
                    ".validate": "(" + OWNER + ") || (newData.hasChild('orderId') && (!data.exists() || newData.child('customerUid').val() === data.child('customerUid').val()))"
                }
            },

            order_codes: {
                ".read": OWNER,
                ".write": OWNER,
                "$id": {
                    ".write": "auth != null && !data.exists() && root.child('orders/' + $id + '/customerUid').val() === auth.uid",
                    ".validate": "newData.isString() && newData.val().length <= 12"
                }
            },

            order_viewers: {
                ".read": OWNER,
                ".write": OWNER,
                "$id": {
                    "$uid": {
                        ".read": SELF,
                        ".write": SELF + " && newData.exists() && root.child('order_codes/' + $id).exists() && newData.val() === root.child('order_codes/' + $id).val()"
                    }
                }
            },

            carts: {
                ".read": OWNER,
                ".write": OWNER,
                "$uid": { ".read": SELF, ".write": SELF }
            },

            staff_keys: { ".read": OWNER, ".write": OWNER },

            staff_sessions: {
                ".read": OWNER,
                ".write": OWNER,
                "$uid": {
                    ".read": SELF,
                    ".write": SELF,
                    ".validate": "newData.hasChildren(['role', 'id', 'proof']) && (newData.child('role').val() === 'rider' || newData.child('role').val() === 'merchant') && newData.child('id').isString() && newData.child('proof').isString() && root.child('staff_keys/' + newData.child('role').val() + '/' + newData.child('id').val()).val() === newData.child('proof').val()"
                }
            },

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
                    // loginHash/loginSalt = รหัสผ่านเข้าระบบของแผงค้า (เก็บเฉพาะค่าแฮช): เจ้าของเท่านั้นตั้ง/เปลี่ยนได้
                    ".write": "(" + OWNER + ") || (!data.exists() && newData.exists()) || (data.exists() && newData.exists() && " + [same("status"), same("accessCode"), same("id"), same("loginHash"), same("loginSalt")].join(" && ") + ")",
                    ".validate": "(" + OWNER + ") || (newData.child('id').val() === $id && newData.hasChildren(['id', 'stallData', 'status']) && (data.exists() || (newData.child('status').val() === 'pending' && !newData.child('accessCode').exists() && !newData.child('loginHash').exists() && !newData.child('loginSalt').exists())))"
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
                    ".write": "(" + OWNER + ") || (data.exists() && newData.exists() && " + [same("stallId"), same("accessCode"), same("loginHash"), same("loginSalt")].join(" && ") + ")"
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
    const file = path.join(__dirname, project + ".rules.v3.json");
    fs.writeFileSync(file, JSON.stringify(build(uids), null, 2) + "\n");
    console.log("wrote", path.basename(file));
});
