---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Project Setup & Configuration

## Objective
Establish a clean, deployable Flask project structure at the project root. Fix the critical bugs in the existing `app.py` prototype, move the YouTube API key to an environment variable, and create `requirements.txt` and `Procfile` so the project can be installed and deployed.

## Context
- `.gsd/SPEC.md` — Project requirements
- `.gsd/ARCHITECTURE.md` — Technical debt list (critical bugs)
- `.gsd/STACK.md` — Dependency list and versions
- `toxic/app.py` — Existing buggy prototype to reference

## Tasks

<task type="auto">
  <name>Create project root structure and fix app.py</name>
  <files>
    app.py
    requirements.txt
    Procfile
    .env.example
    .gitignore
  </files>
  <action>
    1. Create `app.py` at the project ROOT (NOT inside `toxic/`). This is the main Flask entry point.

    2. Write a clean, bug-free Flask app with:
       - Load env vars via `python-dotenv` at the top
       - `MODEL_PATH = "toxic_bert"` constant (not `toxic_youtube_final`)
       - Load tokenizer and model using `AutoTokenizer.from_pretrained(MODEL_PATH)` and `AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)`
       - `YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")` — from env, NOT hardcoded
       - All 6 labels: `["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]`
       - `get_video_id(url)` function — same logic as prototype
       - `get_comments(video_id, max_comments=2000)` function — paginated YouTube API fetch (cap at 2000)
       - `predict(comment)` function — tokenize, forward pass, sigmoid, return dict of 6 scores
       - Route stubs for ALL pages: `/ `, `/analyze`, `/dashboard`, `/history`, `/about`, `/contact`, `/download`
       - GET `/` → renders `index.html`
       - POST `/analyze` → calls get_comments + predict loop + aggregation + saves to DB → redirects to `/dashboard`
       - GET `/dashboard` → renders `dashboard.html` with data from session or DB
       - GET `/history` → queries SQLite + renders `history.html`
       - GET `/about` → renders `about.html`
       - GET `/contact` → renders `contact.html`
       - GET `/download` → serves CSV report

    3. Fix the CRITICAL indentation bug from the prototype: ALL logic (comment_list loop, df creation, stats computation, render_template) MUST be INSIDE the `if request.method == "POST":` block.

    4. Wrap API call and model inference in try/except — return user-friendly error messages on failure.

    5. Create `requirements.txt`:
       ```
       flask>=3.0.0
       transformers>=4.40.0
       torch>=2.2.0
       google-api-python-client>=2.0.0
       pandas>=2.2.0
       python-dotenv>=1.0.0
       gunicorn>=21.0.0
       ```

    6. Create `Procfile`:
       ```
       web: gunicorn app:app
       ```

    7. Create `.env.example`:
       ```
       YOUTUBE_API_KEY=your_api_key_here
       FLASK_SECRET_KEY=change_this_to_random_string
       DATABASE_PATH=cyberguard.db
       ```

    8. Create/update `.gitignore` to include:
       ```
       .env
       *.db
       __pycache__/
       *.pyc
       toxic_bert/
       jigsaw_train.csv
       labeled_data.csv
       ```
       NOTE: `toxic_bert/` excluded from git because it's 438MB.
  </action>
  <verify>
    Run: `python -c "from app import app; print('OK')"` in project root.
    Expected: prints `OK` with no import errors.
  </verify>
  <done>
    - `app.py` imports cleanly with no NameError or IndentationError
    - `requirements.txt` exists with all 7 dependencies
    - `Procfile` exists with correct gunicorn command
    - `.env.example` exists with all 3 keys
    - API key is NOT present anywhere in `app.py` source
  </done>
</task>

<task type="auto">
  <name>Initialize SQLite database module</name>
  <files>
    database.py
  </files>
  <action>
    Create `database.py` at project root with:

    1. `get_db_path()` → returns `os.environ.get("DATABASE_PATH", "cyberguard.db")`

    2. `init_db()` → creates `analyses` table if not exists:
       ```sql
       CREATE TABLE IF NOT EXISTS analyses (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           video_url TEXT NOT NULL,
           video_id TEXT NOT NULL,
           video_title TEXT,
           analyzed_at TEXT NOT NULL,
           total_comments INTEGER,
           toxic_percent REAL,
           results_json TEXT
       )
       ```

    3. `save_analysis(video_url, video_id, video_title, total_comments, toxic_percent, results_json)` → inserts a row, returns the new `id`

    4. `get_all_analyses()` → returns all rows as list of dicts, ordered by `analyzed_at DESC`

    5. `get_analysis_by_id(analysis_id)` → returns single row as dict or None

    6. Call `init_db()` inside `if __name__ == "__main__"` block AND import+call it at the top of `app.py`

    7. Import `database` in `app.py` and call `database.save_analysis(...)` after each successful inference run.
  </action>
  <verify>
    Run: `python -c "import database; database.init_db(); print('DB OK')"` in project root.
    Expected: prints `DB OK`, creates `cyberguard.db` file in current directory.
  </verify>
  <done>
    - `database.py` exists with all 5 functions
    - Running the verify command creates `cyberguard.db` without errors
    - `app.py` imports `database` and calls `init_db()` on startup
  </done>
</task>

## Success Criteria
- [ ] `python -c "from app import app; print('OK')"` succeeds in project root
- [ ] `python -c "import database; database.init_db(); print('DB OK')"` creates `cyberguard.db`
- [ ] No hardcoded API keys in any source file
- [ ] `requirements.txt`, `Procfile`, `.env.example` all exist
