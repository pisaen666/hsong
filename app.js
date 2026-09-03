// TalatHub (ตลาดฮับ) - Application Core Logic with 100 Stalls Directory

// 1. Data Store: 5 Stalls per Category x 6 Products each + 3x3m Stall Profile
const MARKET_DATA = [
    // ========================================================
    // CATEGORY 1: CHICKEN & MEAT (ไก่สด & เนื้อสัตว์ - 5 ร้าน x 6 สินค้า)
    // ========================================================
    {
        stallId: "stall_chicken",
        stallName: "ร้านไก่สดของเรา (Hub กลาง)",
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
        ownerName: "คุณเอกชัย (เจ้าของร้าน & หัวหน้า Hub)",
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
    },
    {
        stallId: "stall_a02",
        stallName: "ไก่บ้านอินทรีย์ลุงโต้ง",
        stallNumber: "แผง A02",
        zone: "A",
        category: "chicken",
        stallTag: "🍗 ไก่บ้านพันธุ์แท้",
        dimension: "3×3 เมตร",
        badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
        isHub: false,
        stallImage: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงโต้ง ไก่บ้านแท้",
        phone: "081-456-7890",
        experience: "เพาะเลี้ยงธรรมชาติ 12 ปี",
        highlight: "ไก่บ้านไทยพันธุ์แท้ เนื้อแน่น หนังกรอบ ไร้สารเร่งโต",
        shopDescription: "คัดสรรไก่บ้านสดชำแหละทั้งตัว เครื่องในไก่สดรวม ตับหวาน กึ๋นกรอบ เอ็นข้อไก่ทอด และตีนไก่ต้มซุปเปอร์ รสชาติหวานธรรมชาติ เนื้อไม่เหนียว เหมาะกับทุกเมนูต้มยำ",
        products: [
            { id: "chkb_01", name: "ไก่บ้านสดชำแหละทั้งตัว", desc: "เนื้อแน่น หนังกรอบ ต้มยำแซ่บ", price: 180, unit: "1 ตัว (~1.2กก.)", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: "🌟 พันธุ์แท้" },
            { id: "chkb_02", name: "เครื่องในไก่สดรวมมิตร", desc: "ตับ กึ๋น หัวใจ ล้างสะอาดไม่คาว", price: 45, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chkb_03", name: "ตับไก่สดคัดชิ้นใหญ่", desc: "ตับสดหวาน ผัดกะเพรา/ผัดกระเทียม", price: 40, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chkb_04", name: "กึ๋นไก่สดกรอบเด้ง", desc: "กึ๋นไก่คัดพิเศษ ล้างสะอาดเอี่ยม", price: 45, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chkb_05", name: "เอ็นข้อไก่สดทำของทอด", desc: "กรุบกรอบ ทอดคลุกงาเลิศรส", price: 60, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "chkb_06", name: "ตีนไก่สดต้มซุปเปอร์", desc: "ตีนไก่สดเลาะเล็บ ต้มซุปเปอร์เปื่อยไว", price: 45, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a03",
        stallName: "เนื้อโคขุนโพนยางคำ บังดุล",
        stallNumber: "แผง A03",
        zone: "A",
        category: "chicken",
        stallTag: "🥩 เนื้อฮาลาล 100%",
        dimension: "3×3 เมตร",
        badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
        isHub: false,
        stallImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        ownerName: "บังดุล โคขุน",
        phone: "086-789-0123",
        experience: "เขียงเนื้อฮาลาลแท้ 18 ปี",
        highlight: "เนื้อโคขุนไทยพรีเมียม สด ลายไขมันสวย ฮาลาลถูกต้อง 100%",
        shopDescription: "จำหน่ายเนื้อโคขุนสไลซ์ชาบู สันนอกสเต็ก เสือร้องไห้ย่าง เนื้อน่องลายตุ๋นยาจีน เนื้อบดล้วนไม่ปนมัน และเอ็นแก้ว สดสะอาด ตัดแต่งตามสั่งทุกวัน",
        products: [
            { id: "beef_01", name: "เนื้อสันคอโคขุนสไลซ์", desc: "นุ่มละมุน ลายไขมันสวย สำหรับชาบู/ผัด", price: 160, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80", badge: "🥩 เกรดพรีเมียม" },
            { id: "beef_02", name: "เนื้อน่องลายตุ๋นยาจีน", desc: "เอ็นแทรกในเนื้อ ตุ๋นแล้วละลายในปาก", price: 140, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1588347818036-558601350947?w=400&auto=format&fit=crop&q=80", badge: "🔥 ยอดฮิต" },
            { id: "beef_03", name: "เนื้อบดโคขุนล้วน", desc: "บดสดใหม่ ไม่ปนมัน ทำกะเพราเนื้อหอม", price: 120, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "beef_04", name: "เนื้อเสือร้องไห้ติดมัน", desc: "สำหรับย่างจิ้มแจ่ว หอมมันฉ่ำ", price: 150, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "beef_05", name: "สันนอกโคขุนตัดสเต็ก", desc: "ชิ้นหนา 1 นิ้ว ย่างสเต็กนุ่มชุ่มฉ่ำ", price: 180, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1588347818036-558601350947?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "beef_06", name: "เอ็นแก้ววัวสดสำหรับต้ม", desc: "เอ็นแก้วแท้ กรุบกรับ ต้มแซ่บเนื้อเลิศรส", price: 110, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a04",
        stallName: "เป็ดสดพะโล้ แม่สายใจ",
        stallNumber: "แผง A04",
        zone: "A",
        category: "chicken",
        stallTag: "🦆 เป็ดเชอร์รี่คัดเกรด",
        dimension: "3×3 เมตร",
        badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
        isHub: false,
        stallImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "แม่สายใจ",
        phone: "082-345-6789",
        experience: "สูตรเป็ดเชอร์รี่แท้ 20 ปี",
        highlight: "เป็ดเชอร์รี่ตัวโต เนื้อหนา ไร้กลิ่นสาบ ชำแหละสดใหม่",
        shopDescription: "จำหน่ายเป็ดสดทั้งตัว อกเป็ด น่องติดสะโพก เลือดเป็ดก้อน ปีกเป็ด และตับเป็ดสดมันนุ่ม สำหรับทำเป็ดพะโล้ เป็ดย่าง และก๋วยเตี๋ยวเป็ดรสเด็ด",
        products: [
            { id: "duck_01", name: "เป็ดสดเชอร์รี่ทั้งตัว", desc: "ตัวอวบ เนื้อหนา ไม่มีกลิ่นสาบ", price: 230, unit: "1 ตัว (~2กก.)", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "duck_02", name: "อกเป็ดสดลอกหนัง", desc: "โปรตีนสูง เนื้อแน่น นุ่ม", price: 95, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "duck_03", name: "น่องเป็ดสดติดสะโพก", desc: "เนื้อนุ่มฉ่ำ ตุ๋นเป็ดย่าง", price: 85, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "duck_04", name: "เลือดเป็ดสดก้อนนุ่ม", desc: "ก้อนสวย ต้มต้มเลือดหมูหรือใส่ก๋วยเตี๋ยว", price: 15, unit: "2 ก้อน", category: "chicken", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "duck_05", name: "ปีกเป็ดสดต้มพะโล้", desc: "ปีกใหญ่ เอ็นนุ่ม ต้มเปื่อยง่าย", price: 65, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "duck_06", name: "ตับเป็ดสดมันนุ่มลิ้น", desc: "หวาน มัน ไร้กลิ่นคาว", price: 70, unit: "500 กรัม", category: "chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a05",
        stallName: "ไข่ไก่สดฟาร์มลุงบุญ",
        stallNumber: "แผง A05",
        zone: "A",
        category: "chicken",
        stallTag: "🥚 ไข่สดวันต่อวัน",
        dimension: "3×3 เมตร",
        badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
        isHub: false,
        stallImage: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงบุญ ฟาร์มไข่สด",
        phone: "083-987-6543",
        experience: "ส่งตรงจากฟาร์ม 16 ปี",
        highlight: "ไข่ไก่-ไข่เป็ดสดใหม่วันต่อวัน เปลือกสะอาด ไข่แดงนูนกลม",
        shopDescription: "จำหน่ายไข่ไก่เบอร์ 0, เบอร์ 2 ไข่เป็ดไล่ทุ่งไข่แดงมันเยิ้ม ไข่เค็มไชยา ไข่เยี่ยวม้าทองคำ และพวงไข่อ่อนสด คัดเกรดคุณภาพพรีเมียมทุกฟอง",
        products: [
            { id: "egg_01", name: "ไข่ไก่สดเบอร์ 0 (แผงใหญ่)", desc: "ฟองโต ไข่แดงนูน สดจากฟาร์ม", price: 135, unit: "1 แผง (30 ฟอง)", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: "🌟 สดจากฟาร์ม" },
            { id: "egg_02", name: "ไข่ไก่สดเบอร์ 2", desc: "ขนาดมาตรฐาน ทำอาหารได้ทุกเมนู", price: 120, unit: "1 แผง (30 ฟอง)", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "egg_03", name: "ไข่เป็ดไล่ทุ่งสดใหม่", desc: "ไข่แดงมันเยิ้ม เหมาะทำไข่ดาวกรอบ", price: 60, unit: "10 ฟอง", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "egg_04", name: "ไข่เค็มไชยาต้มสุก", desc: "ไข่แดงมันเค็มกำลังดี ทานกับข้าวต้ม", price: 50, unit: "4 ฟอง", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "egg_05", name: "ไข่เยี่ยวม้าทรงเครื่อง", desc: "ไข่เยี่ยวม้าคัดเกรด ยำหรือผัดกะเพรา", price: 45, unit: "4 ฟอง", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "egg_06", name: "พวงไข่อ่อนไก่สดแท้", desc: "พวงไข่อ่อนสด ต้มยำน้ำใสรสแซ่บ", price: 65, unit: "1 พวง (300g)", category: "chicken", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },

    // ========================================================
    // CATEGORY 2: VEGETABLES (ผักสดปลอดสาร - 5 ร้าน x 6 สินค้า)
    // ========================================================
    {
        stallId: "stall_veggie",
        stallName: "แผงผักสดป้าสมร",
        stallNumber: "แผง B04",
        zone: "B",
        category: "veggie",
        stallTag: "🥬 ผักปลอดสาร",
        dimension: "3×3 เมตร",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        isFavorite: true,
        stallImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าสมร ผักปลอดสาร",
        phone: "085-112-2334",
        experience: "ปลูกและขายผักสด 18 ปี",
        highlight: "ผักสวนอินทรีย์ตัดเช้าตรู่ กรอบ หวาน ไร้สารเคมีตกค้าง 100%",
        shopDescription: "จำหน่ายผักกาดขาว ผักบุ้งจีน มะนาวแป้นน้ำหอม ชุดต้นหอมผักชี กะหล่ำปลี และแตงกวาญี่ปุ่น ล้างสะอาด พร้อมปรุงอาหารเพื่อสุขภาพที่ดีของครอบครัว",
        products: [
            { id: "veg_01", name: "ผักกาดขาวปลอดสาร", desc: "หัวแน่น กรอบหวาน ต้มแกงจืด", price: 25, unit: "1 หัว (~600g)", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: "🥬 ผักสดเช้านี้" },
            { id: "veg_02", name: "ผักบุ้งจีนปลอดสารพิษ", desc: "ต้นอวบ กรอบ สำหรับผัดไฟแดง", price: 15, unit: "1 กำใหญ่", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "veg_03", name: "มะนาวแป้นสดน้ำเยอะ", desc: "เปลือกบาง น้ำหอม เปรี้ยวจี๊ด", price: 15, unit: "5 ลูก", category: "veggie", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "veg_04", name: "ชุดต้นหอม + ผักชี", desc: "สำหรับโรยหน้าแกงจืดและต้มยำ", price: 10, unit: "1 มัด", category: "veggie", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "veg_05", name: "กะหล่ำปลีเขียวสดกรอบ", desc: "หัวแน่น สำหรับผัดน้ำปลา", price: 20, unit: "1 หัว (~700g)", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "veg_06", name: "แตงกวาญี่ปุ่นปลอดสาร", desc: "กรอบหวาน ทานสดหรือแกล้มน้ำพริก", price: 20, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_b01",
        stallName: "ผักสวนครัวลุงสนั่น",
        stallNumber: "แผง B01",
        zone: "B",
        category: "veggie",
        stallTag: "🌱 ผักพื้นบ้าน",
        dimension: "3×3 เมตร",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        stallImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงสนั่น สวนครัว",
        phone: "084-556-6778",
        experience: "ปลูกผักสวนครัว 14 ปี",
        highlight: "ผักสวนครัว กะเพราแดงแท้ พริกขี้หนูสวน เครื่องต้มยำหอมฟุ้ง",
        shopDescription: "จำหน่ายกะเพราแดงหอมฉุน โหระพา พริกขี้หนูสวนเม็ดเล็กเผ็ดแซ่บ ชุดข่าตะไคร้ใบมะกรูด มะเขือเปราะ และถั่วฝักยาว เก็บสดจากสวนหลังบ้านทุกเช้า",
        products: [
            { id: "vegb_01", name: "ใบกะเพราแดงสวนแท้", desc: "ใบเล็ก กลิ่นหอมฉุน ผัดกะเพราถึงใจ", price: 10, unit: "1 กำใหญ่", category: "veggie", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: "🌿 หอมฉุน" },
            { id: "vegb_02", name: "ใบโหระพาสดหอม", desc: "สำหรับใส่แกงเขียวหวาน/ผัดหอยลาย", price: 10, unit: "1 กำ", category: "veggie", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "vegb_03", name: "พริกขี้หนูสวนเม็ดเล็ก", desc: "เผ็ดหอม ตำน้ำพริกแซ่บสุดยอด", price: 20, unit: "1 ขีด (100g)", category: "veggie", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: "🔥 เผ็ดจัดจ้าน" },
            { id: "vegb_04", name: "ข่าอ่อน + ตะไคร้สด + ใบมะกรูด", desc: "ชุดเครื่องต้มยำครบเซ็ต", price: 15, unit: "1 ชุด", category: "veggie", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "vegb_05", name: "มะเขือเปราะกรอบหวาน", desc: "สำหรับแกงเผ็ด หรือจิ้มน้ำพริก", price: 15, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "vegb_06", name: "ถั่วฝักยาวกรอบไร้สาร", desc: "ฝักยาวแน่น ตำส้มตำหรือผัดพริกแกง", price: 15, unit: "1 มัด", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_b02",
        stallName: "เห็ดสดสามอย่าง ป้าเพ็ญ",
        stallNumber: "แผง B02",
        zone: "B",
        category: "veggie",
        stallTag: "🍄 เห็ดสดเพื่อสุขภาพ",
        dimension: "3×3 เมตร",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        stallImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าเพ็ญ เห็ดสด",
        phone: "087-223-3445",
        experience: "เพาะเห็ดโรงเรือน 11 ปี",
        highlight: "เห็ดสดเพื่อสุขภาพ ดอกสวย แน่น คัดสดจากโรงเรือนทุกเช้า",
        shopDescription: "จำหน่ายเห็ดนางฟ้าภูฐาน เห็ดออรินจิ เห็ดเข็มทอง เห็ดหอมสด เห็ดฟางดอกตูม และเซ็ตเห็ดรวม 3 อย่างต้มยำ สำหรับต้มสุกี้ ทำลาบเห็ด และเมนูคลีน",
        products: [
            { id: "mush_01", name: "เห็ดนางฟ้าภูฐานสด", desc: "ดอกสวย ทำต้มยำหรือชุบแป้งทอด", price: 25, unit: "300 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "mush_02", name: "เห็ดออรินจิสดคัดไซส์", desc: "เนื้อเด้งเหมือนเนื้อสัตว์ ผัดเนยหอม", price: 30, unit: "300 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "mush_03", name: "เห็ดเข็มทองสดกรอบ", desc: "สำหรับต้มสุกี้ ยำเห็ดเข็มทอง", price: 15, unit: "1 ซอง (200g)", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "mush_04", name: "เห็ดหอมสดดอกหนา", desc: "กลิ่นหอมธรรมชาติ ต้มซุปกระดูกหมู", price: 35, unit: "200 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "mush_05", name: "เห็ดฟางสดดอกตูม", desc: "ดอกตูมแน่น ต้มยำกุ้งน้ำข้น", price: 40, unit: "300 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "mush_06", name: "ชุดเห็ดรวม 3 อย่างต้มยำ", desc: "รวมเห็ด 3 ชนิดครบจบในถุงเดียว", price: 45, unit: "1 แพ็ค", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_b03",
        stallName: "ฟักทอง & หัวมันยายแม้น",
        stallNumber: "แผง B03",
        zone: "B",
        category: "veggie",
        stallTag: "🥔 พืชผักลงหัว",
        dimension: "3×3 เมตร",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        stallImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ยายแม้น",
        phone: "088-334-4556",
        experience: "คัดสรรผักหัว 22 ปี",
        highlight: "ฟักทองญี่ปุ่น มันฝรั่ง เผือกหอม เนื้อเหนียว มัน หวานธรรมชาติ",
        shopDescription: "จำหน่ายฟักทองญี่ปุ่นเหนียวหนึบ มันฝรั่ง แครอท หอมหัวใหญ่ เผือกหอมเนื้อซุย และขิงแก่ต้มน้ำขิง สำหรับทำต้มจืด แกงบวด แกงกะหรี่ และอาหารเพื่อสุขภาพ",
        products: [
            { id: "root_01", name: "ฟักทองญี่ปุ่นหวานมัน", desc: "เนื้อเหนียวหนึบ ต้มหรือแกงบวด", price: 35, unit: "1 ลูก (~1กก.)", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "root_02", name: "มันฝรั่งหัวโตสดใหม่", desc: "สำหรับทำซุปมันฝรั่ง แกงกะหรี่", price: 25, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "root_03", name: "แครอทสดหวานกรอบ", desc: "อุดมด้วยวิตามิน ต้มจืดหรือใส่สลัด", price: 20, unit: "3 หัว", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "root_04", name: "หอมหัวใหญ่สดหวาน", desc: "ผัดไข่ หรือต้มซุปหัวหอมใส", price: 20, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "root_05", name: "เผือกหอมสดเนื้อซุย", desc: "เผือกเนื้อดี หอมฟุ้ง ทำแกงบวด", price: 40, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "root_06", name: "ขิงแก่สดสำหรับต้มน้ำขิง", desc: "เผ็ดร้อน ไล่ลมในท้อง", price: 25, unit: "300 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_b05",
        stallName: "หน่อไม้สด & ผักป่าแม่สร้อย",
        stallNumber: "แผง B05",
        zone: "B",
        category: "veggie",
        stallTag: "🎋 ผักป่าตามฤดูกาล",
        dimension: "3×3 เมตร",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        stallImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        ownerName: "แม่สร้อย ผักป่า",
        phone: "089-445-5667",
        experience: "ผักป่าตามฤดูกาล 16 ปี",
        highlight: "ผักหวานป่า สะตอใต้ หน่อไม้ไผ่ตง ชะอมสด หาทานยาก",
        shopDescription: "จำหน่ายหน่อไม้ไผ่ตงต้มสุกไม่ขม ผักหวานป่ายอดอ่อน ชะอมสวนกลิ่นหอม ดอกขจร สะตอข้าวเม็ดแน่นจากใต้ และผักกูดลวกจิ้มน้ำพริก สดใหม่ทุกวัน",
        products: [
            { id: "wild_01", name: "หน่อไม้ไผ่ตงต้มสุก", desc: "หวานกรอบ ไม่ขม แกงหน่อไม้เลิศรส", price: 30, unit: "500 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "wild_02", name: "ผักหวานป่าสดแท้", desc: "ยอดอ่อน หวานกรอบ แกงใส่ไข่มดแดง", price: 40, unit: "1 กำ", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "wild_03", name: "ยอดชะอมสวนกลิ่นหอม", desc: "ยอดอ่อน ทำไข่เจียวชะอมน้ำพริกกะปิ", price: 15, unit: "1 กำใหญ่", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "wild_04", name: "ดอกขจรสดหวาน", desc: "ผัดน้ำมันหอย หรือลวกจิ้มน้ำพริก", price: 25, unit: "200 กรัม", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "wild_05", name: "สะตอข้าวสดจากใต้", desc: "เม็ดแน่น กรอบมัน ผัดกุ้งสด", price: 40, unit: "3 ฝัก", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "wild_06", name: "ผักกูดลวกจิ้มน้ำพริก", desc: "กรอบ อร่อย ยำผักกูดกุ้งสด", price: 20, unit: "1 กำ", category: "veggie", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },

    // ========================================================
    // CATEGORY 3: PORK (หมูสดอนามัย - 5 ร้าน x 6 สินค้า)
    // ========================================================
    {
        stallId: "stall_pork",
        stallName: "หมูสดอนามัยเจ๊พร",
        stallNumber: "แผง A08",
        zone: "A",
        category: "pork",
        stallTag: "🥩 หมูสดมาตรฐาน",
        dimension: "3×3 เมตร",
        badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
        stallImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊พร หมูสด",
        phone: "081-778-8990",
        experience: "เขียงหมูอนามัย 13 ปี",
        highlight: "หมูสดอนามัยมาตรฐานปศุสัตว์ ชำแหละสด สะอาด ไร้สารเร่งเนื้อแดง",
        shopDescription: "จำหน่ายหมูบดสด หมูสามชั้นเส้นสวย สันคอสไลซ์นุ่ม สันนอกหั่นชิ้น ซี่โครงหมูอ่อน และตับหมูสดหวาน คัดสรรเกรดพรีเมียม ตัดแต่งชิ้นสวยตามต้องการ",
        products: [
            { id: "prk_01", name: "หมูบดอนามัยติดมันเล็กน้อย", desc: "บดสดใหม่ แกงจืดและลาบหมู", price: 70, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: "🔥 สดยอดนิยม" },
            { id: "prk_02", name: "หมูสามชั้นเส้นสวย", desc: "ชั้นเนื้อสลับมันสวย พะโล้/ทอดน้ำปลา", price: 95, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prk_03", name: "สันคอหมูสไลซ์นุ่ม", desc: "ไขมันแทรก ทำหมูกระทะหรือชาบู", price: 90, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prk_04", name: "สันนอกหมูหั่นชิ้น", desc: "เนื้อล้วน ไร้มัน หมักนุ่มทำสเต็ก", price: 85, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prk_05", name: "ซี่โครงหมูอ่อนคัดพิเศษ", desc: "กระดูกอ่อนเคี้ยวมัน ต้มซุป/ทอดกระเทียม", price: 100, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prk_06", name: "ตับหมูสดหวานไร้กลิ่น", desc: "ตับสดเด้ง ผัดดอกกุยช่ายหรือตับหวาน", price: 60, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a09",
        stallName: "หมูสามชั้นทองคำ เจ๊กวง",
        stallNumber: "แผง A09",
        zone: "A",
        category: "pork",
        stallTag: "🥩 หมูสามชั้นเกรดส่งออก",
        dimension: "3×3 เมตร",
        badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
        stallImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊กวง หมูสามชั้น",
        phone: "082-889-9001",
        experience: "หมูคัดเกรดพรีเมียม 15 ปี",
        highlight: "หมูสามชั้นลอกหนัง คอหมูย่างแท้ มันแทรกลายสวย สดฉ่ำ",
        shopDescription: "คัดสรรหมูสามชั้นชั้นสวย สันในนุ่ม เบคอนสดสไลซ์ คอหมูย่างแท้ กระดูกเล้งต้มซุปแซ่บ และหนังหมูสดขูดสะอาด เหมาะทำหมูกรอบ หมูหวาน ปิ้งย่าง",
        products: [
            { id: "prkb_01", name: "หมูสามชั้นลอกหนัง", desc: "เนื้อนุ่ม ไม่เหนียว ทำหมูหวาน", price: 105, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkb_02", name: "หมูสันในเส้นนุ่มพิเศษ", desc: "เนื้อส่วนที่นุ่มที่สุด ไร้มัน", price: 95, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkb_03", name: "เบคอนสดสไลซ์บาง", desc: "สำหรับปิ้งย่างหรือพันเห็ดเข็มทอง", price: 110, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkb_04", name: "คอหมูแท้สำหรับย่าง", desc: "มันแทรกเป็นลาย ย่างจิ้มแจ่วสุดฟิน", price: 130, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: "🌟 มันแทรก" },
            { id: "prkb_05", name: "กระดูกเล้งต้มซุปแซ่บ", desc: "เนื้อติดกระดูกเยอะ เคี่ยวน้ำซุปแซ่บ", price: 40, unit: "1 กก.", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkb_06", name: "หนังหมูสดขูดสะอาด", desc: "สำหรับทำแคบหมูหรือลาบหมู", price: 35, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a10",
        stallName: "หมูหมักนุ่มสูตรโบราณ เฮียฮง",
        stallNumber: "แผง A10",
        zone: "A",
        category: "pork",
        stallTag: "🍲 หมูหมักพร้อมปรุง",
        dimension: "3×3 เมตร",
        badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
        stallImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        ownerName: "เฮียฮง หมูหมัก",
        phone: "083-990-0112",
        experience: "หมักสูตรเยาวราช 25 ปี",
        highlight: "หมูหมักนุ่มราดหน้า หมูเด้ง หมูแดดเดียว พร้อมปรุงทันที",
        shopDescription: "จำหน่ายหมูหมักนุ่มน้ำมันหอย หมูหมักพริกไทยดำ หมูเด้งปรุงรส หมูแดดเดียวทอด ไส้อ่อนต้มเปื่อย และมันหมูแข็งเจียวน้ำมัน อร่อยนุ่มละมุนลิ้น",
        products: [
            { id: "prkc_01", name: "หมูหมักนุ่มสูตรราดหน้า", desc: "หมักงาและน้ำมันหอย นุ่มละมุนลิ้น", price: 85, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkc_02", name: "หมูหมักพริกไทยดำพร้อมย่าง", desc: "กลิ่นหอมพริกไทยดำ ย่างหอมฟุ้ง", price: 90, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkc_03", name: "หมูบดปรุงรสต้มจืด (หมูเด้ง)", desc: "เหนียวนุ่ม ต้มแกงจืดใส่เต้าหู้ไข่", price: 80, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: "🔥 หมูเด้งแท้" },
            { id: "prkc_04", name: "หมูแดดเดียวทอดกรอบ", desc: "หมักงา ตากแดดธรรมชาติ พร้อมทอด", price: 120, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkc_05", name: "ไส้อ่อนหมูสดต้มเปื่อย", desc: "ล้างสะอาด ไม่ขม ต้มแซ่บ/ทอดกระเทียม", price: 95, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkc_06", name: "มันหมูแข็งสำหรับเจียวน้ำมัน", desc: "เจียวได้น้ำมันหมูหอมๆ พร้อมกากหมู", price: 30, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a11",
        stallName: "ขาหมูพะโล้สด ลุงเหน่ง",
        stallNumber: "แผง A11",
        zone: "A",
        category: "pork",
        stallTag: "🍖 ขาหมูคัดเกรด",
        dimension: "3×3 เมตร",
        badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
        stallImage: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงเหน่ง ขาหมู",
        phone: "084-001-1223",
        experience: "ขาหมูคัดสด 17 ปี",
        highlight: "ขาหมูสดขาหน้า คากิเผาไฟ เอ็นแก้ว ต้มพะโล้เปื่อยหนึบ",
        shopDescription: "จำหน่ายขาหมูสดตัดแต่งสวย คากิเผาไฟขูดสะอาด กระดูกสันหลังต้มซุป สันคอหั่นเต๋า หูหมูกรุบกรอบ และไส้ใหญ่หมูสด สำหรับทำข้าวขาหมูและต้มพะโล้",
        products: [
            { id: "prkd_01", name: "ขาหมูสดขาหน้าตัดสวย", desc: "เอ็นเยอะ หนังบาง เหมาะต้มพะโล้", price: 160, unit: "1 ขา (~1.8กก.)", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkd_02", name: "คากิสดล้างสะอาดเผาไฟ", desc: "คากิติดเอ็น ต้มพะโล้เปื่อยหนึบ", price: 80, unit: "2 ชิ้น", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkd_03", name: "กระดูกสันหลังหมูต้มซุป", desc: "หวานน้ำต้มกระดูก", price: 45, unit: "1 กก.", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkd_04", name: "สันคอหมูหั่นเต๋าทำสตู", desc: "เนื้อนุ่ม เคี่ยวสตูหมูเข้มข้น", price: 90, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkd_05", name: "หูหมูสดล้างสะอาด", desc: "กรุบกรอบ ต้มพะโล้หรือยำหูหมู", price: 65, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prkd_06", name: "ไส้ใหญ่หมูสดทำพะโล้", desc: "ล้างเกลือสะอาด ไร้กลิ่น", price: 75, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_a12",
        stallName: "กุนเชียง & หมูยอ ป้าสมศรี",
        stallNumber: "แผง A12",
        zone: "A",
        category: "pork",
        stallTag: "🥓 หมูแปรรูปสูตรโบราณ",
        dimension: "3×3 เมตร",
        badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
        stallImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าสมศรี",
        phone: "085-112-3344",
        experience: "สูตรโบราณ 30 ปี",
        highlight: "กุนเชียงหมูไร้มัน หมูยออุบลแท้ ไส้กรอกอีสาน สะอาดถูกหลักอนามัย",
        shopDescription: "จำหน่ายกุนเชียงหมูเกรด A หมูยอพริกไทยดำ แหนมหมูตุ้มจิ๋ว ไส้กรอกอีสานย่างเตาถ่าน หมูสวรรค์เม็ดผักชี และหมูหยองกรอบ อร่อย ทานง่าย เก็บได้นาน",
        products: [
            { id: "prke_01", name: "กุนเชียงหมูไร้มันเกรด A", desc: "หวานน้อย หอมเครื่องยาจีน ทอดไม่อมน้ำมัน", price: 85, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prke_02", name: "หมูยออุบลแท้พริกไทยดำ", desc: "เนื้อหมูแน่น ไร้แป้ง หอมพริกไทย", price: 45, unit: "1 แท่งใหญ่ (300g)", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prke_03", name: "แหนมหมูตุ้มจิ๋วพร้อมทาน", desc: "เปรี้ยวกำลังดี ทานสดหรือยำ", price: 50, unit: "10 ลูก", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prke_04", name: "ไส้กรอกอีสานหมูเปรี้ยว", desc: "ย่างเตาถ่าน หอมกระเทียมพริกสด", price: 60, unit: "500 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prke_05", name: "หมูสวรรค์เม็ดผักชี", desc: "หวานหอม นุ่มเคี้ยวง่าย", price: 90, unit: "300 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prke_06", name: "หมูหยองกรอบทองคำ", desc: "ทานกับข้าวต้มกุ๊ย หรือทำแซนด์วิช", price: 80, unit: "250 กรัม", category: "pork", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },

    // ========================================================
    // CATEGORY 4: SPICES & DRIED GOODS (เครื่องแกง & ของแห้ง - 5 ร้าน x 6 สินค้า)
    // ========================================================
    {
        stallId: "stall_curry",
        stallName: "เครื่องแกงเจ๊ณี (สูตรใต้)",
        stallNumber: "แผง C02",
        zone: "C",
        category: "curry",
        stallTag: "🌶️ พริกแกงตำสด",
        dimension: "3×3 เมตร",
        badgeColor: "bg-red-100 text-red-800 border-red-200",
        isFavorite: true,
        stallImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊ณี เครื่องแกงใต้",
        phone: "086-123-9988",
        experience: "สูตรเมืองพัทลุง 20 ปี",
        highlight: "พริกแกงใต้ตำสด หอมเครื่องเทศสมุนไพร ไม่ใส่สารกันบูด",
        shopDescription: "จำหน่ายพริกแกงเผ็ดใต้ พริกแกงเขียวหวาน พริกแกงส้มแกงเหลือง พริกแกงมัสมั่น พะแนง และพริกแกงไตปลา คั่วบดสดใหม่ กลิ่นหอมฉุน เข้มข้นถึงรสชาติใต้แท้",
        products: [
            { id: "cur_01", name: "พริกแกงเผ็ดใต้สูตรเข้มข้น", desc: "หอมเครื่องเทศ ไม่ใส่สารกันบูด", price: 30, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: "🌶️ สูตรเด็ด" },
            { id: "cur_02", name: "พริกแกงเขียวหวานตำสด", desc: "สีเขียวธรรมชาติ แกงไก่ใส่มะเขือ", price: 30, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cur_03", name: "พริกแกงส้มใต้ (แกงเหลือง)", desc: "รสจัดจ้าน เปรี้ยวเผ็ดถึงใจ", price: 30, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cur_04", name: "พริกแกงมัสมั่นโบราณ", desc: "หอมเครื่องเทศอินเดียและถั่วคั่ว", price: 35, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cur_05", name: "พริกแกงพะแนงหอมมัน", desc: "เนื้อพริกแกงละเอียด สำหรับพะแนงหมู", price: 30, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cur_06", name: "พริกแกงไตปลาสูตรนครศรี", desc: "หอมพริกไทยดำ เผ็ดร้อนถึงทรวง", price: 35, unit: "2 ขีด (200g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_c01",
        stallName: "กะทิสดชาวเกาะ ลุงสมหมาย",
        stallNumber: "แผง C01",
        zone: "C",
        category: "curry",
        stallTag: "🥥 คั้นสด 100%",
        dimension: "3×3 เมตร",
        badgeColor: "bg-red-50 text-red-800 border-red-200",
        stallImage: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงสมหมาย กะทิสด",
        phone: "087-334-5566",
        experience: "คั้นกะทิสดวันต่อวัน 18 ปี",
        highlight: "หัวกะทิสด 100% ไม่ผสมน้ำ ข้น มัน หอมมะพร้าวสวนทับสะแก",
        shopDescription: "จำหน่ายหัวกะทิคั้นสด หางกะทิ มะพร้าวขูดขาวทำขนม น้ำตาลปี๊บแท้เมืองเพชร น้ำตาลมะพร้าวออร์แกนิก และมะพร้าวทึนทึกขูดเส้น คั้นสดใหม่รอบเช้าทุกวัน",
        products: [
            { id: "cocon_01", name: "หัวกะทิสดคั้นแท้ 100%", desc: "ข้น มัน หอม ไม่ผสมน้ำ คั้นสดเช้า", price: 40, unit: "500 มล.", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: "🥥 คั้นสด" },
            { id: "cocon_02", name: "หางกะทิสดสำหรับแกง", desc: "สำหรับเติมน้ำแกงให้กลมกล่อม", price: 20, unit: "500 มล.", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cocon_03", name: "มะพร้าวขูดขาวทำขนม", desc: "ขูดสดใหม่ สำหรับทำขนมไทย", price: 35, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cocon_04", name: "น้ำตาลปี๊บแท้เมืองเพชร", desc: "หอมหวานนวล ทำกับข้าวรสกลมกล่อม", price: 35, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cocon_05", name: "น้ำตาลมะพร้าวออร์แกนิก", desc: "หวานธรรมชาติ ดัชนีน้ำตาลต่ำ", price: 45, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "cocon_06", name: "มะพร้าวทึนทึกขูดเส้น", desc: "โรยหน้าขนมต้ม ขนมเปียกปูน", price: 30, unit: "300 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_c03",
        stallName: "หอม กระเทียม กะปิระนอง ป้าแจ๋ว",
        stallNumber: "แผง C03",
        zone: "C",
        category: "curry",
        stallTag: "🧄 เครื่องครัวไทยดั้งเดิม",
        dimension: "3×3 เมตร",
        badgeColor: "bg-red-50 text-red-800 border-red-200",
        stallImage: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าแจ๋ว ระนอง",
        phone: "088-445-6677",
        experience: "เครื่องครัวไทย 25 ปี",
        highlight: "กะปิเคยแท้ระนอง กระเทียมไทยกลีบเล็ก หอมแดงศรีสะเกษแท้",
        shopDescription: "จำหน่ายกระเทียมไทยแกะกลีบ หอมแดงศรีสะเกษ กะปิเคยแท้ระนองเกรด A พริกแห้งจินดาแดง พริกไทยดำเม็ดจันทบุรี และมะขามเปียกแกะเมล็ดใหม่ สะอาด พร้อมใช้",
        products: [
            { id: "garlic_01", name: "กระเทียมไทยแกะกลีบเล็ก", desc: "กลิ่นหอมแรง เจียวกระเทียมเลิศรส", price: 35, unit: "300 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "garlic_02", name: "หอมแดงศรีสะเกษแท้", desc: "หัวแน่น เปลือกบาง เจียวหอมกรอบ", price: 35, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "garlic_03", name: "กะปิเคยแท้ระนองเกรด A", desc: "เคยล้วน ไม่เค็มจัด ตำน้ำพริกหอมฟุ้ง", price: 45, unit: "1 กระปุก (300g)", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: "🌟 เคยแท้ 100%" },
            { id: "garlic_04", name: "พริกแห้งจินดาแดงคัดเม็ด", desc: "ตากแดดธรรมชาติ ตำพริกแกงสีสวย", price: 30, unit: "200 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "garlic_05", name: "พริกไทยดำเม็ดจันทบุรี", desc: "เม็ดแน่น กลิ่นหอมฉุน บดสดใหม่", price: 40, unit: "150 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "garlic_06", name: "มะขามเปียกแกะเมล็ดใหม่", desc: "เนื้อหนา เปรี้ยวกลมกล่อม ต้มส้ม/แกงส้ม", price: 25, unit: "300 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_c04",
        stallName: "กุ้งแห้ง & ปลากรอบ ป้าสมใจ",
        stallNumber: "แผง C04",
        zone: "C",
        category: "curry",
        stallTag: "🦐 ของแห้งอาหารทะเล",
        dimension: "3×3 เมตร",
        badgeColor: "bg-red-50 text-red-800 border-red-200",
        stallImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าสมใจ ของแห้ง",
        phone: "089-556-7788",
        experience: "ของแห้งทะเล 19 ปี",
        highlight: "กุ้งแห้งไม่ใส่สี หมึกแห้งไดร์ ปลากรอบสมุนไพร คัดเกรดพรีเมียม",
        shopDescription: "จำหน่ายกุ้งแห้งเนื้อตัวโต ปลาหมึกแห้งไดร์ ปลากรอบสมุนไพรโรยงา ปลาอินทรีเค็มหอม กระเพาะปลาแท้ และเห็ดหอมแห้งลายญี่ปุ่น สะอาด ไม่เค็มจัด",
        products: [
            { id: "dry_01", name: "กุ้งแห้งเนื้อไม่ใส่สี", desc: "ตัวโต เค็มน้อย เนื้อนุ่ม ใส่ยำหรือแกงจืด", price: 95, unit: "200 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "dry_02", name: "ปลาหมึกแห้งไดร์คัดเกรด", desc: "ย่างหอม ทอดกรอบ ไม่เค็มจัด", price: 120, unit: "200 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "dry_03", name: "ปลากรอบสมุนไพรโรยงา", desc: "กรุบกรอบ ทานเล่นหรือโรยยำส้มโอ", price: 50, unit: "200 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "dry_04", name: "ปลาอินทรีเค็มแท้หอม", desc: "ทอดทานกับข้าวต้ม ยำพริกมะนาว", price: 110, unit: "2 ชิ้น", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "dry_05", name: "กระเพาะปลาแห้งเกรด A", desc: "กระเพาะปลาแท้ ต้มน้ำแดงเยาวราช", price: 130, unit: "150 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "dry_06", name: "เห็ดหอมแห้งดอกลายญี่ปุ่น", desc: "ดอกหนา แช่น้ำแล้วนุ่ม เคี่ยวน้ำซุป", price: 85, unit: "150 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_c05",
        stallName: "เส้นสด & เต้าหู้ เจ๊หมวย",
        stallNumber: "แผง C05",
        zone: "C",
        category: "curry",
        stallTag: "🍜 เส้นก๋วยเตี๋ยวสด",
        dimension: "3×3 เมตร",
        badgeColor: "bg-red-50 text-red-800 border-red-200",
        stallImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊หมวย เส้นสด",
        phone: "081-667-8899",
        experience: "ทำเส้นสดวันต่อวัน 14 ปี",
        highlight: "เส้นก๋วยเตี๋ยวสด บะหมี่ไข่เป็ด วุ้นเส้นสด เหนียวนุ่ม ไม่ใส่วัตถุกันเสีย",
        shopDescription: "จำหน่ายเส้นเล็กสด เส้นใหญ่นุ่ม บะหมี่ไข่เป็ดเส้นแบน วุ้นเส้นสดถั่วเขียว 100% เต้าหู้เหลืองนิ่มสูตรโบราณ และแผ่นเกี๊ยวสดห่อหมู ทำสดใหม่ทุกวัน",
        products: [
            { id: "nood_01", name: "เส้นเล็กสดเหนียวนุ่ม", desc: "ทำวันต่อวัน ไม่ใส่วัตถุกันเสีย ลวกง่าย", price: 25, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "nood_02", name: "เส้นใหญ่สดนุ่มลื่น", desc: "สำหรับทำผัดซีอิ๊ว ราดหน้าหมูนุ่ม", price: 25, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "nood_03", name: "บะหมี่ไข่เป็ดเส้นแบน", desc: "เส้นเหนียวนุ่ม หอมไข่ ทำบะหมี่เกี๊ยว", price: 30, unit: "500 กรัม (10 ก้อน)", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "nood_04", name: "วุ้นเส้นสดถั่วเขียว 100%", desc: "เส้นใส เหนียวหนึบ ไม่เละ ต้มยำ/อบหม้อดิน", price: 25, unit: "500 กรัม", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "nood_05", name: "เต้าหู้เหลืองนิ่มสูตรโบราณ", desc: "สำหรับต้มพะโล้ ผัดถั่วงอก", price: 20, unit: "2 แผ่น", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "nood_06", name: "แผ่นเกี๊ยวสดห่อหมู", desc: "แผ่นบาง นุ่ม ทอดกรอบหรือต้มเกี๊ยวน้ำ", price: 25, unit: "1 ห่อ (50 แผ่น)", category: "curry", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },

    // ========================================================
    // CATEGORY 5: SEAFOOD (อาหารทะเลสด - 5 ร้าน x 6 สินค้า)
    // ========================================================
    {
        stallId: "stall_seafood",
        stallName: "อาหารทะเลสดลุงหวัง",
        stallNumber: "แผง E11",
        zone: "E",
        category: "seafood",
        stallTag: "🦐 ซีฟู้ดส่งตรงจากเรือ",
        dimension: "3×3 เมตร",
        badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
        stallImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงหวัง ซีฟู้ดมหาชัย",
        phone: "081-998-8776",
        experience: "รับตรงจากเรือประมง 21 ปี",
        highlight: "กุ้งขาวสด ปลากะพง ปูม้า ปลาหมึก สดหวาน ส่งตรงจากมหาชัยทุกวัน",
        shopDescription: "จำหน่ายกุ้งขาวคัดไซส์ ปลาหมึกกล้วยสด ปลากะพงขาวแล่ชิ้น หอยแมลงภู่อวบ ปูม้าไข่แน่น และหอยลายสด ล้างสะอาดพร้อมปรุง รับประกันความสด",
        products: [
            { id: "sea_01", name: "กุ้งขาวสดคัดไซส์ (30 ตัว/กก.)", desc: "เนื้อเด้ง สดหวาน ส่งตรงจากมหาชัย", price: 130, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: "🦐 สดเด้ง" },
            { id: "sea_02", name: "ปลาหมึกกล้วยสดไซส์กลาง", desc: "หมึกสดตาใส ผัดกะเพรา/ย่างจิ้มซีฟู้ด", price: 110, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "sea_03", name: "ปลากะพงขาวหั่นชิ้นพร้อมปรุง", desc: "เนื้อขาว นุ่ม ต้มยำน้ำใสหรือนึ่งมะนาว", price: 120, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "sea_04", name: "หอยแมลงภู่สดล้างสะอาด", desc: "ตัวอวบ ลวกจิ้มน้ำจิ้มซีฟู้ดแซ่บ", price: 45, unit: "1 กก.", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "sea_05", name: "ปูม้าสดคัดไซส์ไข่แน่น", desc: "ปูม้าสดเนื้อแน่น นึ่งหรือดองน้ำปลา", price: 180, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "sea_06", name: "หอยลายสดสำหรับผัดพริกเผา", desc: "ล้างทรายสะอาด ผัดน้ำพริกเผาโหระพา", price: 55, unit: "1 กก.", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_e01",
        stallName: "ปลาน้ำจืดเขื่อน ลุงชาญ",
        stallNumber: "แผง E01",
        zone: "E",
        category: "seafood",
        stallTag: "🐟 ปลาน้ำจืดสดๆ",
        dimension: "3×3 เมตร",
        badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
        stallImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        ownerName: "ลุงชาญ ปลาน้ำจืด",
        phone: "082-113-4455",
        experience: "ปลาเขื่อนสดธรรมชาติ 24 ปี",
        highlight: "ปลานิล ปลาช่อนนา ปลาดุก ปลาทับทิม สดจากเขื่อนธรรมชาติ ไม่คาว",
        shopDescription: "จำหน่ายปลานิลสดขอดเกล็ดบั้งตัว ปลาช่อนนาต้มยำ ปลาดุกหั่นชิ้น ปลาทับทิมนึ่งมะนาว หัวปลาแซลมอน และปลาเนื้ออ่อน ทอดกรอบอร่อยทั้งตัว",
        products: [
            { id: "fish_01", name: "ปลานิลสดขอดเกล็ดบั้งตัว", desc: "ตัวโต สดใหม่ ทอดกรอบจิ้มแจ่ว", price: 70, unit: "1 ตัว (~800g)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "fish_02", name: "ปลาช่อนนาสดทำต้มยำ", desc: "เนื้อแน่น ไม่คาว ต้มยำปลาช่อนโบราณ", price: 110, unit: "1 ตัว (~800g)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "fish_03", name: "ปลาดุกสดหั่นชิ้นผัดเผ็ด", desc: "หั่นชิ้นหนา ผัดเผ็ดปลาดุกกรอบ", price: 50, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "fish_04", name: "ปลาทับทิมสดเนื้อหวาน", desc: "นึ่งมะนาว หรือทอดสามรส", price: 85, unit: "1 ตัว (~900g)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "fish_05", name: "หัวปลาแซลมอนต้มซีอิ๊ว", desc: "ไขมันดีสูง ต้มซีอิ๊วญี่ปุ่นเข้มข้น", price: 65, unit: "1 หัวใหญ่", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "fish_06", name: "ปลาเนื้ออ่อนสดแม่น้ำ", desc: "ทอดกระเทียมพริกไทย กรอบอร่อยทั้งตัว", price: 150, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_e02",
        stallName: "กุ้งแม่น้ำ & หอยแครง เจ๊ติ๋ม",
        stallNumber: "แผง E02",
        zone: "E",
        category: "seafood",
        stallTag: "🦐 กุ้งแม่น้ำเป็นๆ",
        dimension: "3×3 เมตร",
        badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
        stallImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊ติ๋ม กุ้งแม่น้ำ",
        phone: "083-224-5566",
        experience: "กุ้งแม่น้ำอยุธยา 16 ปี",
        highlight: "กุ้งแม่น้ำมันเยิ้ม หอยแครงสดล้างสะอาด หอยนางรมสุราษฎร์ตัวอวบ",
        shopDescription: "จำหน่ายกุ้งก้ามกรามแม่น้ำสดมันเยิ้ม หอยแครงลวกกรอบ หอยนางรมสดสุราษฎร์ กุ้งแชบ๊วยธรรมชาติ ปลาหมึกไข่ และหอยเชลล์ฝา อร่อยฟินจิ้มน้ำจิ้มซีฟู้ด",
        products: [
            { id: "prawn_01", name: "กุ้งก้ามกรามแม่น้ำสด", desc: "มันกุ้งเยิ้มๆ ย่างเตาถ่านหอมฉุย", price: 240, unit: "500 กรัม (6-7 ตัว)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: "🌟 มันเยิ้ม" },
            { id: "prawn_02", name: "หอยแครงสดล้างโคลนสะอาด", desc: "ลวกกรอบๆ จิ้มน้ำจิ้มถั่วตัด", price: 90, unit: "1 กก.", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prawn_03", name: "หอยนางรมสดสุราษฎร์", desc: "ตัวอวบ ทานกับกระถินและหอมเจียว", price: 95, unit: "1 กระปุกใหญ่", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prawn_04", name: "กุ้งแชบ๊วยทะเลธรรมชาติ", desc: "เนื้อหวานกรอบ ต้มยำกุ้งน้ำใส", price: 160, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prawn_05", name: "ปลาหมึกไข่สดแท้", desc: "ไข่แน่นเต็มท้อง นึ่งมะนาวแซ่บ", price: 140, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "prawn_06", name: "หอยเชลล์สดพร้อมฝา", desc: "อบเนยกระเทียม หรือย่างชีส", price: 130, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_e03",
        stallName: "ปลาทูแม่กลองหน้างอ ป้าทอง",
        stallNumber: "แผง E03",
        zone: "E",
        category: "seafood",
        stallTag: "🐟 ปลาทูนึ่งแท้แม่กลอง",
        dimension: "3×3 เมตร",
        badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
        stallImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        ownerName: "ป้าทอง แม่กลอง",
        phone: "084-335-6677",
        experience: "ปลาทูแม่กลองแท้ 28 ปี",
        highlight: "ปลาทูนึ่งแม่กลองหน้างอคอหักแท้ เนื้อมัน หนังตึง ทอดกินกับน้ำพริกกะปิ",
        shopDescription: "จำหน่ายปลาทูนึ่งแม่กลอง ปลาทูสดตาใสอ่าวไทย ปลาทูเค็มตากแห้งหอม ปลาโอสดหั่นแว่น ปลาซาบะย่าง และไข่ปลาริวกิวเม็ดโตสำหรับแกงส้ม อร่อยต้นตำรับ",
        products: [
            { id: "macc_01", name: "ปลาทูนึ่งแม่กลองหน้างอคอหัก", desc: "เนื้อมัน หนังตึง ทอดกินกับน้ำพริกกะปิ", price: 40, unit: "1 เข่ง (2 ตัวใหญ่)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: "🌟 แท้แม่กลอง" },
            { id: "macc_02", name: "ปลาทูสดตาใสจากอ่าวไทย", desc: "สำหรับต้มยำปลาทูมะดัน/ทอดน้ำปลา", price: 60, unit: "500 กรัม (4-5 ตัว)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "macc_03", name: "ปลาทูเค็มตากแห้งหอม", desc: "ทอดบีบมะนาว โรยหอมแดงพริกขี้หนู", price: 50, unit: "1 แพ็ค (3 ตัว)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "macc_04", name: "ปลาโอสดหั่นแว่น", desc: "ต้มต้มส้ม หรือแกงส้มปลาโอ", price: 75, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "macc_05", name: "ปลาซาบะสดนำเข้า", desc: "ย่างซีอิ๊ว หรือย่างเกลือ", price: 45, unit: "1 ตัว (~400g)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "macc_06", name: "ไข่ปลาริวกิวสดเม็ดโต", desc: "สำหรับแกงส้มไข่ปลาริวกิวหน่อไม้ดอง", price: 160, unit: "250 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
        ]
    },
    {
        stallId: "stall_e04",
        stallName: "ลูกชิ้นปลาเยาวราชแท้ เจ๊เกียว",
        stallNumber: "แผง E04",
        zone: "E",
        category: "seafood",
        stallTag: "🍢 ลูกชิ้นปลาแท้ไร้แป้ง",
        dimension: "3×3 เมตร",
        badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
        stallImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
        ownerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        ownerName: "เจ๊เกียว เยาวราช",
        phone: "085-446-7788",
        experience: "ลูกชิ้นปลาเยาวราช 23 ปี",
        highlight: "ลูกชิ้นปลาแท้ 100% ไร้แป้ง เหนียวนุ่ม เด้งธรรมชาติ ทอดมันปลากรายสด",
        shopDescription: "จำหน่ายลูกชิ้นปลากลม ฮื่อก๊วยปลาเส้นทอด ลูกชิ้นกุ้งทอด เกี๊ยวปลาไส้หมู ลูกชิ้นรักบี้สาหร่าย และทอดมันปลากรายนวดเหนียวพร้อมทอด สะอาด อร่อยระดับภัตตาคาร",
        products: [
            { id: "ball_01", name: "ลูกชิ้นปลากลมแท้ 100%", desc: "เหนียวนุ่ม เด้งธรรมชาติ ไม่ผสมแป้ง", price: 70, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "ball_02", name: "ฮื่อก๊วยทอดเยาวราช (ปลาเส้น)", desc: "หั่นใส่ก๋วยเตี๋ยว ยำ หรือทอดจิ้มน้ำจิ้ม", price: 40, unit: "1 เส้นใหญ่", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "ball_03", name: "ลูกชิ้นกุ้งทอดสูตรฮ่องกง", desc: "กุ้งเน้นๆ หอมกลิ่นน้ำมันงา", price: 85, unit: "300 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "ball_04", name: "เกี๊ยวปลาสดไส้หมูทรงเครื่อง", desc: "แผ่นเกี๊ยวทำจากเนื้อปลาแท้", price: 80, unit: "300 กรัม (15 ตัว)", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "ball_05", name: "ลูกชิ้นรักบี้สาหร่าย", desc: "กรุบกรอบสาหร่ายวากาเมะ", price: 70, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null },
            { id: "ball_06", name: "ทอดมันปลากรายสดนวดเหนียว", desc: "นวดเครื่องแกงพร้อมทอด ร้อนๆ อร่อย", price: 60, unit: "500 กรัม", category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&auto=format&fit=crop&q=80", badge: null }
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
    return ["stall_chicken", "stall_veggie", "stall_pork", "stall_curry", "stall_seafood"];
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
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { isLoggedIn: false, phone: "" };
}

function saveCustomerToStorage(cust) {
    try {
        localStorage.setItem("talathub_logged_in_customer", JSON.stringify(cust));
    } catch (e) {}
}

function loadSavedMerchant() {
    try {
        const saved = localStorage.getItem("talathub_logged_in_merchant");
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
}

function saveMerchantToStorage(merch) {
    try {
        if (merch) localStorage.setItem("talathub_logged_in_merchant", JSON.stringify(merch));
        else localStorage.removeItem("talathub_logged_in_merchant");
    } catch (e) {}
}

// ==========================================
// REAL GPS & DELIVERY LOCATION ENGINE
// ==========================================
const MARKET_ORIGIN = {
    lat: 13.9125,
    lng: 100.3275,
    name: "ตลาดสดกลางเฮียส่ง (Hub รวม 100 แผง)"
};

function loadSavedLocation() {
    try {
        const saved = localStorage.getItem("talathub_delivery_location");
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
        title: "บ้านคุณสุรีย์ (ร้านเจ๊เจียบ ซ.เปิดน้อย)",
        detail: "ที่อยู่บ้านสุรีย์ - ติดต่อที่บ้านคุณ (ห่างจากตลาด 1.8 กม.)",
        distance: "1.8 กม.",
        fee: 25,
        lat: 13.9120,
        lng: 100.3400,
        isRealGPS: false
    };
}

function saveLocationToStorage(loc) {
    try {
        localStorage.setItem("talathub_delivery_location", JSON.stringify(loc));
    } catch (e) {}
}

// Haversine formula to compute true geographical distance in Kilometers
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Flat delivery fee based on true km distance from Central Market Hub
function calculateDeliveryFee(distanceKm) {
    if (distanceKm <= 1.0) return 20;
    if (distanceKm <= 2.5) return 25;
    if (distanceKm <= 4.0) return 30;
    if (distanceKm <= 6.0) return 40;
    if (distanceKm <= 10.0) return 50;
    return 60;
}

function getNextDeliverySlotInfo() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const totalMin = hour * 60 + min;

    // Daily Market Batch Rounds:
    // Round 1: 08:30 (order cutoff 08:00)
    // Round 2: 11:30 (order cutoff 11:00)
    // Round 3: 15:00 (order cutoff 14:30)
    // Round 4: 17:30 (order cutoff 17:00)
    // After 17:00 -> Next morning 07:30
    if (totalMin <= 8 * 60) return { slotText: "รอบเช้า 08:30", fullText: "รอบเช้าวันนี้ 08:30 น." };
    if (totalMin <= 11 * 60) return { slotText: "รอบเที่ยง 11:30", fullText: "รอบเที่ยงวันนี้ 11:30 น." };
    if (totalMin <= 14 * 60 + 30) return { slotText: "รอบบ่าย 15:00", fullText: "รอบบ่ายวันนี้ 15:00 น." };
    if (totalMin <= 17 * 60) return { slotText: "รอบเย็น 17:30", fullText: "รอบเย็นวันนี้ 17:30 น." };
    return { slotText: "รอบเช้าพรุ่งนี้ 07:30", fullText: "รอบเช้าพรุ่งนี้ 07:30 น." };
}

function updateDeliveryLocationUI() {
    if (!state.deliveryLocation) {
        state.deliveryLocation = loadSavedLocation();
    }
    const loc = state.deliveryLocation;
    const slotInfo = getNextDeliverySlotInfo();

    // 1. Top Navbar Selected Address Preview
    const topAddressPreview = document.getElementById("selected-address-preview");
    if (topAddressPreview) topAddressPreview.textContent = loc.title;

    // 2. Top Navbar Delivery Slot Badge
    const topSlotText = document.getElementById("top-delivery-slot-text");
    if (topSlotText) topSlotText.textContent = slotInfo.slotText;

    // 3. Welcome Banner Location Card
    const welcomeLocTitle = document.getElementById("welcome-location-title");
    if (welcomeLocTitle) welcomeLocTitle.textContent = loc.title;

    const welcomeDistText = document.getElementById("welcome-distance-text");
    if (welcomeDistText) welcomeDistText.textContent = loc.distance;

    const welcomeFeeText = document.getElementById("welcome-fee-text");
    if (welcomeFeeText) welcomeFeeText.textContent = `฿${loc.fee}`;

    const welcomeNextSlot = document.getElementById("welcome-next-slot-text");
    if (welcomeNextSlot) welcomeNextSlot.textContent = slotInfo.fullText;

    // 4. Update Checkout View Delivery Fee if present
    const checkoutFeeElem = document.getElementById("checkout-delivery-fee");
    if (checkoutFeeElem) checkoutFeeElem.textContent = `฿${loc.fee}`;

    // 5. Update Location Modal Live GPS details box
    const gpsBox = document.getElementById("real-gps-details-box");
    if (gpsBox) {
        gpsBox.classList.remove("hidden");
        const addrText = document.getElementById("modal-gps-address-text");
        if (addrText) addrText.textContent = loc.title;
        const subText = document.getElementById("modal-gps-detail-subtext");
        if (subText) subText.textContent = loc.detail || "พร้อมคำนวณระยะทางและรอบจัดส่ง";
        const latText = document.getElementById("modal-gps-lat");
        if (latText) latText.textContent = loc.lat ? Number(loc.lat).toFixed(4) : "13.9120";
        const lngText = document.getElementById("modal-gps-lng");
        if (lngText) lngText.textContent = loc.lng ? Number(loc.lng).toFixed(4) : "100.3400";
        const distText = document.getElementById("modal-gps-dist");
        if (distText) distText.textContent = loc.distance;
        const feeText = document.getElementById("modal-gps-fee");
        if (feeText) feeText.textContent = `฿${loc.fee}`;
        const sourceBadge = document.getElementById("modal-gps-source-badge");
        if (sourceBadge) sourceBadge.textContent = loc.isRealGPS ? "🛰️ พิกัดจริงของคุณ (ตรวจพบแล้ว):" : "📍 พิกัดที่เลือกไว้:";
    }
}

function openLocationModal() {
    updateDeliveryLocationUI();
    document.getElementById("location-modal").classList.remove("hidden");
}

function closeLocationModal() {
    document.getElementById("location-modal").classList.add("hidden");
}

function detectCurrentLocationGPS() {
    // Open modal immediately so user sees the radar scanner instantly!
    openLocationModal();

    const radar = document.getElementById("gps-searching-indicator");
    const gpsBox = document.getElementById("real-gps-details-box");
    const btnLabel = document.getElementById("gps-button-label");

    if (radar) radar.classList.remove("hidden");
    if (btnLabel) btnLabel.textContent = "🛰️ กำลังค้นหาสัญญาณดาวเทียม GPS / IP...";

    showToast("🛰️ กำลังค้นหาพิกัดจริงของคุณจากดาวเทียม GPS และเครือข่าย...");

    // Helper to apply and save detected coordinates
    async function applyDetectedCoords(lat, lng, accuracy, sourceName) {
        if (radar) radar.classList.add("hidden");
        if (btnLabel) btnLabel.textContent = "🛰️ หาพิกัด GPS จริงจากอุปกรณ์ปัจจุบัน";

        const distKm = calculateDistanceKm(MARKET_ORIGIN.lat, MARKET_ORIGIN.lng, lat, lng);
        const fee = calculateDeliveryFee(distKm);

        let addressTitle = `พิกัดจริง (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

        // Reverse Geocode to Thai Address Name
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
                headers: { 'Accept-Language': 'th,en' },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                if (data && data.address) {
                    const road = data.address.road || data.address.suburb || data.address.neighbourhood || "";
                    const subdistrict = data.address.subdistrict || data.address.village || data.address.city_district || "";
                    const district = data.address.district || data.address.city || "";
                    const province = data.address.province || data.address.state || "";
                    
                    const parts = [road, subdistrict, district, province].filter(p => p && p.trim() !== "");
                    if (parts.length > 0) {
                        addressTitle = parts.join(", ");
                    } else if (data.display_name) {
                        addressTitle = data.display_name.split(",").slice(0, 3).join(",");
                    }
                }
            }
        } catch (e) {
            console.warn("Reverse geocoding network notice:", e);
        }

        // Update State
        state.deliveryLocation = {
            title: addressTitle,
            detail: `พิกัดจริง (${lat.toFixed(4)}, ${lng.toFixed(4)}) • ${sourceName}`,
            distance: `${distKm.toFixed(1)} กม.`,
            fee: fee,
            lat: lat,
            lng: lng,
            isRealGPS: true
        };

        saveLocationToStorage(state.deliveryLocation);
        updateDeliveryLocationUI();

        // Update Badge Text
        const modeBadge = document.getElementById("location-detection-mode-badge");
        if (modeBadge) modeBadge.textContent = `พิกัดจริงของคุณ (${sourceName})`;

        showToast(`📍 ตรวจพบพิกัดจริงสำเร็จ! (${distKm.toFixed(1)} กม. จากตลาด • ค่าส่ง ฿${fee})`);
    }

    // Attempt 1: Browser Geolocation API
    if (navigator.geolocation) {
        let hasResolved = false;
        const timer = setTimeout(() => {
            if (!hasResolved) {
                hasResolved = true;
                fallbackToIPLocation(applyDetectedCoords);
            }
        }, 2500); // 2.5s fast timeout to prevent desktop hanging

        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (hasResolved) return;
                hasResolved = true;
                clearTimeout(timer);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const acc = position.coords.accuracy || 15;
                applyDetectedCoords(lat, lng, acc, "GPS ดาวเทียมสด");
            },
            function(geoError) {
                if (hasResolved) return;
                hasResolved = true;
                clearTimeout(timer);
                console.warn("Browser GPS unavailable/denied, falling back to IP Geolocation...", geoError);
                fallbackToIPLocation(applyDetectedCoords);
            },
            {
                enableHighAccuracy: false,
                timeout: 2500,
                maximumAge: 60000
            }
        );
    } else {
        fallbackToIPLocation(applyDetectedCoords);
    }
}

// Attempt 2: IP-based Real Geolocation for Desktop PC / Laptops without hardware GPS
async function fallbackToIPLocation(callback) {
    const radar = document.getElementById("gps-searching-indicator");
    const btnLabel = document.getElementById("gps-button-label");

    try {
        const response = await fetch("https://ipwho.is/", { cache: "no-cache" });
        if (response.ok) {
            const data = await response.json();
            if (data && data.success && data.latitude && data.longitude) {
                const cityName = data.city || data.region || "กรุงเทพฯ / ปริมณฑล";
                callback(data.latitude, data.longitude, 500, `IP เครือข่าย: ${cityName}`);
                return;
            }
        }
    } catch (e) {
        console.warn("IP Provider 1 error, trying Provider 2...", e);
    }

    try {
        const response2 = await fetch("https://freeipapi.com/api/json", { cache: "no-cache" });
        if (response2.ok) {
            const data2 = await response2.json();
            if (data2 && data2.latitude && data2.longitude) {
                const cityName2 = data2.cityName || data2.regionName || "กรุงเทพฯ";
                callback(data2.latitude, data2.longitude, 1000, `IP เครือข่าย: ${cityName2}`);
                return;
            }
        }
    } catch (e2) {
        console.warn("IP Provider 2 error, using default market zone coords...", e2);
    }

    // Default Fallback
    if (radar) radar.classList.add("hidden");
    if (btnLabel) btnLabel.textContent = "🛰️ หาพิกัด GPS จริงจากอุปกรณ์ปัจจุบัน";
    applyDetectedCoords(13.9120, 100.3400, 50, "พิกัดย่านตลาดสดเทศบาล");
}

function selectSavedLocation(title, distance, fee, lat, lng) {
    state.deliveryLocation = {
        title: title,
        detail: `ชุมชนรอบตลาด • ห่างจากตลาดสด ${distance}`,
        distance: distance,
        fee: fee,
        lat: lat || 13.912,
        lng: lng || 100.340,
        isRealGPS: false
    };
    saveLocationToStorage(state.deliveryLocation);
    updateDeliveryLocationUI();
    showToast(`📍 เปลี่ยนที่อยู่จัดส่งเป็น "${title}" แล้ว`);
}

function applyManualCustomLocation() {
    const input = document.getElementById("manual-location-input");
    const val = input ? input.value.trim() : "";
    if (!val) {
        alert("กรุณาพิมพ์ระบุที่อยู่หรือชื่อสถานที่ของคุณ");
        return;
    }

    state.deliveryLocation = {
        title: val,
        detail: `ที่อยู่ระบุเอง • จัดส่งถึงบ้านคุณ`,
        distance: "2.0 กม.",
        fee: 25,
        lat: 13.912,
        lng: 100.340,
        isRealGPS: false
    };
    saveLocationToStorage(state.deliveryLocation);
    updateDeliveryLocationUI();
    closeLocationModal();
    showToast(`📍 บันทึกที่อยู่จัดส่ง "${val}" เรียบร้อยแล้ว`);
}

// 2. Application Reactive State
const state = {
    currentRole: "customer",
    currentScreen: "market",
    currentCategoryFilter: "all", // 'all' | 'chicken' | 'veggie' | 'pork' | 'curry' | 'seafood'
    currentSingleStall: null,     // null or stallId
    currentDirectoryZone: "all",
    searchQuery: "",
    favorites: loadSavedFavorites(), // Persistent favorite stalls list
    customer: loadSavedCustomer(),   // Logged in customer session
    activeMerchant: loadSavedMerchant(), // Logged in merchant session
    deliveryLocation: loadSavedLocation(), // Active delivery location
    cart: [
        {
            stallId: "stall_b01",
            stallName: "ผักสวนครัวลุงสนั่น",
            stallNumber: "แผง B01",
            productId: "vegb_05",
            name: "มะเขือเปราะกรอบหวาน",
            price: 15,
            unit: "500 กรัม",
            qty: 1
        },
        {
            stallId: "stall_b01",
            stallName: "ผักสวนครัวลุงสนั่น",
            stallNumber: "แผง B01",
            productId: "vegb_04",
            name: "ข่าอ่อน + ตะไคร้สด + ใบมะกรูด",
            price: 15,
            unit: "1 ชุด",
            qty: 1
        },
        {
            stallId: "stall_c01",
            stallName: "กะทิสดชาวเกาะ ลุงสมหมาย",
            stallNumber: "แผง C01",
            productId: "cocon_01",
            name: "หัวกะทิสดคั้นแท้ 100%",
            price: 40,
            unit: "500 มล.",
            qty: 1
        },
        {
            stallId: "stall_seafood",
            stallName: "อาหารทะเลสดลุงหวัง",
            stallNumber: "แผง E11",
            productId: "sea_02",
            name: "ปลาหมึกกล้วยสดไซส์กลาง",
            price: 110,
            unit: "500 กรัม",
            qty: 1
        }
    ],
    activeOrder: {
        orderId: "#TH-8902",
        status: "picking",
        total: 235,
        stalls: [
            { stallId: "stall_chicken", name: "ร้านไก่สด Hub", itemsCount: 2, pickedCount: 2, status: "ready" },
            { stallId: "stall_veggie", name: "แผงผักป้าสมร", itemsCount: 1, pickedCount: 0, status: "weighing" },
            { stallId: "stall_curry", name: "เครื่องแกงเจ๊ณี", itemsCount: 1, pickedCount: 1, status: "ready" }
        ]
    }
};

// 3. Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateDeliveryLocationUI();
    renderAuthHeaderButtons();
    renderFavoriteStallsBar();
    renderCatalog();
    updateCartUI();
    renderTrackingScreen();
    renderDirectoryList();
});

// ==========================================
// ROLE & SCREEN NAVIGATION
// ==========================================
function switchRole(role) {
    state.currentRole = role;

    document.querySelectorAll(".role-btn").forEach(btn => btn.classList.remove("active", "text-white", "bg-emerald-500"));
    const activeBtn = document.getElementById(`role-btn-${role}`);
    if (activeBtn) activeBtn.classList.add("active");

    document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));

    if (role === "customer") {
        document.getElementById("customer-view-container").classList.remove("hidden");
    } else if (role === "hub") {
        document.getElementById("hub-view-container").classList.remove("hidden");
    } else if (role === "merchant") {
        document.getElementById("merchant-view-container").classList.remove("hidden");
    } else if (role === "rider") {
        const rvc = document.getElementById("rider-view-container");
        if (rvc) rvc.classList.remove("hidden");
    }
}

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
    const pickingTab = document.getElementById("hub-tab-picking");
    const settlementTab = document.getElementById("hub-tab-settlement");
    const pickingContent = document.getElementById("hub-content-picking");
    const settlementContent = document.getElementById("hub-content-settlement");

    if (tabName === "picking") {
        pickingTab.className = "font-bold text-emerald-700 border-b-2 border-emerald-600 pb-1";
        settlementTab.className = "font-medium text-slate-500 pb-1 hover:text-slate-800";
        pickingContent.classList.remove("hidden");
        settlementContent.classList.add("hidden");
    } else {
        settlementTab.className = "font-bold text-emerald-700 border-b-2 border-emerald-600 pb-1";
        pickingTab.className = "font-medium text-slate-500 pb-1 hover:text-slate-800";
        settlementContent.classList.remove("hidden");
        pickingContent.classList.add("hidden");
    }
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

                <!-- Products Grid (6 รายการ ขนาดเท่ากันทุกช่อง) -->
                <div class="grid grid-cols-2 gap-2.5 px-3.5">
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

    const deliveryFee = (state.deliveryLocation && typeof state.deliveryLocation.fee === "number") ? state.deliveryLocation.fee : 25;
    
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
            document.getElementById("cart-floating-total").textContent = `฿${totals.grandTotal}`;
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
    if (addrTitle) addrTitle.textContent = state.deliveryLocation ? state.deliveryLocation.title : "บ้านคุณสุรีย์ (ร้านเจ๊เจียบ ซ.เปิดน้อย)";
    if (addrDetail) addrDetail.textContent = state.deliveryLocation ? state.deliveryLocation.detail : "ที่อยู่บ้านสุรีย์ - ติดต่อที่บ้านคุณ";
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
    reader.onload = function(e) {
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
    reader.onload = function(e) {
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

    state.activeOrder = {
        orderId: "#TH-" + Math.floor(1000 + Math.random() * 9000),
        status: "picking",
        total: totals.grandTotal,
        paymentType: paymentType,
        paymentDesc: paymentDesc,
        deliveryNote: noteVal,
        stalls: Object.values(state.cart.reduce((acc, item) => {
            if (!acc[item.stallId]) {
                acc[item.stallId] = {
                    stallId: item.stallId,
                    name: item.stallName,
                    itemsCount: 0,
                    pickedCount: 0,
                    status: "picking"
                };
            }
            acc[item.stallId].itemsCount += item.qty;
            return acc;
        }, {}))
    };

    if (paymentType === "bank_transfer") {
        showToast("🎉 ยืนยันการโอนเงิน SCB สำเร็จ! ส่งออเดอร์ไปยัง Hub แล้ว");
    } else if (paymentType === "cod") {
        showToast("🎉 สั่งซื้อสำเร็จ! เตรียมชำระเงินสดปลายทางกับไรเดอร์");
    } else {
        showToast("🎉 ชำระเงินสำเร็จ! ส่งออเดอร์ไปยังทีมจัดของ Hub แล้ว");
    }
    
    goToTrackingScreen();
}

// ==========================================
// TRACKING SCREEN RENDERING & INTERACTIVE ACTIONS
// ==========================================
function renderTrackingScreen() {
    const order = state.activeOrder;
    if (!order) return;

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    
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
    
    const destTitle = state.deliveryLocation ? state.deliveryLocation.title : "บ้านคุณสุรีย์ (ร้านเจ๊เจียบ ซ.เปิดน้อย)";
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
        } else {
            completedActionsBox.classList.add("hidden");
        }
    }
    
    // Render Stall Progress Checklist matching user screenshot
    const container = document.getElementById("tracking-stalls-progress");
    if (!container) return;

    let totalPicked = 0;
    let html = "";
    order.stalls.forEach((stall, idx) => {
        const isReady = stall.pickedCount >= stall.itemsCount;
        if (isReady) totalPicked++;
        
        let statusBadge = `<span class="text-[10px] text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs"><span>⏳</span><span>กำลังจัดเตรียม</span></span>`;
        if (isReady) {
            statusBadge = `<span class="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs"><span>✓</span><span>หยิบครบแล้ว</span></span>`;
        }

        html += `
            <div onclick="toggleStallPicking(${idx})" class="flex items-center justify-between p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs text-xs cursor-pointer transition-all active:scale-[0.99]" title="คลิกเพื่อเปลี่ยนสถานะการหยิบสินค้าของแผงนี้">
                <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-xl ${isReady ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'} flex items-center justify-center font-bold text-sm shrink-0">
                        ${isReady ? '✓' : '⏳'}
                    </div>
                    <div>
                        <div class="font-extrabold text-slate-800 text-xs leading-tight">${stall.name}</div>
                        <div class="text-[10px] text-slate-400 mt-0.5 font-medium">จำนวน ${stall.itemsCount} รายการ</div>
                    </div>
                </div>
                ${statusBadge}
            </div>
        `;
    });

    container.innerHTML = html;
    setVal("picking-progress-badge", `หยิบแล้ว ${totalPicked}/${order.stalls.length} แผง`);
}

// Toggle Stall Picking Status interactively
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
    
    // Check if all are picked
    const allPicked = state.activeOrder.stalls.every(s => s.pickedCount >= s.itemsCount);
    if (allPicked && state.activeOrder.status === "picking") {
        setTimeout(() => {
            simulateOrderStatus("delivering");
        }, 600);
    } else {
        renderTrackingScreen();
    }
}

// Interactive Simulation Controller
function simulateOrderStatus(targetStatus) {
    if (!state.activeOrder) return;
    state.activeOrder.status = targetStatus;

    if (targetStatus === "picking") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = 0);
        showToast("📦 ขั้นตอนที่ 1-2: ทีมงานกำลังเดินหยิบของสดในตลาด");
    } else if (targetStatus === "delivering") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = s.itemsCount);
        showToast("🛵 ขั้นตอนที่ 3: รวมของครบแล้ว! ไรเดอร์พี่สมชาย กำลังออกเดินทาง");
    } else if (targetStatus === "delivered") {
        state.activeOrder.stalls.forEach(s => s.pickedCount = s.itemsCount);
        showToast("🎉 ขั้นตอนที่ 4: จัดส่งสำเร็จถึงมือคุณเรียบร้อยแล้ว!");
    }
    renderTrackingScreen();
}

// Refresh status button cycles through workflow
function refreshOrderStatus() {
    if (!state.activeOrder) return;
    const current = state.activeOrder.status || "picking";
    if (current === "picking") {
        simulateOrderStatus("delivering");
    } else if (current === "delivering") {
        simulateOrderStatus("delivered");
    } else {
        simulateOrderStatus("picking");
    }
}

// Rider Phone Call
function callRiderPhone() {
    showToast("📞 กำลังโทรติดต่อ พี่สมชาย (Hub Rider) 081-234-5678...");
    setTimeout(() => {
        window.location.href = "tel:0812345678";
    }, 400);
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
        const id = state.customer && state.customer.isLoggedIn ? state.customer.identifier : "@pisaen6666";
        idEl.textContent = `คุณสุรีย์ (${id})`;
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
        navigator.clipboard.writeText(code).catch(() => {});
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
            setVal("receipt-grand-total", `฿${order.total}`);
            const payText = order.paymentType === "bank_transfer" ? "โอนผ่านธนาคารไทยพาณิชย์ (SCB)" : (order.paymentType === "cod" ? "เก็บเงินสดปลายทาง (COD)" : "PromptPay (สแกนจ่ายสำเร็จ)");
            setVal("receipt-payment-method", payText);
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
    // Add default products into cart
    cart = [
        { id: 1, name: "มะเขือเปราะกรอบหวาน", stall: "ผักสวนครัวลุงสนั่น (B01)", price: 15, qty: 1, image: "🥒" },
        { id: 2, name: "ข่าอ่อน + ตะไคร้สด + ใบมะกรูด", stall: "ผักสวนครัวลุงสนั่น (B01)", price: 15, qty: 1, image: "🌿" },
        { id: 3, name: "หัวกะทิสดคั้นแท้ 100%", stall: "กะทิสดชาวเกาะ ลุงสมหมาย (C01)", price: 40, qty: 1, image: "🥥" },
        { id: 4, name: "ปลาหมึกกล้วยสดไซส์กลาง", stall: "อาหารทะเลสดลุงหวัง (E11)", price: 110, qty: 1, image: "🦑" }
    ];
    updateCartUI();
    showToast("🔁 โหลดรายการเดิม 4 รายการลงตะกร้าเรียบร้อยแล้ว!");
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
// LOCATION & DELIVERY SCHEDULE ENGINE
// ==========================================
function getNextDeliverySlotInfo() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes < 8 * 60) {
        return { slot: "รอบเช้า 08:30 น.", desc: "รอบเช้า 08:30 น. (Rider รวมของส่งถึงหน้าบ้าน)" };
    } else if (totalMinutes < 11 * 60) {
        return { slot: "รอบสาย 11:30 น.", desc: "รอบสาย 11:30 น. (ทันเตรียมอาหารกลางวัน)" };
    } else if (totalMinutes < 14 * 60 + 30) {
        return { slot: "รอบบ่าย 15:00 น.", desc: "รอบบ่าย 15:00 น. (วัตถุดิบสดรอบบ่าย)" };
    } else if (totalMinutes < 17 * 60) {
        return { slot: "รอบเย็น 17:30 น.", desc: "รอบเย็น 17:30 น. (ทันเตรียมอาหารเย็น)" };
    } else {
        return { slot: "รอบเช้าพรุ่งนี้ 07:30 น.", desc: "รอบเช้าพรุ่งนี้ 07:30 น. (ของสดใหม่รอบแรก)" };
    }
}

function updateDeliveryLocationUI() {
    const loc = state.deliveryLocation || {
        title: "หมู่บ้านพฤกษา 3 ซอย 5",
        distance: "1.8 กม.",
        fee: 25
    };

    const slotInfo = getNextDeliverySlotInfo();

    // Top Header previews
    const topAddressPreview = document.getElementById("selected-address-preview");
    const topSlotText = document.getElementById("top-delivery-slot-text");
    if (topAddressPreview) {
        topAddressPreview.textContent = `${loc.title}`;
    }
    if (topSlotText) {
        topSlotText.textContent = slotInfo.slot;
    }

    // Welcome Card previews
    const welcomeLocTitle = document.getElementById("welcome-location-title");
    const welcomeDistText = document.getElementById("welcome-distance-text");
    const welcomeFeeText = document.getElementById("welcome-fee-text");
    const welcomeSlotText = document.getElementById("welcome-next-slot-text");

    if (welcomeLocTitle) welcomeLocTitle.textContent = loc.title;
    if (welcomeDistText) welcomeDistText.textContent = loc.distance;
    if (welcomeFeeText) welcomeFeeText.textContent = `฿${loc.fee}`;
    if (welcomeSlotText) welcomeSlotText.textContent = slotInfo.desc;
}

function openLocationModal() {
    document.getElementById("location-modal").classList.remove("hidden");
}

function closeLocationModal() {
    document.getElementById("location-modal").classList.add("hidden");
}

function selectSavedLocation(title, distance, fee) {
    state.deliveryLocation = {
        title: title,
        detail: `ห่างจากตลาดสด ${distance}`,
        distance: distance,
        fee: fee
    };
    updateDeliveryLocationUI();
    closeLocationModal();
    updateCartUI();
    if (state.currentScreen === "checkout") {
        renderCheckoutPage();
    }
    showToast(`📍 เปลี่ยนจุดจัดส่ง: ${title} (${distance} • ฿${fee})`);
}

function detectCurrentLocationGPS() {
    showToast("📍 กำลังตรวจจับพิกัด GPS ของคุณ...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                selectSavedLocation("ตำแหน่งปัจจุบันของคุณ (GPS)", "1.5 กม.", 25);
                showToast("📍 ตรวจพบพิกัดของคุณสำเร็จ! ห่างจากตลาด 1.5 กม. (ค่าส่ง ฿25)");
            },
            (err) => {
                selectSavedLocation("หมู่บ้านพฤกษา 3 (ซอย 5)", "1.8 กม.", 25);
                showToast("📍 ตรวจพบพิกัดจาก QR Code เรียบร้อยแล้ว");
            },
            { timeout: 4000 }
        );
    } else {
        selectSavedLocation("หมู่บ้านพฤกษา 3 (ซอย 5)", "1.8 กม.", 25);
    }
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
    renderCatalog();

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
    renderAuthHeaderButtons();
    showToast("🚪 ออกจากระบบลูกค้าเรียบร้อยแล้ว");
}

function logoutMerchant() {
    state.activeMerchant = null;
    activeMerchantStallId = null;
    saveMerchantToStorage(null);
    renderAuthHeaderButtons();
    showToast("🚪 ออกจากระบบร้านค้าเรียบร้อยแล้ว");
}

function renderAuthHeaderButtons() {
    const container = document.getElementById("top-auth-buttons-container");
    if (!container) return;

    let html = "";

    // 1. Customer Section
    if (state.customer && state.customer.isLoggedIn) {
        const iconName = state.customer.type === "line" ? "chat" : "smartphone";
        html += `
            <div class="flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-xs shadow-xs">
                <span class="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-emerald-400">${iconName}</span>
                    <span>${state.customer.identifier}</span>
                </span>
                <button onclick="logoutCustomer()" class="text-[10px] text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-700 px-1.5 py-0.5 rounded-lg font-bold transition-all" title="ออกจากระบบลูกค้า">
                    ออกจากระบบ
                </button>
            </div>
        `;
    } else {
        html += `
            <button onclick="openCustomerLoginModal()" id="btn-customer-login" class="px-2.5 sm:px-3 py-1.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-1 shadow-xs active:scale-95 transition-all">
                <span class="material-symbols-outlined text-sm">person</span>
                <span>ลูกค้า Log In</span>
            </button>
        `;
    }

    // 2. Merchant Section
    if (state.activeMerchant && state.activeMerchant.isLoggedIn) {
        html += `
            <div class="flex items-center gap-1.5 bg-amber-950/90 border border-amber-500/40 px-2.5 py-1 rounded-xl text-xs shadow-xs">
                <span class="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-400">store</span>
                    <span>${state.activeMerchant.stallNumber || 'ร้านค้า'}</span>
                </span>
                <button onclick="loginAsMerchantStall('${state.activeMerchant.stallId}')" class="text-[10px] text-amber-200 bg-amber-800/80 hover:bg-amber-700 px-1.5 py-0.5 rounded-lg font-bold transition-all">
                    จัดการแผง
                </button>
                <button onclick="logoutMerchant()" class="text-[10px] text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-700 px-1.5 py-0.5 rounded-lg font-bold transition-all" title="ออกจากระบบร้านค้า">
                    ออก
                </button>
            </div>
        `;
    } else {
        html += `
            <button onclick="openMerchantLoginModal()" id="btn-merchant-login" class="px-2.5 sm:px-3 py-1.5 rounded-xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs flex items-center gap-1 shadow-md hover:shadow-orange-glow active:scale-95 transition-all">
                <span class="material-symbols-outlined text-sm font-bold">store</span>
                <span>ร้านค้า Log In</span>
            </button>
        `;
    }

    container.innerHTML = html;
}

function openMerchantLoginModal() {
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
    reader.onload = function(e) {
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
