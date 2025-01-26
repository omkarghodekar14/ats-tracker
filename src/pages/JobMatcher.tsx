import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import PdfViewer from './PdfViewer';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';

function JobMatcher() {
    const navigate = useNavigate();
    const { file, jobDescription } = useResume();
    const [analysisResults, setAnalysisResults] = useState({
        "matchPercentage": 85,
        "recommendations": [
          { "type": "success", "text": "Resume includes key skills such as React and Node.js, matching the job description." },
          { "type": "warning", "text": "Consider adding specific metrics to describe achievements in previous roles." },
          { "type": "error", "text": "The job description requires AWS certification, which is missing in the resume." }
        ],
        "keyMatches": [
          "React",
          "Node.js",
          "API development",
          "Team collaboration",
          "MongoDB"
        ],
        "missingElements": [
          "AWS certification",
          "Experience with CI/CD pipelines",
          "Project management",
          "Docker",
          "Kubernetes"
        ]
      });

    const url = import.meta.env.VITE_BACKEND_URL;
    // Mock analysis results

    useEffect(() => {
        async function fetch() {

            let promptText = `
    You are an HR specialist with expertise in resume screening, job description analysis, and Applicant Tracking System (ATS) compatibility. Your job is to analyze both the job description and the resume provided as files and generate a detailed evaluation in JSON format.

For the provided job description and resume, analyze the following:

Match Percentage: A percentage (0–100) indicating how well the resume matches the job description based on skills, experience, and keywords.

Recommendations: A list of feedback categorized as:

success: Positive elements in the resume that align with the job description.
warning: Areas where improvements can enhance the resume to better align with the job description but are not critical.
error: Missing or critical issues that should be addressed immediately to improve the match with the job description.
Key Matches: A list of the top 5 skills, keywords, or experiences in the resume that align well with the job description.

Missing Elements: A list of important skills, certifications, or keywords mentioned in the job description but missing in the resume.

Please return the analysis in the following format:
{
  "matchPercentage": 85,
  "recommendations": [
    { "type": "success", "text": "Resume includes key skills such as React and Node.js, matching the job description." },
    { "type": "warning", "text": "Consider adding specific metrics to describe achievements in previous roles." },
    { "type": "error", "text": "The job description requires AWS certification, which is missing in the resume." }
  ],
  "keyMatches": [
    "React",
    "Node.js",
    "API development",
    "Team collaboration",
    "MongoDB"
  ],
  "missingElements": [
    "AWS certification",
    "Experience with CI/CD pipelines",
    "Project management",
    "Docker",
    "Kubernetes"
  ]
}

  `;

            promptText = promptText + "Job Description Further : " + jobDescription;

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


    const getIcon = (type) => {
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
        <div className="max-h-screen overflow-y-hidden bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Panel - Job Matcher Inputs */}
                    <div className="lg:w-2/5">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Files</h2>

                            <PdfViewer />
                        </div>
                    </div>

                    {/* Right Panel - Analysis Results */}
                    <div className="lg:w-3/5">
                        <div className="bg-white rounded-xl shadow-lg p-6 h-[800px] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-600">Match Percentage</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {analysisResults.matchPercentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${analysisResults.matchPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-zinc-600">
                                    Recommendations
                                </h3>
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

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-zinc-600">
                                Key Matches
                                </h3>
                                <div className="space-y-3 text-sm">
                                {analysisResults.keyMatches.map((rec, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <span className="flex items-center text-gray-500">
                                                {getIcon("success")}
                                            </span>
                                            <span className="text-gray-700">{rec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-zinc-600">
                                Missing Elements
                                </h3>
                                <div className="space-y-3 text-sm">
                                {analysisResults.missingElements.map((rec, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <span className="flex items-center text-gray-500">
                                                {getIcon("warning")}
                                            </span>
                                            <span className="text-gray-700">{rec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pb-7">
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Start Over
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobMatcher;
