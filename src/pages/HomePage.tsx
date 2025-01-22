import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Code, Terminal } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

function HomePage() {
  const navigate = useNavigate();
  const { setFile, uploadProgress, setUploadProgress } = useResume();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload only PDF or DOCX files');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setFile(file);
        navigate('/features');
      }
    }, 200);
  }, [setFile, setUploadProgress, navigate]);

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center">
      <div className="min-h-screen bg-black/50 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">
              TechTalent Hub
            </h1>
          </div>
          
          <p className="text-2xl text-white/90 mb-8">
            Where exceptional developers meet innovative opportunities
          </p>

          <div className="glass-card">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Terminal className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-primary">Launch Your Tech Career</h2>
            </div>

            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.docx"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-accent inline-flex items-center px-6 py-3 text-lg cursor-pointer"
            >
              <Upload className="w-6 h-6 mr-2" />
              Upload Your Resume
            </label>
            
            <p className="mt-4 text-sm text-gray-600">
              PDF or DOCX files only (max 5MB)
            </p>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full max-w-md mx-auto mt-8">
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-accent h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-white mt-2">Analyzing your profile... {uploadProgress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;