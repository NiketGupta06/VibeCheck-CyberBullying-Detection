---
phase: 6
plan: 1
wave: 1
---

# Plan 6.1: YouTube OAuth 2.0 Authentication

## Objective
Implement a standard Flask OAuth 2.0 flow using `google-auth-oauthlib` so the user can authorize the app to manage their YouTube content.

## Context
- .gsd/SPEC.md
- .gsd/phases/6/RESEARCH.md
- c:\Users\Lenovo\Downloads\CyberBullying Detection\app.py
- c:\Users\Lenovo\Downloads\CyberBullying Detection\requirements.txt
- c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\base.html

## Tasks

<task type="auto">
  <name>Setup OAuth Libraries and Session</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\requirements.txt
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\.env
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\app.py
  </files>
  <action>
    - In `requirements.txt`, append `google-auth-oauthlib>=1.0.0` and `requests-oauthlib`.
    - In `.env`, add a placeholder `FLASK_SECRET_KEY=supersecretkey` and `GOOGLE_OAUTH_CLIENT_SECRETS_FILE=client_secrets.json`. Also add `OAUTHLIB_INSECURE_TRANSPORT=1` for local dev.
    - In `app.py`, configure `app.secret_key`, and import `google_auth_oauthlib.flow.Flow`.
    - Note: The user will manually provide the `client_secrets.json`, so just wrap the loading logic in a `try/except` block and display a clear error if missing.
  </action>
  <verify>Check that `requirements.txt` contains the lib and `app.py` has the session setup.</verify>
  <done>Dependencies added and `app.secret_key` configured.</done>
</task>

<task type="auto">
  <name>Implement Auth Routes and UI</name>
  <files>
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\app.py
    - c:\Users\Lenovo\Downloads\CyberBullying Detection\templates\base.html
  </files>
  <action>
    - Add routes `/login`, `/oauth2callback`, and `/logout` to `app.py`.
    - `/login`: Build the auth Flow with scope `https://www.googleapis.com/auth/youtube.force-ssl`, generate an authorization URL, and redirect.
    - `/oauth2callback`: Fetch the token using the authorization response and store `credentials.to_json()` in `session['credentials']`.
    - `/logout`: Clear `session`.
    - Inside all route handlers (like `index`, `analyze`), add logic to check if `session['credentials']` exists, and pass an `is_authenticated` boolean to the templates.
    - In `base.html`, update the navbar: if `is_authenticated` is true, show a "Logout" link; if false, show a "Sign In with YouTube" link.
  </action>
  <verify>Check `app.py` for all 3 routes and `base.html` for the jinja logic.</verify>
  <done>The auth flow routes are structurally complete and the UI reflects login state.</done>
</task>

## Success Criteria
- [ ] `google-auth-oauthlib` added to dependencies.
- [ ] App can generate the Google login URL and handle the callback storing the token in session.
- [ ] Navbar conditionally displays "Sign In" or "Logout".
