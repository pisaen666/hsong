const fs = require('fs');

let js = fs.readFileSync('app.js', 'utf8');

// 1. Update switchRole to check login for merchant
const oldSwitchRoleBlock = `    if (targetRole === "merchant") {
        if (!state.activeMerchant || !state.activeMerchant.isLoggedIn) {
            const defaultStall = MARKET_DATA[0];
            if (defaultStall) {
                activeMerchantStallId = defaultStall.stallId;
                state.activeMerchant = {
                    isLoggedIn: true,
                    stallId: defaultStall.stallId,
                    stallName: defaultStall.stallName,
                    stallNumber: defaultStall.stallNumber
                };
                saveMerchantToStorage(state.activeMerchant);
            }
        }
        setActiveRoleView("merchant");
        if (typeof renderMerchantView === "function") renderMerchantView();
        return;
    }`;

const newSwitchRoleBlock = `    if (targetRole === "merchant") {
        if (!state.activeMerchant || !state.activeMerchant.isLoggedIn) {
            openMerchantLoginModal();
            return;
        }
        setActiveRoleView("merchant");
        if (typeof renderMerchantView === "function") renderMerchantView();
        return;
    }`;

if (js.includes(oldSwitchRoleBlock)) {
    js = js.replace(oldSwitchRoleBlock, newSwitchRoleBlock);
    console.log('Replaced oldSwitchRoleBlock in app.js');
}

// 2. Update renderMerchantView to open login modal if not logged in
const oldRenderMerchantViewStart = `function renderMerchantView() {
    // 1. Sync Active Stall
    let stall = null;
    if (activeMerchantStallId) {
        stall = MARKET_DATA.find(s => s.stallId === activeMerchantStallId) || ALL_100_STALLS.find(s => s.stallId === activeMerchantStallId);
    }
    if (!stall && state.activeMerchant && state.activeMerchant.stallId) {
        stall = MARKET_DATA.find(s => s.stallId === state.activeMerchant.stallId) || ALL_100_STALLS.find(s => s.stallId === state.activeMerchant.stallId);
    }
    if (!stall) {
        stall = MARKET_DATA[0];
        activeMerchantStallId = stall.stallId;
    }`;

const newRenderMerchantViewStart = `function renderMerchantView() {
    if (!state.activeMerchant || !state.activeMerchant.isLoggedIn) {
        openMerchantLoginModal();
        return;
    }
    // 1. Sync Active Stall
    let stall = null;
    if (activeMerchantStallId) {
        stall = MARKET_DATA.find(s => s.stallId === activeMerchantStallId) || ALL_100_STALLS.find(s => s.stallId === activeMerchantStallId);
    }
    if (!stall && state.activeMerchant && state.activeMerchant.stallId) {
        stall = MARKET_DATA.find(s => s.stallId === state.activeMerchant.stallId) || ALL_100_STALLS.find(s => s.stallId === state.activeMerchant.stallId);
    }
    if (!stall) {
        stall = MARKET_DATA[0];
        activeMerchantStallId = stall.stallId;
    }`;

if (js.includes(oldRenderMerchantViewStart)) {
    js = js.replace(oldRenderMerchantViewStart, newRenderMerchantViewStart);
    console.log('Replaced oldRenderMerchantViewStart in app.js');
}

// 3. Update logoutMerchant
const oldLogoutMerchant = `function logoutMerchant() {
    state.activeMerchant = null;
    activeMerchantStallId = null;
    saveMerchantToStorage(null);
    renderAuthHeaderButtons();
    setActiveRoleView("customer");
    showToast("🚪 ออกจากระบบร้านค้าเรียบร้อยแล้ว");
}`;

const newLogoutMerchant = `function logoutMerchant() {
    state.activeMerchant = null;
    activeMerchantStallId = null;
    try {
        localStorage.removeItem("talathub_logged_in_merchant");
        localStorage.removeItem("hsong_logged_in_merchant");
    } catch(e) {}
    saveMerchantToStorage(null);
    renderAuthHeaderButtons();
    switchRole("customer");
    goToMarketScreen();
    showToast("🚪 ออกจากระบบร้านค้าเรียบร้อยแล้ว");
}`;

if (js.includes(oldLogoutMerchant)) {
    js = js.replace(oldLogoutMerchant, newLogoutMerchant);
    console.log('Replaced oldLogoutMerchant in app.js');
}

// 4. Update loginAsMerchantStall to switch role and render properly
const oldLoginAsMerchant = `function loginAsMerchantStall(stallId) {
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
    renderAuthHeaderButtons();`;

const newLoginAsMerchant = `function loginAsMerchantStall(stallId) {
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
    setActiveRoleView("merchant");
    renderMerchantView();`;

if (js.includes(oldLoginAsMerchant)) {
    js = js.replace(oldLoginAsMerchant, newLoginAsMerchant);
    console.log('Replaced oldLoginAsMerchant in app.js');
}

fs.writeFileSync('app.js', js, 'utf8');

// Update index.html cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app\.js\?v=[^"]+/, 'app.js?v=9.13_merchant_true_logout_fixed');
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html cache buster updated');
