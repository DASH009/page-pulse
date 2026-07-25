const request = require('supertest');
const app = require('./server'); // Import our express app

describe('POST /audit', () => {
  // 1. The Happy Path Test
  it('should return a 200 status and valid data for a real URL', async () => {
    const response = await request(app)
      .post('/audit')
      .send({ url: 'https://example.com' }); // The robot sends a fake request

    // Check if the server responded correctly
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://example.com');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('wordCount');
  });

  // 2. The Invalid URL Test
  it('should return a 500 error for a fake/broken URL', async () => {
    const response = await request(app)
      .post('/audit')
      .send({ url: 'https://this-is-a-fake-website-12345.com' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});