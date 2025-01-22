import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ResultsPage from './pages/ResultsPage';
import JobDescriptionMatcher from './pages/JobDescriptionMatcher';
import JobRecommendations from './pages/JobRecommendations';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/job-matcher" element={<JobDescriptionMatcher />} />
            <Route path="/job-recommendations" element={<JobRecommendations />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;