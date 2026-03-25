---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: HTML Templates — All Pages Scaffolded

## Objective
Create all 6 HTML templates with a shared base layout. Every page gets: navigation bar, correct route, and placeholder content blocks. These are scaffold-quality — fully structured and styled shells — so Phase 2 can drop real data in without touching the HTML structure.

## Context
- `.gsd/SPEC.md` — Page list and feature requirements
- `.gsd/APP_FLOW.md` — Navigation map and screen inventory
- `.gsd/PRD.md` — Website design section (multi-page, intro, about, contact)
- `app.py` — Route names to match exactly

## Tasks

<task type="auto">
  <name>Create base.html layout template</name>
  <files>
    templates/base.html
  </files>
  <action>
    Create `templates/base.html` — the shared Jinja2 parent template:

    1. Full HTML5 document structure (`<!DOCTYPE html>`, `<html lang="en">`)
    2. `<head>` block containing:
       - `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
       - `<title>{% block title %}CyberGuard{% endblock %} — YouTube Toxicity Analyzer</title>`
       - Google Fonts: `Inter` (weights 400, 500, 600, 700) via `<link>` tag
       - `<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">`
       - `{% block head %}{% endblock %}` for page-specific CSS/meta
    3. `<body>` with:
       - `<nav>` element with class `navbar` containing:
         - Logo: `<a href="/" class="logo">🛡️ CyberGuard</a>`
         - Nav links: Home(`/`), Analyze(`/analyze`), History(`/history`), About(`/about`), Contact(`/contact`)
         - Each link gets `class="active"` if it matches the current route using `request.path`
       - `<main class="main-content">{% block content %}{% endblock %}</main>`
       - `<footer>` with: `© 2026 CyberGuard — YouTube Toxicity Analyzer`
       - `<script src="{{ url_for('static', filename='js/main.js') }}"></script>`
       - `{% block scripts %}{% endblock %}` for page-specific JS
    4. Include a flash messages block between nav and main for error/success toasts.
  </action>
  <verify>
    Visually confirm `templates/base.html` exists and contains `{% block content %}`.
    Run: `python -c "from app import app; ctx = app.test_request_context('/'); ctx.push(); from flask import render_template; print('template OK')"` 
  </verify>
  <done>
    - `templates/base.html` exists
    - Contains navbar with all 5 route links
    - Contains `{% block content %}`, `{% block title %}`, `{% block scripts %}`
  </done>
</task>

<task type="auto">
  <name>Create all 5 page templates extending base.html</name>
  <files>
    templates/index.html
    templates/analyze.html
    templates/dashboard.html
    templates/history.html
    templates/about.html
    templates/contact.html
  </files>
  <action>
    Create each template extending `base.html`. Each must have meaningful scaffold content (not Lorem Ipsum).

    **templates/index.html** — Homepage:
    - `{% block title %}Home{% endblock %}`
    - Hero section: large headline "Detect Cyberbullying on YouTube", subtitle, "Get Started →" button linking to `/analyze`
    - 3 feature cards: "Paste any YouTube URL", "AI-Powered Analysis", "Download Reports"
    - Stats row: "6 toxicity categories", "Up to 2000 comments analyzed", "Instant dashboard"
    - CTA section at bottom: "Protect Your Community" + "Analyze Now" button

    **templates/analyze.html** — URL input:
    - `{% block title %}Analyze{% endblock %}`
    - Centered card with title "Analyze YouTube Comments"
    - `<form method="POST" action="/analyze" id="analyzeForm">` containing:
      - `<input type="url" name="url" id="urlInput" placeholder="https://www.youtube.com/watch?v=..." required>`
      - Submit button: "🔍 Analyze Comments"
    - Loading state div (hidden by default, shown via JS on form submit): spinner + "Fetching and analyzing comments… this may take a minute"
    - Display `{{ error }}` flash message if `error` variable is passed

    **templates/dashboard.html** — Results:
    - `{% block title %}Dashboard{% endblock %}`
    - 4 stat cards: Total Comments, % Toxic, Most Common Category, Analysis Date
    - Chart container: `<canvas id="toxicityChart"></canvas>`
    - Two side-by-side tables: "Top 5 Most Toxic" and "Top 5 Threats"
    - Full scrollable comment table with columns: Comment, Toxicity Score, Actions (Flag button, Hide button)
    - Download Report button: `<a href="/download" class="btn-download">⬇ Download Report</a>`
    - All data slots use Jinja2 variables: `{{ total_comments }}`, `{{ toxic_percent }}`, `{{ chart_data | tojson }}`, `{{ top_comments }}`, `{{ top_threats }}`, `{{ comment_rows }}`

    **templates/history.html** — Past analyses:
    - `{% block title %}History{% endblock %}`
    - Table with columns: #, Video URL, Date, Total Comments, % Toxic, View
    - Each row links to `/dashboard?id={{ analysis.id }}`
    - Empty state: shown if `analyses` list is empty

    **templates/about.html** — Project info:
    - `{% block title %}About{% endblock %}`
    - Section: "About CyberGuard" — problem description from PRD
    - Section: "The Model" — ToxicBERT, bert-base-uncased, 6 labels, Jigsaw dataset
    - Section: "Tech Stack" — Flask, PyTorch, HuggingFace, Chart.js

    **templates/contact.html** — Contact form:
    - `{% block title %}Contact{% endblock %}`
    - Simple form: Name, Email, Message fields + Submit button
    - Static form (no backend needed — just show a success message via JS on submit)
  </action>
  <verify>
    All 6 files exist: run `Get-ChildItem templates/` and confirm 6 .html files listed.
  </verify>
  <done>
    - All 6 template files exist in `templates/`
    - Each extends `base.html` with `{% extends "base.html" %}`
    - `dashboard.html` contains all Jinja2 data variable slots
    - `analyze.html` contains the form with `name="url"` and POST action
  </done>
</task>

## Success Criteria
- [ ] `templates/` directory contains: `base.html`, `index.html`, `analyze.html`, `dashboard.html`, `history.html`, `about.html`, `contact.html`
- [ ] All pages extend `base.html` and have correct `{% block title %}` and `{% block content %}`
- [ ] `dashboard.html` has `{{ total_comments }}`, `{{ toxic_percent }}`, `{{ chart_data | tojson }}` slots
- [ ] `analyze.html` form posts to `/analyze` with input `name="url"`
