import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, RefreshCw, Eye, EyeOff } from "lucide-react";

const mockData = [
  {
    _id: "671e...",
    timestamp: "2025-10-14T12:30:00.123Z",
    inputType: "Text",
    content: "This is a threatening message...",
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
    content: "uploads/1760421540_dragon.jpg",
    content_hash: "e5f6g7h8...",
    analysis: {
      is_threat: true,
      ai_semantic_score: 0.95,
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
    // Uncomment the line below to fetch data on component mount
  fetchHistoryData();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-sans p-5">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-icon {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-5">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-2 tracking-tight">
              🛡️ Threat Analysis Dashboard
            </h1>
            <p className="text-sm text-cyan-200">
              Analyze and track potential security threats
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={fetchHistoryData}
              disabled={loading}
              className="flex items-center bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={`mr-2 ${loading ? "animate-spin-icon" : ""}`}
              />
              {loading ? "Fetching..." : "Refresh Data"}
            </button>
            <button
              onClick={handleBackClick}
              className="flex items-center bg-slate-800 hover:bg-slate-700 text-cyan-400 border-2 border-cyan-400 px-5 py-2 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-4 bg-slate-800 p-5 rounded-lg border border-slate-700 shadow-md">
            <AlertCircle size={24} className="text-red-500" />
            <div>
              <p className="text-xs text-cyan-200 uppercase font-semibold tracking-wide">
                Threats Detected
              </p>
              <p className="text-2xl font-bold text-cyan-400">{threatCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-800 p-5 rounded-lg border border-slate-700 shadow-md">
            <CheckCircle size={24} className="text-green-500" />
            <div>
              <p className="text-xs text-cyan-200 uppercase font-semibold tracking-wide">
                Safe Items
              </p>
              <p className="text-2xl font-bold text-cyan-400">{safeCount}</p>
            </div>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 shadow-md">
            <p className="text-xs text-cyan-200 uppercase font-semibold tracking-wide">
              Total Items
            </p>
            <p className="text-2xl font-bold text-cyan-400">{data.length}</p>
          </div>
        </div>

        {/* Data Source Info */}
        {useMockData && (
          <div className="bg-cyan-500 bg-opacity-10 border border-cyan-400 text-cyan-200 p-3 rounded-lg mb-5 text-sm">
            <span>📋 Currently showing trial data. Click "Refresh Data" to fetch real data.</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-400 text-red-300 p-3 rounded-lg mb-5 text-sm">
            <span>❌ Error: {error}</span>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-8">
          <p className="text-xs text-cyan-200 uppercase font-semibold tracking-wide mb-3">
            Filter by:
          </p>
          <div className="flex gap-2 flex-wrap">
            {["all", "threats", "safe"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === option
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Data Cards */}
        <div className="space-y-5">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-cyan-200">
              <p>No items found for the selected filter.</p>
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item._id}
                className={`border-2 rounded-xl overflow-hidden shadow-lg transition-all ${
                  item.analysis.is_threat
                    ? "border-red-500"
                    : "border-green-500"
                } ${expandedId === item._id ? "bg-slate-800" : "bg-slate-900"}`}
              >
                {/* Card Header */}
                <div
                  className="flex justify-between items-center p-5 bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => toggleExpand(item._id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {item.analysis.is_threat ? (
                      <AlertCircle size={20} className="text-red-500" />
                    ) : (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                    <div>
                      <p className="text-cyan-400 font-semibold">
                        {item.inputType === "Text" ? "📝 Text Content" : "🖼️ Image Content"}
                      </p>
                      <p className="text-xs text-cyan-200">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-cyan-400">
                    {expandedId === item._id ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === item._id && (
                  <div className="p-5 space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-xs text-cyan-200 uppercase font-semibold mb-2">
                          ID
                        </p>
                        <p className="text-sm text-cyan-300 font-mono break-all">
                          {item._id}
                        </p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-xs text-cyan-200 uppercase font-semibold mb-2">
                          Input Type
                        </p>
                        <p className="text-sm text-cyan-300">{item.inputType}</p>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-xs text-cyan-200 uppercase font-semibold mb-3">
                        {item.inputType === "Text" ? "Content" : "Image"}
                      </p>
                      {item.inputType === "Text" ? (
                        <p className="text-sm text-pink-300 leading-relaxed">
                          {item.content}
                        </p>
                      ) : (
                        <img
                          src={item.content}
                          alt="Uploaded content"
                          className="max-w-full max-h-96 rounded-lg mt-3 shadow-lg"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Crect fill='%23333' width='250' height='250'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23666' font-size='18'%3EImage not found%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                    </div>

                    {/* Analysis Section */}
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-xs text-cyan-200 uppercase font-semibold mb-3">
                        Analysis Results
                      </p>
                      <div className="space-y-2">
                        {Object.entries(item.analysis).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-2 border-b border-slate-700"
                          >
                            <p className="text-sm text-cyan-200 font-medium">
                              {key}
                            </p>
                            <div>
                              {typeof value === "boolean" ? (
                                <span
                                  className={`text-sm font-bold ${
                                    value ? "text-red-400" : "text-green-400"
                                  }`}
                                >
                                  {value ? "⚠️ THREAT" : "✓ SAFE"}
                                </span>
                              ) : (
                                <span className="text-sm text-cyan-300 font-mono">
                                  {typeof value === "number"
                                    ? value.toFixed(2)
                                    : value}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blockchain Hash */}
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-xs text-cyan-200 uppercase font-semibold mb-2">
                        Blockchain Hash
                      </p>
                      <p className="text-sm text-cyan-300 font-mono break-all">
                        {item.blockchain_hash}
                      </p>
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