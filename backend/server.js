const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint (Render uses this to check if server is running)
app.get('/', (req, res) => {
  res.status(200).json({ status: 'online', message: 'PagePulse API is running smoothly!' });
});

// Audit Endpoint
app.post('/audit', async (req, res) => {
  const { url } = req.body;

  // 1. Backend Input Validation
  if (!url) {
    return res.status(400).json({ error: 'URL is required in the request body.' });
  }

  try {
    const startTime = Date.now();
    
    // Fetch target webpage with a custom user-agent to prevent blocking
    const response = await axios.get(url, {
      timeout: 10000, // 10 seconds timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const responseTime = Date.now() - startTime;
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract SEO metrics
    const title = $('title').text().trim() || 'No title found';
    const description = $('meta[name="description"]').attr('content')?.trim() || 'No meta description found';
    const h1 = $('h1').first().text().trim() || 'No H1 heading found';
    
    // Calculate approximate word count from body text
    const bodyText = $('body').text();
    const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;

    // Send structured professional JSON response
    return res.status(200).json({
      url,
      status: response.status,
      responseTime,
      title,
      description,
      h1,
      wordCount
    });

  } catch (err) {
    console.error(`Audit error for URL ${url}:`, err.message);

    // Professional error mapping for backend failures
    let statusCode = 500;
    let errorMessage = 'Failed to analyze the website.';

    if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN') {
      statusCode = 404;
      errorMessage = 'Website unreachable or domain does not exist.';
    } else if (err.code === 'ECONNABORTED') {
      statusCode = 504;
      errorMessage = 'Gateway Timeout: The target website took too long to respond.';
    } else if (err.response) {
      statusCode = err.response.status;
      errorMessage = `Target website responded with status code ${err.response.status}`;
    }

    return res.status(statusCode).json({ error: errorMessage });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`PagePulse backend server running on port ${PORT}`);
});