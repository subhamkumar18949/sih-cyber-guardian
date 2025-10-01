import React, { useState } from 'react';
import Analyzer from './components/Analyzer';
import Results from './components/Results';
import ThreatFeed from './components/ThreatFeed';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-mono p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]">
          Cyber Guardian 🛡️
        </h1>
        <p className="text-gray-400">AI-Powered Malign Information Operations Dashboard</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Analyzer */}
        <div className="lg:col-span-1">
          <Analyzer setIsLoading={setIsLoading} setResult={setResult} setError={setError} />
        </div>

        {/* Center Panel: Results */}
        <div className="lg:col-span-2">
          <Results isLoading={isLoading} result={result} error={error} />
        </div>
      </div>
      
      {/* Bottom Section: Live Threat Feed */}
      <div className="mt-8">
        <ThreatFeed />
      </div>
    </div>
  );
}

export default App;