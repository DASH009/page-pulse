# PagePulse ⚡

> A modern, full-stack website SEO and performance auditing tool built for developers and digital creators.

![Project Status](https://img.shields.io/badge/Status-Live%20%26%20Production%20Ready-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Express%20%7C%20Cheerio-blue)

---

# 🚀 Overview

**PagePulse** is a full-stack web application that analyzes websites in real time and extracts important SEO and performance metrics. It performs server-side web scraping to collect information such as HTTP status, response time, page title, meta description, primary H1 heading, and approximate word count, presenting the results through a clean and responsive dashboard.

The project was built as part of the **Digital Heroes Software Development Internship Assessment**.

---

# ✨ Features

- 🌐 Audit any public website
- ⚡ Measure response time
- 📄 Extract page title
- 📝 Extract meta description
- 🔖 Detect primary H1 heading
- 📊 Calculate approximate word count
- ✅ Client-side URL validation
- 🛡️ Professional backend error handling
- 📱 Fully responsive SaaS-inspired interface

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS3

### Backend

- Node.js
- Express.js

### Scraping

- Axios
- Cheerio

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📁 Project Structure

```text
Project/
│
├── backend/
│   ├── server.js
│   ├── server.test.js
│   ├── package.json
│   └── node_modules/
│
└── Projects/
    └── PagePulse/
        ├── public/
        ├── src/
        ├── package.json
        ├── vite.config.js
        ├── .env
        └── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/DASH009/page-pulse.git
```

---

## Frontend Setup

```bash
cd Projects/PagePulse
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the frontend directory.

For local development:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=<YOUR_RENDER_BACKEND_URL>
```

---

# 📡 API Contract

## Endpoint

```
POST /audit
```

### Request

```json
{
  "url": "https://example.com"
}
```

---

### Successful Response

```json
{
  "url": "https://example.com",
  "status": 200,
  "responseTime": 148,
  "title": "Example Domain",
  "description": "Example website...",
  "h1": "Example Domain",
  "wordCount": 145
}
```

---

### Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Missing URL in request body |
| 404 | Website not found |
| 504 | Website timeout |
| 500 | Internal server error |

---

# 🧪 Testing

Automated backend tests were implemented using **Jest** and **Supertest**.

Covered scenarios:

- ✅ Happy Path (Valid website)
- ✅ Invalid URL
- ✅ Unreachable website

Run tests:

```bash
npm test
```

---

# 💡 Design Decisions

## 1. React + Vite

React was chosen because it encourages reusable, component-based development and makes UI management straightforward. Vite provides an extremely fast development environment with near-instant hot module replacement, allowing rapid iteration.

---

## 2. Express Backend

The scraping logic was intentionally placed on the backend instead of the frontend. This avoids browser CORS restrictions, keeps the implementation secure, and exposes a clean REST API for the client application.

---

## 3. Axios + Cheerio

Axios efficiently retrieves webpage HTML while Cheerio parses it using a lightweight jQuery-like API. This approach provides fast server-side parsing without requiring a full browser automation framework.

---

# 🤖 AI Usage

AI tools (ChatGPT and Gemini) were used as development assistants to discuss architecture, understand React and Express concepts, review implementation, improve UI/UX, assist with debugging, refine documentation, and validate testing strategies.

All implementation decisions, debugging, integration, testing, and final verification were reviewed, understood, and completed by me.

---

# 🚀 Future Improvements

Given additional development time, I would:

- Add Lighthouse-inspired SEO scoring
- Improve support for websites protected by anti-bot mechanisms
- Expand automated test coverage
- Add rate limiting and request caching
- Generate downloadable PDF audit reports
- Store previous audit history

---

# 📷 Screenshots

Add screenshots here before submission.

Suggested screenshots:

- Home Page
- Successful Audit
- Invalid URL Error
- Website Unreachable Error

---

# 🌍 Deployment

**Frontend**

> Replace with your Vercel URL

**Backend**

> Replace with your Render URL

---

# 👨‍💻 Author

**Harshit Singh**

GitHub:
https://github.com/DASH009/page-pulse

---

# 📄 License

This project was created for the **Digital Heroes Software Development Internship Assessment** and is intended for educational and portfolio purposes.
