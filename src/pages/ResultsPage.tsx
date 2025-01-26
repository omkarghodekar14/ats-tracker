import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import PdfViewer from './PdfViewer';

import axios from 'axios';

function ResultsPage() {
  const navigate = useNavigate();
  const { file } = useResume();
  const [analysisResults, setAnalysisResults] = useState({
    "atsScore": "",
    "recommendations": [
      { "type": "", "text": "" },
      { "type": "", "text": "" },
      { "type": "", "text": "" }
    ],
    "matchPercentage": 78
  });
  const url = import.meta.env.VITE_BACKEND_URL;
  // Mock analysis results

  useEffect(() => {
    async function fetch() {

      const promptText = `
    You are an HR specialist with expertise in resume screening and Applicant Tracking System (ATS) analysis. Your job is to review resumes uploaded as files and provide a detailed evaluation in JSON format.

    For the provided resume, analyze the following:
    1. ATS Score: A score out of 100 based on how well the resume is optimized for ATS.
    2. Recommendations: A list of feedback categorized as success, warning, or error.
       - success: Positive elements in the resume.
       - warning: Areas where improvements can enhance the resume but are not critical.
       - error: Missing or critical issues that should be addressed immediately.
    3. Match Percentage: A percentage (0–100) indicating how well the resume matches the job description.

    Please return the analysis in the following format:
    {
      "atsScore": 85,
      "recommendations": [
        { "type": "success", "text": "Good use of keywords" },
        { "type": "warning", "text": "Consider adding more quantifiable achievements" },
        { "type": "error", "text": "Missing contact information" }
      ],
      "matchPercentage": 78
    }

    The resume file will be sent along with this request. Please analyze the document and populate the JSON based on its content.
  `;


      const formData = new FormData();
      formData.append('file', file); // Add the file
      formData.append('prompt', promptText);

      const response = await axios.post(url + "/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for FormData
        },
      });

      setAnalysisResults(response.data);

    }

    fetch();

  }, []);

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
          <div className="lg:w-3/5 h-full">
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
                <h3 className="text-lg font-semibold mb-4 text-zinc-600">Recommendations</h3>
                <div className="space-y-3 text-sm">
                  {analysisResults.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="flex items-center text-gray-500">
                        {getIcon(rec.type)}
                      </span>
                      <span className="text-gray-700">{rec.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
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
          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h2>
              <div className="prose max-w-none">
                    <PdfViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;