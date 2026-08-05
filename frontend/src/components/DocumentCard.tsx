import type { Document } from '../data/mockData';
import StatusBadge from './StatusBadge';
import { FileText, Calendar, HardDrive } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
  viewMode?: 'grid' | 'list';
  onClick?: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DocumentCard({ document: doc, viewMode = 'grid', onClick }: DocumentCardProps) {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="enterprise-card p-4 sm:p-5 flex items-center gap-5 hover-lift cursor-pointer group"
      >
        <div className="p-2.5 rounded-lg bg-surface-800 border border-white/5 text-text-secondary group-hover:text-primary-500 transition-colors flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-semibold text-text-primary truncate group-hover:text-primary-400 transition-colors">
            {doc.name}
          </p>
          <div className="flex items-center gap-3 text-xs text-text-muted mt-1.5">
            <span className="capitalize">{doc.type}</span>
            <span>•</span>
            <span>{formatFileSize(doc.size)}</span>
          </div>
        </div>
        <div className="hidden sm:block text-sm text-text-muted pr-6">
          {formatDate(doc.uploadedAt)}
        </div>
        <StatusBadge status={doc.status} />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="enterprise-card p-6 md:p-8 hover-lift cursor-pointer group animate-fade-in flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-2.5 rounded-lg bg-surface-800 border border-white/5 text-text-secondary group-hover:text-primary-500 group-hover:border-primary-500/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <FileText className="w-5 h-5" />
        </div>
        <StatusBadge status={doc.status} />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-text-primary line-clamp-1 mb-2 group-hover:text-primary-400 transition-colors">
          {doc.name}
        </h3>

        {doc.classification && (
          <p className="text-xs text-primary-500 font-medium mb-4">{doc.classification}</p>
        )}

        {doc.summary && (
          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-6">{doc.summary}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted pt-5 border-t border-white/5 mt-auto">
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-secondary" />
          {formatDate(doc.uploadedAt)}
        </span>
        <span className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-text-secondary" />
          {formatFileSize(doc.size)}
        </span>
      </div>
    </div>
  );
}
