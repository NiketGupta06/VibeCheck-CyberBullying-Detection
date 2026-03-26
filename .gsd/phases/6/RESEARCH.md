# Phase 6 Research: YouTube OAuth and Comment Moderation

## Objective
Figure out how to authenticate the video owner via YouTube OAuth in Flask, and how the YouTube Data API enables hiding or deleting comments natively.

## OAuth 2.0 Flow
1. We need the `google-auth-oauthlib` library to handle the Flask web server OAuth flow.
2. The user will click a "Sign In with YouTube" button, redirecting them to Google to authorize the `https://www.googleapis.com/auth/youtube.force-ssl` scope.
3. The resulting OAuth credentials (token, refresh token) will be stored in the Flask session. This requires `app.secret_key` to be set securely.
4. The user will be required to provide a `client_secrets.json` file obtained from Google Cloud Console.

## Moderation API
1. **Hide Comment**: We can use `youtube.comments().setModerationStatus(id=comment_id, moderationStatus='rejected')` to securely hide the comment.
2. **Delete Comment**: We can use `youtube.comments().delete(id=comment_id)` to permanently remove it.
3. The existing dashboard has "Flag" and "Hide" buttons that currently only affect the local UI. We will upgrade these to trigger real API calls to a new Flask endpoint `/api/moderate`.

## Conclusion
We will split this Phase into two Plans across two Waves:
- **Plan 6.1 (Wave 1)**: Implement OAuth 2.0 authentication (login wrapper, session management).
- **Plan 6.2 (Wave 2)**: Implement the `/api/moderate` backend endpoint and wire the frontend UI buttons to hit this API for native YouTube moderation.
