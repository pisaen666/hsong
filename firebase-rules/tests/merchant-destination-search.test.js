// ทดสอบฟีเจอร์ใหม่ 2026-09-23 (คำขอเจ้าของ): หน้าจอ "แผงค้าเรียกไรเดอร์ไปส่งปลายทางอื่น" (ไม่ใช่หน้าร้าน)
// เดิมมีแค่ปุ่ม GPS (ใช้ไม่ได้ถ้าร้านค้าไม่ได้อยู่ ณ จุดนั้นจริง) กับแตะ/ลากหมุดเปล่า ๆ ไม่มีช่องค้นหาเลย
// ต่างจากฝั่งลูกค้าที่มีช่องค้นหาสถานที่/วางลิงก์ Google Maps/Plus Code ให้ใช้อยู่แล้ว
//   - แก้โดยเอาระบบค้นหาชุดเดียวกับฝั่งลูกค้ามาต่อกับแผนที่ของแผงค้า ผ่านตัวแปร _activeLocationSearchTarget
//     ("customer"/"merchant") และ _lsEl(key) ที่แปะช่อง input/dropdown/list/spinner/clearBtn ให้ถูกฝั่ง
//   - ตรวจแบบ static: ฟังก์ชันตัวห่อสำหรับแผงค้าต้องมีครบ, ต้องตั้ง/คืนค่า target ตอนเปิด/ปิดหน้าต่างแผนที่แผงค้า,
//     และ selectLocationSearchResult ต้องแยกเส้นทางไปแผนที่แผงค้าเมื่อ target เป็น merchant
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

function fn(name) {
    const start = src.indexOf("function " + name + "(");
    if (start < 0) throw new Error("not found: " + name);
    let i = src.indexOf("{", start), d = 0;
    for (; i < src.length; i++) { if (src[i] === "{") d++; else if (src[i] === "}" && --d === 0) break; }
    return src.slice(start, i + 1);
}

// ฟังก์ชันตัวห่อของแผงค้าต้องมีครบและผูก window ครบ (เรียกจาก onclick ใน index.html ได้)
["handleMerchantLocationSearchInput", "executeMerchantLocationSearchNow", "pasteFromClipboardToMerchantSearch",
    "clearMerchantLocationSearch", "openGoogleMapsSearchHelperMerchant"].forEach(name => {
        ok(src.includes("function " + name + "("), `พบฟังก์ชัน ${name}`);
        ok(new RegExp("window\\." + name + " = " + name).test(src), `${name} ผูกกับ window แล้ว (เรียกจาก onclick ได้)`);
    });

// เปิดหน้าต่างแผนที่แผงค้า -> ต้องตั้ง target เป็น merchant / ปิด -> ต้องคืนเป็น customer
const openBody = fn("openMerchantDestinationMap");
ok(/_activeLocationSearchTarget = "merchant"/.test(openBody), "openMerchantDestinationMap ตั้ง _activeLocationSearchTarget เป็น merchant ตอนเปิด");
const closeBody = fn("closeMerchantMapModal");
ok(/_activeLocationSearchTarget = "customer"/.test(closeBody), "closeMerchantMapModal คืนค่า _activeLocationSearchTarget เป็น customer ตอนปิด");
const openLocBody = fn("openLocationModal");
ok(/_activeLocationSearchTarget = "customer"/.test(openLocBody), "openLocationModal (ฝั่งลูกค้า) ตั้ง target กลับเป็น customer เองด้วย กันปนกันถ้าเปิดต่อจากแผงค้า");

// selectLocationSearchResult ต้องแยกเส้นทางไปแผนที่แผงค้าเมื่อ target เป็น merchant ก่อนจะไปทำงานฝั่งลูกค้าต่อ
const selectBody = fn("selectLocationSearchResult");
ok(/_activeLocationSearchTarget === "merchant"/.test(selectBody) && /_applyLocationResultToMerchantMap/.test(selectBody),
    "selectLocationSearchResult แยกไปแผนที่แผงค้าก่อน ถ้า target เป็น merchant");

// _applyLocationResultToMerchantMap ต้องเรียกฟังก์ชันปักหมุด/คำนวณระยะทาง-ค่าส่งของแผงค้าที่มีอยู่แล้ว (ไม่สร้างแผนที่ซ้ำ)
const applyBody = fn("_applyLocationResultToMerchantMap");
ok(/merchantPickerMap/.test(applyBody) && /merchantPickerMarker/.test(applyBody), "_applyLocationResultToMerchantMap ใช้ merchantPickerMap/merchantPickerMarker ตัวเดิม");
ok(/_onMerchantMapPinMoved/.test(applyBody), "_applyLocationResultToMerchantMap เรียก _onMerchantMapPinMoved (คำนวณระยะทาง/ค่าส่ง/ปุ่มยืนยัน ตัวเดิม)");

// index.html: ต้องมีช่องค้นหาของแผงค้าครบตาม id ที่โค้ดอ้างถึง
["merchant-location-search-wrapper", "merchant-location-search-input", "merchant-location-search-spinner",
    "merchant-location-search-dropdown", "merchant-location-search-results-list", "btn-clear-merchant-location-search"].forEach(id => {
        ok(indexSrc.includes('id="' + id + '"'), `index.html มีช่อง id="${id}"`);
    });

// บั๊กตามมา 2026-09-23 (เจ้าของทดสอบจริงบนมือถือ): พอเพิ่มช่องค้นหาแล้ว เนื้อหาในหน้าต่างแผนที่แผงค้าล้นจอสั้น ๆ
// จนเลื่อนลงไปกดปุ่ม "ยืนยันปักหมุด" ไม่ถึง (โดนบล็อกโดย touch-action:none ที่กรอบนอก + ไม่มีตัวไหนเลื่อนได้เลย)
//   - แก้โดยห่อทุกอย่างยกเว้นหัวข้อกับปุ่มยืนยันด้วย div ที่เลื่อนได้ (overflow-y-auto) แล้วย้ายปุ่มยืนยันออกมาไว้
//     นอกกรอบเลื่อน ให้ปักหมุดอยู่ล่างสุดเสมอ กดถึงได้โดยไม่ต้องเลื่อนหา
const modalMatch = indexSrc.match(/<div id="merchant-map-modal"[\s\S]*?<!-- END MERCHANT MAP PICKER MODAL -->/);
ok(!!modalMatch, "พบบล็อก #merchant-map-modal ทั้งก้อนใน index.html");
const modalHtml = modalMatch ? modalMatch[0] : "";

ok(!/id="merchant-map-modal"[^>]*touch-action\s*:\s*none/.test(modalHtml), "กรอบนอก #merchant-map-modal ไม่มี touch-action:none อีกแล้ว (เคยบล็อกการเลื่อนทั้งหน้าต่าง)");
ok(/overflow-y-auto/.test(modalHtml), "มี div ที่เลื่อนได้ (overflow-y-auto) อยู่ในหน้าต่างนี้");

// ปุ่มยืนยันต้องอยู่ "หลัง" ตำแหน่งปิดของ div ที่เลื่อนได้ (คืออยู่นอกกรอบเลื่อน ไม่ใช่ในกรอบเลื่อน)
const scrollDivStart = modalHtml.indexOf('overflow-y-auto');
const scrollDivOpenTagStart = modalHtml.lastIndexOf('<div', scrollDivStart);
// หาโครงปิดของ div เลื่อนได้แบบนับวงเล็บ <div ... </div> คร่าว ๆ โดยนับจากจุดเปิดไปหาจุดที่ระดับซ้อนกลับมาเท่าเดิม
function findMatchingCloseDivIndex(html, openTagStart) {
    let i = html.indexOf(">", openTagStart) + 1;
    let depth = 1;
    const tagRe = /<div\b|<\/div>/g;
    tagRe.lastIndex = i;
    let m;
    while ((m = tagRe.exec(html))) {
        if (m[0] === "<div") depth++;
        else depth--;
        if (depth === 0) return m.index;
    }
    return -1;
}
const scrollDivCloseIdx = findMatchingCloseDivIndex(modalHtml, scrollDivOpenTagStart);
const confirmBtnIdx = modalHtml.indexOf('id="merchant-map-confirm-btn"');
ok(scrollDivCloseIdx > 0 && confirmBtnIdx > scrollDivCloseIdx, "ปุ่ม merchant-map-confirm-btn อยู่นอกกรอบที่เลื่อนได้ (ปักหมุดอยู่ล่างสุดเสมอ ไม่ต้องเลื่อนหา)");

console.log(fail ? "\n" + fail + " FAILED" : "\nALL PASSED");
process.exit(fail ? 1 : 0);
