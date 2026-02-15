# Creative Solutions Partners — Premium Site Structure

## Overview

A $1M+ polish website showcasing the Health, Wealth, and Technology partnership ecosystem. Built for business owners, founders, and executives.

---

## Design Principles

- **Typography:** DM Sans (body), Playfair Display (headlines)
- **Colors:** Brand purple (#5D2E8E), Gold (#C5A059), Dark (#111827)
- **Motion:** Scroll-triggered reveals, reduced-motion support
- **Tagline:** "Resolution for your health and wealth"

---

## Site Architecture

```
Home
├── Hero (AnimatedGrid background, staggered content)
├── Trust Bar ("Resolution through integration")
├── Solutions Grid (ShineBorder — Health, Wealth, Technology)
└── Partnership Banner

Solutions (via Sidebar)
├── Health → SolutionPage → Champion Health (flagship)
├── Wealth → SolutionPage → WealthWave (flagship)
└── Technology → SolutionPage → Clarity Commissions (flagship)

About | Insights (Blog)
```

---

## Components

| Component | Purpose |
|-----------|---------|
| **AnimatedGrid** | Subtle pulsing dot grid on hero background |
| **ScrollReveal** | Fade-up on scroll (IntersectionObserver) |
| **ShineBorder** | Animated gradient border (gold→purple) around solutions grid |
| **Logo** | CSP branding, light/dark variants |
| **Sidebar** | Fixed nav: Home, Solutions (Health/Wealth/Tech), About, Insights |
| **ChampionHealthPage** | Health flagship |
| **WealthWavePage** | Wealth flagship |
| **ClarityPage** | Technology flagship |
| **SolutionPage** | Category overview for Health/Wealth/Tech |
| **TeamCarousel** | About page partners |
| **Newsletter** | Signup component |

---

## File Structure

```
champion-health-update 3/
├── App.tsx              # Main app, routing, premium homepage
├── index.html           # Tailwind, fonts, keyframes
├── index.tsx            # React entry
├── lib/
│   └── utils.ts         # cn() helper
├── components/
│   ├── AnimatedGrid.tsx
│   ├── ShineBorder.tsx
│   ├── ScrollReveal.tsx
│   ├── ChampionHealthPage.tsx
│   ├── ClarityPage.tsx
│   ├── WealthWavePage.tsx
│   ├── SolutionPage.tsx
│   ├── Sidebar.tsx
│   ├── Logo.tsx
│   ├── Newsletter.tsx
│   └── TeamCarousel.tsx
├── constants.tsx
├── types.ts
└── vite.config.ts
```

---

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000/
