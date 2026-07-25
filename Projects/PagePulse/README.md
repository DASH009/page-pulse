# PagePulse ⚡

> A modern, full-stack website SEO and performance auditing tool built for developers and digital creators.

![Project Status](https://img.shields.io/badge/Status-Live%20%26%20Production%20Ready-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Express%20%7C%20Cheerio-blue)

---

## 🚀 Overview
**PagePulse** is a full-stack web application designed to analyze target web pages instantly. It performs real-time web scraping to extract vital on-page SEO metrics—including HTTP status, response time, page title, meta description, primary H1 heading, and approximate word count—delivering clean insights through a sleek SaaS-style dashboard.

---

## ✨ Features
* **Instant SEO Audit:** Extracts title tags, meta descriptions, H1 headings, and word counts using server-side scraping.
* **Performance Metrics:** Measures real-time server response times (ms) and HTTP status codes.
* **Client-Side Validation:** Validates URLs securely before sending requests to save bandwidth and server load.
* **Professional Error Handling:** Maps network failures, timeouts, and unreachable URLs to user-friendly messages.
* **Responsive SaaS UI:** Designed with a minimalist, modern aesthetic that looks stunning on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack
* **Frontend:** React, Vite, JavaScript, CSS3
* **Backend:** Node.js, Express.js
* **Scraping & Parsing:** Axios, Cheerio
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📁 Folder Structure
```text
PagePulse/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md