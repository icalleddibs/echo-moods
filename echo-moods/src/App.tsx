import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import RecordingPage from './components/RecordingPage';
import Camera from './components/Camera';
import "./App.css";


export default function App() {
  console.log('App.tsx');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recording-page" element={<RecordingPage />} />
          <Route path="/record" element={<Camera />} />
        </Routes>
      </div>
    </Router>
  );
}