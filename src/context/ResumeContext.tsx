import React, { createContext, useContext, useState } from 'react';

interface ResumeContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  analysisResults: any | null;
  setAnalysisResults: (results: any) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);

  return (
    <ResumeContext.Provider
      value={{
        file,
        setFile,
        uploadProgress,
        setUploadProgress,
        analysisResults,
        setAnalysisResults,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}