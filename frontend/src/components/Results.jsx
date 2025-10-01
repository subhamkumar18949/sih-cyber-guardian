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
        <div className={`bg-gray-800 border rounded-lg p-6 min-h-[350px] ${isThreat ? 'border-red-500' : 'border-green-500'}`}>
            <h2 className="text-2xl font-bold text-white mb-4">Analysis Report</h2>
            <div className={`text-3xl font-bold mb-4 ${isThreat ? 'text-red-400' : 'text-green-400'}`}>
                {isThreat ? 'THREAT DETECTED' : 'NO THREAT DETECTED'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Object.entries(result).map(([key, value]) => {
                    if (value === null || key === 'text') return null;
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    let formattedValue = String(value);
                    if (typeof value === 'number' && key.toLowerCase().includes('score')) {
                        formattedValue = (value * 100).toFixed(2) + '%';
                    }

                    return (
                        <div key={key} className="bg-gray-900 p-3 rounded-md">
                            <div className="text-gray-400">{formattedKey}</div>
                            <div className="font-bold text-white break-words">{formattedValue}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;