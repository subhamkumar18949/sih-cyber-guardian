import React, { useState } from 'react';
import axios from 'axios';
// ADDED: Link for navigation and FiClock for the icon
import { Link } from 'react-router-dom'; 
import { FiUpload, FiType, FiCpu, FiList, FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';

//==================================================================
//  1. Analyzer Component: (No changes here)
//==================================================================
const Analyzer = ({ setIsLoading, setResult, setError }) => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [isLocalLoading, setLocalLoading] = useState(false);

  // Enable this to mock backend responses for testing
  const mockMode = false;

  const handleAnalyze = async () => {
    setIsLoading(true);
    setLocalLoading(true);
    setResult(null);
    setError('');

    try {
      if (mockMode) {
        await new Promise(res => setTimeout(res, 1200));
        setResult({
          is_threat: Math.random() > 0.5,
          threat_type: "AI-Generated Content",
          confidence_score: Math.random(),
          input_type: file ? 'file' : 'text',
          file_name: file ? file.name : null,
        });
      } else {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const endpoint = file.type.startsWith('video/') ? '/analyze-video' : '/analyze-image';
          const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setResult(response.data);
        } else {
          const response = await axios.post('http://127.0.0.1:8000/analyze', { text: inputText });
          setResult(response.data);
        }
      }
    } catch (err) {
      setError("Analysis failed. Please check if the backend server is running.");
    } finally {
      setIsLoading(false);
      setLocalLoading(false);
    }
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setInputText('');
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
    setFile(null);
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-cyan-400 flex items-center mb-4">
        <FiCpu className="mr-3" />
        Analyze Content
      </h2>
      
      <div className="space-y-4">
        <textarea
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none h-32"
          placeholder="Paste text to analyze..."
          value={inputText}
          onChange={handleTextChange}
        />
        
        <div className="text-center text-gray-400">OR</div>

        <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-cyan-500 hover:bg-gray-800/60 transition duration-200">
          <FiUpload className="mx-auto h-10 w-10 text-gray-500 mb-2" />
          <span className="text-gray-300">
            {file ? `Selected: ${file.name}` : 'Upload an Image or Video'}
          </span>
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={isLocalLoading || (!inputText && !file)}
          className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-lg"
        >
          {isLocalLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : 'Analyze'}
        </button>
      </div>
    </div>
  );
};

//====================================================================
//  2. ThreatFeed Component: (No changes here)
//====================================================================
const ThreatFeed = () => {
  const mockThreats = [
    { hash: '0x459294f224333c2c506dfd1d8db08bb4...', type: 'AI-Generated Text' },
    { hash: '0x8abcfa21a645934091c0811d74071c10...', type: 'AI-Generated Image' },
    { hash: '0x123f1344cd1fd0a4f28419497f9722a3...', type: 'Toxic Content' },
    { hash: '0xd4e5e8f8c21e3c...e4a7b9f8d1c3a0b1', type: 'Deepfake Video' },
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
        <FiList className="mr-3" />
        Live Threat Feed
      </h2>
      <div className="space-y-3">
        {mockThreats.map((threat, index) => (
          <div key={index} className="bg-gray-900/70 p-3 rounded-md flex justify-between items-center border border-gray-700/50">
            <div>
              <div className="font-medium text-white">{threat.type}</div>
              <div className="text-xs text-gray-400 font-mono tracking-tighter">{threat.hash}</div>
            </div>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
              Verify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

//==================================================================
//  3. Results Component: (No changes here)
//==================================================================
const Results = ({ isLoading, result, error }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full flex justify-center items-center backdrop-blur-sm">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-10 w-10 text-cyan-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-cyan-400 text-lg">Analyzing...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 h-full flex justify-center items-center backdrop-blur-sm">
        <div className="text-red-400 text-lg font-semibold text-center">
          <FiAlertTriangle className="mx-auto h-10 w-10 mb-3"/>
          {error}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl p-6 h-full flex justify-center items-center backdrop-blur-sm">
        <div className="text-gray-500 text-lg">Analysis results will appear here</div>
      </div>
    );
  }

  const isThreat = result.is_threat;

  return (
    <div className={`bg-gray-800/50 border rounded-xl p-6 shadow-2xl backdrop-blur-sm transition-all duration-500 ${isThreat ? 'border-red-500' : 'border-green-500'}`}>
      <h2 className={`text-2xl font-semibold mb-4 flex items-center ${isThreat ? 'text-red-400' : 'text-green-400'}`}>
        {isThreat ? <FiAlertTriangle className="mr-3" /> : <FiCheckCircle className="mr-3" />}
        Analysis Report
      </h2>

      <div className={`text-xl font-bold p-3 rounded-md mb-6 text-center ${isThreat ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
        {isThreat ? 'THREAT DETECTED' : 'NO THREAT DETECTED'}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(result).map(([key, value]) => {
          if (value === null || key === 'text') return null;
          
          const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          let formattedValue = String(value);

          if (typeof value === 'boolean') {
            formattedValue = value ? 'Yes' : 'No';
          }
          if (typeof value === 'number' && key.toLowerCase().includes('score')) {
            formattedValue = (value * 100).toFixed(2) + '%';
          }

          return (
            <div key={key} className="bg-gray-900/70 p-3 rounded-md border border-gray-700/50">
              <div className="text-sm font-medium text-gray-400">{formattedKey}</div>
              <div className={`text-lg font-semibold ${isThreat && key === 'is_threat' ? 'text-red-400' : 'text-white'}`}>
                {formattedValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//==================================================================
//  4. Main Page Component: Manages state and layout.
//==================================================================
const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* CHANGED: Made header relative to position the button */}
        <header className="text-center mb-10 relative">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            Decentralized Threat Intelligence
          </h1>
          <p className="text-gray-400 mt-2">
            AI-powered content analysis on a secure, transparent platform.
          </p>

          {/* ADDED: History button */}
          <Link
            to="/history"
            className="absolute top-0 right-0 mt-1 mr-1 flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FiClock />
            <span>History</span>
          </Link>

        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <Analyzer 
              setIsLoading={setIsLoading} 
              setResult={setResult} 
              setError={setError} 
            />
            <ThreatFeed />
          </div>

          {/* Right Column */}
          <div className="lg:sticky top-8 self-start">
            <Results 
              isLoading={isLoading} 
              result={result} 
              error={error} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisPage;