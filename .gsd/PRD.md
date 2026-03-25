# PRD — Cyberbullying Detection on Social Media

> **Version**: 1.1  
> **Date**: 2026-03-24  
> **Status**: FINALIZED

---

## 1. Problem Description

Cyberbullying on social media platforms causes psychological harm and violates user safety. Manual monitoring is inefficient due to the large volume of user-generated content. This project aims to develop an automated system that detects cyberbullying text in social media posts (specifically YouTube comments) using NLP and machine learning. The system classifies content across 6 toxicity categories and presents actionable insights via a web dashboard.

---

## 2. Proposed Solution

A multi-page Flask web application that:
- Accepts a YouTube video URL as input
- Fetches all public comments via the YouTube Data API v3
- Runs each comment through a fine-tuned toxic BERT model
- Presents a rich analytics dashboard with downloadable reports
- Allows users to flag or hide toxic comments
- Stores history of past analyses in a database
- Deployed publicly so any user can access it via a link from any laptop or PC

---

## 3. Goals & Objectives

- Provide a beautiful, responsive, animated multi-page frontend deployed via Flask
- Deploy the Flask application publicly so any user can access it via a shareable link from any laptop or PC
- Display a comprehensive analytics dashboard per YouTube video
- Allow users to download a full toxicity report (PDF/CSV)
- Let users flag or hide negative/toxic comments
- Maintain a history database of all past video analyses
- No login or signup required

---

## 4. Target Users

YouTube content creators and viewers who are affected by online cyberbullying and want to:
- Understand the toxicity landscape of their video's comments
- Identify and act on the most harmful comments
- Access historical analysis reports

---

## 5. Features & Requirements

### P0 — Must-Have Features

1. **YouTube Comment Analyzer**
   - Description: Accept a YouTube URL, fetch up to 2000 comments, run ML inference
   - User Story: As a YouTube creator, I want to paste my video URL and get a toxicity breakdown so I can understand harassment levels
   - Acceptance Criteria:
     - [ ] Input box on homepage and analysis page accepts full YouTube URLs
     - [ ] Comments are fetched using YouTube Data API v3
     - [ ] Each comment is classified across 6 labels: `toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, `identity_hate`
     - [ ] Results are displayed in a dashboard within 60 seconds

2. **Analytics Dashboard**
   - Description: Visual breakdown of comment toxicity per YouTube video
   - Acceptance Criteria:
     - [ ] Bar/radar chart showing average score per toxicity category
     - [ ] Total comment count and % toxic comments displayed
     - [ ] Top 5 most toxic comments highlighted
     - [ ] Top 5 most threatening comments listed separately
     - [ ] Scrollable table of top 30 comments sorted by toxicity score

3. **Downloadable Report**
   - Description: Export full analysis as a downloadable file
   - Acceptance Criteria:
     - [ ] User can click "Download Report" to receive a CSV or PDF
     - [ ] Report includes all comments, scores per category, and summary stats

4. **Flag / Hide Comments**
   - Description: Let users flag comments as toxic or hide negative comments from view
   - Acceptance Criteria:
     - [ ] Each comment row has a "Flag" and "Hide" button
     - [ ] Hidden comments are collapsed/removed from the dashboard view
     - [ ] Flagged comments are visually highlighted

5. **History Database**
   - Description: Store all past analyses locally (SQLite)
   - Acceptance Criteria:
     - [ ] Every analysis is auto-saved with timestamp, video URL, video title, and summary stats
     - [ ] A "History" page lists all past analyses
     - [ ] User can click any past entry to re-view the report

### P1 — Should-Have Features

6. **Multi-Page Website**
   - Home page with intro and "Get Started" CTA
   - About page describing the project and model
   - Contact Us page with a simple form
   - Analysis / Dashboard page
   - History page

7. **Responsive & Animated UI**
   - Mobile-friendly layout
   - Smooth page transitions and loading animations
   - Animated charts and stat counters

### P2 — Nice-to-Have Features

- Dark/Light mode toggle
- Share report link
- Toxicity trend comparison between multiple videos

---

## 6. Explicitly OUT OF SCOPE

- No user authentication (no signup/login)
- No real comment deletion on YouTube (only hide within the app)
- No support for platforms other than YouTube

---

## 7. User Scenarios

### Scenario 1: Creator Analyzes Their Video
- **Context**: A YouTuber receives harassment under their latest video
- **Steps**:
  1. User opens the website homepage
  2. User clicks "Get Started"
  3. User pastes YouTube URL in the input box
  4. System fetches comments and runs ML inference (loading spinner shown)
  5. Dashboard appears with charts, stats, and comment table
  6. User clicks "Hide" on severe comments
  7. User downloads the full report
- **Expected Outcome**: User has a clear picture of toxicity and a saved report
- **Edge Cases**: Private video (API error shown), video with disabled comments (empty state shown)

### Scenario 2: Returning User Checks History
- **Context**: User wants to revisit a past analysis
- **Steps**:
  1. User opens History page
  2. Sees list of past video analyses with dates and URLs
  3. Clicks an entry to load cached dashboard
- **Expected Outcome**: Dashboard re-renders from stored data

---

## 8. Dependencies & Constraints

- **Technical**: YouTube Data API v3 quota limits (~10,000 units/day free)
- **Model**: ToxicBERT fine-tuned model stored in `toxic_bert/` directory
- **Database**: SQLite (persistent across sessions)
- **Framework**: Flask (Python 3.x), deployed publicly (e.g. Render, Railway, or similar)
- **Inference**: CPU-based torch inference (no GPU assumed)
- **Deployment**: App must be accessible to any user via a public URL — no local setup required on the user's end

---

## 9. Success Metrics

- [ ] Dashboard renders correctly for any public YouTube video URL
- [ ] Report downloads successfully as a properly formatted file
- [ ] History page shows all past analyses persistently across sessions
- [ ] Page load and analysis completion within acceptable time
- [ ] All 6 toxicity categories displayed with correct ML output
- [ ] App is publicly deployed and accessible via a link from any device without local setup
