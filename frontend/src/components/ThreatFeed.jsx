import React from 'react';
import { FiList } from 'react-icons/fi';

const ThreatFeed = () => {
  // In the future, this data will come from reading your smart contract
  const mockThreats = [
    { hash: '0x459294f224333c2c506dfd1d8db08bb4...', type: 'AI-Generated Text' },
    { hash: '0x8abcfa21a645934091c0811d74071c10...', type: 'AI-Generated Image' },
    { hash: '0x123f1344cd1fd0a4f28419497f9722a3...', type: 'Toxic Content' },
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><FiList className="mr-2 text-cyan-400"/> Live Threat Feed (Blockchain)</h2>
      <div className="space-y-3">
        {mockThreats.map((threat, index) => (
          <div key={index} className="bg-gray-900 p-3 rounded-md flex justify-between items-center">
            <div>
              <div className="text-red-400 text-sm">{threat.type}</div>
              <div className="text-xs text-gray-400 truncate">{threat.hash}</div>
            </div>
            <a href="#" className="text-cyan-400 text-xs hover:underline">Verify</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatFeed;