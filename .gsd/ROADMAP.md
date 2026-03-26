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
