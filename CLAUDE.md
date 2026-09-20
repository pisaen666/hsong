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
   - Test in the sandbox (see section 5) or read-only on `http://localhost:3000`. Never test write flows against the live Firebase.
   - Commit with descriptive commit messages (`fix(...)`, `feat(...)`).
   - Push to `origin main` only when the owner asks (phrase in section 4). `main` is the live website (GitHub Pages). Never force-push.
   - When `app.js` changes and is pushed, bump the `app.js?v=...` tag in `index.html` (GitHub Pages caches for 10 minutes).

## 🤖 4. Claude Working Scope (ขอบเขตการทำงานของ Claude)
Owner is a solo beginner with low vision: reply in Thai, short sentences, plain words, explain jargon. Owner works from two computers (home / office) synced only through GitHub; see `คู่มือสื่อสารกับ_Claude.md` and `HANDOFF_TO_CLAUDE.md`.

**Do without asking (ทำเองได้เลย):**
- Read, search and edit project files; run `node -c app.js`; run local tests.
- Start throwaway servers on ports other than 3000 (e.g. 3001) from a sandbox copy (section 5) and stop them afterwards. Never stop the owner's server on port 3000.
- Read-only Firebase access: HTTP GET and `node sync-firebase.js` (downloads only).
- `git status / diff / log / pull`, and `git add` + `git commit` for finished work.
- Anything at all on the test Firebase project `hsong-test` (created 2026-09-20; Spark plan, Realtime DB in asia-southeast1, Email/Password auth with 2 owner accounts). Its web config is not secret; owner UIDs are listed in `firebase-rules/hsong-test.rules.json`. Never type or ask for the owner's passwords.

**Ask first, every time (ต้องถามก่อนเสมอ):**
- Any write or delete on the production Firebase project `hsong-1f342` (PUT / POST / PATCH / DELETE, `.set()`, `.remove()`, deploys).
- Changing or publishing production Firebase rules.
- `git push` to `main`, except on the owner's phrase below or an explicit request. No force-push, no history rewrites.
- Anything that costs money (e.g. Firebase Blaze plan) and deleting owner data or files Claude did not create.
- Claude never creates accounts or types passwords for the owner; the owner does that.

**Owner phrase `แก้เสร็จแล้ว อัปขึ้นเว็บให้ทดสอบ`** = run `node -c app.js`, bump the `app.js?v=` tag, commit, push to `main`, then verify the live site (https://pisaen666.github.io/hsong/) by fetching it and comparing files with local. Do not open the live page in a browser pane: page start-up syncs to the live Firebase.

## 🧪 5. Safe Testing Recipe (สำคัญ)
The production database is shared and currently open to everyone. Lesson from 2026-09-20: rider test data leaked into the live DB because the page was reloaded while seeded test data sat in localStorage (app start-up pushes riders from localStorage to the cloud).
- Sandbox: copy `index.html app.js styles.css firebase-config.js server.js images/` and the `.png` files to a temp folder; replace the host `hsong-1f342-default-rtdb.asia-southeast1.firebasedatabase.app` with `127.0.0.1:9` in `app.js`, `firebase-config.js` and `index.html`; run `PORT=3001 node server.js`; open `http://localhost:3001` (it has its own localStorage). Confirm no real host is left with `grep -c firebasedatabase.app`.
- In the sandbox the Firebase SDK never connects but `isFirebaseReady()` is still true, so `await db.ref().set()` hangs. Any awaited Firebase write needs a timeout (see `_withTimeout` in `app.js`).
- After anything that could touch production, confirm with a GET that no test data exists (`community_riders`, `rider_applications`, `rider_documents`).

## 🔐 5b. Owner Sign-in & Private Data (LIVE on main since 2026-09-20)
- Admin (Role 5) and Hub (Role 2) now use ONE Firebase Auth email/password owner account instead of PINs (`admin6305`, `hb6305`, quick-login buttons and the hub PIN setting were removed). Code: `initOwnerAuth`, `applyOwnerSession`, `verifyOwnerPassword` in `app.js`; `auth` and `OWNER_UIDS` in `firebase-config.js`.
- Production owner accounts (primary + backup) exist in `hsong-1f342` Authentication; their UIDs are in `firebase-config.js` (`OWNER_UIDS`) and in `firebase-rules/hsong-1f342.rules.json` (published in the Firebase Console). Sign-up is disabled. If the owner ever loses both accounts, Admin/Hub cannot be opened: create a new user in the Console and add its UID to BOTH `OWNER_UIDS` and the rules.
- Deploy order that worked: publish rules first (old code still works with them), then merge/push code. Keep `firebase-config.js?v=` and `app.js?v=` tags bumped in `index.html`.
- Rider personal data (ID number, address, emergency contact, bank accounts, driving-license number) lives ONLY in `rider_private/<riderId>` (owner read; riders create-only). `stripRiderPrivate*` removes it from every write to localStorage, `rider_applications` and `community_riders`; `_riderPrivateCache` (memory only) is filled after owner sign-in and merged by `loadRiderApplications()`. Any NEW code that writes rider/application objects to storage or Firebase must strip private fields. Known leftovers: `promptPay` (may be a national ID), phone and LINE id are still public; merchant applications (bank accounts), orders and carts are still open.
- Test environment with the REAL Auth SDK: copy the app to a temp folder, in `app.js` replace the host `hsong-1f342-default-rtdb...` with `hsong-test-default-rtdb.asia-southeast1.firebasedatabase.app`, set the `hsong-test` web config and test UIDs in `firebase-config.js`, run `PORT=3001 node server.js`. Claude cannot log in for the owner (no passwords); the owner tests the real login by hand. Logic can be tested with a mock `auth` object in a sandbox.

## ⚠️ 6. Known Constraints (update when resolved)
- Firebase rules are open read/write until 2026-11-02 (`1793552400000` in `database.rules.json`, which is git-ignored). After that date the app cannot read or write. Personal data (ID numbers, addresses, driver-license photos in `rider_documents/<riderId>`) is publicly readable until Auth-based rules exist. Plan: Firebase Auth email/password for the owner (one account for hub + admin, plus a backup account), UID-based rules, tested on `hsong-test` first.
- Admin/hub PINs (`admin6305`, `hb6305`) and the admin "test mode" quick login are checked only in the browser and can be bypassed.
- Both rider registration forms auto-approve; documents are collected but nobody must verify them before a rider can take jobs.
- GP rate: docs elsewhere say 5%, code defaults to 10% (Admin can set 0 but the report silently turns it into 10%). Rider fee is hard-coded to 40 THB per trip in the report. Waiting for the owner's decision.
