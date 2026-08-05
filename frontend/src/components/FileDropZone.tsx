import { useCallback, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileDropZone({
  onFilesSelected,
  accept = '.pdf',
  maxSizeMB = 50,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcessFiles = (files: File[]) => {
    setError(null);
    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setError('Only PDF files are allowed.');
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} exceeds the ${maxSizeMB}MB limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndProcessFiles(Array.from(e.dataTransfer.files));
    },
    [onFilesSelected, maxSizeMB],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        validateAndProcessFiles(Array.from(e.target.files));
      }
    },
    [onFilesSelected, maxSizeMB],
  );

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed
          flex flex-col items-center justify-center p-12 text-center
          transition-all duration-300 ease-out cursor-pointer bg-surface-900/50
          ${
            isDragging
              ? 'border-primary-500 bg-primary-500/10 scale-[1.01] shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              : 'border-white/10 hover:border-primary-500/50 hover:bg-surface-800'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Drop files here or click to browse"
        />

        <div className={`p-4 rounded-xl mb-6 transition-colors border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
          isDragging ? 'bg-primary-500 border-primary-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-surface-800 border-white/5 text-text-muted'
        }`}>
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
          Drag & drop PDF files
        </h3>
        <p className="text-sm text-text-secondary">
          or <span className="text-primary-500 font-semibold hover:text-primary-400 transition-colors">browse from your computer</span>
        </p>
        
        <div className="flex items-center gap-3 mt-6 text-xs font-medium text-text-muted bg-surface-950 px-4 py-2 rounded-full border border-white/5">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> PDF files only</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Max {maxSizeMB}MB per file</span>
        </div>
      </div>
      
      {error && (
        <p className="mt-4 text-sm text-error-500 font-medium animate-fade-in flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-error-500" />
          {error}
        </p>
      )}
    </div>
  );
}
