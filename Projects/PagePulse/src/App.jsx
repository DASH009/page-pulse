import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async (e) => {
    e.preventDefault();
    
    // Reset state before starting a new audit
    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Send the URL to our Express backend running on port 3000
      const response = await fetch('http://localhost:3000/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze the website.');
      }

      // Store the backend's response in state
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Turn off loading spinner
    }
  };

  return (
    <div className="app-container">
      <h1>PagePulse ⚡</h1>
      <p>Enter a URL to audit its SEO and performance.</p>

      {/* Input Form */}
      <form onSubmit={handleAudit} className="search-form">
        <input 
          type="url" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Auditing...' : 'Audit'}
        </button>
      </form>

      {/* Error Banner */}
      {error && <div className="error-card">{error}</div>}

      {/* Audit Results Dashboard */}
      {results && (
        <div className="results-container">
          <h2>Audit Report for: <span className="highlight-url">{results.url}</span></h2>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>HTTP Status</h3>
              <p className={`status-tag ${results.status === 200 ? 'success' : 'warning'}`}>
                {results.status}
              </p>
            </div>

            <div className="metric-card">
              <h3>Response Time</h3>
              <p className="metric-value">{results.responseTime} ms</p>
            </div>

            <div className="metric-card">
              <h3>Word Count</h3>
              <p className="metric-value">~{results.wordCount} words</p>
            </div>
          </div>

          <div className="details-card">
            <div className="detail-item">
              <strong>Page Title:</strong>
              <p>{results.title}</p>
            </div>
            
            <div className="detail-item">
              <strong>Meta Description:</strong>
              <p>{results.description}</p>
            </div>

            <div className="detail-item">
              <strong>H1 Heading:</strong>
              <p>{results.h1}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;