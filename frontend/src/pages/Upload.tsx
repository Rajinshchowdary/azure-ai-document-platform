import { useState, useEffect, useCallback } from 'react';
import FileDropZone from '../components/FileDropZone';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { FileText, X, CheckCircle2, Trash2 } from 'lucide-react';

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'queued' | 'uploading' | 'processing' | 'complete' | 'error';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

export default function Upload() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  const handleFilesSelected = useCallback((files: File[]) => {
    const newItems: UploadItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      progress: 0,
      status: 'queued',
    }));
    setUploads((prev) => [...prev, ...newItems]);
  }, []);

  // Simulate upload progress
  useEffect(() => {
    const interval = setInterval(() => {
      setUploads((prev) =>
        prev.map((item) => {
          if (item.status === 'queued') {
            return { ...item, status: 'uploading', progress: 5 };
          }
          if (item.status === 'uploading' && item.progress < 100) {
            const increment = Math.random() * 12 + 3;
            const newProgress = Math.min(100, item.progress + increment);
            return {
              ...item,
              progress: newProgress,
              status: newProgress >= 100 ? 'processing' : 'uploading',
            };
          }
          if (item.status === 'processing') {
            return { ...item, status: 'complete' };
          }
          return item;
        }),
      );
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const removeItem = (id: string) => {
    setUploads((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setUploads((prev) => prev.filter((item) => item.status !== 'complete'));
  };

  const completedCount = uploads.filter((u) => u.status === 'complete').length;

  return (
    <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Upload Documents</h1>
        <p className="text-base text-text-secondary mt-2">Upload PDF documents for AI-powered analysis</p>
      </div>

      {/* Drop Zone */}
      <FileDropZone onFilesSelected={handleFilesSelected} />

      {/* Upload Queue */}
      {uploads.length > 0 && (
        <div className="enterprise-card p-8 md:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              Upload Queue
              <span className="ml-4 text-sm text-text-muted font-normal tracking-normal px-2.5 py-1 rounded-full bg-surface-900 border border-white/5">
                {completedCount} of {uploads.length} completed
              </span>
            </h2>
            {completedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompleted}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear completed
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {uploads.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 p-5 rounded-xl border border-white/5 bg-surface-900/50 group hover:border-white/10 hover:bg-surface-800 transition-colors"
              >
                {/* Icon */}
                <div className={`p-3 rounded-lg flex-shrink-0 transition-colors border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
                  item.status === 'complete'
                    ? 'bg-primary-500/10 text-primary-500 border-primary-500/20'
                    : item.status === 'error'
                    ? 'bg-error-500/10 text-error-500 border-error-500/20'
                    : 'bg-surface-800 text-text-secondary border-white/5 group-hover:text-primary-500 group-hover:border-primary-500/20'
                }`}>
                  {item.status === 'complete' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                {/* File Info + Progress */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary truncate">{item.file.name}</p>
                    <span className="text-xs text-text-muted ml-4 flex-shrink-0 font-medium">
                      {formatFileSize(item.file.size)}
                    </span>
                  </div>
                  {item.status === 'uploading' && (
                    <ProgressBar progress={item.progress} size="sm" />
                  )}
                  {item.status === 'processing' && (
                    <p className="text-xs text-primary-500 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      Processing with AI...
                    </p>
                  )}
                  {item.status === 'complete' && (
                    <p className="text-xs text-primary-500 font-semibold">✓ Analysis complete</p>
                  )}
                  {item.status === 'queued' && (
                    <p className="text-xs text-text-muted">Waiting in queue...</p>
                  )}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-lg text-text-muted hover:text-error-500 hover:bg-surface-900 opacity-0 group-hover:opacity-100 transition-colors cursor-pointer ml-2"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="pt-8 border-t border-white/5">
            <ProgressBar
              progress={(completedCount / uploads.length) * 100}
              label="Overall Progress"
            />
          </div>
        </div>
      )}
    </div>
  );
}
