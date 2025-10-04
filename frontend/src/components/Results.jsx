import React from 'react';

const Results = ({ isLoading, result, error }) => {
    if (isLoading) {
        return <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[350px] flex justify-center items-center"><div className="text-cyan-400">Analyzing...</div></div>;
    }
    if (error) {
        return <div className="bg-gray-800 border border-red-700 rounded-lg p-6 min-h-[350px] flex justify-center items-center"><div className="text-red-400">{error}</div></div>;
    }
    if (!result) {
        return <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[350px] flex justify-center items-center"><div className="text-gray-500">Results will appear here</div></div>;
    }

    const isThreat = result.is_threat;

    return (
      <div className={`results-container ${isThreat ? 'threat' : 'no-threat'}`}>
    <h2 className="results-title">Analysis Report</h2>
    <div className={`results-status ${isThreat ? 'threat' : 'no-threat'}`}>
        {isThreat ? 'THREAT DETECTED' : 'NO THREAT DETECTED'}
    </div>
    <div className="results-grid">
        {Object.entries(result).map(([key, value]) => {
            if (value === null || key === 'text') return null;
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            let formattedValue = String(value);
            if (typeof value === 'number' && key.toLowerCase().includes('score')) {
                formattedValue = (value * 100).toFixed(2) + '%';
            }

            return (
                <div key={key} className="result-item">
                    <div className="result-label">{formattedKey}</div>
                    <div className="result-value">{formattedValue}</div>
                </div>
            );
        })}
    </div>
</div>
    );
};

export default Results;