// TalatHub (ตลาดฮับ) - Application Core Logic with 100 Stalls Directory

// 1. Data Store: 5 Stalls per Category x 6 Products each + 3x3m Stall Profile
const MARKET_DATA = [
    // ========================================================
    // ร้านค้าหลักที่ 1 (Hub กลาง) - แผง A01 (ร้านตั้งต้นสำหรับเริ่มใส่ข้อมูลจริง)
    // ========================================================
    {
        stallId: "stall_chicken",
        stallName: "ร้านไก่สดเฮียส่ง (แผง A01)",
        stallNumber: "แผง A01",
        zone: "A",
        category: "chicken",
        stallTag: "🍗 ไก่สดอนามัย",
        dimension: "3×3 เมตร",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
        isHub: true,
        isFavorite: true,
        stallImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        ownerName: "เฮียส่ง (เจ้าของร้านไก่สด & ผู้จัดการระบบจัดส่ง)",
        phone: "089-123-4567",
        experience: "ประสบการณ์ในตลาด 15 ปี",
        highlight: "ไก่สดอนามัยชำแหละวันต่อวัน มาตรฐานฟาร์มปิด สะอาด ปลอดภัย",
        shopDescription: "จำหน่ายชิ้นส่วนไก่สดครบวงจร อกไก่ลอกหนัง น่องติดสะโพก สันใน ปีกไก่ และโครงต้มซุป ชั่งน้ำหนักแม่นยำ พร้อมบริการตัดแต่งตามสั่งและเป็น Hub ส่งฟรีรอบตลาด",
        products: [
            { id: "chk_01", name: "อกไก่สดลอกหนัง (อนามัย)", desc: "เนื้อแน่น สดใหม่ เหมาะทำคลีน", price: 85, unit: "1 กก.", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: "🌟 ขายดี" },
            { id: "chk_02", name: "น่องติดสะโพกไก่สด", desc: "นุ่ม ฉ่ำ เหมาะทอดหรือต้มซุป", price: 45, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: "🔥 สดใหม่" },
            { id: "chk_03", name: "ปีกกลางไก่สดคัดเกรด", desc: "ขนาดเสมอกัน ทอดน้ำปลาอร่อย", price: 75, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chk_04", name: "สันในไก่สดเส้นสวย", desc: "นุ่มพิเศษ ไม่ติดมัน ไขมันต่ำ", price: 50, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chk_05", name: "น่องไก่สดล้วน (ไซส์ใหญ่)", desc: "เนื้อแน่น เหมาะทำไก่นึ่งกระเทียม", price: 42, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chk_06", name: "โครงไก่สดต้มน้ำซุปหวาน", desc: "โครงไก่สด ล้างสะอาด เคี่ยวน้ำซุปหวานกลมกล่อม", price: 20, unit: "2 โครง", category: "chicken", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    }
];

// Generate mock 100 stalls for market directory
const ALL_100_STALLS = [
    ...MARKET_DATA,
    // Additional Zone A Stalls
    { stallId: "stall_a02_extra", stallName: "ไก่บ้านอินทรีย์ลุงโต้ง", stallNumber: "แผง A02", zone: "A", category: "chicken", stallTag: "🍗 ไก่บ้านพันธุ์แท้", badgeColor: "bg-orange-50 text-orange-800 border-orange-200", products: [] },
    { stallId: "stall_a03_extra", stallName: "เนื้อโคขุนโพนยางคำ บังดุล", stallNumber: "แผง A03", zone: "A", category: "chicken", stallTag: "🥩 เนื้อฮาลาล", badgeColor: "bg-orange-50 text-orange-800 border-orange-200", products: [] },
    { stallId: "stall_a04_extra", stallName: "เป็ดพะโล้แม่สายใจ", stallNumber: "แผง A04", zone: "A", category: "chicken", stallTag: "🦆 เป็ดสด/ต้ม", badgeColor: "bg-orange-50 text-orange-800 border-orange-200", products: [] },
    { stallId: "stall_a09_extra", stallName: "หมูสามชั้นทองคำ เจ๊กวง", stallNumber: "แผง A09", zone: "A", category: "pork", stallTag: "🥩 หมูสดคัดเกรด", badgeColor: "bg-pink-50 text-pink-800 border-pink-200", products: [] },

    // Additional Zone B Stalls
    { stallId: "stall_b01_extra", stallName: "ผักสวนครัวลุงสนั่น", stallNumber: "แผง B01", zone: "B", category: "veggie", stallTag: "🥬 ผักพื้นบ้าน", badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200", products: [] },
    { stallId: "stall_b02_extra", stallName: "เห็ดสามอย่างเพื่อสุขภาพ ป้าเพ็ญ", stallNumber: "แผง B02", zone: "B", category: "veggie", stallTag: "🍄 เห็ดสดทุกชนิด", badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200", products: [] },
    { stallId: "stall_b05_extra", stallName: "พริกขี้หนูสวน & มะนาวเจ๊เล็ก", stallNumber: "แผง B05", zone: "B", category: "veggie", stallTag: "🌶️ พริกหอม", badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200", products: [] },
    { stallId: "stall_b06_extra", stallName: "หน่อไม้สด & ผักกูดแม่สร้อย", stallNumber: "แผง B06", zone: "B", category: "veggie", stallTag: "🌱 ผักป่าตามฤดูกาล", badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200", products: [] },

    // Additional Zone C Stalls
    { stallId: "stall_c01_extra", stallName: "กะทิสดชาวเกาะ ลุงสมหมาย", stallNumber: "แผง C01", zone: "C", category: "curry", stallTag: "🥥 คั้นสด 100%", badgeColor: "bg-red-50 text-red-800 border-red-200", products: [] },
    { stallId: "stall_c03_extra", stallName: "หอมแดง กระเทียม กะปิระนอง ป้าแจ๋ว", stallNumber: "แผง C03", zone: "C", category: "curry", stallTag: "🧄 เครื่องครัวไทย", badgeColor: "bg-red-50 text-red-800 border-red-200", products: [] },
    { stallId: "stall_c04_extra", stallName: "เส้นก๋วยเตี๋ยวสด & วุ้นเส้นโบราณ", stallNumber: "แผง C04", zone: "C", category: "curry", stallTag: "🍜 เส้นทำวันต่อวัน", badgeColor: "bg-red-50 text-red-800 border-red-200", products: [] },

    // Additional Zone E Stalls
    { stallId: "stall_e05_extra", stallName: "ปลาหมึกย่าง & ซีฟู้ดมหาชัย", stallNumber: "แผง E05", zone: "E", category: "seafood", stallTag: "🦑 ซีฟู้ดสด", badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200", products: [] }
];

// Fill up with more stalls dynamically up to 100 stalls
for (let i = 10; i <= 25; i++) {
    ALL_100_STALLS.push({ stallId: `stall_a_${i}`, stallName: `แผงเนื้อสัตว์สด ${i}`, stallNumber: `แผง A${i}`, zone: "A", category: "chicken", stallTag: "🍗 เนื้อสด", badgeColor: "bg-slate-50 text-slate-700 border-slate-200", products: [] });
}
for (let i = 10; i <= 30; i++) {
    ALL_100_STALLS.push({ stallId: `stall_b_${i}`, stallName: `แผงผักสดอินทรีย์ ${i}`, stallNumber: `แผง B${i}`, zone: "B", category: "veggie", stallTag: "🥬 ผักสด", badgeColor: "bg-slate-50 text-slate-700 border-slate-200", products: [] });
}
for (let i = 10; i <= 25; i++) {
    ALL_100_STALLS.push({ stallId: `stall_c_${i}`, stallName: `แผงของแห้งเครื่องเทศ ${i}`, stallNumber: `แผง C${i}`, zone: "C", category: "curry", stallTag: "🌶️ ของแห้ง", badgeColor: "bg-slate-50 text-slate-700 border-slate-200", products: [] });
}
for (let i = 5; i <= 20; i++) {
    ALL_100_STALLS.push({ stallId: `stall_e_${i}`, stallName: `แผงอาหารทะเลสด ${i}`, stallNumber: `แผง E${i}`, zone: "E", category: "seafood", stallTag: "🦐 ซีฟู้ด", badgeColor: "bg-slate-50 text-slate-700 border-slate-200", products: [] });
}

// Helper: Load & Save Favorites in LocalStorage
function loadSavedFavorites() {
    try {
        const saved = localStorage.getItem("talathub_favorite_stalls");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Failed to load favorites from localStorage", e);
    }
    // Default initial 5 favorite stalls
    return ["stall_chicken"];
}

function saveFavoritesToStorage(favs) {
    try {
        localStorage.setItem("talathub_favorite_stalls", JSON.stringify(favs));
    } catch (e) {
        console.error("Failed to save favorites to localStorage", e);
    }
}

function loadSavedCustomer() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_customer");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && (parsed.phone === "081-234-5678" || parsed.identifier === "081-234-5678" || (parsed.identifier && (parsed.identifier.includes("สุรีย์") || parsed.identifier.includes("สมมุติ"))))) {
                localStorage.removeItem("talathub_logged_in_customer");
                return { isLoggedIn: false, phone: "" };
            }
            return parsed;
        }
    } catch (e) { }
    return { isLoggedIn: false, phone: "" };
}

function saveCustomerToStorage(cust) {
    try {
        localStorage.setItem("talathub_logged_in_customer", JSON.stringify(cust));
    } catch (e) { }
}

function loadSavedMerchant() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_merchant");
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return null;
}

function saveMerchantToStorage(merch) {
    try {
        if (merch) localStorage.setItem("talathub_logged_in_merchant", JSON.stringify(merch));
        else localStorage.removeItem("talathub_logged_in_merchant");
    } catch (e) { }
}

function loadSavedHub() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_hub");
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return null;
}

function saveHubToStorage(hub) {
    try {
        if (hub) localStorage.setItem("talathub_logged_in_hub", JSON.stringify(hub));
        else localStorage.removeItem("talathub_logged_in_hub");
    } catch (e) { }
}

function loadSavedAdmin() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_admin");
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return null;
}

function saveAdminToStorage(admin) {
    try {
        if (admin) localStorage.setItem("talathub_logged_in_admin", JSON.stringify(admin));
        else localStorage.removeItem("talathub_logged_in_admin");
    } catch (e) { }
}

function loadSavedRider() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_rider");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && (parsed.riderId === "rider_somchai" || !parsed.riderId || parsed.phone === "081-234-5678")) {
                parsed.phone = "081-588-7400";
            }
            return parsed;
        }
    } catch (e) { }
    return null;
}

function saveRiderToStorage(rider) {
    try {
        if (rider) localStorage.setItem("talathub_logged_in_rider", JSON.stringify(rider));
        else localStorage.removeItem("talathub_logged_in_rider");
    } catch (e) { }
}

// ==========================================
// CART & ORDER PERSISTENCE — Firebase Realtime Database + localStorage fallback
// ==========================================

// ── Helper: sanitize phone/id เพื่อใช้เป็น Firebase key (ห้ามมี . # $ [ ])
function toFirebaseKey(str) {
    return (str || "guest").replace(/[.#$\[\]]/g, "_");
}

// ── ตรวจสอบว่า Firebase พร้อมใช้งานหรือไม่
function isFirebaseReady() {
    return typeof db !== "undefined" && db !== null;
}

// ── CART: โหลดจาก localStorage (initial load; Firebase listener จะ update ทีหลัง)
function loadSavedCart() {
    try {
        const saved = localStorage.getItem("talathub_cart");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) { }
    return [];
}

// ── CART: บันทึกทั้ง localStorage (instant) และ Firebase (cross-device)
function saveCartToStorage(cart) {
    // 1. localStorage — ทำให้ UI ไม่กระตุก (ทันที)
    try {
        localStorage.setItem("talathub_cart", JSON.stringify(cart || []));
    } catch (e) { }

    // 2. Firebase — sync ข้ามอุปกรณ์
    if (isFirebaseReady() && state.customer && state.customer.isLoggedIn) {
        const customerId = toFirebaseKey(state.customer.identifier);
        db.ref(`carts/${customerId}`).set({
            items: cart || [],
            updatedAt: Date.now(),
            customerName: state.customer.identifier
        }).catch(e => console.warn("Firebase cart save failed:", e));
    }
}

// ── ORDER: โหลดจาก localStorage (initial load)
function loadSavedActiveOrder() {
    try {
        const saved = localStorage.getItem("talathub_active_order");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.orderId) {
                // ✅ ทิ้งออเดอร์ตัวอย่างเก่า เช่น #TH-4692 หรือไม่มี savedAt timestamp
                if (!parsed.savedAt || parsed.orderId === "#TH-4692") {
                    localStorage.removeItem("talathub_active_order");
                    return null;
                }
                // ทิ้งออเดอร์ที่ delivered แล้ว
                if (parsed.status === "delivered") {
                    localStorage.removeItem("talathub_active_order");
                    return null;
                }
                // ทิ้งออเดอร์ที่เก่าเกิน 24 ชั่วโมง
                if ((Date.now() - parsed.savedAt) > 86400000) {
                    localStorage.removeItem("talathub_active_order");
                    return null;
                }
                return parsed;
            }
        }
    } catch (e) { }
    return null;
}

// ✅ ล้างข้อมูลทดสอบทั้งหมด (cart + order) สำหรับเริ่มต้นใหม่

function clearAllTestData() {
    // ล้าง localStorage
    localStorage.removeItem("talathub_active_order");
    localStorage.removeItem("talathub_cart");
    localStorage.removeItem("talathub_delivery_location");

    // ล้าง Firebase orders ทั้งหมด
    if (isFirebaseReady()) {
        db.ref("orders").remove().catch(e => console.warn("Firebase clear failed:", e));
        // ล้าง cart ของ customer ปัจจุบัน
        if (state.customer && state.customer.isLoggedIn) {
            const cid = toFirebaseKey(state.customer.identifier);
            db.ref(`carts/${cid}`).remove().catch(() => {});
        }
    }

    // ล้าง state
    state.activeOrder = null;
    state.cart = [];
    state.deliveryLocation = null;

    // อัปเดต UI
    const hubBadge = document.getElementById("hub-badge-count");
    if (hubBadge) { hubBadge.classList.add("hidden"); hubBadge.textContent = ""; }
    updateDeliveryLocationUI();
    updateCartUI();
    renderCatalog();
    if (typeof renderHubPickingList === "function") renderHubPickingList();
    if (typeof renderHubSettlement === "function") renderHubSettlement();
    renderTrackingScreen();

    showToast("🗑️ ล้างข้อมูลทดสอบเรียบร้อยแล้ว! พร้อมทดสอบใหม่");
}

// ── ORDER ARCHIVE: บันทึกออเดอร์ลง talathub_order_history สำหรับคำนวณรายงานประจำวัน
function archiveOrderToHistory(order) {
    if (!order || !order.orderId) return;
    try {
        let hist = JSON.parse(localStorage.getItem("talathub_order_history") || "[]");
        const idx = hist.findIndex(o => o.orderId === order.orderId);
        const orderToSave = { ...order, savedAt: order.savedAt || Date.now() };
        if (idx >= 0) {
            hist[idx] = { ...hist[idx], ...orderToSave };
        } else {
            hist.push(orderToSave);
        }
        if (hist.length > 300) hist = hist.slice(-300);
        localStorage.setItem("talathub_order_history", JSON.stringify(hist));
    } catch (e) {
        console.warn("archiveOrderToHistory error:", e);
    }
}

// ── ORDER: บันทึกทั้ง localStorage และ Firebase
function saveActiveOrderToStorage(order) {
    // 1. localStorage
    try {
        if (order) {
            if (!order.savedAt) order.savedAt = Date.now();
            localStorage.setItem("talathub_active_order", JSON.stringify(order));
            archiveOrderToHistory(order);
        } else {
            localStorage.removeItem("talathub_active_order");
        }
    } catch (e) { }

    // 2. Firebase — push order เพื่อให้ Hub/PC เห็นทันที
    if (isFirebaseReady() && order) {
        const orderKey = toFirebaseKey(order.orderId);
        db.ref(`orders/${orderKey}`).set({
            ...order,
            savedAt: order.savedAt || Date.now(),
            status: order.status || "picking"
        }).catch(e => console.warn("Firebase order save failed:", e));
    } else if (isFirebaseReady() && !order) {
        // ไม่ลบ เพื่อให้ประวัติยังอยู่
    }
}

// ── ORDER STATUS: อัปเดต status ใน Firebase (Hub อัปเดตเพื่อให้มือถือเห็น)
function updateOrderStatusInFirebase(orderId, newStatus) {
    if (!isFirebaseReady() || !orderId) return;
    const orderKey = toFirebaseKey(orderId);
    db.ref(`orders/${orderKey}/status`).set(newStatus)
      .catch(e => console.warn("Firebase status update failed:", e));
}

// ✅ ปุ่ม "ซิงค์สด" — ดึงออเดอร์ล่าสุดจาก Firebase Cloud หรือ LocalStorage มาอัปเดตหน้าจอ Hub ทันที
async function syncLatestOrderFromCloud() {
    try {
        let syncedOrder = null;

        // 1. ตรวจสอบและดึงข้อมูลจาก Firebase Realtime Database (Cloud)
        if (isFirebaseReady()) {
            const snapshot = await db.ref("orders").limitToLast(10).once("value");
            const data = snapshot.val();
            if (data) {
                // หา order ล่าสุดที่ยังไม่ delivered และมี savedAt
                const ordersList = Object.values(data).filter(o => o && o.orderId && o.status !== "delivered");
                if (ordersList.length > 0) {
                    ordersList.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
                    syncedOrder = ordersList[0];
                }
            }
        }

        // 2. ถ้าคลาวด์ไม่มี หรือออฟไลน์ ให้ fallback มาดูที่ localStorage ของเครื่อง
        if (!syncedOrder) {
            syncedOrder = loadSavedActiveOrder();
        }

        // 3. นำข้อมูลมาอัปเดตลง State และอัปเดตหน้าจอ Hub
        if (syncedOrder && syncedOrder.orderId) {
            state.activeOrder = syncedOrder;
            try { localStorage.setItem("talathub_active_order", JSON.stringify(syncedOrder)); } catch (e) {}

            // อัปเดตหน้าจอ Hub ทันที
            if (typeof renderHubPickingList === "function") renderHubPickingList();
            if (typeof renderHubSettlement === "function") renderHubSettlement();
            
            const hubBadge = document.getElementById("hub-badge-count");
            if (hubBadge) {
                hubBadge.classList.remove("hidden");
                hubBadge.textContent = "SYNCED";
            }
            
            showToast(`✅ ซิงค์สำเร็จ! ดึงออเดอร์ ${syncedOrder.orderId} เข้าสู่ใบจัดของแล้ว`);
        } else {
            showToast("ℹ️ ระบบคลาวด์ปกติ: ยังไม่มีออเดอร์ใหม่ที่ค้างจัด");
        }
    } catch (err) {
        console.error("syncLatestOrderFromCloud error:", err);
        const localOrder = loadSavedActiveOrder();
        if (localOrder) {
            state.activeOrder = localOrder;
            if (typeof renderHubPickingList === "function") renderHubPickingList();
            if (typeof renderHubSettlement === "function") renderHubSettlement();
            showToast(`⚠️ ซิงค์ออฟไลน์: โหลดออเดอร์ ${localOrder.orderId} จากเครื่องแล้ว`);
        } else {
            showToast("⚠️ ไม่พบออเดอร์ค้างในระบบ");
        }
    }
}



function loadSavedMarketData() {
    try {
        const saved = localStorage.getItem("talathub_custom_market_stalls");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) { }
    return null;
}

function saveMarketDataToStorage() {
    try {
        localStorage.setItem("talathub_custom_market_stalls", JSON.stringify(MARKET_DATA));
    } catch (e) { }
}

// Restore saved custom stalls if available
const _savedStalls = loadSavedMarketData();
if (_savedStalls && Array.isArray(_savedStalls) && _savedStalls.length > 0) {
    MARKET_DATA.length = 0;
    _savedStalls.forEach(s => MARKET_DATA.push(s));
}

// ==========================================
// REAL GPS & DELIVERY LOCATION ENGINE
// ==========================================
const MARKET_ORIGIN = {
    lat: 13.3080,
    lng: 101.1214,
    dms: "13°18'28.8\"N 101°07'17.0\"E",
    name: "ตลาดวิศิษฐ์ชัย อ.บ้านบึง จ.ชลบุรี",
    shortName: "ตลาดวิศิษฐ์ชัย"
};

function loadSavedLocation() {
    try {
        const cust = loadSavedCustomer();
        // ถ้าผู้ใช้ยังไม่ได้ล็อกอินเป็นสมาชิก ให้เริ่มที่สถานะ "ยังไม่ได้ระบุตำแหน่งจัดส่ง" เสมอ และล้างข้อมูลพิกัดตัวอย่างเก่าออก
        if (!cust || !cust.isLoggedIn) {
            localStorage.removeItem("talathub_delivery_location");
            return null;
        }

        const saved = localStorage.getItem("talathub_delivery_location");
        if (saved) {
            const parsed = JSON.parse(saved);
            // ล้างข้อมูลตัวอย่าง/ทดสอบเดิม เช่น เทศบาลเมืองบ้านบึง หรือ คุณสุรีย์ หรือ 0.0 กม.
            if (parsed && (
                !parsed.isSet ||
                !parsed.title ||
                parsed.title.includes("เทศบาลเมืองบ้านบึง") ||
                parsed.title.includes("สุรีย์") ||
                parsed.distance === "0.0 กม."
            )) {
                localStorage.removeItem("talathub_delivery_location");
                return null;
            }
            if (parsed && parsed.isSet && parsed.title) {
                return parsed;
            }
        }
    } catch (e) { }
    return null; // Not set yet initially
}

function saveLocationToStorage(loc) {
    try {
        if (loc) localStorage.setItem("talathub_delivery_location", JSON.stringify(loc));
        else localStorage.removeItem("talathub_delivery_location");
    } catch (e) { }
}

// Haversine formula to compute true geographical distance in Kilometers
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Flat delivery fee based on true km distance from Wisit Chai Market
function calculateDeliveryFee(distanceKm) {
    if (distanceKm <= 3.0) return 20; // ฿20 within 3km in Ban Bueng town
    if (distanceKm <= 7.0) return 25; // ฿25 within 7km
    if (distanceKm <= 12.0) return 35; // ฿35 within 12km
    return 45; // ฿45 beyond 12km
}

// ==========================================
// REAL-TIME 30-MINUTE DELIVERY BATCH ENGINE
// ==========================================
function getNextDeliverySlotInfo() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const startMinutes = 6 * 60;   // 06:00 (360 mins)
    const endMinutes = 17 * 60;    // 17:00 (1020 mins)

    // Rule 1: Closed on Sunday (วันอาทิตย์ ปิดให้บริการ)
    if (day === 0) {
        return {
            isOpen: false,
            slotText: "ปิดวันอาทิตย์",
            fullText: "วันอาทิตย์ ตลาดปิดให้บริการ (เริ่มส่งอีกครั้งวันจันทร์ 06:00 น.)",
            badgeText: "⛔ ปิดทำการวันอาทิตย์",
            badgeClass: "bg-rose-600 text-white",
            subLabel: "รอบจัดส่งถัดไป:"
        };
    }

    // Rule 2: Before 06:00 AM (ก่อนเวลาทำการ)
    if (currentTotalMinutes < startMinutes) {
        const minsLeft = startMinutes - currentTotalMinutes;
        const hoursLeft = Math.floor(minsLeft / 60);
        const remMins = minsLeft % 60;
        const timeRemainingText = hoursLeft > 0 ? `อีก ${hoursLeft} ชม. ${remMins} นาที` : `อีก ${remMins} นาที`;

        return {
            isOpen: false,
            slotText: "รอบแรก 06:00 น.",
            fullText: `รอบแรก 06:00 น. (${timeRemainingText} • เริ่มส่งของเช้าตรู่)`,
            badgeText: "🌙 สั่งซื้อล่วงหน้า",
            badgeClass: "bg-amber-600 text-white",
            subLabel: "อยู่นอกเวลาทำการ (สั่งล่วงหน้ารอบ):"
        };
    }

    // Rule 3: Within Operating Hours (06:00 - 17:00 ทุก 30 นาที)
    if (currentTotalMinutes >= startMinutes && currentTotalMinutes < endMinutes) {
        let nextSlotMinutes = Math.ceil((currentTotalMinutes + 1) / 30) * 30;
        if (nextSlotMinutes > endMinutes) nextSlotMinutes = endMinutes;

        const nextSlotHour = Math.floor(nextSlotMinutes / 60);
        const nextSlotMin = nextSlotMinutes % 60;
        const timeStr = `${String(nextSlotHour).padStart(2, '0')}:${String(nextSlotMin).padStart(2, '0')} น.`;

        const minutesLeft = nextSlotMinutes - currentTotalMinutes;
        const isLastSlot = nextSlotMinutes === endMinutes;
        const note = isLastSlot ? " (รอบสุดท้ายของวันนี้! • ไรเดอร์ส่งของทุก 30 นาที)" : ` (อีก ${minutesLeft} นาที • ไรเดอร์ส่งของทุก 30 นาที)`;

        return {
            isOpen: true,
            slotText: `รอบ ${timeStr}`,
            fullText: `รอบ ${timeStr}${note}`,
            badgeText: "⚡ เปิดรับออเดอร์",
            badgeClass: "bg-emerald-600 text-white",
            subLabel: "สั่งซื้อตอนนี้ จะได้รับสินค้ารอบ:"
        };
    }

    // Rule 4: After 17:00 PM (หลังเวลาทำการ)
    const isSaturday = day === 6;
    const nextDayText = isSaturday ? "วันจันทร์ 06:00 น." : "พรุ่งนี้ 06:00 น.";

    return {
        isOpen: false,
        slotText: isSaturday ? "รอบวันจันทร์ 06:00" : "รอบเช้าพรุ่งนี้ 06:00",
        fullText: `ขณะนี้อยู่นอกเวลาการให้บริการ (เริ่มส่งรอบแรก ${nextDayText})`,
        badgeText: "🌙 นอกเวลาทำการ",
        badgeClass: "bg-slate-700 text-amber-300",
        subLabel: "อยู่นอกเวลาทำการ (สั่งล่วงหน้ารอบ):"
    };
}

function updateDeliveryLocationUI() {
    const loc = state.deliveryLocation;
    const slotInfo = getNextDeliverySlotInfo();

    // 1. Top Navbar Selected Address Preview
    const topAddressPreview = document.getElementById("selected-address-preview");
    if (topAddressPreview) {
        if (loc && loc.isSet) {
            if (loc.houseNumber) {
                const shortSoi = loc.soiRoad ? ` ${loc.soiRoad}` : "";
                const shortSub = loc.subdistrict ? ` (${loc.subdistrict.split(" ")[0]})` : "";
                topAddressPreview.textContent = `${loc.houseNumber}${shortSoi}${shortSub}`;
            } else {
                topAddressPreview.textContent = loc.title;
            }
        } else {
            topAddressPreview.textContent = "แตะระบุที่อยู่จัดส่ง";
        }
    }

    // 2. Top Navbar Delivery Slot Badge
    const topSlotText = document.getElementById("top-delivery-slot-text");
    if (topSlotText) topSlotText.textContent = slotInfo.slotText;

    // 3. Welcome Banner Location Card
    const modeBadge = document.getElementById("location-detection-mode-badge");
    const welcomeLocTitle = document.getElementById("welcome-location-title");
    const welcomeDistText = document.getElementById("welcome-distance-text");
    const welcomeFeeText = document.getElementById("welcome-fee-text");
    const welcomeSublabel = document.getElementById("welcome-location-sublabel");

    if (loc && loc.isSet) {
        if (modeBadge) modeBadge.textContent = loc.isRealGPS ? "🛰️ พิกัดจริงของคุณ (GPS / หมุดแผนที่)" : "📍 พิกัดจัดส่งที่ระบุไว้";
        if (welcomeSublabel) welcomeSublabel.textContent = loc.landmark ? `จุดสังเกต: ${loc.landmark}` : "ที่อยู่จัดส่งของคุณ:";
        if (welcomeLocTitle) welcomeLocTitle.textContent = loc.title;
        if (welcomeDistText) welcomeDistText.textContent = loc.distance || "0.8 กม.";
        if (welcomeFeeText) welcomeFeeText.textContent = `฿${loc.fee || 20}`;
    } else {
        if (modeBadge) modeBadge.textContent = "📍 ยังไม่ได้ระบุตำแหน่งจัดส่ง";
        if (welcomeSublabel) welcomeSublabel.textContent = "ตำแหน่งจัดส่งของคุณ:";
        if (welcomeLocTitle) welcomeLocTitle.textContent = "กรุณาระบุตำแหน่งจัดส่งของคุณ (หรือแตะหาพิกัดจริง)";
        if (welcomeDistText) welcomeDistText.textContent = "แตะหาพิกัดจริง";
        if (welcomeFeeText) welcomeFeeText.textContent = "เริ่มต้น ฿20";
    }

    // Delivery Slot & Schedule Banner
    const welcomeNextSlot = document.getElementById("welcome-next-slot-text");
    if (welcomeNextSlot) welcomeNextSlot.textContent = slotInfo.fullText;

    const welcomeSlotSublabel = document.getElementById("welcome-slot-sublabel");
    if (welcomeSlotSublabel) welcomeSlotSublabel.textContent = slotInfo.subLabel;

    const welcomeBadge = document.getElementById("welcome-slot-status-badge");
    if (welcomeBadge) {
        welcomeBadge.textContent = slotInfo.badgeText;
        welcomeBadge.className = `text-[9px] font-extrabold px-2 py-1 rounded-md shrink-0 whitespace-nowrap shadow-xs ${slotInfo.badgeClass}`;
    }

    // 4. Update Checkout View Delivery Fee & Address
    const checkoutFeeElem = document.getElementById("checkout-delivery-fee");
    if (checkoutFeeElem) checkoutFeeElem.textContent = `฿${(loc && loc.fee) ? loc.fee : 20}`;

    const checkoutAddrTitle = document.getElementById("checkout-address-title");
    const checkoutAddrDetail = document.getElementById("checkout-address-detail");
    if (checkoutAddrTitle) {
        if (loc && loc.isSet) {
            checkoutAddrTitle.textContent = loc.houseNumber ? `${loc.houseNumber} ${loc.soiRoad || ''}`.trim() : loc.title;
        } else {
            checkoutAddrTitle.textContent = "กรุณาระบุที่อยู่จัดส่งของคุณ";
        }
    }
    if (checkoutAddrDetail) {
        if (loc && loc.isSet) {
            const landmarkPart = loc.landmark ? ` • จุดสังเกต: ${loc.landmark}` : "";
            checkoutAddrDetail.textContent = `${loc.subdistrict ? loc.subdistrict + ' • ' : ''}ห่างจากตลาดวิศิษฐ์ชัย ${loc.distance}${landmarkPart}`;
        } else {
            checkoutAddrDetail.textContent = "แตะเพื่อเลือกหรือระบุพิกัดจัดส่ง";
        }
    }

    const deliveryNoteInput = document.getElementById("delivery-note-input");
    if (deliveryNoteInput && (!deliveryNoteInput.value || deliveryNoteInput.value.trim() === "") && loc && loc.landmark) {
        deliveryNoteInput.value = loc.landmark;
    }

    // 5. Update Location Modal Summary Preview if modal exists
    updateModalAddressPreview();
}

// Real-time clock update for delivery slots every 30 seconds
if (typeof window !== "undefined") {
    if (window._deliverySlotTimer) clearInterval(window._deliverySlotTimer);
    window._deliverySlotTimer = setInterval(updateDeliveryLocationUI, 30000);
}

// ==========================================
// LEAFLET MAP & PINPOINT LOCATION ENGINE (แบบ Grab / LINE MAN / 7-11)
// ==========================================
// INTERACTIVE LEAFLET MAP LOCATION PICKER (SATELLITE & STREET)
// ==========================================
let locationPickerMap = null;
let locationPickerMarker = null;
let currentMapLayerType = "satellite"; // "satellite" or "street" (default: ภาพถ่ายดาวเทียมจริง)
let streetTileLayer = null;
let satelliteTileLayer = null;
let currentPickerCoords = {
    lat: MARKET_ORIGIN.lat,
    lng: MARKET_ORIGIN.lng
};

function setMapLayerType(type) {
    currentMapLayerType = type;
    if (locationPickerMap) {
        if (type === "satellite") {
            if (streetTileLayer && locationPickerMap.hasLayer(streetTileLayer)) {
                locationPickerMap.removeLayer(streetTileLayer);
            }
            if (satelliteTileLayer && !locationPickerMap.hasLayer(satelliteTileLayer)) {
                satelliteTileLayer.addTo(locationPickerMap);
            }
        } else {
            if (satelliteTileLayer && locationPickerMap.hasLayer(satelliteTileLayer)) {
                locationPickerMap.removeLayer(satelliteTileLayer);
            }
            if (streetTileLayer && !locationPickerMap.hasLayer(streetTileLayer)) {
                streetTileLayer.addTo(locationPickerMap);
            }
        }
    }
    updateMapLayerButtons();
}

function updateMapLayerButtons() {
    const btnSat = document.getElementById("map-btn-satellite");
    const btnStr = document.getElementById("map-btn-street");
    if (!btnSat || !btnStr) return;

    if (currentMapLayerType === "satellite") {
        btnSat.className = "px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all bg-emerald-600 text-white shadow-xs cursor-pointer";
        btnStr.className = "px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
    } else {
        btnSat.className = "px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
        btnStr.className = "px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all bg-emerald-600 text-white shadow-xs cursor-pointer";
    }
}
window.setMapLayerType = setMapLayerType;
window.updateMapLayerButtons = updateMapLayerButtons;

function initLocationPickerMap(lat, lng) {
    currentPickerCoords.lat = lat;
    currentPickerCoords.lng = lng;

    const mapContainer = document.getElementById("location-leaflet-map");
    if (!mapContainer) return;

    if (typeof L === "undefined") {
        console.warn("Leaflet library not loaded yet.");
        return;
    }

    if (!locationPickerMap) {
        try {
            locationPickerMap = L.map("location-leaflet-map", {
                zoomControl: true,
                attributionControl: false
            }).setView([lat, lng], 17);

            // 1. Google Satellite Hybrid: ภาพถ่ายดาวเทียมจริงความคมชัดสูง พร้อมชื่อถนน/ซอยภาษาไทย
            satelliteTileLayer = L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains: ["mt0", "mt1", "mt2", "mt3"]
            });

            // 2. OpenStreetMap: แผนที่ถนนมาตรฐาน
            streetTileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19
            });

            // กำหนดให้เริ่มต้นด้วยภาพดาวเทียมจริง
            if (currentMapLayerType === "satellite") {
                satelliteTileLayer.addTo(locationPickerMap);
            } else {
                streetTileLayer.addTo(locationPickerMap);
            }

            // Custom Leaflet Pin Marker ที่สว่าง โดดเด่น ชัดเจนมาก บนภาพดาวเทียม
            const markerIcon = L.divIcon({
                className: "custom-map-pin",
                html: `<div style="position:relative;transform:translate(-50%,-100%);cursor:grab;">
                    <div style="background:linear-gradient(135deg, #ef4444, #b91c1c);color:#fff;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,0.6);border:3px solid #ffffff;font-size:20px;">
                        📍
                    </div>
                    <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:14px;height:6px;background:rgba(0,0,0,0.5);border-radius:50%;filter:blur(1px);"></div>
                </div>`,
                iconSize: [38, 38],
                iconAnchor: [19, 38]
            });

            locationPickerMarker = L.marker([lat, lng], {
                draggable: true,
                icon: markerIcon
            }).addTo(locationPickerMap);

            // On pin dragged by user (Just like Grab pin adjustment)
            locationPickerMarker.on("dragend", function (e) {
                const pos = locationPickerMarker.getLatLng();
                onMapCoordinatesChanged(pos.lat, pos.lng, true);
            });

            // On map clicked by user
            locationPickerMap.on("click", function (e) {
                locationPickerMarker.setLatLng(e.latlng);
                onMapCoordinatesChanged(e.latlng.lat, e.latlng.lng, true);
            });
        } catch (e) {
            console.error("Leaflet init error:", e);
        }
    } else {
        try {
            locationPickerMap.setView([lat, lng], 17);
            if (locationPickerMarker) locationPickerMarker.setLatLng([lat, lng]);
            setTimeout(() => {
                if (locationPickerMap) locationPickerMap.invalidateSize();
            }, 200);
        } catch (e) { }
    }

    updateMapLayerButtons();
    onMapCoordinatesChanged(lat, lng, false);
}

// Called whenever coordinates change (via drag, click, GPS, or shortcut)
async function onMapCoordinatesChanged(lat, lng, shouldReverseGeocode) {
    currentPickerCoords.lat = lat;
    currentPickerCoords.lng = lng;

    const latEl = document.getElementById("modal-map-lat");
    const lngEl = document.getElementById("modal-map-lng");
    if (latEl) latEl.textContent = lat.toFixed(4);
    if (lngEl) lngEl.textContent = lng.toFixed(4);

    const distKm = calculateDistanceKm(MARKET_ORIGIN.lat, MARKET_ORIGIN.lng, lat, lng);
    const fee = calculateDeliveryFee(distKm);

    const distEl = document.getElementById("modal-gps-dist");
    const feeEl = document.getElementById("modal-gps-fee");
    if (distEl) distEl.textContent = `${distKm.toFixed(1)} กม.`;
    if (feeEl) feeEl.textContent = `฿${fee}`;

    const testMapsBtn = document.getElementById("modal-test-maps-btn");
    if (testMapsBtn) {
        testMapsBtn.href = `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
    }

    updateModalAddressPreview();

    if (shouldReverseGeocode) {
        await reverseGeocodeCoordinates(lat, lng);
    }
}

// Reverse Geocode to auto-fill subdistrict, district, province, and road
async function reverseGeocodeCoordinates(lat, lng) {
    let subdistrictStr = "";
    let roadStr = "";
    let landmarkStr = "";

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { headers: { "Accept-Language": "th,en" }, signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
            const data = await res.json();
            if (data && data.address) {
                const addr = data.address;

                const isLandmark = data.class && !["highway", "boundary", "place", "landuse"].includes(data.class);
                landmarkStr = isLandmark ? (data.name || "") : (addr.amenity || addr.shop || addr.office || "");

                const roadFromRoot = (data.class === "highway" && data.name) ? data.name : "";
                const soi = addr.alley || addr.lane || "";
                const road = roadFromRoot || addr.road || addr.pedestrian || addr.footway || "";
                roadStr = soi && road ? `ซอย${soi.replace(/^ซอย/i, "")} ${road}` : (soi || road);

                const subdistrict = addr.subdistrict || addr.quarter || addr.neighbourhood || addr.suburb || addr.village || addr.town || "";
                const district = addr.district || addr.county || addr.city || addr.municipality || "";
                const province = addr.province || addr.state || "";

                const parts = [];
                if (subdistrict) parts.push(`ต.${subdistrict.replace(/^ต\./, "").replace(/^ตำบล/, "")}`);
                if (district) parts.push(`อ.${district.replace(/^อ\./, "").replace(/^อำเภอ/, "")}`);
                if (province) parts.push(`จ.${province.replace(/^จ\./, "").replace(/^จังหวัด/, "")}`);
                subdistrictStr = parts.join(", ");
            }
        }
    } catch (e) {
        console.warn("Nominatim reverse geocode error:", e);
    }

    // Fallback: BigDataCloud
    if (!subdistrictStr) {
        try {
            const controller2 = new AbortController();
            const timeoutId2 = setTimeout(() => controller2.abort(), 3000);
            const res2 = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`,
                { signal: controller2.signal }
            );
            clearTimeout(timeoutId2);
            if (res2.ok) {
                const data2 = await res2.json();
                let sub = data2.locality || "";
                let dis = data2.city || "";
                let prov = data2.principalSubdivision || "";
                if (data2.localityInfo && data2.localityInfo.informative) {
                    data2.localityInfo.informative.forEach(item => {
                        if (item.name && item.name.includes("ตำบล")) sub = item.name;
                        else if (item.name && item.name.includes("อำเภอ")) dis = item.name;
                        else if (item.name && item.name.includes("จังหวัด")) prov = item.name;
                    });
                }
                const parts = [];
                if (sub) parts.push(sub);
                if (dis) parts.push(dis);
                if (prov) parts.push(prov);
                subdistrictStr = parts.join(", ");
            }
        } catch (e2) {
            console.warn("BigDataCloud fallback error:", e2);
        }
    }

    updateModalAddressPreview();
}

// Live update address preview text inside modal
function updateModalAddressPreview() {
    const houseVal = (document.getElementById("input-addr-house")?.value || "").trim();
    const soiVal = (document.getElementById("input-addr-soi")?.value || "").trim();
    const subVal = (document.getElementById("input-addr-subdistrict")?.value || "").trim();
    const landVal = (document.getElementById("input-addr-landmark")?.value || "").trim();

    const parts = [];
    if (houseVal) parts.push(houseVal);
    if (soiVal) parts.push(soiVal);
    if (subVal) parts.push(subVal);

    const addrText = document.getElementById("modal-gps-address-text");
    const readyBadge = document.getElementById("modal-gps-ready-badge");

    if (parts.length > 0) {
        if (addrText) {
            addrText.textContent = parts.join(", ");
            addrText.className = "font-extrabold text-slate-900 text-xs leading-snug";
        }
        if (readyBadge) {
            readyBadge.textContent = "พร้อมส่ง";
            readyBadge.className = "text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full shadow-xs";
        }
    } else if (state.deliveryLocation && state.deliveryLocation.isSet && state.deliveryLocation.houseNumber) {
        if (addrText) {
            addrText.textContent = state.deliveryLocation.title || "-";
            addrText.className = "font-extrabold text-slate-900 text-xs leading-snug";
        }
        if (readyBadge) {
            readyBadge.textContent = "พร้อมส่ง";
            readyBadge.className = "text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full shadow-xs";
        }
    } else {
        if (addrText) {
            addrText.textContent = "-";
            addrText.className = "font-medium text-slate-400 text-xs leading-snug";
        }
        if (readyBadge) {
            readyBadge.textContent = "รอระบุที่อยู่";
            readyBadge.className = "text-[10px] bg-slate-400 text-white font-bold px-2 py-0.5 rounded-full shadow-xs";
        }
    }

    const landPreview = document.getElementById("modal-gps-landmark-preview");
    if (landPreview) {
        landPreview.textContent = landVal ? `จุดสังเกต: ${landVal}` : "จุดสังเกต: -";
        landPreview.className = landVal ? "text-[10px] text-amber-800 font-bold" : "text-[10px] text-slate-400 font-bold";
    }
}

// Attach live input listeners so user typing reflects immediately
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        ["input-addr-house", "input-addr-soi", "input-addr-subdistrict", "input-addr-landmark"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener("input", updateModalAddressPreview);
        });
    });
}

function openLocationModal() {
    updateDeliveryLocationUI();
    document.getElementById("location-modal").classList.remove("hidden");

    const loc = state.deliveryLocation;
    const initialLat = (loc && loc.lat) ? Number(loc.lat) : MARKET_ORIGIN.lat;
    const initialLng = (loc && loc.lng) ? Number(loc.lng) : MARKET_ORIGIN.lng;

    // Populate existing values into form fields (if previously set by user)
    const houseInput = document.getElementById("input-addr-house");
    const soiInput = document.getElementById("input-addr-soi");
    const subInput = document.getElementById("input-addr-subdistrict");
    const landInput = document.getElementById("input-addr-landmark");

    if (loc && loc.isSet) {
        if (houseInput) houseInput.value = loc.houseNumber || "";
        if (soiInput) soiInput.value = loc.soiRoad || "";
        if (subInput) subInput.value = loc.subdistrict || "";
        if (landInput) landInput.value = loc.landmark || "";
    } else {
        if (houseInput) houseInput.value = "";
        if (soiInput) soiInput.value = "";
        if (subInput) subInput.value = "";
        if (landInput) landInput.value = "";
    }

    // Initialize or resize Leaflet Map
    setTimeout(() => {
        initLocationPickerMap(initialLat, initialLng);
    }, 150);

    updateModalAddressPreview();
}

function closeLocationModal() {
    document.getElementById("location-modal").classList.add("hidden");
}

function detectCurrentLocationGPS() {
    openLocationModal();

    const radar = document.getElementById("gps-searching-indicator");
    const btnLabel = document.getElementById("gps-button-label");

    if (radar) radar.classList.remove("hidden");
    if (btnLabel) btnLabel.textContent = "🛰️ กำลังค้นหาสัญญาณดาวเทียม GPS ละเอียด...";

    showToast("🛰️ กำลังค้นหาพิกัด GPS จริงจากชิปมือถือ/คอมพิวเตอร์...");

    if (navigator.geolocation) {
        let hasResolved = false;
        const timer = setTimeout(() => {
            if (!hasResolved) {
                hasResolved = true;
                fallbackToIPLocation(onGPSResolved);
            }
        }, 9000);

        function onGPSResolved(lat, lng, accuracy, sourceName) {
            if (radar) radar.classList.add("hidden");
            if (btnLabel) btnLabel.textContent = "🛰️ เลื่อนหมุดมาที่ GPS จริงของอุปกรณ์ปัจจุบัน";

            if (locationPickerMap && locationPickerMarker) {
                locationPickerMap.setView([lat, lng], 17);
                locationPickerMarker.setLatLng([lat, lng]);
            }
            onMapCoordinatesChanged(lat, lng, true);

            const distKm = calculateDistanceKm(MARKET_ORIGIN.lat, MARKET_ORIGIN.lng, lat, lng);
            const fee = calculateDeliveryFee(distKm);
            showToast(`📍 พบพิกัด GPS สำเร็จ! (${sourceName}) ห่างจากตลาด ${distKm.toFixed(1)} กม. • โปรดระบุบ้านเลขที่/ซอย`);
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                if (hasResolved) return;
                hasResolved = true;
                clearTimeout(timer);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const acc = position.coords.accuracy || 10;
                onGPSResolved(lat, lng, acc, "GPS ดาวเทียมมือถือ");
            },
            function (geoError) {
                if (hasResolved) return;
                hasResolved = true;
                clearTimeout(timer);
                console.warn("Browser GPS unavailable/denied, trying IP Geolocation...", geoError);
                fallbackToIPLocation(onGPSResolved);
            },
            {
                enableHighAccuracy: true,
                timeout: 9000,
                maximumAge: 15000
            }
        );
    } else {
        fallbackToIPLocation((lat, lng, acc, src) => {
            if (locationPickerMap && locationPickerMarker) {
                locationPickerMap.setView([lat, lng], 16);
                locationPickerMarker.setLatLng([lat, lng]);
            }
            onMapCoordinatesChanged(lat, lng, true);
        });
    }
}

async function fallbackToIPLocation(callback) {
    const radar = document.getElementById("gps-searching-indicator");
    const btnLabel = document.getElementById("gps-button-label");

    // Provider 1: ipwho.is
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const response = await fetch("https://ipwho.is/", { cache: "no-cache", signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
            const data = await response.json();
            if (data && data.success && data.latitude && data.longitude) {
                const cityName = data.city || data.region || "ชลบุรี";
                callback(data.latitude, data.longitude, 500, `IP เครือข่าย: ${cityName}`);
                return;
            }
        }
    } catch (e) { }

    // Provider 2: freeipapi.com
    try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 2500);
        const response2 = await fetch("https://freeipapi.com/api/json", { cache: "no-cache", signal: controller2.signal });
        clearTimeout(timeoutId2);
        if (response2.ok) {
            const data2 = await response2.json();
            if (data2 && data2.latitude && data2.longitude) {
                callback(data2.latitude, data2.longitude, 1000, "IP เครือข่าย");
                return;
            }
        }
    } catch (e2) { }

    // Default Fallback to Market Area
    if (radar) radar.classList.add("hidden");
    if (btnLabel) btnLabel.textContent = "🛰️ เลื่อนหมุดมาที่ GPS จริงของอุปกรณ์ปัจจุบัน";
    callback(13.3105, 101.1150, 50, "พิกัดย่านชุมชนบ้านบึง");
}

// Confirm and save granular delivery address (แบบ Grab / LINE MAN / 7-11)
function saveGranularDeliveryAddress() {
    const houseInput = document.getElementById("input-addr-house");
    const soiInput = document.getElementById("input-addr-soi");
    const subInput = document.getElementById("input-addr-subdistrict");
    const landInput = document.getElementById("input-addr-landmark");

    const house = houseInput ? houseInput.value.trim() : "";
    const soi = soiInput ? soiInput.value.trim() : "";
    const subdistrict = subInput ? subInput.value.trim() : "";
    const landmark = landInput ? landInput.value.trim() : "";

    const lat = currentPickerCoords.lat || MARKET_ORIGIN.lat;
    const lng = currentPickerCoords.lng || MARKET_ORIGIN.lng;
    const distKm = calculateDistanceKm(MARKET_ORIGIN.lat, MARKET_ORIGIN.lng, lat, lng);
    const fee = calculateDeliveryFee(distKm);

    // Build comprehensive deliverable address string
    const parts = [];
    if (house) parts.push(house);
    if (soi) parts.push(soi);
    if (subdistrict) parts.push(subdistrict);

    let fullTitle = parts.join(", ");
    if (!fullTitle) {
        fullTitle = `พิกัด GPS (${lat.toFixed(4)}, ${lng.toFixed(4)}) อ.บ้านบึง`;
    }

    state.deliveryLocation = {
        title: fullTitle,
        fullAddress: fullTitle,
        houseNumber: house,
        soiRoad: soi,
        subdistrict: subdistrict,
        landmark: landmark,
        detail: `ห่างจากตลาดวิศิษฐ์ชัย ${distKm.toFixed(1)} กม. • ค่าส่ง ฿${fee}`,
        distance: `${distKm.toFixed(1)} กม.`,
        distFromMarketText: `ห่างจากตลาดวิศิษฐ์ชัย ${distKm.toFixed(1)} กม.`,
        fee: fee,
        lat: lat,
        lng: lng,
        isRealGPS: true,
        isSet: true
    };

    saveLocationToStorage(state.deliveryLocation);
    updateDeliveryLocationUI();
    closeLocationModal();

    showToast(`✅ บันทึกที่อยู่สำเร็จ! ไรเดอร์จะนำทาง GPS ถึงหน้าบ้านคุณได้ทันที (ค่าส่ง ฿${fee})`);
}

// Quick neighborhood shortcut selector
function selectQuickLocation(name, soi, subdistrict, lat, lng) {
    const houseInput = document.getElementById("input-addr-house");
    const soiInput = document.getElementById("input-addr-soi");
    const subInput = document.getElementById("input-addr-subdistrict");
    const landInput = document.getElementById("input-addr-landmark");

    if (soiInput) soiInput.value = soi || "";
    if (subInput) subInput.value = subdistrict || "";
    if (landInput) landInput.value = `ใกล้${name}`;

    if (locationPickerMap && locationPickerMarker) {
        locationPickerMap.setView([lat, lng], 16);
        locationPickerMarker.setLatLng([lat, lng]);
    }

    onMapCoordinatesChanged(lat, lng, false);
    showToast(`📍 ปักหมุดย่าน "${name}" แล้ว - โปรดระบุบ้านเลขที่เพื่อความแม่นยำ`);

    if (houseInput && !houseInput.value) {
        houseInput.focus();
    }
}

// Backward-compatible selectSavedLocation
function selectSavedLocation(title, distance, fee, lat, lng) {
    selectQuickLocation(title, "", "ต.บ้านบึง อ.บ้านบึง จ.ชลบุรี", lat || 13.3080, lng || 101.1214);
}

function applyManualCustomLocation() {
    saveGranularDeliveryAddress();
}

// Copy GPS Coordinates for Rider
function copyRiderGPSCoords() {
    const coordsEl = document.getElementById("rider-gps-coords");
    const text = coordsEl ? coordsEl.textContent.trim() : "";
    if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`📋 คัดลอกพิกัด GPS "${text}" สำเร็จ`);
        }).catch(() => {
            showToast(`📍 พิกัด: ${text}`);
        });
    } else {
        showToast(`📍 พิกัด: ${text}`);
    }
}

// 2. Application Reactive State
const state = {
    screenMode: (function() {
        try {
            const saved = localStorage.getItem("hsong_screen_mode");
            if (saved) return saved;
            return (typeof window !== "undefined" && window.innerWidth >= 1024) ? "pc" : "mobile";
        } catch (e) {
            return "pc";
        }
    })(),
    currentRole: "customer",
    currentScreen: "market",
    currentCategoryFilter: "all", // 'all' | 'chicken' | 'veggie' | 'pork' | 'curry' | 'seafood'
    currentSingleStall: null,     // null or stallId
    currentDirectoryZone: "all",
    searchQuery: "",
    favorites: loadSavedFavorites(),     // Persistent favorite stalls list
    customer: loadSavedCustomer(),       // Logged in customer session
    activeMerchant: loadSavedMerchant(), // Logged in merchant session
    activeCoupon: { code: "FRESH20", discount: 20, desc: "ส่วนลด ฿20 สั่งของสดรอบถัดไป" }, // ✅ เริ่มต้นตรงกับ radio FRESH20 ในหน้า checkout
    deliveryLocation: loadSavedLocation(), // Active delivery location
    cart: loadSavedCart(),               // ✅ โหลดตะกร้าจาก localStorage
    activeOrder: loadSavedActiveOrder()  // ✅ โหลด active order จาก localStorage
};

// ✅ อัปเดตแถบติดตามออเดอร์สดบนหน้าหลัก (Home Screen) และปุ่มเมนูด้านล่าง
function updateHomeActiveOrderBanner() {
    const banner = document.getElementById("home-active-order-banner");
    const navBadge = document.getElementById("nav-tracking-badge");
    const order = state.activeOrder;
    const isCustomerLoggedIn = state.customer && state.customer.isLoggedIn;

    // ถ้าไม่มีออเดอร์ หรือออเดอร์ส่งเสร็จแล้ว หรือลูกค้าไม่ได้เข้าสู่ระบบ ให้ซ่อนแถบทันที
    if (!order || !order.orderId || order.status === "delivered" || !isCustomerLoggedIn) {
        if (banner) banner.classList.add("hidden");
        if (navBadge) navBadge.classList.add("hidden");
        return;
    }

    // แสดง Badge สีแดง LIVE ที่ปุ่ม "ติดตามส่ง" เมนูด้านล่าง
    if (navBadge) {
        navBadge.classList.remove("hidden");
        navBadge.textContent = "LIVE";
    }

    // แสดง Floating Banner บนหน้าตลาดสด
    if (banner) {
        banner.classList.remove("hidden");
        const idEl = document.getElementById("home-active-order-id");
        const statusEl = document.getElementById("home-active-order-status");

        if (idEl) idEl.textContent = order.orderId;

        const refund = order.refundCashTotal || 0;
        let statusText = "📋 กำลังจัดเตรียมของสดในตลาด";
        if (order.status === "delivering") statusText = "🛵 ไรเดอร์กำลังเดินทางนำส่ง";

        let refundTag = "";
        if (refund > 0) {
            refundTag = ` • <strong class="text-amber-300 font-black">✉️ มีซองเงินทอน ฿${refund}</strong>`;
        }

        if (statusEl) {
            statusEl.innerHTML = `${statusText}${refundTag}`;
        }
    }
}

// ✅ จัดการ Deep Link สำหรับการติดตามสถานะออเดอร์สด (เช่น ลิงก์ที่ส่งไปใน LINE)
async function handleTrackingDeepLink() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let trackId = urlParams.get("track") || urlParams.get("order");
        if (!trackId && window.location.hash.startsWith("#track")) {
            const parts = window.location.hash.split("=");
            if (parts.length > 1) trackId = parts[1];
        }

        if (trackId) {
            trackId = decodeURIComponent(trackId).trim();
            const cleanKey = trackId.replace(/^#/, '');

            // 1. ถ้ามีใน state.activeOrder อยู่แล้ว
            if (state.activeOrder && state.activeOrder.orderId && 
                (state.activeOrder.orderId === trackId || state.activeOrder.orderId.replace(/^#/, '') === cleanKey)) {
                // ข้อมูลพร้อมแล้ว
            } else if (isFirebaseReady()) {
                // 2. ดึงจาก Firebase Cloud
                try {
                    const snap = await db.ref(`orders/${toFirebaseKey(trackId)}`).once("value");
                    let orderData = snap.val();
                    if (!orderData) {
                        const snap2 = await db.ref(`orders/${toFirebaseKey("#" + cleanKey)}`).once("value");
                        orderData = snap2.val();
                    }
                    if (orderData && orderData.orderId) {
                        state.activeOrder = orderData;
                        try { localStorage.setItem("talathub_active_order", JSON.stringify(orderData)); } catch(e) {}
                    }
                } catch(e) {
                    console.warn("Firebase deep link load error:", e);
                }
            }

            // นำลูกค้าไปที่หน้า Tracking ทันที
            switchRole("customer");
            goToTrackingScreen();
            
            // เลื่อนหน้าจอไปที่แบนเนอร์เงินทอนหรือสถานะ
            setTimeout(() => {
                const refundBanner = document.getElementById("tracking-refund-banner");
                if (refundBanner && !refundBanner.classList.contains("hidden")) {
                    refundBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);

            showToast(`📦 เปิดหน้าติดตามออเดอร์ ${trackId} ให้เรียบร้อยแล้ว`);
            return;
        }
    } catch (e) {
        console.warn("handleTrackingDeepLink failed", e);
    }

    // ถ้าไม่มี trackId แต่มี active order ค้างอยู่ ให้อัปเดตแถบติดตามหน้าแรก
    updateHomeActiveOrderBanner();
}

// 3. Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateDeliveryLocationUI();
    renderAuthHeaderButtons();
    renderFavoriteStallsBar();
    renderCatalog();
    updateCartUI();
    renderTrackingScreen();
    renderDirectoryList();
    updateHomeActiveOrderBanner();
    handleTrackingDeepLink();

    // ✅ Cross-tab sync (same browser): ฟัง storage event
    window.addEventListener("storage", (event) => {
        if (event.key === "talathub_cart" && event.newValue !== null) {
            try {
                const newCart = JSON.parse(event.newValue);
                if (Array.isArray(newCart)) {
                    state.cart = newCart;
                    updateCartUI();
                    renderCatalog();
                    if (state.currentScreen === "checkout") renderCheckoutPage();
                }
            } catch (e) { }
        }
        if (event.key === "talathub_logged_in_customer" && event.newValue !== null) {
            try {
                const newCust = JSON.parse(event.newValue);
                if (newCust) { state.customer = newCust; renderAuthHeaderButtons(); }
            } catch (e) { }
        }
    });

    // ✅ Firebase Real-time Listeners — sync ข้ามเครือข่ายและอุปกรณ์
    if (isFirebaseReady()) {

        // 1. ฟังออเดอร์ใหม่ทั้งหมด (Hub/PC จะเห็นทันทีที่มือถือสั่งซื้อ)
        db.ref("orders").on("child_added", (snapshot) => {
            const newOrder = snapshot.val();
            if (!newOrder || !newOrder.orderId) return;

            // รับเฉพาะออเดอร์ใหม่ (ภายใน 30 วินาที) เพื่อไม่ให้ trigger ตอน page load
            const isRecent = newOrder.savedAt && (Date.now() - newOrder.savedAt) < 30000;
            if (!isRecent) return;

            // อัปเดต state
            state.activeOrder = newOrder;
            try { localStorage.setItem("talathub_active_order", JSON.stringify(newOrder)); } catch(e) {}

            // อัปเดต UI (Hub badge + เสียง + picking list)
            const hubBadge = document.getElementById("hub-badge-count");
            if (hubBadge) { hubBadge.classList.remove("hidden"); hubBadge.textContent = "NEW"; }
            if (typeof renderHubPickingList === "function") renderHubPickingList();
            if (typeof renderHubDeliveryView === "function") renderHubDeliveryView();
            renderTrackingScreen();
            updateHomeActiveOrderBanner();
            playOrderAlertSound();
            showToast(`🔔 ออเดอร์ใหม่ ${newOrder.orderId} เข้ามา! ฿${newOrder.grandTotal || newOrder.total}`);
        });

        // 2. ฟัง order status update (มือถือลูกค้าจะเห็นสถานะ picking→delivering→delivered ทันที)
        db.ref("orders").on("child_changed", (snapshot) => {
            const updatedOrder = snapshot.val();
            if (!updatedOrder || !updatedOrder.orderId) return;

            // ถ้า order นี้คือ order ที่กำลัง active อยู่
            if (state.activeOrder && state.activeOrder.orderId === updatedOrder.orderId) {
                const oldStatus = state.activeOrder.status;
                const oldRefund = state.activeOrder.refundCashTotal || 0;
                state.activeOrder = { ...state.activeOrder, ...updatedOrder };
                try { localStorage.setItem("talathub_active_order", JSON.stringify(state.activeOrder)); } catch(e) {}

                // แสดงสถานะใหม่บน tracking screen และหน้าหลัก
                if (state.currentScreen === "tracking") renderTrackingScreen();
                updateHomeActiveOrderBanner();

                if ((updatedOrder.refundCashTotal || 0) > oldRefund) {
                    showToast(`✉️ แจ้งเตือน: มีการคืนเงินสดใส่ซอง ฿${updatedOrder.refundCashTotal}! แตะดูสถานะจัดส่งได้เลย`);
                } else if (updatedOrder.status === "delivering" && oldStatus !== "delivering") {
                    showToast("🛵 ไรเดอร์ออกเดินทางแล้ว! กำลังมาส่งของที่บ้านคุณ");
                } else if (updatedOrder.status === "delivered" && oldStatus !== "delivered") {
                    showToast("✅ จัดส่งสำเร็จแล้ว! ขอบคุณที่ใช้บริการเฮียส่ง 🙏");
                }
            }
        });

        console.log("🔥 Firebase real-time listeners active");
    } else {
        console.warn("⚠️ Firebase not ready, using localStorage only");
    }
});




function goToHomePage() {
    switchRole("customer");
    goToMarketScreen();
    filterByCategory("all");
    clearSearchInput();
    state.currentSingleStall = null;
    const singleBanner = document.getElementById("single-stall-banner");
    if (singleBanner) singleBanner.classList.add("hidden");
    renderFavoriteStallsBar();
    renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("🏠 ยินดีต้อนรับสู่ เฮียส่ง (หน้าหลัก)");
}

function goToMarketScreen() {
    state.currentScreen = "market";
    document.getElementById("screen-market-home").classList.remove("hidden");
    document.getElementById("screen-checkout").classList.add("hidden");
    document.getElementById("screen-tracking").classList.add("hidden");
    updateHomeActiveOrderBanner();
}

function goToCheckoutScreen() {
    state.currentScreen = "checkout";
    document.getElementById("screen-market-home").classList.add("hidden");
    document.getElementById("screen-checkout").classList.remove("hidden");
    document.getElementById("screen-tracking").classList.add("hidden");
    renderCheckoutPage();
}

function goToTrackingScreen() {
    state.currentScreen = "tracking";
    document.getElementById("screen-market-home").classList.add("hidden");
    document.getElementById("screen-checkout").classList.add("hidden");
    document.getElementById("screen-tracking").classList.remove("hidden");
    renderTrackingScreen();
}

function switchHubTab(tabName) {
    const tabs = ["picking", "settlement", "monitor", "report"];
    tabs.forEach(t => {
        const btn = document.getElementById(`hub-tab-${t}`);
        const content = document.getElementById(`hub-content-${t}`);
        const isActive = t === tabName;
        if (btn) {
            btn.className = isActive
                ? "font-bold text-emerald-700 border-b-2 border-emerald-600 pb-1 whitespace-nowrap px-1 flex items-center gap-1"
                : "font-medium text-slate-500 pb-1 hover:text-slate-800 whitespace-nowrap px-1 flex items-center gap-1";
        }
        if (content) {
            if (isActive) content.classList.remove("hidden");
            else content.classList.add("hidden");
        }
    });

    if (tabName === "monitor") {
        renderHubMonitorBoard();
        startMonitorAutoRefresh();
    } else {
        stopMonitorAutoRefresh();
    }

    if (tabName === "report") {
        renderHubDailyReport();
    }
}

// ==========================================
// HUB ORDER STATUS MONITOR BOARD
// ==========================================

// Status config: สี / ไอคอน / label / ลำดับความสำคัญ
const ORDER_STATUS_CONFIG = {
    picking:    { label: "รอจัดของ",      icon: "📋", color: "bg-amber-100 text-amber-800 border-amber-300",   dot: "bg-amber-400",   priority: 1 },
    delivering: { label: "กำลัง dispatch", icon: "📦", color: "bg-blue-100 text-blue-800 border-blue-300",     dot: "bg-blue-500",    priority: 2 },
    dispatched: { label: "รอไรเดอร์รับ",   icon: "⚠️", color: "bg-rose-100 text-rose-800 border-rose-300",    dot: "bg-rose-500",    priority: 3 },
    on_the_way: { label: "กำลังนำส่ง",    icon: "🛵", color: "bg-sky-100 text-sky-800 border-sky-300",        dot: "bg-sky-500",     priority: 4 },
    delivered:  { label: "ส่งสำเร็จ",     icon: "✅", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500", priority: 5 },
};

const DISPATCH_TIMEOUT_MS = 5 * 60 * 1000; // ⚠️ alert ถ้า dispatched นานเกิน 5 นาที
let _monitorRefreshTimer = null;
let _monitorLastRefresh = null;

function renderHubMonitorBoard() {
    const container = document.getElementById("hub-content-monitor");
    if (!container) return;

    // รวบรวม orders จากทุกแหล่ง (localStorage + state)
    const allOrders = _collectAllOrders();
    const now = Date.now();

    // ── KPI Summary ───────────────────────────────────────────────────────────
    const counts = { picking: 0, delivering: 0, dispatched: 0, on_the_way: 0, delivered: 0 };
    allOrders.forEach(o => {
        const s = o.status || "picking";
        if (counts[s] !== undefined) counts[s]++;
    });

    const stuckOrders = allOrders.filter(o =>
        o.status === "dispatched" &&
        o.dispatchedAt &&
        (now - o.dispatchedAt) > DISPATCH_TIMEOUT_MS
    );

    // อัปเดต alert badge บนแท็บ
    updateMonitorAlertBadge(stuckOrders.length);

    // ── Render HTML ───────────────────────────────────────────────────────────
    const lastRefreshStr = _monitorLastRefresh
        ? new Date(_monitorLastRefresh).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
        : "--:--";

    let html = `
    <div class="p-3 space-y-3 text-xs">

        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h3 class="font-extrabold text-slate-800 text-sm">📊 ติดตามออเดอร์วันนี้</h3>
                <p class="text-slate-400 text-[10px]">อัปเดตล่าสุด: ${lastRefreshStr} น.</p>
            </div>
            <button onclick="renderHubMonitorBoard()" class="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-xl active:scale-95 transition-all shadow-sm">
                <span class="material-symbols-outlined text-sm">refresh</span>
                <span>Refresh</span>
            </button>
        </div>

        <!-- KPI Bar -->
        <div class="grid grid-cols-5 gap-1.5">
            ${_renderKpiCard("รอจัดของ", counts.picking, "bg-amber-50 border-amber-200 text-amber-700", "📋")}
            ${_renderKpiCard("กำลังส่ง", counts.delivering, "bg-blue-50 border-blue-200 text-blue-700", "📦")}
            ${_renderKpiCard("รอไรเดอร์", counts.dispatched, counts.dispatched > 0 ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-500", "⚠️")}
            ${_renderKpiCard("นำส่ง", counts.on_the_way, "bg-sky-50 border-sky-200 text-sky-700", "🛵")}
            ${_renderKpiCard("สำเร็จ", counts.delivered, "bg-emerald-50 border-emerald-200 text-emerald-700", "✅")}
        </div>`;

    // ── Stuck Orders Warning ──────────────────────────────────────────────────
    if (stuckOrders.length > 0) {
        html += `
        <div class="bg-rose-50 border border-rose-300 rounded-2xl p-3 space-y-2">
            <div class="flex items-center gap-2 text-rose-800 font-extrabold">
                <span class="text-base animate-bounce">🚨</span>
                <span>ไรเดอร์ยังไม่รับงาน! (${stuckOrders.length} ออเดอร์)</span>
            </div>
            ${stuckOrders.map(o => _renderStuckOrderCard(o, now)).join("")}
        </div>`;
    }

    // ── Active Orders ─────────────────────────────────────────────────────────
    const activeOrders = allOrders.filter(o => o.status !== "delivered").sort((a, b) => {
        const pa = ORDER_STATUS_CONFIG[a.status]?.priority || 9;
        const pb = ORDER_STATUS_CONFIG[b.status]?.priority || 9;
        return pa - pb;
    });

    if (activeOrders.length > 0) {
        html += `<div class="space-y-2">
            <p class="font-bold text-slate-700 text-[11px] uppercase tracking-wider">🔄 ออเดอร์ที่กำลังดำเนินการ</p>
            ${activeOrders.map(o => _renderOrderCard(o, now)).join("")}
        </div>`;
    } else {
        html += `
        <div class="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
            <span class="text-4xl">🎉</span>
            <p class="font-bold text-slate-600">ไม่มีออเดอร์ค้างอยู่!</p>
            <p class="text-[11px]">ทุกออเดอร์ส่งสำเร็จแล้ว</p>
        </div>`;
    }

    // ── Completed Orders Today ────────────────────────────────────────────────
    const completedOrders = allOrders.filter(o => o.status === "delivered");
    if (completedOrders.length > 0) {
        html += `
        <div class="space-y-1.5">
            <p class="font-bold text-slate-500 text-[11px] uppercase tracking-wider">✅ ส่งสำเร็จวันนี้ (${completedOrders.length} ออเดอร์)</p>
            ${completedOrders.map(o => `
            <div class="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center justify-between opacity-70">
                <div class="flex items-center gap-2">
                    <span class="text-emerald-500 font-black text-sm">✅</span>
                    <div>
                        <span class="font-bold text-slate-700">${o.orderId}</span>
                        <span class="text-slate-400 ml-1">${o.customerName || o.customerPhone || "ลูกค้า"}</span>
                    </div>
                </div>
                <span class="text-emerald-600 font-black">฿${o.grandTotal || o.total || 0}</span>
            </div>`).join("")}
        </div>`;
    }

    html += `</div>`; // end p-3
    container.innerHTML = html;
    _monitorLastRefresh = now;
}

// ── Helper: รวบรวม orders จากทุกแหล่ง ────────────────────────────────────────
function _collectAllOrders() {
    const orders = [];
    const seen = new Set();

    // 1. state.activeOrder
    if (state.activeOrder && state.activeOrder.orderId) {
        orders.push(state.activeOrder);
        seen.add(state.activeOrder.orderId);
    }

    // 2. localStorage: talathub_order_history
    try {
        const hist = JSON.parse(localStorage.getItem("talathub_order_history") || "[]");
        hist.forEach(o => {
            if (o && o.orderId && !seen.has(o.orderId)) {
                orders.push(o);
                seen.add(o.orderId);
            }
        });
    } catch (e) {}

    // 3. localStorage: talathub_active_order (backup)
    try {
        const saved = JSON.parse(localStorage.getItem("talathub_active_order") || "null");
        if (saved && saved.orderId && !seen.has(saved.orderId)) {
            orders.push(saved);
            seen.add(saved.orderId);
        }
    } catch (e) {}

    // 4. Memory cache from Firebase Realtime DB
    if (window._cachedFirebaseOrders && Array.isArray(window._cachedFirebaseOrders)) {
        window._cachedFirebaseOrders.forEach(o => {
            if (o && o.orderId && !seen.has(o.orderId)) {
                orders.push(o);
                seen.add(o.orderId);
            }
        });
    }

    return orders;
}

// ── Helper: KPI Card ──────────────────────────────────────────────────────────
function _renderKpiCard(label, count, colorClass, icon) {
    return `
    <div class="border rounded-xl p-2 text-center ${colorClass}">
        <div class="text-base leading-none">${icon}</div>
        <div class="font-black text-lg leading-tight">${count}</div>
        <div class="text-[9px] font-bold leading-tight mt-0.5">${label}</div>
    </div>`;
}

// ── Helper: Order Card ────────────────────────────────────────────────────────
function _renderOrderCard(order, now) {
    const cfg = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.picking;
    const isDispatched = order.status === "dispatched";
    const dispatchedMs = isDispatched && order.dispatchedAt ? now - order.dispatchedAt : 0;
    const isStuck = isDispatched && dispatchedMs > DISPATCH_TIMEOUT_MS;
    const minutesAgo = Math.floor(dispatchedMs / 60000);

    const cardBorder = isStuck ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white";

    return `
    <div class="border rounded-2xl p-3 space-y-2 shadow-xs ${cardBorder}">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full ${cfg.dot} shrink-0"></span>
                <span class="font-extrabold text-slate-800">${order.orderId}</span>
                <span class="text-slate-500">${order.customerName || order.customerPhone || "ลูกค้า"}</span>
            </div>
            <span class="border px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.color}">${cfg.icon} ${cfg.label}</span>
        </div>

        <div class="flex items-center justify-between text-slate-500">
            <span>฿${order.grandTotal || order.total || 0} • ${order.address || "ที่อยู่ยังไม่ระบุ"}</span>
            ${order.riderName ? `<span class="text-sky-600 font-bold">🛵 ${order.riderName}</span>` : ""}
        </div>

        ${isDispatched ? `
        <div class="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
            <span class="${isStuck ? "text-rose-700 font-extrabold animate-pulse" : "text-amber-600 font-bold"}">
                ${isStuck ? `🚨 ไม่มีไรเดอร์รับงาน! (${minutesAgo} นาทีแล้ว)` : `⏳ รอไรเดอร์รับงาน (${minutesAgo} นาที)`}
            </span>
            <div class="flex gap-1.5">
                <button onclick="callRiderPhone(event, '${order.riderPhone || '0815887400'}')"
                    class="bg-sky-600 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded-lg active:scale-95 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">call</span>
                    <span>โทร</span>
                </button>
                <button onclick="reassignRiderForOrder('${order.orderId}')"
                    class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-2 py-1 rounded-lg active:scale-95 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">swap_horiz</span>
                    <span>Assign</span>
                </button>
            </div>
        </div>` : ""}

        ${order.status === "on_the_way" ? `
        <div class="flex items-center gap-1.5 text-sky-600 font-bold bg-sky-50 border border-sky-200 rounded-xl px-3 py-2">
            <span class="material-symbols-outlined text-sm animate-bounce">near_me</span>
            <span>ไรเดอร์กำลังเดินทางไปส่ง</span>
            ${order.riderPhone ? `<button onclick="callRiderPhone(event, '${order.riderPhone}')" class="ml-auto bg-sky-600 text-white font-bold px-2 py-1 rounded-lg active:scale-95 transition-all text-[10px]">📞 โทรสอบถาม</button>` : ""}
        </div>` : ""}
    </div>`;
}

// ── Helper: Stuck Order Card (ใน warning box) ─────────────────────────────────
function _renderStuckOrderCard(order, now) {
    const minutesAgo = Math.floor((now - order.dispatchedAt) / 60000);
    return `
    <div class="flex items-center justify-between bg-white border border-rose-200 rounded-xl px-3 py-2">
        <div>
            <span class="font-extrabold text-rose-800">${order.orderId}</span>
            <span class="text-rose-600 ml-1">(${minutesAgo} นาทีที่แล้ว)</span>
        </div>
        <div class="flex gap-1.5">
            <button onclick="callRiderPhone(event, '${order.riderPhone || '0815887400'}')"
                class="bg-sky-600 text-white font-bold px-2 py-1 rounded-lg text-[10px] active:scale-95 transition-all">
                📞 โทร
            </button>
            <button onclick="reassignRiderForOrder('${order.orderId}')"
                class="bg-amber-500 text-white font-bold px-2 py-1 rounded-lg text-[10px] active:scale-95 transition-all">
                🔁 Assign
            </button>
        </div>
    </div>`;
}

// ── Alert Badge บน Tab ────────────────────────────────────────────────────────
function updateMonitorAlertBadge(stuckCount) {
    const badge = document.getElementById("hub-monitor-alert-badge");
    if (!badge) return;
    if (stuckCount > 0) {
        badge.textContent = stuckCount;
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }
}

// ── Auto Refresh ──────────────────────────────────────────────────────────────
function startMonitorAutoRefresh() {
    stopMonitorAutoRefresh();
    _monitorRefreshTimer = setInterval(() => {
        if (!document.getElementById("hub-content-monitor")?.classList.contains("hidden")) {
            renderHubMonitorBoard();
        }
    }, 30000); // refresh ทุก 30 วินาที
}

function stopMonitorAutoRefresh() {
    if (_monitorRefreshTimer) {
        clearInterval(_monitorRefreshTimer);
        _monitorRefreshTimer = null;
    }
}

// ── Reassign Rider ────────────────────────────────────────────────────────────
function reassignRiderForOrder(orderId) {
    if (!state.activeOrder || state.activeOrder.orderId !== orderId) {
        showToast("⚠️ ไม่พบออเดอร์นี้ในระบบปัจจุบัน");
        return;
    }
    // Reset status กลับไป delivering เพื่อให้ฮับ assign ไรเดอร์ใหม่ได้
    state.activeOrder.status = "delivering";
    state.activeOrder.riderName = null;
    state.activeOrder.riderPhone = null;
    state.activeOrder.dispatchedAt = null;
    saveActiveOrderToStorage(state.activeOrder);
    renderHubMonitorBoard();
    showToast(`🔁 รีเซ็ตออเดอร์ ${orderId} — พร้อม assign ไรเดอร์ใหม่`);
}

// ==========================================
// WISIT CHAI HUB: DAILY OPERATIONS & SETTLEMENTS DATABASE REPORT
// ระบบฐานข้อมูลรายงานสรุปยอดขาย เคลียร์เงินไรเดอร์ และเคลียร์แผงค้าประจำวัน
// ==========================================

let _activeReportDateKey = null;
let _currentPayoutStall = null;

// ── Helper: ดึง YYYY-MM-DD จาก timestamp (ใช้วันที่ตามเวลาท้องถิ่น)
function getReportDateKey(timestamp) {
    if (!timestamp) timestamp = Date.now();
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// ── Helper: แปลง Date Key (YYYY-MM-DD) เป็นรูปแบบภาษาไทย
function formatThaiDateDisplay(dateKey) {
    if (!dateKey) return "";
    const parts = dateKey.split("-");
    if (parts.length !== 3) return dateKey;
    const year = parseInt(parts[0], 10);
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const thaiYear = year > 2500 ? year : year + 543;
    return `${day} ${thaiMonths[monthIdx] || ""} ${thaiYear}`;
}

// ── Helper: ค้นหาข้อมูลร้านค้า / แผงค้า
function findStallInfo(stallId, stallName) {
    let stall = ALL_100_STALLS.find(s => s.stallId === stallId || s.stallName === stallName);
    if (!stall) {
        stall = MARKET_DATA.find(s => s.stallId === stallId || s.stallName === stallName);
    }
    if (!stall && stallName) {
        stall = ALL_100_STALLS.find(s => s.stallName && s.stallName.includes(stallName));
    }
    return stall || {
        stallId: stallId || "stall_general",
        stallName: stallName || "แผงค้าทั่วไป",
        stallNumber: stallName && stallName.includes("(") ? stallName.split("(")[1].replace(")", "") : "แผงทั่วไป",
        zone: "ตลาดสด",
        ownerName: "แม่ค้าประจำแผง",
        phone: "089-123-4567"
    };
}

// ── Persistence Helpers for Rider & Vendor Settlements
function _loadRiderSettlementState(dateKey) {
    try {
        return JSON.parse(localStorage.getItem(`talathub_settled_riders_${dateKey}`) || "{}");
    } catch (e) {
        return {};
    }
}

function _saveRiderSettlementState(dateKey, stateObj) {
    try {
        localStorage.setItem(`talathub_settled_riders_${dateKey}`, JSON.stringify(stateObj));
        if (isFirebaseReady()) {
            db.ref(`daily_reports/${dateKey}/riderSettlement/settledRiders`).set(stateObj).catch(() => {});
        }
    } catch (e) {}
}

function _loadVendorSettlementState(dateKey) {
    try {
        return JSON.parse(localStorage.getItem(`talathub_settled_vendors_${dateKey}`) || "{}");
    } catch (e) {
        return {};
    }
}

function _saveVendorSettlementState(dateKey, stateObj) {
    try {
        localStorage.setItem(`talathub_settled_vendors_${dateKey}`, JSON.stringify(stateObj));
        if (isFirebaseReady()) {
            db.ref(`daily_reports/${dateKey}/vendorSettlement/settledVendors`).set(stateObj).catch(() => {});
        }
    } catch (e) {}
}

// ── Aggregation Engine: รวบรวมข้อมูลออเดอร์ ไรเดอร์ และร้านค้า ประจำวัน
function aggregateDailyOperations(targetDateKey) {
    if (!targetDateKey) targetDateKey = getReportDateKey(Date.now());

    // 1. ดึงออเดอร์ทั้งหมด
    const allOrders = _collectAllOrders();
    const dateOrders = allOrders.filter(o => {
        const orderDate = getReportDateKey(o.savedAt || o.createdAt || o.orderTime || Date.now());
        return orderDate === targetDateKey;
    });

    // 2. โหลดสถานะการเคลียร์เงินที่เคยบันทึกไว้
    const settledRiders = _loadRiderSettlementState(targetDateKey);
    const settledVendors = _loadVendorSettlementState(targetDateKey);

    // 3. ยอดรวมลูกค้า & สรุปสถานะออเดอร์
    const summary = {
        dateKey: targetDateKey,
        totalOrders: dateOrders.length,
        completedOrders: 0,
        pendingOrders: 0,
        totalCustomerGMV: 0,
        totalDeliveryFees: 0,
        totalDiscounts: 0,
        netCustomerPaid: 0,
        totalRefundCash: 0,
        paymentBreakdown: {
            promptpay: { count: 0, amount: 0, label: "พร้อมเพย์" },
            bank_transfer: { count: 0, amount: 0, label: "โอนผ่าน SCB" },
            cod: { count: 0, amount: 0, label: "เงินสดปลายทาง (COD)" }
        }
    };

    const ridersMap = {};
    const stallsMap = {};

    dateOrders.forEach(o => {
        const isDelivered = o.status === "delivered";
        if (isDelivered) summary.completedOrders++;
        else summary.pendingOrders++;

        const orderTotal = Number(o.grandTotal || o.total || o.netTotal || 0);
        const delFee = Number(o.deliveryFee || 20);
        const discount = Number(o.discount || 0);
        const refundAmt = Number(o.refundCashTotal || o.cashRefund || 0);

        summary.totalCustomerGMV += orderTotal;
        summary.totalDeliveryFees += delFee;
        summary.totalDiscounts += discount;
        summary.totalRefundCash += refundAmt;

        // ช่องทางชำระเงิน
        const pType = (o.paymentType || "promptpay").toLowerCase();
        if (pType === "cod" || pType === "cash") {
            summary.paymentBreakdown.cod.count++;
            summary.paymentBreakdown.cod.amount += orderTotal;
        } else if (pType === "bank_transfer" || pType === "bank" || pType === "scb") {
            summary.paymentBreakdown.bank_transfer.count++;
            summary.paymentBreakdown.bank_transfer.amount += orderTotal;
        } else {
            summary.paymentBreakdown.promptpay.count++;
            summary.paymentBreakdown.promptpay.amount += orderTotal;
        }

        // จัดกลุ่มไรเดอร์
        const rName = o.riderName || (o.status === "delivered" || o.status === "dispatched" || o.status === "on_the_way" ? "พี่สมชาย (1กข 8902)" : "รอไรเดอร์รับงาน");
        const rPhone = o.riderPhone || "081-588-7400";
        if (!ridersMap[rName]) {
            const isRiderSettled = Boolean(settledRiders[rName]?.isSettled);
            ridersMap[rName] = {
                riderName: rName,
                riderPhone: rPhone,
                tripsCount: 0,
                riderFeeEarned: 0,
                codCollected: 0,
                refundHanded: 0,
                netCashToHub: 0,
                isSettled: isRiderSettled,
                settledAt: settledRiders[rName]?.settledAt || null
            };
        }
        if (o.status === "delivered" || o.status === "on_the_way" || o.status === "dispatched") {
            ridersMap[rName].tripsCount++;
            ridersMap[rName].riderFeeEarned += 40; // ค่ารอบ ฿40
            if (pType === "cod" || pType === "cash") {
                ridersMap[rName].codCollected += orderTotal;
            }
            ridersMap[rName].refundHanded += refundAmt;
        }

        // จัดกลุ่มแผงค้า (Vendor)
        if (o.stalls && Array.isArray(o.stalls)) {
            o.stalls.forEach(st => {
                const sKey = st.stallId || st.name;
                const meta = findStallInfo(st.stallId, st.name);
                if (!stallsMap[sKey]) {
                    const isStallSettled = Boolean(settledVendors[sKey]?.isSettled);
                    stallsMap[sKey] = {
                        stallId: st.stallId || meta.stallId,
                        stallName: meta.stallName || st.name,
                        stallNumber: meta.stallNumber || "แผงตลาด",
                        zone: meta.zone || "กลาง",
                        ownerName: meta.ownerName || "เจ้าของแผง",
                        phone: meta.phone || "089-123-4567",
                        promptPayPhone: (meta.phone || "0891234567").replace(/[^0-9]/g, ""),
                        orderCount: 0,
                        itemsCount: 0,
                        totalAmount: 0,
                        isSettled: isStallSettled,
                        settledAt: settledVendors[sKey]?.settledAt || null
                    };
                }
                stallsMap[sKey].orderCount++;

                const activeItems = (st.items || []).filter(it => !it.outOfStock);
                activeItems.forEach(it => {
                    const itemPrice = (it.actualPrice !== undefined ? it.actualPrice : it.price) || 0;
                    const itemQty = it.qty || it.quantity || 1;
                    stallsMap[sKey].totalAmount += (itemPrice * itemQty);
                    stallsMap[sKey].itemsCount += itemQty;
                });
            });
        }
    });

    summary.netCustomerPaid = summary.totalCustomerGMV;

    // คำนวณยอดเงินสุทธิที่ไรเดอร์ต้องส่งมอบฮับ
    const ridersList = Object.values(ridersMap);
    let totalTrips = 0;
    let totalRiderFees = 0;
    let totalCodCollected = 0;
    let totalRefundHanded = 0;
    let netCashToHub = 0;

    ridersList.forEach(r => {
        r.netCashToHub = r.codCollected - r.riderFeeEarned - r.refundHanded;
        totalTrips += r.tripsCount;
        totalRiderFees += r.riderFeeEarned;
        totalCodCollected += r.codCollected;
        totalRefundHanded += r.refundHanded;
        netCashToHub += r.netCashToHub;
    });

    const riderSettlement = {
        totalTrips,
        totalRiderFees,
        totalCodCollected,
        totalRefundHanded,
        netCashToHub,
        riders: ridersList,
        settledRiders
    };

    // คำนวณยอดรวมแผงค้า
    const stallsList = Object.values(stallsMap);
    let totalVendorAmount = 0;
    let totalSettledAmount = 0;
    let settledCount = 0;
    let pendingCount = 0;

    stallsList.forEach(s => {
        totalVendorAmount += s.totalAmount;
        if (s.isSettled) {
            totalSettledAmount += s.totalAmount;
            settledCount++;
        } else {
            pendingCount++;
        }
    });

    const vendorSettlement = {
        totalVendorAmount,
        totalSettledAmount,
        totalPendingAmount: totalVendorAmount - totalSettledAmount,
        settledCount,
        pendingCount,
        stalls: stallsList,
        settledVendors
    };

    const report = {
        dateKey: targetDateKey,
        generatedAt: Date.now(),
        summary,
        riderSettlement,
        vendorSettlement,
        ordersList: dateOrders
    };

    // จัดเก็บใน LocalStorage
    try {
        localStorage.setItem(`talathub_daily_report_${targetDateKey}`, JSON.stringify(report));
    } catch (e) {}

    // จัดเก็บใน Firebase Realtime Database
    if (isFirebaseReady()) {
        db.ref(`daily_reports/${targetDateKey}`).set({
            dateKey: report.dateKey,
            generatedAt: report.generatedAt,
            summary: report.summary,
            riderSettlement: {
                totalTrips: report.riderSettlement.totalTrips,
                totalRiderFees: report.riderSettlement.totalRiderFees,
                totalCodCollected: report.riderSettlement.totalCodCollected,
                totalRefundHanded: report.riderSettlement.totalRefundHanded,
                netCashToHub: report.riderSettlement.netCashToHub,
                riders: report.riderSettlement.riders
            },
            vendorSettlement: {
                totalVendorAmount: report.vendorSettlement.totalVendorAmount,
                totalSettledAmount: report.vendorSettlement.totalSettledAmount,
                totalPendingAmount: report.vendorSettlement.totalPendingAmount,
                settledCount: report.vendorSettlement.settledCount,
                pendingCount: report.vendorSettlement.pendingCount,
                stalls: report.vendorSettlement.stalls
            },
            ordersCount: dateOrders.length
        }).catch(e => console.warn("Firebase daily report write failed:", e));
    }

    return report;
}

// ── เปลี่ยนวันที่รายงาน
function changeReportDate(newDate) {
    if (!newDate) return;
    _activeReportDateKey = newDate;
    renderHubDailyReport(newDate);
}

function setReportDateQuick(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const dateKey = getReportDateKey(d.getTime());
    changeReportDate(dateKey);
}

function navigateReportDay(direction) {
    const curDate = _activeReportDateKey || getReportDateKey(Date.now());
    const parts = curDate.split("-");
    if (parts.length !== 3) return;
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    d.setDate(d.getDate() + direction);
    changeReportDate(getReportDateKey(d.getTime()));
}

// ── UI Renderer สำหรับแท็บรายงานประจำวัน (Widescreen PC View in Admin)
function renderHubDailyReport(targetDateKey) {
    const container = document.getElementById("admin-content-report") || document.getElementById("hub-content-report");
    if (!container) return;

    const hubReportContainer = document.getElementById("hub-content-report");
    if (hubReportContainer && hubReportContainer !== container) {
        hubReportContainer.innerHTML = `
            <div class="bg-white rounded-3xl p-6 text-center border border-purple-200 shadow-sm space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-2xl font-bold">
                    <span class="material-symbols-outlined text-2xl">admin_panel_settings</span>
                </div>
                <h3 class="font-extrabold text-sm text-slate-800">ศูนย์รายงานและบัญชีถูกย้ายไปที่ห้อง Admin (จอใหญ่ PC)</h3>
                <p class="text-slate-500 text-xs max-w-sm mx-auto">เพื่อความสะดวกและอ่านง่ายเต็มหน้าจอพีซี รายงานทุกประเภทได้ถูกแยกไปยังห้องผู้ดูแลระบบแล้ว</p>
                <button onclick="handleAdminButtonClick()" class="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold rounded-xl text-xs shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                    <span>เปิดห้องแอดมิน & ดูรายงานเต็มจอ</span>
                </button>
            </div>
        `;
    }

    if (!targetDateKey) {
        targetDateKey = _activeReportDateKey || getReportDateKey(Date.now());
    }
    _activeReportDateKey = targetDateKey;

    const report = aggregateDailyOperations(targetDateKey);
    const thaiDateText = formatThaiDateDisplay(targetDateKey);
    const isToday = targetDateKey === getReportDateKey(Date.now());

    // คำนวณรายได้ค่าบริการสุทธิของฮับ (GMV - ยอดจ่ายแม่ค้า - ค่ารอบไรเดอร์)
    const hubNetMargin = report.summary.totalCustomerGMV - report.vendorSettlement.totalVendorAmount - report.riderSettlement.totalRiderFees;

    let html = `
    <!-- Top Filter Bar & Controls -->
    <div class="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                    📑
                </span>
                <div>
                    <h3 class="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                        <span>รายงานสรุปรายวัน ตลาดฮับวิศิษฐ์ชัย</span>
                        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Cloud DB</span>
                    </h3>
                    <p class="text-[10px] text-slate-500">ประจำวันที่ ${thaiDateText} ${isToday ? '<strong class="text-emerald-600">(วันนี้)</strong>' : ''}</p>
                </div>
            </div>

            <!-- Action buttons -->
            <div class="flex items-center gap-1.5 flex-wrap">
                <button onclick="renderHubDailyReport('${targetDateKey}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1 shadow-2xs">
                    <span class="material-symbols-outlined text-sm">refresh</span>
                    <span>รีเฟรช</span>
                </button>
                <button onclick="exportDailyReportCSV('${targetDateKey}')" class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1 shadow-2xs">
                    <span class="material-symbols-outlined text-sm">download</span>
                    <span>ส่งออก CSV</span>
                </button>
                <button onclick="printDailyReport()" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1 shadow-2xs">
                    <span class="material-symbols-outlined text-sm">print</span>
                    <span>พิมพ์รายงาน A4</span>
                </button>
            </div>
        </div>

        <!-- Date selector toolbar with Prev/Next buttons -->
        <div class="flex items-center justify-between gap-2 flex-wrap text-[11px]">
            <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-600 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-slate-400">calendar_today</span>
                    <span>เลือกวันที่:</span>
                </span>
                <button onclick="navigateReportDay(-1)" title="วันก่อนหน้า" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <input type="date" id="hub-report-date-input" value="${targetDateKey}" onchange="changeReportDate(this.value)" class="border border-slate-300 rounded-xl px-2.5 py-1 bg-slate-50 font-bold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none">
                <button onclick="navigateReportDay(1)" title="วันถัดไป" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="setReportDateQuick(0)" class="px-2.5 py-1 rounded-lg font-bold ${isToday ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition-all">วันนี้</button>
                <button onclick="setReportDateQuick(-1)" class="px-2.5 py-1 rounded-lg font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">เมื่อวาน</button>
                ${report.summary.totalOrders === 0 ? `
                <button onclick="generateSampleDailyOrders()" class="px-2.5 py-1 rounded-lg font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-2xs transition-all flex items-center gap-1">
                    <span>➕ สร้างออเดอร์ตัวอย่าง</span>
                </button>` : ''}
            </div>
        </div>
    </div>

    <!-- 4 Primary KPI Cards (GMV, Vendor Cost, Rider Settlement & Hub Net Margin) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <!-- Card 1: GMV ลูกค้า -->
        <div class="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-3.5 sm:p-4 shadow-md space-y-1.5 relative overflow-hidden">
            <div class="flex items-center justify-between">
                <span class="text-[10px] sm:text-[11px] font-bold text-emerald-200 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">shopping_bag</span>
                    <span>ยอดขายรวม (GMV)</span>
                </span>
                <span class="text-[9px] bg-white/20 font-bold px-1.5 py-0.2 rounded-full">${report.summary.totalOrders} ใบ</span>
            </div>
            <div class="text-xl sm:text-2xl font-black tracking-tight">฿${report.summary.totalCustomerGMV.toLocaleString()}</div>
            <div class="text-[9px] sm:text-[10px] text-emerald-100/90 pt-1 border-t border-white/15">
                <span>สำเร็จ ${report.summary.completedOrders} | ค่าส่ง ฿${report.summary.totalDeliveryFees.toLocaleString()}</span>
            </div>
        </div>

        <!-- Card 2: เคลียร์เงินร้านค้า/แผงค้า -->
        <div class="bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-3xl p-3.5 sm:p-4 shadow-md space-y-1.5 relative overflow-hidden">
            <div class="flex items-center justify-between">
                <span class="text-[10px] sm:text-[11px] font-bold text-amber-200 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">storefront</span>
                    <span>ยอดเคลียร์แผงค้า</span>
                </span>
                <span class="text-[9px] bg-white/20 font-bold px-1.5 py-0.2 rounded-full">${report.vendorSettlement.stalls.length} แผง</span>
            </div>
            <div class="text-xl sm:text-2xl font-black tracking-tight">฿${report.vendorSettlement.totalVendorAmount.toLocaleString()}</div>
            <div class="text-[9px] sm:text-[10px] text-amber-100/90 pt-1 border-t border-white/15">
                <span>โอนแล้ว ฿${report.vendorSettlement.totalSettledAmount.toLocaleString()} | รอโอน ฿${report.vendorSettlement.totalPendingAmount.toLocaleString()}</span>
            </div>
        </div>

        <!-- Card 3: เคลียร์เงินไรเดอร์ -->
        <div class="bg-gradient-to-br from-sky-600 to-blue-800 text-white rounded-3xl p-3.5 sm:p-4 shadow-md space-y-1.5 relative overflow-hidden">
            <div class="flex items-center justify-between">
                <span class="text-[10px] sm:text-[11px] font-bold text-sky-200 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">two_wheeler</span>
                    <span>เงินสดสุทธิส่งฮับ</span>
                </span>
                <span class="text-[9px] bg-white/20 font-bold px-1.5 py-0.2 rounded-full">${report.riderSettlement.totalTrips} เที่ยว</span>
            </div>
            <div class="text-xl sm:text-2xl font-black tracking-tight">฿${report.riderSettlement.netCashToHub.toLocaleString()}</div>
            <div class="text-[9px] sm:text-[10px] text-sky-100/90 pt-1 border-t border-white/15">
                <span>COD ฿${report.riderSettlement.totalCodCollected.toLocaleString()} | ค่ารอบ -฿${report.riderSettlement.totalRiderFees.toLocaleString()}</span>
            </div>
        </div>

        <!-- Card 4: รายรับค่าบริการสุทธิของฮับ (Hub Margin) -->
        <div class="bg-gradient-to-br from-purple-700 to-indigo-900 text-white rounded-3xl p-3.5 sm:p-4 shadow-md space-y-1.5 relative overflow-hidden">
            <div class="flex items-center justify-between">
                <span class="text-[10px] sm:text-[11px] font-bold text-purple-200 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">account_balance</span>
                    <span>กำไรค่าบริการสุทธิฮับ</span>
                </span>
                <span class="text-[9px] bg-white/20 font-bold px-1.5 py-0.2 rounded-full">Net</span>
            </div>
            <div class="text-xl sm:text-2xl font-black tracking-tight ${hubNetMargin >= 0 ? 'text-emerald-300' : 'text-rose-300'}">
                ฿${hubNetMargin.toLocaleString()}
            </div>
            <div class="text-[9px] sm:text-[10px] text-purple-100/90 pt-1 border-t border-white/15">
                <span>(ยอดขาย - ต้นทุนแผงค้า - ค่ารอบ)</span>
            </div>
        </div>
    </div>

    <!-- Section 1: Customer Revenue & Payment Method Breakdown -->
    <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="material-symbols-outlined text-emerald-600 text-base">payments</span>
                <span>1. รายรับลูกค้า & ช่องทางชำระเงิน (Customer Payment Breakdown)</span>
            </h4>
            <span class="text-[10px] text-slate-500 font-bold">รวม ${report.summary.totalOrders} ออเดอร์</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <!-- PromptPay -->
            <div class="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center justify-between">
                <div>
                    <div class="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span>พร้อมเพย์ (QR PromptPay)</span>
                    </div>
                    <div class="text-[10px] text-blue-700 font-medium">${report.summary.paymentBreakdown.promptpay.count} ออเดอร์</div>
                </div>
                <div class="text-right">
                    <div class="font-extrabold text-blue-950 text-sm">฿${report.summary.paymentBreakdown.promptpay.amount.toLocaleString()}</div>
                    <span class="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">เข้าบัญชีฮับ</span>
                </div>
            </div>

            <!-- SCB Bank Transfer -->
            <div class="p-3 bg-purple-50/70 border border-purple-200/80 rounded-2xl flex items-center justify-between">
                <div>
                    <div class="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-purple-600"></span>
                        <span>โอนธนาคาร SCB</span>
                    </div>
                    <div class="text-[10px] text-purple-700 font-medium">${report.summary.paymentBreakdown.bank_transfer.count} ออเดอร์</div>
                </div>
                <div class="text-right">
                    <div class="font-extrabold text-purple-950 text-sm">฿${report.summary.paymentBreakdown.bank_transfer.amount.toLocaleString()}</div>
                    <span class="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">แนบสลิป</span>
                </div>
            </div>

            <!-- Cash on Delivery -->
            <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between">
                <div>
                    <div class="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                        <span>เงินสดปลายทาง (COD)</span>
                    </div>
                    <div class="text-[10px] text-amber-700 font-medium">${report.summary.paymentBreakdown.cod.count} ออเดอร์</div>
                </div>
                <div class="text-right">
                    <div class="font-extrabold text-amber-950 text-sm">฿${report.summary.paymentBreakdown.cod.amount.toLocaleString()}</div>
                    <span class="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">ไรเดอร์ถืออยู่</span>
                </div>
            </div>
        </div>

        ${report.summary.totalRefundCash > 0 ? `
        <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-[11px] text-rose-800">
            <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-rose-600 text-base">price_check</span>
                <span><strong>เงินทอนคืนลูกค้ากรณีสินค้าขาด (Cash Refund):</strong> หักคืนเงินสดใส่ถุงให้ลูกค้า</span>
            </div>
            <div class="font-black text-rose-700">฿${report.summary.totalRefundCash.toLocaleString()}</div>
        </div>` : ''}
    </div>

    <!-- Section 2: Rider Settlement Summary Table -->
    <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
                <h4 class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sky-600 text-base">sports_motorsports</span>
                    <span>2. เคลียร์เงินไรเดอร์ (Rider Compensation & COD Clearance)</span>
                </h4>
                <p class="text-[10px] text-slate-500">ค่ารอบ ฿40/เที่ยว | หักเงินสด COD และเงินทอน | ยอดสุทธิส่งมอบฮับ</p>
            </div>
            <div class="text-right">
                <div class="text-[10px] text-slate-500">ยอดสุทธิรวมที่ฮับต้องรับมอบ:</div>
                <div class="font-extrabold text-sky-700 text-sm">฿${report.riderSettlement.netCashToHub.toLocaleString()}</div>
            </div>
        </div>

        ${report.riderSettlement.riders.length === 0 ? `
        <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
            <span class="material-symbols-outlined text-3xl mb-1 text-slate-300">moped</span>
            <div>ยังไม่มีรอบการจัดส่งของไรเดอร์ในวันที่เลือก</div>
        </div>` : `
        <div class="overflow-x-auto">
            <table class="w-full text-left text-[11px]">
                <thead>
                    <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th class="p-2.5 rounded-l-xl">ไรเดอร์</th>
                        <th class="p-2.5 text-center">เที่ยวส่ง</th>
                        <th class="p-2.5 text-right">ค่ารอบสะสม</th>
                        <th class="p-2.5 text-right">เงินสด COD เก็บมา</th>
                        <th class="p-2.5 text-right">เงินทอนคืนลูกค้า</th>
                        <th class="p-2.5 text-right">ยอดสุทธิส่งฮับ</th>
                        <th class="p-2.5 text-center">สถานะ</th>
                        <th class="p-2.5 text-center">จัดการ</th>
                        <th class="p-2.5 text-center rounded-r-xl">พิมพ์ (80mm)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${report.riderSettlement.riders.map(r => `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                        <td class="p-2.5">
                            <div class="font-extrabold text-slate-800 text-xs">${r.riderName}</div>
                            <div class="text-[10px] text-slate-400 font-mono">${r.riderPhone}</div>
                        </td>
                        <td class="p-2.5 text-center font-bold text-slate-700">${r.tripsCount} เที่ยว</td>
                        <td class="p-2.5 text-right font-bold text-sky-700">฿${r.riderFeeEarned.toLocaleString()}</td>
                        <td class="p-2.5 text-right font-bold text-amber-700">฿${r.codCollected.toLocaleString()}</td>
                        <td class="p-2.5 text-right font-bold text-rose-600">${r.refundHanded > 0 ? `-฿${r.refundHanded.toLocaleString()}` : '฿0'}</td>
                        <td class="p-2.5 text-right">
                            <span class="font-black text-xs ${r.netCashToHub >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                                ${r.netCashToHub >= 0 ? `฿${r.netCashToHub.toLocaleString()}` : `-฿${Math.abs(r.netCashToHub).toLocaleString()}`}
                            </span>
                            <div class="text-[9px] text-slate-400 font-medium">
                                ${r.netCashToHub >= 0 ? '(ไรเดอร์ส่งฮับ)' : '(ฮับจ่ายเพิ่ม)'}
                            </div>
                        </td>
                        <td class="p-2.5 text-center">
                            ${r.isSettled ? `
                            <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-0.5">
                                <span class="material-symbols-outlined text-xs">check</span>
                                <span>เคลียร์แล้ว</span>
                            </span>` : `
                            <span class="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-0.5">
                                <span class="material-symbols-outlined text-xs">pending</span>
                                <span>รอเคลียร์</span>
                            </span>`}
                        </td>
                        <td class="p-2.5 text-center">
                            <button onclick="settleRiderBalance('${r.riderName.replace(/'/g, "\\'")}', '${targetDateKey}')" class="px-2.5 py-1 ${r.isSettled ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-emerald-600 hover:bg-emerald-700 text-white'} font-bold rounded-lg text-[10px] active:scale-95 transition-all shadow-2xs">
                                ${r.isSettled ? 'ยกเลิก' : 'ยืนยันรับเงิน'}
                            </button>
                        </td>
                        <td class="p-2.5 text-center">
                            <button onclick="printThermalRiderSlip('${r.riderName.replace(/'/g, "\\'")}', '${targetDateKey}')" class="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold rounded-xl text-[10px] active:scale-95 transition-all shadow-2xs flex items-center gap-1 mx-auto cursor-pointer" title="พิมพ์สลิปเครื่องพิมพ์ความร้อน 80x80">
                                <span class="material-symbols-outlined text-xs">receipt</span>
                                <span>พิมพ์สลิป</span>
                            </button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        </div>`}
        <!-- ปุ่มพิมพ์สรุปกระดาษ A4 ตรงกลางด้านล่างหมวด 2 -->
        <div class="pt-3 border-t border-slate-100 flex justify-center">
            <button onclick="printA4RidersSummary('${targetDateKey}')" class="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-sm">print</span>
                <span>📄 พิมพ์สรุปเคลียร์เงินไรเดอร์ทั้งหมด (กระดาษ A4)</span>
            </button>
        </div>
    </div>

    <!-- Section 3: Vendor / Stall Settlement Summary Table -->
    <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
                <h4 class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-amber-600 text-base">store</span>
                    <span>3. เคลียร์เงินร้านค้า/แผงค้า (Vendor Settlements)</span>
                </h4>
                <p class="text-[10px] text-slate-500">ยอดรวมสินค้าที่หยิบจริง | โอนตรงด้วยระบบ PromptPay QR รายแผง</p>
            </div>
            <div class="flex items-center gap-2">
                <div class="text-right hidden sm:block">
                    <span class="text-[10px] text-slate-500">รอโอนเคลียร์:</span>
                    <span class="font-black text-rose-600 text-sm ml-1">฿${report.vendorSettlement.totalPendingAmount.toLocaleString()}</span>
                </div>
                ${report.vendorSettlement.pendingCount > 0 ? `
                <button onclick="settleAllVendors('${targetDateKey}')" class="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 text-white font-extrabold rounded-xl text-[10px] shadow-2xs active:scale-95 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">done_all</span>
                    <span>โอนเคลียร์ทุกแผงที่เหลือ</span>
                </button>` : ''}
            </div>
        </div>

        ${report.vendorSettlement.stalls.length === 0 ? `
        <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
            <span class="material-symbols-outlined text-3xl mb-1 text-slate-300">storefront</span>
            <div>ยังไม่มีรายการสินค้าจากแผงค้าในวันที่เลือก</div>
        </div>` : `
        <div class="overflow-x-auto">
            <table class="w-full text-left text-[11px]">
                <thead>
                    <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th class="p-2.5 rounded-l-xl">แผงค้า / ร้านค้า</th>
                        <th class="p-2.5">เจ้าของ / เบอร์พร้อมเพย์</th>
                        <th class="p-2.5 text-center">จำนวนที่ขาย</th>
                        <th class="p-2.5 text-right">ยอดเงินที่ต้องโอน</th>
                        <th class="p-2.5 text-center">สถานะ</th>
                        <th class="p-2.5 text-center">โอนเคลียร์</th>
                        <th class="p-2.5 text-center rounded-r-xl">พิมพ์ (80mm)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${report.vendorSettlement.stalls.map(s => `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                        <td class="p-2.5">
                            <div class="font-extrabold text-slate-800 text-xs">${s.stallName}</div>
                            <span class="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded">${s.stallNumber} (โซน ${s.zone})</span>
                        </td>
                        <td class="p-2.5">
                            <div class="font-bold text-slate-700">${s.ownerName}</div>
                            <div class="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                                <span>📱 ${s.phone}</span>
                            </div>
                        </td>
                        <td class="p-2.5 text-center">
                            <div class="font-bold text-slate-700">${s.itemsCount} ชิ้น</div>
                            <div class="text-[9px] text-slate-400 font-medium">(${s.orderCount} ออเดอร์)</div>
                        </td>
                        <td class="p-2.5 text-right">
                            <div class="font-black text-sm text-emerald-800">฿${s.totalAmount.toLocaleString()}</div>
                        </td>
                        <td class="p-2.5 text-center">
                            ${s.isSettled ? `
                            <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-0.5">
                                <span class="material-symbols-outlined text-xs">check_circle</span>
                                <span>โอนแล้ว</span>
                            </span>` : `
                            <span class="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-0.5">
                                <span class="material-symbols-outlined text-xs">schedule</span>
                                <span>รอโอน</span>
                            </span>`}
                        </td>
                        <td class="p-2.5 text-center">
                            <button onclick="openVendorPayoutModal('${s.stallId}', '${s.stallName.replace(/'/g, "\\'")}', ${s.totalAmount}, '${s.phone}', '${s.ownerName.replace(/'/g, "\\'")}', '${s.stallNumber}')" class="px-2.5 py-1.5 ${s.isSettled ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'} font-bold rounded-xl text-[10px] active:scale-95 transition-all flex items-center gap-1 mx-auto">
                                <span class="material-symbols-outlined text-xs">qr_code_2</span>
                                <span>${s.isSettled ? 'ดู QR / โอนซ้ำ' : '💳 โอนพร้อมเพย์'}</span>
                            </button>
                        </td>
                        <td class="p-2.5 text-center">
                            <button onclick="printThermalVendorSlip('${s.stallId}', '${targetDateKey}')" class="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold rounded-xl text-[10px] active:scale-95 transition-all shadow-2xs flex items-center gap-1 mx-auto cursor-pointer" title="พิมพ์สลิปเครื่องพิมพ์ความร้อน 80x80">
                                <span class="material-symbols-outlined text-xs">receipt</span>
                                <span>พิมพ์สลิป</span>
                            </button>
                        </td>
                    </tr>`).join("")}
                </tbody>
            </table>
        </div>`}
        <!-- ปุ่มพิมพ์สรุปกระดาษ A4 ตรงกลางด้านล่างหมวด 3 -->
        <div class="pt-3 border-t border-slate-100 flex justify-center">
            <button onclick="printA4VendorsSummary('${targetDateKey}')" class="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-extrabold rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-sm">print</span>
                <span>📄 พิมพ์สรุปยอดเคลียร์เงินแผงค้าทั้งหมด (กระดาษ A4)</span>
            </button>
        </div>
    </div>

    <!-- Section 4: Daily Orders Audit Ledger -->
    <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
                <h4 class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-slate-600 text-base">receipt_long</span>
                    <span>4. บัญชีแยกประเภทออเดอร์ประจำวัน (Daily Orders Audit Ledger)</span>
                </h4>
                <p class="text-[10px] text-slate-500">บันทึกประวัติออเดอร์ทั้งหมดในระบบของวันที่ ${thaiDateText}</p>
            </div>
            <span class="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full">
                ทั้งหมด ${report.ordersList.length} ใบ
            </span>
        </div>

        ${report.ordersList.length === 0 ? `
        <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
            <span class="material-symbols-outlined text-3xl mb-1 text-slate-300">inbox</span>
            <div>ไม่มีประวัติคำสั่งซื้อในวันที่นี้</div>
        </div>` : `
        <div class="overflow-x-auto">
            <table class="w-full text-left text-[11px]">
                <thead>
                    <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th class="p-2.5 rounded-l-xl">เลขที่ออเดอร์ / เวลา</th>
                        <th class="p-2.5">ลูกค้า</th>
                        <th class="p-2.5">ช่องทางชำระเงิน</th>
                        <th class="p-2.5 text-right">ยอดรวม</th>
                        <th class="p-2.5">ไรเดอร์นำส่ง</th>
                        <th class="p-2.5 text-center">สถานะ</th>
                        <th class="p-2.5 text-center rounded-r-xl">พิมพ์ (80mm)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${report.ordersList.map(o => {
                        const timeStr = o.savedAt ? new Date(o.savedAt).toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' }) : (o.orderTime || "--:--");
                        const cfg = ORDER_STATUS_CONFIG[o.status] || ORDER_STATUS_CONFIG.picking;
                        return `
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-2.5">
                                <div class="font-mono font-black text-slate-900 text-xs">${o.orderId}</div>
                                <div class="text-[10px] text-slate-400">${timeStr} น.</div>
                            </td>
                            <td class="p-2.5">
                                <div class="font-bold text-slate-800">${o.customerName || "ลูกค้าทั่วไป"}</div>
                                <div class="text-[10px] text-slate-500 font-mono">${o.customerPhone || "-"}</div>
                            </td>
                            <td class="p-2.5">
                                <span class="font-bold text-slate-700">${o.paymentType === 'cod' ? '💵 เงินสด COD' : (o.paymentType === 'bank_transfer' ? '🏦 โอน SCB' : '📱 พร้อมเพย์')}</span>
                            </td>
                            <td class="p-2.5 text-right">
                                <div class="font-black text-xs text-emerald-700">฿${(o.grandTotal || o.total || 0).toLocaleString()}</div>
                                <div class="text-[9px] text-slate-400">(ค่าส่ง ฿${o.deliveryFee || 20})</div>
                            </td>
                            <td class="p-2.5">
                                <div class="font-bold text-sky-700">${o.riderName || "ยังไม่ได้ assign"}</div>
                            </td>
                            <td class="p-2.5 text-center">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.color}">
                                    ${cfg.icon} ${cfg.label}
                                </span>
                            </td>
                            <td class="p-2.5 text-center">
                                <button onclick="printThermalOrderSlip('${o.orderId}', '${targetDateKey}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold rounded-xl text-[10px] active:scale-95 transition-all shadow-2xs flex items-center gap-1 mx-auto cursor-pointer" title="พิมพ์ใบเสร็จ/ใบส่งของเครื่องพิมพ์ความร้อน 80x80">
                                    <span class="material-symbols-outlined text-xs">print</span>
                                    <span>พิมพ์สลิป</span>
                                </button>
                            </td>
                        </tr>`;
                    }).join("")}
                </tbody>
            </table>
        </div>`}
        <!-- ปุ่มพิมพ์สมุดบัญชีออเดอร์กระดาษ A4 ตรงกลางด้านล่างหมวด 4 -->
        <div class="pt-3 border-t border-slate-100 flex justify-center">
            <button onclick="printA4OrdersAuditLedger('${targetDateKey}')" class="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white font-extrabold rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-sm">print</span>
                <span>📄 พิมพ์สมุดบัญชีออเดอร์ประจำวันทั้งหมด (กระดาษ A4)</span>
            </button>
        </div>
    </div>
    `;

    container.innerHTML = html;
}

// ── Modal Controllers: Vendor PromptPay Payout Modal
function openVendorPayoutModal(stallId, stallName, amount, phone, ownerName, stallNumber) {
    _currentPayoutStall = {
        stallId,
        stallName,
        amount,
        phone: phone || "089-123-4567",
        cleanPhone: (phone || "0891234567").replace(/[^0-9]/g, ""),
        ownerName: ownerName || "แม่ค้าประจำแผง",
        stallNumber: stallNumber || "แผงตลาด"
    };

    const modal = document.getElementById("vendor-payout-modal");
    if (!modal) return;

    const nameEl = document.getElementById("payout-stall-name");
    const zoneEl = document.getElementById("payout-stall-zone");
    const ownerEl = document.getElementById("payout-owner-name");
    const phoneEl = document.getElementById("payout-phone");
    const amountEl = document.getElementById("payout-amount-text");
    const qrImg = document.getElementById("payout-qr-image");
    const ppNumEl = document.getElementById("payout-promptpay-number");

    if (nameEl) nameEl.textContent = _currentPayoutStall.stallName;
    if (zoneEl) zoneEl.textContent = _currentPayoutStall.stallNumber;
    if (ownerEl) ownerEl.textContent = _currentPayoutStall.ownerName;
    if (phoneEl) phoneEl.textContent = _currentPayoutStall.phone;
    if (amountEl) amountEl.textContent = `฿${_currentPayoutStall.amount.toLocaleString()}`;
    if (ppNumEl) ppNumEl.textContent = _currentPayoutStall.phone;

    // PromptPay QR image via standard promptpay.io API
    if (qrImg) {
        qrImg.src = `https://promptpay.io/${_currentPayoutStall.cleanPhone}/${_currentPayoutStall.amount}.png`;
    }

    modal.classList.remove("hidden");
}

function closeVendorPayoutModal() {
    const modal = document.getElementById("vendor-payout-modal");
    if (modal) modal.classList.add("hidden");
}

function confirmVendorPayoutSettled() {
    if (!_currentPayoutStall) {
        closeVendorPayoutModal();
        return;
    }

    const dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const settledVendors = _loadVendorSettlementState(dateKey);

    const sKey = _currentPayoutStall.stallId || _currentPayoutStall.stallName;
    settledVendors[sKey] = {
        isSettled: true,
        settledAt: Date.now(),
        amount: _currentPayoutStall.amount,
        stallName: _currentPayoutStall.stallName,
        phone: _currentPayoutStall.phone
    };

    _saveVendorSettlementState(dateKey, settledVendors);
    closeVendorPayoutModal();
    showToast(`🎉 บันทึกการโอนเงินให้ ${_currentPayoutStall.stallName} (฿${_currentPayoutStall.amount.toLocaleString()}) สำเร็จ!`);
    renderHubDailyReport(dateKey);
}

function copyPayoutPromptPayNumber() {
    if (!_currentPayoutStall) return;
    const phoneNum = _currentPayoutStall.cleanPhone;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNum).then(() => {
            showToast(`📋 คัดลอกหมายเลขพร้อมเพย์ ${phoneNum} เรียบร้อยแล้ว`);
        }).catch(() => {
            showToast(`📱 หมายเลขพร้อมเพย์: ${phoneNum}`);
        });
    } else {
        showToast(`📱 หมายเลขพร้อมเพย์: ${phoneNum}`);
    }
}

// ── Rider Settlement Toggle
function settleRiderBalance(riderName, dateKey) {
    if (!riderName) return;
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());

    const settledRiders = _loadRiderSettlementState(dateKey);
    const current = Boolean(settledRiders[riderName]?.isSettled);
    const next = !current;

    settledRiders[riderName] = {
        isSettled: next,
        settledAt: next ? Date.now() : null
    };

    _saveRiderSettlementState(dateKey, settledRiders);
    showToast(next ? `✅ เคลียร์ยอดเงินสดกับ ${riderName} เรียบร้อยแล้ว` : `↩️ ยกเลิกสถานะเคลียร์เงินของ ${riderName}`);
    renderHubDailyReport(dateKey);
}

// ── Batch Settle All Stalls
function settleAllVendors(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const settledVendors = _loadVendorSettlementState(dateKey);

    report.vendorSettlement.stalls.forEach(s => {
        const sKey = s.stallId || s.stallName;
        settledVendors[sKey] = {
            isSettled: true,
            settledAt: Date.now(),
            amount: s.totalAmount,
            stallName: s.stallName
        };
    });

    _saveVendorSettlementState(dateKey, settledVendors);
    showToast(`🎉 บันทึกการโอนเคลียร์เงินให้แผงค้าทั้งหมด (${report.vendorSettlement.stalls.length} แผง) เรียบร้อย!`);
    renderHubDailyReport(dateKey);
}

// ── CSV Export Function
function exportDailyReportCSV(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);

    let csv = "\uFEFF"; // UTF-8 BOM for Microsoft Excel Thai display
    csv += `รายงานสรุปรายวัน ตลาดฮับวิศิษฐ์ชัย ประจำวันที่,${dateKey}\n`;
    csv += `สร้างรายงานเมื่อ,${new Date().toLocaleString("th-TH")}\n\n`;

    // 1. สรุปภาพรวม
    csv += "--- 1. สรุปภาพรวมยอดขาย (GMV) ---\n";
    csv += "หัวข้อ,จำนวน\n";
    csv += `จำนวนออเดอร์ทั้งหมด,${report.summary.totalOrders} ใบ\n`;
    csv += `ส่งสำเร็จ,${report.summary.completedOrders} ใบ\n`;
    csv += `รอดำเนินการ,${report.summary.pendingOrders} ใบ\n`;
    csv += `ยอดขายรวมลูกค้า (GMV),${report.summary.totalCustomerGMV} บาท\n`;
    csv += `ค่าบริการจัดส่งรวม,${report.summary.totalDeliveryFees} บาท\n`;
    csv += `ยอดรับชำระผ่าน PromptPay,${report.summary.paymentBreakdown.promptpay.amount} บาท (${report.summary.paymentBreakdown.promptpay.count} ใบ)\n`;
    csv += `ยอดรับชำระผ่าน SCB Bank,${report.summary.paymentBreakdown.bank_transfer.amount} บาท (${report.summary.paymentBreakdown.bank_transfer.count} ใบ)\n`;
    csv += `ยอดรับชำระผ่าน COD (เงินสด),${report.summary.paymentBreakdown.cod.amount} บาท (${report.summary.paymentBreakdown.cod.count} ใบ)\n`;
    csv += `เงินทอนคืนลูกค้ากรณีของขาด,${report.summary.totalRefundCash} บาท\n\n`;

    // 2. เคลียร์เงินไรเดอร์
    csv += "--- 2. เคลียร์เงินไรเดอร์ ---\n";
    csv += "ชื่อไรเดอร์,เบอร์โทร,เที่ยววิ่ง,ค่ารอบสะสม(บาท),เงินสดCODเก็บมา(บาท),เงินทอนคืน(บาท),ยอดสุทธิส่งมอบฮับ(บาท),สถานะเคลียร์\n";
    report.riderSettlement.riders.forEach(r => {
        csv += `"${r.riderName}","${r.riderPhone}",${r.tripsCount},${r.riderFeeEarned},${r.codCollected},${r.refundHanded},${r.netCashToHub},"${r.isSettled ? 'เคลียร์แล้ว' : 'รอเคลียร์'}"\n`;
    });
    csv += `\n`;

    // 3. เคลียร์เงินร้านค้า
    csv += "--- 3. เคลียร์เงินร้านค้า/แผงค้า ---\n";
    csv += "แผงค้า,เลขแผง/โซน,เจ้าของ,เบอร์พร้อมเพย์,จำนวนชิ้น,จำนวนออเดอร์,ยอดเงินที่ต้องโอน(บาท),สถานะโอน\n";
    report.vendorSettlement.stalls.forEach(s => {
        csv += `"${s.stallName}","${s.stallNumber}",${s.ownerName},"${s.phone}",${s.itemsCount},${s.orderCount},${s.totalAmount},"${s.isSettled ? 'โอนแล้ว' : 'รอโอน'}"\n`;
    });
    csv += `\n`;

    // 4. บัญชีออเดอร์ทั้งหมด
    csv += "--- 4. รายการออเดอร์ทั้งหมด ---\n";
    csv += "รหัสออเดอร์,เวลา,ชื่อลูกค้า,เบอร์โทรลูกค้า,วิธีชำระเงิน,ยอดรวม(บาท),ค่าส่ง(บาท),ไรเดอร์,สถานะออเดอร์\n";
    report.ordersList.forEach(o => {
        const time = o.savedAt ? new Date(o.savedAt).toLocaleTimeString("th-TH") : (o.orderTime || "");
        csv += `"${o.orderId}","${time}","${o.customerName || ''}","${o.customerPhone || ''}","${o.paymentType || ''}",${o.grandTotal || o.total || 0},${o.deliveryFee || 20},"${o.riderName || ''}","${o.status || ''}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `talathub_daily_report_${dateKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`📥 ดาวน์โหลดรายงาน CSV วันที่ ${dateKey} เรียบร้อยแล้ว`);
}

// ==========================================
// TALATHUB COMPREHENSIVE PRINT ENGINE
// รองรับการพิมพ์ 2 โหมด:
// 1. เครื่องพิมพ์ความร้อน POS ใบเสร็จขนาดเล็ก 80x80mm (80mm Thermal Slip)
// 2. เครื่องพิมพ์เอกสารมาตรฐานกระดาษ A4 (A4 Full Report & Audit Ledger)
// ==========================================

function executePrintHtml(title, bodyContent, isThermal = false) {
    let iframe = document.getElementById("talathub-print-frame");
    if (iframe) iframe.remove();

    iframe = document.createElement("iframe");
    iframe.id = "talathub-print-frame";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = isThermal ? "72mm" : "210mm";
    iframe.style.height = isThermal ? "800px" : "1100px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <style>
                * { box-sizing: border-box; }
                @page {
                    size: ${isThermal ? 'auto' : 'A4 portrait'};
                    margin: ${isThermal ? '0mm !important' : '10mm 12mm !important'};
                }
                @media print {
                    @page {
                        size: ${isThermal ? 'auto' : 'A4 portrait'};
                        margin: ${isThermal ? '0mm !important' : '10mm 12mm !important'};
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: 0 !important;
                        background: #fff !important;
                        color: #000 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #print-root-container {
                        width: ${isThermal ? '68mm !important' : '100% !important'};
                        max-width: ${isThermal ? '68mm !important' : '100% !important'};
                        margin: 0 auto !important;
                        padding: ${isThermal ? '2mm 1mm 4mm 1mm !important' : '0 !important'};
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                }
                body {
                    font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif;
                    background: #fff;
                    color: #000;
                    margin: 0;
                    padding: 0;
                    font-size: ${isThermal ? '11px' : '12px'};
                    line-height: ${isThermal ? '1.3' : '1.45'};
                }
                #print-root-container {
                    width: ${isThermal ? '68mm' : '100%'};
                    max-width: ${isThermal ? '68mm' : '100%'};
                    margin: 0 auto;
                    padding: ${isThermal ? '2mm 1mm 4mm 1mm' : '10mm 12mm'};
                    box-sizing: border-box;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .font-bold { font-weight: bold; }
                .font-black { font-weight: 900; }
                .row { display: flex; justify-content: space-between; align-items: baseline; margin: 1.5px 0; }
                .divider-dashed { border-top: 1px dashed #333; margin: 4px 0; }
                .divider-solid { border-top: 1px solid #000; margin: 5px 0; }
                .divider-double { border-top: 3px double #000; margin: 5px 0; }
                table { width: 100%; border-collapse: collapse; margin: 5px 0; font-size: inherit; }
                th, td { padding: 3px 5px; }

                /* Thermal Slip Specialized Styles (80mm POS) */
                .slip-brand { text-align: center; margin-bottom: 4px; }
                .market-name { font-size: 14.5px; font-weight: 900; letter-spacing: 0.3px; color: #000; }
                .market-sub { font-size: 8px; font-weight: 600; color: #333; letter-spacing: 0.8px; margin-top: 1px; text-transform: uppercase; }
                .doc-badge { font-size: 10.5px; font-weight: 800; margin-top: 3px; display: inline-block; }
                
                .slip-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5px; margin: 1.5px 0; }
                .slip-label { color: #222; font-weight: normal; flex-shrink: 0; }
                .slip-value { color: #000; font-weight: 700; text-align: right; word-break: break-word; max-width: 65%; }

                .settle-box {
                    border: 1.5px solid #000;
                    border-radius: 4px;
                    padding: 4px 6px;
                    margin: 5px 0;
                    text-align: center;
                    background: #fff;
                }
                .settle-title {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.2px;
                }
                .settle-amount {
                    font-size: 18.5px;
                    font-weight: 900;
                    line-height: 1.2;
                    margin: 1.5px 0;
                }
                .settle-sub {
                    font-size: 8.5px;
                    color: #222;
                }

                .sig-container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 12px;
                    margin-bottom: 3px;
                }
                .sig-col {
                    width: 47%;
                    text-align: center;
                }
                .sig-line {
                    width: 82%;
                    border-top: 1px dotted #000;
                    margin: 18px auto 2px auto;
                }
                .sig-name {
                    font-size: 8.5px;
                    font-weight: bold;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .sig-role {
                    font-size: 7.5px;
                    color: #444;
                    margin-top: 1px;
                }
                .slip-footer {
                    text-align: center;
                    font-size: 8px;
                    color: #444;
                    line-height: 1.3;
                    margin-top: 3px;
                }

                ${!isThermal ? `
                    .a4-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 14px; }
                    .a4-title { font-size: 17px; font-weight: 900; color: #000; }
                    .a4-meta { font-size: 11px; color: #444; margin-top: 3px; }
                    .a4-table { margin-top: 8px; font-size: 11px; }
                    .a4-table th { background-color: #f1f5f9; border: 1px solid #cbd5e1; font-weight: bold; }
                    .a4-table td { border: 1px solid #e2e8f0; }
                    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }
                    .summary-box { border: 1px solid #cbd5e1; padding: 7px 10px; border-radius: 6px; background: #f8fafc; font-size: 11px; }
                    .signature-section { display: flex; justify-content: space-around; margin-top: 36px; text-align: center; font-size: 11px; }
                    .sig-line { width: 180px; border-top: 1px dotted #000; margin: 38px auto 4px; }
                ` : ''}
            </style>
        </head>
        <body>
            <div id="print-root-container">
                ${bodyContent}
            </div>
        </body>
        </html>
    `);
    doc.close();

    setTimeout(() => {
        try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        } catch (e) {
            console.error("Print error:", e);
            window.print();
        }
    }, 300);
}

// ── 1. พิมพ์สลิปความร้อน 80mm: เคลียร์เงินไรเดอร์
function printThermalRiderSlip(riderName, dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const r = report.riderSettlement.riders.find(x => x.riderName === riderName);
    if (!r) {
        showToast("⚠️ ไม่พบข้อมูลไรเดอร์ในวันที่เลือก");
        return;
    }

    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

    const content = `
        <div class="slip-brand">
            <div class="market-name">🏪 ตลาดสดฮับวิศิษฐ์ชัย</div>
            <div class="market-sub">WISIT CHAI FRESH HUB MARKET</div>
            <div class="doc-badge">[ ใบสรุปเคลียร์เงินไรเดอร์ ]</div>
        </div>
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">วันที่:</span><span class="slip-value">${thaiDate}</span></div>
        <div class="slip-row"><span class="slip-label">เวลาพิมพ์:</span><span class="slip-value">${printTime} น.</span></div>
        <div class="slip-row"><span class="slip-label">ไรเดอร์:</span><span class="slip-value">${r.riderName}</span></div>
        <div class="slip-row"><span class="slip-label">เบอร์โทร:</span><span class="slip-value">${r.riderPhone}</span></div>
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">1. จำนวนเที่ยวส่งสำเร็จ:</span><span class="slip-value">${r.tripsCount} เที่ยว</span></div>
        <div class="slip-row"><span class="slip-label">2. ค่ารอบสะสม (+฿40/เที่ยว):</span><span class="slip-value">+฿${r.riderFeeEarned.toLocaleString()}</span></div>
        <div class="slip-row"><span class="slip-label">3. เงินสด COD ที่เก็บมา:</span><span class="slip-value">+฿${r.codCollected.toLocaleString()}</span></div>
        <div class="slip-row"><span class="slip-label">4. เงินทอนคืนลูกค้า (ของขาด):</span><span class="slip-value">${r.refundHanded > 0 ? `-฿${r.refundHanded.toLocaleString()}` : '฿0'}</span></div>
        <div class="settle-box">
            <div class="settle-title">${r.netCashToHub >= 0 ? 'ยอดเงินสดที่ไรเดอร์ส่งมอบฮับ' : 'ยอดเงินสดที่ฮับจ่ายเพิ่มให้ไรเดอร์'}</div>
            <div class="settle-amount">${r.netCashToHub >= 0 ? `฿${r.netCashToHub.toLocaleString()}` : `-฿${Math.abs(r.netCashToHub).toLocaleString()}`}</div>
            <div class="settle-sub">${r.netCashToHub >= 0 ? '(ไรเดอร์ส่งมอบเงินสดเข้ากองกลางฮับ)' : '(ฮับจ่ายชดเชยค่ารอบเป็นเงินสดให้ไรเดอร์)'}</div>
        </div>
        <div class="slip-row" style="margin-top: 4px;">
            <span class="slip-label">สถานะการเคลียร์:</span>
            <span class="slip-value">${r.isSettled ? '✅ เคลียร์เงินเรียบร้อยแล้ว' : '⏳ รอเคลียร์เงินสด'}</span>
        </div>
        <div class="sig-container">
            <div class="sig-col">
                <div class="sig-line"></div>
                <div class="sig-name">( ${r.riderName} )</div>
                <div class="sig-role">ไรเดอร์ผู้ส่งมอบเงิน</div>
            </div>
            <div class="sig-col">
                <div class="sig-line"></div>
                <div class="sig-name">( เจ้าหน้าที่รับเงินสด )</div>
                <div class="sig-role">ฝ่ายการเงิน / ตรวจนับ</div>
            </div>
        </div>
        <div class="divider-dashed"></div>
        <div class="slip-footer">
            <div>ตลาดสดฮับวิศิษฐ์ชัย • ขอบคุณที่ร่วมงานด้วยความตั้งใจ</div>
            <div>เอกสารสรุปยอดประจำวันอัตโนมัติจากระบบฮับ</div>
        </div>
    `;

    executePrintHtml(`สลิปไรเดอร์_${r.riderName}_${dateKey}`, content, true);
}

// ── 2. พิมพ์สลิปความร้อน 80mm: เคลียร์เงินแผงค้า/ร้านค้า
function printThermalVendorSlip(stallId, dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const s = report.vendorSettlement.stalls.find(x => x.stallId === stallId);
    if (!s) {
        showToast("⚠️ ไม่พบข้อมูลแผงค้าในวันที่เลือก");
        return;
    }

    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

    const content = `
        <div class="slip-brand">
            <div class="market-name">🏪 ตลาดสดฮับวิศิษฐ์ชัย</div>
            <div class="market-sub">WISIT CHAI FRESH HUB MARKET</div>
            <div class="doc-badge">[ ใบสรุปยอดขาย & เคลียร์เงินแผงค้า ]</div>
        </div>
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">วันที่:</span><span class="slip-value">${thaiDate}</span></div>
        <div class="slip-row"><span class="slip-label">เวลาพิมพ์:</span><span class="slip-value">${printTime} น.</span></div>
        <div class="slip-row"><span class="slip-label">แผงค้า:</span><span class="slip-value">${s.stallName}</span></div>
        <div class="slip-row"><span class="slip-label">ตำแหน่ง:</span><span class="slip-value">${s.stallNumber} (โซน ${s.zone})</span></div>
        <div class="slip-row"><span class="slip-label">เจ้าของแผง:</span><span class="slip-value">${s.ownerName}</span></div>
        <div class="slip-row"><span class="slip-label">เบอร์พร้อมเพย์:</span><span class="slip-value">${s.phone}</span></div>
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">จำนวนออเดอร์ที่เข้ารับ:</span><span class="slip-value">${s.orderCount} บิล</span></div>
        <div class="slip-row"><span class="slip-label">จำนวนสินค้าที่ขายได้จริง:</span><span class="slip-value">${s.itemsCount} ชิ้น</span></div>
        <div class="slip-row"><span class="slip-label">ค่าธรรมเนียม GP ตลาด (0%):</span><span class="slip-value">฿0</span></div>
        <div class="settle-box">
            <div class="settle-title">ยอดเงินสุทธิที่ฮับโอนให้</div>
            <div class="settle-amount">฿${s.totalAmount.toLocaleString()}</div>
            <div class="settle-sub">โอนผ่าน PromptPay: ${s.phone}</div>
        </div>
        <div class="slip-row" style="margin-top: 4px;">
            <span class="slip-label">สถานะการโอน:</span>
            <span class="slip-value">${s.isSettled ? '✅ โอนเงินเรียบร้อยแล้ว' : '⏳ รอโอนเงิน (รอบ 18:30 น.)'}</span>
        </div>
        <div class="sig-container">
            <div class="sig-col">
                <div class="sig-line"></div>
                <div class="sig-name">( ${s.ownerName || 'เจ้าของแผงค้า'} )</div>
                <div class="sig-role">ผู้รับเงิน / เจ้าของแผง</div>
            </div>
            <div class="sig-col">
                <div class="sig-line"></div>
                <div class="sig-name">( ฝ่ายบัญชีและการเงิน )</div>
                <div class="sig-role">ผู้ตรวจจ่าย / เจ้าหน้าที่ฮับ</div>
            </div>
        </div>
        <div class="divider-dashed"></div>
        <div class="slip-footer">
            <div>ตลาดสดฮับวิศิษฐ์ชัย • หนุนร้านค้าชุมชน ขายดีทุกวัน</div>
            <div>เอกสารสรุปยอดประจำวันอัตโนมัติจากระบบฮับ</div>
        </div>
    `;

    executePrintHtml(`สลิปแผงค้า_${s.stallName}_${dateKey}`, content, true);
}

// ── 3. พิมพ์สลิปความร้อน 80mm: ใบเสร็จ/ใบส่งของรายออเดอร์
function printThermalOrderSlip(orderId, dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    let o = report.ordersList.find(x => x.orderId === orderId);
    if (!o) {
        o = _collectAllOrders().find(x => x.orderId === orderId);
    }
    if (!o) {
        showToast("⚠️ ไม่พบข้อมูลคำสั่งซื้อ");
        return;
    }

    const thaiDate = formatThaiDateDisplay(dateKey);
    const orderTimeStr = o.savedAt ? new Date(o.savedAt).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) : (o.orderTime || "--:--");
    const pType = (o.paymentType || "promptpay").toLowerCase();
    const paymentLabel = pType === "cod" || pType === "cash" ? "💵 เงินสดปลายทาง (COD)" : (pType === "bank_transfer" || pType === "scb" ? "🏦 โอนเงิน SCB" : "📱 สแกนพร้อมเพย์");

    // รวบรวมรายการสินค้า
    let itemsList = [];
    if (o.items && Array.isArray(o.items) && o.items.length > 0) {
        itemsList = o.items;
    } else if (o.stalls && Array.isArray(o.stalls)) {
        o.stalls.forEach(st => {
            (st.items || []).forEach(it => {
                itemsList.push({
                    name: it.name || it.productName || it.title || "สินค้าสด",
                    qty: it.qty || it.quantity || 1,
                    price: (it.actualPrice !== undefined ? it.actualPrice : it.price) || 0,
                    stallName: st.stallName || st.name || ""
                });
            });
        });
    }

    let itemsHtml = "";
    if (itemsList.length > 0) {
        itemsHtml = itemsList.map(it => {
            const itPrice = Number(it.price || 0);
            const itQty = Number(it.qty || 1);
            const sub = itPrice * itQty;
            return `
                <div style="margin: 2.5px 0; font-size: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <span style="max-width: 72%; word-break: break-word;">• ${it.name} x${itQty}</span>
                        <span style="font-weight: bold;">฿${sub.toLocaleString()}</span>
                    </div>
                    ${it.stallName ? `<div style="font-size: 8.5px; color: #555; padding-left: 8px;">(${it.stallName})</div>` : ''}
                </div>
            `;
        }).join("");
    } else {
        itemsHtml = `<div style="font-size: 10px; color: #555;">(สินค้าสดคัดคุณภาพตามรายการสั่งซื้อ)</div>`;
    }

    const grandTotal = Number(o.grandTotal || o.total || 0);
    const delFee = Number(o.deliveryFee || 20);
    const goodsTotal = Math.max(0, grandTotal - delFee);

    const content = `
        <div class="slip-brand">
            <div class="market-name">🏪 ตลาดสดฮับวิศิษฐ์ชัย</div>
            <div class="market-sub">WISIT CHAI FRESH HUB MARKET</div>
            <div class="doc-badge">[ ใบเสร็จรับเงิน & ใบส่งของ ]</div>
        </div>
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">เลขที่บิล:</span><span class="slip-value" style="font-size: 11px;">${o.orderId}</span></div>
        <div class="slip-row"><span class="slip-label">วันที่-เวลา:</span><span class="slip-value">${thaiDate} (${orderTimeStr} น.)</span></div>
        <div class="slip-row"><span class="slip-label">ผู้รับสินค้า:</span><span class="slip-value">${o.customerName || 'ลูกค้าทั่วไป'}</span></div>
        <div class="slip-row"><span class="slip-label">โทรศัพท์:</span><span class="slip-value">${o.customerPhone || '-'}</span></div>
        <div style="margin: 3px 0; font-size: 10px; line-height: 1.3;">
            <span style="color: #333;">ที่อยู่จัดส่ง: </span><strong>${o.address || 'ที่อยู่จัดส่งในเขตบริการ'}</strong>
        </div>
        ${o.landmark ? `<div style="margin: 2px 0 3px; font-size: 9.5px; color: #444;">จุดสังเกต: ${o.landmark}</div>` : ''}
        <div class="slip-row"><span class="slip-label">ไรเดอร์นำส่ง:</span><span class="slip-value">${o.riderName || 'พี่สมชาย (1กข 8902)'}</span></div>
        <div class="divider-dashed"></div>
        <div style="font-weight: bold; margin-bottom: 3px; font-size: 10.5px;">รายการสินค้าที่จัดส่ง:</div>
        ${itemsHtml}
        <div class="divider-dashed"></div>
        <div class="slip-row"><span class="slip-label">รวมค่าสินค้า:</span><span class="slip-value">฿${goodsTotal.toLocaleString()}</span></div>
        <div class="slip-row"><span class="slip-label">ค่าบริการจัดส่ง:</span><span class="slip-value">฿${delFee.toLocaleString()}</span></div>
        <div class="settle-box">
            <div class="settle-title">ยอดชำระรวมทั้งสิ้น</div>
            <div class="settle-amount">฿${grandTotal.toLocaleString()}</div>
            <div class="settle-sub">${paymentLabel}</div>
        </div>
        <div class="divider-dashed" style="margin-top: 8px;"></div>
        <div class="slip-footer">
            <div>ขอบคุณที่อุดหนุนตลาดสดฮับวิศิษฐ์ชัย</div>
            <div>คัดสดจากแผง สะอาด ส่งไว ถึงหน้าบ้านคุณ 100%</div>
            <div style="margin-top: 2px;">สอบถาม / ติดต่อฮับ: 089-123-4567</div>
        </div>
    `;

    executePrintHtml(`ใบเสร็จ_${o.orderId}_${dateKey}`, content, true);
}

// ── 4. พิมพ์สรุปกระดาษ A4: หมวด 2 เคลียร์เงินไรเดอร์ทั้งหมด
function printA4RidersSummary(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleString("th-TH");

    let tableRows = "";
    report.riderSettlement.riders.forEach((r, idx) => {
        tableRows += `
            <tr>
                <td class="text-center">${idx + 1}</td>
                <td><strong>${r.riderName}</strong></td>
                <td class="text-center">${r.riderPhone}</td>
                <td class="text-center">${r.tripsCount}</td>
                <td class="text-right font-bold">฿${r.riderFeeEarned.toLocaleString()}</td>
                <td class="text-right font-bold">฿${r.codCollected.toLocaleString()}</td>
                <td class="text-right">${r.refundHanded > 0 ? `-฿${r.refundHanded.toLocaleString()}` : '฿0'}</td>
                <td class="text-right font-bold" style="color: ${r.netCashToHub >= 0 ? '#047857' : '#b91c1c'};">
                    ฿${r.netCashToHub.toLocaleString()}
                </td>
                <td class="text-center font-bold">
                    ${r.isSettled ? '✅ เคลียร์แล้ว' : '⏳ รอเคลียร์'}
                </td>
            </tr>
        `;
    });

    const content = `
        <div class="a4-header">
            <div class="a4-title">รายงานสรุปการเคลียร์เงินไรเดอร์ประจำวัน (Rider Settlement Summary)</div>
            <div class="a4-meta">
                ตลาดสดฮับวิศิษฐ์ชัย • ประจำวันที่ ${thaiDate} • พิมพ์รายงานเมื่อ: ${printTime}
            </div>
        </div>

        <div class="summary-grid">
            <div class="summary-box">
                <div>ไรเดอร์ปฏิบัติงาน:</div>
                <div style="font-size: 15px; font-weight: bold;">${report.riderSettlement.riders.length} คน</div>
            </div>
            <div class="summary-box">
                <div>รวมเที่ยวส่งทั้งหมด:</div>
                <div style="font-size: 15px; font-weight: bold;">${report.riderSettlement.totalTrips} เที่ยว</div>
            </div>
            <div class="summary-box">
                <div>รวมเงินสด COD ที่เก็บมา:</div>
                <div style="font-size: 15px; font-weight: bold; color: #b45309;">฿${report.riderSettlement.totalCodCollected.toLocaleString()}</div>
            </div>
            <div class="summary-box">
                <div>ยอดสุทธิที่ฮับต้องรับมอบ:</div>
                <div style="font-size: 15px; font-weight: bold; color: #047857;">฿${report.riderSettlement.netCashToHub.toLocaleString()}</div>
            </div>
        </div>

        <table class="a4-table">
            <thead>
                <tr>
                    <th class="text-center" style="width: 35px;">ที่</th>
                    <th>ชื่อไรเดอร์</th>
                    <th class="text-center">เบอร์โทร</th>
                    <th class="text-center">เที่ยวส่ง</th>
                    <th class="text-right">ค่ารอบสะสม</th>
                    <th class="text-right">เงินสด COD</th>
                    <th class="text-right">เงินทอนคืน</th>
                    <th class="text-right">ยอดสุทธิส่งฮับ</th>
                    <th class="text-center">สถานะ</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows || '<tr><td colspan="9" class="text-center">ไม่มีข้อมูลไรเดอร์ในวันที่เลือก</td></tr>'}
            </tbody>
            <tfoot>
                <tr style="background: #f8fafc; font-weight: bold; border-top: 2px solid #000;">
                    <td colspan="3" class="text-center">รวมทั้งสิ้น</td>
                    <td class="text-center">${report.riderSettlement.totalTrips} เที่ยว</td>
                    <td class="text-right">฿${report.riderSettlement.totalRiderFees.toLocaleString()}</td>
                    <td class="text-right">฿${report.riderSettlement.totalCodCollected.toLocaleString()}</td>
                    <td class="text-right">${report.riderSettlement.totalRefundHanded > 0 ? `-฿${report.riderSettlement.totalRefundHanded.toLocaleString()}` : '฿0'}</td>
                    <td class="text-right" style="color: #047857;">฿${report.riderSettlement.netCashToHub.toLocaleString()}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>

        <div class="signature-section">
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">เจ้าหน้าที่ตรวจรับเงินสดฮับ</div>
            </div>
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">ผู้จัดการตลาดฮับวิศิษฐ์ชัย</div>
            </div>
        </div>
    `;

    executePrintHtml(`รายงานเคลียร์เงินไรเดอร์_${dateKey}`, content, false);
}

// ── 5. พิมพ์สรุปกระดาษ A4: หมวด 3 เคลียร์เงินร้านค้า/แผงค้าทั้งหมด
function printA4VendorsSummary(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleString("th-TH");

    let tableRows = "";
    report.vendorSettlement.stalls.forEach((s, idx) => {
        tableRows += `
            <tr>
                <td class="text-center">${idx + 1}</td>
                <td><strong>${s.stallName}</strong></td>
                <td class="text-center">${s.stallNumber} (โซน ${s.zone})</td>
                <td>${s.ownerName}</td>
                <td class="text-center">${s.phone}</td>
                <td class="text-center">${s.itemsCount} ชิ้น</td>
                <td class="text-center">${s.orderCount} บิล</td>
                <td class="text-right font-bold">฿${s.totalAmount.toLocaleString()}</td>
                <td class="text-center font-bold">
                    ${s.isSettled ? '✅ โอนแล้ว' : '⏳ รอโอน'}
                </td>
            </tr>
        `;
    });

    const content = `
        <div class="a4-header">
            <div class="a4-title">รายงานสรุปยอดขายและการเคลียร์เงินแผงค้า (Vendor Settlements Summary)</div>
            <div class="a4-meta">
                ตลาดสดฮับวิศิษฐ์ชัย • ประจำวันที่ ${thaiDate} • พิมพ์รายงานเมื่อ: ${printTime}
            </div>
        </div>

        <div class="summary-grid">
            <div class="summary-box">
                <div>แผงค้าที่มีรายการขาย:</div>
                <div style="font-size: 15px; font-weight: bold;">${report.vendorSettlement.stalls.length} แผง</div>
            </div>
            <div class="summary-box">
                <div>ยอดรวมค่าสินค้าทั้งหมด:</div>
                <div style="font-size: 15px; font-weight: bold; color: #047857;">฿${report.vendorSettlement.totalVendorAmount.toLocaleString()}</div>
            </div>
            <div class="summary-box">
                <div>โอนเงินเรียบร้อยแล้ว:</div>
                <div style="font-size: 15px; font-weight: bold; color: #1e40af;">฿${report.vendorSettlement.totalSettledAmount.toLocaleString()} (${report.vendorSettlement.settledCount} แผง)</div>
            </div>
            <div class="summary-box">
                <div>คงเหลือรอโอนเคลียร์:</div>
                <div style="font-size: 15px; font-weight: bold; color: #b91c1c;">฿${report.vendorSettlement.totalPendingAmount.toLocaleString()} (${report.vendorSettlement.pendingCount} แผง)</div>
            </div>
        </div>

        <table class="a4-table">
            <thead>
                <tr>
                    <th class="text-center" style="width: 35px;">ที่</th>
                    <th>แผงค้า / ร้านค้า</th>
                    <th class="text-center">เลขแผง / โซน</th>
                    <th>เจ้าของแผง</th>
                    <th class="text-center">เบอร์พร้อมเพย์</th>
                    <th class="text-center">ชิ้นที่ขาย</th>
                    <th class="text-center">ออเดอร์</th>
                    <th class="text-right">ยอดเงินโอน</th>
                    <th class="text-center">สถานะ</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows || '<tr><td colspan="9" class="text-center">ไม่มีข้อมูลการขายแผงค้าในวันที่เลือก</td></tr>'}
            </tbody>
            <tfoot>
                <tr style="background: #f8fafc; font-weight: bold; border-top: 2px solid #000;">
                    <td colspan="5" class="text-center">รวมทั้งสิ้น</td>
                    <td class="text-center">${report.vendorSettlement.stalls.reduce((a,b)=>a+b.itemsCount,0)} ชิ้น</td>
                    <td class="text-center">${report.vendorSettlement.stalls.reduce((a,b)=>a+b.orderCount,0)} บิล</td>
                    <td class="text-right" style="color: #047857;">฿${report.vendorSettlement.totalVendorAmount.toLocaleString()}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>

        <div class="signature-section">
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">ฝ่ายบัญชีและการเงินฮับ</div>
            </div>
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">ผู้จัดการตลาดฮับวิศิษฐ์ชัย</div>
            </div>
        </div>
    `;

    executePrintHtml(`รายงานเคลียร์เงินแผงค้า_${dateKey}`, content, false);
}

// ── 6. พิมพ์สรุปกระดาษ A4: หมวด 4 สมุดบัญชีออเดอร์ประจำวันทั้งหมด
function printA4OrdersAuditLedger(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleString("th-TH");

    let tableRows = "";
    report.ordersList.forEach((o, idx) => {
        const timeStr = o.savedAt ? new Date(o.savedAt).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) : (o.orderTime || "--:--");
        const pType = (o.paymentType || "promptpay").toLowerCase();
        const pLabel = pType === "cod" || pType === "cash" ? "COD (เงินสด)" : (pType === "bank_transfer" || pType === "scb" ? "โอน SCB" : "พร้อมเพย์");
        const statusLabel = o.status === "delivered" ? "จัดส่งสำเร็จ" : (o.status === "on_the_way" ? "กำลังนำส่ง" : "กำลังจัดของ");

        tableRows += `
            <tr>
                <td class="text-center">${idx + 1}</td>
                <td><strong>${o.orderId}</strong></td>
                <td class="text-center">${timeStr} น.</td>
                <td>${o.customerName || 'ลูกค้าทั่วไป'}</td>
                <td class="text-center">${o.customerPhone || '-'}</td>
                <td class="text-center">${pLabel}</td>
                <td class="text-right font-bold">฿${(o.grandTotal || o.total || 0).toLocaleString()}</td>
                <td class="text-center">${o.deliveryFee ? `฿${o.deliveryFee}` : '฿20'}</td>
                <td>${o.riderName || '-'}</td>
                <td class="text-center font-bold">${statusLabel}</td>
            </tr>
        `;
    });

    const content = `
        <div class="a4-header">
            <div class="a4-title">สมุดบัญชีแยกประเภทออเดอร์ประจำวัน (Daily Orders Audit Ledger)</div>
            <div class="a4-meta">
                ตลาดสดฮับวิศิษฐ์ชัย • ประจำวันที่ ${thaiDate} • พิมพ์รายงานเมื่อ: ${printTime}
            </div>
        </div>

        <div class="summary-grid">
            <div class="summary-box">
                <div>ออเดอร์ทั้งหมด:</div>
                <div style="font-size: 15px; font-weight: bold;">${report.summary.totalOrders} ใบ (สำเร็จ ${report.summary.completedOrders})</div>
            </div>
            <div class="summary-box">
                <div>ยอดขายรวม (GMV):</div>
                <div style="font-size: 15px; font-weight: bold; color: #047857;">฿${report.summary.totalCustomerGMV.toLocaleString()}</div>
            </div>
            <div class="summary-box">
                <div>พร้อมเพย์ + โอนธนาคาร:</div>
                <div style="font-size: 15px; font-weight: bold; color: #1e40af;">
                    ฿${(report.summary.paymentBreakdown.promptpay.amount + report.summary.paymentBreakdown.bank_transfer.amount).toLocaleString()}
                </div>
            </div>
            <div class="summary-box">
                <div>เงินสดปลายทาง (COD):</div>
                <div style="font-size: 15px; font-weight: bold; color: #b45309;">฿${report.summary.paymentBreakdown.cod.amount.toLocaleString()}</div>
            </div>
        </div>

        <table class="a4-table">
            <thead>
                <tr>
                    <th class="text-center" style="width: 30px;">ที่</th>
                    <th>รหัสออเดอร์</th>
                    <th class="text-center">เวลา</th>
                    <th>ชื่อลูกค้า</th>
                    <th class="text-center">เบอร์โทร</th>
                    <th class="text-center">วิธีชำระ</th>
                    <th class="text-right">ยอดรวม</th>
                    <th class="text-center">ค่าส่ง</th>
                    <th>ไรเดอร์</th>
                    <th class="text-center">สถานะ</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows || '<tr><td colspan="10" class="text-center">ไม่มีรายการออเดอร์ในวันที่เลือก</td></tr>'}
            </tbody>
            <tfoot>
                <tr style="background: #f8fafc; font-weight: bold; border-top: 2px solid #000;">
                    <td colspan="6" class="text-center">รวมทั้งสิ้น</td>
                    <td class="text-right" style="color: #047857;">฿${report.summary.totalCustomerGMV.toLocaleString()}</td>
                    <td class="text-center">฿${report.summary.totalDeliveryFees.toLocaleString()}</td>
                    <td colspan="2"></td>
                </tr>
            </tfoot>
        </table>

        <div class="signature-section">
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">เจ้าหน้าที่บันทึกข้อมูลและตรวจสอบออเดอร์</div>
            </div>
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">หัวหน้าฝ่ายปฏิบัติการฮับ</div>
            </div>
        </div>
    `;

    executePrintHtml(`สมุดบัญชีออเดอร์_${dateKey}`, content, false);
}

// ── 7. พิมพ์รายงานประจำวันภาพรวมทั้งฉบับ (A4 Comprehensive Report)
function printDailyReport(dateKey) {
    if (!dateKey) dateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(dateKey);
    const thaiDate = formatThaiDateDisplay(dateKey);
    const printTime = new Date().toLocaleString("th-TH");
    const hubNetMargin = report.summary.totalCustomerGMV - report.vendorSettlement.totalVendorAmount - report.riderSettlement.totalRiderFees;

    const content = `
        <div class="a4-header">
            <div class="a4-title">รายงานสรุปการดำเนินงานและการเงินประจำวัน (Comprehensive Daily Report)</div>
            <div class="a4-meta">
                ตลาดสดฮับวิศิษฐ์ชัย • ประจำวันที่ ${thaiDate} • พิมพ์รายงานเมื่อ: ${printTime}
            </div>
        </div>

        <div class="summary-grid">
            <div class="summary-box">
                <div>ยอดขายรวมลูกค้า (GMV):</div>
                <div style="font-size: 16px; font-weight: bold; color: #047857;">฿${report.summary.totalCustomerGMV.toLocaleString()}</div>
                <div style="font-size: 10px; color: #666;">ออเดอร์ทั้งหมด ${report.summary.totalOrders} ใบ</div>
            </div>
            <div class="summary-box">
                <div>ยอดเคลียร์แผงค้า (ต้นทุน):</div>
                <div style="font-size: 16px; font-weight: bold; color: #ea580c;">฿${report.vendorSettlement.totalVendorAmount.toLocaleString()}</div>
                <div style="font-size: 10px; color: #666;">แผงค้า ${report.vendorSettlement.stalls.length} แผง</div>
            </div>
            <div class="summary-box">
                <div>เงินสดไรเดอร์ส่งมอบฮับ:</div>
                <div style="font-size: 16px; font-weight: bold; color: #0284c7;">฿${report.riderSettlement.netCashToHub.toLocaleString()}</div>
                <div style="font-size: 10px; color: #666;">วิ่งส่งรวม ${report.riderSettlement.totalTrips} เที่ยว</div>
            </div>
            <div class="summary-box">
                <div>กำไรค่าบริการสุทธิฮับ (Margin):</div>
                <div style="font-size: 16px; font-weight: bold; color: #7c3aed;">฿${hubNetMargin.toLocaleString()}</div>
                <div style="font-size: 10px; color: #666;">(ยอดขาย - แผงค้า - ค่ารอบ)</div>
            </div>
        </div>

        <h4 style="margin: 14px 0 4px; font-size: 12px; font-weight: bold;">1. สรุปช่องทางรับชำระเงิน</h4>
        <table class="a4-table">
            <thead>
                <tr>
                    <th>ช่องทางรับเงิน</th>
                    <th class="text-center">จำนวนออเดอร์</th>
                    <th class="text-right">ยอดเงินรวม</th>
                    <th>หมายเหตุ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>📱 สแกนพร้อมเพย์ (PromptPay QR)</td>
                    <td class="text-center">${report.summary.paymentBreakdown.promptpay.count}</td>
                    <td class="text-right font-bold">฿${report.summary.paymentBreakdown.promptpay.amount.toLocaleString()}</td>
                    <td>เข้าบัญชีฮับกลางอัตโนมัติ</td>
                </tr>
                <tr>
                    <td>🏦 โอนผ่านธนาคาร SCB</td>
                    <td class="text-center">${report.summary.paymentBreakdown.bank_transfer.count}</td>
                    <td class="text-right font-bold">฿${report.summary.paymentBreakdown.bank_transfer.amount.toLocaleString()}</td>
                    <td>ตรวจสอบสลิปแล้ว</td>
                </tr>
                <tr>
                    <td>💵 เงินสดปลายทาง (COD)</td>
                    <td class="text-center">${report.summary.paymentBreakdown.cod.count}</td>
                    <td class="text-right font-bold">฿${report.summary.paymentBreakdown.cod.amount.toLocaleString()}</td>
                    <td>ไรเดอร์เก็บเงินสดมาส่งมอบฮับ</td>
                </tr>
            </tbody>
        </table>

        <h4 style="margin: 14px 0 4px; font-size: 12px; font-weight: bold;">2. สรุปเคลียร์เงินไรเดอร์</h4>
        <table class="a4-table">
            <thead>
                <tr>
                    <th>ไรเดอร์</th>
                    <th class="text-center">เที่ยวส่ง</th>
                    <th class="text-right">ค่ารอบสะสม</th>
                    <th class="text-right">COD เก็บมา</th>
                    <th class="text-right">เงินสดส่งมอบฮับ</th>
                    <th class="text-center">สถานะ</th>
                </tr>
            </thead>
            <tbody>
                ${report.riderSettlement.riders.map(r => `
                    <tr>
                        <td><strong>${r.riderName}</strong> (${r.riderPhone})</td>
                        <td class="text-center">${r.tripsCount}</td>
                        <td class="text-right">฿${r.riderFeeEarned.toLocaleString()}</td>
                        <td class="text-right">฿${r.codCollected.toLocaleString()}</td>
                        <td class="text-right font-bold" style="color: #047857;">฿${r.netCashToHub.toLocaleString()}</td>
                        <td class="text-center font-bold">${r.isSettled ? '✅ เคลียร์แล้ว' : '⏳ รอเคลียร์'}</td>
                    </tr>
                `).join('') || '<tr><td colspan="6" class="text-center">ไม่มีข้อมูล</td></tr>'}
            </tbody>
        </table>

        <h4 style="margin: 14px 0 4px; font-size: 12px; font-weight: bold;">3. สรุปเคลียร์เงินแผงค้า</h4>
        <table class="a4-table">
            <thead>
                <tr>
                    <th>แผงค้า</th>
                    <th>เจ้าของแผง (เบอร์โทร)</th>
                    <th class="text-center">ชิ้นที่ขาย</th>
                    <th class="text-right">ยอดเงินที่ต้องโอน</th>
                    <th class="text-center">สถานะ</th>
                </tr>
            </thead>
            <tbody>
                ${report.vendorSettlement.stalls.map(s => `
                    <tr>
                        <td><strong>${s.stallName}</strong> (${s.stallNumber})</td>
                        <td>${s.ownerName} (${s.phone})</td>
                        <td class="text-center">${s.itemsCount} ชิ้น</td>
                        <td class="text-right font-bold" style="color: #047857;">฿${s.totalAmount.toLocaleString()}</td>
                        <td class="text-center font-bold">${s.isSettled ? '✅ โอนแล้ว' : '⏳ รอโอน'}</td>
                    </tr>
                `).join('') || '<tr><td colspan="5" class="text-center">ไม่มีข้อมูล</td></tr>'}
            </tbody>
        </table>

        <div class="signature-section" style="margin-top: 30px;">
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">เจ้าหน้าที่จัดทำรายงาน</div>
            </div>
            <div>
                <div class="sig-line"></div>
                <div>( .................................................... )</div>
                <div style="font-size: 10px; color: #555;">ผู้จัดการตลาดฮับวิศิษฐ์ชัย</div>
            </div>
        </div>
    `;

    executePrintHtml(`รายงานประจำวัน_${dateKey}`, content, false);
}

// Global attachment
window.executePrintHtml = executePrintHtml;
window.printThermalRiderSlip = printThermalRiderSlip;
window.printThermalVendorSlip = printThermalVendorSlip;
window.printThermalOrderSlip = printThermalOrderSlip;
window.printA4RidersSummary = printA4RidersSummary;
window.printA4VendorsSummary = printA4VendorsSummary;
window.printA4OrdersAuditLedger = printA4OrdersAuditLedger;
window.printDailyReport = printDailyReport;

// ── Sample Generator: สำหรับทดสอบรายงานทันทีในกรณีที่วันนั้นยังไม่มีออเดอร์
function generateSampleDailyOrders() {
    const today = getReportDateKey(Date.now());
    const now = Date.now();

    const sampleOrders = [
        {
            orderId: "#TH-8101",
            status: "delivered",
            total: 310,
            grandTotal: 310,
            deliveryFee: 20,
            paymentType: "cod",
            paymentDesc: "เก็บเงินสดปลายทาง (COD)",
            customerName: "คุณวิภาวรรณ (หมู่บ้านศุภาลัย)",
            customerPhone: "081-445-8899",
            riderName: "พี่สมชาย (1กข 8902)",
            riderPhone: "081-588-7400",
            savedAt: now - 3600000 * 3,
            deliveredAt: "08:15 น.",
            stalls: [
                {
                    stallId: "stall_chicken",
                    name: "ร้านไก่สดเฮียส่ง (แผง A01)",
                    items: [
                        { name: "อกไก่สดลอกหนัง (อนามัย)", price: 85, actualPrice: 85, qty: 2, outOfStock: false }
                    ]
                },
                {
                    stallId: "stall_b01_extra",
                    name: "ผักสวนครัวลุงสนั่น",
                    items: [
                        { name: "ผักบุ้งจีนสด 1 กำ", price: 20, actualPrice: 20, qty: 1, outOfStock: false },
                        { name: "คะน้าฮ่องกง 1 ถุง", price: 35, actualPrice: 35, qty: 1, outOfStock: false }
                    ]
                }
            ]
        },
        {
            orderId: "#TH-8102",
            status: "delivered",
            total: 540,
            grandTotal: 540,
            deliveryFee: 20,
            paymentType: "promptpay",
            paymentDesc: "ชำระผ่าน PromptPay แล้ว",
            customerName: "คุณอนุชา (ซอยเทศบาล 4)",
            customerPhone: "089-778-1122",
            riderName: "พี่สมชาย (1กข 8902)",
            riderPhone: "081-588-7400",
            savedAt: now - 3600000 * 2,
            deliveredAt: "09:30 น.",
            stalls: [
                {
                    stallId: "stall_chicken",
                    name: "ร้านไก่สดเฮียส่ง (แผง A01)",
                    items: [
                        { name: "น่องติดสะโพกไก่สด", price: 45, actualPrice: 45, qty: 2, outOfStock: false },
                        { name: "ปีกกลางไก่สดคัดเกรด", price: 75, actualPrice: 75, qty: 2, outOfStock: false }
                    ]
                },
                {
                    stallId: "stall_e05_extra",
                    name: "ปลาหมึกย่าง & ซีฟู้ดมหาชัย",
                    items: [
                        { name: "ปลาหมึกกล้วยสด 1 กก.", price: 220, actualPrice: 220, qty: 1, outOfStock: false }
                    ]
                }
            ]
        },
        {
            orderId: "#TH-8103",
            status: "on_the_way",
            total: 285,
            grandTotal: 285,
            deliveryFee: 20,
            paymentType: "bank_transfer",
            paymentDesc: "โอน SCB แล้ว (4111305737)",
            customerName: "ป้าสมใจ (ร้านก๋วยเตี๋ยวหน้าอำเภอ)",
            customerPhone: "086-332-9900",
            riderName: "พี่สมชาย (1กข 8902)",
            riderPhone: "081-588-7400",
            savedAt: now - 3600000 * 1,
            stalls: [
                {
                    stallId: "stall_chicken",
                    name: "ร้านไก่สดเฮียส่ง (แผง A01)",
                    items: [
                        { name: "สันในไก่สดเส้นสวย", price: 50, actualPrice: 50, qty: 1, outOfStock: false }
                    ]
                },
                {
                    stallId: "stall_c03_extra",
                    name: "หอมแดง กระเทียม กะปิระนอง ป้าแจ๋ว",
                    items: [
                        { name: "กระเทียมไทยคัดพิเศษ 1 กก.", price: 95, actualPrice: 95, qty: 1, outOfStock: false }
                    ]
                }
            ]
        }
    ];

    sampleOrders.forEach(o => archiveOrderToHistory(o));
    showToast("🎉 สร้าง 3 ออเดอร์ตัวอย่างเรียบร้อยแล้ว! พร้อมตรวจดูรายงานประจำวัน");
    renderHubDailyReport(today);
}


// ==========================================
// CATALOG FILTERING & RENDERING (SUPER-GROUPS)
// ==========================================
function renderCatalog() {
    const container = document.getElementById("products-catalog-container");
    const singleStallBanner = document.getElementById("single-stall-banner");
    if (!container) return;

    let filteredStalls = MARKET_DATA;
    let isSearchMode = state.searchQuery && state.searchQuery.trim() !== "";
    let isSuggestedMode = false;
    let searchQuery = isSearchMode ? state.searchQuery.trim().toLowerCase() : "";

    // 1. Check if filtered by single stall
    if (state.currentSingleStall) {
        filteredStalls = MARKET_DATA.filter(s => s.stallId === state.currentSingleStall);
        const stallObj = ALL_100_STALLS.find(s => s.stallId === state.currentSingleStall);
        if (singleStallBanner) {
            singleStallBanner.classList.remove("hidden");
            document.getElementById("single-stall-banner-text").textContent = `กำลังดูเฉพาะ: ${stallObj ? stallObj.stallName : ''}`;
        }
    } else {
        if (singleStallBanner) singleStallBanner.classList.add("hidden");

        // Filter by Category Super-group (only if not searching)
        if (!isSearchMode && state.currentCategoryFilter !== "all") {
            filteredStalls = MARKET_DATA.filter(s => s.category === state.currentCategoryFilter);
        }
    }

    // 2. SEARCH ENGINE: Match across up to 5 stalls + Fuzzy Suggestions
    if (isSearchMode) {
        // Step A: Direct Matches across all stalls (checking both 6 featured items and extended catalog)
        let directMatchedStalls = [];

        MARKET_DATA.forEach(stall => {
            // Check in stall products
            let matchedItems = stall.products.filter(p =>
                p.name.toLowerCase().includes(searchQuery) ||
                p.desc.toLowerCase().includes(searchQuery) ||
                (p.category && p.category.toLowerCase().includes(searchQuery))
            );

            // Also check in stall extended catalog database for more items (e.g. ซี่โครงหมู, สันคอ)
            const extendedCatalog = getStallCatalogData(stall.stallId);
            if (extendedCatalog) {
                extendedCatalog.forEach(group => {
                    group.items.forEach(extItem => {
                        if (extItem.name.toLowerCase().includes(searchQuery) || extItem.spec.toLowerCase().includes(searchQuery)) {
                            // If not already in matched items, add it
                            if (!matchedItems.some(m => m.id === extItem.id)) {
                                matchedItems.push({
                                    id: extItem.id,
                                    name: extItem.name,
                                    desc: extItem.spec,
                                    price: extItem.price,
                                    unit: extItem.unit,
                                    image: stall.stallImage,
                                    badge: "✨ ตรงคำค้น"
                                });
                            }
                        }
                    });
                });
            }

            if (matchedItems.length > 0 || stall.stallName.toLowerCase().includes(searchQuery) || stall.stallTag.toLowerCase().includes(searchQuery)) {
                directMatchedStalls.push({
                    ...stall,
                    products: matchedItems.length > 0 ? matchedItems : stall.products
                });
            }
        });

        if (directMatchedStalls.length > 0) {
            // Limit to up to 5 stalls as requested
            filteredStalls = directMatchedStalls.slice(0, 5);
        } else {
            // Step B: Smart Related / Fuzzy Suggestions when no direct match found
            isSuggestedMode = true;
            let relatedStalls = [];

            // Extract keywords (e.g. หมู, ไก่, ผัก, กุ้ง, ปลา, แกง, ซุป, สด)
            const keywords = ["หมู", "ไก่", "ผัก", "กุ้ง", "ปลา", "แกง", "เนื้อ", "ไข่", "ทะเล", "ซุป", "สด"];
            const matchedKeyword = keywords.find(kw => searchQuery.includes(kw));

            MARKET_DATA.forEach(stall => {
                let suggestedItems = [];
                if (matchedKeyword) {
                    suggestedItems = stall.products.filter(p =>
                        p.name.includes(matchedKeyword) ||
                        p.desc.includes(matchedKeyword) ||
                        stall.category.includes(matchedKeyword) ||
                        stall.stallTag.includes(matchedKeyword)
                    );
                } else {
                    // Fallback to top bestsellers across stalls
                    suggestedItems = stall.products.filter(p => p.badge);
                }

                if (suggestedItems.length > 0) {
                    relatedStalls.push({
                        ...stall,
                        products: suggestedItems
                    });
                }
            });

            filteredStalls = relatedStalls.slice(0, 5);
        }
    }

    // 3. Render Empty State
    if (filteredStalls.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span class="material-symbols-outlined text-4xl mb-1 text-slate-300">manage_search</span>
                <p class="text-xs font-bold text-slate-700">ไม่พบสินค้า "${state.searchQuery}" ในตลาดสด</p>
                <p class="text-[11px] text-slate-400 mt-1">ลองค้นหาด้วยคำง่ายๆ เช่น อกไก่, ซี่โครงหมู, ผักกาดขาว, กุ้งสด</p>
                <div class="flex flex-wrap items-center justify-center gap-1.5 mt-3.5">
                    <button onclick="handleQuickSearch('อกไก่')" class="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100">🍗 อกไก่</button>
                    <button onclick="handleQuickSearch('หมู')" class="px-2.5 py-1 bg-pink-50 text-pink-800 border border-pink-200 rounded-lg text-xs font-bold hover:bg-pink-100">🥩 หมูสด</button>
                    <button onclick="handleQuickSearch('ผัก')" class="px-2.5 py-1 bg-green-50 text-green-800 border border-green-200 rounded-lg text-xs font-bold hover:bg-green-100">🥬 ผักสด</button>
                    <button onclick="handleQuickSearch('กุ้ง')" class="px-2.5 py-1 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded-lg text-xs font-bold hover:bg-cyan-100">🦐 กุ้งสด</button>
                </div>
                <button onclick="clearSearchInput()" class="mt-4 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs">ดูสินค้าทั้งหมด</button>
            </div>
        `;
        return;
    }

    let html = "";

    // Search Result Summary Header Banner
    if (isSearchMode) {
        if (!isSuggestedMode) {
            html += `
                <div class="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 flex items-center justify-between text-xs text-emerald-900 shadow-xs mb-1">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
                        <div>
                            <span class="font-bold">ผลการค้นหา: </span>
                            <span class="font-extrabold text-emerald-800">"${state.searchQuery}"</span>
                            <span class="text-slate-500 text-[11px] block sm:inline"> (พบใน ${filteredStalls.length} ร้านค้า พร้อมกดสั่งซื้อได้ทันที)</span>
                        </div>
                    </div>
                    <button onclick="clearSearchInput()" class="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] flex items-center gap-0.5 shrink-0 bg-white px-2 py-1 rounded-lg border border-emerald-200">
                        <span>ล้างค้นหา</span>
                        <span class="material-symbols-outlined text-xs">close</span>
                    </button>
                </div>
            `;
        } else {
            html += `
                <div class="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-950 shadow-xs mb-1">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-amber-600 text-lg">lightbulb</span>
                        <div>
                            <span class="font-bold">ไม่พบชื่อตรงตัว "${state.searchQuery}"</span>
                            <span class="text-amber-800 text-[11px] block">เราพบ <strong>สินค้าใกล้เคียงที่เกี่ยวข้อง</strong> จาก ${filteredStalls.length} ร้านค้าให้คุณเลือก:</span>
                        </div>
                    </div>
                    <button onclick="clearSearchInput()" class="text-amber-800 hover:text-amber-950 font-bold text-[11px] flex items-center gap-0.5 shrink-0 bg-white px-2 py-1 rounded-lg border border-amber-200">
                        <span>ดูทั้งหมด</span>
                        <span class="material-symbols-outlined text-xs">close</span>
                    </button>
                </div>
            `;
        }
    }

    filteredStalls.forEach(stall => {
        const stallImg = stall.stallImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80';
        const ownerImg = stall.ownerImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';
        const phoneNum = stall.phone || '081-234-5678';
        const ownerNm = stall.ownerName || 'เจ้าของแผงค้า';
        const expText = stall.experience || 'เปิดบริการในตลาดสด';
        const highlightText = stall.highlight || 'สินค้าสดใหม่ คัดเกรดคุณภาพ สะอาด ถูกหลักอนามัย';
        const descriptionText = stall.shopDescription || 'จำหน่ายสินค้าสดคุณภาพดี คัดสรรวันต่อวัน ชั่งน้ำหนักแม่นยำ พร้อมบริการตัดแต่งตามสั่งและจัดส่งตรงถึงบ้านคุณ';
        const isFav = state.favorites && state.favorites.includes(stall.stallId);

        html += `
            <div class="bg-white rounded-2xl shadow-card border border-slate-200/80 overflow-hidden space-y-3 pb-3.5 transition-all">
                
                <!-- ======================================================== -->
                <!-- STALL PROFILE CARD: 1 Shop Image + 1 Owner Image         -->
                <!-- + Highlight + Product Description + Direct Phone Call   -->
                <!-- + Interactive Favorite Toggle Button (Persisted)        -->
                <!-- ======================================================== -->
                <div class="bg-gradient-to-b from-slate-50/90 to-white border-b border-slate-200/70">
                    
                    <!-- 1. ภาพของร้านค้านั้น ๆ (Stall Cover Photo 1 รูป) -->
                    <div class="relative h-36 w-full overflow-hidden bg-slate-200 group">
                        <img src="${stallImg}" alt="ภาพร้านค้า ${stall.stallName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"></div>
                        
                        <!-- Top Row: Stall Number Badge (Left) + Favorite Button (Right) -->
                        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                            <div class="flex items-center gap-1.5 pointer-events-auto">
                                <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white shadow-sm backdrop-blur-md border border-slate-700/60 flex items-center gap-1">
                                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                                    ${stall.stallNumber}
                                </span>
                                <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/55 text-white/90 shadow-sm backdrop-blur-md border border-white/20">
                                    โซน ${stall.zone}
                                </span>
                            </div>

                            <!-- Interactive Favorite Star Button -->
                            <button onclick="toggleFavoriteStall('${stall.stallId}')" class="pointer-events-auto text-[10px] ${isFav ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-1 ring-amber-300' : 'bg-white/95 hover:bg-amber-50 text-slate-800 hover:text-amber-800 border-slate-200'} font-extrabold px-3 py-1 rounded-full shadow-sm backdrop-blur-md transition-all flex items-center gap-1 active:scale-90" title="${isFav ? 'อยู่ในร้านโปรดแล้ว (แตะเพื่อยกเลิก)' : 'แตะเพื่อเลือกเป็นร้านค้าโปรด'}">
                                <span class="material-symbols-outlined text-[13px] ${isFav ? 'text-white' : 'text-amber-500'}">star</span>
                                <span>${isFav ? 'ร้านโปรดแล้ว ⭐' : 'บันทึกร้านโปรด'}</span>
                            </button>
                        </div>

                        <!-- Bottom Row: Category Tag Badge (Left) + Filter Single Stall Action (Right) -->
                        <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                            <div class="pointer-events-auto">
                                <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-700/90 text-white shadow-sm backdrop-blur-md border border-emerald-500/40">
                                    ${stall.stallTag}
                                </span>
                            </div>

                            <button onclick="filterBySingleStall('${stall.stallId}')" class="pointer-events-auto text-[10px] bg-white/95 hover:bg-white text-emerald-900 font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md transition-all flex items-center gap-0.5 active:scale-95">
                                <span>ดูเฉพาะแผงนี้</span>
                                <span class="material-symbols-outlined text-[13px]">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <!-- Stall Owner, Contact & Details Header -->
                    <div class="px-3.5 pt-2 pb-3">
                        
                        <!-- Row 1: 2. ภาพเจ้าของร้าน (Owner Avatar 1 รูป) + Shop Name + Phone Button -->
                        <div class="flex items-start justify-between gap-2.5">
                            <!-- Left: รูปเจ้าของร้าน + ชื่อร้านค้า -->
                            <div class="flex items-center gap-3 -mt-7">
                                <div class="relative shrink-0">
                                    <img src="${ownerImg}" alt="ภาพเจ้าของร้าน ${ownerNm}" class="w-14 h-14 rounded-full object-cover border-[3px] border-white shadow-lg ring-2 ring-emerald-500/40 bg-white">
                                    <span class="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xs" title="เจ้าของร้านตัวจริง ยืนยันตัวตนแล้ว">
                                        <span class="material-symbols-outlined text-[9px] font-extrabold">check</span>
                                    </span>
                                </div>
                                <div class="mt-4">
                                    <h3 class="font-extrabold text-[15px] text-slate-900 leading-snug flex items-center gap-1">
                                        <span>${stall.stallName}</span>
                                        ${stall.isHub ? `<span class="bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.2 rounded border border-orange-200">Hub กลาง</span>` : ''}
                                    </h3>
                                    <div class="flex items-center gap-1.5 text-[11px] text-slate-600 mt-0.5">
                                        <span class="font-bold text-slate-700 flex items-center gap-0.5">
                                            <span class="material-symbols-outlined text-[12px] text-slate-500">person</span>
                                            ${ownerNm}
                                        </span>
                                        <span class="text-slate-300">•</span>
                                        <span class="text-slate-500 text-[10px] font-medium">${expText}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: เบอร์โทรศัพท์ของร้านค้า (กดโทรได้ทันที) -->
                            <div class="mt-1 shrink-0">
                                <a href="tel:${phoneNum}" class="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-xs transition-all active:scale-95">
                                    <span class="material-symbols-outlined text-sm text-emerald-600">call</span>
                                    <span>${phoneNum}</span>
                                </a>
                            </div>
                        </div>

                        <!-- Row 2: 3. ข้อความไฮไลท์เพื่อให้ลูกค้ารู้ว่าที่ร้านขายอะไร (Highlight Tagline) -->
                        <div class="mt-3 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-900 flex items-start gap-2 shadow-xs">
                            <span class="material-symbols-outlined text-amber-600 text-base shrink-0 mt-0.5">stars</span>
                            <div class="text-[11px] leading-snug">
                                <span class="font-extrabold text-amber-900">ไฮไลท์สินค้า:</span>
                                <span class="font-medium text-slate-800 ml-1">${highlightText}</span>
                            </div>
                        </div>

                        <!-- Row 3: 4. รายละเอียดของสินค้าที่จำหน่าย (Description ไม่เกิน 150 ตัวอักษร) -->
                        <div class="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                            <div class="flex items-center justify-between font-bold text-slate-700 mb-1 text-[10px]">
                                <span class="flex items-center gap-1 text-emerald-700">
                                    <span class="material-symbols-outlined text-xs">local_mall</span>
                                    รายละเอียดสินค้าที่จำหน่าย
                                </span>
                                <span class="text-slate-400 font-normal text-[9px]">${descriptionText.length} ตัวอักษร</span>
                            </div>
                            <p class="text-slate-600 leading-normal">${descriptionText}</p>
                        </div>

                    </div>
                </div>

                <!-- Products Header Banner with "ดูเพิ่มเติม" Button -->
                <div class="px-3.5 pt-0.5 flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-orange-500">grid_view</span>
                        สินค้าสดแนะนำ (${stall.products.length} รายการ)
                    </span>
                    <button onclick="openStallCatalogModal('${stall.stallId}')" class="text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-xl border border-emerald-300/80 flex items-center gap-1 transition-all active:scale-95 shadow-xs">
                        <span class="material-symbols-outlined text-xs text-emerald-600">list_alt</span>
                        <span>ดูเพิ่มเติม (ตารางสินค้าทั้งหมด)</span>
                        <span class="material-symbols-outlined text-xs">chevron_right</span>
                    </button>
                </div>

                <!-- Products Grid (รองรับขนาด Responsive บนจอ PC และ มือถือ ป้องกันบีบอัดใน Mobile Frame) -->
                <div class="${(state.screenMode === 'mobile') ? 'grid grid-cols-2 gap-2.5 px-3.5' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-3 px-3.5'}">
                    ${stall.products.map(product => {
            const inCart = state.cart.find(item => item.productId === product.id);
            const qtyInCart = inCart ? inCart.qty : 0;

            return `
                            <div class="bg-slate-50/90 hover:bg-white rounded-2xl p-2.5 border ${qtyInCart > 0 ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-400' : 'border-slate-200/80'} flex flex-col justify-between hover:shadow-md transition-all">
                                <div>
                                    <div class="relative mb-2 overflow-hidden rounded-xl bg-slate-200 aspect-[4/3]">
                                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                                        ${product.badge ? `
                                            <span class="absolute top-1.5 left-1.5 bg-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm">
                                                ${product.badge}
                                            </span>
                                        ` : ''}
                                        ${qtyInCart > 0 ? `
                                            <span class="absolute top-1.5 right-1.5 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-lg shadow-sm flex items-center gap-0.5">
                                                <span class="material-symbols-outlined text-[10px]">check</span>
                                                <span>ในตะกร้า ${qtyInCart}</span>
                                            </span>
                                        ` : ''}
                                    </div>
                                    <h4 class="font-extrabold text-xs text-slate-900 line-clamp-1 leading-snug" title="${product.name}">${product.name}</h4>
                                    <p class="text-[10px] text-slate-500 line-clamp-1 mt-0.5 leading-tight" title="${product.desc}">${product.desc}</p>
                                </div>

                                <!-- Action Bottom Row: Equalized Height & Uniform Button -->
                                <div class="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between gap-1.5 min-h-[38px]">
                                    <div class="min-w-0 flex-1">
                                        <div class="font-black text-sm text-orange-600 leading-none">฿${product.price}</div>
                                        <div class="text-[10px] text-slate-400 truncate mt-0.5 font-medium" title="${product.unit}">/${product.unit}</div>
                                    </div>
                                    
                                    ${qtyInCart > 0 ? `
                                        <!-- เมื่อหยิบใส่แล้ว: เปลี่ยนเป็นสีเขียวเด่นชัด (Vibrant Green Active State) -->
                                        <div class="flex items-center gap-1 bg-emerald-600 text-white rounded-xl px-1.5 py-1 text-xs shadow-sm ring-2 ring-emerald-400 shrink-0">
                                            <button type="button" onclick="changeCartQty('${product.id}', -1)" class="w-6 h-6 flex items-center justify-center hover:bg-emerald-700 active:scale-90 rounded-lg font-black text-sm transition-transform cursor-pointer">-</button>
                                            <span class="px-1 text-xs font-black min-w-[14px] text-center">${qtyInCart}</span>
                                            <button type="button" onclick="changeCartQty('${product.id}', 1)" class="w-6 h-6 flex items-center justify-center hover:bg-emerald-700 active:scale-90 rounded-lg font-black text-sm transition-transform cursor-pointer">+</button>
                                        </div>
                                    ` : `
                                        <!-- สถานะปกติ: ปุ่มใส่ตะกร้าสีส้มขนาดเท่ากันทุกช่อง -->
                                        <button type="button" onclick="addToCart('${stall.stallId}', '${product.id}')" class="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm shrink-0 transition-all cursor-pointer whitespace-nowrap" title="เพิ่มลงตะกร้า">
                                            <span class="material-symbols-outlined text-[14px] font-bold">add_shopping_cart</span>
                                            <span>ใส่ตะกร้า</span>
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
        }).join("")}
                </div>

                <!-- Bottom Full-Width "ดูเพิ่มเติม" Action Button -->
                <div class="px-3.5 pt-1">
                    <button onclick="openStallCatalogModal('${stall.stallId}')" class="w-full py-2.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 hover:from-emerald-100 hover:to-teal-100 border border-emerald-300/80 rounded-xl text-emerald-900 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-[0.99]">
                        <span class="material-symbols-outlined text-base text-emerald-700">menu_book</span>
                        <span>ดูเพิ่มเติม: ตารางรายการสินค้าทั้งหมดของแผงนี้ (20+ รายการ)</span>
                        <span class="material-symbols-outlined text-sm text-emerald-600">chevron_right</span>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// DYNAMIC FAVORITE STALLS BAR & PERSISTENCE
// ==========================================
function renderFavoriteStallsBar() {
    const container = document.getElementById("favorite-stalls-list");
    if (!container) return;

    if (!state.favorites || state.favorites.length === 0) {
        container.innerHTML = `
            <span class="text-amber-800/80 text-[11px] font-medium py-1 px-2 whitespace-nowrap italic">
                ยังไม่มีร้านโปรด แตะปุ่ม "⭐ บันทึกร้านโปรด" ที่หน้าร้านค้า
            </span>
        `;
        return;
    }

    let html = "";
    state.favorites.slice(0, 5).forEach(stallId => {
        const stall = ALL_100_STALLS.find(s => s.stallId === stallId) || MARKET_DATA.find(s => s.stallId === stallId);
        if (!stall) return;

        let colorClass = "bg-white hover:bg-amber-50 text-slate-800 border-amber-200";
        if (stall.category === "chicken") colorClass = "bg-white hover:bg-orange-50 text-orange-950 border-orange-200";
        else if (stall.category === "veggie") colorClass = "bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-200";
        else if (stall.category === "pork") colorClass = "bg-white hover:bg-pink-50 text-pink-950 border-pink-200";
        else if (stall.category === "curry") colorClass = "bg-white hover:bg-red-50 text-red-950 border-red-200";
        else if (stall.category === "seafood") colorClass = "bg-white hover:bg-cyan-50 text-cyan-950 border-cyan-200";

        const isCurrentlySelected = state.currentSingleStall === stallId;
        const activeRing = isCurrentlySelected ? "ring-2 ring-amber-500 bg-amber-50 font-extrabold" : "font-bold";

        // Emoji extraction
        const emoji = stall.stallTag ? stall.stallTag.split(" ")[0] : "🏪";
        const shortName = stall.stallName.replace("แผง", "").replace("ร้าน", "").trim();

        html += `
            <button onclick="filterBySingleStall('${stall.stallId}')" class="${colorClass} ${activeRing} border px-2.5 py-1 rounded-xl whitespace-nowrap text-[11px] flex items-center gap-1 shadow-xs shrink-0 active:scale-95 transition-all" title="${stall.stallName}">
                <span>${emoji}</span>
                <span>${stall.stallNumber} (${shortName})</span>
            </button>
        `;
    });

    container.innerHTML = html;
}

// Toggle Favorite Stall (Max 5 Stalls Saved in LocalStorage)
function toggleFavoriteStall(stallId) {
    const stall = ALL_100_STALLS.find(s => s.stallId === stallId) || MARKET_DATA.find(s => s.stallId === stallId);
    const stallName = stall ? stall.stallName : "ร้านค้า";

    if (!state.favorites) state.favorites = [];
    const idx = state.favorites.indexOf(stallId);

    if (idx >= 0) {
        state.favorites.splice(idx, 1);
        showToast(`นำ "${stallName}" ออกจากร้านโปรดแล้ว`);
    } else {
        if (state.favorites.length >= 5) {
            // Keep maximum 5 favorites (remove oldest)
            state.favorites.shift();
        }
        state.favorites.push(stallId);
        showToast(`⭐ บันทึก "${stallName}" เป็นร้านโปรดแล้ว!`);
    }

    saveFavoritesToStorage(state.favorites);
    renderFavoriteStallsBar();
    renderCatalog();
}

function filterByCategory(category) {
    state.currentCategoryFilter = category;
    state.currentSingleStall = null;

    document.querySelectorAll(".cat-pill").forEach(pill => pill.classList.remove("active", "bg-emerald-700", "text-white"));
    const activeBtn = event ? event.currentTarget : document.querySelector('.cat-pill');
    if (activeBtn) activeBtn.classList.add("active");

    renderFavoriteStallsBar();
    renderCatalog();
}

function scrollCategoryTabs(amount) {
    const container = document.getElementById("category-tabs");
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

function scrollFavoriteStalls(amount) {
    const container = document.getElementById("favorite-stalls-list");
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

function scrollModalCategoryTabs(amount) {
    const container = document.getElementById("modal-stall-category-pills");
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

function scrollMerchantPortalTabs(amount) {
    const container = document.getElementById("merchant-portal-tab-bar");
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

function scrollZoneTabs(amount) {
    const container = document.getElementById("directory-zone-tabs");
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

// Enable Mouse Drag-to-Scroll on PC Desktop
function enableDragToScroll() {
    ['category-tabs', 'favorite-stalls-list', 'modal-stall-category-pills', 'directory-zone-tabs', 'merchant-portal-tab-bar'].forEach(id => {
        const slider = document.getElementById(id);
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}
document.addEventListener("DOMContentLoaded", enableDragToScroll);



function filterBySingleStall(stallId) {
    state.currentSingleStall = stallId;
    closeDirectoryModal();
    renderFavoriteStallsBar();
    renderCatalog();
    showToast("กรองเฉพาะแผงที่เลือกแล้ว");
}

function handleSearch(val) {
    state.searchQuery = val;
    const clearBtn = document.getElementById("market-search-clear-btn");
    if (clearBtn) {
        if (val.trim().length > 0) clearBtn.classList.remove("hidden");
        else clearBtn.classList.add("hidden");
    }
    renderCatalog();
}

function clearSearchInput() {
    state.searchQuery = "";
    const input = document.getElementById("market-search-input");
    const clearBtn = document.getElementById("market-search-clear-btn");
    if (input) input.value = "";
    if (clearBtn) clearBtn.classList.add("hidden");
    renderCatalog();
}

function handleQuickSearch(keyword) {
    const input = document.getElementById("market-search-input");
    if (input) input.value = keyword;
    handleSearch(keyword);
}

// ==========================================
// 100 STALLS DIRECTORY MODAL
// ==========================================
function openDirectoryModal() {
    document.getElementById("directory-modal").classList.remove("hidden");
    renderDirectoryList();
}

function closeDirectoryModal() {
    document.getElementById("directory-modal").classList.add("hidden");
}

function filterDirectoryZone(zone) {
    state.currentDirectoryZone = zone;
    document.querySelectorAll(".dir-zone-btn").forEach(btn => {
        btn.classList.remove("active", "bg-emerald-700", "text-white", "font-bold");
        btn.classList.add("bg-slate-100", "text-slate-700", "font-medium");
    });
    event.currentTarget.classList.remove("bg-slate-100", "text-slate-700", "font-medium");
    event.currentTarget.classList.add("active", "bg-emerald-700", "text-white", "font-bold");
    renderDirectoryList();
}

function renderDirectoryList() {
    const listContainer = document.getElementById("directory-stalls-list");
    if (!listContainer) return;

    let stalls = ALL_100_STALLS;
    if (state.currentDirectoryZone !== "all") {
        stalls = ALL_100_STALLS.filter(s => s.zone === state.currentDirectoryZone);
    }

    let html = "";
    stalls.forEach(stall => {
        const isHub = stall.isHub;
        html += `
            <div onclick="filterBySingleStall('${stall.stallId}')" class="p-2.5 rounded-xl border ${isHub ? 'border-orange-300 bg-orange-50/60' : 'border-slate-200 bg-slate-50 hover:bg-emerald-50/50'} flex items-center justify-between cursor-pointer transition-colors text-xs">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-[10px] px-1.5 py-0.5 rounded ${stall.badgeColor}">
                        ${stall.stallNumber}
                    </span>
                    <div>
                        <div class="font-bold text-slate-800 flex items-center gap-1">
                            <span>${stall.stallName}</span>
                            ${isHub ? '<span class="text-[9px] bg-orange-500 text-white px-1 rounded font-bold">Hub ร้านเรา</span>' : ''}
                        </div>
                        <div class="text-[10px] text-slate-400">${stall.stallTag} • โซน ${stall.zone}</div>
                    </div>
                </div>
                <span class="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

// =================================================================
// FULL PRODUCT CATALOG MODAL ENGINE (ตารางรายการสินค้าฉบับเต็มของร้านค้า)
// =================================================================
const STALL_CATALOG_DATABASE = {
    // 1. ไก่สด Hub
    stall_chicken: [
        {
            groupName: "🥩 ชิ้นส่วนเนื้อไก่สดอนามัย",
            items: [
                { id: "chk_01", name: "อกไก่สดลอกหนัง (อนามัย)", spec: "เนื้อแน่น ไร้มัน สดใหม่วันต่อวัน", price: 85, unit: "1 กก." },
                { id: "chk_04", name: "สันในไก่สดเส้นสวย", spec: "นุ่มพิเศษ ไร้มัน เหมาะทำสลัด/ต้มซุป", price: 95, unit: "1 กก." },
                { id: "chk_ext_01", name: "สะโพกไก่สดเลาะกระดูก (เนื้อล้วน)", spec: "เนื้อนุ่มชุ่มฉ่ำ ย่าง/ทอดอร่อย", price: 90, unit: "1 กก." },
                { id: "chk_ext_02", name: "เนื้อไก่บดอนามัย (ไม่ผสมมัน)", spec: "บดสดสะอาด พร้อมปรุงอาหาร", price: 85, unit: "1 กก." },
                { id: "chk_ext_03", name: "ไก่สดทั้งตัว (ชำแหละตัดแต่งตามสั่ง)", spec: "ไก่อนามัย ชั่งสด สะอาดพร้อมปรุง", price: 120, unit: "1 ตัว (~1.4กก.)" }
            ]
        },
        {
            groupName: "🍗 ปีก & น่องไก่",
            items: [
                { id: "chk_02", name: "น่องติดสะโพกไก่สด", spec: "เนื้อแน่น ฉ่ำ ทอดหรือต้มซุป", price: 45, unit: "500 กรัม" },
                { id: "chk_03", name: "ปีกกลางไก่สดคัดเกรด", spec: "ขนาดเสมอ ทอดน้ำปลา/ย่าง", price: 110, unit: "1 กก." },
                { id: "chk_05", name: "น่องไก่สดล้วน (น่องโต)", spec: "น่องไก่ไซส์ใหญ่ ทอดกรอบ", price: 75, unit: "1 กก." },
                { id: "chk_ext_04", name: "ปีกบนไก่ (น่องเล็ก)", spec: "เหมาะทำต้มซุปมะนาว/ชุบแป้งทอด", price: 80, unit: "1 กก." },
                { id: "chk_ext_05", name: "ปีกเต็มไก่สดคัดไซส์", spec: "ปีกเต็มสมบูรณ์ ย่างซอสบาร์บีคิว", price: 85, unit: "1 กก." }
            ]
        },
        {
            groupName: "🫀 เครื่องใน & ชิ้นส่วนพิเศษ",
            items: [
                { id: "chk_ext_06", name: "ตับไก่สดคัดชิ้นโต", spec: "สด หวาน ไม่ขม ล้างสะอาด", price: 45, unit: "500 กรัม" },
                { id: "chk_ext_07", name: "กึ๋นไก่สดกรอบ", spec: "ล้างเอี่ยม กรุบกรอบ ผัดกะเพราเด็ด", price: 50, unit: "500 กรัม" },
                { id: "chk_ext_08", name: "หัวใจไก่สดคัดพิเศษ", spec: "เสียบไม้ย่าง/ผัดกระเทียมพริกไทย", price: 40, unit: "500 กรัม" },
                { id: "chk_ext_09", name: "ตีนไก่สดเลาะเล็บ", spec: "ตีนไก่อวบ ต้มซุปเปอร์เปื่อยไว", price: 75, unit: "1 กก." },
                { id: "chk_ext_10", name: "หนังไก่สดขูดมัน", spec: "ทอดกรอบไร้น้ำมัน/เจียวน้ำมันไก่", price: 55, unit: "1 กก." }
            ]
        },
        {
            groupName: "🍲 โครงต้มซุป & ไก่หมักปรุงรส",
            items: [
                { id: "chk_06", name: "โครงไก่สดต้มน้ำซุปหวาน", spec: "โครงไก่สด ล้างสะอาด ซุปหวานใส", price: 20, unit: "2 โครง" },
                { id: "chk_ext_11", name: "อกไก่หมักพริกไทยดำพร้อมย่าง", spec: "หมักเข้าเนื้อ คลีนแท้โปรตีนสูง", price: 95, unit: "1 กก." },
                { id: "chk_ext_12", name: "ปีกไก่หมักซอสนิวออร์ลีนส์", spec: "อบหม้อลมร้อน 15 นาทีทานได้ทันที", price: 115, unit: "1 กก." }
            ]
        }
    ],

    // 2. ผักสดป้าสมร
    stall_veggie: [
        {
            groupName: "🥬 ผักใบเขียวปลอดสารพิษ",
            items: [
                { id: "veg_01", name: "ผักกาดขาวปลอดสาร", spec: "กรอบหวาน สดจากสวน ปลอดสารพิษ", price: 25, unit: "1 หัว (~600g)" },
                { id: "veg_02", name: "กะหล่ำปลีเขียวสด", spec: "แน่น กรอบ ผัดน้ำปลาหวานหอม", price: 20, unit: "1 หัว" },
                { id: "veg_06", name: "ผักบุ้งจีนยอดอ่อน", spec: "ยอดอ่อนใบเขียว ผัดไฟแดงกรอบอร่อย", price: 15, unit: "1 กำใหญ่" },
                { id: "veg_ext_01", name: "ผักกวางตุ้งไต้หวันสด", spec: "ก้านกรอบหวาน ลวกจิ้มน้ำพริก", price: 15, unit: "1 กำ" },
                { id: "veg_ext_02", name: "คะน้าฮ่องกงยอดอ่อน", spec: "คะน้ากรอบไร้เสี้ยน ผัดน้ำมันหอย", price: 25, unit: "1 กำ" },
                { id: "veg_ext_03", name: "กะเพราแดงสวนแท้", spec: "กลิ่นหอมฉุน ผัดกะเพราไม่ใส่ซีอิ๊วดำ", price: 10, unit: "1 กำ" },
                { id: "veg_ext_04", name: "โหระพา & สะระแหน่", spec: "ใบสดเขียว กลิ่นหอมฟุ้ง ทานแนมลาบ", price: 10, unit: "1 กำ" },
                { id: "veg_ext_05", name: "ต้นหอม & ผักชีไทย", spec: "ล้างสะอาด มัดสดวันต่อวัน", price: 15, unit: "1 มัดคู่" }
            ]
        },
        {
            groupName: "🥕 ผักหัว & เครื่องเทศสวน",
            items: [
                { id: "veg_03", name: "แครอทสดหวานฉ่ำ", spec: "ผิวเกลี้ยง สีส้มสด ทำซุปหวานกลมกล่อม", price: 18, unit: "3 หัว" },
                { id: "veg_ext_06", name: "หัวไชเท้าสดต้มซุป", spec: "หัวใหญ่ น้ำเยอะ เคี่ยวน้ำซุปหวานใส", price: 20, unit: "2 หัว" },
                { id: "veg_ext_07", name: "มันฝรั่งสดคัดไซส์", spec: "เนื้อเนียน ทำสตูว์/แกงกะหรี่", price: 35, unit: "1 กก." },
                { id: "veg_ext_08", name: "ฟักทองทองอำพันแก่จัด", spec: "เนื้อเหนียว มัน หวาน ทำแกงบวด/ผัดไข่", price: 28, unit: "1 ซีก (~800g)" },
                { id: "veg_ext_09", name: "มะเขือเทศท้อสุกแดง", spec: "เนื้อหนา ทำส้มตำ/ผัดเปรี้ยวหวาน", price: 30, unit: "1 กก." }
            ]
        },
        {
            groupName: "🌶️ พริกสด & ชุดเครื่องต้มยำ",
            items: [
                { id: "veg_05", name: "พริกจินดาแดงสด", spec: "เผ็ดจัดจ้าน สีแดงสด คั่วพริกหอม", price: 15, unit: "1 ขีด" },
                { id: "veg_ext_10", name: "พริกขี้หนูสวนแท้ (เม็ดเล็ก)", spec: "เผ็ดหอมติดจมูก ทำน้ำปลาพริกเลิศ", price: 20, unit: "1 ขีด" },
                { id: "veg_ext_11", name: "ชุดเครื่องต้มยำสด (ข่า ตะไคร้ ใบมะกรูด)", spec: "จัดชุดพร้อมต้ม ล้างสะอาด", price: 15, unit: "1 ชุด" },
                { id: "veg_ext_12", name: "มะนาวแป้นรำไพ (น้ำเยอะ)", spec: "เปลือกบาง กลิ่นหอมเปรี้ยวจี๊ด", price: 20, unit: "6 ลูก" }
            ]
        },
        {
            groupName: "🍄 เห็ดสด & แตงกวา",
            items: [
                { id: "veg_04", name: "เห็ดฟางสดดอกตูม", spec: "เห็ดฟางสดดอกกลม ต้มยำน้ำใสแซ่บ", price: 35, unit: "250 กรัม" },
                { id: "veg_ext_13", name: "เห็ดนางฟ้าภูฐาน", spec: "ดอกหนา ฉีกต้มยำ/ชุบแป้งทอด", price: 25, unit: "1 แพ็ค (200g)" },
                { id: "veg_ext_14", name: "เห็ดเข็มทองสด", spec: "เส้นขาว กรุบกรอบ ใส่ชาบู/หมูกระทะ", price: 20, unit: "2 ซอง" },
                { id: "veg_ext_15", name: "แตงกวาสดคัดเกรด", spec: "กรอบ ไร้เสี้ยน ทานแนมน้ำพริก", price: 20, unit: "1 กก." }
            ]
        }
    ]
};

// Fallback generator for other stalls to give realistic categorized products
function getStallCatalogData(stallId) {
    if (STALL_CATALOG_DATABASE[stallId]) {
        return STALL_CATALOG_DATABASE[stallId];
    }

    const stall = MARKET_DATA.find(s => s.stallId === stallId) || ALL_100_STALLS.find(s => s.stallId === stallId);
    const cat = stall ? stall.category : "chicken";
    const stallName = stall ? stall.stallName : "ร้านค้า";

    if (cat === "pork") {
        return [
            {
                groupName: "🥩 เนื้อหมูสดคัดเกรดพรีเมียม",
                items: [
                    { id: `${stallId}_p1`, name: "หมูสามชั้นเส้นสวย (สลับชั้นไขมัน)", spec: "ชั้นสวย สดใหม่ ทอดน้ำปลา/ต้มพะโล้", price: 170, unit: "1 กก." },
                    { id: `${stallId}_p2`, name: "สันคอหมูสดสไลซ์", spec: "นุ่ม ละมุน ลายไขมันแทรก ทำสเต็ก/ปิ้งย่าง", price: 160, unit: "1 กก." },
                    { id: `${stallId}_p3`, name: "สันนอกหมูสด", spec: "เนื้อล้วน ไร้มัน ผัดกระเทียม/ทอดทงคัตสึ", price: 145, unit: "1 กก." },
                    { id: `${stallId}_p4`, name: "สะโพกหมูสด", spec: "เนื้อแน่น เหมาะต้ม/ทำหมูแดง/แกง", price: 135, unit: "1 กก." },
                    { id: `${stallId}_p5`, name: "หมูบดอนามัย (เนื้อ 80 / มัน 20)", spec: "บดละเอียด ทำหมูสับต้มบ๊วย/กะเพรา", price: 130, unit: "1 กก." }
                ]
            },
            {
                groupName: "🍖 ซี่โครง & กระดูกต้มซุป",
                items: [
                    { id: `${stallId}_p6`, name: "ซี่โครงหมูอ่อน (กระดูกแก้ว)", spec: "เคี้ยวกระดูกอ่อนกรุบ ทอดกระเทียม/ต้มแซ่บ", price: 155, unit: "1 กก." },
                    { id: `${stallId}_p7`, name: "กระดูกเล้งต้มซุปหวาน", spec: "เนื้อติดกระดูกเยอะ เคี่ยวน้ำซุปก๋วยเตี๋ยว/เล้งแซ่บ", price: 45, unit: "1 กก." },
                    { id: `${stallId}_p8`, name: "ขาหมูเผาสด (ขาหน้า/ขาหลัง)", spec: "ล้างขูดสะอาด พร้อมต้มพะโล้", price: 120, unit: "1 กก." }
                ]
            },
            {
                groupName: "🥓 เครื่องใน & หมูหมักสำเร็จรูป",
                items: [
                    { id: `${stallId}_p9`, name: "ตับหมูสดหวาน", spec: "ตับสดชิ้นหนา ผัดกระเทียมพริกไทย", price: 80, unit: "1 กก." },
                    { id: `${stallId}_p10`, name: "ไส้อ่อนหมูล้างสะอาด", spec: "ลวกจิ้มซีฟู้ด/ทอดกระเทียมพริกไทย", price: 110, unit: "1 กก." },
                    { id: `${stallId}_p11`, name: "หมูนุ่มหมักน้ำมันงา", spec: "หมักสูตรภัตตาคาร นุ่มเด้ง ใส่ราดหน้า/หมูกระทะ", price: 150, unit: "1 กก." },
                    { id: `${stallId}_p12`, name: "กากหมูเจียวสดกรอบ", spec: "เจียวสดใหม่วันต่อวัน ไร้กลิ่นหืน", price: 50, unit: "1 ถุง (200g)" }
                ]
            }
        ];
    } else if (cat === "curry") {
        return [
            {
                groupName: "🌶️ พริกแกงสดตำมือสูตรเข้มข้น",
                items: [
                    { id: `${stallId}_c1`, name: "พริกแกงเผ็ดใต้สูตรเข้มข้น", spec: "หอมสมุนไพร ไม่ใส่สารกันบูด", price: 30, unit: "2 ขีด (200g)" },
                    { id: `${stallId}_c2`, name: "พริกแกงส้มใต้ (แกงเหลือง)", spec: "พริกแกงส้มใต้แท้ เผ็ดเปรี้ยวแซ่บ", price: 30, unit: "2 ขีด (200g)" },
                    { id: `${stallId}_c3`, name: "พริกแกงเขียวหวานโบราณ", spec: "พริกแกงเขียวหวานหอมใบกะเพรา/โหระพา", price: 30, unit: "2 ขีด (200g)" },
                    { id: `${stallId}_c4`, name: "พริกแกงพะแนง & พริกแกงมัสมั่น", spec: "หอมเครื่องเทศคั่ว กลิ่นละมุน", price: 35, unit: "2 ขีด (200g)" }
                ]
            },
            {
                groupName: "🥥 กะทิสดคั้นแท้ & เครื่องแกงสด",
                items: [
                    { id: `${stallId}_c5`, name: "กะทิสดคั้นแท้ 100% (ไม่ผสมน้ำ)", spec: "คั้นสดใหม่รอบเช้า หวานมันธรรมชาติ", price: 45, unit: "500 มล." },
                    { id: `${stallId}_c6`, name: "หัวกะทิสดเข้มข้น", spec: "แตกมันสวย เหมาะทำแกงเผ็ด/แกงคั่ว", price: 35, unit: "300 มล." },
                    { id: `${stallId}_c7`, name: "หน่อไม้ดองต้มสุกสะอาด", spec: "รสเปรี้ยวกำลังดี แกงส้มปลากะพง", price: 20, unit: "1 ถุง" },
                    { id: `${stallId}_c8`, name: "ยอดมะพร้าวอ่อนหั่นเส้น", spec: "กรอบหวาน ผัดกะเพรา/แกงส้ม", price: 25, unit: "1 แพ็ค" }
                ]
            },
            {
                groupName: "📦 ของแห้ง & เครื่องเทศคัดพิเศษ",
                items: [
                    { id: `${stallId}_c9`, name: "กุ้งแห้งเกรด A สีธรรมชาติ", spec: "กุ้งทะเลแท้ ไม่เค็มจัด ไร้สีผสมอาหาร", price: 95, unit: "1 ขีด" },
                    { id: `${stallId}_c10`, name: "กะปิตาดำระนองแท้ 100%", spec: "หอมเคยแท้ ตำน้ำพริกกะปิกินกับปลาทู", price: 45, unit: "1 กระปุก" },
                    { id: `${stallId}_c11`, name: "น้ำตาลโตนดแท้เมืองเพชร", spec: "หวานหอมนวล แกงกะทิกลมกล่อม", price: 40, unit: "500 กรัม" }
                ]
            }
        ];
    } else if (cat === "seafood") {
        return [
            {
                groupName: "🦐 กุ้งสด & หอยสดคัดไซส์",
                items: [
                    { id: `${stallId}_s1`, name: "กุ้งขาวสดแวนนาไม (30 ตัว/กก.)", spec: "กุ้งสดตัวใส เนื้อแน่นเด้ง นึ่ง/ต้มยำ", price: 220, unit: "1 กก." },
                    { id: `${stallId}_s2`, name: "กุ้งกุลาดำสดไซส์จัมโบ้", spec: "เนื้อแน่น กรอบ ย่างเกลือ/อบวุ้นเส้น", price: 280, unit: "1 กก." },
                    { id: `${stallId}_s3`, name: "กุ้งแม่น้ำเป็น (คัดหัวมัน)", spec: "มันหัวกุ้งเยิ้มๆ เผาเตาถ่านเด็ด", price: 380, unit: "1 กก." },
                    { id: `${stallId}_s4`, name: "หอยแมลงภู่สดล้างสะอาด", spec: "ตัวใหญ่ อบใบโหระพาจิ้มน้ำจิ้มซีฟู้ด", price: 45, unit: "1 กก." },
                    { id: `${stallId}_s5`, name: "หอยแครงสดลวก (คัดไซส์ใหญ่)", spec: "ล้างโคลนเอี่ยม เลือดฉ่ำๆ หวานกรอบ", price: 120, unit: "1 กก." }
                ]
            },
            {
                groupName: "🐟 ปลาสด & ปลาหมึกสด",
                items: [
                    { id: `${stallId}_s6`, name: "ปลากะพงขาวสด (ขอดเกล็ดควักไส้)", spec: "สดตาใส นึ่งมะนาว/ทอดน้ำปลา", price: 160, unit: "1 ตัว (~800g)" },
                    { id: `${stallId}_s7`, name: "ปลาทับทิมสดคัดไซส์พิเศษ", spec: "สดไร้กลิ่นคาว ต้มยำ/นึ่งซีอิ๊ว", price: 95, unit: "1 ตัว (~900g)" },
                    { id: `${stallId}_s8`, name: "ปลาหมึกกล้วยสดไซส์ใหญ่", spec: "สด ตัวใส ลวกจิ้ม/ย่างเตาถ่าน", price: 180, unit: "1 กก." },
                    { id: `${stallId}_s9`, name: "ปลาหมึกกระดองหั่นบั้ง", spec: "เนื้อหนากรอบกรุบ ผัดกะเพราซีฟู้ด", price: 160, unit: "1 กก." }
                ]
            },
            {
                groupName: "🦀 ปูสด & อาหารทะเลแปรรูป",
                items: [
                    { id: `${stallId}_s10`, name: "ปูม้าสดไข่แน่น (3-4 ตัว/กก.)", spec: "สดหวาน นึ่งสุกพร้อมน้ำจิ้ม", price: 320, unit: "1 กก." },
                    { id: `${stallId}_s11`, name: "เนื้อปูแกะก้อนพร้อมทาน", spec: "เนื้อปูก้อนโต ทำข้าวผัดปู/ไข่เจียวปู", price: 250, unit: "1 กล่อง (200g)" },
                    { id: `${stallId}_s12`, name: "ลูกชิ้นปลาเยาวราชแท้ 100%", spec: "ไม่ผสมแป้ง เด้งธรรมชาติ ลวกจิ้ม", price: 60, unit: "1 แพ็ค" }
                ]
            }
        ];
    } else {
        // Generic fresh stall products
        return [
            {
                groupName: "🌟 รายการสินค้าสดแนะนำ",
                items: [
                    { id: `${stallId}_g1`, name: `${stallName} - สินค้าสดคัดเกรดพิเศษ 1`, spec: "สด สะอาด คัดสรรวันต่อวัน", price: 65, unit: "1 ชุด" },
                    { id: `${stallId}_g2`, name: `${stallName} - สินค้าสดคัดเกรดพิเศษ 2`, spec: "สดใหม่ คุณภาพมาตรฐานตลาด", price: 85, unit: "1 กก." },
                    { id: `${stallId}_g3`, name: `${stallName} - สินค้าสดคัดเกรดพิเศษ 3`, spec: "สะอาด ถูกหลักอนามัย", price: 45, unit: "500 กรัม" },
                    { id: `${stallId}_g4`, name: `${stallName} - สินค้าสดคัดเกรดพิเศษ 4`, spec: "ชั่งน้ำหนักแม่นยำ พร้อมปรุง", price: 50, unit: "1 แพ็ค" },
                    { id: `${stallId}_g5`, name: `${stallName} - สินค้าสดคัดเกรดพิเศษ 5`, spec: "สดหวานจากแหล่งผลิต", price: 70, unit: "1 กก." }
                ]
            },
            {
                groupName: "📦 รายการสินค้าจัดชุดสุดคุ้ม",
                items: [
                    { id: `${stallId}_g6`, name: `${stallName} - ชุดสุดคุ้มประจำวัน`, spec: "รวมวัตถุดิบยอดนิยมในราคาพิเศษ", price: 120, unit: "1 เซ็ต" },
                    { id: `${stallId}_g7`, name: `${stallName} - สินค้าคัดไซส์จัมโบ้`, spec: "เกรดพรีเมียม ขนาดใหญ่พิเศษ", price: 150, unit: "1 กก." }
                ]
            }
        ];
    }
}

// Modal State
let currentModalStallId = null;
let currentModalCategory = "all";
let currentModalSearch = "";

function openStallCatalogModal(stallId) {
    currentModalStallId = stallId;
    currentModalCategory = "all";
    currentModalSearch = "";

    const stall = MARKET_DATA.find(s => s.stallId === stallId) || ALL_100_STALLS.find(s => s.stallId === stallId);
    if (!stall) return;

    // Set modal headers
    const iconEl = document.getElementById("modal-stall-icon");
    const numEl = document.getElementById("modal-stall-number");
    const zoneEl = document.getElementById("modal-stall-zone");
    const ownerEl = document.getElementById("modal-stall-owner");
    const nameEl = document.getElementById("modal-stall-name");
    const searchInput = document.getElementById("stall-catalog-search-input");
    const clearBtn = document.getElementById("stall-catalog-search-clear");

    if (iconEl) iconEl.textContent = stall.stallTag ? stall.stallTag.split(" ")[0] : "🏪";
    if (numEl) numEl.textContent = stall.stallNumber;
    if (zoneEl) zoneEl.textContent = `โซน ${stall.zone}`;
    if (ownerEl) ownerEl.textContent = stall.ownerName ? stall.ownerName.split(" ")[0] : "เจ้าของแผง";
    if (nameEl) nameEl.textContent = stall.stallName;
    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.classList.add("hidden");

    renderStallCatalogModal();
    document.getElementById("stall-catalog-modal").classList.remove("hidden");
}

function closeStallCatalogModal() {
    document.getElementById("stall-catalog-modal").classList.add("hidden");
    currentModalStallId = null;
}

function handleStallCatalogSearch(val) {
    currentModalSearch = val.trim().toLowerCase();
    const clearBtn = document.getElementById("stall-catalog-search-clear");
    if (clearBtn) {
        if (currentModalSearch.length > 0) clearBtn.classList.remove("hidden");
        else clearBtn.classList.add("hidden");
    }
    renderStallCatalogModal();
}

function clearStallCatalogSearch() {
    currentModalSearch = "";
    const searchInput = document.getElementById("stall-catalog-search-input");
    const clearBtn = document.getElementById("stall-catalog-search-clear");
    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.classList.add("hidden");
    renderStallCatalogModal();
}

function filterModalStallCategory(catName) {
    currentModalCategory = catName;
    renderStallCatalogModal();
}

function renderStallCatalogModal() {
    if (!currentModalStallId) return;

    const catalog = getStallCatalogData(currentModalStallId);
    const pillsContainer = document.getElementById("modal-stall-category-pills");
    const listContainer = document.getElementById("modal-stall-product-list");
    const modalCartTotal = document.getElementById("modal-cart-total-price");

    // Update bottom cart total
    if (modalCartTotal) {
        const totals = calculateCartTotals();
        modalCartTotal.textContent = `฿${totals.grandTotal.toLocaleString()}`;
    }

    // 1. Render Category Filter Pills
    if (pillsContainer) {
        let pillsHtml = `
            <button onclick="filterModalStallCategory('all')" class="px-3 py-1 rounded-xl whitespace-nowrap font-bold shrink-0 transition-all ${currentModalCategory === 'all' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}">
                ทั้งหมด (${catalog.reduce((s, g) => s + g.items.length, 0)} รายการ)
            </button>
        `;

        catalog.forEach(group => {
            const isAct = currentModalCategory === group.groupName;
            pillsHtml += `
                <button onclick="filterModalStallCategory('${group.groupName}')" class="px-3 py-1 rounded-xl whitespace-nowrap font-bold shrink-0 transition-all ${isAct ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}">
                    ${group.groupName} (${group.items.length})
                </button>
            `;
        });
        pillsContainer.innerHTML = pillsHtml;
    }

    // 2. Filter Groups & Items by Category and Search Query
    let filteredGroups = catalog.map(group => {
        if (currentModalCategory !== "all" && group.groupName !== currentModalCategory) {
            return null;
        }

        const filteredItems = group.items.filter(item => {
            if (!currentModalSearch) return true;
            return item.name.toLowerCase().includes(currentModalSearch) ||
                item.spec.toLowerCase().includes(currentModalSearch) ||
                group.groupName.toLowerCase().includes(currentModalSearch);
        });

        if (filteredItems.length === 0) return null;
        return {
            groupName: group.groupName,
            items: filteredItems
        };
    }).filter(Boolean);

    // 3. Render Product Table & Item Rows
    if (listContainer) {
        if (filteredGroups.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
                    <span class="material-symbols-outlined text-4xl mb-1 text-slate-300">manage_search</span>
                    <p class="text-xs font-bold text-slate-600">ไม่พบรายการสินค้าที่ค้นหา</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">ลองพิมพ์คำค้นหาอื่น เช่น อกไก่, น่อง, ผักกาดขาว</p>
                    <button onclick="clearStallCatalogSearch()" class="mt-3 px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold">ล้างคำค้นหา</button>
                </div>
            `;
            return;
        }

        let html = "";
        filteredGroups.forEach(group => {
            html += `
                <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <!-- Group Category Title -->
                    <div class="bg-slate-100/80 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                        <span class="font-extrabold text-xs text-slate-800 flex items-center gap-1">
                            <span>${group.groupName}</span>
                        </span>
                        <span class="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200">
                            ${group.items.length} รายการ
                        </span>
                    </div>

                    <!-- Items Table List -->
                    <div class="divide-y divide-slate-100">
                        ${group.items.map((item, idx) => {
                const inCart = state.cart.find(c => c.productId === item.id);
                const qty = inCart ? inCart.qty : 0;

                return `
                                <div class="p-3 flex items-center justify-between gap-3 hover:bg-emerald-50/30 transition-colors">
                                    
                                    <!-- Left: Index + Name & Spec -->
                                    <div class="flex items-start gap-2.5 flex-1 min-w-0">
                                        <span class="text-[10px] font-bold text-slate-400 w-4 shrink-0 pt-0.5">${idx + 1}.</span>
                                        <div>
                                            <div class="font-bold text-xs text-slate-900 leading-snug flex items-center gap-1.5 flex-wrap">
                                                <span>${item.name}</span>
                                                ${qty > 0 ? `<span class="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">ในตะกร้า ${qty} ${item.unit}</span>` : ''}
                                            </div>
                                            <div class="text-[10px] text-slate-500 mt-0.5 leading-tight">${item.spec}</div>
                                        </div>
                                    </div>

                                    <!-- Right: Price per Unit + Add/Adjust Cart Counter -->
                                    <div class="flex items-center gap-3 shrink-0">
                                        <div class="text-right">
                                            <div class="font-extrabold text-sm text-orange-600">฿${item.price}</div>
                                            <div class="text-[9px] text-slate-400">/${item.unit}</div>
                                        </div>

                                        <!-- Cart Counter / Add Button -->
                                        <div>
                                            ${qty > 0 ? `
                                                <div class="flex items-center gap-1 bg-emerald-700 text-white rounded-xl p-1 text-xs shadow-xs">
                                                    <button onclick="changeCartQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center hover:bg-emerald-800 rounded-lg font-bold transition-colors">-</button>
                                                    <span class="px-1.5 text-xs font-bold">${qty}</span>
                                                    <button onclick="changeCartQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center hover:bg-emerald-800 rounded-lg font-bold transition-colors">+</button>
                                                </div>
                                            ` : `
                                                <button onclick="addToCartFromModal('${currentModalStallId}', '${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.unit}')" class="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all">
                                                    <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
                                                    <span>ใส่ตะกร้า</span>
                                                </button>
                                            `}
                                        </div>
                                    </div>

                                </div>
                            `;
            }).join("")}
                    </div>
                </div>
            `;
        });

        listContainer.innerHTML = html;
    }
}

let pendingAddToCart = null;

function addToCartFromModal(stallId, productId, name, price, unit) {
    // 🔒 Enforce customer login check
    if (!state.customer || !state.customer.isLoggedIn) {
        showToast("🔒 กรุณาเข้าสู่ระบบลูกค้าก่อนเลือกสินค้าใส่ตะกร้าครับ");
        pendingAddToCart = { stallId, productId, fromModal: true, name, price, unit };
        openCustomerLoginModal();
        return;
    }

    const stall = MARKET_DATA.find(s => s.stallId === stallId) || ALL_100_STALLS.find(s => s.stallId === stallId);
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            stallId: stall ? stall.stallId : stallId,
            stallName: stall ? stall.stallName : "ร้านค้าในตลาด",
            stallNumber: stall ? stall.stallNumber : "แผงค้า",
            productId: productId,
            name: name,
            price: price,
            unit: unit,
            qty: 1
        });
    }

    showToast(`🛒 เพิ่ม "${name}" ลงตะกร้าแล้ว!`);
    saveCartToStorage(state.cart); // ✅ บันทึกตะกร้าลง localStorage
    updateCartUI();
    renderCatalog();
    renderStallCatalogModal();
}

// ==========================================
// CART & PRICING ENGINE
// ==========================================
function addToCart(stallId, productId) {
    // 🔒 Enforce customer login check
    if (!state.customer || !state.customer.isLoggedIn) {
        showToast("🔒 กรุณาเข้าสู่ระบบลูกค้าก่อนเลือกสินค้าใส่ตะกร้าครับ");
        pendingAddToCart = { stallId, productId, fromModal: false };
        openCustomerLoginModal();
        return;
    }

    if (!state.cart) state.cart = [];

    let stall = MARKET_DATA.find(s => s.stallId === stallId) || ALL_100_STALLS.find(s => s.stallId === stallId);
    let product = null;

    if (stall && stall.products) {
        product = stall.products.find(p => p.id === productId);
    }

    // Fallback 1: Search across all MARKET_DATA stalls
    if (!product) {
        for (const s of MARKET_DATA) {
            if (s.products) {
                const found = s.products.find(p => p.id === productId);
                if (found) {
                    stall = s;
                    product = found;
                    break;
                }
            }
        }
    }

    // Fallback 2: Search in extended catalog database
    if (!product) {
        for (const [sId, catalogGroups] of Object.entries(STALL_CATALOG_DATABASE)) {
            for (const group of catalogGroups) {
                const found = group.items.find(i => i.id === productId);
                if (found) {
                    stall = MARKET_DATA.find(s => s.stallId === sId) || ALL_100_STALLS.find(s => s.stallId === sId);
                    product = {
                        id: found.id,
                        name: found.name,
                        price: found.price,
                        unit: found.unit
                    };
                    break;
                }
            }
            if (product) break;
        }
    }

    if (!product) {
        console.warn("Product not found:", stallId, productId);
        return;
    }

    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            stallId: stall ? stall.stallId : stallId,
            stallName: stall ? stall.stallName : "ร้านค้าในตลาด",
            stallNumber: stall ? stall.stallNumber : "แผงค้า",
            productId: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            qty: 1
        });
    }

    showToast(`🛒 เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
    saveCartToStorage(state.cart); // ✅ บันทึกตะกร้าลง localStorage
    updateCartUI();
    renderCatalog();
    if (typeof currentModalStallId !== "undefined" && currentModalStallId) {
        renderStallCatalogModal();
    }
}

function changeCartQty(productId, delta) {
    if (delta > 0 && (!state.customer || !state.customer.isLoggedIn)) {
        showToast("🔒 กรุณาเข้าสู่ระบบลูกค้าก่อนเพิ่มสินค้าครับ");
        openCustomerLoginModal();
        return;
    }

    if (!state.cart) state.cart = [];
    const itemIndex = state.cart.findIndex(i => i.productId === productId);
    if (itemIndex > -1) {
        state.cart[itemIndex].qty += delta;
        if (state.cart[itemIndex].qty <= 0) {
            const removedName = state.cart[itemIndex].name;
            state.cart.splice(itemIndex, 1);
            showToast(`นำ "${removedName}" ออกจากตะกร้าแล้ว`);
        }
    }
    saveCartToStorage(state.cart); // ✅ บันทึกตะกร้าลง localStorage
    updateCartUI();
    renderCatalog();
    if (typeof currentModalStallId !== "undefined" && currentModalStallId) {
        renderStallCatalogModal();
    }
    if (state.currentScreen === "checkout") {
        renderCheckoutPage();
    }
}

function clearCart() {
    state.cart = [];
    saveCartToStorage(state.cart); // ✅ ล้างตะกร้าใน localStorage ด้วย
    updateCartUI();
    renderCatalog();
    if (state.currentScreen === "checkout") {
        renderCheckoutPage();
    }
    showToast("ล้างรายการในตะกร้าเรียบร้อย");
}

function calculateCartTotals() {
    if (!state.cart) state.cart = [];
    const itemsCount = state.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    const itemsSubtotal = state.cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 0)), 0);

    const uniqueStalls = new Set(state.cart.map(item => item.stallId));
    const stallsCount = uniqueStalls.size;

    let multiStallFee = 0;
    if (stallsCount >= 2) multiStallFee = 10;
    if (stallsCount >= 4) multiStallFee = 15;

    const deliveryFee = (state.deliveryLocation && typeof state.deliveryLocation.fee === "number") ? state.deliveryLocation.fee : 20;

    // Active coupon discount calculation
    let discountAmount = 0;
    let couponCode = "";
    if (state.activeCoupon) {
        couponCode = state.activeCoupon.code;
        if (couponCode === "FRESH20") {
            discountAmount = 20;
        } else if (couponCode === "FREESHIP") {
            discountAmount = deliveryFee;
        } else if (state.activeCoupon.discount) {
            discountAmount = state.activeCoupon.discount;
        }
    }

    const grandTotal = Math.max(0, itemsSubtotal + multiStallFee + deliveryFee - discountAmount);

    return {
        itemsCount,
        itemsSubtotal,
        stallsCount,
        multiStallFee,
        deliveryFee,
        discountAmount,
        couponCode,
        grandTotal
    };
}

function updateCartUI() {
    const totals = calculateCartTotals();
    const floatingCart = document.getElementById("customer-floating-cart");
    const navCartBadge = document.getElementById("nav-cart-badge");

    if (totals.itemsCount > 0) {
        if (floatingCart) {
            floatingCart.classList.add("visible");
            document.getElementById("cart-floating-count").textContent = `${totals.itemsCount} รายการ (จาก ${totals.stallsCount} แผงค้า)`;
            document.getElementById("cart-floating-total").textContent = `฿${totals.itemsSubtotal}`;
        }
        if (navCartBadge) {
            navCartBadge.textContent = totals.itemsCount;
            navCartBadge.classList.remove("hidden");
        }
    } else {
        if (floatingCart) floatingCart.classList.remove("visible");
        if (navCartBadge) navCartBadge.classList.add("hidden");
    }
}

// ==========================================
// CHECKOUT PAGE RENDERING & PAYMENT LOGIC
// ==========================================
function renderCheckoutPage() {
    const container = document.getElementById("checkout-stalls-group");
    if (!container) return;

    if (!state.cart || state.cart.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-card">
                <span class="material-symbols-outlined text-5xl text-slate-300 mb-2">remove_shopping_cart</span>
                <h3 class="font-bold text-sm text-slate-700">ตะกร้าของคุณยังว่างอยู่</h3>
                <p class="text-xs text-slate-400 mt-1">เลือกซื้อไก่สดหรือวัตถุดิบจากตลาดสดได้เลย</p>
                <button onclick="goToMarketScreen()" class="mt-4 px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs active:scale-95 transition-all">
                    กลับไปเลือกของสด
                </button>
            </div>
        `;
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setVal("summary-items-count", "0");
        setVal("summary-items-price", "฿0");
        setVal("summary-stall-count", "0");
        setVal("summary-multistall-fee", "฿0");
        setVal("summary-delivery-fee", "฿0");
        setVal("summary-grand-total", "฿0");
        setVal("btn-checkout-total", "ชำระเงิน ฿0");
        return;
    }

    const grouped = {};
    state.cart.forEach(item => {
        if (!grouped[item.stallId]) {
            grouped[item.stallId] = {
                stallId: item.stallId,
                stallName: item.stallName,
                stallNumber: item.stallNumber,
                items: []
            };
        }
        grouped[item.stallId].items.push(item);
    });

    let html = "";
    Object.keys(grouped).forEach(stallId => {
        const stallGroup = grouped[stallId];
        const stallObj = ALL_100_STALLS.find(s => s.stallId === stallId) || MARKET_DATA.find(s => s.stallId === stallId);

        let badgeStyle = "bg-emerald-100 text-emerald-800 border-emerald-200";
        if (stallGroup.stallNumber.includes("A")) badgeStyle = "bg-orange-100 text-orange-900 border-orange-200";
        else if (stallGroup.stallNumber.includes("B")) badgeStyle = "bg-emerald-100 text-emerald-900 border-emerald-200";
        else if (stallGroup.stallNumber.includes("C")) badgeStyle = "bg-red-100 text-red-900 border-red-200";
        else if (stallGroup.stallNumber.includes("E")) badgeStyle = "bg-cyan-100 text-cyan-900 border-cyan-200";

        html += `
            <div class="bg-white rounded-2xl p-3.5 shadow-card border border-slate-200/80 space-y-2.5">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span class="${badgeStyle} text-[10px] font-black px-2 py-0.5 rounded-md border">
                            ${stallGroup.stallNumber}
                        </span>
                        <span>${stallGroup.stallName}</span>
                    </span>
                    <span class="text-[10px] text-slate-400 font-medium">${stallGroup.items.length} รายการ</span>
                </div>

                <div class="space-y-2 divide-y divide-slate-50">
                    ${stallGroup.items.map(item => `
                        <div class="flex items-center justify-between text-xs pt-2 first:pt-0">
                            <div class="flex-1 pr-2">
                                <div class="font-extrabold text-slate-800 leading-snug">${item.name}</div>
                                <div class="text-[10px] text-slate-400 mt-0.5">฿${item.price} / ${item.unit}</div>
                            </div>
                            <div class="flex items-center gap-2.5 shrink-0">
                                <!-- Minus/Plus Qty Buttons with Active Animations -->
                                <div class="flex items-center gap-1 bg-slate-100 rounded-xl p-0.5 border border-slate-200 shadow-2xs">
                                    <button type="button" onclick="changeCartQty('${item.productId}', -1)" class="w-6 h-6 flex items-center justify-center font-black text-slate-700 hover:bg-slate-200 active:scale-90 rounded-lg transition-transform" title="ลดจำนวน">-</button>
                                    <span class="px-1.5 text-xs font-black text-slate-900 min-w-[14px] text-center">${item.qty}</span>
                                    <button type="button" onclick="changeCartQty('${item.productId}', 1)" class="w-6 h-6 flex items-center justify-center font-black text-slate-700 hover:bg-slate-200 active:scale-90 rounded-lg transition-transform" title="เพิ่มจำนวน">+</button>
                                </div>
                                <span class="font-black text-slate-900 w-12 text-right text-xs">฿${item.price * item.qty}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // ✅ Sync state.activeCoupon จาก radio ที่ถูกเลือกอยู่จริงใน DOM
    // เพื่อให้ badge และ summary ตรงกับที่ผู้ใช้เห็น
    const checkedCouponRadio = document.querySelector('input[name="checkout_coupon"]:checked');
    if (checkedCouponRadio) {
        const selectedVal = checkedCouponRadio.value;
        if (selectedVal === "none") {
            state.activeCoupon = null;
        } else if (selectedVal === "FRESH20" && !state.activeCoupon) {
            state.activeCoupon = { code: "FRESH20", discount: 20, desc: "ส่วนลด ฿20 สั่งของสดรอบถัดไป" };
        }
    }

    const totals = calculateCartTotals();
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setVal("summary-items-count", totals.itemsCount);
    setVal("summary-items-price", `฿${totals.itemsSubtotal}`);
    setVal("summary-stall-count", totals.stallsCount);
    setVal("summary-multistall-fee", `฿${totals.multiStallFee}`);
    setVal("summary-delivery-fee", `฿${totals.deliveryFee}`);

    // Coupon Discount row in summary
    const discountRow = document.getElementById("summary-discount-row");
    if (discountRow) {
        if (totals.discountAmount > 0) {
            discountRow.classList.remove("hidden");
            setVal("summary-discount-code", totals.couponCode || "ส่วนลด");
            setVal("summary-discount-amount", `-฿${totals.discountAmount}`);
        } else {
            discountRow.classList.add("hidden");
        }
    }

    // Checkout coupon badge
    const couponBadge = document.getElementById("checkout-coupon-status-badge");
    if (couponBadge) {
        if (totals.discountAmount > 0) {
            couponBadge.innerHTML = `🎟️ ใช้คูปอง ${totals.couponCode} (-฿${totals.discountAmount})`;
            couponBadge.className = "text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold";
        } else {
            couponBadge.innerHTML = `🎟️ ยังไม่ใช้คูปอง`;
            couponBadge.className = "text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-bold";
        }
    }

    setVal("summary-grand-total", `฿${totals.grandTotal}`);
    setVal("btn-checkout-total", `ชำระเงิน ฿${totals.grandTotal}`);

    // Update Address and Location card
    const addrTitle = document.getElementById("checkout-address-title");
    const addrDetail = document.getElementById("checkout-address-detail");
    if (addrTitle) addrTitle.textContent = (state.deliveryLocation && state.deliveryLocation.title) ? state.deliveryLocation.title : "กรุณาระบุที่อยู่จัดส่งของคุณ";
    if (addrDetail) addrDetail.textContent = (state.deliveryLocation && state.deliveryLocation.detail) ? state.deliveryLocation.detail : "แตะเพื่อระบุพิกัดหรือเลือกที่อยู่จัดส่ง";
}

// Payment Method Selector
function selectPaymentMethod(method) {
    const radio = document.querySelector(`input[name="payment_method"][value="${method}"]`);
    if (radio) radio.checked = true;

    const pCard = document.getElementById("payment-label-promptpay");
    const bCard = document.getElementById("payment-label-bank_transfer");
    const cCard = document.getElementById("payment-label-cod");

    if (pCard) pCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/40 cursor-pointer transition-all";
    if (bCard) bCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white hover:bg-purple-50/40 cursor-pointer transition-all";
    if (cCard) cCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white hover:bg-amber-50/40 cursor-pointer transition-all";

    if (method === "promptpay" && pCard) {
        pCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 cursor-pointer transition-all shadow-xs";
    } else if (method === "bank_transfer" && bCard) {
        bCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border-2 border-purple-600 bg-purple-50/70 cursor-pointer transition-all shadow-xs";
    } else if (method === "cod" && cCard) {
        cCard.className = "payment-method-card flex items-center justify-between p-3 rounded-2xl border-2 border-amber-500 bg-amber-50/60 cursor-pointer transition-all shadow-xs";
    }
}

// Order Checkout Processor
function processOrderCheckout() {
    if (!state.customer || !state.customer.isLoggedIn) {
        showToast("🔒 กรุณาเข้าสู่ระบบลูกค้าก่อนชำระเงินครับ");
        openCustomerLoginModal();
        return;
    }

    const totals = calculateCartTotals();
    if (totals.itemsCount === 0) {
        showToast("กรุณาเลือกสินค้าลงตะกร้าก่อนทำรายการ");
        return;
    }

    const selectedRadio = document.querySelector('input[name="payment_method"]:checked');
    const selectedPayment = selectedRadio ? selectedRadio.value : "promptpay";

    if (selectedPayment === "promptpay") {
        const qrTotal = document.getElementById("modal-qr-grand-total");
        if (qrTotal) qrTotal.textContent = `฿${totals.grandTotal}.00`;
        document.getElementById("promptpay-modal").classList.remove("hidden");
    } else if (selectedPayment === "bank_transfer") {
        const scbAmount = document.getElementById("scb-modal-amount");
        if (scbAmount) scbAmount.textContent = `฿${totals.grandTotal}.00`;
        document.getElementById("scb-transfer-modal").classList.remove("hidden");
    } else {
        simulatePaymentSuccess("cod");
    }
}

// PromptPay Modal Functions
function closePromptPayModal() {
    const modal = document.getElementById("promptpay-modal");
    if (modal) modal.classList.add("hidden");
}

function downloadPromptPayQR() {
    const link = document.createElement("a");
    link.href = "promptpay_qr.png";
    link.download = "promptpay_qr_skaisod.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("📥 บันทึกรูป Thai QR Payment (สไก่สด บ้านบึง) ลงในเครื่องแล้ว!");
}

function handlePromptPaySlipUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.getElementById("promptpay-slip-img");
        const previewBox = document.getElementById("promptpay-slip-preview-box");
        if (img && previewBox) {
            img.src = e.target.result;
            previewBox.classList.remove("hidden");
            showToast("📁 แนบสลิปพร้อมเพย์เรียบร้อยแล้ว!");
        }
    };
    reader.readAsDataURL(file);
}

function clearPromptPaySlip() {
    const previewBox = document.getElementById("promptpay-slip-preview-box");
    const img = document.getElementById("promptpay-slip-img");
    if (previewBox) previewBox.classList.add("hidden");
    if (img) img.src = "";
}

// SCB Bank Transfer Modal Functions
function closeSCBModal() {
    const modal = document.getElementById("scb-transfer-modal");
    if (modal) modal.classList.add("hidden");
}

function copySCBAccount() {
    const accNo = "4111305737";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(accNo).then(() => {
            showToast("📋 คัดลอกเลขบัญชี SCB 4111305737 เรียบร้อยแล้ว!");
        }).catch(() => {
            showToast("📋 เลขบัญชี SCB: 4111305737 (นายพิแสนย์ อิสระประศาสน์)");
        });
    } else {
        showToast("📋 เลขบัญชี SCB: 4111305737 (นายพิแสนย์ อิสระประศาสน์)");
    }
}

function copyTransferAmount() {
    const totals = calculateCartTotals();
    const amtStr = totals.grandTotal.toString();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(amtStr).then(() => {
            showToast(`📋 คัดลอกยอดเงิน ฿${totals.grandTotal} เรียบร้อยแล้ว!`);
        }).catch(() => {
            showToast(`ยอดเงิน: ฿${totals.grandTotal}`);
        });
    } else {
        showToast(`ยอดเงิน: ฿${totals.grandTotal}`);
    }
}

function handleSCBSlipUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.getElementById("scb-slip-img");
        const previewBox = document.getElementById("scb-slip-preview-box");
        if (img && previewBox) {
            img.src = e.target.result;
            previewBox.classList.remove("hidden");
            showToast("📁 แนบสลิปโอนเงิน SCB เรียบร้อยแล้ว!");
        }
    };
    reader.readAsDataURL(file);
}

function clearSCBSlip() {
    const previewBox = document.getElementById("scb-slip-preview-box");
    const img = document.getElementById("scb-slip-img");
    if (previewBox) previewBox.classList.add("hidden");
    if (img) img.src = "";
}

function confirmSCBPayment() {
    closeSCBModal();
    simulatePaymentSuccess("bank_transfer");
}

// Payment Success Simulation & Order Creation
function simulatePaymentSuccess(paymentType = "promptpay") {
    closePromptPayModal();
    closeSCBModal();
    const totals = calculateCartTotals();

    let paymentDesc = "จ่ายผ่านพร้อมเพย์แล้ว";
    if (paymentType === "bank_transfer") paymentDesc = "โอนผ่าน SCB แล้ว (4111305737)";
    else if (paymentType === "cod") paymentDesc = "เก็บเงินสดปลายทาง (COD)";

    const noteInput = document.getElementById("delivery-note-input");
    const noteVal = noteInput ? noteInput.value.trim() : "อยู่ติดกับ 7-11";

    const stallsMap = {};
    state.cart.forEach(item => {
        if (!stallsMap[item.stallId]) {
            stallsMap[item.stallId] = {
                stallId: item.stallId,
                name: item.stallName || item.stallNumber || "แผงค้าในตลาด",
                tag: item.stallNumber ? `แผง ${item.stallNumber}` : "แผงค้าในตลาด",
                badgeColor: "bg-slate-50",
                itemsCount: 0,
                pickedCount: 0,
                status: "picking",
                items: []
            };
        }
        stallsMap[item.stallId].itemsCount += (item.qty || 1);
        stallsMap[item.stallId].items.push({
            productId: item.productId,
            name: `${item.name} (${item.unit || 'ชิ้น'})`,
            price: (item.price || 0) * (item.qty || 1),
            qty: item.qty || 1,
            picked: false
        });
    });

    const loc = state.deliveryLocation;
    const orderLat = (loc && loc.lat) ? loc.lat : MARKET_ORIGIN.lat;
    const orderLng = (loc && loc.lng) ? loc.lng : MARKET_ORIGIN.lng;
    const orderHouse = (loc && loc.houseNumber) ? loc.houseNumber : "";
    const orderSoi = (loc && loc.soiRoad) ? loc.soiRoad : "";
    const orderSub = (loc && loc.subdistrict) ? loc.subdistrict : "";
    const orderLandmark = noteVal || (loc && loc.landmark) || "";
    const orderAddress = (loc && loc.fullAddress) ? loc.fullAddress : (loc && loc.title ? loc.title : "ตามพิกัดที่ลูกค้าระบุ");

    state.activeOrder = {
        orderId: "#TH-" + Math.floor(1000 + Math.random() * 9000),
        status: "picking",
        total: totals.grandTotal,
        grandTotal: totals.grandTotal,
        paymentType: paymentType,
        paymentDesc: paymentDesc,
        deliveryNote: orderLandmark,
        customerName: (state.customer && state.customer.isLoggedIn) ? state.customer.identifier : "ลูกค้าทั่วไป",
        customerPhone: (state.customer && state.customer.phone) ? state.customer.phone : "080-568-7733",
        address: orderAddress,
        houseNumber: orderHouse,
        soiRoad: orderSoi,
        subdistrict: orderSub,
        landmark: orderLandmark,
        lat: orderLat,
        lng: orderLng,
        stalls: Object.values(stallsMap)
    };

    // Clear cart
    state.cart = [];
    saveCartToStorage(state.cart); // ✅ ล้างตะกร้าใน localStorage
    updateCartUI();

    // ✅ บันทึก active order ลง localStorage เพื่อ sync กับ tab อื่น
    saveActiveOrderToStorage(state.activeOrder);

    // 1. Play Sound Alert (กระดิ่งเตือนออเดอร์ใหม่)
    playOrderAlertSound();

    // 2. Send LINE Notification (ส่งแจ้งเตือนเข้า LINE - เปิด LINE จริง)
    sendLineOrderNotification(state.activeOrder);

    // 3. Update Hub Badge
    const hubBadge = document.getElementById("hub-badge-count");
    if (hubBadge) {
        hubBadge.classList.remove("hidden");
        hubBadge.textContent = "NEW";
    }

    if (paymentType === "bank_transfer") {
        showToast("🎉 โอนเงิน SCB สำเร็จ! ส่งแจ้งเตือนเข้า LINE & ระบบจัดส่งแล้ว 🔔");
    } else if (paymentType === "cod") {
        showToast("🎉 สั่งซื้อสำเร็จ! ส่งแจ้งเตือนเข้า LINE & เตรียมชำระเงินสดกับไรเดอร์ 🔔");
    } else {
        showToast("🎉 ชำระเงินสำเร็จ! ส่งแจ้งเตือนเข้า LINE & ระบบจัดส่งเรียบร้อยแล้ว 🔔");
    }

    goToTrackingScreen();
}

// ==========================================
// TRACKING SCREEN RENDERING & INTERACTIVE ACTIONS
// ==========================================
function renderTrackingScreen() {
    const order = state.activeOrder;
    const isCustomerLoggedIn = state.customer && state.customer.isLoggedIn;

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    // ถ้าไม่มีออเดอร์ หรือลูกค้าออกจากระบบแล้ว ให้เคลียร์หน้าจอติดตาม
    if (!order || !isCustomerLoggedIn) {
        setVal("tracking-order-id", "ไม่มีออเดอร์ค้างส่ง");
        const statusTitle = document.getElementById("tracking-status-title");
        const statusDesc = document.getElementById("tracking-status-desc");
        const etaPill = document.getElementById("tracking-eta-pill");
        if (statusTitle) statusTitle.textContent = "ยังไม่มีออเดอร์ที่กำลังจัดส่ง";
        if (statusDesc) statusDesc.textContent = "กรุณาเข้าสู่ระบบหรือเลือกซื้อของสดในตลาดเพื่อเริ่มจัดส่ง";
        if (etaPill) etaPill.innerHTML = `<span>ไม่มีคิวจัดส่งในขณะนี้</span>`;
        const refundBanner = document.getElementById("tracking-refund-banner");
        if (refundBanner) refundBanner.classList.add("hidden");
        const container = document.getElementById("tracking-stalls-progress");
        if (container) container.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">ไม่มีรายการสินค้าที่กำลังจัดส่ง</div>`;
        const completedBox = document.getElementById("tracking-completed-actions-box");
        if (completedBox) completedBox.classList.add("hidden");
        return;
    }

    setVal("tracking-order-id", `ออเดอร์ ${order.orderId}`);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;
    const payMethodText = order.paymentType === "bank_transfer" ? "โอน SCB" : (order.paymentType === "cod" ? "เก็บเงินสด COD" : "พร้อมเพย์");

    setVal("tracking-step1-subtitle", `${timeStr} • ยอดรวม ฿${order.total} (${payMethodText})`);

    const stallsCount = order.stalls ? order.stalls.length : 3;
    setVal("tracking-step2-title", `กำลังเดินรวบรวมของสด (${stallsCount} แผง)`);

    if (order.stalls && order.stalls.length > 0) {
        const stallNames = order.stalls.map(s => s.name).join(" + ");
        setVal("tracking-step2-stalls", stallNames);
    }

    const destTitle = (state.deliveryLocation && state.deliveryLocation.title) ? state.deliveryLocation.title : (order.address || "ที่อยู่ปลายทาง");
    setVal("tracking-step3-dest", `มุ่งหน้า ${destTitle}`);

    // Update Status Hero Banner based on current status
    const statusIcon = document.getElementById("tracking-status-icon");
    const statusTitle = document.getElementById("tracking-status-title");
    const statusDesc = document.getElementById("tracking-status-desc");
    const etaPill = document.getElementById("tracking-eta-pill");
    const stepPicking = document.getElementById("step-picking");
    const stepDelivering = document.getElementById("step-delivering");
    const stepDone = document.getElementById("step-done");

    const orderStatus = order.status || "picking";

    if (orderStatus === "picking") {
        if (statusIcon) statusIcon.textContent = "storefront";
        if (statusTitle) statusTitle.textContent = "ทีมงานกำลังเดินหยิบของสดในตลาด";
        if (statusDesc) statusDesc.textContent = "กำลังรวบรวมชิ้นส่วนไก่ และผักสดจากแผงค้า";
        if (etaPill) etaPill.innerHTML = `<span class="material-symbols-outlined text-xs text-amber-600">alarm</span><span>คาดว่าจะถึงในเวลา <strong>09:15 น.</strong> (อีกประมาณ 20 นาที)</span>`;

        if (stepPicking) {
            stepPicking.classList.remove("opacity-50");
            const sp = stepPicking.querySelector("span");
            if (sp) sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-amber-100 animate-pulse";
        }
        if (stepDelivering) {
            stepDelivering.classList.add("opacity-50");
            const sp = stepDelivering.querySelector("span");
            if (sp) sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-white flex items-center justify-center text-[10px] font-bold";
        }
        if (stepDone) {
            stepDone.classList.add("opacity-50");
            const sp = stepDone.querySelector("span");
            if (sp) sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-white flex items-center justify-center text-[10px] font-bold";
        }
    } else if (orderStatus === "delivering") {
        if (statusIcon) statusIcon.textContent = "two_wheeler";
        if (statusTitle) statusTitle.textContent = "ไรเดอร์กำลังเดินทางไปหาคุณ 🛵";
        if (statusDesc) statusDesc.textContent = `พี่สมชายกำลังขับมุ่งหน้า ${destTitle}`;
        if (etaPill) etaPill.innerHTML = `<span class="material-symbols-outlined text-xs text-cyan-600">alarm</span><span>คาดว่าจะถึงในเวลา <strong>09:05 น.</strong> (อีกประมาณ 10 นาที)</span>`;

        if (stepPicking) {
            stepPicking.classList.remove("opacity-50");
            const sp = stepPicking.querySelector("span");
            if (sp) {
                sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold";
                sp.textContent = "✓";
            }
        }
        if (stepDelivering) {
            stepDelivering.classList.remove("opacity-50");
            const sp = stepDelivering.querySelector("span");
            if (sp) {
                sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-cyan-100 animate-pulse";
                sp.textContent = "3";
            }
        }
        if (stepDone) {
            stepDone.classList.add("opacity-50");
            const sp = stepDone.querySelector("span");
            if (sp) {
                sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-white flex items-center justify-center text-[10px] font-bold";
                sp.textContent = "4";
            }
        }
    } else if (orderStatus === "delivered") {
        if (statusIcon) statusIcon.textContent = "check_circle";
        if (statusTitle) statusTitle.textContent = "จัดส่งสำเร็จเรียบร้อยแล้ว 🎉";
        if (statusDesc) statusDesc.textContent = "ของสดคุณภาพส่งตรงถึงครัวคุณเรียบร้อย ตรวจรับสินค้าได้เลย";
        if (etaPill) etaPill.innerHTML = `<span class="material-symbols-outlined text-xs text-emerald-600">verified</span><span>จัดส่งสำเร็จเมื่อ <strong>09:05 น.</strong> (ตรงเวลา)</span>`;

        [stepPicking, stepDelivering, stepDone].forEach(st => {
            if (st) {
                st.classList.remove("opacity-50");
                const sp = st.querySelector("span");
                if (sp) {
                    sp.className = "absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs";
                    sp.textContent = "✓";
                }
            }
        });
    }

    // Toggle Post-Delivery Completed Actions Box
    const completedActionsBox = document.getElementById("tracking-completed-actions-box");
    if (completedActionsBox) {
        if (orderStatus === "delivered") {
            completedActionsBox.classList.remove("hidden");
            const reorderBtnText = document.getElementById("tracking-reorder-btn-text");
            if (reorderBtnText) {
                let validCount = 0;
                let validTotal = 0;
                if (order.stalls) {
                    order.stalls.forEach(s => {
                        (s.items || []).forEach(it => {
                            if (!it.outOfStock) {
                                validCount++;
                                validTotal += ((it.actualPrice !== undefined ? it.actualPrice : it.price) * (it.qty || 1));
                            }
                        });
                    });
                }
                if (validCount > 0) {
                    reorderBtnText.textContent = `สั่งซ้ำรายการเดิมทันที (${validCount} รายการ ฿${validTotal})`;
                } else {
                    reorderBtnText.textContent = "สั่งซ้ำรายการเดิมทันที";
                }
            }
        } else {
            completedActionsBox.classList.add("hidden");
        }
    }

    // Calculate Out-of-Stock and Cash Refund
    let refundCashTotal = 0;
    let outOfStockCount = 0;
    if (order.stalls) {
        order.stalls.forEach(s => {
            (s.items || []).forEach(item => {
                if (item.outOfStock) {
                    const price = item.actualPrice !== undefined ? item.actualPrice : item.price;
                    refundCashTotal += price;
                    outOfStockCount++;
                }
            });
        });
    }
    order.refundCashTotal = refundCashTotal;
    order.finalPaidTotal = Math.max(0, (order.grandTotal || order.total || 0) - refundCashTotal);

    // Update Tracking Refund Banner (ขั้นตอนที่ 3: แสดงเงินทอนใส่ซองให้ลูกค้าเห็นอย่างชัดเจน)
    const refundBanner = document.getElementById("tracking-refund-banner");
    if (refundBanner) {
        if (refundCashTotal > 0) {
            refundBanner.classList.remove("hidden");
            refundBanner.innerHTML = `
                <div class="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-4 shadow-lg border border-amber-300 space-y-3 animate-fade-in text-xs mb-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 font-black text-sm">
                            <span class="text-xl">✉️</span>
                            <span>สรุปเงินทอนใส่ซอง: ฿${refundCashTotal}</span>
                        </div>
                        <span class="bg-white/25 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">คืนเงินสดใส่ซอง</span>
                    </div>
                    
                    <p class="text-[11px] text-amber-50 leading-relaxed bg-black/10 p-2.5 rounded-xl border border-white/10">
                        มีสินค้าที่แผงค้าหมด ${outOfStockCount} รายการ ทีมงานฮับได้นำเงินสดจำนวน <strong>฿${refundCashTotal}</strong> ใส่ซองใสและเย็บแนบติดไปกับถุงของสดเรียบร้อยแล้ว ไรเดอร์จะนำเงินสดมอบคืนให้พร้อมถุงของสดครับ
                    </p>

                    <!-- การแจกแจงยอดเงิน 3 ช่องให้เข้าใจในแวบเดียว -->
                    <div class="grid grid-cols-3 gap-1.5 pt-0.5 text-center">
                        <div class="bg-white/15 rounded-xl p-2 border border-white/10">
                            <div class="text-[9px] text-amber-100 font-medium">ยอดที่คุณโอนมา</div>
                            <div class="font-black text-xs text-white mt-0.5">฿${order.grandTotal || order.total || 0}</div>
                        </div>
                        <div class="bg-white/25 rounded-xl p-2 border border-white/20">
                            <div class="text-[9px] text-amber-100 font-bold">หักคืนเงินสดใส่ซอง</div>
                            <div class="font-black text-xs text-amber-200 mt-0.5">-฿${refundCashTotal}</div>
                        </div>
                        <div class="bg-white/15 rounded-xl p-2 border border-white/10">
                            <div class="text-[9px] text-amber-100 font-medium">ยอดของสดที่ได้รับ</div>
                            <div class="font-black text-xs text-emerald-200 mt-0.5">=฿${order.finalPaidTotal || 0}</div>
                        </div>
                    </div>

                    <!-- ปุ่มดู e-Receipt ทันที -->
                    <button type="button" onclick="openReceiptModal()" class="w-full bg-white text-slate-900 hover:bg-amber-50 font-black py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm text-emerald-700">receipt_long</span>
                        <span>ดูใบเสร็จรับเงิน e-Receipt ฉบับเต็ม (พร้อมรายการของหมด)</span>
                    </button>
                </div>
            `;
        } else {
            refundBanner.classList.add("hidden");
        }
    }

    // Render Stall Progress Checklist matching user screenshot
    const container = document.getElementById("tracking-stalls-progress");
    if (!container) return;

    let totalPicked = 0;
    let html = "";
    order.stalls.forEach((stall, idx) => {
        const activeItems = (stall.items || []).filter(i => !i.outOfStock);
        const oosItems = (stall.items || []).filter(i => i.outOfStock);
        const isReady = activeItems.length > 0 ? (stall.pickedCount >= activeItems.length) : true;
        if (isReady) totalPicked++;

        let statusBadge = `<span class="text-[10px] text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs"><span>⏳</span><span>กำลังจัดเตรียม</span></span>`;
        if (isReady) {
            statusBadge = `<span class="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs"><span>✓</span><span>หยิบครบแล้ว</span></span>`;
        }
        if (activeItems.length === 0 && oosItems.length > 0) {
            statusBadge = `<span class="text-[10px] text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs"><span>⚠️</span><span>สินค้าหมดทั้งแผง</span></span>`;
        }

        // แสดงรายการสินค้าแยกย่อยใต้แผงค้า ให้ลูกค้าตรวจสอบได้โปร่งใส
        let itemsListHtml = "";
        if (stall.items && stall.items.length > 0) {
            itemsListHtml = `<div class="mt-2 pt-2 border-t border-slate-100 space-y-1.5">`;
            stall.items.forEach(item => {
                const itemPrice = item.actualPrice !== undefined ? item.actualPrice : item.price;
                const isOOS = item.outOfStock || false;
                itemsListHtml += `
                    <div class="flex items-center justify-between text-xs py-0.5 ${isOOS ? 'text-rose-700 bg-rose-50/50 px-2 py-1 rounded-lg' : 'text-slate-700'}">
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs ${isOOS ? 'text-rose-500 font-bold' : 'text-emerald-600'}">${isOOS ? '✕' : '✓'}</span>
                            <span class="${isOOS ? 'line-through text-slate-400 font-medium' : 'font-semibold'}">${item.name}</span>
                            ${isOOS ? '<span class="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-black">ของหมด • คืนเงินสดใส่ซอง</span>' : ''}
                        </div>
                        <span class="font-bold ${isOOS ? 'text-rose-600' : 'text-slate-800'} text-xs">
                            ${isOOS ? `คืน ฿${itemPrice}` : `฿${itemPrice}`}
                        </span>
                    </div>
                `;
            });
            itemsListHtml += `</div>`;
        }

        html += `
            <div class="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-xs space-y-1">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-xl ${isReady ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'} flex items-center justify-center font-bold text-sm shrink-0">
                            ${isReady ? '✓' : '⏳'}
                        </div>
                        <div>
                            <div class="font-extrabold text-slate-800 text-xs leading-tight">${stall.name}</div>
                            <div class="text-[10px] text-slate-400 mt-0.5 font-medium">จำนวน ${stall.itemsCount} รายการ ${oosItems.length > 0 ? `<span class="text-rose-600 font-bold">(หมด ${oosItems.length} คืน ฿${oosItems.reduce((s,i)=>s+(i.actualPrice||i.price),0)})</span>` : ''}</div>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                ${itemsListHtml}
            </div>
        `;
    });

    container.innerHTML = html;
    setVal("picking-progress-badge", `หยิบแล้ว ${totalPicked}/${order.stalls.length} แผง`);
}

// Toggle Stall Picking Status (ใช้กรณีจำลองหรือฝั่งจัดการ)
function toggleStallPicking(stallIndex) {
    if (!state.activeOrder || !state.activeOrder.stalls[stallIndex]) return;
    const stall = state.activeOrder.stalls[stallIndex];
    if (stall.pickedCount >= stall.itemsCount) {
        stall.pickedCount = 0;
        showToast(`⏳ ปรับสถานะ "${stall.name}" เป็นกำลังจัดเตรียม`);
    } else {
        stall.pickedCount = stall.itemsCount;
        showToast(`✓ แผง "${stall.name}" จัดของสดครบเรียบร้อยแล้ว!`);
    }

    saveActiveOrderToStorage(state.activeOrder);
    renderTrackingScreen();
}

// Interactive Simulation Controller (ซิงค์สถานะเข้า Firebase และ Storage)
function simulateOrderStatus(targetStatus) {
    if (!state.activeOrder) return;
    state.activeOrder.status = targetStatus;

    if (targetStatus === "picking") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = 0);
        showToast("📦 ขั้นตอนที่ 1-2: ทีมงานกำลังเดินหยิบของสดในตลาด");
    } else if (targetStatus === "delivering") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = s.itemsCount);
        showToast("🛵 ขั้นตอนที่ 3: รวมของครบแล้ว! ไรเดอร์กำลังออกเดินทาง");
    } else if (targetStatus === "delivered") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = s.itemsCount);
        showToast("🎉 ขั้นตอนที่ 4: จัดส่งสำเร็จถึงมือคุณเรียบร้อยแล้ว!");
    }
    saveActiveOrderToStorage(state.activeOrder);
    renderTrackingScreen();
}

// Rider Operation Handlers (ส่งมอบหน้าที่ระหว่าง Hub -> Rider -> Customer)
function handleRiderStartDelivery() {
    if (!state.activeOrder) {
        showToast("⚠️ ไม่พบออเดอร์ที่กำลังรอดำเนินการ");
        return;
    }
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;
    state.activeOrder.status = "delivering";
    state.activeOrder.startedDeliveryAt = timeStr;

    if (state.activeOrder.stalls) {
        state.activeOrder.stalls.forEach(s => {
            s.pickedCount = s.itemsCount;
            if (s.items) s.items.forEach(i => i.picked = true);
        });
    }

    saveActiveOrderToStorage(state.activeOrder);
    updateOrderStatusInFirebase(state.activeOrder.orderId, "delivering");

    renderRiderScreen();
    if (typeof renderTrackingScreen === "function") renderTrackingScreen();
    if (typeof updateHomeActiveOrderBanner === "function") updateHomeActiveOrderBanner();
    if (typeof playOrderAlertSound === "function") playOrderAlertSound();

    showToast("🛵 ไรเดอร์รับของแล้ว ออกเดินทางนำส่งลูกค้า!");
}

function handleRiderCompleteDelivery() {
    if (!state.activeOrder) {
        showToast("⚠️ ไม่พบออเดอร์ที่กำลังรอดำเนินการ");
        return;
    }
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;
    state.activeOrder.status = "delivered";
    state.activeOrder.deliveredAt = timeStr;

    if (state.activeOrder.stalls) {
        state.activeOrder.stalls.forEach(s => {
            s.pickedCount = s.itemsCount;
            if (s.items) s.items.forEach(i => i.picked = true);
        });
    }

    saveActiveOrderToStorage(state.activeOrder);
    updateOrderStatusInFirebase(state.activeOrder.orderId, "delivered");

    renderRiderScreen();
    if (typeof renderTrackingScreen === "function") renderTrackingScreen();
    if (typeof updateHomeActiveOrderBanner === "function") updateHomeActiveOrderBanner();
    if (typeof playOrderAlertSound === "function") playOrderAlertSound();

    openRiderDeliveryCompleteModal();
    showToast("🎉 ไรเดอร์ส่งมอบของสดถึงมือลูกค้าเรียบร้อยแล้ว! (+฿40 ค่ารอบ)");
}

function openRiderDeliveryCompleteModal() {
    const modal = document.getElementById("rider-delivery-complete-modal");
    if (!modal) return;
    const order = state.activeOrder;
    if (order) {
        const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
        setVal("rider-complete-order-id", `ออเดอร์ ${order.orderId}`);
        setVal("rider-complete-customer-name", order.customerName || order.customerPhone || "ลูกค้าทั่วไป");

        const payDesc = order.paymentDesc || (order.paymentType === "bank_transfer" ? "โอน SCB แล้ว" : (order.paymentType === "cod" ? "เก็บเงินสด COD" : "จ่ายผ่านพร้อมเพย์แล้ว"));
        setVal("rider-complete-payment-info", `฿${order.grandTotal || order.total || 0} (${payDesc})`);

        const refundRow = document.getElementById("rider-complete-refund-row");
        const refundAmt = document.getElementById("rider-complete-refund-amount");
        if (order.refundCashTotal && order.refundCashTotal > 0) {
            if (refundRow) refundRow.classList.remove("hidden");
            if (refundAmt) refundAmt.textContent = `฿${order.refundCashTotal}`;
        } else {
            if (refundRow) refundRow.classList.add("hidden");
        }
    }
    modal.classList.remove("hidden");
}

function closeRiderDeliveryCompleteModal() {
    const modal = document.getElementById("rider-delivery-complete-modal");
    if (modal) modal.classList.add("hidden");
}

function goToCustomerTrackingFromRiderComplete() {
    closeRiderDeliveryCompleteModal();
    switchRole("customer");
    goToTrackingScreen();
    showToast("📱 สลับมาหน้าจอติดตามของลูกค้าแล้ว (แสดงสถานะจัดส่งสำเร็จ)");
}

function resetRiderOrderForNextJob() {
    showToast("🔄 ไรเดอร์พร้อมรับออเดอร์ใหม่แล้ว (Standby)");
    const completedBanner = document.getElementById("rider-completed-banner");
    if (completedBanner) completedBanner.classList.add("hidden");
}

function switchToHubFromTracking() {
    state.activeHub = {
        isLoggedIn: true,
        name: "ฝ่ายจัดเตรียมสินค้า & ระบบจัดส่ง",
        role: "hub_admin"
    };
    saveHubToStorage(state.activeHub);
    setActiveRoleView("hub");
    renderAuthHeaderButtons();
    renderHubPickingList();
    renderHubSettlement();
    showToast("🏪 สลับไปยังหน้าจอ '2. ระบบจัดส่ง' (การจัดเตรียมสินค้าโดยฮับ) เรียบร้อย");
}

function switchToRiderFromTracking() {
    state.activeRider = {
        isLoggedIn: true,
        name: "พี่สมชาย (1กข 8902)",
        phone: "081-588-7400",
        license: "1กข 8902"
    };
    saveRiderToStorage(state.activeRider);
    setActiveRoleView("rider");
    renderAuthHeaderButtons();
    renderRiderScreen();
    showToast("🛵 สลับไปยังหน้าจอ '4. ไรเดอร์' (ระบบการจัดส่งโดยไรเดอร์) เรียบร้อย");
}

// Refresh status button: โหลดข้อมูลสถานะจริงจาก Storage
function refreshOrderStatus() {
    const saved = loadSavedActiveOrder();
    if (saved) {
        state.activeOrder = saved;
        renderTrackingScreen();
        showToast("🔄 อัปเดตสถานะออเดอร์ล่าสุดเรียบร้อยแล้ว");
    } else {
        showToast("ℹ️ ไม่พบข้อมูลออเดอร์ที่กำลังดำเนินการ");
    }
}

// Rider Phone Call (โทรติดต่อเบอร์ 081-588-7400)
function callRiderPhone(event, phone = "0815887400") {
    const cleanPhone = (phone || "0815887400").toString().replace(/[^\d]/g, '') || "0815887400";
    showToast("📞 กำลังโทรติดต่อ พี่สมชาย (Hub Rider) 081-588-7400...");
    if (!event || !event.target || (event.target.tagName !== 'A' && !event.target.closest('a'))) {
        setTimeout(() => {
            window.location.href = `tel:${cleanPhone}`;
        }, 300);
    }
}

// Rider LINE Message (ส่งข้อความผ่าน LINE ฟรี 100%)
function sendRiderLineMessage(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const orderId = (state.activeOrder && state.activeOrder.orderId) ? state.activeOrder.orderId : "TH-6114";
    const riderPhone = "081-588-7400";
    const msg = `สวัสดีครับ พี่สมชาย (ไรเดอร์เบอร์ ${riderPhone}) ขอสอบถามเรื่องออเดอร์ ${orderId} (เฮียส่ง) ครับ`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;

    showToast("💬 กำลังเปิด LINE ส่งข้อความถึงไรเดอร์ (ฟรี 100%)...");

    if (isMobileDevice()) {
        // บนมือถือ: เปิดแอป LINE โดยตรงผ่าน Universal Link
        try {
            window.location.href = lineUrl;
        } catch (e) {
            window.open(lineUrl, '_blank');
        }
    } else {
        // บน PC/Desktop: แสดง Helper Modal และเปิด LINE PC อย่างปลอดภัย
        showLinePcModal(`ส่งข้อความหาไรเดอร์ (${riderPhone})`, msg);
    }
}

// Rider SMS Message (ส่งข้อความ SMS ติดต่อเบอร์ 081-588-7400)
function sendRiderSMS(event, phone = "0815887400") {
    const cleanPhone = (phone || "0815887400").toString().replace(/[^\d]/g, '') || "0815887400";
    const orderId = (state.activeOrder && state.activeOrder.orderId) ? state.activeOrder.orderId : "TH-6114";
    const msg = `สวัสดีครับ พี่สมชาย (ไรเดอร์) สอบถามเรื่องออเดอร์ ${orderId} ครับ`;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const separator = isIOS ? '&' : '?';
    const smsUrl = `sms:${cleanPhone}${separator}body=${encodeURIComponent(msg)}`;

    showToast("💬 กำลังเปิดระบบส่งข้อความ SMS ถึง 081-588-7400...");
    if (!event || !event.target || (event.target.tagName !== 'A' && !event.target.closest('a'))) {
        setTimeout(() => {
            window.location.href = smsUrl;
        }, 300);
    }
}

// Call Customer Phone (สำหรับไรเดอร์ใช้โทรหาลูกค้า)
function callCustomerPhone() {
    let custPhone = "081-588-7400";
    if (state.activeOrder && state.activeOrder.customerPhone && state.activeOrder.customerPhone !== "-") {
        custPhone = state.activeOrder.customerPhone;
    } else if (state.customer && state.customer.phone) {
        custPhone = state.customer.phone;
    }
    const cleanPhone = custPhone.replace(/[^\d]/g, '') || "0815887400";
    showToast(`📞 กำลังโทรติดต่อลูกค้า (${custPhone})...`);
    setTimeout(() => {
        window.location.href = `tel:${cleanPhone}`;
    }, 300);
}

// Rider Live Chat Modal Management
function openRiderChatModal() {
    const modal = document.getElementById("rider-chat-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const orderBadge = document.getElementById("chat-order-badge");
        if (orderBadge && state.activeOrder) orderBadge.textContent = state.activeOrder.orderId;
        const destText = document.getElementById("chat-dest-text");
        if (destText && state.deliveryLocation) destText.textContent = `📍 ปลายทาง: ${state.deliveryLocation.title}`;

        const input = document.getElementById("rider-chat-input");
        if (input) setTimeout(() => input.focus(), 200);
    }
}

function closeRiderChatModal() {
    const modal = document.getElementById("rider-chat-modal");
    if (modal) modal.classList.add("hidden");
}

function sendRiderChatMessage() {
    const input = document.getElementById("rider-chat-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    appendChatMessage(text, "user");

    // Realistic Rider Auto-response
    setTimeout(() => {
        const riderResponses = [
            "รับทราบครับคุณลูกค้า! กำลังรีบนำส่งให้อย่างดีเลยครับ 🛵💨",
            "โอเคครับผม ตอนนี้ใกล้ถึงปากซอยแล้วครับ อีกประมาณ 5 นาทีถึงครับ 👍",
            "ได้เลยครับ เดี๋ยวไปถึงแล้วจะแขวนและโทรแจ้งทันทีครับ 🙏",
            "รับทราบครับผม สินค้าแพ็คใส่ถุงเก็บความเย็นอย่างดีครับ ขอบคุณครับ!"
        ];
        const randomReply = riderResponses[Math.floor(Math.random() * riderResponses.length)];
        appendChatMessage(randomReply, "rider");
    }, 700);
}

function sendQuickRiderMessage(msgText) {
    appendChatMessage(msgText, "user");
    setTimeout(() => {
        appendChatMessage("รับทราบข้อความเรียบร้อยครับผม! กำลังรีบขับไปส่งให้นะครับ 🛵💨", "rider");
    }, 600);
}

function appendChatMessage(message, sender = "user") {
    const container = document.getElementById("rider-chat-messages");
    if (!container) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const msgDiv = document.createElement("div");
    if (sender === "user") {
        msgDiv.className = "flex items-end justify-end gap-1.5 ml-auto max-w-[85%] animate-fade-in";
        msgDiv.innerHTML = `
            <div class="bg-[#004D40] text-white p-2.5 rounded-2xl rounded-tr-sm shadow-2xs">
                <div>${message}</div>
                <div class="text-[9px] text-emerald-200 text-right mt-1">${timeStr} น. • ส่งแล้ว</div>
            </div>
        `;
    } else {
        msgDiv.className = "flex items-start gap-2 max-w-[85%] animate-fade-in";
        msgDiv.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-[#004D40] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">🛵</div>
            <div class="bg-white p-2.5 rounded-2xl rounded-tl-sm shadow-2xs border border-slate-200 text-slate-800">
                <div>${message}</div>
                <div class="text-[9px] text-slate-400 text-right mt-1">${timeStr} น.</div>
            </div>
        `;
    }

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// ==========================================
// RATING & REVIEW HANDLERS (ให้คะแนน & รีวิวความสด)
// ==========================================
let currentRatingScore = 5;
let currentRiderTip = 20;

let stallRatings = {
    veg: 5,
    coconut: 5,
    seafood: 5
};

const stallBadgeLabels = {
    veg: {
        5: "สดกรอบ",
        4: "สดดี",
        3: "ปานกลาง",
        2: "พอใช้",
        1: "ต้องปรับปรุง"
    },
    coconut: {
        5: "ข้นมันหอม",
        4: "คั้นสดดี",
        3: "ปานกลาง",
        2: "พอใช้",
        1: "ต้องปรับปรุง"
    },
    seafood: {
        5: "สดตาใส",
        4: "สดเด้ง",
        3: "ปานกลาง",
        2: "พอใช้",
        1: "ต้องปรับปรุง"
    }
};

function openRatingModal() {
    const modal = document.getElementById("rating-review-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const orderLabel = document.getElementById("rating-order-id-label");
        if (orderLabel && state.activeOrder) orderLabel.textContent = `ออเดอร์ ${state.activeOrder.orderId}`;
    }
}

function closeRatingModal() {
    const modal = document.getElementById("rating-review-modal");
    if (modal) modal.classList.add("hidden");
}

function setRatingStars(score) {
    currentRatingScore = score;
    const container = document.getElementById("rating-stars-container");
    if (!container) return;
    const stars = container.querySelectorAll("span");
    stars.forEach((s, idx) => {
        if (idx < score) {
            s.className = "material-symbols-outlined fill-1 text-amber-400 hover:scale-110 transition-transform";
        } else {
            s.className = "material-symbols-outlined text-slate-300 hover:scale-110 transition-transform";
        }
    });

    const labels = [
        "",
        "ต้องปรับปรุง (1/5)",
        "พอใช้ได้ (2/5)",
        "ปานกลาง (3/5)",
        "ดีมาก ของสดถูกใจ (4/5)",
        "ยอดเยี่ยมมาก! ของสดส่งไวทันใจ (5/5)"
    ];
    const lbl = document.getElementById("rating-stars-label");
    if (lbl) lbl.textContent = labels[score];
}

function setStallRating(stallKey, score) {
    stallRatings[stallKey] = score;
    const container = document.getElementById(`stall-stars-${stallKey}`);
    if (container) {
        const stars = container.querySelectorAll("span");
        stars.forEach((s, idx) => {
            if (idx < score) {
                s.className = "material-symbols-outlined fill-1 text-base hover:scale-125 transition-transform text-amber-400";
            } else {
                s.className = "material-symbols-outlined text-base hover:scale-125 transition-transform text-slate-300";
            }
        });
    }

    const badge = document.getElementById(`stall-badge-${stallKey}`);
    if (badge && stallBadgeLabels[stallKey]) {
        badge.textContent = stallBadgeLabels[stallKey][score] || `${score} ดาว`;
        if (score >= 4) {
            badge.className = "text-emerald-800 font-bold text-[10px] bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300";
        } else if (score === 3) {
            badge.className = "text-amber-800 font-bold text-[10px] bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300";
        } else {
            badge.className = "text-rose-800 font-bold text-[10px] bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-300";
        }
    }
}

function selectRiderTip(tip) {
    currentRiderTip = tip;
    const buttons = document.querySelectorAll("#rider-tip-selector .tip-btn");
    buttons.forEach(btn => {
        btn.className = "tip-btn p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-center text-xs active:scale-95 transition-all";
    });
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.className = "tip-btn p-1.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold text-center text-xs active:scale-95 transition-all";
    }
}

function submitOrderRating() {
    closeRatingModal();

    // Add 20 loyalty points
    state.customerPoints = (state.customerPoints || 140) + 20;

    // Update active banner and displays
    const bannerPts = document.getElementById("loyalty-banner-points");
    if (bannerPts) bannerPts.textContent = `${state.customerPoints} แต้ม`;

    // Open Celebration & Reward Modal
    openReviewRewardModal();
    showToast(`🎉 รีวิวสำเร็จ! ได้รับ +20 แต้มสะสม และคูปอง FRESH20 แล้ว`);
}

function openReviewRewardModal() {
    const modal = document.getElementById("review-reward-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const ptsEl = document.getElementById("user-total-points-display");
        if (ptsEl) ptsEl.textContent = `${state.customerPoints || 160} แต้ม`;
    }
}

function closeReviewRewardModal() {
    const modal = document.getElementById("review-reward-modal");
    if (modal) modal.classList.add("hidden");
}

function openRewardsModal() {
    const modal = document.getElementById("rewards-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const ptsEl = document.getElementById("rewards-modal-points");
        if (ptsEl) ptsEl.textContent = `${state.customerPoints || 160} แต้ม`;
    }
}

function closeRewardsModal() {
    const modal = document.getElementById("rewards-modal");
    if (modal) modal.classList.add("hidden");
}

function openCustomerWalletModal() {
    const modal = document.getElementById("customer-wallet-modal");
    if (!modal) return;
    modal.classList.remove("hidden");

    const pts = state.customerPoints !== undefined ? state.customerPoints : 60;
    const ptsDisplay = document.getElementById("wallet-points-display");
    if (ptsDisplay) ptsDisplay.textContent = `${pts} แต้ม`;

    const bar = document.getElementById("wallet-progress-bar");
    if (bar) {
        const pct = Math.min(100, Math.round((pts / 100) * 100));
        bar.style.width = `${pct}%`;
    }

    const idEl = document.getElementById("wallet-customer-id");
    if (idEl) {
        const id = state.customer && state.customer.isLoggedIn ? state.customer.identifier : "ผู้ใช้งานทั่วไป";
        idEl.textContent = state.customer && state.customer.isLoggedIn ? `สมาชิก (${id})` : id;
    }
}

function closeCustomerWalletModal() {
    const modal = document.getElementById("customer-wallet-modal");
    if (modal) modal.classList.add("hidden");
}

function reorderAndGoCheckout() {
    closeCustomerWalletModal();
    // Re-populate cart with 4 fresh market items
    state.cart = [
        { stallId: "stall_b01", stallName: "ผักสวนครัวลุงสนั่น", stallNumber: "แผง B01", productId: "veg_morning_glory", name: "ผักบุ้งจีนสดกรอบ (ปลอดสาร)", price: 20, unit: "กำ", qty: 1 },
        { stallId: "stall_c01", stallName: "กะทิสดชาวเกาะ ลุงสมหมาย", stallNumber: "แผง C01", productId: "coconut_milk", name: "กะทิสดคั้นสดแท้ 100%", price: 35, unit: "กล่อง", qty: 1 },
        { stallId: "stall_e11", stallName: "อาหารทะเลสดลุงหวัง", stallNumber: "แผง E11", productId: "seafood_shrimp", name: "กุ้งขาวสดไซส์ใหญ่", price: 110, unit: "500 กรัม", qty: 1 },
        { stallId: "stall_b01", stallName: "ผักสวนครัวลุงสนั่น", stallNumber: "แผง B01", productId: "veg_coriander", name: "ผักชีสดคัดพิเศษ", price: 15, unit: "ขีด", qty: 1 }
    ];
    // Auto-apply FRESH20 discount coupon
    state.activeCoupon = { code: "FRESH20", discount: 20, desc: "ส่วนลด ฿20 สั่งของสดรอบถัดไป" };

    updateCartUI();
    goToCheckoutScreen();
    showToast("🔁 หยิบ 4 รายการเดิมลงตะกร้า & ใช้คูปอง FRESH20 (-฿20) ให้เรียบร้อยแล้ว!");
}

function redeemRewardItem(rewardName, cost) {
    const currentPts = state.customerPoints !== undefined ? state.customerPoints : 60;
    if (currentPts < cost) {
        showToast(`⚠️ แต้มสะสมของคุณไม่เพียงพอ (มี ${currentPts} แต้ม • ต้องการ ${cost} แต้ม)`);
        return;
    }
    state.customerPoints = currentPts - cost;
    const ptsEl = document.getElementById("rewards-modal-points");
    if (ptsEl) ptsEl.textContent = `${state.customerPoints} แต้ม`;
    const userPts = document.getElementById("user-total-points-display");
    if (userPts) userPts.textContent = `${state.customerPoints} แต้ม`;
    const walletPts = document.getElementById("wallet-points-display");
    if (walletPts) walletPts.textContent = `${state.customerPoints} แต้ม`;
    const bannerPts = document.getElementById("loyalty-banner-points");
    if (bannerPts) bannerPts.textContent = `${state.customerPoints} แต้ม`;

    const bar = document.getElementById("wallet-progress-bar");
    if (bar) {
        const pct = Math.min(100, Math.round((state.customerPoints / 100) * 100));
        bar.style.width = `${pct}%`;
    }

    showToast(`🎁 แลกรับ "${rewardName}" สำเร็จ! คูปองถูกบันทึกในกระเป๋าของคุณแล้ว 🎉`);
}

function copyCouponCode(code) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).catch(() => { });
    }
    showToast(`📋 คัดลอกโค้ดส่วนลด "${code}" เรียบร้อยแล้ว!`);
}

function selectCheckoutCoupon(code, discount) {
    if (code === "none") {
        state.activeCoupon = null;
        showToast("ยกเลิกการใช้คูปองส่วนลด");
    } else {
        state.activeCoupon = { code, discount, desc: `ส่วนลด ฿${discount}` };
        showToast(`🎟️ ใช้คูปองส่วนลด "${code}" (ลด ฿${discount}) เรียบร้อยแล้ว!`);
    }
    renderCheckoutPage();
}

function applyCouponAndGoCheckout(code, discount) {
    state.activeCoupon = { code, discount, desc: `ส่วนลด ฿${discount}` };
    closeCustomerWalletModal();
    goToCheckoutScreen();
    showToast(`🎟️ เลือกใช้คูปอง "${code}" (ลด ฿${discount}) ในออเดอร์นี้แล้ว!`);
}

function applyManualCouponCode() {
    const input = document.getElementById("manual-coupon-input");
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) {
        showToast("⚠️ กรุณากรอกโค้ดส่วนลดก่อนครับ");
        return;
    }

    if (code === "FRESH20") {
        selectCheckoutCoupon("FRESH20", 20);
    } else if (code === "FREESHIP") {
        selectCheckoutCoupon("FREESHIP", 25);
    } else if (code === "HEASONG50") {
        selectCheckoutCoupon("HEASONG50", 50);
    } else {
        showToast(`❌ โค้ด "${code}" ไม่ถูกต้อง หรือหมดอายุแล้ว`);
        return;
    }
    input.value = "";
}

// ==========================================
// DIGITAL E-RECEIPT HANDLERS (ใบเสร็จอิเล็กทรอนิกส์)
// ==========================================
function openReceiptModal() {
    const modal = document.getElementById("receipt-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const order = state.activeOrder;
        if (order) {
            const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
            setVal("receipt-order-id", order.orderId);
            setVal("receipt-customer-name", order.customerName || "ลูกค้า");

            const payText = order.paymentType === "bank_transfer" ? "โอนผ่านธนาคารไทยพาณิชย์ (SCB)" : (order.paymentType === "cod" ? "เก็บเงินสดปลายทาง (COD)" : "PromptPay (สแกนจ่ายสำเร็จ)");
            setVal("receipt-payment-method", payText);

            // Render Dynamic Receipt Items from Active Order
            const itemsContainer = document.getElementById("receipt-items-list");
            if (itemsContainer && order.stalls && order.stalls.length > 0) {
                let itemsHtml = "";
                let subtotal = 0;
                order.stalls.forEach(stall => {
                    (stall.items || []).forEach(item => {
                        const price = item.actualPrice !== undefined ? item.actualPrice : item.price;
                        subtotal += price;
                        const isOOS = item.outOfStock || false;
                        itemsHtml += `
                            <div class="flex justify-between py-1.5 ${isOOS ? 'bg-rose-50/80 px-2 rounded-lg border border-rose-200' : ''}">
                                <div>
                                    <div class="font-bold ${isOOS ? 'text-rose-800 line-through' : 'text-slate-800'} text-xs">${item.name}</div>
                                    <div class="text-[10px] ${isOOS ? 'text-rose-600 font-bold' : 'text-slate-400'}">
                                        ${stall.name} • ${isOOS ? '⚠️ สินค้าหมด (คืนเงินสดใส่ซอง)' : `x${item.qty || 1}`}
                                    </div>
                                </div>
                                <span class="font-bold ${isOOS ? 'text-rose-600' : 'text-slate-800'} text-xs">
                                    ${isOOS ? `คืน ฿${price}` : `฿${price}`}
                                </span>
                            </div>
                        `;
                    });
                });
                itemsContainer.innerHTML = itemsHtml;
                setVal("receipt-items-subtotal", `฿${subtotal}`);
            }

            const grandTotal = order.grandTotal || order.total || 0;
            const refundCash = order.refundCashTotal || 0;
            const finalPaid = Math.max(0, grandTotal - refundCash);

            setVal("receipt-grand-total", `฿${grandTotal}`);

            // Toggle Refund Envelope Breakdown in Receipt (ขั้นตอนที่ 3)
            const refundEnvelopeRow = document.getElementById("receipt-refund-envelope-row");
            if (refundEnvelopeRow) {
                if (refundCash > 0) {
                    refundEnvelopeRow.classList.remove("hidden");
                    setVal("receipt-refund-deduct-amount", `-฿${refundCash}`);
                    setVal("receipt-final-paid-amount", `฿${finalPaid}`);
                    setVal("receipt-refund-envelope-amount", `฿${refundCash}`);
                } else {
                    refundEnvelopeRow.classList.add("hidden");
                }
            }
        }
    }
}

function closeReceiptModal() {
    const modal = document.getElementById("receipt-modal");
    if (modal) modal.classList.add("hidden");
}

function downloadReceipt() {
    showToast("📥 กำลังดาวน์โหลดใบเสร็จรับเงิน e-Receipt...");
    setTimeout(() => {
        showToast("✓ บันทึกรูปใบเสร็จลงในอุปกรณ์ของคุณแล้ว!");
    }, 600);
}

// ==========================================
// 1-CLICK REORDER (สั่งซ้ำรายการเดิม)
// ==========================================
function reorderCurrentItems() {
    // ดึงรายการของสดจริงจากออเดอร์ล่าสุดของลูกค้า (เฉพาะรายการที่มีของพร้อมส่ง)
    if (state.activeOrder && state.activeOrder.stalls && state.activeOrder.stalls.length > 0) {
        const reorderCart = [];
        state.activeOrder.stalls.forEach(stall => {
            (stall.items || []).forEach(item => {
                if (!item.outOfStock) {
                    reorderCart.push({
                        stallId: stall.stallId || "skai_01",
                        stallName: stall.name || "แผงค้าในตลาด",
                        productId: item.productId || item.id || 1,
                        name: item.name,
                        price: item.price || 0,
                        qty: item.qty || 1,
                        unit: item.unit || "ชิ้น"
                    });
                }
            });
        });
        if (reorderCart.length > 0) {
            state.cart = reorderCart;
            saveCartToStorage(state.cart);
            updateCartUI();
            showToast(`🔁 โหลดรายการของสดเดิม ${state.cart.length} รายการลงตะกร้าเรียบร้อยแล้ว!`);
            goToCheckoutScreen();
            return;
        }
    }

    // กรณีไม่มีรายการเดิม ให้โหลดรายการแนะนำพื้นฐาน
    state.cart = [
        { stallId: "veggie_01", stallName: "ผักสวนครัวลุงสนั่น (B01)", productId: 1, name: "มะเขือเปราะกรอบหวาน", price: 15, qty: 1, unit: "กก." },
        { stallId: "veggie_01", stallName: "ผักสวนครัวลุงสนั่น (B01)", productId: 2, name: "ข่าอ่อน + ตะไคร้สด + ใบมะกรูด", price: 15, qty: 1, unit: "ชุด" },
        { stallId: "curry_01", stallName: "กะทิสดชาวเกาะ ลุงสมหมาย (C01)", productId: 3, name: "หัวกะทิสดคั้นแท้ 100%", price: 40, qty: 1, unit: "ถุง" },
        { stallId: "seafood_01", stallName: "อาหารทะเลสดลุงหวัง (E11)", productId: 4, name: "ปลาหมึกกล้วยสดไซส์กลาง", price: 110, qty: 1, unit: "กก." }
    ];
    saveCartToStorage(state.cart);
    updateCartUI();
    showToast("🔁 โหลดรายการของสดเดิม 4 รายการลงตะกร้าเรียบร้อยแล้ว!");
    goToCheckoutScreen();
}

// ==========================================
// MERCHANT EXPRESS DISPATCH REQUEST
// ==========================================
function calculateMerchantFee() {
    const fee = document.getElementById("merchant-destination-select").value;
    document.getElementById("merchant-calc-fee").textContent = `฿${fee}`;
}

function toggleMerchantCodInput(checkbox) {
    const box = document.getElementById("merchant-cod-box");
    if (checkbox.checked) {
        box.classList.remove("hidden");
    } else {
        box.classList.add("hidden");
    }
}

function submitMerchantCall() {
    const stallSelect = document.getElementById("merchant-stall-select");
    const stallText = stallSelect.options[stallSelect.selectedIndex].text;

    showToast(`เรียกไรเดอร์มารับของที่ "${stallText}" เรียบร้อยแล้ว!`);

    const queueBadge = document.getElementById("hub-queue-count");
    if (queueBadge) {
        queueBadge.textContent = parseInt(queueBadge.textContent || "2") + 1;
    }
    const hubBadge = document.getElementById("hub-badge-count");
    if (hubBadge) {
        hubBadge.classList.remove("hidden");
        hubBadge.textContent = "NEW";
    }

    setTimeout(() => {
        switchRole("hub");
    }, 1200);
}



// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
let toastTimeout;
function showToast(text) {
    const toast = document.getElementById("toast-message");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.textContent = text;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

// ==========================================
// MERCHANT PARTNER ONBOARDING & SETUP PORTAL
// ==========================================
let activeMerchantStallId = null;

const MERCHANT_PRESET_IMAGES = {
    stall: {
        chicken: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80",
        veggie: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&auto=format&fit=crop&q=80",
        pork: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=700&auto=format&fit=crop&q=80",
        curry: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&auto=format&fit=crop&q=80",
        seafood: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=700&auto=format&fit=crop&q=80"
    },
    owner: {
        man1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        woman1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        man2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        woman2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
    }
};

// ==========================================
// AUTHENTICATION & LOGIN/LOGOUT (CUSTOMER & MERCHANT)
// ==========================================
let selectedCustomerLoginMethod = null; // 'mobile' | 'line_phone' | 'line_id'

function openCustomerLoginModal() {
    selectedCustomerLoginMethod = null;

    // Reset method buttons styling
    document.querySelectorAll(".customer-method-btn").forEach(btn => {
        btn.classList.remove("ring-2", "ring-emerald-500", "bg-emerald-50", "border-emerald-500", "text-emerald-900");
        btn.classList.add("border-slate-200", "bg-slate-50", "text-slate-700");
    });

    // Reset visibility: show placeholder, hide input box
    const placeholder = document.getElementById("customer-login-placeholder");
    const inputSection = document.getElementById("customer-login-input-section");
    const input = document.getElementById("customer-login-input");

    if (placeholder) placeholder.classList.remove("hidden");
    if (inputSection) inputSection.classList.add("hidden");
    if (input) input.value = "";

    document.getElementById("customer-login-modal").classList.remove("hidden");
}

function selectCustomerLoginMethod(method) {
    selectedCustomerLoginMethod = method;

    // Highlight selected button
    document.querySelectorAll(".customer-method-btn").forEach(btn => {
        btn.classList.remove("ring-2", "ring-emerald-500", "bg-emerald-50", "border-emerald-500", "text-emerald-900");
        btn.classList.add("border-slate-200", "bg-slate-50", "text-slate-700");
    });

    const activeBtn = document.getElementById(`btn-method-${method}`);
    if (activeBtn) {
        activeBtn.classList.remove("border-slate-200", "bg-slate-50", "text-slate-700");
        activeBtn.classList.add("ring-2", "ring-emerald-500", "bg-emerald-50", "border-emerald-500", "text-emerald-900");
    }

    // Hide placeholder, Show input box
    const placeholder = document.getElementById("customer-login-placeholder");
    const inputSection = document.getElementById("customer-login-input-section");
    const label = document.getElementById("customer-input-label");
    const icon = document.getElementById("customer-input-icon");
    const input = document.getElementById("customer-login-input");

    if (placeholder) placeholder.classList.add("hidden");
    if (inputSection) inputSection.classList.remove("hidden");

    // Configure input attributes per selected method
    if (method === "mobile") {
        if (label) label.innerHTML = `<span>2. กรอกเบอร์โทรศัพท์มือถือของคุณ:</span> <span class="text-[10px] text-emerald-700 font-normal">10 หลัก</span>`;
        if (icon) icon.textContent = "smartphone";
        if (input) {
            input.type = "tel";
            input.maxLength = 12;
            input.placeholder = "เช่น 081-234-5678 หรือ 0812345678";
            input.focus();
        }
    } else if (method === "line_phone") {
        if (label) label.innerHTML = `<span>2. กรอกเบอร์โทรที่ผูกกับ LINE:</span> <span class="text-[10px] text-green-700 font-normal">เบอร์ที่ใช้สมัคร LINE</span>`;
        if (icon) icon.textContent = "call";
        if (input) {
            input.type = "tel";
            input.maxLength = 12;
            input.placeholder = "เช่น 089-123-4567 หรือ 0891234567";
            input.focus();
        }
    } else if (method === "line_id") {
        if (label) label.innerHTML = `<span>2. กรอก LINE ID (ไอดีไลน์):</span> <span class="text-[10px] text-teal-700 font-normal">เช่น @shop หรือ user_id</span>`;
        if (icon) icon.textContent = "chat";
        if (input) {
            input.type = "text";
            input.maxLength = 30;
            input.placeholder = "เช่น @heasong หรือ somchai_99";
            input.focus();
        }
    }
}

function closeCustomerLoginModal() {
    document.getElementById("customer-login-modal").classList.add("hidden");
}

function handleCustomerLoginSubmit() {
    const input = document.getElementById("customer-login-input");
    const rawVal = input ? input.value.trim() : "";

    if (!selectedCustomerLoginMethod) {
        alert("กรุณากดเลือกวิธีเข้าสู่ระบบ 1 ใน 3 ปุ่มด้านบนก่อนครับ");
        return;
    }

    if (!rawVal || rawVal.length < 3) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนก่อนเข้าสู่ระบบครับ");
        return;
    }

    // Determine type: phone vs LINE ID
    const digitsOnly = rawVal.replace(/\D/g, '');
    let displayVal = rawVal;
    let type = selectedCustomerLoginMethod === "line_id" ? "line" : "phone";

    if (type === "phone") {
        if (digitsOnly.length < 9) {
            alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)");
            return;
        }
        if (digitsOnly.length === 10) {
            displayVal = `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
        }
    }

    state.customer = {
        isLoggedIn: true,
        identifier: displayVal,
        type: type,
        method: selectedCustomerLoginMethod
    };
    saveCustomerToStorage(state.customer);

    closeCustomerLoginModal();
    renderAuthHeaderButtons();
    updateDeliveryLocationUI();
    updateCustomerLoyaltyBanner();
    renderCatalog();

    // ✅ ตรวจสอบและดึงออเดอร์ที่กำลังจัดส่งของลูกค้ารายนี้กลับมาแสดง (ถ้ามี)
    if (isFirebaseReady()) {
        db.ref("orders").limitToLast(15).once("value").then(snap => {
            const data = snap.val();
            if (data) {
                const myOrders = Object.values(data).filter(o => 
                    o && o.orderId && o.status !== "delivered" && 
                    (o.customerName === displayVal || o.customerPhone === displayVal || toFirebaseKey(o.customerName) === toFirebaseKey(displayVal))
                );
                if (myOrders.length > 0) {
                    myOrders.sort((a,b) => (b.savedAt||0) - (a.savedAt||0));
                    state.activeOrder = myOrders[0];
                    try { localStorage.setItem("talathub_active_order", JSON.stringify(state.activeOrder)); } catch(e) {}
                    updateHomeActiveOrderBanner();
                    renderTrackingScreen();
                } else {
                    updateHomeActiveOrderBanner();
                }
            }
        }).catch(() => updateHomeActiveOrderBanner());
    } else {
        updateHomeActiveOrderBanner();
    }

    // Auto-fulfill pending add to cart if customer clicked before logging in
    if (pendingAddToCart) {
        const p = pendingAddToCart;
        pendingAddToCart = null;
        if (p.fromModal) {
            addToCartFromModal(p.stallId, p.productId, p.name, p.price, p.unit);
        } else {
            addToCart(p.stallId, p.productId);
        }
        showToast(`🎉 เข้าสู่ระบบสำเร็จและเพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว!`);
    } else {
        showToast(`👋 ยินดีต้อนรับคุณลูกค้า (${displayVal}) เข้าสู่ระบบสำเร็จ!`);
    }
}

function logoutCustomer() {
    state.customer = { isLoggedIn: false, identifier: "", type: "phone" };
    saveCustomerToStorage(state.customer);
    state.deliveryLocation = null;
    saveLocationToStorage(null);

    // ✅ เคลียร์ activeOrder ของลูกค้าออกจาก state และ localStorage เพื่อไม่ให้ค้างแสดงสถานะการจัดส่ง
    state.activeOrder = null;
    try { localStorage.removeItem("talathub_active_order"); } catch (e) {}

    // ✅ เคลียร์ตะกร้าสินค้า
    state.cart = [];
    try { localStorage.removeItem("talathub_cart"); } catch (e) {}

    // ✅ อัปเดต UI ทั้งหมดให้กลับสู่สถานะผู้มาเยือน (Guest)
    updateHomeActiveOrderBanner();
    updateCartUI();
    renderAuthHeaderButtons();
    updateDeliveryLocationUI();
    updateCustomerLoyaltyBanner();
    renderCatalog();
    renderTrackingScreen();

    // ✅ หากลูกค้าเปิดค้างอยู่ที่หน้า Tracking หรือ Checkout ให้สลับกลับมาหน้าตลาดสดทันที
    if (state.currentScreen === "tracking" || state.currentScreen === "checkout") {
        goToMarketScreen();
    }

    showToast("🚪 ออกจากระบบลูกค้าเรียบร้อยแล้ว");
}

function logoutMerchant() {
    state.activeMerchant = null;
    activeMerchantStallId = null;
    saveMerchantToStorage(null);
    renderAuthHeaderButtons();
    setActiveRoleView("customer");
    showToast("🚪 ออกจากระบบร้านค้าเรียบร้อยแล้ว");
}

// ==========================================
// ROLE-BASED ACCESS CONTROL & ROLE SWITCHING
// ==========================================
function switchRole(targetRole) {
    if (targetRole === "customer") {
        setActiveRoleView("customer");
        return;
    }

    if (targetRole === "hub") {
        if (!state.activeHub || !state.activeHub.isLoggedIn) {
            openHubLoginModal();
            return;
        }
        setActiveRoleView("hub");
        return;
    }

    if (targetRole === "merchant") {
        if (!state.activeMerchant || !state.activeMerchant.isLoggedIn) {
            openMerchantLoginModal();
            return;
        }
        setActiveRoleView("merchant");
        return;
    }

    if (targetRole === "rider") {
        if (!state.activeRider || !state.activeRider.isLoggedIn) {
            openRiderLoginModal();
            return;
        }
        setActiveRoleView("rider");
        return;
    }

    if (targetRole === "admin") {
        if (!state.activeAdmin || !state.activeAdmin.isLoggedIn) {
            openAdminLoginModal();
            return;
        }
        setActiveRoleView("admin");
        return;
    }
}

function setActiveRoleView(role) {
    state.currentRole = role;

    // Toggle main container between mobile phone frame and full PC widescreen for all roles!
    const mainContainer = document.getElementById("main-app-container");
    const footerContainer = document.getElementById("app-bottom-footer");
    if (mainContainer) {
        if (state.screenMode === "mobile") {
            mainContainer.className = "w-full max-w-full md:max-w-[430px] mx-auto bg-white min-h-[90vh] shadow-2xl relative my-0 md:my-4 md:rounded-3xl overflow-hidden flex flex-col border border-slate-200/80 transition-all duration-300 min-w-0 frame-mobile";
            if (footerContainer) {
                footerContainer.className = "w-full max-w-full md:max-w-[430px] mx-auto mt-4 mb-8 px-4 flex flex-col items-center justify-center gap-2.5 text-xs text-slate-500 transition-all";
            }
        } else {
            mainContainer.className = "w-full max-w-full md:max-w-7xl mx-auto bg-white min-h-[90vh] shadow-2xl relative my-0 md:my-4 md:rounded-3xl overflow-hidden flex flex-col border border-slate-200/80 transition-all duration-300 min-w-0 frame-pc";
            if (footerContainer) {
                footerContainer.className = "w-full max-w-7xl mx-auto mt-6 mb-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-200/80 pt-6 transition-all";
            }
        }
    }

    const containers = ["customer", "hub", "merchant", "rider", "admin"];
    containers.forEach(r => {
        const el = document.getElementById(`${r}-view-container`);
        const btn = document.getElementById(`role-btn-${r}`);
        if (el) {
            if (r === role) el.classList.remove("hidden");
            else el.classList.add("hidden");
        }
        if (btn) {
            if (r === role) {
                if (r === "admin") {
                    btn.className = "role-btn active py-1.5 px-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md flex items-center justify-center gap-1 md:gap-1.5 text-[11px] sm:text-xs md:text-sm transition-all duration-200 text-center";
                } else {
                    btn.className = "role-btn active py-1.5 px-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold bg-emerald-600 text-white shadow-md flex items-center justify-center gap-1 md:gap-1.5 text-[11px] sm:text-xs md:text-sm transition-all duration-200 text-center";
                }
            } else {
                if (r === "admin") {
                    btn.className = "role-btn py-1.5 px-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium text-purple-300 hover:text-white hover:bg-purple-900/40 flex items-center justify-center gap-1 md:gap-1.5 text-[11px] sm:text-xs md:text-sm transition-all duration-200 text-center";
                } else {
                    btn.className = "role-btn py-1.5 px-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 flex items-center justify-center gap-1 md:gap-1.5 text-[11px] sm:text-xs md:text-sm transition-all duration-200 text-center";
                }
            }
        }
    });

    // Sync admin button in the role selector bar
    const adminBtnInBar = document.getElementById("role-btn-admin");
    if (adminBtnInBar) {
        if (state.activeAdmin && state.activeAdmin.isLoggedIn) {
            adminBtnInBar.classList.remove("hidden");
        } else {
            adminBtnInBar.classList.add("hidden");
        }
    }

    if (role === "hub") {
        renderHubPickingList();
        renderHubSettlement();
    } else if (role === "rider") {
        renderRiderScreen();
    } else if (role === "admin") {
        renderAdminView();
    }
    renderScreenModeButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// PC / MOBILE SCREEN MODE CONTROLLER
// ==========================================
function toggleScreenMode() {
    state.screenMode = (state.screenMode === "mobile") ? "pc" : "mobile";
    try { localStorage.setItem("hsong_screen_mode", state.screenMode); } catch (e) {}
    setActiveRoleView(state.currentRole || "customer");
    renderScreenModeButton();
    if (typeof renderCatalog === "function") {
        renderCatalog();
    }
    showToast(state.screenMode === "mobile" ? "📱 สลับเป็นขนาดจำลองจอมือถือ (Mobile Frame)" : "💻 ขยายเต็มจอคอมพิวเตอร์ (PC Widescreen) สำหรับทุกหน้าจอเรียบร้อย!");
}

function renderScreenModeButton() {
    const btn = document.getElementById("btn-screen-mode-toggle");
    if (!btn) return;
    const isMobile = state.screenMode === "mobile";
    btn.innerHTML = isMobile ? `
        <span class="material-symbols-outlined text-sm md:text-base text-sky-400">desktop_windows</span>
        <span class="text-sky-200">ขยายเต็มจอ PC</span>
    ` : `
        <span class="material-symbols-outlined text-sm md:text-base text-sky-400">smartphone</span>
        <span class="text-sky-200">ย่อจอมือถือ</span>
    `;
    btn.title = isMobile ? "คลิกเพื่อขยายเต็มจอคอมพิวเตอร์ (PC Widescreen)" : "คลิกเพื่อจำลองขนาดจอมือถือ (Mobile Frame)";
}

// ==========================================
// ADMIN CONSOLE & BACKOFFICE CONTROLLERS
// ==========================================
let _activeAdminTab = "report";
let _adminStallSearchQuery = "";
let _adminStallZoneFilter = "all";

function handleAdminButtonClick() {
    if (state.activeAdmin && state.activeAdmin.isLoggedIn) {
        switchRole("admin");
    } else {
        openAdminLoginModal();
    }
}

function openAdminLoginModal() {
    const modal = document.getElementById("admin-login-modal");
    if (modal) {
        modal.classList.remove("hidden");
        const pinInput = document.getElementById("admin-pin-input");
        if (pinInput) {
            pinInput.value = "";
            setTimeout(() => pinInput.focus(), 150);
        }
    }
}

function closeAdminLoginModal() {
    const modal = document.getElementById("admin-login-modal");
    if (modal) modal.classList.add("hidden");
}

function handleAdminLoginSubmit() {
    const pin = document.getElementById("admin-pin-input")?.value.trim();
    if (!pin || (pin !== "8888" && pin !== "1234" && pin.length < 4)) {
        showToast("⚠️ รหัส PIN ไม่ถูกต้อง (ค่าเริ่มต้น: 8888)");
        return;
    }
    state.activeAdmin = {
        isLoggedIn: true,
        name: "เฮียส่ง",
        role: "Super Admin",
        loggedInAt: Date.now()
    };
    saveAdminToStorage(state.activeAdmin);
    closeAdminLoginModal();
    renderAuthHeaderButtons();
    switchRole("admin");
    showToast("🎉 เข้าสู่ระบบผู้ดูแลระบบ (Admin Console) สำเร็จ!");
}

function handleAdminQuickLogin() {
    state.activeAdmin = {
        isLoggedIn: true,
        name: "เฮียส่ง",
        role: "Super Admin",
        loggedInAt: Date.now()
    };
    saveAdminToStorage(state.activeAdmin);
    closeAdminLoginModal();
    renderAuthHeaderButtons();
    switchRole("admin");
    showToast("⚡ เข้าสู่ระบบแอดมิน (โหมดทดสอบ เฮียส่ง) สำเร็จ!");
}

function logoutAdmin() {
    state.activeAdmin = null;
    saveAdminToStorage(null);
    renderAuthHeaderButtons();
    switchRole("customer");
    showToast("🚪 ออกจากระบบแอดมินเรียบร้อยแล้ว");
}

function switchAdminTab(tabName) {
    _activeAdminTab = tabName;
    const tabs = ["report", "analytics", "stalls", "riders", "settings"];
    tabs.forEach(t => {
        const btn = document.getElementById(`admin-tab-${t}`);
        const content = document.getElementById(`admin-content-${t}`);
        const isActive = t === tabName;
        if (btn) {
            btn.className = isActive
                ? "admin-tab-btn font-extrabold text-purple-800 border-b-2 border-purple-700 pb-1.5 whitespace-nowrap px-3 flex items-center gap-1.5 transition-all"
                : "admin-tab-btn font-medium text-slate-500 pb-1.5 hover:text-slate-900 whitespace-nowrap px-3 flex items-center gap-1.5 transition-all";
        }
        if (content) {
            if (isActive) content.classList.remove("hidden");
            else content.classList.add("hidden");
        }
    });

    if (tabName === "report") {
        renderAdminReport();
    } else if (tabName === "analytics") {
        renderAdminAnalytics();
    } else if (tabName === "stalls") {
        renderAdminStalls();
    } else if (tabName === "riders") {
        renderAdminRiders();
        setTimeout(() => initAdminRiderRadarMap(), 150);
    } else if (tabName === "settings") {
        renderAdminSettings();
    }
}

function renderAdminView() {
    const disp = document.getElementById("admin-display-name");
    if (disp && state.activeAdmin) {
        disp.textContent = `${state.activeAdmin.name} (${state.activeAdmin.role})`;
    }
    switchAdminTab(_activeAdminTab || "report");
}

function renderAdminReport() {
    renderHubDailyReport(_activeReportDateKey);
}

// ── Tab 2: Analytics & Trends Overview
function renderAdminAnalytics() {
    const container = document.getElementById("admin-content-analytics");
    if (!container) return;

    const allOrders = _collectAllOrders();
    let totalGMV = 0;
    let totalDelivered = 0;
    let totalDeliveryFees = 0;
    const paymentCounts = { promptpay: 0, bank_transfer: 0, cod: 0 };

    allOrders.forEach(o => {
        const amt = Number(o.grandTotal || o.total || 0);
        totalGMV += amt;
        totalDeliveryFees += Number(o.deliveryFee || 20);
        if (o.status === "delivered") totalDelivered++;

        const pType = (o.paymentType || "promptpay").toLowerCase();
        if (pType === "cod" || pType === "cash") paymentCounts.cod++;
        else if (pType === "bank_transfer" || pType === "bank" || pType === "scb") paymentCounts.bank_transfer++;
        else paymentCounts.promptpay++;
    });

    const avgBasket = allOrders.length > 0 ? Math.round(totalGMV / allOrders.length) : 0;

    container.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                    <h3 class="font-extrabold text-base text-slate-800 flex items-center gap-2">
                        <span class="material-symbols-outlined text-purple-700">insights</span>
                        <span>สถิติภาพรวม & ประวัติยอดขายสะสม (Overview Analytics)</span>
                    </h3>
                    <p class="text-xs text-slate-500">วิเคราะห์ข้อมูลคำสั่งซื้อและยอดขายทั้งหมดที่บันทึกในระบบ</p>
                </div>
                <span class="text-xs bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full">
                    ทั้งหมด ${allOrders.length} ออเดอร์
                </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <div class="text-xs font-bold text-slate-500">ยอดขายรวมสะสม (Total GMV)</div>
                    <div class="text-2xl font-black text-emerald-700">฿${totalGMV.toLocaleString()}</div>
                    <div class="text-[11px] text-slate-400">จากออเดอร์ทั้งหมดในระบบ</div>
                </div>

                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <div class="text-xs font-bold text-slate-500">อัตราจัดส่งสำเร็จ (Completion)</div>
                    <div class="text-2xl font-black text-sky-700">${totalDelivered} / ${allOrders.length}</div>
                    <div class="text-[11px] text-slate-400">คิดเป็น ${allOrders.length > 0 ? Math.round((totalDelivered / allOrders.length) * 100) : 0}% ของออเดอร์</div>
                </div>

                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <div class="text-xs font-bold text-slate-500">ยอดสั่งซื้อเฉลี่ยต่อบิล (AOV)</div>
                    <div class="text-2xl font-black text-indigo-700">฿${avgBasket.toLocaleString()}</div>
                    <div class="text-[11px] text-slate-400">เฉลี่ยต่อ 1 คำสั่งซื้อ</div>
                </div>

                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <div class="text-xs font-bold text-slate-500">ค่าจัดส่งรวมสะสม (Delivery Fees)</div>
                    <div class="text-2xl font-black text-amber-700">฿${totalDeliveryFees.toLocaleString()}</div>
                    <div class="text-[11px] text-slate-400">ค่าบริการรวมของฮับ</div>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 class="font-bold text-sm text-slate-800">สัดส่วนช่องทางการชำระเงินของลูกค้า</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <div class="text-xs font-bold text-blue-900">📱 พร้อมเพย์ (PromptPay)</div>
                        <div class="text-lg font-black text-blue-950 mt-1">${paymentCounts.promptpay} ออเดอร์</div>
                    </div>
                    <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                        <div class="text-xs font-bold text-purple-900">🏦 โอนผ่านธนาคาร (SCB)</div>
                        <div class="text-lg font-black text-purple-950 mt-1">${paymentCounts.bank_transfer} ออเดอร์</div>
                    </div>
                    <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <div class="text-xs font-bold text-amber-900">💵 เงินสดปลายทาง (COD)</div>
                        <div class="text-lg font-black text-amber-950 mt-1">${paymentCounts.cod} ออเดอร์</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ── Tab 3: Stalls Directory & Settings
function filterAdminStalls(query) {
    _adminStallSearchQuery = (query || "").toLowerCase();
    renderAdminStalls();
}

function filterAdminStallsByZone(zone) {
    _adminStallZoneFilter = zone;
    renderAdminStalls();
}

function renderAdminStalls() {
    const container = document.getElementById("admin-content-stalls");
    if (!container) return;

    let stalls = ALL_100_STALLS;
    if (_adminStallZoneFilter && _adminStallZoneFilter !== "all") {
        stalls = stalls.filter(s => s.zone === _adminStallZoneFilter);
    }
    if (_adminStallSearchQuery) {
        stalls = stalls.filter(s =>
            (s.stallName && s.stallName.toLowerCase().includes(_adminStallSearchQuery)) ||
            (s.stallNumber && s.stallNumber.toLowerCase().includes(_adminStallSearchQuery)) ||
            (s.ownerName && s.ownerName.toLowerCase().includes(_adminStallSearchQuery)) ||
            (s.phone && s.phone.includes(_adminStallSearchQuery))
        );
    }

    container.innerHTML = `
        <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div>
                    <h3 class="font-extrabold text-base text-slate-800 flex items-center gap-2">
                        <span class="material-symbols-outlined text-purple-700">storefront</span>
                        <span>จัดการข้อมูล 100 แผงค้า & เบอร์พร้อมเพย์ (Vendors Directory)</span>
                    </h3>
                    <p class="text-xs text-slate-500">ตรวจสอบแผงค้า เจ้าของแผง และเบอร์โทรพร้อมเพย์สำหรับโอนเงินเคลียร์ยอด</p>
                </div>
                <div class="flex items-center gap-2">
                    <input type="text" oninput="filterAdminStalls(this.value)" value="${_adminStallSearchQuery}" placeholder="🔍 ค้นหาแผงค้า, เลขแผง, เบอร์โทร..." class="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-white w-64 focus:ring-2 focus:ring-purple-500 outline-none">
                </div>
            </div>

            <div class="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                <button onclick="filterAdminStallsByZone('all')" class="px-3 py-1 rounded-xl font-bold ${_adminStallZoneFilter === 'all' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}">ทั้งหมด (${ALL_100_STALLS.length})</button>
                <button onclick="filterAdminStallsByZone('A')" class="px-3 py-1 rounded-xl font-bold ${_adminStallZoneFilter === 'A' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}">โซน A ไก่/เนื้อ</button>
                <button onclick="filterAdminStallsByZone('B')" class="px-3 py-1 rounded-xl font-bold ${_adminStallZoneFilter === 'B' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}">โซน B ผักสด</button>
                <button onclick="filterAdminStallsByZone('C')" class="px-3 py-1 rounded-xl font-bold ${_adminStallZoneFilter === 'C' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}">โซน C เครื่องแกง</button>
                <button onclick="filterAdminStallsByZone('E')" class="px-3 py-1 rounded-xl font-bold ${_adminStallZoneFilter === 'E' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}">โซน E ซีฟู้ด</button>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <th class="p-3">เลขแผง / โซน</th>
                                <th class="p-3">ชื่อร้านค้า</th>
                                <th class="p-3">เจ้าของแผง</th>
                                <th class="p-3">เบอร์โทรศัพท์ (พร้อมเพย์)</th>
                                <th class="p-3 text-center">สถานะ</th>
                                <th class="p-3 text-center">ทดสอบ QR</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${stalls.slice(0, 50).map(s => `
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="p-3 font-mono font-bold text-slate-700">
                                    <span class="bg-slate-100 px-2 py-0.5 rounded">${s.stallNumber || 'แผงตลาด'}</span>
                                    <span class="text-[10px] text-slate-400 ml-1">โซน ${s.zone || '-'}</span>
                                </td>
                                <td class="p-3">
                                    <div class="font-extrabold text-slate-900">${s.stallName}</div>
                                    <div class="text-[10px] text-slate-400">${s.stallTag || s.category || ''}</div>
                                </td>
                                <td class="p-3 text-slate-700 font-medium">${s.ownerName || 'เจ้าของแผง'}</td>
                                <td class="p-3 font-mono font-bold text-emerald-700">📱 ${s.phone || '089-123-4567'}</td>
                                <td class="p-3 text-center">
                                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">เปิดทำการ</span>
                                </td>
                                <td class="p-3 text-center">
                                    <button onclick="openVendorPayoutModal('${s.stallId}', '${s.stallName.replace(/'/g, "\\'")}', 500, '${s.phone || '089-123-4567'}', '${s.ownerName || 'เจ้าของแผง'}', '${s.stallNumber || 'แผงตลาด'}')" class="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold rounded-lg text-[10px] active:scale-95 transition-all">
                                        เปิด QR โอน
                                    </button>
                                </td>
                            </tr>`).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// ── Tab 4: Riders Roster & Comprehensive Fleet Operations
let _adminRiderSearchQuery = "";
let _adminRiderStatusFilter = "all";
let _adminRiderRadarMap = null;

const DEFAULT_COMMUNITY_RIDERS = [
    {
        id: "RIDER-001",
        name: "พี่สมชาย ปลอดภัย (ไรเดอร์หลัก)",
        phone: "081-588-7400",
        plate: "1กข 8902 ชลบุรี",
        zone: "ตำบลบ้านหนองชาก / ตลาดสด",
        status: "available",
        baseFee: 40,
        lat: 13.2975,
        lng: 101.1725,
        avatar: "🛵",
        codSettledToday: 0
    },
    {
        id: "RIDER-002",
        name: "พี่วิชัย ว่องไว (ไรเดอร์ 2)",
        phone: "089-991-2345",
        plate: "2ขค 4455 ชลบุรี",
        zone: "ชุมชนหนองชากใน / ตลาดล่าง",
        status: "on_delivery",
        baseFee: 40,
        lat: 13.2920,
        lng: 101.1680,
        avatar: "⚡",
        codSettledToday: 0
    },
    {
        id: "RIDER-003",
        name: "พี่กิตติพงษ์ ส่งด่วน (ไรเดอร์ 3)",
        phone: "086-333-8822",
        plate: "3กง 7890 ชลบุรี",
        zone: "โซนบ้านบึงรอบนอก / สาย 344",
        status: "available",
        baseFee: 40,
        lat: 13.3050,
        lng: 101.1760,
        avatar: "🚀",
        codSettledToday: 0
    },
    {
        id: "RIDER-004",
        name: "พี่อรรถพล คล่องตัว (ไรเดอร์ 4)",
        phone: "084-555-9011",
        plate: "1มม 1234 ชลบุรี",
        zone: "หนองชาก - เนินโมก",
        status: "offline",
        baseFee: 40,
        lat: 13.2890,
        lng: 101.1810,
        avatar: "🛵",
        codSettledToday: 0
    }
];

function loadCommunityRiders() {
    try {
        const raw = localStorage.getItem("talathub_community_riders");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error("Error loading community riders:", e);
    }
    saveCommunityRiders(DEFAULT_COMMUNITY_RIDERS);
    return DEFAULT_COMMUNITY_RIDERS;
}

function saveCommunityRiders(list) {
    try {
        localStorage.setItem("talathub_community_riders", JSON.stringify(list));
    } catch (e) {
        console.error("Error saving community riders:", e);
    }
}

function loadRiderFleetSettings() {
    try {
        const raw = localStorage.getItem("talathub_fleet_settings");
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
        baseFee: 40,
        rainSurcharge: false,
        rainSurchargeAmount: 15,
        dailyBonusTrips: 10,
        dailyBonusAmount: 100,
        maxCodLimit: 2500
    };
}

function saveRiderFleetSettings(settings) {
    try {
        localStorage.setItem("talathub_fleet_settings", JSON.stringify(settings));
    } catch (e) {}
}

function renderAdminRiders() {
    const container = document.getElementById("admin-content-riders");
    if (!container) return;

    const riders = loadCommunityRiders();
    const settings = loadRiderFleetSettings();
    const targetDateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(targetDateKey);
    const reportRiders = (report && report.riderSettlement && report.riderSettlement.riders) || [];

    // Calculate aggregated fleet metrics for selected date
    let totalCompletedTrips = 0;
    let totalRiderFeesEarned = 0;
    let totalInHandCod = 0;
    let availableCount = 0;
    let deliveringCount = 0;
    let offlineCount = 0;

    const riderDataList = riders.map(r => {
        // Status counts
        if (r.status === "on_delivery") deliveringCount++;
        else if (r.status === "offline") offlineCount++;
        else availableCount++;

        // Match with daily report
        const rep = reportRiders.find(x => x.riderName === r.name || x.riderPhone === r.phone);
        const trips = rep ? (rep.tripsCount || 0) : 0;
        const feeEarned = rep ? (rep.riderFeeEarned || 0) : 0;
        const codCollected = rep ? (rep.codCollected || 0) : 0;
        const inHandCod = Math.max(0, codCollected - (Number(r.codSettledToday) || 0));

        totalCompletedTrips += trips;
        totalRiderFeesEarned += feeEarned;
        totalInHandCod += inHandCod;

        return {
            ...r,
            trips,
            feeEarned,
            inHandCod,
            isCodExceeded: inHandCod >= settings.maxCodLimit
        };
    });

    // Filtering & Searching
    const query = (_adminRiderSearchQuery || "").trim().toLowerCase();
    const filteredRiders = riderDataList.filter(r => {
        if (_adminRiderStatusFilter !== "all" && r.status !== _adminRiderStatusFilter) {
            return false;
        }
        if (query) {
            const matchesName = (r.name || "").toLowerCase().includes(query);
            const matchesPhone = (r.phone || "").toLowerCase().includes(query);
            const matchesPlate = (r.plate || "").toLowerCase().includes(query);
            const matchesZone = (r.zone || "").toLowerCase().includes(query);
            return matchesName || matchesPhone || matchesPlate || matchesZone;
        }
        return true;
    });

    container.innerHTML = `
        <div class="space-y-4 max-w-full">
            <!-- Top Banner -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                    <h3 class="font-extrabold text-base sm:text-lg text-slate-800 flex items-center gap-2">
                        <span class="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                            <span class="material-symbols-outlined text-lg">sports_motorsports</span>
                        </span>
                        <span>ศูนย์บริหารงานไรเดอร์ชุมชน & ค่ารอบจัดส่ง (Fleet Operations)</span>
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">จัดการทำเนียบไรเดอร์ ปรับสถานะพร้อมรับงาน ติดตามยอดเงินสด COD ในมือ และดูเรดาร์ GPS</p>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                    <button onclick="openAddRiderModal()" class="px-3 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">person_add</span>
                        <span>+ เพิ่มไรเดอร์ใหม่</span>
                    </button>
                    <button onclick="renderAdminRiders(); initAdminRiderRadarMap(); showToast('🔄 อัปเดตข้อมูลไรเดอร์เรียบร้อย');" class="p-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs active:scale-95 transition-all" title="รีเฟรชข้อมูล">
                        <span class="material-symbols-outlined text-base">refresh</span>
                    </button>
                </div>
            </div>

            <!-- Fleet Live KPIs (4 Summary Cards) -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                <div class="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <div class="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                        <span>ไรเดอร์ในระบบทั้งหมด</span>
                        <span class="material-symbols-outlined text-base text-purple-600">groups</span>
                    </div>
                    <div class="text-xl sm:text-2xl font-black text-slate-800">${riders.length} <span class="text-xs font-bold text-slate-500 font-sans">คน</span></div>
                    <div class="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                        <span class="text-emerald-600 font-bold">🟢 ว่าง ${availableCount}</span>
                        <span>•</span>
                        <span class="text-amber-600 font-bold">🟡 วิ่ง ${deliveringCount}</span>
                        <span>•</span>
                        <span class="text-slate-400">🔴 พัก ${offlineCount}</span>
                    </div>
                </div>

                <div class="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <div class="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                        <span>ส่งสำเร็จวันนี้</span>
                        <span class="material-symbols-outlined text-base text-emerald-600">task_alt</span>
                    </div>
                    <div class="text-xl sm:text-2xl font-black text-emerald-700">${totalCompletedTrips} <span class="text-xs font-bold text-slate-500 font-sans">เที่ยว</span></div>
                    <div class="text-[10px] sm:text-[11px] text-slate-500">
                        ค่ารอบสะสมรวม <strong class="text-emerald-700">฿${totalRiderFeesEarned.toLocaleString()}</strong>
                    </div>
                </div>

                <div class="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1 ${totalInHandCod > 0 ? 'bg-amber-50/40 border-amber-200' : ''}">
                    <div class="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                        <span>เงินสด COD ในมือรวม</span>
                        <span class="material-symbols-outlined text-base text-amber-600">payments</span>
                    </div>
                    <div class="text-xl sm:text-2xl font-black text-amber-700">฿${totalInHandCod.toLocaleString()}</div>
                    <div class="text-[10px] sm:text-[11px] text-slate-500">
                        เงินสดที่ไรเดอร์ถืออยู่รอส่งมอบฮับ
                    </div>
                </div>

                <div class="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <div class="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                        <span>โหมดสภาพอากาศ & โบนัส</span>
                        <span class="material-symbols-outlined text-base ${settings.rainSurcharge ? 'text-sky-600 animate-bounce' : 'text-amber-500'}">
                            ${settings.rainSurcharge ? 'rainy' : 'wb_sunny'}
                        </span>
                    </div>
                    <div class="text-xs sm:text-sm font-black ${settings.rainSurcharge ? 'text-sky-700' : 'text-slate-700'}">
                        ${settings.rainSurcharge ? `🌧️ ฝนตก (+฿${settings.rainSurchargeAmount}/เที่ยว)` : '☀️ อากาศแจ่มใสปกติ'}
                    </div>
                    <div class="text-[10px] sm:text-[11px] text-slate-400">
                        ค่ารอบฐาน ฿${settings.baseFee} • โบนัสเป้า ฿${settings.dailyBonusAmount}
                    </div>
                </div>
            </div>

            <!-- Toolbar: Search & Status Filters -->
            <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div class="w-full sm:w-72 relative">
                    <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                    <input type="text" value="${_adminRiderSearchQuery}" oninput="handleRiderSearch(this.value)" placeholder="ค้นหาชื่อ, เบอร์โทร, ทะเบียนรถ..." class="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                </div>

                <div class="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none text-xs w-full sm:w-auto">
                    <button onclick="filterAdminRiders('all')" class="px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${_adminRiderStatusFilter === 'all' ? 'bg-purple-700 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                        ทั้งหมด (${riders.length})
                    </button>
                    <button onclick="filterAdminRiders('available')" class="px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${_adminRiderStatusFilter === 'available' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                        🟢 พร้อมรับงาน (${availableCount})
                    </button>
                    <button onclick="filterAdminRiders('on_delivery')" class="px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${_adminRiderStatusFilter === 'on_delivery' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                        🟡 กำลังส่ง (${deliveringCount})
                    </button>
                    <button onclick="filterAdminRiders('offline')" class="px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${_adminRiderStatusFilter === 'offline' ? 'bg-slate-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                        🔴 พักรอบ (${offlineCount})
                    </button>
                </div>
            </div>

            <!-- Main Content: 2-Column Responsive Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <!-- Left: Rider Cards (Span 7) -->
                <div class="lg:col-span-7 space-y-3">
                    ${filteredRiders.length === 0 ? `
                        <div class="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                            <span class="material-symbols-outlined text-4xl text-slate-300">person_off</span>
                            <div class="font-bold text-slate-600 text-sm">ไม่พบข้อมูลไรเดอร์ตามเงื่อนไขที่ค้นหา</div>
                            <button onclick="filterAdminRiders('all'); handleRiderSearch('');" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                                ล้างตัวกรอง
                            </button>
                        </div>
                    ` : filteredRiders.map(r => `
                        <div class="bg-white p-4 rounded-2xl border ${r.isCodExceeded ? 'border-rose-400 bg-rose-50/10' : 'border-slate-200'} shadow-sm space-y-3 transition-all hover:shadow-md">
                            <!-- Card Header -->
                            <div class="flex items-start justify-between gap-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${r.status === 'available' ? 'from-emerald-100 to-emerald-200 text-emerald-800' : r.status === 'on_delivery' ? 'from-amber-100 to-amber-200 text-amber-800' : 'from-slate-100 to-slate-200 text-slate-600'} flex items-center justify-center text-2xl font-bold shadow-xs shrink-0">
                                        ${r.avatar || '🛵'}
                                    </div>
                                    <div class="min-w-0">
                                        <div class="font-extrabold text-sm sm:text-base text-slate-900 truncate flex items-center gap-1.5">
                                            <span>${r.name}</span>
                                        </div>
                                        <div class="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap font-mono">
                                            <span class="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">${r.plate || '-'}</span>
                                            <span>•</span>
                                            <a href="tel:${r.phone}" class="text-purple-700 font-bold hover:underline flex items-center gap-0.5">
                                                <span>📱 ${r.phone}</span>
                                            </a>
                                        </div>
                                        <div class="text-[11px] text-slate-400 mt-0.5">
                                            📍 ${r.zone || 'รอบตลาดวิศิษฐ์ชัย'}
                                        </div>
                                    </div>
                                </div>

                                <!-- Current Status Badge & 1-Click Switcher -->
                                <div class="flex flex-col items-end gap-1.5 shrink-0">
                                    <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                        r.status === 'available'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                            : r.status === 'on_delivery'
                                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                                            : 'bg-slate-100 text-slate-600 border-slate-300'
                                    }">
                                        ${r.status === 'available' ? '🟢 พร้อมรับงาน' : r.status === 'on_delivery' ? '🟡 กำลังส่งของ' : '🔴 พักรอบ'}
                                    </span>
                                    
                                    <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px]">
                                        <button onclick="setRiderStatus('${r.id}', 'available')" title="เปลี่ยนเป็นพร้อมรับงาน" class="px-1.5 py-0.5 rounded font-bold transition-all ${r.status === 'available' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'}">
                                            พร้อม
                                        </button>
                                        <button onclick="setRiderStatus('${r.id}', 'on_delivery')" title="เปลี่ยนเป็นกำลังส่งของ" class="px-1.5 py-0.5 rounded font-bold transition-all ${r.status === 'on_delivery' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'}">
                                            ส่งของ
                                        </button>
                                        <button onclick="setRiderStatus('${r.id}', 'offline')" title="เปลี่ยนเป็นพักรอบ" class="px-1.5 py-0.5 rounded font-bold transition-all ${r.status === 'offline' ? 'bg-slate-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'}">
                                            พัก
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Live Daily Settlement / Wallet Stats -->
                            <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                                <div>
                                    <div class="text-[10px] text-slate-500 font-medium">รอบส่งวันนี้</div>
                                    <div class="font-extrabold text-slate-800 text-sm sm:text-base">${r.trips} <span class="text-[10px] font-normal text-slate-400">เที่ยว</span></div>
                                </div>
                                <div>
                                    <div class="text-[10px] text-slate-500 font-medium">ค่ารอบสะสม</div>
                                    <div class="font-extrabold text-emerald-700 text-sm sm:text-base">฿${r.feeEarned.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div class="text-[10px] text-slate-500 font-medium">เงินสด COD ในมือ</div>
                                    <div class="font-extrabold text-amber-700 text-sm sm:text-base">฿${r.inHandCod.toLocaleString()}</div>
                                </div>
                            </div>

                            <!-- COD Over-limit Warning -->
                            ${r.isCodExceeded ? `
                                <div class="bg-rose-50 border border-rose-200 text-rose-800 p-2 rounded-xl flex items-center justify-between gap-2 text-xs animate-pulse">
                                    <div class="flex items-center gap-1.5 font-bold">
                                        <span class="material-symbols-outlined text-rose-600 text-sm">warning</span>
                                        <span>เงินสดในมือเกินเกณฑ์ ฿${settings.maxCodLimit.toLocaleString()}! ต้องนำส่งฮับทันที</span>
                                    </div>
                                    <button onclick="settleRiderCod('${r.id}')" class="px-2 py-0.5 bg-rose-600 text-white font-bold rounded-lg text-[10px] hover:bg-rose-700 whitespace-nowrap">
                                        รับเคลียร์เงิน
                                    </button>
                                </div>
                            ` : ''}

                            <!-- Card Action Buttons -->
                            <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-xs flex-wrap gap-2">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <button onclick="printThermalRiderSlipFromFleet('${r.id}')" class="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold rounded-xl text-[11px] flex items-center gap-1 active:scale-95 transition-all shadow-2xs" title="พิมพ์สลิปสรุปยอด 80x80">
                                        <span class="material-symbols-outlined text-xs text-sky-700">receipt</span>
                                        <span>สลิป 80mm</span>
                                    </button>
                                    <button onclick="settleRiderCod('${r.id}')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl text-[11px] flex items-center gap-1 active:scale-95 transition-all shadow-2xs" title="บันทึกการส่งมอบเงินสด COD เข้าฮับ">
                                        <span class="material-symbols-outlined text-xs text-emerald-700">account_balance_wallet</span>
                                        <span>เคลียร์เงิน COD</span>
                                    </button>
                                </div>

                                <div class="flex items-center gap-1">
                                    <button onclick="openEditRiderModal('${r.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-[11px] flex items-center gap-1 active:scale-95 transition-all" title="แก้ไขข้อมูลไรเดอร์">
                                        <span class="material-symbols-outlined text-xs">edit</span>
                                        <span>แก้ไข</span>
                                    </button>
                                    <button onclick="deleteCommunityRider('${r.id}')" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg active:scale-95 transition-all" title="ลบไรเดอร์">
                                        <span class="material-symbols-outlined text-base">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <!-- Right: Radar Map & Dynamic Fleet Settings (Span 5) -->
                <div class="lg:col-span-5 space-y-4">
                    <!-- Live Radar GPS Map -->
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                                    <span class="material-symbols-outlined text-base">radar</span>
                                </span>
                                <div>
                                    <h4 class="font-extrabold text-sm text-slate-800">เรดาร์ติดตามตำแหน่งไรเดอร์ (Live GPS)</h4>
                                    <div class="text-[10px] text-slate-400">พิกัดรอบตลาดสดวิศิษฐ์ชัย • หนองชาก/บ้านบึง</div>
                                </div>
                            </div>
                            <button onclick="initAdminRiderRadarMap()" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold flex items-center gap-1" title="จัดกึ่งกลางแผนที่ใหม่">
                                <span class="material-symbols-outlined text-xs">my_location</span>
                                <span>เซ็นเตอร์</span>
                            </button>
                        </div>

                        <!-- Map Leaflet Container -->
                        <div id="admin-rider-radar-map" style="height: 300px; width: 100%;" class="rounded-2xl border border-slate-200 shadow-inner z-0 overflow-hidden"></div>

                        <div class="flex items-center justify-between text-[10px] text-slate-500 flex-wrap gap-1 pt-1 border-t border-slate-100">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="flex items-center gap-1 font-bold text-emerald-700">🟢 พร้อม</span>
                                <span class="flex items-center gap-1 font-bold text-amber-700">🟡 ส่งของ</span>
                                <span class="flex items-center gap-1 font-bold text-slate-500">🔴 พัก</span>
                                <span class="flex items-center gap-1 font-bold text-purple-700">🏛️ ตลาดฮับ</span>
                            </div>
                            <span class="text-slate-400">คลิกที่หมุดเพื่อดูข้อมูล</span>
                        </div>
                    </div>

                    <!-- Dynamic Compensation & Surcharges Config -->
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                            <div class="flex items-center gap-2">
                                <span class="w-7 h-7 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                                    <span class="material-symbols-outlined text-base">tune</span>
                                </span>
                                <div>
                                    <h4 class="font-extrabold text-sm text-slate-800">ตั้งค่าค่ารอบ & โบนัสความเร็ว</h4>
                                    <div class="text-[10px] text-slate-400">คำนวณและปรับเปลี่ยนแบบ Real-time</div>
                                </div>
                            </div>
                        </div>

                        <!-- Weather Surcharge 1-Click Toggle -->
                        <div onclick="toggleRainSurcharge()" class="p-3 rounded-2xl border cursor-pointer transition-all ${settings.rainSurcharge ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-sky-400 shadow-md' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <span class="text-2xl">${settings.rainSurcharge ? '🌧️' : '☀️'}</span>
                                    <div>
                                        <div class="font-extrabold text-xs">
                                            ${settings.rainSurcharge ? 'เปิดโหมดฝนตกหนัก (+฿' + settings.rainSurchargeAmount + ' / เที่ยว)' : 'โหมดฝนตก / สภาพอากาศรุนแรง'}
                                        </div>
                                        <div class="text-[10px] ${settings.rainSurcharge ? 'text-sky-100' : 'text-slate-400'}">
                                            ${settings.rainSurcharge ? 'เพิ่มค่ารอบให้ไรเดอร์อัตโนมัติทุกเที่ยวที่วิ่งช่วงฝน' : 'คลิกเพื่อเปิดโหมดเพิ่มค่ารอบพิเศษสู้ฝน'}
                                        </div>
                                    </div>
                                </div>
                                <span class="material-symbols-outlined text-xl ${settings.rainSurcharge ? 'text-white' : 'text-slate-400'}">
                                    ${settings.rainSurcharge ? 'toggle_on' : 'toggle_off'}
                                </span>
                            </div>
                        </div>

                        <form onsubmit="saveFleetSettingsFromUI(event)" class="space-y-3 text-xs pt-1">
                            <div class="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label class="font-bold text-slate-700 block mb-1">ค่ารอบมาตรฐาน (฿/เที่ยว):</label>
                                    <input type="number" id="fleet-cfg-base-fee" value="${settings.baseFee || 40}" min="10" max="200" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none">
                                </div>
                                <div>
                                    <label class="font-bold text-slate-700 block mb-1">โบนัสฝนตก (฿/เที่ยว):</label>
                                    <input type="number" id="fleet-cfg-rain-bonus" value="${settings.rainSurchargeAmount || 15}" min="0" max="100" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label class="font-bold text-slate-700 block mb-1">โบนัสเป้าหมาย (ส่งครบ N เที่ยว):</label>
                                    <input type="number" id="fleet-cfg-target-trips" value="${settings.dailyBonusTrips || 10}" min="1" max="50" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none">
                                </div>
                                <div>
                                    <label class="font-bold text-slate-700 block mb-1">ยอดโบนัสพิเศษ (฿):</label>
                                    <input type="number" id="fleet-cfg-bonus-amount" value="${settings.dailyBonusAmount || 100}" min="0" max="500" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none">
                                </div>
                            </div>

                            <div>
                                <label class="font-bold text-slate-700 block mb-1">วงเงินสด COD สูงสุดในมือ (เตือนเมื่อเกิน):</label>
                                <input type="number" id="fleet-cfg-max-cod" value="${settings.maxCodLimit || 2500}" min="500" max="10000" step="100" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-800 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none">
                                <span class="text-[10px] text-slate-400 mt-0.5 block">ระบบจะแสดงป้ายเตือนสีแดงให้ไรเดอร์นำส่งเงินเข้าฮับทันทีเมื่อยอดสะสมเกินเกณฑ์</span>
                            </div>

                            <button type="submit" class="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5">
                                <span class="material-symbols-outlined text-sm">save</span>
                                <span>บันทึกการตั้งค่าค่ารอบ & เกณฑ์ COD</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ── Search & Filter Handlers
function handleRiderSearch(val) {
    _adminRiderSearchQuery = val;
    renderAdminRiders();
    setTimeout(() => initAdminRiderRadarMap(), 150);
}

function filterAdminRiders(status) {
    _adminRiderStatusFilter = status;
    renderAdminRiders();
    setTimeout(() => initAdminRiderRadarMap(), 150);
}

function setRiderStatus(riderId, newStatus) {
    const riders = loadCommunityRiders();
    const r = riders.find(x => x.id === riderId);
    if (!r) return;
    r.status = newStatus;
    
    // Simulate slight movement if status becomes on_delivery
    if (newStatus === "on_delivery") {
        r.lat = Number((r.lat + (Math.random() - 0.5) * 0.003).toFixed(4));
        r.lng = Number((r.lng + (Math.random() - 0.5) * 0.003).toFixed(4));
    }

    saveCommunityRiders(riders);
    const statusLabels = { available: "🟢 พร้อมรับงาน", on_delivery: "🟡 กำลังส่งของ", offline: "🔴 พักรอบ" };
    showToast(`🛵 เปลี่ยนสถานะ ${r.name} เป็น ${statusLabels[newStatus] || newStatus} สำเร็จ`);
    renderAdminRiders();
    setTimeout(() => initAdminRiderRadarMap(), 150);
}

function toggleRainSurcharge() {
    const s = loadRiderFleetSettings();
    s.rainSurcharge = !s.rainSurcharge;
    saveRiderFleetSettings(s);
    if (s.rainSurcharge) {
        showToast(`🌧️ เปิดโหมดสภาพอากาศแย่ (+฿${s.rainSurchargeAmount} / เที่ยว) แล้ว!`);
    } else {
        showToast(`☀️ ปิดโหมดสภาพอากาศแย่ กลับสู่ค่ารอบปกติ`);
    }
    renderAdminRiders();
}

function saveFleetSettingsFromUI(e) {
    if (e && e.preventDefault) e.preventDefault();
    const s = loadRiderFleetSettings();
    s.baseFee = Number(document.getElementById("fleet-cfg-base-fee")?.value || 40);
    s.rainSurchargeAmount = Number(document.getElementById("fleet-cfg-rain-bonus")?.value || 15);
    s.dailyBonusTrips = Number(document.getElementById("fleet-cfg-target-trips")?.value || 10);
    s.dailyBonusAmount = Number(document.getElementById("fleet-cfg-bonus-amount")?.value || 100);
    s.maxCodLimit = Number(document.getElementById("fleet-cfg-max-cod")?.value || 2500);
    saveRiderFleetSettings(s);
    showToast("💾 บันทึกการตั้งค่าค่ารอบและเกณฑ์ COD สำเร็จ!");
    renderAdminRiders();
}

function settleRiderCod(riderId) {
    const riders = loadCommunityRiders();
    const r = riders.find(x => x.id === riderId);
    if (!r) return;

    const targetDateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(targetDateKey);
    const reportRiders = (report && report.riderSettlement && report.riderSettlement.riders) || [];
    const rep = reportRiders.find(x => x.riderName === r.name || x.riderPhone === r.phone);
    const codCollected = rep ? (rep.codCollected || 0) : 0;
    const inHandCod = Math.max(0, codCollected - (Number(r.codSettledToday) || 0));

    if (inHandCod <= 0) {
        showToast(`ℹ️ ${r.name} ไม่มียอดเงินสด COD ค้างส่งในขณะนี้`);
        return;
    }

    if (confirm(`ยืนยันการรับมอบเงินสด COD จำนวน ฿${inHandCod.toLocaleString()} จาก ${r.name} เข้าสู่ฮับกลาง?`)) {
        r.codSettledToday = (Number(r.codSettledToday) || 0) + inHandCod;
        saveCommunityRiders(riders);
        showToast(`✅ เคลียร์ยอดเงินสด COD ฿${inHandCod.toLocaleString()} ของ ${r.name} เรียบร้อยแล้ว!`);
        renderAdminRiders();
    }
}

function printThermalRiderSlipFromFleet(riderId) {
    const riders = loadCommunityRiders();
    const r = riders.find(x => x.id === riderId);
    if (!r) return;

    const targetDateKey = _activeReportDateKey || getReportDateKey(Date.now());
    const report = aggregateDailyOperations(targetDateKey);
    const rep = (report && report.riderSettlement && report.riderSettlement.riders)
        ? report.riderSettlement.riders.find(x => x.riderName === r.name || x.riderPhone === r.phone)
        : null;

    if (rep) {
        printThermalRiderSlip(r.name, targetDateKey);
    } else {
        // Fallback slip even if 0 orders
        const thaiDate = formatThaiDateDisplay(targetDateKey);
        const printTime = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
        const content = `
            <div class="slip-brand">
                <div class="market-name">🏪 ตลาดสดฮับวิศิษฐ์ชัย</div>
                <div class="market-sub">WISIT CHAI FRESH HUB MARKET</div>
                <div class="doc-badge">[ ใบสรุปสถานะไรเดอร์ ]</div>
            </div>
            <div class="divider-dashed"></div>
            <div class="slip-row"><span class="slip-label">วันที่:</span><span class="slip-value">${thaiDate}</span></div>
            <div class="slip-row"><span class="slip-label">เวลาพิมพ์:</span><span class="slip-value">${printTime} น.</span></div>
            <div class="slip-row"><span class="slip-label">ไรเดอร์:</span><span class="slip-value">${r.name}</span></div>
            <div class="slip-row"><span class="slip-label">เบอร์โทร:</span><span class="slip-value">${r.phone}</span></div>
            <div class="slip-row"><span class="slip-label">ทะเบียน:</span><span class="slip-value">${r.plate || '-'}</span></div>
            <div class="slip-row"><span class="slip-label">สถานะ:</span><span class="slip-value">${r.status === 'available' ? '🟢 พร้อมรับงาน' : r.status === 'on_delivery' ? '🟡 กำลังส่งของ' : '🔴 พักรอบ'}</span></div>
            <div class="divider-dashed"></div>
            <div class="slip-row"><span class="slip-label">จำนวนเที่ยวส่งวันนี้:</span><span class="slip-value">0 เที่ยว</span></div>
            <div class="slip-row"><span class="slip-label">ค่ารอบสะสม:</span><span class="slip-value">฿0</span></div>
            <div class="slip-row"><span class="slip-label">เงินสด COD ในมือ:</span><span class="slip-value">฿0</span></div>
            <div class="divider-dashed"></div>
            <div class="slip-footer">
                <div>ตลาดสดฮับวิศิษฐ์ชัย • เอกสารสรุปสถานะประจำวัน</div>
            </div>
        `;
        executePrintHtml(`สลิปไรเดอร์_${r.name}_${targetDateKey}`, content, true);
    }
}

// ── Rider CRUD Modal Functions
function openAddRiderModal() {
    const modal = document.getElementById("rider-form-modal");
    if (!modal) return;
    document.getElementById("rider-form-modal-title").textContent = "เพิ่มไรเดอร์ใหม่เข้าสู่ระบบ";
    document.getElementById("rider-form-id").value = "";
    document.getElementById("rider-form-name").value = "";
    document.getElementById("rider-form-phone").value = "";
    document.getElementById("rider-form-plate").value = "";
    document.getElementById("rider-form-zone").value = "ตำบลบ้านหนองชาก / อำเภอบ้านบึง";
    document.getElementById("rider-form-status").value = "available";
    document.getElementById("rider-form-basefee").value = "40";
    modal.classList.remove("hidden");
}

function openEditRiderModal(riderId) {
    const riders = loadCommunityRiders();
    const r = riders.find(x => x.id === riderId);
    if (!r) return;

    const modal = document.getElementById("rider-form-modal");
    if (!modal) return;
    document.getElementById("rider-form-modal-title").textContent = `แก้ไขข้อมูล: ${r.name}`;
    document.getElementById("rider-form-id").value = r.id;
    document.getElementById("rider-form-name").value = r.name || "";
    document.getElementById("rider-form-phone").value = r.phone || "";
    document.getElementById("rider-form-plate").value = r.plate || "";
    document.getElementById("rider-form-zone").value = r.zone || "";
    document.getElementById("rider-form-status").value = r.status || "available";
    document.getElementById("rider-form-basefee").value = r.baseFee || 40;
    modal.classList.remove("hidden");
}

function closeRiderFormModal() {
    const modal = document.getElementById("rider-form-modal");
    if (modal) modal.classList.add("hidden");
}

function handleRiderFormSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const id = document.getElementById("rider-form-id")?.value;
    const name = document.getElementById("rider-form-name")?.value.trim();
    const phone = document.getElementById("rider-form-phone")?.value.trim();
    const plate = document.getElementById("rider-form-plate")?.value.trim();
    const zone = document.getElementById("rider-form-zone")?.value.trim();
    const status = document.getElementById("rider-form-status")?.value || "available";
    const baseFee = Number(document.getElementById("rider-form-basefee")?.value || 40);

    if (!name || !phone || !plate) {
        showToast("⚠️ กรุณากรอกข้อมูลชื่อ เบอร์โทร และทะเบียนรถให้ครบถ้วน");
        return;
    }

    const riders = loadCommunityRiders();
    if (id) {
        // Edit
        const r = riders.find(x => x.id === id);
        if (r) {
            r.name = name;
            r.phone = phone;
            r.plate = plate;
            r.zone = zone;
            r.status = status;
            r.baseFee = baseFee;
        }
        showToast(`💾 บันทึกการแก้ไขข้อมูล ${name} เรียบร้อยแล้ว`);
    } else {
        // New
        const newRider = {
            id: `RIDER-${Date.now().toString().slice(-4)}`,
            name,
            phone,
            plate,
            zone,
            status,
            baseFee,
            lat: Number((MARKET_ORIGIN.lat + (Math.random() - 0.5) * 0.01).toFixed(4)),
            lng: Number((MARKET_ORIGIN.lng + (Math.random() - 0.5) * 0.01).toFixed(4)),
            avatar: "🛵",
            codSettledToday: 0
        };
        riders.push(newRider);
        showToast(`🎉 เพิ่มไรเดอร์ใหม่ ${name} เข้าสู่ระบบแล้ว!`);
    }

    saveCommunityRiders(riders);
    closeRiderFormModal();
    renderAdminRiders();
    setTimeout(() => initAdminRiderRadarMap(), 150);
}

function deleteCommunityRider(riderId) {
    const riders = loadCommunityRiders();
    const r = riders.find(x => x.id === riderId);
    if (!r) return;

    if (confirm(`คุณต้องการลบไรเดอร์ "${r.name}" ออกจากทำเนียบใช่หรือไม่?`)) {
        const updated = riders.filter(x => x.id !== riderId);
        saveCommunityRiders(updated);
        showToast(`🗑️ ลบไรเดอร์ ${r.name} ออกจากระบบเรียบร้อย`);
        renderAdminRiders();
        setTimeout(() => initAdminRiderRadarMap(), 150);
    }
}

// ── Live Radar GPS Leaflet Map
function initAdminRiderRadarMap() {
    const mapContainer = document.getElementById("admin-rider-radar-map");
    if (!mapContainer || typeof L === "undefined") return;

    try {
        if (_adminRiderRadarMap) {
            _adminRiderRadarMap.remove();
            _adminRiderRadarMap = null;
        }

        const centerLat = MARKET_ORIGIN.lat || 13.2982;
        const centerLng = MARKET_ORIGIN.lng || 101.1712;

        _adminRiderRadarMap = L.map("admin-rider-radar-map", {
            zoomControl: true,
            attributionControl: false
        }).setView([centerLat, centerLng], 14);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19
        }).addTo(_adminRiderRadarMap);

        // 1. Hub Center Marker
        const hubIcon = L.divIcon({
            className: "custom-hub-marker",
            html: `
                <div style="background: #581c87; color: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.35);">
                    🏛️
                </div>
            `,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -18]
        });

        L.marker([centerLat, centerLng], { icon: hubIcon })
            .addTo(_adminRiderRadarMap)
            .bindPopup(`
                <div style="font-family: 'Prompt', sans-serif; font-size: 12px; line-height: 1.4;">
                    <div style="font-weight: 800; color: #581c87;">🏛️ ศูนย์กลางตลาดสดวิศิษฐ์ชัย (Hub)</div>
                    <div style="color: #64748b; font-size: 11px;">จุดรับของ & กระจายสินค้าหลัก</div>
                </div>
            `);

        // 2. Rider Markers
        const riders = loadCommunityRiders();
        const targetDateKey = _activeReportDateKey || getReportDateKey(Date.now());
        const report = aggregateDailyOperations(targetDateKey);
        const reportRiders = (report && report.riderSettlement && report.riderSettlement.riders) || [];

        riders.forEach(r => {
            const rep = reportRiders.find(x => x.riderName === r.name || x.riderPhone === r.phone);
            const inHandCod = rep ? Math.max(0, (rep.codCollected || 0) - (Number(r.codSettledToday) || 0)) : 0;
            const rLat = r.lat || centerLat;
            const rLng = r.lng || centerLng;

            let bgColor = "#10b981"; // available (green)
            let statusText = "🟢 พร้อมรับงาน";
            if (r.status === "on_delivery") {
                bgColor = "#f59e0b"; // on delivery (amber)
                statusText = "🟡 กำลังส่งของ";
            } else if (r.status === "offline") {
                bgColor = "#64748b"; // offline (grey)
                statusText = "🔴 พักรอบ";
            }

            const riderIcon = L.divIcon({
                className: "custom-rider-marker",
                html: `
                    <div style="background: ${bgColor}; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; border: 2.5px solid #fff; box-shadow: 0 3px 8px rgba(0,0,0,0.3); position: relative;">
                        ${r.avatar || '🛵'}
                        ${r.status === 'on_delivery' ? '<span style="position: absolute; top:-2px; right:-2px; width: 9px; height: 9px; background: #ef4444; border-radius: 50%; border: 1.5px solid #fff;"></span>' : ''}
                    </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            });

            const marker = L.marker([rLat, rLng], { icon: riderIcon }).addTo(_adminRiderRadarMap);
            marker.bindPopup(`
                <div style="font-family: 'Prompt', sans-serif; font-size: 11px; line-height: 1.5; min-width: 160px;">
                    <div style="font-weight: 800; font-size: 12px; color: #0f172a;">${r.avatar || '🛵'} ${r.name}</div>
                    <div style="color: #64748b; font-family: monospace;">ทะเบียน: ${r.plate || '-'}</div>
                    <div style="font-weight: bold; margin-top: 2px;">สถานะ: ${statusText}</div>
                    <div style="color: #b45309; font-weight: bold;">เงินสด COD: ฿${inHandCod.toLocaleString()}</div>
                    <div style="margin-top: 6px;">
                        <a href="tel:${r.phone}" style="background: #059669; color: white; padding: 3px 8px; border-radius: 6px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 10px;">
                            📞 โทร ${r.phone}
                        </a>
                    </div>
                </div>
            `);
        });

        setTimeout(() => {
            if (_adminRiderRadarMap) _adminRiderRadarMap.invalidateSize();
        }, 200);
    } catch (e) {
        console.error("Error initializing rider radar map:", e);
    }
}

// Window registrations
window.renderAdminRiders = renderAdminRiders;
window.handleRiderSearch = handleRiderSearch;
window.filterAdminRiders = filterAdminRiders;
window.setRiderStatus = setRiderStatus;
window.toggleRainSurcharge = toggleRainSurcharge;
window.saveFleetSettingsFromUI = saveFleetSettingsFromUI;
window.settleRiderCod = settleRiderCod;
window.printThermalRiderSlipFromFleet = printThermalRiderSlipFromFleet;
window.openAddRiderModal = openAddRiderModal;
window.openEditRiderModal = openEditRiderModal;
window.closeRiderFormModal = closeRiderFormModal;
window.handleRiderFormSubmit = handleRiderFormSubmit;
window.deleteCommunityRider = deleteCommunityRider;
window.initAdminRiderRadarMap = initAdminRiderRadarMap;


// ==========================================
// ADMIN SETTINGS: 4 SUB-TABS (ลูกค้า / ระบบจัดส่ง / แผงค้า / ไรเดอร์)
// ==========================================
let _activeSettingsSubTab = "customer";

function getDefaultSettingsNote(roleKey) {
    if (roleKey === "customer") {
        return "📢 ประกาศและเงื่อนไขถึงลูกค้าตลาดวิศิษฐ์ชัย:\n1. สินค้าสดทุกรายการคัดสรรจาก 100 แผงค้าในตลาดสด ชั่งน้ำหนักจริงก่อนส่งมอบ\n2. กรณีสินค้าเสียหาย ไม่สด หรือไม่ตรงตามที่สั่ง ยินดีคืนเงินหรือเปลี่ยนสินค้าให้ทันทีภายใน 24 ชั่วโมง\n3. จัดส่งรอบละ 30 นาที ตรงเวลา ค่าส่งเหมาจ่ายเริ่มต้น ฿20 รวมได้ทุกแผงค้า\n4. ติดต่อศูนย์บริการลูกค้า โทร. 089-123-4567 (เฮียส่ง)";
    } else if (roleKey === "hub") {
        return "📋 คู่มือและระเบียบปฏิบัติงานฝ่ายจัดเตรียมสินค้า (ฮับ):\n1. เมื่อมีออเดอร์เข้า ให้ตรวจสอบใบจัดของ (Picking List) แล้วแยกตะกร้าตามแผงค้าทันที\n2. สินค้าสดต้องชั่งน้ำหนักให้ตรงตามบิล และติดสติกเกอร์รหัสออเดอร์ให้ชัดเจน\n3. เนื้อสัตว์และอาหารทะเลสดต้องใส่น้ำแข็งหลอดในถุงเพื่อคงความสดก่อนส่งมอบให้ไรเดอร์\n4. ตรวจสอบสลิปโอนเงินทุกรายการ หากเป็นออเดอร์ COD ให้แจ้งไรเดอร์เก็บเงินสดให้ครบถ้วน";
    } else if (roleKey === "merchant") {
        return "🏪 ข้อตกลงและระเบียบสำหรับ 100 แผงค้าในตลาดสด:\n1. แผงค้าต้องจัดเตรียมของสดคุณภาพดี สะอาด และราคาต้องตรงกับราคาขายหน้าร้านจริง\n2. เมื่อได้รับแจ้งเตือนออเดอร์ กรุณาเตรียมสินค้าให้เสร็จภายใน 5-10 นาที\n3. ระบบตัดยอดและโอนเงินเข้าบัญชีพร้อมเพย์ของแผงค้าทุกวันเวลา 18:30 น. (ไม่มีหัก GP 0%)\n4. หากสินค้าตัวใดหมดชั่วคราว ให้แจ้งฝ่ายจัดของหรือปิดการขายในระบบทันที";
    } else if (roleKey === "rider") {
        return "🛵 ระเบียบวินัยและข้อปฏิบัติสำหรับไรเดอร์ประจำตลาด:\n1. ตรวจสอบจำนวนถุงและรหัสออเดอร์ให้ถูกต้องก่อนออกจากฮับทุกครั้ง\n2. สินค้าสดต้องบรรจุในกล่อง/กระเป๋าเก็บความเย็นที่มีถุงน้ำแข็งตลอดการเดินทาง\n3. โทรแจ้งลูกค้าล่วงหน้า 5 นาทีก่อนถึงบ้าน และพูดจาสุภาพเรียบร้อย\n4. ออเดอร์ COD ต้องเก็บเงินสดให้ครบ และนำส่งยอดเคลียร์เงินที่ฮับทุก 3 เที่ยวส่ง หรือก่อน 18:30 น.\n5. ขับขี่ปลอดภัย สวมหมวกกันน็อก ปฏิบัติตามกฎจราจรอย่างเคร่งครัด";
    }
    return "";
}

function getSettingsCustomNote(roleKey) {
    try {
        const saved = localStorage.getItem(`hsong_settings_note_${roleKey}`);
        if (saved !== null && saved !== undefined && saved.trim() !== "") return saved;
    } catch (e) {}
    return getDefaultSettingsNote(roleKey);
}

function saveSettingsCustomNote(roleKey) {
    const textarea = document.getElementById(`settings-note-${roleKey}`);
    if (!textarea) return;
    const text = textarea.value.trim();
    try {
        localStorage.setItem(`hsong_settings_note_${roleKey}`, text);
    } catch (e) {}
    const roleNames = { customer: "ลูกค้า", hub: "ระบบจัดส่ง", merchant: "แผงค้า", rider: "ไรเดอร์" };
    showToast(`💾 บันทึกข้อความ & รายละเอียดของ ${roleNames[roleKey] || roleKey} สำเร็จแล้ว!`);
}

function resetSettingsCustomNote(roleKey) {
    const defaultText = getDefaultSettingsNote(roleKey);
    const textarea = document.getElementById(`settings-note-${roleKey}`);
    if (textarea) textarea.value = defaultText;
    try {
        localStorage.setItem(`hsong_settings_note_${roleKey}`, defaultText);
    } catch (e) {}
    showToast(`🔄 รีเซ็ตข้อความเป็นค่าเริ่มต้นเรียบร้อยแล้ว`);
}

function loadSavedHubSettings() {
    try {
        const saved = localStorage.getItem("hsong_hub_settings");
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
        minOrder: 50,
        baseDeliveryFee: 20,
        maxRadius: 5.0,
        orderStart: "05:00",
        orderCutoff: "18:00",
        couponCode: "FRESH20",
        couponDiscount: 20,
        hubName: "ศูนย์กระจายสินค้าตลาดวิศิษฐ์ชัย (เฮียส่ง)",
        hubPhone: "089-123-4567",
        hubLocation: "ล็อคกลาง อาคาร 1 หน้าตลาดวิศิษฐ์ชัย",
        targetPickingTime: 12,
        staffPin: "8888",
        merchantGP: 0,
        merchantOpen: "04:30",
        merchantClose: "17:30",
        payoutTime: "18:30",
        expressBaseFee: 20,
        riderBaseFare: 40,
        riderExtraKm: 5,
        riderRainBonus: 10,
        maxCodLimit: 3000,
        riderCutoff: "18:30"
    };
}

function saveAdminSettingsConfig(roleKey) {
    const s = loadSavedHubSettings();
    if (roleKey === "customer") {
        s.minOrder = Number(document.getElementById("cfg-min-order")?.value || 50);
        s.baseDeliveryFee = Number(document.getElementById("cfg-base-fee")?.value || 20);
        s.maxRadius = Number(document.getElementById("cfg-max-radius")?.value || 5.0);
        s.orderStart = document.getElementById("cfg-order-start")?.value || "05:00";
        s.orderCutoff = document.getElementById("cfg-order-cutoff")?.value || "18:00";
        s.couponCode = document.getElementById("cfg-coupon-code")?.value || "FRESH20";
        s.couponDiscount = Number(document.getElementById("cfg-coupon-discount")?.value || 20);
    } else if (roleKey === "hub") {
        s.hubName = document.getElementById("cfg-hub-name")?.value || s.hubName;
        s.hubPhone = document.getElementById("cfg-hub-phone")?.value || s.hubPhone;
        s.hubLocation = document.getElementById("cfg-hub-location")?.value || s.hubLocation;
        s.targetPickingTime = Number(document.getElementById("cfg-picking-time")?.value || 12);
        s.staffPin = document.getElementById("cfg-staff-pin")?.value || "8888";
    } else if (roleKey === "merchant") {
        s.merchantGP = Number(document.getElementById("cfg-merchant-gp")?.value || 0);
        s.merchantOpen = document.getElementById("cfg-merchant-open")?.value || "04:30";
        s.merchantClose = document.getElementById("cfg-merchant-close")?.value || "17:30";
        s.payoutTime = document.getElementById("cfg-payout-time")?.value || "18:30";
        s.expressBaseFee = Number(document.getElementById("cfg-express-fee")?.value || 20);
    } else if (roleKey === "rider") {
        s.riderBaseFare = Number(document.getElementById("cfg-rider-base-fare")?.value || 40);
        s.riderExtraKm = Number(document.getElementById("cfg-rider-extra-km")?.value || 5);
        s.riderRainBonus = Number(document.getElementById("cfg-rider-rain-bonus")?.value || 10);
        s.maxCodLimit = Number(document.getElementById("cfg-max-cod")?.value || 3000);
        s.riderCutoff = document.getElementById("cfg-rider-cutoff")?.value || "18:30";
    }
    try {
        localStorage.setItem("hsong_hub_settings", JSON.stringify(s));
    } catch (e) {}
    showToast("💾 บันทึกค่าการตั้งค่าระบบเรียบร้อยแล้ว!");
}

function switchAdminSettingsSubTab(subTab) {
    _activeSettingsSubTab = subTab;
    renderAdminSettings();
}

// ── Tab 5: Hub System Settings (รวม 4 แท็บย่อย: ลูกค้า / ระบบจัดส่ง / แผงค้า / ไรเดอร์)
function renderAdminSettings() {
    const container = document.getElementById("admin-content-settings");
    if (!container) return;

    const s = loadSavedHubSettings();
    const currentNote = getSettingsCustomNote(_activeSettingsSubTab);

    // Sub-tab metadata
    const subTabConfigs = {
        customer: {
            title: "ตั้งค่าระบบตลาดฮับวิศิษฐ์ชัย (Hub Settings) • ส่วนลูกค้า",
            desc: "กำหนดเงื่อนไขการสั่งซื้อ ยอดขั้นต่ำ รอบเวลาจัดส่ง และช่องทางการชำระเงิน",
            badge: "แท็บ: 🛒 ลูกค้า",
            badgeColor: "bg-emerald-100 text-emerald-800",
            noteTitle: "📝 กล่องข้อความ/ประกาศ & เงื่อนไขการสั่งซื้อสำหรับลูกค้า",
            noteHelp: "พิมพ์ประกาศ นโยบายการเคลมของสดหากชำรุดเสียหาย หรือข้อความต้อนรับสำหรับแสดงให้ลูกค้าทราบ:"
        },
        hub: {
            title: "ตั้งค่าระบบตลาดฮับวิศิษฐ์ชัย (Hub Settings) • ส่วนระบบจัดส่ง & ฮับกลาง",
            desc: "ข้อมูลศูนย์กลางฮับ การควบคุมมาตรฐานของสด และระบบแจ้งเตือนเจ้าหน้าที่",
            badge: "แท็บ: 📦 ระบบจัดส่ง",
            badgeColor: "bg-sky-100 text-sky-800",
            noteTitle: "📝 กล่องข้อความ/คู่มือและระเบียบปฏิบัติงานระบบจัดส่ง (SOP)",
            noteHelp: "พิมพ์ขั้นตอนการจัดของ การบรรจุของสด กฎระเบียบคนจัดของ หรือวิธีประสานงานของหมด:"
        },
        merchant: {
            title: "ตั้งค่าระบบตลาดฮับวิศิษฐ์ชัย (Hub Settings) • ส่วนแผงค้าในตลาด",
            desc: "ข้อกำหนดแผงค้า อัตราค่าบริการระบบ รอบโอนเงินเคลียร์ยอด และบริการเรียกรถด่วน",
            badge: "แท็บ: 🏪 แผงค้า",
            badgeColor: "bg-amber-100 text-amber-800",
            noteTitle: "📝 กล่องข้อความ/ข้อตกลงและระเบียบสำหรับแผงค้าในตลาด",
            noteHelp: "พิมพ์กฎระเบียบการชั่งน้ำหนัก มาตรฐานความสะอาด หรือข้อตกลงการจ่ายเงินถึงเจ้าของแผงค้า:"
        },
        rider: {
            title: "ตั้งค่าระบบตลาดฮับวิศิษฐ์ชัย (Hub Settings) • ส่วนไรเดอร์ประจำตลาด",
            desc: "โครงสร้างค่ารอบจัดส่ง การบริหารเงินสด COD มาตรฐานความปลอดภัย และกฎระเบียบไรเดอร์",
            badge: "แท็บ: 🛵 ไรเดอร์",
            badgeColor: "bg-emerald-100 text-emerald-800",
            noteTitle: "📝 กล่องข้อความ/ระเบียบวินัยและคำสั่งการประจำวันของไรเดอร์",
            noteHelp: "พิมพ์ข้อปฏิบัติการส่งมอบของสด กฎความปลอดภัย หรือเบอร์ติดต่อฉุกเฉินเมื่อเกิดอุบัติเหตุ:"
        }
    };

    const curMeta = subTabConfigs[_activeSettingsSubTab] || subTabConfigs.customer;

    // 4 Sub-Tabs placed above the heading (เหนือรูปที่สอง)
    const subTabButtonsHtml = `
        <div class="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <button onclick="switchAdminSettingsSubTab('customer')" id="admin-subtab-customer" class="settings-subtab-btn flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${_activeSettingsSubTab === 'customer' ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'}">
                <span class="material-symbols-outlined text-base sm:text-lg">shopping_cart</span>
                <span>1. ลูกค้า</span>
            </button>
            <button onclick="switchAdminSettingsSubTab('hub')" id="admin-subtab-hub" class="settings-subtab-btn flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${_activeSettingsSubTab === 'hub' ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'}">
                <span class="material-symbols-outlined text-base sm:text-lg">inventory_2</span>
                <span>2. ระบบจัดส่ง</span>
            </button>
            <button onclick="switchAdminSettingsSubTab('merchant')" id="admin-subtab-merchant" class="settings-subtab-btn flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${_activeSettingsSubTab === 'merchant' ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'}">
                <span class="material-symbols-outlined text-base sm:text-lg">storefront</span>
                <span>3. แผงค้า</span>
            </button>
            <button onclick="switchAdminSettingsSubTab('rider')" id="admin-subtab-rider" class="settings-subtab-btn flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${_activeSettingsSubTab === 'rider' ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'}">
                <span class="material-symbols-outlined text-base sm:text-lg">two_wheeler</span>
                <span>4. ไรเดอร์</span>
            </button>
        </div>
    `;

    let subTabContentHtml = "";

    if (_activeSettingsSubTab === "customer") {
        subTabContentHtml = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Card 1: ข้อกำหนดการสั่งซื้อ -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-emerald-600">tune</span>
                        <span>1. ข้อกำหนดการสั่งซื้อ & ค่าบริการจัดส่ง</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ยอดสั่งซื้อขั้นต่ำต่อบิล (บาท):</label>
                            <input type="number" id="cfg-min-order" value="${s.minOrder}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-purple-600">
                            <span class="text-[11px] text-slate-400">ใส่ 0 หากไม่มีกำหนดยอดขั้นต่ำ</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ค่าบริการจัดส่งพื้นฐานเริ่มต้น (บาท):</label>
                            <input type="number" id="cfg-base-fee" value="${s.baseDeliveryFee}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-purple-600">
                            <span class="text-[11px] text-slate-400">รวมสินค้าจากทุกแผงค้าในตลาดสด ค่าส่งรอบเดียว</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">รัศมีจัดส่งสูงสุด (กิโลเมตร):</label>
                            <input type="number" step="0.5" id="cfg-max-radius" value="${s.maxRadius}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-purple-600">
                            <span class="text-[11px] text-slate-400">วัดระยะทางจากศูนย์กลางตลาดวิศิษฐ์ชัย</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2: รอบเวลาจัดส่ง -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-blue-600">schedule</span>
                        <span>2. รอบเวลาจัดส่ง & เวลาปิดรับออเดอร์</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-slate-700 block mb-1">เวลาเริ่มเปิดรับออเดอร์:</label>
                                <input type="text" id="cfg-order-start" value="${s.orderStart}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            </div>
                            <div>
                                <label class="font-bold text-slate-700 block mb-1">เวลาปิดรับออเดอร์ประจำวัน:</label>
                                <input type="text" id="cfg-order-cutoff" value="${s.orderCutoff}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            </div>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ความถี่ของรอบจัดส่ง:</label>
                            <input type="text" value="ส่งออกทุก 30 นาที (รอบเช้า 06:00-11:30 น. / รอบบ่าย 12:00-18:30 น.)" class="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-600 bg-slate-100" readonly>
                        </div>
                        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                            <span class="font-bold text-emerald-900">🎟️ โปรโมชั่นคูปองต้อนรับลูกค้าใหม่:</span>
                            <div class="flex items-center gap-2 mt-1">
                                <input type="text" id="cfg-coupon-code" value="${s.couponCode}" class="w-1/2 p-2 rounded-lg border border-emerald-300 font-mono font-bold text-emerald-800 text-xs">
                                <span class="text-xs">ลด ฿</span>
                                <input type="number" id="cfg-coupon-discount" value="${s.couponDiscount}" class="w-20 p-2 rounded-lg border border-emerald-300 font-bold text-emerald-800 text-xs">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 3: ช่องทางชำระเงินที่เปิดรับ -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 md:col-span-2">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-purple-600">payments</span>
                        <span>3. ช่องทางชำระเงินที่เปิดให้ลูกค้าใช้บริการ</span>
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div class="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 flex items-center gap-3">
                            <span class="material-symbols-outlined text-emerald-600 text-2xl">qr_code_2</span>
                            <div>
                                <div class="font-bold text-slate-900">QR พร้อมเพย์ (PromptPay)</div>
                                <div class="text-[11px] text-emerald-700 font-medium">✓ เปิดใช้งาน (ตรวจสลิปอัตโนมัติ)</div>
                            </div>
                        </div>
                        <div class="p-3.5 rounded-xl border-2 border-purple-500 bg-purple-50/50 flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-600 text-2xl">account_balance</span>
                            <div>
                                <div class="font-bold text-slate-900">บัญชีธนาคาร SCB</div>
                                <div class="text-[11px] text-purple-700 font-medium">✓ 411-1-30573-7 (เฮียส่ง)</div>
                            </div>
                        </div>
                        <div class="p-3.5 rounded-xl border-2 border-amber-500 bg-amber-50/50 flex items-center gap-3">
                            <span class="material-symbols-outlined text-amber-600 text-2xl">local_atm</span>
                            <div>
                                <div class="font-bold text-slate-900">เก็บเงินปลายทาง (COD)</div>
                                <div class="text-[11px] text-amber-700 font-medium">✓ จ่ายเงินสดกับไรเดอร์เมื่อได้รับของ</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end pt-1">
                        <button onclick="saveAdminSettingsConfig('customer')" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-sm">save</span>
                            <span>บันทึกค่าการตั้งค่าลูกค้า</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else if (_activeSettingsSubTab === "hub") {
        subTabContentHtml = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Card 1: ข้อมูลฮับ -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-sky-600">hub</span>
                        <span>1. ข้อมูลศูนย์กลางฮับตลาดวิศิษฐ์ชัย</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ชื่อศูนย์กลางฮับกระจายสินค้า:</label>
                            <input type="text" id="cfg-hub-name" value="${s.hubName}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ตำแหน่งจุดรวมของ / แท่นจัดของ:</label>
                            <input type="text" id="cfg-hub-location" value="${s.hubLocation}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์ผู้จัดการฮับ / เบอร์ PromptPay ฮับ:</label>
                            <input type="text" id="cfg-hub-phone" value="${s.hubPhone}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold font-mono text-emerald-700 bg-slate-50">
                        </div>
                    </div>
                </div>

                <!-- Card 2: มาตรฐานการจัดของ & ความปลอดภัย -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-indigo-600">inventory</span>
                        <span>2. มาตรฐานการจัดเตรียมของ & ความปลอดภัย</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">เวลาเป้าหมายในการเตรียมของต่อบิล (นาที):</label>
                            <input type="number" id="cfg-picking-time" value="${s.targetPickingTime}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">เฉลี่ย 10-15 นาที สำหรับรวมสินค้าสดจากหลายแผง</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">รหัส PIN สำหรับเจ้าหน้าที่จัดของเข้าสู่ระบบ:</label>
                            <input type="password" id="cfg-staff-pin" value="${s.staffPin}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">ค่าเริ่มต้น: 8888</span>
                        </div>
                        <div class="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
                            <div>
                                <div class="font-bold text-sky-950">🔔 เสียงแจ้งเตือนระฆัง (Bell Chime):</div>
                                <div class="text-[11px] text-sky-700">ส่งเสียงเตือนอัตโนมัติเมื่อมีออเดอร์ใหม่เข้า</div>
                            </div>
                            <span class="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">เปิดใช้งาน</span>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-2 flex justify-end">
                    <button onclick="saveAdminSettingsConfig('hub')" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">save</span>
                        <span>บันทึกค่าการตั้งค่าระบบจัดส่ง</span>
                    </button>
                </div>
            </div>
        `;
    } else if (_activeSettingsSubTab === "merchant") {
        subTabContentHtml = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Card 1: ข้อกำหนดแผงค้า -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-amber-600">storefront</span>
                        <span>1. ข้อกำหนดแผงค้า & ค่าธรรมเนียมระบบ</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ค่าธรรมเนียมส่วนแบ่งระบบ (GP %):</label>
                            <input type="number" id="cfg-merchant-gp" value="${s.merchantGP}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700 bg-slate-50">
                            <span class="text-[11px] text-slate-400">นโยบาย 0% ไม่หัก GP เพื่อส่งเสริมผู้ค้าชุมชน</span>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-slate-700 block mb-1">เวลาเริ่มรับบิลแผงค้า:</label>
                                <input type="text" id="cfg-merchant-open" value="${s.merchantOpen}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            </div>
                            <div>
                                <label class="font-bold text-slate-700 block mb-1">เวลาปิดรับบิลแผงค้า:</label>
                                <input type="text" id="cfg-merchant-close" value="${s.merchantClose}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2: รอบการโอนเงิน & บริการเรียกรถด่วน -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-orange-600">paid</span>
                        <span>2. รอบการโอนเงินเคลียร์ยอด & บริการเรียกรถด่วน</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">เวลาตัดรอบโอนเงินประจำวัน (Daily Settlement):</label>
                            <input type="text" id="cfg-payout-time" value="${s.payoutTime}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">โอนผ่าน PromptPay รายแผงทุกวันเวลา 18:30 น.</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ค่าบริการเรียกไรเดอร์ด่วนของแผงค้าเริ่มต้น (บาท):</label>
                            <input type="number" id="cfg-express-fee" value="${s.expressBaseFee}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">สำหรับแผงค้าที่ต้องการเรียกรถส่งลูกค้าส่วนตัว</span>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-2 flex justify-end">
                    <button onclick="saveAdminSettingsConfig('merchant')" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">save</span>
                        <span>บันทึกค่าการตั้งค่าแผงค้า</span>
                    </button>
                </div>
            </div>
        `;
    } else if (_activeSettingsSubTab === "rider") {
        subTabContentHtml = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Card 1: โครงสร้างค่ารอบ -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-emerald-600">sports_motorsports</span>
                        <span>1. โครงสร้างค่ารอบ & รายได้ไรเดอร์</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ค่ารอบมาตรฐานต่อเที่ยว (บาท):</label>
                            <input type="number" id="cfg-rider-base-fare" value="${s.riderBaseFare}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700 bg-slate-50">
                            <span class="text-[11px] text-slate-400">ระยะทางไม่เกิน 3.0 กิโลเมตร</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">ค่าระยะทางส่วนเกิน (บาท / กิโลเมตร):</label>
                            <input type="number" id="cfg-rider-extra-km" value="${s.riderExtraKm}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">คิดเพิ่มเมื่อเกิน 3 กิโลเมตร</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">โบนัสรอบพิเศษ (ฝนตก / เร่งด่วน) (บาท):</label>
                            <input type="number" id="cfg-rider-rain-bonus" value="${s.riderRainBonus}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                        </div>
                    </div>
                </div>

                <!-- Card 2: เพดานเงินสด COD & การเคลียร์เงิน -->
                <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                    <h4 class="font-extrabold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span class="material-symbols-outlined text-amber-600">account_balance_wallet</span>
                        <span>2. เพดานเงินสด COD & การเคลียร์เงิน</span>
                    </h4>
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">เพดานวงเงินสด COD สูงสุดที่ไรเดอร์ถือได้ (บาท):</label>
                            <input type="number" id="cfg-max-cod" value="${s.maxCodLimit}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-amber-700 bg-slate-50">
                            <span class="text-[11px] text-slate-400">หากเกินต้องเข้าเคลียร์เงินสดที่ฮับก่อนรับงานถัดไป</span>
                        </div>
                        <div>
                            <label class="font-bold text-slate-700 block mb-1">เวลาสิ้นสุดการส่งเงินสดประจำวัน:</label>
                            <input type="text" id="cfg-rider-cutoff" value="${s.riderCutoff}" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50">
                            <span class="text-[11px] text-slate-400">ส่งมอบเงินสดและเช็คยอดที่ฮับก่อน 18:30 น.</span>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-2 flex justify-end">
                    <button onclick="saveAdminSettingsConfig('rider')" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">save</span>
                        <span>บันทึกค่าการตั้งค่าไรเดอร์</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Text Box at the bottom of the tab (กล่องข้อความสำหรับใส่ข้อความหรือรายละเอียดต่างๆ ลงไป ตามที่ผู้ใช้สั่ง)
    const customNoteBoxHtml = `
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-purple-200/90 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-purple-700 text-lg">edit_note</span>
                    <h4 class="font-extrabold text-sm text-slate-900">${curMeta.noteTitle}</h4>
                </div>
                <button onclick="resetSettingsCustomNote('${_activeSettingsSubTab}')" class="text-[11px] text-slate-400 hover:text-rose-600 transition-colors cursor-pointer" title="รีเซ็ตกลับเป็นข้อความตัวอย่างเริ่มต้น">
                    รีเซ็ตข้อความเริ่มต้น
                </button>
            </div>
            <p class="text-xs text-slate-500">${curMeta.noteHelp}</p>
            <textarea id="settings-note-${_activeSettingsSubTab}" rows="5" class="w-full p-3.5 rounded-xl border border-slate-300 text-xs font-sans leading-relaxed text-slate-800 bg-slate-50/70 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all shadow-inner" placeholder="พิมพ์ข้อความ ประกาศ กฎระเบียบ หรือรายละเอียดที่ต้องการบันทึกไว้ที่นี่...">${currentNote}</textarea>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span class="text-[11px] text-slate-400 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs text-emerald-600">check_circle</span>
                    <span>บันทึกในระบบเรียลไทม์ (Local Database Persistence)</span>
                </span>
                <button onclick="saveSettingsCustomNote('${_activeSettingsSubTab}')" class="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-base">save</span>
                    <span>💾 บันทึกข้อความหน้านี้</span>
                </button>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="space-y-4 max-w-5xl mx-auto">
            <!-- 4 Sub-Tabs placed above the heading (เหนือรูปที่สอง) -->
            ${subTabButtonsHtml}

            <!-- Title Section (รูปที่สอง): ตั้งค่าระบบตลาดฮับวิศิษฐ์ชัย -->
            <div class="pb-2 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <span class="material-symbols-outlined text-purple-700">settings</span>
                        <span>${curMeta.title}</span>
                    </h3>
                    <p class="text-xs text-slate-500">${curMeta.desc}</p>
                </div>
                <span class="text-xs font-extrabold px-3 py-1 rounded-full ${curMeta.badgeColor} self-start sm:self-auto shadow-2xs">
                    ${curMeta.badge}
                </span>
            </div>

            <!-- Content of Active Sub-tab -->
            ${subTabContentHtml}

            <!-- Bottom Custom Text Box (กล่องข้อความสำหรับใส่ข้อความหรือรายละเอียดต่างๆ ลงไป) -->
            ${customNoteBoxHtml}
        </div>
    `;
}

// Hub Login & Logout
function openHubLoginModal() {
    document.getElementById("hub-login-modal").classList.remove("hidden");
}

function closeHubLoginModal() {
    document.getElementById("hub-login-modal").classList.add("hidden");
}

function handleHubLoginSubmit() {
    const pin = document.getElementById("hub-pin-input")?.value.trim();
    if (!pin || pin.length < 4) {
        showToast("⚠️ กรุณากรอกรหัส PIN ให้ครบ 4 หลัก");
        return;
    }
    state.activeHub = {
        isLoggedIn: true,
        name: "ฝ่ายจัดเตรียมสินค้า & ระบบจัดส่ง",
        role: "hub_admin"
    };
    saveHubToStorage(state.activeHub);
    closeHubLoginModal();
    setActiveRoleView("hub");
    renderAuthHeaderButtons();
    showToast("🎉 ล็อกอินเข้าสู่ระบบการจัดเตรียมสินค้าสำเร็จ!");
}

function quickLoginHub() {
    state.activeHub = {
        isLoggedIn: true,
        name: "ฝ่ายจัดเตรียมสินค้า & ระบบจัดส่ง",
        role: "hub_admin"
    };
    saveHubToStorage(state.activeHub);
    closeHubLoginModal();
    setActiveRoleView("hub");
    renderAuthHeaderButtons();
    showToast("🎉 ล็อกอินเข้าสู่ระบบการจัดเตรียมสินค้าสำเร็จ!");
}

function logoutHub() {
    state.activeHub = null;
    saveHubToStorage(null);
    setActiveRoleView("customer");
    renderAuthHeaderButtons();
    showToast("🚪 ออกจากระบบการจัดเตรียมสินค้าเรียบร้อยแล้ว");
}

// ==========================================
// ORDER NOTIFICATION & LINE INTEGRATION
// ==========================================
function playOrderAlertSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Bell chime tone 1 (D5)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain1.gain.setValueAtTime(0.35, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.6);

        // Bell chime tone 2 (D6 harmonious chime)
        setTimeout(() => {
            try {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = "sine";
                osc2.frequency.setValueAtTime(1174.66, ctx.currentTime);
                gain2.gain.setValueAtTime(0.45, ctx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start(ctx.currentTime);
                osc2.stop(ctx.currentTime + 0.8);
            } catch (e) { }
        }, 180);
    } catch (e) {
        console.warn("Audio notification notice:", e);
    }
}

function generateLineOrderMessage(order) {
    if (!order) return "";
    const slot = getNextDeliverySlotInfo();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    let itemsList = "";
    let itemIndex = 1;
    if (order.stalls) {
        order.stalls.forEach(stall => {
            itemsList += `\n📍 ${stall.name}:`;
            (stall.items || []).forEach(item => {
                const price = item.actualPrice !== undefined ? item.actualPrice : item.price;
                itemsList += `\n   ${itemIndex++}. ${item.name} - ฿${price}`;
            });
        });
    }

    return `🔔【เฮียส่ง】มีออเดอร์ใหม่เข้ามาแล้ว!
━━━━━━━━━━━━━━━━━━
📦 รหัสออเดอร์: ${order.orderId}
⏰ เวลาสั่งซื้อ: ${timeStr} น. (${slot.slotText})
👤 ผู้สั่ง: ${order.customerName || 'ลูกค้าทั่วไป'} (${order.customerPhone || '-'})
📍 ที่อยู่จัดส่ง: ${order.address || 'ตามพิกัดจัดส่ง'}
📝 โน้ตถึงไรเดอร์: ${order.deliveryNote || order.note || '-'}
━━━━━━━━━━━━━━━━━━
🛒 รายการสินค้าที่ต้องจัด:${itemsList}
━━━━━━━━━━━━━━━━━━
💰 ยอดชำระรวม: ฿${order.grandTotal || order.total || 0} (${order.paymentDesc || 'ชำระแล้ว'})
🛵 สถานะ: รอทีมงานจัดของสด & ปล่อยไรเดอร์
━━━━━━━━━━━━━━━━━━
👉 ดูใบจัดของสด: https://pisaen666.github.io/hsong/`;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || (window.matchMedia && window.matchMedia("(max-width: 768px)").matches && ('ontouchstart' in window));
}

function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    fallbackCopy(text);
}

function fallbackCopy(text) {
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    } catch (e) {
        console.warn("Fallback copy failed:", e);
    }
}

// ── LINE PC HELPER: จัดการการส่งข้อความ LINE บนคอมพิวเตอร์ (PC) อย่างปลอดภัย ไม่ติด error mobile
let currentLinePcMessage = "";

function showLinePcModal(title, msg) {
    currentLinePcMessage = msg;
    copyTextToClipboard(msg);

    const modal = document.getElementById("line-pc-modal");
    const titleEl = document.getElementById("line-pc-modal-title");
    const textEl = document.getElementById("line-pc-modal-text");

    if (titleEl && title) titleEl.textContent = title;
    if (textEl) textEl.value = msg;
    if (modal) modal.classList.remove("hidden");

    showToast("📋 คัดลอกข้อความแล้ว! พร้อมกด Ctrl+V วางใน LINE บน PC");

    // เปิดแอป LINE บน Windows ผ่าน line:// โดยไม่ส่ง msg/text เพื่อป้องกันข้อความเตือนบน LINE Desktop
    try {
        window.location.href = "line://";
    } catch (e) {
        console.warn("Launch line:// failed", e);
    }
}

function closeLinePcModal() {
    const modal = document.getElementById("line-pc-modal");
    if (modal) modal.classList.add("hidden");
}

function copyLinePcModalText() {
    const textEl = document.getElementById("line-pc-modal-text");
    const text = textEl ? textEl.value : currentLinePcMessage;
    if (text) {
        copyTextToClipboard(text);
        showToast("📋 คัดลอกข้อความสำเร็จ! กด Ctrl+V วางใน LINE ได้เลย");
    }
}

function launchLinePcApp() {
    try {
        window.location.href = "line://";
        showToast("🚀 กำลังสลับไปแอป LINE บนเครื่อง PC...");
    } catch (e) {
        showToast("⚠️ ไม่สามารถเปิดแอป LINE ได้ กรุณาเปิดจากทาสก์บาร์");
    }
}

function sendLineOrderNotification(order) {
    if (!order) return;
    const msg = generateLineOrderMessage(order);
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;

    state.latestLineMessage = msg;
    state.latestLineUrl = lineUrl;

    // สำหรับมือถือ: สามารถเปิดแอป LINE ได้ผ่าน Deep Link เพื่อส่งข้อความออเดอร์
    // สำหรับ PC/Desktop: ห้ามเปิด window.open อัตโนมัติ เพราะ desktop browser จะ redirect ไปที่ social-plugins.line.me ซึ่งติด HTTP 400 Bad Request จากความยาวข้อความ และรบกวนหน้าต่างสั่งซื้อ
    if (isMobileDevice()) {
        try {
            const lineWin = window.open(lineUrl, '_blank', 'noopener,noreferrer');
            if (!lineWin || lineWin.closed || typeof lineWin.closed === 'undefined') {
                console.log("Mobile popup was handled or blocked");
            }
        } catch (e) {
            console.warn("LINE mobile open failed:", e);
        }
    } else {
        console.log("PC Order created: Saved LINE notification for manual share/copy without breaking desktop view.");
    }
}

function openLineShareApp() {
    if (!state.activeOrder && !state.latestLineMessage) {
        showToast("⚠️ ยังไม่มีออเดอร์ใหม่ในระบบ");
        return;
    }
    const msg = state.latestLineMessage || generateLineOrderMessage(state.activeOrder);

    if (isMobileDevice()) {
        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
        window.open(lineUrl, '_blank');
    } else {
        showLinePcModal("แชร์ใบจัดของสดเข้า LINE", msg);
    }
}

// ==========================================
// HUB / DISPATCH SYSTEM DYNAMIC LOGIC
// ==========================================
function renderHubPickingList() {
    const container = document.getElementById("hub-content-picking");
    const queueBadge = document.getElementById("hub-queue-count");
    if (!container) return;

    const order = state.activeOrder;
    if (!order || order.status === "delivered" || !order.stalls || order.stalls.length === 0) {
        if (queueBadge) queueBadge.textContent = "0";
        container.innerHTML = `
            <div class="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm space-y-3 animate-fade-in">
                <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
                    📦
                </div>
                <h3 class="font-extrabold text-base text-slate-800">ยังไม่มีออเดอร์ใหม่ในคิวจัดของ</h3>
                <p class="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    เมื่อลูกค้าสั่งซื้อของสดจากหน้าตลาดสด ข้อมูลใบจัดของสดและยอดเงินจะปรากฏที่นี่แบบเรียลไทม์
                </p>
                <div class="pt-3 flex flex-col gap-2 max-w-xs mx-auto">
                    <button onclick="createSampleCustomerOrder()" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-base">add_shopping_cart</span>
                        <span>สร้างออเดอร์ทดสอบ (เพื่อทดลองจัดของ & ปล่อยไรเดอร์)</span>
                    </button>
                    <button onclick="clearAllTestData()" class="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2 rounded-xl text-xs active:scale-95 transition-all flex items-center justify-center gap-1">
                        <span class="material-symbols-outlined text-sm">delete_sweep</span>
                        <span>ล้างข้อมูลทดสอบ เริ่มต้นใหม่</span>
                    </button>
                    <button onclick="goToHomePage()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs active:scale-95 transition-all">
                        กลับไปหน้าตลาดสด
                    </button>
                </div>
            </div>
        `;
        return;
    }

    if (queueBadge) queueBadge.textContent = "1";

    const customerName = order.customerName || "ลูกค้าทั่วไป";
    const customerPhone = order.customerPhone || "-";
    const address = order.address || "ตามพิกัดจัดส่ง";
    const note = order.deliveryNote || order.note || "-";
    const paymentDesc = order.paymentDesc || "จ่ายผ่านพร้อมเพย์แล้ว";
    const total = order.grandTotal || order.total || 0;

    let stallsHtml = "";
    let refundCashTotal = 0;
    let outOfStockItems = [];

    // Calculate out-of-stock items & total refund amount (วิธีที่ 1: คืนเงินสดใส่ซอง)
    order.stalls.forEach(stall => {
        (stall.items || []).forEach(item => {
            if (item.outOfStock) {
                const price = item.actualPrice !== undefined ? item.actualPrice : item.price;
                refundCashTotal += price;
                outOfStockItems.push({ stallName: stall.name, itemName: item.name, price: price });
            }
        });
    });
    order.refundCashTotal = refundCashTotal;
    order.finalPaidTotal = Math.max(0, (order.grandTotal || order.total || 0) - refundCashTotal);

    order.stalls.forEach((stall, sIdx) => {
        const items = stall.items || [];
        let itemsHtml = "";

        items.forEach((item, iIdx) => {
            const isOutOfStock = item.outOfStock || false;
            const isPicked = item.picked || false;
            const hasScale = item.hasScale || false;
            const actualPrice = item.actualPrice !== undefined ? item.actualPrice : item.price;

            itemsHtml += `
                <div class="bg-white p-2.5 rounded-xl border ${isOutOfStock ? 'border-rose-300 bg-rose-50/50' : (isPicked ? 'border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-400/50' : 'border-slate-200')} space-y-1.5 transition-all">
                    <div class="flex items-center justify-between gap-2">
                        <label class="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0">
                            <input type="checkbox" ${isPicked ? 'checked' : ''} ${isOutOfStock ? 'disabled' : ''} onchange="toggleHubPickedItem(${sIdx}, ${iIdx})" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:opacity-40">
                            <span class="font-bold ${isOutOfStock ? 'text-rose-700 line-through' : (isPicked ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800')} text-xs truncate">
                                ${item.name} (฿${actualPrice})
                            </span>
                        </label>
                        <div class="flex items-center gap-1.5 shrink-0">
                            ${isOutOfStock ? `
                                <span class="text-[9px] text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full font-bold">⚠️ หมด คืน ฿${actualPrice}</span>
                                <button type="button" onclick="toggleHubItemOutOfStock(${sIdx}, ${iIdx})" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold active:scale-95 transition-all">กู้คืน</button>
                            ` : `
                                ${isPicked ? '<span class="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full font-bold">✓ พร้อม</span>' : '<span class="text-[10px] text-slate-400">รอหยิบ</span>'}
                                <button type="button" onclick="toggleHubItemOutOfStock(${sIdx}, ${iIdx})" class="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold flex items-center gap-0.5 active:scale-95 transition-all" title="แจ้งสินค้าหมดและคำนวณเงินสดใส่ซอง">
                                    <span class="material-symbols-outlined text-[11px]">cancel</span>
                                    <span>ของหมด</span>
                                </button>
                            `}
                        </div>
                    </div>
                    ${hasScale && !isOutOfStock ? `
                        <div class="flex items-center gap-2 pl-6 pt-1 text-[11px] text-slate-600 border-t border-slate-100">
                            <span>ชั่งจริง:</span>
                            <input type="number" id="actual-weight-${sIdx}-${iIdx}" value="${actualPrice}" class="w-16 p-1 border border-slate-300 rounded text-center text-xs font-bold text-slate-800 focus:ring-1 focus:ring-emerald-500">
                            <span>บาท</span>
                            <button onclick="updateHubItemWeight(${sIdx}, ${iIdx})" class="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow-xs active:scale-95 transition-all">บันทึก</button>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        stallsHtml += `
            <div class="${stall.badgeColor || 'bg-slate-50'} border border-slate-200/80 rounded-2xl p-3.5 space-y-2.5">
                <div class="flex items-center justify-between">
                    <span class="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                        <span>${stall.name}</span>
                    </span>
                    <span class="text-[10px] bg-white/90 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full font-bold shadow-2xs">${stall.tag || 'แผงค้าในตลาด'}</span>
                </div>
                <div class="space-y-1.5">
                    ${itemsHtml}
                </div>
            </div>
        `;
    });

    let refundAlertHtml = "";
    if (refundCashTotal > 0) {
        refundAlertHtml = `
            <!-- Cash Refund in Envelope Alert (ขั้นตอนที่ 2: ฮับ/ไรเดอร์นำเงินสดใส่ซอง) -->
            <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-3.5 shadow-md space-y-2 animate-fade-in text-left">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 font-black text-xs">
                        <span class="text-base">✉️</span>
                        <span>คำสั่งคืนเงินสดใส่ซอง: ฿${refundCashTotal}</span>
                    </div>
                    <span class="bg-white/25 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">วิธีที่ 1: เงินสดใส่ซอง</span>
                </div>
                <div class="text-[11px] text-amber-100 leading-snug">
                    พบสินค้าหมด ${outOfStockItems.length} รายการ ทีมงานฮับ/ไรเดอร์ต้องนำเงินสดจำนวน <strong>฿${refundCashTotal}</strong> ใส่ซองใสเย็บแนบไปกับถุงของสดส่งให้ลูกค้า
                </div>
                <div class="grid grid-cols-2 gap-2 pt-1">
                    <button onclick="callCustomerPhone()" class="py-1.5 px-2 bg-white text-slate-800 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm text-emerald-600">call</span>
                        <span>โทรแจ้งลูกค้า</span>
                    </button>
                    <button onclick="sendOutOfStockLineNotice()" class="py-1.5 px-2 bg-[#06C755] hover:bg-[#05a847] text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">chat</span>
                        <span>ส่ง LINE แจ้งเงินทอน</span>
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-200 space-y-3.5 animate-fade-in text-left">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                    <div class="flex items-center gap-1.5">
                        <span class="bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">${order.orderId}</span>
                        <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">${order.status === 'delivering' ? '🛵 กำลังนำส่ง' : '📋 กำลังจัดของสด'}</span>
                    </div>
                    <div class="text-xs font-bold text-slate-800 mt-1.5">ผู้รับ: ${customerName} (${address})</div>
                    <div class="text-[11px] text-slate-500">โทร: ${customerPhone} • โน้ต: ${note}</div>
                </div>
                <div class="text-right">
                    <span class="text-sm font-black text-orange-600">฿${total}</span>
                    <div class="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-1 font-bold">${paymentDesc}</div>
                </div>
            </div>

            <!-- LINE Notification Status & Action Bar -->
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-2xs">
                <div class="flex items-center gap-2 text-emerald-950 text-xs font-bold min-w-0 flex-1">
                    <span class="w-6 h-6 rounded-lg bg-[#06C755] text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-2xs">LINE</span>
                    <span class="truncate text-[11px]">ส่งแจ้งเตือนออเดอร์เข้า LINE ส่วนตัวแล้ว</span>
                </div>
                <button onclick="openLineShareApp()" class="bg-[#06C755] hover:bg-[#05a847] text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 active:scale-95 transition-all shrink-0" title="เปิดดูข้อความออเดอร์ใน LINE">
                    <span>เปิดใน LINE</span>
                    <span class="material-symbols-outlined text-xs">open_in_new</span>
                </button>
            </div>

            ${refundAlertHtml}

            <div class="space-y-3 pt-1">
                <div class="text-[11px] font-bold text-slate-600 flex items-center gap-1 uppercase tracking-wider">
                    <span class="material-symbols-outlined text-sm text-emerald-700">checklist</span>
                    <span>เดินหยิบของสดตามแผงค้าในตลาด:</span>
                </div>

                ${stallsHtml}
            </div>

            <div class="pt-3 border-t border-slate-100 space-y-2">
                <button onclick="completePickingAndDispatchOrder('${order.orderId}')" class="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-base">moped</span>
                    <span>รวมถุงเสร็จแล้ว • ปล่อยไรเดอร์ออกเดินทาง 🚀</span>
                </button>
            </div>
        </div>
    `;
}

// Out-of-Stock Toggle Handler (ขั้นตอนที่ 2: ฮับกดแจ้งของหมด)
function toggleHubItemOutOfStock(stallIndex, itemIndex) {
    if (!state.activeOrder || !state.activeOrder.stalls[stallIndex]) return;
    const stall = state.activeOrder.stalls[stallIndex];
    const item = stall.items[itemIndex];
    if (!item) return;

    item.outOfStock = !item.outOfStock;
    const price = item.actualPrice !== undefined ? item.actualPrice : item.price;

    if (item.outOfStock) {
        item.picked = false;
        showToast(`⚠️ ปรับ "${item.name}" เป็นสินค้าหมด (คำนวณเงินสดทอน ฿${price} ใส่ซองแนบถุง)`);
    } else {
        showToast(`✓ กู้คืนรายการ "${item.name}" กลับเข้ารายการจัดเตรียมแล้ว`);
    }

    // Recalculate stall picked count based on non-out-of-stock items
    stall.pickedCount = stall.items.filter(i => i.picked && !i.outOfStock).length;

    // Recalculate order refund totals
    let refundCashTotal = 0;
    state.activeOrder.stalls.forEach(s => {
        (s.items || []).forEach(it => {
            if (it.outOfStock) {
                const pr = it.actualPrice !== undefined ? it.actualPrice : it.price;
                refundCashTotal += pr;
            }
        });
    });
    state.activeOrder.refundCashTotal = refundCashTotal;
    state.activeOrder.finalPaidTotal = Math.max(0, (state.activeOrder.grandTotal || state.activeOrder.total || 0) - refundCashTotal);

    saveActiveOrderToStorage(state.activeOrder);
    renderHubPickingList();
    renderTrackingScreen();
    renderHubSettlement();
}

// Send Out-of-Stock Notice via LINE
function sendOutOfStockLineNotice() {
    const order = state.activeOrder;
    if (!order) return;
    const oosList = [];
    if (order.stalls) {
        order.stalls.forEach(s => {
            (s.items || []).forEach(i => {
                if (i.outOfStock) oosList.push(`${i.name} (฿${i.actualPrice !== undefined ? i.actualPrice : i.price})`);
            });
        });
    }
    const refund = order.refundCashTotal || 0;
    const cleanOrderId = (order.orderId || "TH-6114").replace(/#/g, '');
    const trackUrl = `https://pisaen666.github.io/hsong/?track=${encodeURIComponent(cleanOrderId)}`;
    const msg = `🔔【เฮียส่ง】แจ้งเตือนเรื่องสินค้าออเดอร์ ${order.orderId}:\nขออภัยครับ มีสินค้าที่แผงค้าหมด ได้แก่:\n${oosList.map(n => `• ${n}`).join('\n')}\n━━━━━━━━━━━━━━━━━━\n✉️ คืนเงินสดใส่ซอง: ฿${refund}\nทีมงานตัดรายการออก และไรเดอร์ได้นำเงินสดทอนจำนวน ฿${refund} ใส่ซองใสแนบไปกับถุงของสดเรียบร้อยแล้วครับ 🛵💨\n━━━━━━━━━━━━━━━━━━\n👉 แตะลิงก์นี้เพื่อดูสถานะจัดส่ง & ซองเงินทอนของคุณ:\n${trackUrl}`;

    if (isMobileDevice()) {
        window.location.href = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
    } else {
        showLinePcModal(`แจ้งเงินทอนสินค้าหมด (ออเดอร์ ${order.orderId})`, msg);
    }
}

function toggleHubPickedItem(stallIndex, itemIndex) {
    if (!state.activeOrder || !state.activeOrder.stalls[stallIndex]) return;
    const stall = state.activeOrder.stalls[stallIndex];
    const item = stall.items[itemIndex];
    if (item) {
        item.picked = !item.picked;
        stall.pickedCount = stall.items.filter(i => i.picked).length;
        saveActiveOrderToStorage(state.activeOrder);
        renderHubPickingList();
        renderTrackingScreen();
    }
}

function updateHubItemWeight(stallIndex, itemIndex) {
    if (!state.activeOrder || !state.activeOrder.stalls[stallIndex]) return;
    const input = document.getElementById(`actual-weight-${stallIndex}-${itemIndex}`);
    if (input) {
        const val = parseFloat(input.value) || 0;
        state.activeOrder.stalls[stallIndex].items[itemIndex].actualPrice = val;
        showToast(`✓ บันทึกราคาน้ำหนักจริง ฿${val} เรียบร้อยแล้ว`);
        renderHubPickingList();
        renderHubSettlement();
    }
}

function completePickingAndDispatchOrder(orderId) {
    if (!state.activeOrder) return;
    state.activeOrder.status = "delivering";
    if (state.activeOrder.stalls) {
        state.activeOrder.stalls.forEach(s => {
            s.pickedCount = s.itemsCount;
            if (s.items) s.items.forEach(i => i.picked = true);
        });
    }

    // Auto populate rider job
    state.activeRider = state.activeRider || {
        isLoggedIn: true,
        name: "พี่สมชาย (1กข 8902)",
        phone: "081-588-7400",
        license: "1กข 8902"
    };
    saveRiderToStorage(state.activeRider);

    // ✅ ซิงค์สถานะใหม่ไปยัง Firebase & localStorage
    saveActiveOrderToStorage(state.activeOrder);

    // Open Success Next Step Modal
    const modal = document.getElementById("dispatch-success-modal");
    if (modal) {
        modal.classList.remove("hidden");
    }

    showToast("🛵 รวมถุงเรียบร้อย! ปล่อยไรเดอร์ออกเดินทางส่งของสดแล้ว");
    renderHubPickingList();
    renderTrackingScreen();
    renderRiderScreen();
}

function closeDispatchSuccessModal() {
    const modal = document.getElementById("dispatch-success-modal");
    if (modal) modal.classList.add("hidden");

    // ✅ หลังปิด modal → สลับไป Tab "ติดตามออเดอร์" ทันที
    // เพื่อให้ฮับเห็นสถานะออเดอร์ที่เพิ่ง dispatch และ monitor ไรเดอร์ได้
    switchHubTab("monitor");
    showToast("📊 ตรวจสอบสถานะออเดอร์ได้ที่แท็บ 'ติดตามออเดอร์'");
}

// ── ปุ่ม 1: ไปหน้าจอไรเดอร์รับงาน ───────────────────────────────────────────
// เรียกหลังจาก Hub รวมถุงเสร็จและ dispatch ออเดอร์แล้ว
// ทำหน้าที่: สลับมุมมองเป็น Rider + ตั้งค่า order ให้ไรเดอร์เห็นงานพร้อมรับ
function goToRiderTrackingScreen() {
    closeDispatchSuccessModal();

    // 1) Auto-login rider ถ้ายังไม่ได้ login
    if (!state.activeRider || !state.activeRider.isLoggedIn) {
        state.activeRider = {
            isLoggedIn: true,
            riderId: "rider_somchai",
            name: "พี่สมชาย (1กข 8902)",
            phone: "081-588-7400",
            license: "1กข 8902"
        };
        saveRiderToStorage(state.activeRider);
    }

    // 2) อัปเดต order status → "dispatched" (ฮับส่งมอบให้ไรเดอร์แล้ว)
    if (state.activeOrder) {
        state.activeOrder.status = "dispatched";
        state.activeOrder.dispatchedAt = Date.now(); // ⏱️ timestamp สำหรับ timeout warning ใน Monitor Board
        state.activeOrder.riderName  = state.activeRider.name;
        state.activeOrder.riderPhone = state.activeRider.phone;

        // คำนวณเงินทอนที่ไรเดอร์ต้องคืนลูกค้า (กรณีสินค้าขาด)
        let refundTotal = 0;
        if (state.activeOrder.stalls) {
            state.activeOrder.stalls.forEach(s => {
                (s.items || []).forEach(it => {
                    if (it.outOfStock) {
                        refundTotal += (it.actualPrice !== undefined ? it.actualPrice : it.price);
                    }
                });
            });
        }
        state.activeOrder.refundCashTotal = refundTotal;

        // paymentDesc ให้ชัดเจนขึ้น
        if (!state.activeOrder.paymentDesc) {
            state.activeOrder.paymentDesc = state.activeOrder.paymentType === "cash" ? "เงินสด" : "ชำระแล้ว";
        }

        saveActiveOrderToStorage(state.activeOrder);
    }

    // 3) สลับมุมมองเป็น Rider และ render หน้างาน
    setActiveRoleView("rider");
    renderRiderScreen();
    renderAuthHeaderButtons();

    showToast("🛵 สลับมาหน้าจอไรเดอร์แล้ว! ออเดอร์พร้อมรับงานนำส่ง");
}

// ── ปุ่ม 2: ไปหน้าจอติดตามส่งของลูกค้า ─────────────────────────────────────
// เรียกหลังจาก Hub dispatch ออเดอร์แล้ว
// ทำหน้าที่: สลับมุมมองเป็น Customer + เปิดหน้า Tracking แสดงไรเดอร์กำลังนำส่ง
function goToCustomerLiveTracking() {
    closeDispatchSuccessModal();

    // อัปเดต order status → "on_the_way" (ไรเดอร์กำลังนำส่ง)
    if (state.activeOrder) {
        state.activeOrder.status = "on_the_way";

        // ใส่ข้อมูลไรเดอร์ถ้ามี เพื่อให้หน้า Tracking แสดงชื่อ/ทะเบียน
        if (state.activeRider && state.activeRider.isLoggedIn) {
            state.activeOrder.riderName  = state.activeRider.name;
            state.activeOrder.riderPhone = state.activeRider.phone;
        } else {
            // ใส่ข้อมูลไรเดอร์ default ถ้ายังไม่ได้ assign
            state.activeOrder.riderName  = "พี่สมชาย (1กข 8902)";
            state.activeOrder.riderPhone = "081-588-7400";
        }

        saveActiveOrderToStorage(state.activeOrder);
    }

    // สลับมุมมองเป็น Customer และเปิดหน้า Tracking
    setActiveRoleView("customer");
    goToTrackingScreen();
    if (typeof renderTrackingScreen === "function") renderTrackingScreen();

    showToast("📱 สลับมาหน้าจอลูกค้าแล้ว! ไรเดอร์กำลังนำส่งของสดมาให้คุณ");
}

function createSampleCustomerOrder() {
    state.activeOrder = {
        orderId: "#TH-" + Math.floor(1000 + Math.random() * 9000),
        status: "picking",
        grandTotal: 185,
        total: 185,
        paymentType: "promptpay",
        deliveryNote: "โน้ต: แขวนไว้ที่รั้วบ้าน",
        customerName: (state.customer && state.customer.isLoggedIn) ? state.customer.identifier : "ลูกค้า (ทดสอบระบบ)",
        customerPhone: (state.customer && state.customer.phone) ? state.customer.phone : "08x-xxx-xxxx",
        address: (state.deliveryLocation && state.deliveryLocation.title) ? state.deliveryLocation.title : "อ.บ้านบึง จ.ชลบุรี",
        stalls: [
            {
                stallId: "stall_a01",
                name: "🍗 แผง A01 (ร้านไก่สดของเรา)",
                tag: "หยิบจากหน้าร้านเรา",
                badgeColor: "bg-orange-50/70",
                itemsCount: 2,
                pickedCount: 2,
                items: [
                    { name: "อกไก่ลอกหนัง (อนามัย) 1 กก.", price: 85, picked: true },
                    { name: "น่องติดสะโพกไก่สด 500 กรัม", price: 45, picked: true }
                ]
            },
            {
                stallId: "stall_b01",
                name: "🥬 แผง B01 (ผักสวนครัวลุงสนั่น)",
                tag: "แผงผักซอย 2",
                badgeColor: "bg-emerald-50/70",
                itemsCount: 1,
                pickedCount: 0,
                items: [
                    { name: "ผักกาดขาว 1 หัว (ประเมิน ฿25)", price: 25, actualPrice: 27, hasScale: true, picked: false }
                ]
            },
            {
                stallId: "stall_c01",
                name: "🌶️ แผง C01 (กะทิสดชาวเกาะ ลุงสมหมาย)",
                tag: "แผงเครื่องแกงซอย 4",
                badgeColor: "bg-red-50/70",
                itemsCount: 1,
                pickedCount: 0,
                items: [
                    { name: "หัวกะทิสดคั้นแท้ 100% 500 มล.", price: 40, picked: false }
                ]
            }
        ]
    };

    renderHubPickingList();
    renderHubSettlement();
    renderTrackingScreen();
    showToast("🎉 สร้างออเดอร์ทดสอบสำเร็จ! เริ่มต้นจัดของสดตามแผงค้าได้เลย");
}

function renderHubSettlement() {
    const container = document.getElementById("hub-content-settlement");
    if (!container) return;

    const order = state.activeOrder;
    if (!order || !order.stalls || order.stalls.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm space-y-2">
                <div class="text-2xl">💰</div>
                <h4 class="font-bold text-sm text-slate-700">ยังไม่มีรายการยอดเคลียร์เงินแม่ค้า</h4>
                <p class="text-[11px] text-slate-500">ยอดเงินเคลียร์แผงค้าจะคำนวณอัตโนมัติตามสินค้าที่หยิบจริง</p>
            </div>
        `;
        return;
    }

    let vendorListHtml = "";
    let vendorTotal = 0;

    order.stalls.forEach(stall => {
        const activeItems = (stall.items || []).filter(item => !item.outOfStock);
        const oosItems = (stall.items || []).filter(item => item.outOfStock);
        const stallItemsTotal = activeItems.reduce((sum, item) => sum + (item.actualPrice !== undefined ? item.actualPrice : item.price), 0);
        vendorTotal += stallItemsTotal;

        vendorListHtml += `
            <div class="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                    <div class="font-bold text-slate-800 text-xs">${stall.name}</div>
                    <div class="text-[10px] text-slate-500">
                        หยิบจริง ${activeItems.length} รายการ ${oosItems.length > 0 ? `<span class="text-rose-600 font-bold">(หมด ${oosItems.length})</span>` : ''}
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-black text-emerald-700 text-xs">฿${stallItemsTotal}</div>
                    <button onclick="clearHubSettlementVendor('${stall.name.replace(/'/g, "\\'")}')" class="text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-2.5 py-0.5 rounded-lg font-bold mt-1 shadow-xs transition-all">โอนเคลียร์เงิน</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="bg-white rounded-3xl p-4 shadow-card border border-slate-200 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 class="font-bold text-sm text-slate-800 flex items-center gap-1">
                    <span class="material-symbols-outlined text-emerald-700 text-base">account_balance_wallet</span>
                    <span>สรุปยอดจ่ายแม่ค้า (${order.orderId})</span>
                </h3>
                <span class="text-[11px] text-slate-500 font-medium">ตลาดวิศิษฐ์ชัย</span>
            </div>

            <div class="space-y-2">
                ${vendorListHtml}
            </div>
        </div>

        <div class="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-4 shadow-card space-y-2">
            <div class="text-xs text-emerald-300 font-bold">รายรับรวมระบบจัดส่ง (ค่าสินค้า + ค่าบริการรวมบิล + ค่าส่ง)</div>
            <div class="text-2xl font-black">฿${order.grandTotal || order.total || 185} <span class="text-xs font-normal text-slate-300">บาท</span></div>
            <div class="text-[11px] text-slate-300 flex justify-between pt-2 border-t border-slate-700">
                <span>ยอดรวมร้านค้า: ฿${vendorTotal}</span>
                <span>ค่าส่ง+บริการรวมแผง: ฿${Math.max(20, (order.grandTotal || order.total || 185) - vendorTotal)}</span>
            </div>
        </div>
    `;
}

function clearHubSettlementVendor(vendorName) {
    showToast(`✓ โอนเงินผ่าน PromptPay เคลียร์ยอดให้ "${vendorName}" สำเร็จแล้ว!`);
}

function renderRiderScreen() {
    const order = state.activeOrder;
    const badge = document.getElementById("rider-order-id-badge");
    const totalBadge = document.getElementById("rider-order-total-badge");
    const destName = document.getElementById("rider-dest-name");
    const destDetail = document.getElementById("rider-dest-detail");
    const noteText = document.getElementById("rider-note-text");
    const mapsLink = document.getElementById("rider-maps-link");
    const statusBadge = document.getElementById("rider-current-status-badge");
    const refundAlert = document.getElementById("rider-refund-alert");
    const refundAmount = document.getElementById("rider-refund-alert-amount");
    const btnStart = document.getElementById("btn-rider-start-delivery");
    const btnStartText = document.getElementById("rider-btn-start-text");
    const btnStartIcon = document.getElementById("rider-btn-start-icon");
    const btnComplete = document.getElementById("btn-rider-complete-delivery");
    const btnCompleteText = document.getElementById("rider-btn-complete-text");
    const btnCompleteIcon = document.getElementById("rider-btn-complete-icon");
    const completedBanner = document.getElementById("rider-completed-banner");

    if (!order) {
        if (badge) badge.textContent = "ไม่มีงานค้าง";
        if (totalBadge) totalBadge.textContent = "฿0";
        if (destName) destName.textContent = "รอรับออเดอร์ใหม่จากฮับ";
        if (destDetail) destDetail.textContent = "ขณะนี้ไม่มีคิวจัดส่งที่มอบหมายให้คุณ";
        if (noteText) noteText.textContent = "-";
        if (statusBadge) {
            statusBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600";
            statusBadge.textContent = "พร้อมรับงาน";
        }
        if (refundAlert) refundAlert.classList.add("hidden");
        if (completedBanner) completedBanner.classList.add("hidden");
        return;
    }

    const destHouse = document.getElementById("rider-dest-house");
    const destSubdistrict = document.getElementById("rider-dest-subdistrict");
    const phoneBadge = document.getElementById("rider-phone-badge");
    const gpsCoords = document.getElementById("rider-gps-coords");
    const callBtnText = document.getElementById("rider-call-btn-text");

    const orderLat = order.lat || (state.deliveryLocation && state.deliveryLocation.lat) || MARKET_ORIGIN.lat;
    const orderLng = order.lng || (state.deliveryLocation && state.deliveryLocation.lng) || MARKET_ORIGIN.lng;
    const orderPhone = order.customerPhone || (state.customer && state.customer.phone) || "080-568-7733";

    if (badge) badge.textContent = `ออเดอร์ ${order.orderId}`;
    if (totalBadge) totalBadge.textContent = `฿${order.grandTotal || order.total || 0} (${order.paymentDesc || 'ชำระแล้ว'})`;
    if (destName) destName.textContent = order.customerName || "ลูกค้าประจำ";
    if (phoneBadge) phoneBadge.textContent = orderPhone;
    if (callBtnText) callBtnText.textContent = `โทรหาลูกค้า (${orderPhone})`;

    if (destHouse) {
        if (order.houseNumber) {
            destHouse.textContent = `${order.houseNumber} ${order.soiRoad || ''}`.trim();
        } else {
            destHouse.textContent = order.address || "ตามพิกัดดาวเทียม";
        }
    }
    if (destSubdistrict) {
        destSubdistrict.textContent = order.subdistrict || "อำเภอบ้านบึง จังหวัดชลบุรี";
    }
    if (destDetail) destDetail.textContent = `ที่อยู่: ${order.address || 'ตามพิกัดที่ลูกค้าระบุ'}`;
    if (noteText) noteText.textContent = order.landmark || order.deliveryNote || "-";
    if (gpsCoords) gpsCoords.textContent = `${Number(orderLat).toFixed(6)}, ${Number(orderLng).toFixed(6)}`;

    // Direct Turn-by-Turn GPS navigation link into Google Maps
    if (mapsLink) {
        mapsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${orderLat},${orderLng}`;
    }

    // Check Refund Amount (กรณีมีสินค้าขาด)
    let refundCashTotal = order.refundCashTotal || 0;
    if (refundCashTotal === 0 && order.stalls) {
        order.stalls.forEach(s => {
            (s.items || []).forEach(it => {
                if (it.outOfStock) {
                    refundCashTotal += (it.actualPrice !== undefined ? it.actualPrice : it.price);
                }
            });
        });
        order.refundCashTotal = refundCashTotal;
    }

    if (refundAlert) {
        if (refundCashTotal > 0 && order.status !== "delivered") {
            refundAlert.classList.remove("hidden");
            if (refundAmount) refundAmount.textContent = `฿${refundCashTotal}`;
        } else {
            refundAlert.classList.add("hidden");
        }
    }

    // Dynamic Button States based on order.status
    const status = order.status || "picking";

    if (status === "delivering") {
        if (statusBadge) {
            statusBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 animate-pulse";
            statusBadge.textContent = "🛵 กำลังออกส่ง";
        }
        if (btnStart) {
            btnStart.className = "p-3 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 text-xs active:scale-95 transition-all";
        }
        if (btnStartText) btnStartText.textContent = `✓ รับของแล้ว (${order.startedDeliveryAt || 'กำลังส่ง'})`;
        if (btnStartIcon) btnStartIcon.textContent = "check";

        if (btnComplete) {
            btnComplete.className = "p-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-1 text-xs ring-2 ring-emerald-400 ring-offset-2 animate-pulse active:scale-95 transition-all";
        }
        if (btnCompleteText) btnCompleteText.textContent = "2. ส่งมอบสำเร็จ (แตะเมื่อถึง)";
        if (btnCompleteIcon) btnCompleteIcon.textContent = "check_circle";

        if (completedBanner) completedBanner.classList.add("hidden");

    } else if (status === "delivered") {
        if (statusBadge) {
            statusBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800";
            statusBadge.textContent = "🎉 จัดส่งสำเร็จแล้ว";
        }
        if (btnStart) {
            btnStart.className = "p-3 bg-slate-100 text-slate-400 font-medium rounded-xl flex items-center justify-center gap-1 text-xs cursor-default";
        }
        if (btnStartText) btnStartText.textContent = "✓ รับของแล้ว";
        if (btnStartIcon) btnStartIcon.textContent = "check";

        if (btnComplete) {
            btnComplete.className = "p-3 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold rounded-xl flex items-center justify-center gap-1 text-xs cursor-default";
        }
        if (btnCompleteText) btnCompleteText.textContent = `✓ ส่งมอบสำเร็จแล้ว (${order.deliveredAt || '09:05 น.'})`;
        if (btnCompleteIcon) btnCompleteIcon.textContent = "verified";

        if (completedBanner) completedBanner.classList.remove("hidden");

    } else {
        // "picking" or initial status
        if (statusBadge) {
            statusBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800";
            statusBadge.textContent = "📦 รอรับของสดจากฮับ";
        }
        if (btnStart) {
            btnStart.className = "p-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 text-xs active:scale-95 transition-all";
        }
        if (btnStartText) btnStartText.textContent = "1. รับของแล้ว ออกส่ง";
        if (btnStartIcon) btnStartIcon.textContent = "two_wheeler";

        if (btnComplete) {
            btnComplete.className = "p-3 bg-slate-100 text-slate-400 font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 text-xs active:scale-95 transition-all";
        }
        if (btnCompleteText) btnCompleteText.textContent = "2. ส่งมอบสำเร็จ";
        if (btnCompleteIcon) btnCompleteIcon.textContent = "check_circle";

        if (completedBanner) completedBanner.classList.add("hidden");
    }
}

// Rider Login & Logout
function openRiderLoginModal() {
    document.getElementById("rider-login-modal").classList.remove("hidden");
}

function closeRiderLoginModal() {
    document.getElementById("rider-login-modal").classList.add("hidden");
}

function handleRiderLoginSubmit() {
    const riderSelect = document.getElementById("rider-select-input");
    const val = riderSelect ? riderSelect.value : "rider_somchai";
    const name = val === "rider_sombat" ? "พี่สมบัติ (2ขค 4511)" : "พี่สมชาย (1กข 8902)";

    state.activeRider = {
        isLoggedIn: true,
        riderId: val,
        name: name,
        phone: val === "rider_sombat" ? "082-999-8877" : "081-588-7400"
    };
    saveRiderToStorage(state.activeRider);
    closeRiderLoginModal();
    setActiveRoleView("rider");
    renderAuthHeaderButtons();
    showToast(`🎉 เข้าสู่ระบบไรเดอร์สำเร็จ! ยินดีต้อนรับ ${name}`);
}

function logoutRider() {
    state.activeRider = null;
    saveRiderToStorage(null);
    setActiveRoleView("customer");
    renderAuthHeaderButtons();
    showToast("🚪 ออกจากระบบไรเดอร์เรียบร้อยแล้ว");
}

function renderAuthHeaderButtons() {
    const container = document.getElementById("top-auth-buttons-container");
    if (!container) return;

    let html = "";

    // 1. Customer Section
    if (state.customer && state.customer.isLoggedIn) {
        const iconName = state.customer.type === "line" ? "chat" : "smartphone";
        html += `
            <div class="flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-500/40 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-xl text-xs md:text-sm shadow-xs">
                <span class="text-[11px] md:text-xs text-emerald-300 font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm md:text-base text-emerald-400">${iconName}</span>
                    <span>${state.customer.identifier}</span>
                </span>
                <button onclick="logoutCustomer()" class="text-[10px] md:text-xs text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-700 px-1.5 md:px-2 py-0.5 rounded-lg font-bold transition-all" title="ออกจากระบบลูกค้า">
                    ออกจากระบบ
                </button>
            </div>
        `;
    } else {
        html += `
            <button onclick="openCustomerLoginModal()" id="btn-customer-login" class="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-[11px] sm:text-xs md:text-sm flex items-center gap-1 shadow-xs active:scale-95 transition-all shrink-0">
                <span class="material-symbols-outlined text-sm">person</span>
                <span class="hidden xs:inline sm:inline">ลูกค้า</span>
            </button>
        `;
    }

    // 2. Merchant Section
    if (state.activeMerchant && state.activeMerchant.isLoggedIn) {
        html += `
            <div class="flex items-center gap-1 sm:gap-1.5 bg-amber-950/90 border border-amber-500/40 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs shadow-xs shrink-0">
                <span class="text-[11px] sm:text-xs text-amber-300 font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-400">store</span>
                    <span class="truncate max-w-[80px]">${state.activeMerchant.stallNumber || 'ร้านค้า'}</span>
                </span>
                <button onclick="loginAsMerchantStall('${state.activeMerchant.stallId}')" class="text-[10px] text-amber-200 bg-amber-800/80 hover:bg-amber-700 px-1.5 py-0.5 rounded font-bold transition-all">
                    จัดการ
                </button>
                <button onclick="logoutMerchant()" class="text-[10px] text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-700 px-1.5 py-0.5 rounded font-bold transition-all" title="ออกจากระบบร้านค้า">
                    ออก
                </button>
            </div>
        `;
    } else {
        html += `
            <button onclick="openMerchantLoginModal()" id="btn-merchant-login" class="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-[11px] sm:text-xs md:text-sm flex items-center gap-1 shadow-md active:scale-95 transition-all shrink-0">
                <span class="material-symbols-outlined text-sm font-bold">store</span>
                <span class="hidden xs:inline sm:inline">ร้านค้า</span>
            </button>
        `;
    }

    container.innerHTML = html;

    // 3. Admin Section (ย้ายไปไว้ที่แถบด้านล่างสุด)
    const bottomAdminContainer = document.getElementById("bottom-admin-container");
    if (bottomAdminContainer) {
        let adminHtml = "";
        if (state.activeAdmin && state.activeAdmin.isLoggedIn) {
            adminHtml = `
                <div class="flex items-center gap-1 sm:gap-1.5 bg-purple-950/90 border border-purple-500/40 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs shadow-xs shrink-0">
                    <span class="text-[11px] sm:text-xs text-purple-300 font-bold flex items-center gap-1 cursor-pointer" onclick="switchRole('admin')">
                        <span class="material-symbols-outlined text-sm sm:text-base text-purple-400">admin_panel_settings</span>
                        <span>${state.activeAdmin.name || 'เฮียส่ง'}</span>
                    </span>
                    <button onclick="switchRole('admin')" class="hidden sm:inline-block text-[10px] md:text-xs text-purple-200 bg-purple-800/80 hover:bg-purple-700 px-1.5 md:px-2 py-0.5 rounded-lg font-bold transition-all">
                        Admin
                    </button>
                    <button onclick="logoutAdmin()" class="text-[10px] md:text-xs text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-700 px-1.5 md:px-2 py-0.5 rounded-lg font-bold transition-all" title="ออกจากระบบแอดมิน">
                        ออก
                    </button>
                </div>
            `;
        } else {
            adminHtml = `
                <button onclick="handleAdminButtonClick()" id="btn-admin-login" class="px-3 py-1.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white text-[11px] sm:text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all shrink-0">
                    <span class="material-symbols-outlined text-sm font-bold">admin_panel_settings</span>
                    <span>Admin</span>
                </button>
            `;
        }
        bottomAdminContainer.innerHTML = adminHtml;
    }

    // Sync admin button in the role selector bar
    const adminBtnInBar = document.getElementById("role-btn-admin");
    if (adminBtnInBar) {
        if (state.activeAdmin && state.activeAdmin.isLoggedIn) {
            adminBtnInBar.classList.remove("hidden");
        } else {
            adminBtnInBar.classList.add("hidden");
        }
    }

    updateCustomerLoyaltyBanner();
}

function updateCustomerLoyaltyBanner() {
    const banner = document.getElementById("customer-loyalty-banner");
    if (!banner) return;

    if (state.customer && state.customer.isLoggedIn) {
        const id = state.customer.identifier || "ลูกค้า";
        const pts = state.customerPoints !== undefined ? state.customerPoints : 160;
        banner.innerHTML = `
            <div onclick="openCustomerWalletModal()" class="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-slate-950 rounded-2xl p-3 shadow-md border border-amber-300 flex items-center justify-between cursor-pointer hover:shadow-lg active:scale-[0.99] transition-all">
                <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                        🪙
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="font-black text-xs text-slate-950" id="loyalty-banner-name">คุณ ${id}</span>
                            <span class="text-[9px] bg-slate-950 text-amber-300 font-black px-1.5 py-0.2 rounded-full">👑 Platinum</span>
                        </div>
                        <div class="text-[11px] font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span>แต้มสะสม: <strong class="text-emerald-950 font-black text-xs" id="loyalty-banner-points">${pts} แต้ม</strong></span>
                            <span class="bg-emerald-900 text-emerald-100 text-[10px] px-1.5 py-0.2 rounded font-bold">🎟️ มีคูปองส่วนลด</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center text-slate-950 text-xs font-black gap-0.5 shrink-0 bg-white/50 hover:bg-white/70 px-2 py-1.5 rounded-xl transition-all shadow-2xs">
                    <span>กระเป๋า</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </div>
            </div>
        `;
    } else {
        banner.innerHTML = `
            <div onclick="openCustomerLoginModal()" class="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-2xl p-3 shadow-md border border-emerald-600 flex items-center justify-between cursor-pointer hover:shadow-lg active:scale-[0.99] transition-all">
                <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                        🎁
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="font-black text-xs text-amber-300">ยินดีต้อนรับสู่เฮียส่ง!</span>
                            <span class="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">รับ ฿20 ฟรี</span>
                        </div>
                        <div class="text-[11px] text-emerald-100 mt-0.5">
                            <span>แตะเพื่อ <strong>เข้าสู่ระบบ / สมัครสมาชิก</strong> สะสมแต้มรับของรางวัล</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center text-emerald-950 bg-amber-400 hover:bg-amber-300 text-xs font-black gap-1 shrink-0 px-2.5 py-1.5 rounded-xl transition-all shadow-sm">
                    <span>เข้าสู่ระบบ</span>
                    <span class="material-symbols-outlined text-sm">login</span>
                </div>
            </div>
        `;
    }
}

function openMerchantLoginModal() {
    const listEl = document.getElementById("merchant-stalls-login-list");
    if (listEl) {
        let html = "";
        MARKET_DATA.forEach(stall => {
            const emoji = stall.stallTag ? stall.stallTag.split(" ")[0] : "🏪";
            const owner = stall.ownerName || "เจ้าของแผงค้า";
            html += `
                <button onclick="loginAsMerchantStall('${stall.stallId}')" class="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex items-center justify-between text-xs text-slate-800 transition-all text-left group">
                    <div class="flex items-center gap-2">
                        <span class="text-base">${emoji}</span>
                        <div>
                            <div class="font-bold text-slate-800 group-hover:text-emerald-700">${stall.stallName}</div>
                            <div class="text-[10px] text-slate-400">${stall.stallNumber} • โซน ${stall.zone} • ${owner}</div>
                        </div>
                    </div>
                    <span class="text-[11px] text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">เข้าสู่ระบบ ></span>
                </button>
            `;
        });
        if (html === "") {
            html = `<div class="text-slate-400 text-center py-3 text-xs italic">ยังไม่มีร้านค้าในระบบ กดปุ่มด้านล่างเพื่อเปิดแผงค้าใหม่</div>`;
        }
        listEl.innerHTML = html;
    }
    document.getElementById("merchant-login-modal").classList.remove("hidden");
}

function closeMerchantLoginModal() {
    document.getElementById("merchant-login-modal").classList.add("hidden");
}

function closeMerchantPortalModal() {
    document.getElementById("merchant-portal-modal").classList.add("hidden");
}

function switchMerchantPortalTab(tabId) {
    document.querySelectorAll(".merchant-tab-pane").forEach(pane => pane.classList.add("hidden"));
    const activePane = document.getElementById(tabId);
    if (activePane) activePane.classList.remove("hidden");

    document.querySelectorAll(".merchant-tab-btn").forEach(btn => {
        btn.classList.remove("active", "bg-white", "text-emerald-800", "shadow-xs", "font-bold");
        btn.classList.add("bg-transparent", "text-slate-600", "font-medium");
    });

    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove("bg-transparent", "text-slate-600", "font-medium");
        activeBtn.classList.add("active", "bg-white", "text-emerald-800", "shadow-xs", "font-bold");
    }
}

function handleMerchantFileUpload(event, targetInputId, targetPreviewImgId) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert("กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้นครับ (JPEG, PNG, WEBP)");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const dataUrl = e.target.result;
        const input = document.getElementById(targetInputId);
        const preview = document.getElementById(targetPreviewImgId);
        if (input) input.value = dataUrl;
        if (preview) preview.src = dataUrl;
        showToast("📸 อัปโหลดรูปภาพสำเร็จเรียบร้อยแล้ว!");
    };
    reader.readAsDataURL(file);
}

function updateMerchantImagePreviews() {
    const stallImgUrl = document.getElementById("m-stall-image-url").value.trim();
    const ownerImgUrl = document.getElementById("m-owner-image-url").value.trim();

    const previewStall = document.getElementById("m-preview-stall-img");
    const previewOwner = document.getElementById("m-preview-owner-img");

    if (previewStall && stallImgUrl) previewStall.src = stallImgUrl;
    if (previewOwner && ownerImgUrl) previewOwner.src = ownerImgUrl;
}

function setMerchantStallImgPreset(type) {
    const url = MERCHANT_PRESET_IMAGES.stall[type] || MERCHANT_PRESET_IMAGES.stall.chicken;
    document.getElementById("m-stall-image-url").value = url;
    updateMerchantImagePreviews();
}

function setMerchantOwnerImgPreset(type) {
    const url = MERCHANT_PRESET_IMAGES.owner[type] || MERCHANT_PRESET_IMAGES.owner.man1;
    document.getElementById("m-owner-image-url").value = url;
    updateMerchantImagePreviews();
}

function loginAsMerchantStall(stallId) {
    closeMerchantLoginModal();
    activeMerchantStallId = stallId;

    let stall = MARKET_DATA.find(s => s.stallId === stallId) || ALL_100_STALLS.find(s => s.stallId === stallId);
    if (!stall) {
        stall = MARKET_DATA[0];
    }

    state.activeMerchant = {
        isLoggedIn: true,
        stallId: stall.stallId,
        stallName: stall.stallName,
        stallNumber: stall.stallNumber
    };
    saveMerchantToStorage(state.activeMerchant);
    renderAuthHeaderButtons();

    document.getElementById("merchant-portal-badge").textContent = stall.stallNumber || "แผงค้าพาร์ทเนอร์";
    document.getElementById("merchant-portal-zone-text").textContent = stall.zone || "โซนตลาดสด";
    document.getElementById("merchant-portal-title").textContent = `จัดการข้อมูล: ${stall.stallName}`;

    // Fill General Info
    document.getElementById("m-stall-name").value = stall.stallName || "";
    document.getElementById("m-stall-number").value = stall.stallNumber || "";
    document.getElementById("m-stall-zone").value = stall.zone ? `โซน ${stall.zone.charAt(0)}` : "โซน A (เนื้อสัตว์ & ไก่สด)";
    document.getElementById("m-stall-category").value = stall.category || "chicken";
    document.getElementById("m-owner-name").value = stall.ownerName || "เจ้าของแผงค้า";
    document.getElementById("m-phone").value = stall.phone || "081-234-5678";
    document.getElementById("m-experience").value = stall.experience || "เปิดบริการในตลาดสดกว่า 10 ปี";
    document.getElementById("m-highlight").value = stall.highlight || "สินค้าสดใหม่ คัดเกรดคุณภาพ";
    document.getElementById("m-desc").value = stall.description || "บริการสับ หั่น แยกชิ้นส่วนฟรี สด สะอาด พร้อมส่งถึงบ้าน";

    // Fill Images
    document.getElementById("m-stall-image-url").value = stall.stallImage || MERCHANT_PRESET_IMAGES.stall.chicken;
    document.getElementById("m-owner-image-url").value = stall.ownerImage || MERCHANT_PRESET_IMAGES.owner.man1;
    updateMerchantImagePreviews();

    // Fill Top 6 Products
    renderMerchantTop6ProductsForm(stall.products || []);

    // Fill Full Catalog Table
    const catalogData = getStallCatalogData(stallId);
    renderMerchantCatalogTable(catalogData);

    // Open Modal
    switchMerchantPortalTab("tab-info");
    document.getElementById("merchant-portal-modal").classList.remove("hidden");
    showToast(`🏪 เข้าสู่ระบบจัดการ: ${stall.stallName}`);
}

function registerNewMerchantStall() {
    closeMerchantLoginModal();
    activeMerchantStallId = "stall_new_" + Date.now();

    document.getElementById("merchant-portal-badge").textContent = "✨ ลงทะเบียนแผงค้าใหม่";
    document.getElementById("merchant-portal-zone-text").textContent = "โซนตลาดสด";
    document.getElementById("merchant-portal-title").textContent = "เทมเพลตเปิดแผงค้าใหม่ (เฮียส่ง Partner)";

    // Default template values
    document.getElementById("m-stall-name").value = "";
    document.getElementById("m-stall-number").value = "แผง A" + Math.floor(10 + Math.random() * 80);
    document.getElementById("m-stall-zone").value = "โซน A (เนื้อสัตว์ & ไก่สด)";
    document.getElementById("m-stall-category").value = "chicken";
    document.getElementById("m-owner-name").value = "";
    document.getElementById("m-phone").value = "";
    document.getElementById("m-experience").value = "เปิดบริการในตลาดสด";
    document.getElementById("m-highlight").value = "วัตถุดิบสดใหม่ สะอาด ถูกสุขอนามัย";
    document.getElementById("m-desc").value = "คัดสรรวัตถุดิบคุณภาพ พร้อมจัดส่งถึงบ้านคุณ";

    document.getElementById("m-stall-image-url").value = MERCHANT_PRESET_IMAGES.stall.chicken;
    document.getElementById("m-owner-image-url").value = MERCHANT_PRESET_IMAGES.owner.man1;
    updateMerchantImagePreviews();

    // Blank top 6 template
    const blankProducts = [
        { name: "สินค้าไฮไลท์ 1", desc: "สดใหม่ คัดเกรดพรีเมียม", price: 85, unit: "1 กก.", badge: "⭐ แนะนำ", image: MERCHANT_PRESET_IMAGES.stall.chicken },
        { name: "สินค้าไฮไลท์ 2", desc: "ยอดนิยมประจำร้าน", price: 50, unit: "500 กรัม", badge: "🔥 ยอดฮิต", image: MERCHANT_PRESET_IMAGES.stall.chicken },
        { name: "สินค้าไฮไลท์ 3", desc: "คุณภาพสดใหม่ สะอาด", price: 60, unit: "แพ็ค", badge: "✨ สดใหม่", image: MERCHANT_PRESET_IMAGES.stall.chicken },
        { name: "สินค้าไฮไลท์ 4", desc: "วัตถุดิบคุณภาพดี", price: 45, unit: "500 กรัม", badge: "", image: MERCHANT_PRESET_IMAGES.stall.chicken },
        { name: "สินค้าไฮไลท์ 5", desc: "บริการตัดแต่งฟรี", price: 90, unit: "1 กก.", badge: "", image: MERCHANT_PRESET_IMAGES.stall.chicken },
        { name: "สินค้าไฮไลท์ 6", desc: "เมนูพิเศษประจำวัน", price: 40, unit: "ชุด", badge: "", image: MERCHANT_PRESET_IMAGES.stall.chicken }
    ];
    renderMerchantTop6ProductsForm(blankProducts);

    // Blank Catalog Table template
    const blankCatalog = [
        {
            groupName: "หมวดหมู่สินค้าหลัก",
            items: [
                { id: "item_1", name: "รายการสินค้า 1", spec: "สเปกมาตรฐาน คัดสด", price: 85, unit: "กก." },
                { id: "item_2", name: "รายการสินค้า 2", spec: "แพ็กถุงสุญญากาศ", price: 50, unit: "500g" },
                { id: "item_3", name: "รายการสินค้า 3", spec: "ตัดแต่งพร้อมปรุง", price: 60, unit: "แพ็ค" }
            ]
        }
    ];
    renderMerchantCatalogTable(blankCatalog);

    switchMerchantPortalTab("tab-info");
    document.getElementById("merchant-portal-modal").classList.remove("hidden");
    showToast("📝 เริ่มกรอกเทมเพลตข้อมูลร้านค้าของคุณได้เลยครับ");
}

function renderMerchantTop6ProductsForm(products) {
    const container = document.getElementById("merchant-top6-products-container");
    if (!container) return;

    let html = "";
    for (let i = 0; i < 6; i++) {
        const p = products[i] || { name: "", desc: "", price: 0, unit: "กก.", badge: "", image: MERCHANT_PRESET_IMAGES.stall.chicken };
        const pImg = p.image || MERCHANT_PRESET_IMAGES.stall.chicken;
        html += `
            <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <div class="flex items-center justify-between">
                    <span class="font-extrabold text-emerald-800 flex items-center gap-1.5">
                        <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">${i + 1}</span>
                        <span>สินค้าไฮไลท์รายการที่ ${i + 1}</span>
                    </span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">แสดงบนการ์ดหน้าแรก</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div class="sm:col-span-2">
                        <label class="block text-[10px] font-bold text-slate-700 mb-0.5">ชื่อสินค้า <span class="text-rose-500">*</span></label>
                        <input type="text" id="m-p-name-${i}" value="${p.name || ''}" placeholder="เช่น อกไก่ลอกหนัง, น่องติดสะโพก" class="w-full p-2 rounded-xl bg-white border border-slate-300 font-bold text-xs">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-700 mb-0.5">ป้ายสินค้า (Badge)</label>
                        <input type="text" id="m-p-badge-${i}" value="${p.badge || ''}" placeholder="เช่น ⭐ แนะนำ, 🔥 ยอดฮิต" class="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-700 mb-0.5">คำอธิบาย / สเปกสินค้า</label>
                        <input type="text" id="m-p-desc-${i}" value="${p.desc || ''}" placeholder="เช่น ไร้มัน ปลอดสารเร่งโต" class="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-700 mb-0.5">ราคา (บาท)</label>
                        <input type="number" id="m-p-price-${i}" value="${p.price || 0}" class="w-full p-2 rounded-xl bg-white border border-slate-300 font-bold text-emerald-700 text-xs">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-700 mb-0.5">หน่วยขาย</label>
                        <input type="text" id="m-p-unit-${i}" value="${p.unit || 'กก.'}" placeholder="เช่น กก., 500 กรัม, กำ" class="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs">
                    </div>
                </div>

                <!-- Product Image Upload / URL Row -->
                <div class="pt-1 border-t border-slate-200/60 flex items-center gap-2.5">
                    <img id="m-p-preview-${i}" src="${pImg}" alt="พรีวิวสินค้า" class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white">
                    <div class="flex-1 space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <label class="cursor-pointer px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold text-[11px] flex items-center gap-1 active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-xs text-emerald-600">upload_file</span>
                                <span>📁 อัปโหลดรูปสินค้าจากเครื่อง</span>
                                <input type="file" accept="image/*" onchange="handleMerchantFileUpload(event, 'm-p-img-${i}', 'm-p-preview-${i}')" class="hidden">
                            </label>
                            <span class="text-[10px] text-slate-400">หรือใส่ลิงก์รูปภาพ:</span>
                        </div>
                        <input type="text" id="m-p-img-${i}" value="${pImg}" oninput="document.getElementById('m-p-preview-${i}').src = this.value" placeholder="URL ลิงก์รูปภาพ..." class="w-full p-1.5 rounded-lg bg-white border border-slate-300 text-[11px]">
                    </div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function renderMerchantCatalogTable(groups) {
    const tbody = document.getElementById("merchant-catalog-table-body");
    if (!tbody) return;

    let rowsHtml = "";
    let rowIndex = 1;

    if (groups && groups.length > 0) {
        groups.forEach(g => {
            if (g.items) {
                g.items.forEach(item => {
                    rowsHtml += createMerchantTableRow(rowIndex++, g.groupName || "หมวดทั่วไป", item.name, item.spec, item.price, item.unit);
                });
            }
        });
    }

    if (rowsHtml === "") {
        rowsHtml = createMerchantTableRow(1, "หมวดทั่วไป", "รายการสินค้าตัวอย่าง", "สเปกมาตรฐาน", 50, "กก.");
    }

    tbody.innerHTML = rowsHtml;
}

function createMerchantTableRow(index, groupName, name, spec, price, unit) {
    return `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="p-2 text-center text-slate-400 font-bold text-[10px]">${index}</td>
            <td class="p-1.5"><input type="text" value="${groupName || ''}" placeholder="หมวดหมู่ย่อย" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-medium"></td>
            <td class="p-1.5"><input type="text" value="${name || ''}" placeholder="ชื่อสินค้า" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold"></td>
            <td class="p-1.5"><input type="text" value="${spec || ''}" placeholder="สเปก/ขนาด" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs text-slate-600"></td>
            <td class="p-1.5"><input type="number" value="${price || 0}" placeholder="ราคา" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-emerald-700"></td>
            <td class="p-1.5"><input type="text" value="${unit || 'กก.'}" placeholder="หน่วย" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs"></td>
            <td class="p-1.5 text-center">
                <button type="button" onclick="deleteMerchantCatalogRow(this)" class="w-6 h-6 rounded-md hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-all mx-auto" title="ลบแถว">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </td>
        </tr>
    `;
}

function addMerchantCatalogRow() {
    const tbody = document.getElementById("merchant-catalog-table-body");
    if (!tbody) return;
    const newIndex = tbody.children.length + 1;
    const newRow = document.createElement("tr");
    newRow.className = "hover:bg-slate-50 transition-colors";
    newRow.innerHTML = `
        <td class="p-2 text-center text-slate-400 font-bold text-[10px]">${newIndex}</td>
        <td class="p-1.5"><input type="text" value="หมวดใหม่" placeholder="หมวดหมู่ย่อย" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-medium"></td>
        <td class="p-1.5"><input type="text" value="" placeholder="ชื่อสินค้า" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold"></td>
        <td class="p-1.5"><input type="text" value="" placeholder="สเปก/ขนาด" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs text-slate-600"></td>
        <td class="p-1.5"><input type="number" value="0" placeholder="ราคา" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-emerald-700"></td>
        <td class="p-1.5"><input type="text" value="กก." placeholder="หน่วย" class="w-full p-1.5 rounded-lg border border-slate-200 text-xs"></td>
        <td class="p-1.5 text-center">
            <button type="button" onclick="deleteMerchantCatalogRow(this)" class="w-6 h-6 rounded-md hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-all mx-auto" title="ลบแถว">
                <span class="material-symbols-outlined text-sm">delete</span>
            </button>
        </td>
    `;
    tbody.appendChild(newRow);
}

function deleteMerchantCatalogRow(btn) {
    const row = btn.closest("tr");
    if (row) {
        row.remove();
        // Re-index rows
        const rows = document.querySelectorAll("#merchant-catalog-table-body tr");
        rows.forEach((r, idx) => {
            const firstCell = r.querySelector("td");
            if (firstCell) firstCell.textContent = idx + 1;
        });
    }
}

function saveMerchantStallData() {
    const stallName = document.getElementById("m-stall-name").value.trim();
    const stallNumber = document.getElementById("m-stall-number").value.trim();
    const zoneVal = document.getElementById("m-stall-zone").value;
    const category = document.getElementById("m-stall-category").value;
    const ownerName = document.getElementById("m-owner-name").value.trim();
    const phone = document.getElementById("m-phone").value.trim();
    const experience = document.getElementById("m-experience").value.trim();
    const highlight = document.getElementById("m-highlight").value.trim();
    const desc = document.getElementById("m-desc").value.trim();

    const stallImage = document.getElementById("m-stall-image-url").value.trim() || MERCHANT_PRESET_IMAGES.stall.chicken;
    const ownerImage = document.getElementById("m-owner-image-url").value.trim() || MERCHANT_PRESET_IMAGES.owner.man1;

    if (!stallName || !stallNumber || !ownerName || !phone) {
        alert("กรุณากรอกข้อมูลสำคัญให้ครบถ้วน: ชื่อร้านค้า, หมายเลขแผง, ชื่อเจ้าของร้าน และเบอร์โทรศัพท์");
        switchMerchantPortalTab("tab-info");
        return;
    }

    // Collect 6 products
    const products = [];
    for (let i = 0; i < 6; i++) {
        const name = document.getElementById(`m-p-name-${i}`)?.value.trim() || `สินค้า ${i + 1}`;
        const badge = document.getElementById(`m-p-badge-${i}`)?.value.trim() || "";
        const pDesc = document.getElementById(`m-p-desc-${i}`)?.value.trim() || "";
        const price = parseFloat(document.getElementById(`m-p-price-${i}`)?.value || "0") || 50;
        const unit = document.getElementById(`m-p-unit-${i}`)?.value.trim() || "กก.";

        const pImage = document.getElementById(`m-p-img-${i}`)?.value.trim() || stallImage;

        products.push({
            id: `${activeMerchantStallId}_p${i + 1}`,
            name: name,
            desc: pDesc,
            price: price,
            unit: unit,
            badge: badge,
            image: pImage
        });
    }

    // Collect full catalog rows
    const tableRows = document.querySelectorAll("#merchant-catalog-table-body tr");
    const groupMap = {};

    tableRows.forEach((r, idx) => {
        const inputs = r.querySelectorAll("input");
        if (inputs.length >= 5) {
            const group = inputs[0].value.trim() || "หมวดหมู่ทั่วไป";
            const itemName = inputs[1].value.trim();
            const itemSpec = inputs[2].value.trim();
            const itemPrice = parseFloat(inputs[3].value || "0") || 0;
            const itemUnit = inputs[4].value.trim() || "กก.";

            if (itemName) {
                if (!groupMap[group]) groupMap[group] = [];
                groupMap[group].push({
                    id: `cat_${activeMerchantStallId}_${idx + 1}`,
                    name: itemName,
                    spec: itemSpec,
                    price: itemPrice,
                    unit: itemUnit
                });
            }
        }
    });

    const catalogGroups = Object.keys(groupMap).map(g => ({
        groupName: g,
        items: groupMap[g]
    }));

    // Update Extended Catalog Database
    STALL_CATALOG_DATABASE[activeMerchantStallId] = catalogGroups;

    // Create or update stall object
    const stallObj = {
        stallId: activeMerchantStallId,
        stallName: stallName,
        stallNumber: stallNumber,
        zone: zoneVal.replace("โซน ", "").replace(/\(.*\)/, "").trim(),
        category: category,
        ownerName: ownerName,
        phone: phone,
        experience: experience,
        highlight: highlight,
        description: desc,
        stallImage: stallImage,
        ownerImage: ownerImage,
        stallTag: `${stallName} ${ownerName} ${highlight}`,
        products: products
    };

    // Update MARKET_DATA
    const existingIndex = MARKET_DATA.findIndex(s => s.stallId === activeMerchantStallId);
    if (existingIndex >= 0) {
        MARKET_DATA[existingIndex] = stallObj;
    } else {
        MARKET_DATA.unshift(stallObj);
    }

    // Update ALL_100_STALLS
    const allIndex = ALL_100_STALLS.findIndex(s => s.stallId === activeMerchantStallId);
    if (allIndex >= 0) {
        ALL_100_STALLS[allIndex] = stallObj;
    } else {
        ALL_100_STALLS.unshift(stallObj);
    }

    saveMarketDataToStorage();

    closeMerchantPortalModal();
    renderCatalog();
    renderDirectoryList();
    renderFavoriteStallsBar();

    // Focus view on this newly saved stall
    filterBySingleStall(activeMerchantStallId);
    showToast(`🎉 บันทึกและเปิดหน้าร้าน "${stallName}" เรียบร้อยแล้ว!`);
}

function previewMerchantLiveStore() {
    saveMerchantStallData();
}

// ==========================================
// HERO PROMOTIONAL BANNER CAROUSEL (3 BANNERS)
// ==========================================
let _currentHeroSlide = 0;
let _heroBannerInterval = null;
let _heroTouchStartX = 0;
let _heroTouchEndX = 0;

function goToHeroBannerSlide(index) {
    const track = document.getElementById("hero-carousel-track");
    const dots = document.querySelectorAll(".hero-dot");
    if (!track) return;

    _currentHeroSlide = (index + 3) % 3;
    track.style.transform = `translateX(-${_currentHeroSlide * 100}%)`;

    dots.forEach((dot, idx) => {
        if (idx === _currentHeroSlide) {
            dot.className = "hero-dot active w-5 h-1.5 rounded-full bg-emerald-400 transition-all shadow-xs";
        } else {
            dot.className = "hero-dot w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white transition-all";
        }
    });
}

function nextHeroBannerSlide(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    goToHeroBannerSlide(_currentHeroSlide + 1);
    restartHeroBannerAutoplay();
}

function prevHeroBannerSlide(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    goToHeroBannerSlide(_currentHeroSlide - 1);
    restartHeroBannerAutoplay();
}

function startHeroBannerAutoplay() {
    stopHeroBannerAutoplay();
    _heroBannerInterval = setInterval(() => {
        goToHeroBannerSlide(_currentHeroSlide + 1);
    }, 4500);
}

function stopHeroBannerAutoplay() {
    if (_heroBannerInterval) {
        clearInterval(_heroBannerInterval);
        _heroBannerInterval = null;
    }
}

function restartHeroBannerAutoplay() {
    startHeroBannerAutoplay();
}

function handleHeroBannerClick(index) {
    if (index === 0) {
        // Slide 1: ตลาดสดพรีเมี่ยม
        const catalogEl = document.getElementById("categories-container") || document.getElementById("catalog-section");
        if (catalogEl) {
            catalogEl.scrollIntoView({ behavior: "smooth" });
        }
        showToast("🛒 เลือกชมของสดคัดเกรดจาก 100 แผงค้าตลาดวิศิษฐ์ชัยได้เลยครับ");
    } else if (index === 1) {
        // Slide 2: เฮียส่ง ส่งตรงถึงมือคุณ รวดเร็ว ทันใจ
        openLocationModal();
        showToast("🛵 ระบุพิกัดจัดส่งเพื่อเช็ครอบส่งด่วน 30 นาทีถึงหน้าบ้าน");
    } else if (index === 2) {
        // Slide 3: คูปองส่วนลดพิเศษ WELCOMESONG ส่งฟรี
        const couponCode = "WELCOMESONG";
        try {
            if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(couponCode).catch(() => {});
            }
        } catch (e) {}
        showToast(`🎉 รับสิทธิ์คูปอง '${couponCode}' ส่วนลดค่าส่งเรียบร้อยแล้ว!`);
    }
}

function initHeroBannerCarousel() {
    const container = document.getElementById("hero-banner-carousel-container");
    if (!container) return;

    // Attach touch listeners for mobile swipe
    container.addEventListener("touchstart", (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            _heroTouchStartX = e.changedTouches[0].screenX;
        }
        stopHeroBannerAutoplay();
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            _heroTouchEndX = e.changedTouches[0].screenX;
            const diff = _heroTouchStartX - _heroTouchEndX;
            if (Math.abs(diff) > 35) {
                if (diff > 0) nextHeroBannerSlide();
                else prevHeroBannerSlide();
            }
        }
        startHeroBannerAutoplay();
    }, { passive: true });

    container.addEventListener("mouseenter", stopHeroBannerAutoplay);
    container.addEventListener("mouseleave", startHeroBannerAutoplay);

    goToHeroBannerSlide(0);
    startHeroBannerAutoplay();
}

// Window registrations
window.goToHeroBannerSlide = goToHeroBannerSlide;
window.nextHeroBannerSlide = nextHeroBannerSlide;
window.prevHeroBannerSlide = prevHeroBannerSlide;
window.handleHeroBannerClick = handleHeroBannerClick;
window.initHeroBannerCarousel = initHeroBannerCarousel;

// ==========================================
// INITIALIZE APPLICATION
// ==========================================
function initTalatHubApp() {
    state.customer = loadSavedCustomer();
    state.activeMerchant = loadSavedMerchant();
    state.activeHub = loadSavedHub();
    state.activeRider = loadSavedRider();
    state.activeAdmin = loadSavedAdmin();
    state.favorites = loadSavedFavorites();
    state.deliveryLocation = loadSavedLocation();

    setActiveRoleView("customer");
    renderScreenModeButton();
    updateDeliveryLocationUI();
    renderAuthHeaderButtons();
    updateCustomerLoyaltyBanner();
    renderFavoriteStallsBar();
    renderCatalog();
    updateCartUI();
    initHeroBannerCarousel();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTalatHubApp);
} else {
    initTalatHubApp();
}

