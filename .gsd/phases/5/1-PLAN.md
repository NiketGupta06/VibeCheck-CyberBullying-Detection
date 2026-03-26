---
phase: 5
plan: 1
wave: 1
---

# Plan 5.1: Client-Side PDF Report Generation

## Objective
Implement a "Download PDF Report" feature on the dashboard that captures the exact visual layout and Chart.js graphs using `html2pdf.js`.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\dashboard.html
- c:\Users\Lenovo\Downloads\CyberBullying Detection\static\js\main.js

## Tasks

<task type="auto">
  <name>Integrate html2pdf.js and PDF styling</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\dashboard.html
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\static\css\style.css
  </files>
  <action>
    - In `dashboard.html`, add the `html2pdf.bundle.min.js` CDN link in the `<head>` or at the end of the `<body>` (`<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>`).
    - Add a "Download PDF" button next to the existing "Download CSV" button with `onclick="downloadPDF()"`.
    - Give the overall dashboard container an ID (e.g., `id="report-content"`) so the PDF library knows what to capture.
    - In `style.css`, add print media queries `@media print` or `.pdf-mode` styles to hide interactive elements (like the navbar and buttons) during the export.
  </action>
  <verify>Check that `dashboard.html` contains the html2pdf script tag and the new button.</verify>
  <done>html2pdf library is included and the UI has the correct structure for export.</done>
</task>

<task type="auto">
  <name>Implement PDF Generation Logic</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\static\js\main.js
  </files>
  <action>
    - Create a global `downloadPDF()` function triggered by the "Download PDF" button.
    - Inside, select the `#report-content` element.
    - Set the `html2pdf` options (margin, filename `CyberGuard_Report.pdf`, image type, html2canvas config `scale: 2`, and format `a4`).
    - Briefly hide UI buttons using JS before calling the library, generate the PDF, and then `.then()` restore the buttons so they don't appear in the PDF.
  </action>
  <verify>Check `main.js` for the `html2pdf` invocation logic.</verify>
  <done>Client-side PDF generation is fully implemented and hooked up to the button.</done>
</task>

## Success Criteria
- [ ] Dashboard features a prominent "Download PDF" button.
- [ ] Clicking the button downloads a styled PDF containing all stats and Chart.js graphs.
- [ ] No server-side PDF dependencies are added to `requirements.txt`.
