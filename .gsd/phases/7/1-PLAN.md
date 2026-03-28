---
phase: 7
plan: 1
wave: 1
---

# Plan 7.1: Global Rebrand — CyberGuard → VibeCheck

## Objective
Replace all occurrences of "CyberGuard" with "VibeCheck" across the entire codebase. Update title, navbar, footer, meta tags, download filenames, and all user-facing text.

## Context
- .gsd/SPEC.md
- templates/base.html
- templates/index.html
- templates/about.html
- templates/contact.html
- static/css/style.css
- static/js/main.js
- app.py

## Tasks

<task type="auto">
  <name>Replace CyberGuard branding in all templates</name>
  <files>templates/base.html, templates/index.html, templates/about.html, templates/contact.html</files>
  <action>
    - In base.html: change logo text to "🛡️ VibeCheck", title suffix to "— CyberBullying Detection System", meta description to reference VibeCheck, footer to "VibeCheck — CyberBullying Detection System"
    - In index.html: replace all "CyberGuard" in hero and feature descriptions with "VibeCheck"
    - In about.html: replace heading and body references
    - In contact.html: replace any CyberGuard references
  </action>
  <verify>grep -r "CyberGuard" templates/ (should return 0 results)</verify>
  <done>Zero occurrences of "CyberGuard" in templates/</done>
</task>

<task type="auto">
  <name>Replace CyberGuard in static assets and Python</name>
  <files>static/css/style.css, static/js/main.js, app.py</files>
  <action>
    - In style.css and main.js: replace any CyberGuard references
    - In app.py: change CSV filename prefix from "cyberguard_report_" to "vibecheck_report_"
  </action>
  <verify>grep -r "CyberGuard" static/ app.py (should return 0 results)</verify>
  <done>Zero occurrences of "CyberGuard" in static/ and app.py</done>
</task>

## Success Criteria
- [ ] Zero grep results for "CyberGuard" across entire project
- [ ] Navbar shows "VibeCheck", footer shows "VibeCheck — CyberBullying Detection System"
- [ ] Page title reads "VibeCheck — CyberBullying Detection System"
