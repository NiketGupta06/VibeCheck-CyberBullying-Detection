# ROADMAP.md

> **Current Phase**: Phase 1 — In Planning
> **Milestone**: v1.0 — Full CyberGuard Web App

## Must-Haves (from SPEC)

- [ ] YouTube URL input → fetches comments → ToxicBERT inference → dashboard
- [ ] Dashboard: charts, stat cards, top toxic/threat comments, comment table
- [ ] Downloadable report (CSV or PDF)
- [ ] Flag / Hide comments in dashboard
- [ ] SQLite history database + History page
- [ ] Multi-page: Home, Analyze, Dashboard, History, About, Contact
- [ ] Responsive, animated UI
- [ ] Publicly deployed — accessible via link from any device

---

## Phases

### Phase 1: Project Foundation & Flask Structure
**Status**: ✅ Complete  
**Objective**: Set up a clean, deployable Flask project structure with all pages scaffolded, static assets organized, and the database schema initialized. Fix the existing `app.py` bugs and move configuration to environment variables.  
**Deliverables**:
- Clean Flask app in project root (`app.py`, `templates/`, `static/`)
- All 5 pages scaffolded (HTML + routes): Home, Analyze, Dashboard, History, About, Contact
- SQLite DB initialized with `analyses` table
- API key moved to `.env`
- `requirements.txt` and `Procfile` created
- Base CSS design system (dark theme, typography, layout)

---

### Phase 2: Core Analysis Engine
**Status**: ✅ Complete  
**Objective**: Integrate the full analysis pipeline — YouTube comment fetching (up to 2000), ToxicBERT inference, pandas aggregation, and result persistence to SQLite. Implement the complete dashboard with Chart.js visualizations.  
**Deliverables**:
- Working `/analyze` POST route with full pipeline
- Dashboard populated with: stat cards, bar/radar chart, top toxic/threat tables, full comment table
- Results saved to SQLite after every analysis
- History page shows all past analyses from DB
- Cached dashboard load from history (no re-inference)

---

### Phase 3: User Actions & Report Download
**Status**: ✅ Complete  
**Objective**: Implement the flag/hide comment interactions and downloadable report generation.  
**Deliverables**:
- Flag button — highlights comment in UI (client-side JS)
- Hide button — collapses comment from table view
- Download Report button — generates and serves `report_{video_id}_{date}.csv`
- Loading progress indicator during long analysis

---

### Phase 4: UI Polish & Cloud Deployment
**Status**: ⬜ Not Started  
**Objective**: Polish the full UI with animations, transitions, and responsive design. Deploy to a cloud PaaS so the app is publicly accessible via a shareable link.  
**Deliverables**:
- Smooth CSS animations, hover effects, animated stat counters
- Mobile-responsive layout on all pages
- Deployed to Render/Railway with persistent SQLite disk
- `Procfile` + env vars configured on host
- Public URL working and shareable

---

### Phase 5: PDF Report Generation
**Status**: ✅ Complete  
**Objective**: Create a downloadable PDF report with embedded graphs, numerical stats, and visual insights based on the analysis. The report should contain everything a user might need and understand everything from reading that report only.  
**Depends on**: Phase 4

---

### Phase 6: Active Comment Moderation (YouTube OAuth)
**Status**: ✅ Complete  
**Objective**: Enable the video owner to authenticate via YouTube OAuth and actively moderate comments by hiding or deleting them natively on YouTube directly from the dashboard.  
**Depends on**: Phase 5

**Tasks**:
- [ ] TBD (run `/plan 6` to create)

**Verification**:
- TBD

---

### Phase 7: VibeCheck Rebrand & UX Enhancements
**Status**: ✅ Complete
**Objective**: Rebrand the entire app from "CyberGuard" to "VibeCheck — CyberBullying Detection System". Redesign the Analyze page to show the signed-in user's YouTube videos with thumbnails and one-click analyze buttons (falling back to URL paste for guest users). Add a graphical "How to Use" instructional section on the Home page. Redesign the About page with team member profiles (photo, description, LinkedIn, GitHub links).
**Depends on**: Phase 6

**Tasks**:
- [ ] TBD (run `/plan 7` to create)

**Verification**:
- TBD

---

### Phase 8: Update Website UI (Scroll Animations & 3D Elements)
**Status**: ✅ Complete
**Objective**: Redesign the entire website UI using `web.txt` as a benchmark for aesthetic direction, implementing Tailwind CSS colors, typography, and layout. Introduce scroll animations (AOS or GSAP) and floating 3D elements to make the interface more engaging. Do not include the "Recent Content" section, and preserve all current application wordings.
**Depends on**: Phase 7

**Tasks**:
- [x] Wave 1: Add Tailwind CDN, AOS integration, Fonts, and Base styling layout block setup
- [x] Wave 2: Restyle Static pages (`index.html`, `about.html`, `contact.html`) to new UI constraints
- [x] Wave 3: Restyle Interactive grids (`analyze.html`, `dashboard.html`, `history.html`) + adapt ChartJS logic to frontend colors

**Verification**:
- [x] Executed local test-server via `python app.py` and crawled visual changes via browser subagent. Confirmed new Sage-Green style, animations, and typography!

---

### Phase 9: Final Polish & Team Content
**Status**: ✅ Complete
**Objective**: Integrate final team details, dynamic 3D background elements (mouse-parallax and scroll-parallax) across all pages, and update the homepage hero section based on the user's mockups. Move image assets from the `templates/` folder to `static/img/`.
**Depends on**: Phase 8

**Tasks**:
- [x] Wave 1: Asset migration and About Page Content injection
- [x] Wave 2: Homepage Hero UI modifications
- [x] Wave 3: Global Mouse-parallax and Scroll-parallax injection

**Verification**:
- [x] Validated Parallax 3D array elements dynamically interpolating CSS translate depth via JS `requestAnimationFrame`. Verified layout rendering logic locally passed without overlap clipping.

---

### Phase 10: Cloud Deployment for free
**Status**: ⬜ Not Started
**Objective**: Deploy the application to a free cloud hosting service (e.g., Render, Railway, Hugging Face Spaces) so that it is publicly accessible via a shareable link.
**Depends on**: Phase 9

**Tasks**:
- [ ] TBD (run `/plan 10` to create)

**Verification**:
- TBD
