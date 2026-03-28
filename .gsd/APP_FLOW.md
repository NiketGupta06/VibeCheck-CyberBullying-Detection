# APP_FLOW.md — Application Flow Documentation

> **App**: VibeCheck — Cyberbullying Detection on YouTube Comments  
> **Version**: 1.0  
> **Date**: 2026-03-28

---

## 1. ENTRY POINTS

| Entry Point | Description |
|---|---|
| Direct URL `/` | Homepage — main entry, no auth needed |
| Direct URL `/analyze` | Analysis page (shows user's videos if logged in, or URL input) |
| Direct URL `/dashboard` | Dashboard (redirected here after analysis) |
| Direct URL `/history` | Past analyses list |
| Direct URL `/about` | About the project |
| Direct URL `/contact` | Contact Us page |
| Direct URL `/login` | initiates Google OAuth2 YouTube sign-in |
| Search Engines | Homepage indexed via meta tags |

---

## 2. CORE USER FLOWS

---

### Flow 1: YouTube Video Analysis (Main Feature)

#### HAPPY PATH

| Step | Page | UI Elements | User Action | System Response | Next State |
|---|---|---|---|---|---|
| 1 | Homepage (`/`) | Hero section, "Get Started" button | Clicks "Get Started" | Smooth scroll / navigate to analyze | `/analyze` |
| 2a | Analyze (`/analyze`) | Pre-populated video grid (if authenticated via YouTube) | Clicks "Analyze" on a specific video | Submits video ID directly | Loading state |
| 2b | Analyze (`/analyze`) | URL input box (guest fallback) | Pastes link, clicks "Analyze" | Validates URL format | Loading state |
| 3 | Analyze (loading) | Progress spinner, status text | Waits | Fetches comments via YouTube API → runs ToxicBERT inference | Processing |
| 4 | Dashboard (`/dashboard`) | Charts, stat cards, comment table, Download button | Reviews dashboard | System renders all data | Active dashboard |
| 5 | Dashboard | Comment row action buttons | Clicks "Hide" on a comment | Comment is hidden from table view | Updated table |
| 6 | Dashboard | Comment row action buttons | Clicks "Flag" on a comment | Comment highlighted in red/orange | Flagged state |
| 7 | Dashboard | "Download Report" button | Clicks Download | Generates and serves CSV/PDF file | File download triggered |

#### ERROR STATES

| Error | Trigger | Display | Recovery |
|---|---|---|---|
| Invalid URL | Non-YouTube URL entered | Inline validation message: "Please enter a valid YouTube video URL" | User corrects URL |
| Private Video | API returns 403 | Toast/alert: "This video is private or unavailable" | Return to input |
| Comments Disabled | API returns empty commentThreads | Dashboard shows empty state: "Comments are disabled for this video" | Return to input |
| API Quota Exceeded | YouTube API quota hit | Alert: "Daily analysis limit reached. Try again tomorrow." | Return to input |
| Model Inference Error | Torch/model exception | Alert: "Analysis failed. Please try a different video." | Return to input |
| Timeout | Request >120s | Toast: "Analysis timed out. Try a video with fewer comments." | Return to input |

#### EDGE CASES

| Case | Behavior |
|---|---|
| User submits same URL twice | Loads cached result from database instantly |
| User navigates away mid-analysis | Analysis continues server-side; user can return via History |
| Video has 0 comments | Empty dashboard with friendly message |
| Very large video (>500 comments) | Capped at 500 with a notice: "Showing top 500 comments" |

---

### Flow 2: View History

#### HAPPY PATH

| Step | Page | UI Elements | User Action | System Response |
|---|---|---|---|---|
| 1 | History (`/history`) | Table of past analyses | Lands on page | Loads all records from SQLite |
| 2 | History | Row with video title, URL, date, toxicity % | Clicks on a row | Navigates to cached dashboard |
| 3 | Dashboard (`/dashboard?id=X`) | Full dashboard from stored data | Reviews report | Rendered from DB, no re-analysis |

#### ERROR STATES

| Error | Trigger | Display |
|---|---|---|
| No history yet | Empty DB | Friendly empty state: "No analyses yet. Analyze your first video!" |
| Record deleted/corrupted | DB error | Alert: "Could not load this record" |

---

### Flow 3: Download Report

#### HAPPY PATH

| Step | UI Element | Action | System Response |
|---|---|---|---|
| 1 | "Download Report" button on Dashboard | User clicks | Server generates file |
| 2 | File dialog | — | Browser downloads `report_{video_id}_{date}.csv` |

#### ERROR STATES

| Error | Display |
|---|---|
| No data loaded | Button disabled with tooltip: "Run an analysis first" |
| Generation failure | Toast: "Could not generate report. Please try again." |

---

## 3. NAVIGATION MAP

```
/ (Homepage)
├── /login            ← OAuth2 start
├── /oauth2callback   ← OAuth2 return
├── /logout           ← Clears session
├── /analyze          ← Conditional logic (auth'd video grid OR guest URL input)
│   └── /dashboard    ← Results dashboard (POST result)
│       └── /download ← Report download
├── /history          ← Past analyses
│   └── /dashboard?id=X ← Cached dashboard view
├── /about            ← Project info & Team profiles
└── /contact          ← Contact form
```

**Navigation Bar** (present on all pages):
- Logo → `/`
- Analyze → `/analyze`
- History → `/history`
- About → `/about`
- Contact → `/contact`

---

## 4. SCREEN INVENTORY

| Route | Access | Purpose | Key UI Elements | State Variants |
|---|---|---|---|---|
| `/` | Public | Homepage / landing page | Hero text, "Get Started" CTA, "How to Use" instructional section | Default |
| `/login` | Public | Init OAuth flow | Redirects to Google | Navigates |
| `/analyze` | Public / Auth'd | Video selection / input | Video grid (Auth'd), URL input fallback, Login prompt | Guest, Authenticated, Loading, Error |
| `/dashboard` | Public (after analysis) | Toxicity analytics dashboard | Stat cards, charts, top toxic comments, Comment action buttons (Hide/Flag) | Loading, Populated, Empty |
| `/history` | Public | Past analyses list | Sortable table with basic stats | Empty, Populated |
| `/dashboard?id=X` | Public | Cached past dashboard | Same as `/dashboard` but data from DB | Loaded, Error |
| `/download` | Public | Report file download | No UI — server sends file | Success, Error |
| `/about` | Public | Project description | Model info, dataset, tech stack, "Meet the Team" profiles | Default |
| `/contact` | Public | Contact form | Name, email, message fields, Submit button | Default, Submitted, Error |

---

## 5. DECISION POINTS

```
User lands on /analyze
  │
  ├── IF Authorized via OAuth → Render Video Grid (User's YouTube Uploads)
  ├── IF NOT Authorized → Render URL Input Form (with Login Prompt)
  │
  ├── User Submits Input (Click Video OR Paste URL)
  │     │
  │     ├── IF URL is invalid → Show validation error → Stay on /analyze
  │     │
  │     └── IF URL is valid
  │           │
  │           ├── IF video already in DB → Load cached dashboard instantly
  │           │
  │           └── IF new video
  │                 │
  │                 ├── Fetch comments via YouTube API
  │                 │     │
  │                 │     ├── IF API error (private/disabled/quota) → Show error → Stay on /analyze
  │                 │     │
  │                 │     └── IF comments fetched → Run ToxicBERT inference
  │                 │           │
  │                 │           ├── IF inference fails → Show error → Stay on /analyze
  │                 │           │
  │                 │           └── IF inference succeeds → Save to DB → Redirect to /dashboard
  │
User on /dashboard
  │
  ├── Clicks "Hide" on comment → Comment hidden in session
  ├── Clicks "Flag" on comment → Comment highlighted
  └── Clicks "Download" → IF data exists → serve file, ELSE show disabled state

User on /history
  │
  └── Clicks row → Load /dashboard?id=X
        │
        ├── IF record exists → Render cached dashboard
        └── IF record missing → Show error state
```

---

## 6. DATA FLOW

```
[User Input: YouTube URL]
        ↓
[Flask Route: POST /analyze]
        ↓
[YouTube API: Fetch comments (max 500)]
        ↓
[ToxicBERT Model: Predict 6 toxicity scores per comment]
        ↓
[Pandas: Aggregate stats, sort, slice]
        ↓
[SQLite: Save result to history DB]
        ↓
[Flask: Render dashboard.html with chart_data, stats, comment lists]
        ↓
[User: Views dashboard, flags/hides, downloads report]
```
