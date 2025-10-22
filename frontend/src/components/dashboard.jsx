import React, { useState } from 'react';
import axios from 'axios';
// --- CONSOLIDATED SVG ICONS ---
const FiUpload = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const FiType = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>;
const FiCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const FiFile = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const FiList = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const FiXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const FiCheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const FiClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const FiLogOut = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sky-300"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-teal-300"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const Spinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);

// --- COMPONENT 1: Analyzer (Input Form) ---
const Analyzer = ({ isLoading, setResult, setError, setIsLoading }) => {
    const [inputText, setInputText] = useState('');
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState('text');
    const [isDragOver, setIsDragOver] = useState(false);

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

    // --- THIS IS THE FIXED FUNCTION ---
    const handleAnalyze = async () => {
        setIsLoading(true); // FIX: Use the prop passed from the parent
        setResult(null);
        setError('');
    
        try {
            // FIX: The mockMode and intentional error logic is removed.
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const endpoint = file.type.startsWith('video/') ? '/analyze-video' : '/analyze-image';
                const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }, // FIX: Add required headers for file upload
                });
                setResult(response.data);
            } else {
                const response = await axios.post('http://127.0.0.1:8000/analyze', { text: inputText });
                setResult(response.data);
            }
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message || "Analysis failed. Please check if the backend server is running.");
        } finally {
            setIsLoading(false); // FIX: Use the prop passed from the parent
        }
    };
    
    const tabClass = (tabName) => `flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${activeTab === tabName ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`;
    const dropzoneClasses = `relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragOver ? 'border-indigo-500 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`;

    return (
        <div className="w-full max-w-lg p-6 bg-sky-950/50 rounded-xl shadow-2xl space-y-6 border border-sky-950">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">AI Content Analyzer</h2>
                <p className="text-gray-200 mt-1">Submit text or a file for analysis.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-1 bg-blue-500/10 rounded-lg">
                <button onClick={() => { setActiveTab('text'); clearFile(); }} className={tabClass('text')}><FiType className="mr-2" /> Text</button>
                <button onClick={() => { setActiveTab('file'); resetState(); setInputText(''); }} className={tabClass('file')}><FiUpload className="mr-2" /> File</button>
            </div>
            <div>
                {activeTab === 'text' ? (
                    <textarea className="w-full h-48 p-3 text-gray-300 bg-blue-500/10 border border-blue-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="Paste your text here..." value={inputText} onChange={(e) => { setInputText(e.target.value); setFile(null); resetState(); }}/>
                ) : (
                    <div className="space-y-4">
                        {file ? (
                            <div className="flex items-center justify-between p-3 bg-blue-500/10 text-white rounded-lg border border-blue-700">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <FiFile className="text-blue-400 w-6 h-6 flex-shrink-0" />
                                    <span className="text-sm font-medium truncate">{file.name}</span>
                                </div>
                                <button onClick={clearFile} className="text-gray-400 hover:text-white transition-colors"><FiXCircle className="w-5 h-5"/></button>
                            </div>
                        ) : (
                            <label className={dropzoneClasses} onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) { handleFileChange(e.dataTransfer.files[0]); } }}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                                    <FiUpload className="w-8 h-8 mb-4"/>
                                    <p className="mb-2 text-sm"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs">Image or Video</p>
                                </div>
                                <input type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} accept="image/*,video/*"/>
                            </label>
                        )}
                    </div>
                )}
            </div>
            <button onClick={handleAnalyze} disabled={isLoading || (!inputText && !file)} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-blue-600/70 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
                {isLoading ? (<><Spinner /> Analyzing...</>) : (<><FiCpu /> Analyze Now</>)}
            </button>
        </div>
    );
};

// --- COMPONENT 2: Results (Display Panel) ---
const Results = ({ isLoading, result, error }) => {
    if (isLoading) {
        return (
            <div className="w-full max-w-lg p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px]">
                <Spinner />
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

    // --- THIS IS THE FIXED PART ---
    const isThreat = result.is_threat; // <-- FIX: Read directly from result

    const statusBg = isThreat ? 'bg-red-500/10' : 'bg-green-500/10';
    const statusText = isThreat ? 'text-red-400' : 'text-green-400';
    const statusBorder = isThreat ? 'border-red-500/50' : 'border-green-500/50';
    const statusGlow = isThreat ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_15px_rgba(34,197,94,0.3)]';
    
    // FIX: Manually create the scores and metadata objects from the flat result
    const analysisScores = {
        ai_generated_score: result.ai_generated_score,
        toxicity_score: result.toxicity_score,
        negative_sentiment_score: result.negative_sentiment_score,
        ai_semantic_score: result.ai_semantic_score,
        average_ai_score: result.average_ai_score,
    };

    const metaData = {
        content_hash: result.content_hash,
        transaction_hash: result.transaction_hash,
        filename: result.filename,
    };

    const formatTimestamp = (isoString) => new Date(isoString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const DataRow = ({ label, value }) => {
        if (value === null || value === undefined) return null; // Don't render if value is missing
        const isLong = typeof value === 'string' && value.length > 25;
        return (
            <div className={`p-3 bg-sky-900/30 rounded-lg border border-sky-700/30 flex justify-between ${isLong ? 'flex-col items-start' : 'items-center'}`}>
                <div className="text-sky-200 font-semibold">{label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div className={`font-mono text-white break-all ${isLong ? 'mt-1 text-left w-full' : 'truncate'}`}>{String(value)}</div>
            </div>
        );
    };

    const ScoreBar = ({ label, score }) => {
        if (score === null || score === undefined) return null; // Don't render if score is missing
        const percentage = (score * 100).toFixed(1);
        let barColor = "bg-green-500";
        if (score > 0.7) barColor = "bg-red-500";
        else if (score > 0.4) barColor = "bg-yellow-500";

        return (
            <div className="p-3 bg-sky-900/30 rounded-lg border border-sky-700/30">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sky-200 font-semibold">{label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <span className={`font-mono font-bold ${barColor.replace('bg-','text-')}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-sky-700/40 rounded-full h-2"><div className={`${barColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div></div>
            </div>
        );
    };

    return (
        <div className={`w-full max-w-lg p-6 bg-sky-800/40 backdrop-blur-sm border ${statusBorder} ${statusGlow} rounded-xl shadow-2xl animate-fade-in`}>
            <h2 className="text-xl font-bold text-white mb-4">Analysis Report</h2>
            <div className={`flex items-center p-3 rounded-lg mb-6 ${statusBg}`}>
                {isThreat ? <FiXCircle className={`w-6 h-6 mr-3 ${statusText}`} /> : <FiCheckCircle className={`w-6 h-6 mr-3 ${statusText}`} />}
                <span className={`text-lg font-bold ${statusText}`}>{isThreat ? 'THREAT DETECTED' : 'NO THREAT DETECTED'}</span>
            </div>
            <div className="space-y-3 text-sm">
                <h3 className="text-sky-300 font-semibold border-b border-sky-800 pb-2">Analysis Scores</h3>
                {Object.entries(analysisScores).map(([key, value]) => <ScoreBar key={key} label={key} score={value} />)}
                
                <h3 className="text-sky-300 font-semibold border-b border-sky-800 pb-2 pt-4">Metadata</h3>
                {Object.entries(metaData).map(([key, value]) => <DataRow key={key} label={key} value={value} />)}
            </div>
        </div>
    );
};

// --- COMPONENT 3: ThreatFeed ---
const ThreatFeed = () => {
    const mockData = [
        { _id: "671e...", timestamp: "2025-10-14T12:30:00.123Z", inputType: "Text", content: "This is a threatening message intended to cause alarm...", content_hash: "a1b2c3d4...", analysis: { is_threat: true, toxicity_score: 0.98 }, blockchain_hash: "0x123abc..." },
        { _id: "671f...", timestamp: "2025-10-14T12:29:00.456Z", inputType: "Image", content: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=3445&auto=format&fit=crop", content_hash: "e5f6g7h8...", analysis: { is_threat: false, ai_semantic_score: 0.15 }, blockchain_hash: "0x456def..." },
    ];
    const formatTimestamp = (isoString) => new Date(isoString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return (
        <div className="w-full max-w-4xl p-6 bg-sky-950/50 rounded-xl shadow-2xl border border-sky-700/50">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center"><FiList className="mr-2"/>Live Threat Feed</h2>
            <div className="space-y-4">
                {mockData.map((threat) => (
                    <div key={threat._id} className="p-4 bg-sky-900/40 rounded-lg border border-sky-700/30 flex flex-col md:flex-row items-start md:items-center justify-between transition-all hover:border-indigo-500/50 gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                {threat.inputType === 'Text' ? <TextIcon/> : <ImageIcon/>}
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${ threat.analysis.is_threat ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300' }`}>{threat.analysis.is_threat ? 'THREAT' : 'SAFE'}</span>
                                <p className="text-xs text-gray-400 font-mono">{formatTimestamp(threat.timestamp)}</p>
                            </div>
                            {threat.inputType === 'Text' ? (<p className="text-sm text-gray-300 italic">"{threat.content}"</p>) : (<img src={threat.content} alt="Content" className="w-24 h-24 object-cover rounded-md border-2 border-sky-700/50"/>)}
                        </div>
                        <div className="w-full md:w-auto text-left md:text-right pt-2 md:pt-0">
                            <p className="text-sm font-semibold text-indigo-300">Blockchain Hash</p>
                            <p className="text-xs text-gray-400 font-mono mt-1 break-all">{threat.blockchain_hash}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- COMPONENT 4: History Page ---
const HistoryPage = ({ setPage }) => {
    const mockHistory = [
        { id: 1, summary: 'Analysis of text snippet.', threat: true, score: 0.89, date: '2025-10-14' },
        { id: 2, summary: 'Analysis of file: report.docx', threat: false, score: 0.12, date: '2025-10-14' },
        { id: 3, summary: 'Analysis of file: image_04.jpg', threat: true, score: 0.95, date: '2025-10-13' },
    ];
    return (
        <div className="w-full max-w-4xl p-6 bg-sky-800/40 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center"><FiClock className="mr-3 text-indigo-400"/>Analysis History</h2>
                <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300">Back to Analyzer</button>
            </div>
            <div className="space-y-4">
                {mockHistory.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-900/70 rounded-lg border border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="flex-1 mb-2 sm:mb-0">
                            <p className="text-sm font-medium text-gray-300">{item.summary}</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">{item.date}</p>
                        </div>
                        <div className={`text-sm font-bold px-3 py-1 rounded-full ${item.threat ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>Score: {(item.score * 100).toFixed(0)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- COMPONENT 5: Dashboard View ---
const DashboardView = ({ setPage, handleLogout }) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 bg-clip-text text-transparent">Analyzer Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setPage('history')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600/50 rounded-lg shadow-lg hover:bg-sky-700/50 transition-all duration-300">
                            <FiClock/> View History
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600/50 rounded-lg shadow-lg hover:bg-red-700/50 transition-all duration-300">
                            <FiLogOut/> Log Out
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center w-full lg:w-1/2 space-y-8 flex-shrink-0">
                    <Analyzer isLoading={isLoading} setIsLoading={setIsLoading} setResult={setResult} setError={setError} />
                    <Results isLoading={isLoading} result={result} error={error} />
                </div>
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-8 lg:mt-0">
                    <ThreatFeed />
                </div>
            </div>
        </>
    );
};

// --- Logged Out View ---
const LoggedOutView = () => (
    <div className="flex flex-col items-center justify-center text-center h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">You have been logged out.</h2>
        <p className="text-gray-400">You would now be redirected to the home page.</p>
    </div>
);


// --- MAIN APP COMPONENT (Router) ---
export default function App() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [page, setPage] = useState('dashboard');
    
    const handleLogout = () => {
      setTimeout(1000);
        setIsLoggedOut(true);
        window.location.href = '/';
    };

    const renderContent = () => {
        if (isLoggedOut) {
            return <LoggedOutView />;
        }

        switch (page) {
            case 'history':
                return <HistoryPage setPage={setPage} />;
            case 'dashboard':
            default:
                return <DashboardView setPage={setPage} handleLogout={handleLogout} />;
        }
    };

    return (
        <main className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-start pt-8 p-4 sm:p-6 lg:p-8 font-sans text-white">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                body { background-color: #0f172a; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
            `}</style>
            {renderContent()}
        </main>
    );
}