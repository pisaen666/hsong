// ใส่ข้อความอันตรายจำลองลง hsong-test (โปรเจกต์ทดสอบเท่านั้น!) เหมือนที่คนแปลกหน้าทำได้ เพื่อพิสูจน์ว่าเว็บป้องกันได้
//   ขั้นตอนเต็มอยู่ใน CLAUDE.md หัวข้อ 5e (ต้องเปิดกฎฐานข้อมูลทดสอบชั่วคราว แล้วคืนกฎเดิมทุกครั้ง)
// Seed hsong-test (TEST project only!) with attack strings, as an anonymous stranger would.
// usage: node seed-poison.js seed | clean
const DB = "https://hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app";
const mode = process.argv[2];
const T = tag => `__xssHits=(typeof __xssHits==='undefined'?'':__xssHits)+'${tag},'`;   // value payload (no dots/slashes needed)
const IMG = tag => `<img src=x onerror="${T(tag)}">`;
const ATTR = tag => `"><img src=x onerror="${T(tag)}">`;                                  // breaks out of value="..."
// id payload: must be a legal Firebase key (no . $ # [ ] /) and break out of onclick="fn('ID')"
const IDP = tag => `ZZX${tag}');__xssHits=(typeof __xssHits==="undefined"?"":__xssHits)+"id-${tag},";('`;

const items = {
    // rider application (anyone may create, pending)
    [`rider_applications/${encodeURIComponent(IDP("rapp"))}`]: {
        id: IDP("rapp"), fullName: IMG("rapp-fullName"), nickname: IMG("rapp-nick"), phone: IMG("rapp-phone"), lineId: IMG("rapp-line"),
        motorcycleModel: IMG("rapp-model"), motorcycleColor: IMG("rapp-color"), plate: IMG("rapp-plate"), promptPay: IMG("rapp-pp"),
        status: "pending", accessCode: "ZZXRAPP", appliedAt: new Date().toISOString()
    },
    [`merchant_applications/${encodeURIComponent(IDP("mapp"))}`]: {
        id: IDP("mapp"), status: "pending",
        stallData: { stallId: "ZZXMAPP", stallName: IMG("mapp-stallName"), ownerName: IMG("mapp-owner"), phone: IMG("mapp-phone"), stallNumber: IMG("mapp-num"), zone: IMG("mapp-zone"), category: IMG("mapp-cat"), story: IMG("mapp-story") }
    },
    // orders / carts: open nodes
    "orders/ZZXORDER1": {
        orderId: "ZZXORDER1", customerName: IMG("order-cust"), customerPhone: IMG("order-phone"), address: IMG("order-addr"), deliveryAddress: IMG("order-daddr"),
        deliveryNote: IMG("order-note"), status: "picking", createdAt: new Date().toISOString(), total: 100, grandTotal: 100,
        items: [{ name: IMG("order-item"), qty: 1, price: 100, unit: IMG("order-unit"), stallId: "ZZSEEDS0", stallName: IMG("order-stall") }]
    },
    [`orders/${encodeURIComponent(IDP("ord"))}`]: {
        orderId: IDP("ord"), customerName: "x", status: "picking", createdAt: new Date().toISOString(), total: 1, items: []
    },
    "riders/ZZXRIDER1": { id: "ZZXRIDER1", name: IMG("riders-node-name"), phone: IMG("riders-node-phone"), status: "available" },
    "rider_status/ZZXRIDER1": { name: IMG("rider_status-name"), status: "online" },
    // existing seeded items: update text fields (allowed for strangers, only id/accessCode/phone are locked)
    "community_riders/ZZSEEDR0": { id: "ZZSEEDR0", accessCode: "ZZSEEDR0", phone: "0822222222", name: IMG("crider-name"), plate: IMG("crider-plate"), motorcycleModel: IMG("crider-model"), status: "available" },
    "custom_market_stalls/ZZSEEDS0": { stallId: "ZZSEEDS0", accessCode: "222222", stallName: IMG("stall-name"), ownerName: IMG("stall-owner"), stallNumber: IMG("stall-num"), zone: IMG("stall-zone"), category: IMG("stall-cat"), story: IMG("stall-story") },
    "stall_catalog_database/ZZSEEDS0": [{ name: IMG("catalog-item"), price: 100, unit: IMG("catalog-unit"), id: "p1" }]
};

(async () => {
    for (const [p, v] of Object.entries(items)) {
        const url = `${DB}/${p}.json`;
        const res = mode === "clean" && !p.startsWith("community_riders/ZZSEEDR0") && !p.startsWith("custom_market_stalls/ZZSEEDS0") && !p.startsWith("stall_catalog_database/ZZSEEDS0")
            ? await fetch(url, { method: "DELETE" })
            : mode === "clean"
                ? await fetch(url, { method: "PUT", body: JSON.stringify(RESTORE[p]) })
                : await fetch(url, { method: "PUT", body: JSON.stringify(v) });
        console.log(mode, res.status, decodeURIComponent(p).slice(0, 60));
    }
})();

const RESTORE = {
    "community_riders/ZZSEEDR0": { id: "ZZSEEDR0", name: "เดิม", phone: "0822222222", accessCode: "ZZSEEDR0", status: "available" },
    "custom_market_stalls/ZZSEEDS0": { stallId: "ZZSEEDS0", stallName: "เดิม", accessCode: "222222" },
    "stall_catalog_database/ZZSEEDS0": [{ name: "หมู", price: 100 }]
};
