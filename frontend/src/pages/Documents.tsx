import { useState } from 'react';
import { Search, LayoutGrid, List, Filter } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockDocuments, type Document } from '../data/mockData';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

export default function Documents() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const filtered = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.classification?.toLowerCase().includes(search.toLowerCase()) ||
      doc.summary?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Documents</h1>
          <p className="text-base text-text-secondary mt-2">
            {filtered.length} document{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-surface-900 border border-white/5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-surface-800 text-primary-500 shadow-sm border border-white/10'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-surface-800 text-primary-500 shadow-sm border border-white/10'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-800'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="enterprise-card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted transition-colors group-focus-within:text-primary-500" />
          <input
            type="text"
            placeholder="Search by name, type, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-900 border border-white/5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 focus:bg-surface-800 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-10 py-2.5 rounded-lg bg-surface-900 border border-white/5 text-sm text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary-500/50 hover:border-white/10 transition-all shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 pr-10 py-2.5 rounded-lg bg-surface-900 border border-white/5 text-sm text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary-500/50 hover:border-white/10 transition-all shadow-sm"
          >
            <option value="all">All Types</option>
            <option value="invoice">Invoice</option>
            <option value="resume">Resume</option>
            <option value="legal">Legal</option>
            <option value="research">Research</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Document Grid / List */}
      {filtered.length === 0 ? (
        <div className="enterprise-card p-20 text-center border-dashed">
          <p className="text-text-muted">No documents match your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} viewMode="grid" onClick={() => setSelectedDoc(doc)} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} viewMode="list" onClick={() => setSelectedDoc(doc)} />
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title="Document Details"
        size="lg"
      >
        {selectedDoc && (
          <div className="space-y-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-text-primary break-words tracking-tight">{selectedDoc.name}</h3>
                {selectedDoc.classification && (
                  <p className="text-sm text-primary-500 font-medium mt-1">{selectedDoc.classification}</p>
                )}
              </div>
              <StatusBadge status={selectedDoc.status} />
            </div>

            {selectedDoc.summary && (
              <div className="p-6 rounded-xl bg-surface-800/50 border border-white/5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">AI Summary</h4>
                <p className="text-sm text-text-primary leading-relaxed">{selectedDoc.summary}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'File Size', value: formatFileSize(selectedDoc.size) },
                { label: 'Pages', value: selectedDoc.pageCount || '—' },
                { label: 'Type', value: selectedDoc.type },
                { label: 'Uploaded', value: new Date(selectedDoc.uploadedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-surface-900 border border-white/5">
                  <p className="text-xs text-text-muted mb-1.5 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-text-primary capitalize">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
