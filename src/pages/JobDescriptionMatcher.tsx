import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

function JobDescriptionMatcher() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [jobdesc, setjobDesc] = useState('');

  function handleFileUpload(event) {
    setjobDesc(event.target.value);
  };

  const mockAnalysis = {
    matchScore: 75,
    skillsGap: [
      { skill: 'Docker', priority: 'high' },
      { skill: 'AWS', priority: 'medium' },
      { skill: 'GraphQL', priority: 'low' },
    ],
    actionItems: [
      { text: 'Add Docker certification', completed: false },
      { text: 'Highlight cloud experience', completed: true },
      { text: 'Include GraphQL projects', completed: false },
    ],
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {step === 1 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold text-primary mb-6">
              Upload Job Description
            </h1>
            <div className="card w-full max-w-lg text-center">
              <input
                type="text"
                value = {jobdesc}
                onChange={()=> handleFileUpload(event)}
                id="job-description-upload"
              />
              <label
                htmlFor="job-description-upload"
                className="btn-primary inline-flex items-center cursor-pointer"
              >
                <Upload className="w-5 h-5 mr-2" />
                Select Job Description
              </label>
              <p className="mt-4 text-sm text-gray-600">
                Upload a job description to analyze match percentage
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Job Description Summary
              </h2>
              <div className="prose max-w-none">
                <p className="text-text">{jobDescription}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Skills Gap Analysis
                </h2>
                <div className="space-y-3">
                  {mockAnalysis.skillsGap.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-semibold">{skill.skill}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          skill.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : skill.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {skill.priority} priority
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Action Items
                </h2>
                <div className="space-y-3">
                  {mockAnalysis.actionItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="text-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="btn-secondary w-full"
              >
                Upload Another Job Description
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDescriptionMatcher;