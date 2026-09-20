# Project Guidelines: TalatHub / Hsong (ตลาดสดบ้านบึง - ตลาดวิศิษฐ์ชัย)

## 📌 1. Project Overview & Architecture
- **Type**: Single Page Application (SPA) for community fresh market delivery.
- **Frontend**: Vanilla HTML5 (`index.html`), Vanilla JavaScript (`app.js`), Tailwind CSS (CDN).
- **Backend & Database**: 
  - Realtime Database: Firebase RTDB (`https://hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app`)
  - Local Storage Fallback: LocalStorage with keys prefixed by `talathub_*` or `hsong_*`.
  - Local Server: `node server.js` serving `localhost:3000` (and LAN IP e.g. `192.168.1.34:3000`) with `Cache-Control: no-store`.
  - Sync Script: `node sync-firebase.js` (downloads live RTDB state to `firebase-rtdb-export.json`).

## 👥 2. The 5 Core Roles & Current Status
1. **Role 1 (Customer / ลูกค้า)**: [✅ Complete] Market catalog, multi-stall cart, GPS destination picker, checkout, order tracking.
2. **Role 2 (Hub Operations / ศูนย์จัดส่งฮับ)**: [✅ Complete] Consolidated picking list, packing verification, rider assignment/dispatch, end-of-day settlement.
3. **Role 3 (Merchant / แผงค้าตลาด)**: [✅ Complete] Stall open/close status, product availability, bank setup, GP 5% fee calculation, express call.
4. **Role 4 (Rider / ไรเดอร์)**: [✅ Complete & Purged]
   - **Guest Portal (`#rider-guest-view`)**: Shown when not logged in.
     - Tab 1: 📝 Registration form (`#onpage-rider-reg-form`) with `1-Click Sample Data Fill` and `1-Click Instant Register & Login`.
     - Tab 2: 🔑 Login tab with registered rider list (`#onpage-registered-riders-list`) and PIN/phone input.
     - Auto-opens Registration tab if 0 riders exist in database!
   - **Active Workspace (`#rider-logged-in-view`)**: Active delivery order, map route, cash collection (COD), PromptPay payout, wallet balance.
5. **Role 5 (Admin / ผู้ดูแลระบบ)**: [⏳ Active Development / Audit]
   - Approvals for merchant stalls and rider applications.
   - Financial settlement logs, rider rosters, system-wide configuration.

## ⚠️ 3. Strict Development Rules & Constraints
1. **NO DUMMY / MOCK RIDERS**:
   - `DEFAULT_COMMUNITY_RIDERS` in `app.js` must remain `[]`. Never hardcode dummy riders (e.g. Somchai, Noah, Sam).
   - Real riders must be created through user registration or the explicit `1-Click Test Register` button.
2. **MANDATORY SYNTAX VALIDATION**:
   - Every time `app.js` is modified, immediately run: `node -c app.js`.
   - Never finalize a task if syntax check fails.
3. **GLOBAL WINDOW BINDINGS**:
   - All interactive handlers invoked via HTML `onclick="..."` or `onsubmit="..."` MUST be attached to `window.*` (e.g. `window.switchRole = switchRole;`).
4. **SESSION INTEGRITY**:
   - Multi-role switching must preserve logged-in sessions across roles (`state.activeRider`, `state.activeMerchant`, `state.activeAdmin`).
5. **MODAL Z-INDEX**:
   - All primary modals (`rider-register-modal`, `rider-login-modal`, etc.) must maintain `z-[999999]` and explicit `display: flex / none` management so they never hide behind sticky headers.
6. **GIT WORKFLOW**:
   - Test locally first on `http://localhost:3000`.
   - Commit with descriptive commit messages (`fix(...)`, `feat(...)`).
   - Push to `origin main` cleanly.
