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

    // 1. Professional URL Validation
    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith('http')) {
        throw new Error('Invalid URL protocol.');
      }
    } catch (_) {
      setError('⚠️ Please enter a valid URL including http:// or https:// (e.g., https://example.com)');
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      const response = await fetch(`${API_URL}/audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server unavailable or website unreachable.');
      }

      setResults(data);
    } catch (err) {
      // 2. Professional Error Mapping
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('🌐 Network error: Unable to connect to the backend server.');
      } else {
        setError(`❌ ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>PagePulse ⚡</h1>
      <p>Enter a URL to audit its SEO and performance.</p>

      {/* Input Form */}
      <form onSubmit={handleAudit} className="search-form">
        <input 
          type="text" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="btn-loading-content">
              <span className="spinner"></span> Auditing...
            </span>
          ) : 'Audit'}
        </button>
      </form>

      {/* Modern Loading State Card */}
      {loading && (
        <div className="loading-card-pulse">
          <div className="spinner-large"></div>
          <p>Analyzing website structure, metadata, and performance...</p>
        </div>
      )}

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