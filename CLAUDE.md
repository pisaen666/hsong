# Project Guidelines: TalatHub / Hsong (ตลาดสดบ้านบึง)

## Core Architecture
- **Single Page Application (SPA)** using Vanilla HTML5, Vanilla JavaScript, and Tailwind CSS (CDN).
- **Main Files**:
  - `index.html`: Contains UI templates, layout panels, and modals for all 5 roles.
  - `app.js`: Contains state management (`state` object), business logic, localStorage persistence, Firebase sync, and function exports to `window.*`.

## 5 System Roles & Status
1. **Role 1 (Customer / ลูกค้า)**: Cart management, checkout, order tracking, real-time GPS map. (Completed)
2. **Role 2 (Hub Operations / ศูนย์จัดส่งฮับ)**: Consolidated picking lists, order packing, rider dispatch, daily operations report & settlements. (Completed)
3. **Role 3 (Merchant / แผงค้าตลาด)**: Live store status (Open/Close), bank account setup, item availability, express delivery requests. (Completed)
4. **Role 4 (Rider / ไรเดอร์)**: Active order management, job market pool, 2-step location signals, delivery proof upload, rider wallet & COD cash breakdown. (Completed)
5. **Role 5 (Admin / ผู้ดูแลระบบ)**: Merchant registration approvals, fleet radar map, system config, global logs. (Pending fine-tuning)

## Code Guidelines & Best Practices
- Always verify JavaScript syntax after editing using: `node -c app.js`
- Ensure all interactive onclick functions are explicitly bound to `window` (e.g. `window.myFunction = myFunction`).
- Preserve existing `localStorage` keys prefixed with `talathub_*`.
- Avoid breaking changes to `state.activeOrder` and `MARKET_DATA`.
