// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnalysisPage from './components/dashboard';
// You will need to create this HistoryPage component
 import HistoryPage from './components/history'; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnalysisPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;