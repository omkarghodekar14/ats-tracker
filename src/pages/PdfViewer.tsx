import { useEffect, useState } from 'react';
import { useResume } from '../context/ResumeContext';

export default function PdfViewer() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const {file} = useResume();

  useEffect( () => {
    if (file && file.type === 'application/pdf') {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);
    }
  }, [file])

  return (
    <div>
      {fileUrl && (
        <object data={fileUrl} type="application/pdf" width="450px" height="650px">
          <p>Your browser does not support embedded PDFs. Download the PDF to view it: <a href={fileUrl}>Download PDF</a></p>
        </object>
      )}
    </div>
  );
}
