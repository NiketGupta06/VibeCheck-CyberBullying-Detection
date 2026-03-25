# TECH_STACK.md — Technology Stack

> **Project**: CyberGuard — Cyberbullying Detection on YouTube Comments  
> **Updated**: 2026-03-24 (v1.1)

---

## Backend

| Technology | Version | Purpose |
|---|---|---|
| Python | 3.10+ | Core programming language |
| Flask | 3.0.x | Web framework — routing, templating, serving |
| Transformers (HuggingFace) | 4.40.x | Load and run fine-tuned ToxicBERT model |
| PyTorch | 2.2.x | ML inference engine (CPU mode) |
| google-api-python-client | 2.x | YouTube Data API v3 integration |
| pandas | 2.2.x | Comment data aggregation and statistics |
| SQLite3 | 3.x (stdlib) | Local database for analysis history |
| ReportLab or WeasyPrint | Latest | PDF report generation |

---

## Frontend

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure |
| CSS3 (Vanilla) | — | Styling, animations, responsive layout |
| JavaScript (Vanilla) | ES2022+ | Interactivity (hide/flag comments, charts) |
| Chart.js | 4.x | Bar charts, radar charts for toxicity visualization |
| Google Fonts (Inter) | — | Typography |

---

## ML Model

| Component | Detail |
|---|---|
| Base Model | `bert-base-uncased` — fine-tuned ToxicBERT |
| Architecture | `BertForSequenceClassification` (768 hidden, 12 layers, 12 heads) |
| Fine-Tuned On | Jigsaw Toxic Comment Classification dataset |
| Problem Type | `multi_label_classification` (sigmoid output) |
| Output Labels | `toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, `identity_hate` |
| Max Token Length | 512 tokens |
| Model Path | `toxic_bert/` (model.safetensors, config.json, tokenizer.json) |
| Tokenizer | `BertTokenizer` (do_lower_case=true) |

---

## Data

| Dataset | Size | Purpose |
|---|---|---|
| `jigsaw_train.csv` | ~68 MB | Primary training data (Jigsaw/Kaggle) |
| `labeled_data.csv` | ~2.5 MB | Supplemental labeled data |
| `toxic_bert/` | ~438 MB | Fine-tuned ToxicBERT model weights |

---

## Database

| Technology | Version | Purpose |
|---|---|---|
| SQLite | 3.x | Local persistent storage for analysis history |
| Schema: `analyses` | — | `id`, `video_url`, `video_title`, `video_id`, `analyzed_at`, `total_comments`, `toxic_percent`, `results_json` |

---

## External APIs

| API | Version | Purpose | Limits |
|---|---|---|---|
| YouTube Data API v3 | v3 | Fetch public video comments | 10,000 units/day (free tier) |

---

## Deployment

| Technology | Purpose |
|---|---|
| Render / Railway / Fly.io | Cloud hosting for the Flask app (publicly accessible URL) |
| Gunicorn | WSGI production server for Flask |
| Environment Variables | Store YouTube API key and secrets securely on the host |
| SQLite (persistent disk) | Database persisted across deployments via cloud disk volume |

> **Goal**: Any user should be able to access the app via a public URL from any laptop or PC — no local Python setup required.

---

## Development Tools

| Tool | Version | Purpose |
|---|---|---|
| pip | Latest | Python package manager |
| venv | stdlib | Virtual environment |
| Git | 2.x | Version control |
| VS Code | Latest | IDE |

---

## File Structure

```
CyberBullying Detection/
├── .gsd/                    ← GSD project docs
│   ├── PRD.md
│   ├── APP_FLOW.md
│   ├── TECH_STACK.md
│   ├── SPEC.md
│   ├── ROADMAP.md
│   └── STATE.md
├── toxic/
│   ├── app.py               ← Main Flask application
│   ├── templates/           ← Jinja2 HTML templates
│   │   ├── index.html
│   │   ├── dashboard.html
│   │   ├── history.html
│   │   ├── about.html
│   │   └── contact.html
│   └── static/              ← CSS, JS, images
├── toxic_bert/              ← Fine-tuned ToxicBERT (bert-base-uncased) ✅
│   ├── model.safetensors    ← Model weights (~438 MB)
│   ├── config.json          ← Model architecture config
│   ├── tokenizer.json       ← Tokenizer vocab
│   ├── tokenizer_config.json
│   └── training_args.bin    ← Training metadata
├── jigsaw_train.csv         ← Training data
├── labeled_data.csv         ← Labeled dataset
├── requirements.txt         ← Python dependencies
└── Procfile                 ← For cloud deployment (gunicorn)
```

---

## Recommended requirements.txt

```
flask>=3.0.0
transformers>=4.40.0
torch>=2.2.0
google-api-python-client>=2.0.0
pandas>=2.2.0
weasyprint>=60.0
gunicorn>=21.0.0
```

## Procfile (for cloud deployment)

```
web: gunicorn toxic.app:app
```
