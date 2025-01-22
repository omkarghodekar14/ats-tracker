import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

function ResultsPage() {
  const navigate = useNavigate();

  // Mock analysis results
  const analysisResults = {
    atsScore: 85,
    recommendations: [
      { type: 'success', text: 'Good use of keywords' },
      { type: 'warning', text: 'Consider adding more quantifiable achievements' },
      { type: 'error', text: 'Missing contact information' },
    ],
    matchPercentage: 78,
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Analysis Results */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">ATS Score</span>
                  <span className="text-2xl font-bold text-blue-600">{analysisResults.atsScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${analysisResults.atsScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {analysisResults.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {getIcon(rec.type)}
                      <span className="text-gray-700">{rec.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Viewer */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-lg p-6 h-[800px] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h2>
              <div className="prose max-w-none">
                {/* Resume content would be rendered here */}
                <div className="text-gray-500 text-center mt-20">
                  Resume preview would be displayed here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;