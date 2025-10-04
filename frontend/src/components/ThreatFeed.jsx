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
  <div className="threat-feed-container">
  <h2 className="threat-feed-title">
    <FiList className="threat-feed-icon"/> 
    Live Threat Feed (Blockchain)
  </h2>
  <div className="threat-feed-list">
    {mockThreats.map((threat, index) => (
      <div key={index} className="threat-item">
        <div className="threat-item-info">
          <div className="threat-type">{threat.type}</div>
          <div className="threat-hash">{threat.hash}</div>
        </div>
        <a href="#" className="threat-verify-link">Verify</a>
      </div>
    ))}
  </div>
</div>
  );
};

export default ThreatFeed;