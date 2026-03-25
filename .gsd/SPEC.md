# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision

CyberGuard is a publicly deployed Flask web application that lets YouTube creators and viewers analyze the toxicity of comments on any YouTube video. Users paste a video URL, get a rich analytics dashboard powered by a fine-tuned ToxicBERT model, and can flag or hide toxic comments and download reports. No account required.

## Goals

1. Build a beautiful, responsive, animated multi-page Flask web app
2. Deliver a comprehensive toxicity analytics dashboard per YouTube video
3. Enable downloadable reports (CSV/PDF) and comment flag/hide actions
4. Persist analysis history in SQLite across sessions
5. Deploy publicly so any user can access via link from any laptop or PC

## Non-Goals (Out of Scope)

- No user authentication or login/signup
- No real comment deletion on YouTube
- No platforms other than YouTube
- No GPU inference (CPU-only)

## Users

YouTube content creators and viewers affected by online cyberbullying who want to understand, visualize, and act on toxic comments under their videos — without any local setup.

## Constraints

- **Model**: `toxic_bert/` — `BertForSequenceClassification` (bert-base-uncased), CPU inference, 512 token limit
- **API**: YouTube Data API v3, 10,000 units/day free quota
- **Deployment**: Cloud PaaS (Render / Railway / Fly.io), publicly accessible URL
- **Database**: SQLite with persistent disk volume
- **No auth**: Open access, no sessions

## Success Criteria

- [ ] Any public YouTube URL can be analyzed and a dashboard renders correctly
- [ ] All 6 toxicity labels display with correct ML scores
- [ ] Report downloads successfully as a formatted CSV or PDF
- [ ] History page shows all past analyses across sessions
- [ ] App is publicly accessible via URL from any device, no local setup needed
- [ ] UI is polished, animated, and mobile-responsive
