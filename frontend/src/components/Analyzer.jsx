import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiType, FiCpu } from 'react-icons/fi';

const Analyzer = ({ setIsLoading, setResult, setError }) => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
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
    } catch (err) {
      setError("Analysis failed. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><FiCpu className="mr-2 text-cyan-400"/> Analysis Engine</h2>
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 flex items-center mb-2"><FiType className="mr-2"/> Analyze Text</label>
          <textarea
            className="w-full h-32 p-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Paste text to analyze..."
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); setFile(null); }}
          />
        </div>
        <div className="text-center text-gray-500">OR</div>
        <div>
          <label className="text-gray-400 flex items-center mb-2"><FiUpload className="mr-2"/> Upload Media</label>
          <input
            type="file"
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
            onChange={(e) => { setFile(e.target.files[0]); setInputText(''); }}
          />
        </div>
      </div>
      <button
        onClick={handleAnalyze}
        disabled={isLoading || (!inputText && !file)}
        className="w-full mt-6 py-3 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
};

export default Analyzer;