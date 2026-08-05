export interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'resume' | 'legal' | 'research' | 'other';
  size: number;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed' | 'pending';
  summary?: string;
  classification?: string;
  pageCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinedAt: string;
  documentsCount: number;
  storageUsed: number;
}

export interface DashboardStats {
  totalDocuments: number;
  processedDocuments: number;
  pendingDocuments: number;
  storageUsedMB: number;
  successRate: number;
  avgProcessingTime: string;
}

export const mockUser: User = {
  id: 'usr-001',
  name: 'Rajin Chowdhury',
  email: 'rajin@documind.ai',
  role: 'Admin',
  joinedAt: '2025-11-15',
  documentsCount: 12,
  storageUsed: 84,
};

export const mockStats: DashboardStats = {
  totalDocuments: 12,
  processedDocuments: 9,
  pendingDocuments: 2,
  storageUsedMB: 84,
  successRate: 91.7,
  avgProcessingTime: '14s',
};

export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Q4_Financial_Report.pdf',
    type: 'invoice',
    size: 2_450_000,
    uploadedAt: '2026-08-04T14:30:00Z',
    status: 'completed',
    summary: 'Quarterly financial report showing 18% revenue growth with operating expenses stable at $4.1M.',
    classification: 'Financial Report',
    pageCount: 24,
  },
  {
    id: 'doc-002',
    name: 'NDA_Agreement.pdf',
    type: 'legal',
    size: 890_000,
    uploadedAt: '2026-08-03T16:45:00Z',
    status: 'completed',
    summary: 'Non-disclosure agreement covering proprietary technology. Duration: 3 years with automatic renewal.',
    classification: 'Legal Contract',
    pageCount: 8,
  },
  {
    id: 'doc-003',
    name: 'Research_Paper_Transformers.pdf',
    type: 'research',
    size: 3_200_000,
    uploadedAt: '2026-08-03T09:00:00Z',
    status: 'completed',
    summary: 'Novel attention mechanism for document understanding achieving 94.2% accuracy on DocVQA benchmark.',
    classification: 'Research Paper',
    pageCount: 16,
  },
  {
    id: 'doc-004',
    name: 'Employee_Handbook_v3.pdf',
    type: 'legal',
    size: 5_600_000,
    uploadedAt: '2026-08-01T08:00:00Z',
    status: 'processing',
    pageCount: 64,
  },
  {
    id: 'doc-005',
    name: 'Project_Proposal.pdf',
    type: 'other',
    size: 1_100_000,
    uploadedAt: '2026-07-31T15:20:00Z',
    status: 'pending',
    pageCount: 12,
  },
];

export const recentActivity = [
  { id: 1, action: 'Uploaded', document: 'Q4_Financial_Report.pdf', time: '2 hours ago' },
  { id: 2, action: 'Processed', document: 'NDA_Agreement.pdf', time: '1 day ago' },
  { id: 3, action: 'Uploaded', document: 'Research_Paper_Transformers.pdf', time: '2 days ago' },
];
