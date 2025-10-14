import React, { useState } from 'react';
import Analyzer from './components/Analyzer';
import Results from './components/Results';
import ThreatFeed from './components/ThreatFeed';
import './index.css'
import { Link } from 'react-router-dom'
function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
<div className="dashboard-container">
  <header className="dashboard-header">
    <h1 className="dashboard-title">
      Cyber Guardian 🛡️
    </h1>
  <div className='p'><div><p className="dashboard-subtitle">AI-Powered Malign Information Operations Dashboard</p></div> 
    <div> <Link to="/component/history">
      <button>History</button>
    </Link>
  </div></div></header>


  <div className="dashboard-grid">
    <div className="dashboard-analyzer">
      <Analyzer setIsLoading={setIsLoading} setResult={setResult} setError={setError} />
    </div>

    <div className="dashboard-results">
      <Results isLoading={isLoading} result={result} error={error} />
    </div>
  </div>
  
  <div className="dashboard-threat-feed">
    <ThreatFeed />
  </div> 
</div>
  );
}

export default App;