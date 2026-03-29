# VibeCheck — CyberBullying Detection 🛡️

![VibeCheck Logo](static/images/home%20page%20element.png) <!-- Update this with your actual image path if needed -->

VibeCheck is an AI-powered web application designed to automatically detect out-of-line, toxic, and cyberbullying comments on YouTube videos. Built to scale, it fetches thousands of comments in seconds and analyzes them using a fine-tuned BERT Deep Learning model (`ToxicBERT`). 

It provides detailed probability scores across six distinct toxicity categories and empowers creators by allowing them to **natively hide malicious comments** straight from the VibeCheck dashboard using Google OAuth.

### 🌐 Live Demo
Check out the live project deployed on Hugging Face Spaces:  
**[VibeCheck Live App](https://huggingface.co/spaces/NiketGupta06/vibeCheck)** *(Replace with your actual Space URL if different)*

---

## ✨ Features

- **Instant URL Analysis**: Paste any YouTube video URL to automatically fetch its top level comments via the YouTube Data API v3.
- **Deep Learning Toxicity Engine**: Powered by a fine-tuned Hugging Face Transformers model (`bert-base-uncased` mapped to the Jigsaw Toxic Comment Classification dataset).
- **6-Category Classification**: Scores comments across `toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, and `identity_hate`.
- **YouTube OAuth Integration**: Creators can securely sign in with their YouTube accounts to formally moderate and hide active comments.
- **Analysis History**: Automatically saves your previous scans to an embedded SQLite database so you can revisit video analytics later.
- **Premium UI/UX**: Designed with a responsive, glassmorphic Tailwind CSS interface featuring smooth ambient backgrounds and micro-animations.

---

## 🛠 Tech Stack

### Backend & Machine Learning
- **Python 3.10**
- **Flask** (Web Framework)
- **Hugging Face Transformers** (Model Hub Integration)
- **PyTorch** (Inference Engine)
- **SQLite** (Local Database)

### Frontend & UI
- **HTML5 & Jinja2 Templates**
- **Tailwind CSS** (Utility-first styling)
- **Chart.js** (Interactive data visualization)
- **Vanilla JavaScript** (DOM manipulation and OAuth logic)

### Deployment
- **Docker**
- **Gunicorn** (WSGI Server)
- **Hugging Face Spaces** (Free 16GB RAM Docker hosting)

---

## 🚀 Running Locally

If you want to run VibeCheck yourself, clone this repository and follow the steps below!

### 1. Install Dependencies
Ensure you have Python 3.10+ installed. Open a terminal and run:
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
You must create a `.env` file in the root directory and add the following keys:
```env
# Your standard YouTube Data API v3 Key
YOUTUBE_API_KEY=your_api_key_here

# A random secure string for Flask to manage sessions
FLASK_SECRET_KEY=your_random_secret_string
```

### 3. Google OAuth Setup
To enable the "Sign In" and comment moderation feature:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **YouTube Data API v3**.
3. Create an **OAuth 2.0 Client ID** (Web application).
4. Download the JSON file, rename it to `client_secrets.json`, and place it in the root folder of this project.

### 4. Start the Server
Run the Flask application locally:
```bash
python app.py
```
The app will bind to `http://localhost:5000`. 

---

## 👥 The Team

- **Niket Gupta** 
  - *Analysed models & Built Platform*
  - [LinkedIn](https://www.linkedin.com/in/niketgupta06/) | [GitHub](https://github.com/NiketGupta06)
- **Sonakshi Panda** 
  - *Analysed models & Research*
  - [LinkedIn](https://www.linkedin.com/in/sonakshi-panda/) | [GitHub](https://github.com/sonakshi03-06panda)

---
*Disclaimer: AI scores are probabilistic guidance matrices, not definitive human verdicts. The model is trained on English text corpuses and performance may degrade on heavily localized slang or alternate languages.*
