import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, RefreshCw, Eye, EyeOff } from "lucide-react";

// Using the same mock data as provided
const mockData = [
  {
    _id: "671e...",
    timestamp: "2025-10-14T12:30:00.123Z",
    inputType: "Text",
    content: "This is a threatening message intended to cause alarm and distress. It contains explicit details that are highly concerning.",
    content_hash: "a1b2c3d4...",
    analysis: {
      is_threat: true,
      ai_generated_score: 0.1,
      toxicity_score: 0.98,
    },
    blockchain_hash: "0x123abc...",
  },
  {
    _id: "671f...",
    timestamp: "2025-10-14T12:29:00.456Z",
    inputType: "Image",
    content: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=3445&auto=format&fit=crop", // A safe, sample image URL
    content_hash: "e5f6g7h8...",
    analysis: {
      is_threat: false,
      ai_semantic_score: 0.15,
    },
    blockchain_hash: "0x456def...",
  },
];


function App() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [useMockData, setUseMockData] = useState(true);

  const handleBackClick = () => {
    window.location.href = "/";
  };

  const fetchHistoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/history");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setUseMockData(false);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch history:", err);
      setData(mockData);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchHistoryData(); // Data fetching is ready when you are
  }, []);

  const filteredData = data.filter((item) => {
    if (filter === "threats") return item.analysis.is_threat;
    if (filter === "safe") return !item.analysis.is_threat;
    return true;
  });

  const threatCount = data.filter((item) => item.analysis.is_threat).length;
  const safeCount = data.length - threatCount;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screentext-white font-sans p-8">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-icon {
          animation: spin 1s linear infinite;
        }
        .text-shadow-cyan {
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
        }
        
        /* New Animation Keyframes */
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .initial-hidden {
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-6 initial-hidden animate-fade-in-up">
          <div>
            <h1 className="text-5xl font-bold text-cyan-400 mb-3 tracking-tight text-shadow-cyan">
              🛡️ Threat Analysis Dashboard
            </h1>
            <p className="text-base text-cyan-300">
              Analyze and track potential security threats with immutable records.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={fetchHistoryData}
              disabled={loading}
              className="flex items-center bg-cyan-500/80 hover:bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-bold text-base transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 disabled:opacity-60 backdrop-blur-sm"
            >
              <RefreshCw
                size={20}
                className={`mr-2 ${loading ? "animate-spin-icon" : ""}`}
              />
              {loading ? "Fetching..." : "Refresh Data"}
            </button>
            <button
              onClick={handleBackClick}
              className="flex items-center bg-white/10 hover:bg-white/20 text-cyan-300 border border-white/20 px-6 py-3 rounded-xl font-semibold text-base transition-all shadow-md backdrop-blur-sm"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md initial-hidden animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <AlertCircle size={32} className="text-red-500" />
            <div>
              <p className="text-sm text-cyan-200 uppercase font-semibold tracking-wider">
                Threats Detected
              </p>
              <p className="text-4xl font-bold text-cyan-300">{threatCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md initial-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <CheckCircle size={32} className="text-green-500" />
            <div>
              <p className="text-sm text-cyan-200 uppercase font-semibold tracking-wider">
                Safe Items
              </p>
              <p className="text-4xl font-bold text-cyan-300">{safeCount}</p>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md initial-hidden animate-fade-in-up" style={{ animationDelay: '450ms' }}>
            <p className="text-sm text-cyan-200 uppercase font-semibold tracking-wider">
              Total Items
            </p>
            <p className="text-4xl font-bold text-cyan-300">{data.length}</p>
          </div>
        </div>
        
        {/* Notifications */}
        {useMockData && (
          <div className="bg-cyan-500/10 border border-cyan-400/50 text-cyan-200 p-4 rounded-xl mb-6 text-base initial-hidden animate-fade-in-up" style={{ animationDelay: '550ms' }}>
            <span>📋 Currently showing trial data. Click "Refresh Data" to fetch real data.</span>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-400/50 text-red-300 p-4 rounded-xl mb-6 text-base animate-fade-in">
            <span>❌ Error: {error}</span>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-8 initial-hidden animate-fade-in-up" style={{ animationDelay: '650ms' }}>
          <div className="flex gap-3 flex-wrap">
            {["all", "threats", "safe"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-6 py-2 rounded-full font-semibold text-base transition-all ${
                  filter === option
                    ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Data Cards */}
        <div className="space-y-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-24 text-cyan-200 bg-black/10 rounded-2xl animate-fade-in">
              <p className="text-lg">No items found for the selected filter.</p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={item._id}
                className={`border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 bg-slate-900/40 backdrop-blur-md initial-hidden animate-fade-in-up ${
                  item.analysis.is_threat
                    ? "border-red-500/60"
                    : "border-green-500/60"
                } ${expandedId === item._id ? "bg-slate-800/60" : ""}`}
                style={{ animationDelay: `${750 + index * 100}ms` }}
              >
                {/* Card Header */}
                <div
                  className="flex justify-between items-center p-6 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => toggleExpand(item._id)}
                >
                  <div className="flex items-center gap-5 flex-1">
                    {item.analysis.is_threat ? (
                      <AlertCircle size={28} className="text-red-500" />
                    ) : (
                      <CheckCircle size={28} className="text-green-500" />
                    )}
                    <div>
                      <p className="text-lg text-cyan-300 font-semibold">
                        {item.inputType === "Text" ? "📝 Text Content" 
                          : item.inputType === "Image" ? "🖼️ Image Content" 
                          : "❓ Unknown Content"}
                      </p>
                      <p className="text-sm text-cyan-400/80">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-cyan-400">
                    {expandedId === item._id ? <EyeOff size={24} /> : <Eye size={24} />}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === item._id && (
                  <div className="p-6 space-y-6 animate-fade-in">
                    <div className="bg-black/20 p-4 rounded-xl">
                      <p className="text-sm text-cyan-200 uppercase font-semibold mb-3 tracking-wider">
                        {item.inputType === "Text" ? "Content" : "Content Preview"}
                      </p>
                      {item.inputType === "Text" ? (
                        <p className="text-base text-pink-300 leading-relaxed font-mono">
                          {item.content}
                        </p>
                      ) : (
                        <img
                          src={item.content}
                          alt="Uploaded content"
                          className="max-w-full max-h-96 rounded-lg mt-3 shadow-lg"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,..."; // Placeholder
                          }}
                        />
                      )}
                    </div>

                    <div className="bg-black/20 p-4 rounded-xl">
                      <p className="text-sm text-cyan-200 uppercase font-semibold mb-3 tracking-wider">
                        Analysis Results
                      </p>
                      <div className="space-y-3">
                        {Object.entries(item.analysis).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 border-b border-slate-700/50 last:border-b-0"
                          >
                            <p className="text-base text-cyan-200 font-medium capitalize">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <div>
                              {typeof value === "boolean" ? (
                                <span className={`text-base font-bold px-3 py-1 rounded-full ${
                                  value ? "text-red-300 bg-red-500/20" : "text-green-300 bg-green-500/20"
                                }`}>
                                  {value ? "THREAT" : "SAFE"}
                                </span>
                              ) : (
                                <span className="text-base text-cyan-300 font-mono">
                                  {typeof value === "number" ? value.toFixed(3) : value}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/20 p-4 rounded-xl">
                          <p className="text-sm text-cyan-200 uppercase font-semibold mb-2 tracking-wider">
                            Content Hash
                          </p>
                          <p className="text-base text-cyan-300 font-mono break-all">
                            {item.content_hash}
                          </p>
                      </div>
                      <div className="bg-black/20 p-4 rounded-xl">
                          <p className="text-sm text-cyan-200 uppercase font-semibold mb-2 tracking-wider">
                            Blockchain Hash
                          </p>
                          <p className="text-base text-cyan-300 font-mono break-all">
                            {item.blockchain_hash}
                          </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;