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
3. **Role 3 (Merchant / แผงค้าตลาด)**: [✅ Complete] Stall open/close status, product availability, bank setup, GP 10% fee calculation (owner decision 2026-09-21), express call.
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

## 🛡️ 5c. Rules v2 & per-item cloud writes (PUBLISHED TO PRODUCTION 2026-09-21 with the owner's OK)
Goal: anyone may APPLY, only the owner may APPROVE / create real riders & stalls / delete. Files: `firebase-rules/build-rules.js` generates `hsong-test.rules.v2.json` and `hsong-1f342.rules.v2.json` (edit the template, never the JSON). PRODUCTION now runs `hsong-1f342.rules.v2.json` (deployed with the Firebase CLI from a temp folder, `--project hsong-1f342`). The old `*.rules.json` files are the previous version, kept for rollback.
- **Rollback (only useful before 2026-11-02, the old expiry):** copy `firebase-rules/hsong-1f342.rules.json` to `rules.json` in a temp folder that has `firebase.json` = `{"database":{"rules":"rules.json"}}` and `.firebaserc` default `hsong-1f342`, then `firebase deploy --only database --project hsong-1f342` (needs the owner's OK). The CLI has no command to download the published rules; git commit `322184a` holds the previous file.
- Verified after publishing (denial-only probes, nothing written): self-approve, direct create of riders/stalls, `daily_reports` write, unknown node and delete all return 401; public reads of the application nodes return 200; `rider_private`, `rider_documents` and the DB root return 401.
- Client: `syncListToCloud` / `syncKeyedToCloud` write ONLY changed items, one id at a time (`node/<id>`), instead of `set()` on the whole node. Used for `rider_applications`, `community_riders`, `merchant_applications`, `custom_market_stalls`, `stall_catalog_database`. Readers use `cloudValToList` (accepts old array layout AND id-keyed objects; id-keyed wins). Never add a whole-node `set()`/REST PUT for these nodes again.
- Owner sign-in runs `migrateLegacyCloudLists()` once: rewrites the old array layout (keys 0,1,2...) to id keys. Production data is still in the old layout (checked read-only 2026-09-21).
- Rules: non-owner may CREATE an application only with `status: "pending"` (merchant: no `accessCode`; rider: no `loginHash`/`loginSalt`); may UPDATE existing items only if `status`/`accessCode`/`id` (riders: `id`/`accessCode`/`phone`/`loginHash`/`loginSalt`; rider applications also `loginHash`/`loginSalt`; stalls: `stallId`/`accessCode`) are unchanged; may NOT delete. `community_riders`, `custom_market_stalls` and new `stall_catalog_database` entries: owner-only create. `daily_reports`: owner-only write. `orders carts riders rider_status rider_locations active_rider` stay open (no expiry).
- Rider registration (3 flows) now produces `pending` for visitors; the rider is created only when the owner approves (`approveRiderApplication`) or when the owner is signed in. `requireOwnerAction()` guards approve/reject/reconsider/delete. `approveAndLoginRider` logs an already-approved rider in without owner rights, but never approves for a visitor. The 1-Click test register button works only for the owner.
- Removed: the "one-time purge" blocks that ran on every NEW browser and deleted `orders`, `daily_reports`, `riders` and the whole rider database from the cloud. `cleanRiderDatabase()` is now owner-only and manual.
- Tests in `firebase-rules/tests/` (repeat after any change): `rules-anon.test.js` = 46 anonymous REST cases against `hsong-test` (what a stranger can / cannot do; setup steps are in its header, seed file included), `owner-logic.test.js` = migration/delete/change-detection with an in-memory DB, `admin-gp-revoke.test.js` = GP 10% and rider revoke logic. Run with `node firebase-rules/tests/<name>.test.js`. Owner-side rules could not be run live (Claude has no owner password, no Java for the emulator): the owner must sign in on the test copy and try approve/reject once.
- **Production rollout order used (done 2026-09-21 in this order):** (1) push the code (works with the old open rules; per-item writes and old layout coexist), (2) owner signs in once so the data migrates (verify with a shallow GET that keys are ids, not 0,1,2), (3) only then publish `hsong-1f342.rules.v2.json` (Console or `firebase deploy --only database --project hsong-1f342` from a temp folder, with the owner's OK). Pages cached before step 1 (≤10 min) write whole nodes and will be rejected after step 3.
- Firebase CLI default project in this repo is PRODUCTION (`.firebaserc`). Always pass `--project hsong-test` explicitly and deploy rules from a temp folder that has its own `firebase.json`/`.firebaserc`.

## 🔑 5d. Rider secret-password login (LIVE 2026-09-21: rules v2.1 + code `app.js?v=10.28_rider_secret_login`)
- Login = **rider number (RDxxxx, public) + secret password (8 chars, e.g. K7MQ-2XTA)**. Code: `generateRiderSecret`, `makeRiderLoginCredential`, `hashRiderSecret` (PBKDF2-SHA256, 150k iterations), `riderSecretLogin`, `submitRiderSecretLogin`, `resetRiderLoginSecret` in `app.js`. Tests: `firebase-rules/tests/rider-login.test.js`.
- The secret is created when the OWNER approves (`approveRiderApplication`, now async) or presses "รหัสเข้าระบบ" / "สร้างรหัสผ่านใหม่" on an approved rider. It is shown ONCE in the SMS/LINE modal for the owner to send to the rider. Only `loginSalt` + `loginHash` are stored (on the application and on `community_riders/<id>`); the plain secret is never stored and cannot be recovered - reset it instead.
- Rules (v2.1): non-owner cannot set/change/remove `loginHash`/`loginSalt` on existing riders or applications, and cannot create an application that carries them. WITHOUT this an attacker could overwrite the hash with their own and log in as anyone.
- Every login path that skipped the password is now owner-only: `loginRiderById`, `quickLoginRider`, `handleRiderLoginSubmit`, `approveAndLoginRider` for approved riders, and the public rider list / pending list in the login screens (hidden from visitors). Visitors after applying only get their application number (pending notice box); the owner sends the password after approval.
- Lockout: 5 wrong tries within 10 minutes locks that browser for 5 minutes (`talathub_rider_login_fail`).
- Limits (be honest with the owner): the password is checked in the browser, so this stops impersonation by anyone who only knows a number/phone/name, but it is NOT server-side security: `orders`, `rider_status`, `rider_locations` stay open. Old riders (e.g. `RD3562`) have no password until the owner presses the reset button. `crypto.subtle` needs https or localhost (plain http on a LAN IP shows a "cannot verify" message).
- **Rollout order (do not swap):** (1) DONE 2026-09-21: `hsong-1f342.rules.v2.json` (v2.1, adds the `loginHash`/`loginSalt` locks) published to production with the owner's OK and verified with denial-only probes (rollback file = git `0910f19:firebase-rules/hsong-1f342.rules.v2.json`), (2) DONE: code pushed (`d0f35fd`), (3) DONE for `RD3562` (owner created its password on the real site; production shows loginHash 64 chars / loginSalt 32 chars on both nodes). For any future real rider: owner signs in on the real site and presses "รหัสเข้าระบบ" for each real rider and sends them the password. Test copy of this version: https://hsong-test.web.app (talks to `hsong-test`, title starts with "[ทดสอบ]").

## ⚠️ 6. Known Constraints (update when resolved)
- (Resolved) Personal data (ID numbers, addresses, driver-license photos in `rider_documents/<riderId>`, `rider_private`) is owner-read only since the owner-auth release.
- (Resolved 2026-09-20) Admin/hub PINs and the admin "test mode" quick login were removed; see section 5b.
- Both rider registration forms auto-approve; documents are collected but nobody must verify them before a rider can take jobs.
- GP rate is 10% (owner decision 2026-09-21). Single source: `hubSettings.merchantGP` (localStorage `hsong_hub_settings`); `loadMarketStallSettings().gpRate` reads from it and both settings forms reject values <= 0 (fall back to 10). Rider fee is still hard-coded to 40 THB per trip in the report.
- Admin "Settings" tab: only GP (`merchantGP`) is read by app logic. The other keys (minOrder, baseDeliveryFee, cutoffs, rider fares...) are saved but nothing uses them, and all settings live in one browser's localStorage (not synced to Firebase).
- Approving a rider adds them to `community_riders`; rejecting or moving an approved application back to pending now calls `revokeRiderAccessForApplication` to remove them again (2026-09-21).
- (Resolved 2026-09-21) The old open rules that expired 2026-11-02 were replaced in production by rules v2 (section 5c): no expiry, approvals/creation of riders and stalls are owner-only. Still open by design: `orders`, `carts`, `riders`, `rider_status`, `rider_locations`, `active_rider` (no customer/rider Firebase Auth yet).
- Not yet tried live on PRODUCTION as owner: approve/reject on the real site after the rules change (worked on hsong-test). Pending real applications: `RD1987` (test, delete) and `RD3562` (was moved back to pending during testing).
- Suspected pre-existing bug (not verified): `aggregateDailyOperations` does `set()` on the whole `daily_reports/<date>` node without `settledRiders`/`settledVendors`, which may erase the cloud copy of the settled flags each time a report is generated. Check before relying on settlement history.
- (Resolved 2026-09-21, see section 5d) Rider login now needs rider number + secret password; phone and name no longer log anyone in.
