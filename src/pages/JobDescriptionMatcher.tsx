import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

function JobDescriptionMatcher() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobdesc, setjobDesc] = useState('');
  const {setJobDescription} = useResume();

  function handleFileUpload(event) {
    setjobDesc(event.target.value);
  };

  function handleMatch(event) {
    event.preventDefault();
    setJobDescription(jobdesc);
    navigate('/jobmatcher')
  }

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
          <div className="flex flex-col items-center justify-center h-[80vh] min-h-[60vh]">
            <div className="flex flex-col gap-2 w-full max-w-lg text-center">
              <textarea
                value={jobdesc}
                className='text-black border-zinc-400 p-3 focus:outline-none rounded-lg resize-none'
                rows={10}
                placeholder='Add job description here'
                onChange={(event) => handleFileUpload(event)}
              />
              <label
                htmlFor="job-description-upload"
                className="btn-primary inline-flex items-center cursor-pointer justify-center"
                onClick={()=> handleMatch(event)}
              >
                <Upload className=" mr-2 w-auto" />
                Match Job Description
              </label>

            </div>
            <p className="mt-4 text-sm text-gray-600">
              Upload a job description to analyze match percentage
            </p>
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
                        className={`px-3 py-1 rounded-full text-sm ${skill.priority === 'high'
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