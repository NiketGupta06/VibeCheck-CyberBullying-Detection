---
phase: 7
plan: 3
wave: 2
---

# Plan 7.3: Home How-To Section + About Team Profiles

## Objective
Add a graphical "How to Use" instructional section on the home page and redesign the About page with team member profile cards featuring photos, bios, and social links.

## Context
- templates/index.html
- templates/about.html
- static/css/style.css

## Tasks

<task type="auto">
  <name>Add How-To section to home page</name>
  <files>templates/index.html, static/css/style.css</files>
  <action>
    - Add a new section after the stats section in index.html:
      - Section title: "How to Use VibeCheck"
      - 3 step cards in a horizontal layout (stacks on mobile):
        Step 1: "Sign In or Paste URL" — icon + description
        Step 2: "AI Analyzes Comments" — icon + description  
        Step 3: "View Your Dashboard" — icon + description
      - Visual connectors (arrows/lines) between steps
    - Add CSS: `.how-to-section`, `.steps-container`, `.step-card`, `.step-number`, `.step-connector`
    - Animate step cards on scroll
  </action>
  <verify>Visit / and scroll down — 3-step how-to section visible with correct content</verify>
  <done>How-to section renders below stats with 3 graphical step cards</done>
</task>

<task type="auto">
  <name>Add team profiles to About page</name>
  <files>templates/about.html, static/css/style.css</files>
  <action>
    - Add "Meet the Team" section at the bottom of about.html
    - Create team member cards (use placeholder data user can replace):
      - Circular profile photo (use placeholder avatar)
      - Name, role/title, short bio paragraph
      - Social links: LinkedIn and GitHub with icon buttons
    - Add CSS: `.team-section`, `.team-grid`, `.team-card`, `.team-photo`, `.team-info`, `.social-links`
    - Cards should have hover effects consistent with existing design
  </action>
  <verify>Visit /about — team cards visible with photos and social link icons</verify>
  <done>About page has "Meet the Team" section with styled profile cards</done>
</task>

## Success Criteria
- [ ] Home page has a visible "How to Use" section with 3 step cards
- [ ] About page has "Meet the Team" section with profile cards
- [ ] Both sections are responsive and match existing dark theme
- [ ] Social links are clickable (even if placeholder URLs)
