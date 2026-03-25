---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Cloud Deployment (Render/Railway)

## Objective
The goal of Phase 4 is to polish the UI (animations, responsive design) and deploy the app to a cloud PaaS. During planning, it was discovered that:
1. **UI Polish** is completely finished — Phase 1 built the responsive CSS (media queries at 768px/480px), the `main.js` hover effects, and animated stat counters.
2. **Deployment Config** is completely finished — `Procfile` and `requirements.txt` with Gunicorn were created in Phase 1. `app.py` already supports environment variables.

The only remaining step is the actual deployment of the repository to a cloud provider, which must be performed by the developer (user).

## Context
- `Procfile`
- `.env.example`

## Tasks

<task type="checkpoint:human-verify">
  <name>Deploy to Render or Railway</name>
  <files>
    N/A
  </files>
  <action>
    **Instructions for the User:**
    1. Initialize a Git repository and commit the project if you haven't already.
    2. Push the code to a GitHub repository.
    3. Log in to your Render or Railway dashboard.
    4. Connect the GitHub repository to a new Web Service.
    5. Set the required environment configuration:
       - **Build Command**: `pip install -r requirements.txt`
       - **Start Command**: `gunicorn app:app` (Render reads this from the Procfile automatically)
       - **Environment Variables**: Add `YOUTUBE_API_KEY` and `FLASK_SECRET_KEY`.
    
    *Note for SQLite:* If using Render's free tier, the SQLite database (`cyberguard.db`) will be reset on every deploy/restart. If you need persistent history, you must upgrade to a paid Render plan with a Persistent Disk, or deploy on Railway (which offers volume support).
  </action>
  <verify>
    User confirms the app is deployed and accessible via a public URL.
  </verify>
  <done>
    Public URL is working and shareable.
  </done>
</task>

## Success Criteria
- [ ] User completes cloud deployment
- [ ] App is accessible via public URL
