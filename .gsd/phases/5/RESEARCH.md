# Phase 5 Research: PDF Generation Strategy

## Objective
Choose the best approach for generating a PDF report containing numerical stats and visual insights (graphs) from the toxicity analysis, ensuring it's easy to deploy without heavy system dependencies.

## Options

1. **Backend Generation (FPDF2 + Matplotlib)**
   - *Pros*: Pure Python, reliable standalone generation.
   - *Cons*: Requires duplicating the visualization logic (Chart.js on frontend vs Matplotlib on backend). Doesn't look exactly like the UI.

2. **Backend HTML-to-PDF (WeasyPrint / pdfkit)**
   - *Pros*: Can use HTML templates.
   - *Cons*: Requires heavy system-level dependencies (Cairo, wkhtmltopdf) which complicates cloud deployment on Render/Railway. Does not support client-side JS (Chart.js will not render).

3. **Client-Side Generation (html2pdf.js / jsPDF)**
   - *Pros*: Zero backend dependencies. Captures the exact UI, including rendered Chart.js canvases and CSS styles. Very easy to implement.
   - *Cons*: Relies on the user's browser for processing.

## Conclusion
**Option 3 (Client-Side HTML-to-PDF)** is the clear winner. It perfectly preserves the existing beautiful dashboard and Chart.js graphs, requires no heavy backend dependencies, and ensures smooth deployment. We will use the `html2pdf.js` library via CDN.
