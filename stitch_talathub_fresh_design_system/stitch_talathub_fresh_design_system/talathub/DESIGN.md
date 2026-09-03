---
name: TalatHub
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#005ac2'
  on-tertiary: '#ffffff'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 16px
  gutter: 12px
---

## Brand & Style
The design system for this fresh market delivery platform centers on the concept of "Digital Freshness." It bridges the traditional Thai "Talat" (market) experience with a modern, high-end mobile interface. The brand personality is energetic, hygienic, and reliable.

The visual style is **Modern Glassmorphism**. This approach uses semi-transparent surfaces and soft background blurs to create a sense of depth and lightness, avoiding the "heavy" feel of traditional e-commerce. It evokes the clarity of clean water and the vibrant colors of fresh produce. The interface should feel breathable, utilizing significant whitespace (negative space) to reduce cognitive load for users navigating complex grocery lists.

## Colors
The palette is rooted in organic vitality and high-action visibility.

- **Primary (Fresh Emerald):** Used for brand identity, success states, and primary navigation elements. It represents organic quality and health.
- **Secondary (Citrus Orange):** Reserved strictly for high-priority Call-to-Actions (CTAs), limited-time offers, and "Add to Cart" functions to create a "buy" impulse.
- **Background (Soft Slate):** A cool-toned neutral that allows the vibrant greens and oranges to pop without causing eye strain.
- **Surface (Pure White):** Used for cards and containers to provide a clean, "sanitary" backdrop for food photography.
- **Accent (Blue):** A tertiary blue is used sparingly for information and delivery tracking updates.

## Typography
The typography system uses rounded, modern sans-serifs that offer excellent legibility for both Thai and Latin characters.

- **Headlines:** Use **Plus Jakarta Sans**. Its wide apertures and soft curves complement the friendly market vibe.
- **Body & Labels:** Use **Be Vietnam Pro**. It maintains high readability at small sizes, crucial for ingredient lists and price tags.
- **Localization:** When rendering Thai characters, ensure the line-height is increased by approximately 10-15% compared to English-only layouts to prevent vowel/tone mark clipping. Headlines should feel bold and authoritative (e.g., "ของสดส่งตรงถึงบ้าน" - Fresh items delivered to your home).

## Layout & Spacing
This design system follows a **Mobile-First Fluid Grid** model.

- **Mobile (Default):** 4-column grid with 16px side margins and 12px gutters.
- **Desktop (Breakpoint 1024px+):** 12-column centered grid with a maximum content width of 1200px.
- **Spacing Rhythm:** Based on a 4px baseline. Most components should use `16px` (md) for internal padding to maintain a spacious, premium feel. 
- **Vertical Flow:** Group related items (like product categories) using `24px` spacing, while distinct sections (like "Flash Sale" vs "Categories") should be separated by `40px` to `48px`.

## Elevation & Depth
Elevation is achieved through a combination of **Glassmorphism** and **Ambient Shadows**.

- **Level 1 (Base):** Flat background in Soft Slate (#F8FAFC).
- **Level 2 (Cards):** Pure white surfaces with a very soft, diffused shadow: `0px 4px 20px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Floating/Glass):** Floating headers and navigation bars use a background blur of `12px` and a semi-transparent white fill `rgba(255, 255, 255, 0.8)`. They feature a subtle `1px` inner border of `rgba(255, 255, 255, 0.5)` to simulate a glass edge.
- **Level 4 (Modals):** High-contrast depth with a darker overlay `rgba(15, 23, 42, 0.4)` and a shadow of `0px 10px 30px rgba(15, 23, 42, 0.15)`.

## Shapes
The shape language is "Soft-Modern." Avoid sharp corners to maintain a friendly, approachable aesthetic.

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Containers:** Large product cards and section containers use **1rem (16px)** radius.
- **Promotional Elements:** Featured banners or "Special Offer" chips use **1.5rem (24px)** or full pill-shaped rounds to stand out from the functional UI.

## Components

### Buttons
- **Primary:** Fresh Emerald fill with white text. High-gloss finish optional.
- **Secondary (CTA):** Vibrant Citrus Orange. Used for "Confirm Order" or "Add to Cart."
- **Ghost:** Transparent background with an Emerald border and text.

### Chips & Badges
- **Status Badges:** Use light tinted backgrounds (e.g., Light Green background for "สดใหม่" / Fresh) with dark green text. 
- **Category Chips:** Rounded pills with subtle 1px borders. When selected, they fill with the Primary color.

### Input Fields
- White fill with a 1px Slate-200 border. 
- Focus state: Border changes to Primary Emerald with a soft `3px` outer glow.
- Labels should always be visible above the field in `label-sm` style.

### Cards (The "Freshness" Container)
- Product cards must prioritize the image. The image should have a subtle bottom-to-top gradient overlay to ensure white text (like price tags) remains readable if placed over the image.
- Include a "Quick Add" (+) button in the bottom right corner of cards, using the Secondary color.

### Bottom Navigation (Mobile)
- Glassmorphic bar with `backdrop-filter: blur(16px)`.
- Active states use the Primary Emerald color for the icon and a small dot indicator underneath.
- Labels: "หน้าแรก" (Home), "ค้นหา" (Search), "ตะกร้า" (Cart), "คำสั่งซื้อ" (Orders), "บัญชี" (Profile).