import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// --- ICONS (Consolidated from all files) ---
const FiUpload = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const FiType = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>;
const FiCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const FiFile = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const FiList = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const FiXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const FiCheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const FiClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- COMPONENT 1: Analyzer (Input Form) ---
const Analyzer = ({ isLoading, setResult, setError, setIsLoading }) => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [isDragOver, setIsDragOver] = useState(false);
  const mockMode = true;

  const resetState = () => {
    setResult(null);
    setError('');
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
        resetState();
        setFile(selectedFile);
        setInputText('');
    }
  };

  const clearFile = () => {
    resetState();
    setFile(null);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    resetState();

    try {
      if (mockMode) {
        await new Promise(res => setTimeout(res, 1500));
        const isThreat = Math.random() > 0.5;
        setResult({
          is_threat: isThreat,
          threat_score: isThreat ? (0.7 + Math.random() * 0.28) : (Math.random() * 0.3),
          threat_category: isThreat ? 'AI-Generated Disinformation' : 'N/A',
          sentiment: isThreat ? 'Negative' : 'Positive',
          sentiment_score: Math.random() * 0.9 + 0.1,
          input_summary: file ? `Analysis of file: ${file.name}` : 'Analysis of text snippet.',
        });
      } else {
        // Your real API call logic would go here
        throw new Error("Backend not connected in this demo.");
      }
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const tabClass = (tabName) => `flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${activeTab === tabName ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`;
  const dropzoneClasses = `relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragOver ? 'border-indigo-500 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`;

  return (
  <div className="w-full max-w-lg p-6 bg-sky-950/50 rounded-xl shadow-2xl space-y-6 border border-sky-950">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white">AI Content Analyzer</h2>
      <p className="text-gray-200 mt-1">Submit text, an image, or a video for analysis.</p>
    </div>

    <div className="grid grid-cols-2 gap-4 p-1 bg-blue-500/10 rounded-lg">
      <button onClick={() => { setActiveTab('text'); clearFile(); }} className={tabClass('text')}>
        <FiType className="mr-2" /> Text
      </button>
      <button onClick={() => { setActiveTab('file'); resetState(); setInputText(''); }} className={tabClass('file')}>
        <FiUpload className="mr-2" /> File
      </button>
    </div>

    <div>
      {activeTab === 'text' ? (
        <textarea
          className="w-full h-48 p-3 text-gray-300 bg-blue-500/10 border border-blue-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          placeholder="Paste your text here to be analyzed..."
          value={inputText}
          onChange={(e) => { setInputText(e.target.value); setFile(null); resetState(); }}
        />
      ) : (
        <div className="space-y-4">
          {file ? (
            <div className="flex items-center justify-between p-3 bg-blue-500/10 text-white rounded-lg border border-blue-700">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FiFile className="text-blue-400 w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{file.name}</span>
              </div>
              <button onClick={clearFile} className="text-gray-400 hover:text-white transition-colors">
                <FiXCircle className="w-5 h-5"/>
              </button>
            </div>
          ) : (
            <label
              className={dropzoneClasses}
              onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileChange(e.dataTransfer.files[0]);
                }
              }}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                <FiUpload className="w-8 h-8 mb-4"/>
                <p className="mb-2 text-sm"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
                <p className="text-xs">Image or Video (MAX. 50MB)</p>
              </div>
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} accept="image/*,video/*"/>
            </label>
          )}
        </div>
      )}
    </div>

    <button
      onClick={handleAnalyze}
      disabled={isLoading || (!inputText && !file)}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-blue-600/70 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
    >
      {isLoading ? (
        <><Spinner /> Analyzing...</>
      ) : (
        <><FiCpu /> Analyze Now</>
      )}
    </button>
  </div>
);
};


// --- COMPONENT 2: Results (Display Panel) ---
const Results = ({ isLoading, result, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full max-w-lg p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px]">
                    <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-400 mt-4 text-sm">Analyzing content, please wait...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full max-w-lg p-6 bg-red-900/20 border border-red-500/50 rounded-xl shadow-lg animate-fade-in">
                    <div className="flex items-center">
                        <FiXCircle className="w-6 h-6 text-red-400 mr-3" />
                        <div>
                            <h3 className="font-semibold text-red-300">Analysis Error</h3>
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (!result) {
            return (
                <div className="w-full max-w-lg p-6 bg-gray-800 border border-dashed border-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px] text-center">
                    <FiCpu className="w-10 h-10 text-gray-600 mb-3" />
                    <h3 className="font-semibold text-gray-500">Analysis Report</h3>
                    <p className="text-gray-600 text-sm">Your results will appear here.</p>
                </div>
            );
        }

        const isThreat = result.is_threat;
        const statusBg = isThreat ? 'bg-red-500/10' : 'bg-green-500/10';
        const statusText = isThreat ? 'text-red-400' : 'text-green-400';
        const statusBorder = isThreat ? 'border-red-500/50' : 'border-green-500/50';
        const statusGlow = isThreat ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_15px_rgba(34,197,94,0.3)]';

      return (
    <div className={`w-full max-w-lg p-6 bg-sky-800/40 backdrop-blur-sm border ${statusBorder} ${statusGlow} rounded-xl shadow-2xl animate-fade-in`}>
      <h2 className="text-xl font-bold text-white mb-4">Analysis Report</h2>
      <div className={`flex items-center p-3 rounded-lg mb-6 ${statusBg}`}>
        {isThreat ? <FiXCircle className={`w-6 h-6 mr-3 ${statusText}`} /> : <FiCheckCircle className={`w-6 h-6 mr-3 ${statusText}`} />}
        <span className={`text-lg font-bold ${statusText}`}>{isThreat ? 'THREAT DETECTED' : 'NO THREAT DETECTED'}</span>
      </div>
      <div className="space-y-4 text-sm">
        {Object.entries(result).map(([key, value]) => {
          if (value === null || key === 'is_threat') return null;
          const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          if (typeof value === 'number' && (key.toLowerCase().includes('score') || key.toLowerCase().includes('confidence'))) {
            const percentage = (value * 100).toFixed(1);
            let barColor = "bg-green-500";
            if (value > 0.7) barColor = "bg-red-500";
            else if (value > 0.4) barColor = "bg-yellow-500";

            return (
              <div key={key} className="p-3 bg-sky-900/30 rounded-lg border border-sky-700/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sky-200 font-semibold">{formattedKey}</span>
                  <span className={`font-mono font-bold ${barColor.replace('bg-','text-')}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-sky-700/40 rounded-full h-2">
                  <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          }

          const isLongText = typeof value === 'string' && value.length > 35;
          return (
            <div key={key} className={`p-3 bg-sky-900/30 rounded-lg border border-sky-700/30 flex justify-between items-center ${isLongText ? 'flex-col items-start' : ''}`}>
              <div className="text-sky-200 font-semibold">{formattedKey}</div>
              <div className={`font-mono text-white ${isLongText ? 'mt-1 text-left w-full' : 'truncate'}`}>{String(value)}</div>
            </div>
          );
        })}
      </div>
    </div>
);

    };
    return renderContent();
};

// --- COMPONENT 3: ThreatFeed (Blockchain Data) ---
const ThreatFeed = () => {
  const mockThreats = [
    { hash: '0x459294f224333c2c506dfd1d8db08bb4...', type: 'AI-Generated Text' },
    { hash: '0x8abcfa21a645934091c0811d74071c10...', type: 'AI-Generated Image' },
    { hash: '0x123f1344cd1fd0a4f28419497f9722a3...', type: 'Toxic Content' },
  ];

  return (
  <div className="w-full max-w-lg p-6  bg-sky-950/50 rounded-xl shadow-2xl border border-sky-700/50">
    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
      <FiList className="mr-3 text-indigo-400"/>
      Live Threat Feed
    </h2>
    <div className="space-y-3">
      {mockThreats.map((threat, index) => (
        <div
          key={index}
          className="p-3 bg-sky-900/30 rounded-lg border border-sky-700/30 flex items-center justify-between transition-all hover:border-indigo-500/50"
        >
          <div>
            <p className="text-sm font-semibold text-indigo-300">{threat.type}</p>
            <p className="text-xs text-gray-400 font-mono mt-1">{threat.hash}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

// --- History Page Component ---
const History = ({ setPage }) => {
    const mockHistory = [
      { id: 1, summary: 'Analysis of text snippet.', threat: true, score: 0.89, date: '2023-10-27' },
      { id: 2, summary: 'Analysis of file: report.docx', threat: false, score: 0.12, date: '2023-10-27' },
      { id: 3, summary: 'Analysis of file: image_04.jpg', threat: true, score: 0.95, date: '2023-10-26' },
      { id: 4, summary: 'Analysis of text snippet.', threat: false, score: 0.23, date: '2023-10-25' },
    ];
  
    return (
      <div className="w-full max-w-4xl p-6  bg-sky-800/40  rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FiClock className="mr-3 text-indigo-400"/>
            Analysis History
          </h2>
          <button
            onClick={() => setPage('dashboard')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Back to Analyzer
          </button>
        </div>
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div key={item.id} className="p-4 bg-gray-900/70 rounded-lg border border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="text-sm font-medium text-gray-300">{item.summary}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">{item.date}</p>
              </div>
              <div className={`text-sm font-bold px-3 py-1 rounded-full ${item.threat ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                Score: {(item.score * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

// --- New Footer Component ---
const Footer = () => {
    return (
        <footer className="w-full max-w-7xl mx-auto mt-20 py-8 px-8 border-t border-sky-900/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
               
                {/* You can add social media links or other items here */}
                
            </div>
        </footer>
    );
};


const Dashboard = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
  <>
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative initial-hidden animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight md:leading-snug bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            Decentralized Content Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto md:mx-0">
            An AI-powered tool for detecting harmful or AI-generated content, with results logged on-chain for transparency and trust.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/imag3es/ChatGPT Image Oct 14, 2025, 11_34_23 PM.png"
            alt="AI and Blockchain Illustration"
            className="rounded-xxl shadow-2xl max-w-sm md:max-w-md w-full"
          />
        </div>
      </div>
    </section>

    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
      <div id="analyzer-section" className="flex flex-col items-center w-full lg:w-1/2 space-y-8 flex-shrink-0 initial-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Analyzer
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setResult={setResult}
          setError={setError}
        />
        <Results
          isLoading={isLoading}
          result={result}
          error={error}
        />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-8 lg:mt-0 initial-hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <ThreatFeed />
      </div>
    </div>
  </>
);
};

// --- Main App Component (Router) ---
export default function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
      switch (page) {
          case 'history':
              return <History setPage={setPage} />;
          case 'dashboard':
          default:
              return <Dashboard setPage={setPage} />;
      }
  };

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-start pt-8 p-4 sm:p-6 lg:p-8 font-sans text-white">
      {renderPage()}
      <Footer />
      <style>{`
        /* --- Animation Styles --- */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .initial-hidden {
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Only named exports for reuse
export { Analyzer, ThreatFeed };