---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: CSS Fix for Hide Button Logic

## Objective
The Phase 3 goal is to implement User Actions (flag, hide) and Report Download. During planning, it was discovered that:
1. "Flag" works perfectly (JS + CSS).
2. "Download" works perfectly (app.py + dashboard.html).
3. "Loading indicator" works perfectly (main.js + analyze.html).
4. "Hide" is broken because `display: none` on the `<tr>` removes the "Unhide/Show" button itself, preventing the user from ever getting the comment back.

This plan executes the single remaining task for Phase 3: fixing the Hide button CSS logic so the comment text is obscured, but the row and action buttons remain visible and interactive.

## Context
- `static/css/style.css`
- `templates/dashboard.html` (for reference on `.hidden-row`)

## Tasks

<task type="auto">
  <name>Patch .hidden-row CSS logic</name>
  <files>
    static/css/style.css
  </files>
  <action>
    Find the existing CSS rule:
    ```css
    .data-table tr.hidden-row { display: none; }
    ```
    Replace it with rules that obscure the comment text but leave the row intact:
    ```css
    .data-table tr.hidden-row .comment-cell { 
      opacity: 0.15; 
      filter: blur(4px); 
      user-select: none; 
    }
    .data-table tr.hidden-row td:not(.action-cell) { 
      background: rgba(0,0,0,0.3) !important; 
    }
    ```
  </action>
  <verify>
    Run: `powershell -Command "Select-String -Path static/css/style.css -Pattern 'filter: blur' | Measure-Object | Select-Object -ExpandProperty Count"`
    Expected output: `1` (or greater if it matches elsewhere, but basically it confirms the rule was added).
  </verify>
  <done>
    - `.hidden-row` no longer uses `display: none`
    - Blur and opacity effects are applied to the `.comment-cell` within hidden rows
  </done>
</task>

## Success Criteria
- [ ] CSS file updated to remove `display: none` for hidden rows
- [ ] Obscuring styles (blur, opacity, background) added in its place
