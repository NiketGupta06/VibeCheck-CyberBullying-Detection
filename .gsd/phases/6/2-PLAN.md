---
phase: 6
plan: 2
wave: 2
---

# Plan 6.2: API Endpoint and UI Wiring for Moderation

## Objective
Implement the backend `/api/moderate` endpoint to natively delete/hide YouTube comments, and connect the frontend dashboard buttons to it.

## Context
- .gsd/phases/6/RESEARCH.md
- c:\Users\Lenovo\Downloads\CyberBullying Detection\app.py
- c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\dashboard.html
- c:\Users\Lenovo\Downloads\CyberBullying Detection\static\js\main.js

## Tasks

<task type="auto">
  <name>Create `/api/moderate` Endpoint</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\app.py
  </files>
  <action>
    - Add a POST route `/api/moderate` accepting JSON: `{ "comment_id": "Ugw...", "action": "delete"|"reject" }`.
    - Guard the logic: check if `session['credentials']` exists. If not, return a 401 Unauthorized error explaining they must sign in.
    - If authenticated, reconstruct the `Credentials` object from the JSON string in the session.
    - Build an authenticated `youtube` client using `build('youtube', 'v3', credentials=credentials)`.
    - If `action == 'delete'`, execute `youtube.comments().delete(id=comment_id).execute()`.
    - If `action == 'reject'`, execute `youtube.comments().setModerationStatus(id=comment_id, moderationStatus='rejected').execute()`.
    - Return a success JSON response. Handle HTTP errors gracefully and return distinct 500 error messages.
  </action>
  <verify>Check `app.py` for the complete API endpoint using `youtube` authenticated client.</verify>
  <done>Backend API is secured and fully implements the YouTube API calls.</done>
</task>

<task type="auto">
  <name>Wire Frontend Buttons</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\dashboard.html
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\static\js\main.js
  </files>
  <action>
    - In `dashboard.html`, we need to pass `row.comment_id` into the HTML so JS can access it. Add `data-comment-id="{{ row.comment_id }}"` to the `<tr>` or pass it directly in the `onclick` handler: `onclick="moderateComment('{{ row.comment_id }}', 'row-{{ loop.index }}', 'reject', this)"` and `onclick="moderateComment('{{ row.comment_id }}', 'row-{{ loop.index }}', 'delete', this)"`.
    - Update `dashboard.html` to clearly rename "Hide" to "Hide on YT" and "Flag" to "Delete on YT" (or similar clear wording).
    - In `main.js`, create `async function moderateComment(commentId, rowId, action, btn)` that performs a `fetch('/api/moderate')` with the payload.
    - Set the button down to a loading state while fetching.
    - On success, apply visual styles to the row (like greying it out). If it returns 401, alert the user to "Please sign in with YouTube to perform this action".
  </action>
  <verify>Check `main.js` for the `fetch` logic and `dashboard.html` for the `comment_id` injection.</verify>
  <done>The dashboard buttons are mapped to actual API interactions with feedback.</done>
</task>

## Success Criteria
- [ ] Users get a clean error if they try to moderate without logging in.
- [ ] Authenticated users can successfully hide or delete a comment on their video natively via API.
- [ ] UI provides feedback upon successful moderation.
