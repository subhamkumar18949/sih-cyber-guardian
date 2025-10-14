// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import ParticlesComponent from './components/bg';
import Navbar from './components/navbar';
import AuthPage from './components/auth';
import Footer from './components/footer';

const MainLayout = () => (
  <>
    <Navbar />
    <App />
    <Footer />
   
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <ParticlesComponent />
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
