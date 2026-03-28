---
phase: 7
plan: 2
wave: 1
---

# Plan 7.2: Conditional Analyze Page (Video Grid + URL Fallback)

## Objective
Redesign the Analyze page so signed-in users see their YouTube videos in a grid with one-click analyze buttons, while guest users see a sign-in prompt plus the existing URL paste form.

## Context
- .gsd/SPEC.md
- app.py (OAuth flow, analyze route)
- templates/analyze.html
- static/css/style.css

## Tasks

<task type="auto">
  <name>Add YouTube video fetching backend</name>
  <files>app.py</files>
  <action>
    - Add `youtube.readonly` to the OAuth scopes list (keep `youtube.force-ssl` too)
    - Create helper function `get_user_videos(credentials)` that:
      1. Builds YouTube API client with user credentials
      2. Calls `channels().list(part="contentDetails", mine=True)` to get uploads playlist ID
      3. Calls `playlistItems().list()` on the uploads playlist to fetch up to 50 videos
      4. Returns list of dicts: {video_id, title, thumbnail_url}
    - Modify the `/analyze` GET handler to:
      - If authenticated, call `get_user_videos()` and pass videos to template
      - Pass `is_authenticated` flag to template
    - Add handling in `/analyze` POST to accept `video_id` form field (in addition to `url`)
      - If `video_id` provided, construct the URL from it
  </action>
  <verify>python -c "from app import app; print('OK')"</verify>
  <done>App imports cleanly; /analyze GET passes video list when authenticated</done>
</task>

<task type="auto">
  <name>Redesign analyze.html template</name>
  <files>templates/analyze.html, static/css/style.css</files>
  <action>
    - Restructure template with Jinja2 conditional:
      - IF `is_authenticated` AND `videos`: render a responsive grid of video cards
        - Each card: thumbnail image, video title, "🔍 Analyze" button (form POST with hidden video_id)
      - IF NOT `is_authenticated`: render sign-in button + existing URL paste form
    - Add CSS for `.video-grid` (responsive grid), `.video-card` (glassmorphism card), `.video-thumbnail`, `.video-title`
  </action>
  <verify>Start app, visit /analyze while logged out — see URL form; while logged in — see video grid</verify>
  <done>Analyze page shows video grid for authenticated users, URL form for guests</done>
</task>

## Success Criteria
- [ ] Signed-in user sees their videos with thumbnails on /analyze
- [ ] Each video has an "Analyze" button that triggers analysis
- [ ] Guest user sees "Sign in" button + URL paste form
- [ ] Both paths successfully run analysis and redirect to dashboard
