import React from 'react';
// Using placeholder icons as react-icons are not available in this environment.
// In your local setup, you can replace these with the actual react-icons.
const FiList = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const FiFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const FiImage = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const FiAlertTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const FiExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;

const ThreatFeed = () => {
  const mockThreats = [
    { id: '1', hash: '0x459294f224333c2c506dfd1d8db08bb4...', type: 'AI-Generated Text', icon: <FiFileText className="text-red-400"/> },
    { id: '2', hash: '0x8abcfa21a645934091c0811d74071c10...', type: 'AI-Generated Image', icon: <FiImage className="text-red-400"/> },
    { id: '3', hash: '0x123f1344cd1fd0a4f28419497f9722a3...', type: 'Toxic Content', icon: <FiAlertTriangle className="text-red-400"/> },
  ];

  return (
    <div className="w-full max-w-5xl p-6 bg-gray-800 rounded-xl shadow-2xl border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300">
      <h2 className="flex items-center text-xl font-bold text-white mb-4">
        <FiList className="mr-3 text-cyan-400"/> 
        Live Threat Feed (Blockchain)
      </h2>
      <div className="space-y-3">
        {mockThreats.map((threat) => (
          <div key={threat.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
            <div className="flex items-center overflow-hidden">
              <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {threat.icon}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-red-400 truncate">{threat.type}</div>
                <div className="text-xs text-gray-500 font-mono truncate">{threat.hash}</div>
              </div>
            </div>
            <a 
              href="#" 
              className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-3 py-1.5 transition-colors ml-4 flex-shrink-0"
              title="Verify on blockchain"
            >
              Verify <FiExternalLink className="ml-1.5 w-4 h-4"/>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 font-sans space-y-8">
      <ThreatFeed />
      <style>{`
        body {
            background-color: #111827;
        }
      `}</style>
    </div>
  );
}

