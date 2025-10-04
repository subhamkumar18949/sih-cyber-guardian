import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiType, FiCpu } from 'react-icons/fi';

const Analyzer = ({ setIsLoading, setResult, setError }) => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [isLocalLoading, setLocalLoading] = useState(false);

  // Enable this to mock backend responses
  const mockMode = true;

  const handleAnalyze = async () => {
    setLocalLoading(true);
    setResult(null);
    setError('');

    try {
      if (mockMode) {
        // Simulate a delay
        await new Promise(res => setTimeout(res, 800));
        // Provide fake/mock result
        setResult({
          message: "This is a mock analysis result.",
          input: file ? file.name : inputText,
          type: file ? (file.type.startsWith('video/') ? 'video' : 'image') : 'text'
        });
      } else {
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
      }
    } catch (err) {
      setError("Analysis failed. Is the backend server running?");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
 <div className="analysis-container">
      <div className="analysis-header">
        <h2 className="analysis-title">Analysis Text</h2>
      </div>
      
      <div className="analysis-content">
        <div>
          <textarea
            className="analysis-textarea"
            placeholder="Paste text to analyze..."
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); setFile(null); }}
          />
        </div>
        
        <div className="upload-label-container">
          <div className="upload-label">
            <FiType className="upload-icon"/>
            <span>Tet Upload</span>
          </div>
        </div>
        
        <div className="upload-area">
          <FiUpload className="upload-cloud-icon"/>
          <input
            type="file"
            className="file-input"
            onChange={(e) => { setFile(e.target.files[0]); setInputText(''); }}
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={isLocalLoading || (!inputText && !file)}
          className="analyze-button"
        >
          {isLocalLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </div>
  );
};

export default Analyzer;