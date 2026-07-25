const express = require('express');
const cors = require('cors');
const axios = require('axios');     // Added Axios
const cheerio = require('cheerio'); // Added Cheerio

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Our basic test route
app.get('/', (req, res) => {
  res.json({ message: "PagePulse Backend is up and running!" });
});

// THE NEW AUDIT ROUTE
app.post('/audit', async (req, res) => {
  // 1. Get the URL sent by the frontend
  const { url } = req.body;

  try {
    // 2. Start a timer, then use Axios to fetch the website's HTML
    const startTime = Date.now();
    const response = await axios.get(url);
    const endTime = Date.now();

    // 3. Load the downloaded HTML into Cheerio so we can query it
    const html = response.data;
    const $ = cheerio.load(html);

    // 4. Extract the exact data the assessment requires
    const status = response.status; // HTTP status code (e.g., 200)
    const responseTime = endTime - startTime; // Time in milliseconds
    const title = $('title').text() || 'No Title Found';
    const description = $('meta[name="description"]').attr('content') || 'No Description Found';
    const h1 = $('h1').first().text() || 'No H1 Found';
    
    // Extract text from the body, split it by spaces to get words, and count them
    const textContent = $('body').text();
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;

    // 5. Send all this beautiful data back to the frontend as JSON
    res.json({
      url,
      status,
      responseTime,
      title,
      description,
      h1,
      wordCount
    });

  } catch (error) {
    // 6. ERROR HANDLING: If the URL is invalid or broken, catch it safely
    console.error("Audit Error:", error.message);
    res.status(500).json({ error: "Failed to audit the URL. Please check if it is correct." });
  }
});

// Only start the server if we are NOT running a test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app so Jest can test it
module.exports = app;