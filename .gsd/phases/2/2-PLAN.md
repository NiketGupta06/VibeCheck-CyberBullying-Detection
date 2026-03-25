---
phase: 2
plan: 2
wave: 2
---

# Plan 2.2: End-to-End Smoke Test — All Routes

## Objective
Verify that every route in the running Flask app responds correctly without errors. This is an empirical validation that the full stack is wired up: templates render, static assets load, DB reads work, and no 500 errors occur on any page.

This plan uses the browser subagent to hit every route and confirm visual rendering.

## Context
- `app.py` — all 6 routes + `/download`
- `templates/` — all 7 HTML templates
- `static/css/style.css`, `static/js/main.js`
- `.env` — must have `YOUTUBE_API_KEY` and `FLASK_SECRET_KEY` set

## Tasks

<task type="auto">
  <name>Launch Flask dev server locally</name>
  <files>
    app.py
  </files>
  <action>
    Start the Flask development server in the background:

    ```powershell
    Start-Process -NoNewWindow -FilePath "python" -ArgumentList "app.py"
    ```

    Wait 20 seconds for ToxicBERT model to load (it prints "Model loaded." when ready).

    Then verify the server responds:
    ```powershell
    Invoke-WebRequest -Uri "http://127.0.0.1:5000/" -UseBasicParsing | Select-Object StatusCode
    ```
    Expected: `StatusCode: 200`
  </action>
  <verify>
    `Invoke-WebRequest -Uri "http://127.0.0.1:5000/" -UseBasicParsing | Select-Object StatusCode`
    Expected output: `200`
  </verify>
  <done>
    - Flask server running on port 5000
    - GET `/` returns HTTP 200
    - No import errors or crash on startup
  </done>
</task>

<task type="checkpoint:human-verify">
  <name>Browser smoke test — all 5 nav pages</name>
  <files>
    templates/index.html
    templates/analyze.html
    templates/history.html
    templates/about.html
    templates/contact.html
  </files>
  <action>
    Use the browser subagent to navigate to each route and confirm it renders correctly:

    1. `http://127.0.0.1:5000/` — Homepage loads, hero section visible, no JS errors in console
    2. `http://127.0.0.1:5000/analyze` — Analyze page loads, URL input form visible
    3. `http://127.0.0.1:5000/history` — History page loads (may show empty state — that's fine)
    4. `http://127.0.0.1:5000/about` — About page loads, ToxicBERT section visible
    5. `http://127.0.0.1:5000/contact` — Contact page loads, form visible

    For each: check the page title in the browser tab matches the route, and the navbar shows the correct active link.
  </action>
  <verify>
    Browser subagent visits all 5 URLs and confirms:
    - HTTP responses are 200 (no redirect loops or 500 errors)
    - Navbar renders with correct active link
    - Dark theme visible (background is dark, not white)
    - No broken CSS (elements are not unstyled)
  </verify>
  <done>
    - All 5 routes render without errors
    - Dark theme loads correctly (static/css/style.css served)
    - Navbar active state works on each page
    - History shows empty state gracefully OR lists past analyses
  </done>
</task>

## Success Criteria
- [ ] Flask dev server starts and GET `/` returns 200
- [ ] All 5 nav routes render without 500 errors
- [ ] Dark theme CSS loads correctly on all pages
- [ ] History page handles empty-state gracefully
