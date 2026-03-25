---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Base CSS Design System & JavaScript

## Objective
Build the foundational visual design system. The app should look premium and polished from the first load — dark theme, vibrant accent colors, smooth animations, responsive layout, and interactive navbar. This plan is pure frontend (CSS + JS) — no backend dependency.

## Context
- `.gsd/SPEC.md` — "Beautiful, responsive, animated" requirement
- `.gsd/PRD.md` — UI design: multi-page, animated, good-looking
- `templates/base.html` — CSS class names and structure set in Plan 1.2

## Tasks

<task type="auto">
  <name>Create static/css/style.css — full design system</name>
  <files>
    static/css/style.css
  </files>
  <action>
    Create `static/css/style.css` with a complete design system. This must be visually premium.

    **1. CSS Custom Properties (variables) at :root:**
    ```css
    --bg-primary: #0d0f14;
    --bg-secondary: #13161e;
    --bg-card: #1a1e2a;
    --accent-primary: #6c63ff;
    --accent-secondary: #a78bfa;
    --accent-danger: #ff4d6d;
    --accent-warning: #fbbf24;
    --accent-success: #34d399;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --border: rgba(255,255,255,0.08);
    --shadow: 0 4px 24px rgba(0,0,0,0.4);
    --radius: 12px;
    --radius-sm: 8px;
    --font: 'Inter', sans-serif;
    --transition: 0.2s ease;
    ```

    **2. Reset & base:**
    - `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
    - `body { font-family: var(--font); background: var(--bg-primary); color: var(--text-primary); min-height: 100vh; }`
    - Smooth scroll: `html { scroll-behavior: smooth; }`

    **3. Navbar (.navbar):**
    - Fixed top, full width, `background: rgba(13,15,20,0.85)`, `backdrop-filter: blur(12px)`
    - Flex row space-between, height 64px, padding 0 2rem
    - `.logo`: gradient text using `--accent-primary` to `--accent-secondary`, font-weight 700, font-size 1.25rem
    - `.nav-links a`: text-secondary color, transition to text-primary on hover, no underline
    - `.nav-links a.active`: color `--accent-primary`, border-bottom 2px solid `--accent-primary`

    **4. Main content:**
    - `padding-top: 64px` (offset for fixed navbar)
    - `.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }`

    **5. Cards (.card):**
    - `background: var(--bg-card)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`, `padding: 1.5rem`
    - `box-shadow: var(--shadow)`
    - `.card:hover { border-color: var(--accent-primary); transform: translateY(-2px); transition: var(--transition); }`

    **6. Buttons:**
    - `.btn-primary { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: white; border: none; padding: 0.75rem 2rem; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition); }`
    - `.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(108,99,255,0.4); }`
    - `.btn-danger { background: var(--accent-danger); }` for flag button
    - `.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-secondary); }` for hide button

    **7. Hero section (.hero):**
    - Min-height 80vh, flex center
    - Large gradient headline: `font-size: clamp(2.5rem, 6vw, 4.5rem)`
    - Subtitle: `color: var(--text-secondary); font-size: 1.2rem`
    - Animated background: subtle radial gradient pulse using `@keyframes pulse`

    **8. Stat cards (.stat-card):**
    - Grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem`
    - Large number: `font-size: 2.5rem; font-weight: 700; color: var(--accent-primary)`
    - Label below in text-secondary

    **9. Tables (.data-table):**
    - `width: 100%; border-collapse: collapse`
    - `th { background: var(--bg-secondary); color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }`
    - `td { border-bottom: 1px solid var(--border); padding: 0.875rem 1rem; }`
    - `tr:hover td { background: rgba(108,99,255,0.05); }`
    - `.flagged td { background: rgba(255,77,109,0.08); border-left: 3px solid var(--accent-danger); }`
    - `.hidden-row { display: none; }`

    **10. Toxicity score badges:**
    - `.score-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }`
    - Color scale: score > 0.7 → danger, > 0.4 → warning, else success

    **11. Form inputs:**
    - `input[type="url"] { width: 100%; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-primary); padding: 1rem 1.25rem; border-radius: var(--radius-sm); font-size: 1rem; }`
    - Focus: `border-color: var(--accent-primary); outline: none; box-shadow: 0 0 0 3px rgba(108,99,255,0.2);`

    **12. Loading spinner:**
    - `.spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--accent-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }`
    - `@keyframes spin { to { transform: rotate(360deg); } }`
    - `.loading-state { display: none; flex-direction: column; align-items: center; gap: 1rem; padding: 3rem; }`

    **13. Animations:**
    - `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
    - `.animate-in { animation: fadeInUp 0.5s ease forwards; }`
    - Stagger children with `animation-delay`

    **14. Responsive:**
    - `@media (max-width: 768px)` — collapse navbar to hamburger menu, stack cards vertically, font sizes reduce

    **15. Footer:**
    - `background: var(--bg-secondary); border-top: 1px solid var(--border); padding: 2rem; text-align: center; color: var(--text-secondary);`
  </action>
  <verify>
    File exists: `Test-Path static/css/style.css` returns True.
  </verify>
  <done>
    - `static/css/style.css` exists and has >200 lines
    - Contains all CSS custom properties at :root
    - Contains .navbar, .card, .btn-primary, .stat-card, .data-table, .spinner definitions
  </done>
</task>

<task type="auto">
  <name>Create static/js/main.js — base interactivity</name>
  <files>
    static/js/main.js
  </files>
  <action>
    Create `static/js/main.js` with the following:

    **1. Navbar active state:**
    - On DOMContentLoaded, compare `window.location.pathname` with each nav link `href`
    - Add `class="active"` to the matching link

    **2. Analyze form — loading state:**
    - On `#analyzeForm` submit event:
      - Show `#loadingState` div (set display to flex)
      - Hide the form submit button
      - Update loading text every 5 seconds: "Fetching comments…", "Running AI analysis…", "Building your dashboard…"
    - Prevent double-submit by disabling the button after first click

    **3. Comment table — Flag button:**
    - On click of any `.btn-flag`:
      - Toggle class `flagged` on the parent `<tr>`
      - Change button text between "🚩 Flag" and "✅ Flagged"

    **4. Comment table — Hide button:**
    - On click of any `.btn-hide`:
      - Toggle class `hidden-row` on the parent `<tr>`

    **5. Animate elements on scroll:**
    - Use `IntersectionObserver` to add `animate-in` class to `.card` and `.stat-card` elements when they enter viewport
    - Remove `animate-in` initially and restore it on intersection

    **6. Number counter animation:**
    - For elements with `data-count` attribute, animate the number counting up from 0 to the target value over 1.5 seconds on page load
    - Apply to stat card numbers on the dashboard

    **7. Contact form:**
    - On `#contactForm` submit:
      - Prevent default
      - Show success message: "Thanks for reaching out! We'll be in touch."
      - Hide the form
  </action>
  <verify>
    File exists: `Test-Path static/js/main.js` returns True.
  </verify>
  <done>
    - `static/js/main.js` exists
    - Contains event listener for `#analyzeForm` submit
    - Contains `.btn-flag` and `.btn-hide` click handlers
    - Contains `IntersectionObserver` for scroll animations
  </done>
</task>

## Success Criteria
- [ ] `static/css/style.css` exists with full design system (custom properties, dark theme, all component styles)
- [ ] `static/js/main.js` exists with flag/hide handlers, loading state, and scroll animations
- [ ] `static/` directory structure: `static/css/style.css`, `static/js/main.js`
