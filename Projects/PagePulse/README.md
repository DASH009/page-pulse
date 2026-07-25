# PagePulse ⚡

PagePulse is a modern, full-stack web application designed to audit the SEO and performance metrics of any given website. Simply enter a URL, and the application instantly scrapes and analyzes the target page, returning key data points in a clean, responsive dashboard.

## 🚀 Features

* **Real-time Web Scraping:** Extracts page titles, meta descriptions, H1 tags, and word counts instantly.
* **Performance Tracking:** Calculates server response times and HTTP status codes.
* **Modern UI:** A clean, responsive React frontend built with Vite.
* **Robust Backend:** An Express.js REST API utilizing Axios and Cheerio for efficient HTML parsing.
* **Automated Testing:** Fully tested backend endpoints using Jest and Supertest.

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS3
* **Backend:** Node.js, Express.js
* **Scraping & Data:** Axios, Cheerio
* **Testing:** Jest, Supertest

## 💻 Running the Project Locally

### 1. Start the Backend Server
Navigate to the backend directory, install dependencies, and start the Express server on port 3000.
```bash
cd backend
npm install
node server.js