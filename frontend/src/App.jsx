// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import AnalysisPage from './components/dashboard';
import HistoryPage from './components/history';
import dog from './components/dashboard';
import Features from './components/features';


function App() {
  return (
    // src/App.js

    <Routes>
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/features" element={<Features />} />
     {/* <Route path="/feed" element={<Dash />} /> */}
      {/* <Route path="/treat" element={<HistoryPage />} /> */}
    </Routes>
  );


  
}

export default App;
