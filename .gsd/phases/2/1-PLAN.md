---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Dashboard Data Quality Fixes

## Objective
The analysis pipeline backend is fully built in `app.py`. This plan fixes 3 concrete data-quality issues found in the Phase 1 templates that would cause incorrect or confusing output when real data flows through:

1. **Top Category stat card** shows `chart_data.keys() | list | first` (always "toxic") — should show the label with the **highest average score**
2. **Toxic % counter** has no `%` suffix — the animated counter reads `21.3` not `21.3%`
3. **app.py** does not pass a `top_category` string — it needs to compute and inject it into both dashboard routes (fresh and history) so the template can use `{{ top_category }}`

## Context
- `app.py` — `/dashboard` route, `_compute_chart_data()` helper
- `templates/dashboard.html` — stat card #3, `data-count` on toxic_percent

## Tasks

<task type="auto">
  <name>Add top_category computation to app.py dashboard routes</name>
  <files>
    app.py
  </files>
  <action>
    **1. In the `_compute_chart_data` function** (currently returns just a means dict), do NOT change its return type. Instead, create a NEW helper:

    ```python
    def _get_top_category(chart_data: dict) -> str:
        """Return the label name with the highest average score."""
        if not chart_data:
            return "—"
        top = max(chart_data, key=chart_data.get)
        return top.replace("_", " ").title()
    ```

    Place this immediately after `_compute_chart_data`.

    **2. In the `/dashboard` GET route**, both branches (history load and cache load) already build a `data` dict. In BOTH branches, add `"top_category"` to the dict:

    For the history branch (already has `data = { ... }`), add:
    ```python
    "top_category": _get_top_category(_compute_chart_data(comment_rows)),
    ```

    For the cache branch, compute after `data = _dashboard_cache.get("latest")` is confirmed not None:
    ```python
    data["top_category"] = _get_top_category(data.get("chart_data", {}))
    ```

    **3. In the `/analyze` POST route**, after building `dashboard_data`, add:
    ```python
    "top_category": _get_top_category(category_means),
    ```
    inside the `dashboard_data` dict (alongside `"chart_data": category_means`).
  </action>
  <verify>
    Run: `python -c "from app import _get_top_category; print(_get_top_category({'toxic': 0.3, 'threat': 0.8, 'insult': 0.1}))"`
    Expected output: `Threat`
  </verify>
  <done>
    - `_get_top_category` function exists in app.py
    - Both dashboard branches pass `top_category` to template
    - The analyze route adds `top_category` to the cache dict
    - Verify command returns correct label name
  </done>
</task>

<task type="auto">
  <name>Fix dashboard.html stat card #3 and toxic_percent display</name>
  <files>
    templates/dashboard.html
  </files>
  <action>
    **1. Fix stat card #3** — replace the broken Jinja2 expression with the new variable:

    Find:
    ```html
    <span class="stat-number">{{ chart_data.keys() | list | first | upper if chart_data else '—' }}</span>
    <span class="stat-label">Top Category</span>
    ```

    Replace with:
    ```html
    <span class="stat-number" style="font-size:1.25rem">{{ top_category or '—' }}</span>
    <span class="stat-label">Top Category</span>
    ```
    (Smaller font for text label — numbers have `2.25rem`, text labels fit better at `1.25rem`)

    **2. Fix toxic_percent counter** — the animated counter strips to number only. Add a `%` suffix to the label to clarify the unit. The stat card currently is:
    ```html
    <span class="stat-number toxic-color" data-count="{{ toxic_percent }}">0</span>
    <span class="stat-label">% Toxic Comments</span>
    ```

    Change the label to:
    ```html
    <span class="stat-label">Toxic Comments (%)</span>
    ```
    This disambiguates the display (e.g. `21.3` with label `Toxic Comments (%)` is immediately clear).
  </action>
  <verify>
    Run: `python -c "from app import app; ctx = app.test_request_context('/'); ctx.push(); from flask import render_template; t = render_template('dashboard.html', video_url='http://x.com', video_title='Test', analyzed_at='now', total_comments=10, toxic_percent=5.0, chart_data={'toxic':0.3,'threat':0.8}, top_category='Threat', top_comments=[], top_threats=[], comment_rows=[], analysis_id=1); print('TEMPLATE_OK' if 'Threat' in t else 'MISSING')"`
    Expected: prints `TEMPLATE_OK`
  </verify>
  <done>
    - Stat card #3 renders `{{ top_category }}` not `chart_data.keys()...`
    - Verify command prints `TEMPLATE_OK`
    - Toxic percent label reads `Toxic Comments (%)`
  </done>
</task>

## Success Criteria
- [ ] `_get_top_category({'toxic': 0.3, 'threat': 0.8})` returns `"Threat"`
- [ ] `templates/dashboard.html` stat card #3 uses `{{ top_category or '—' }}`
- [ ] Template renders without error with full mock data
