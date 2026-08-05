interface StatusBadgeProps {
  status: 'processing' | 'completed' | 'failed' | 'pending';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Static object mappings so Tailwind doesn't miss them
  const badgeStyles = {
    completed: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pending: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    failed: 'bg-error-500/10 text-error-500 border-error-500/20',
  };

  const dotStyles = {
    completed: 'bg-primary-500',
    processing: 'bg-blue-400 animate-pulse',
    pending: 'bg-warning-500',
    failed: 'bg-error-500',
  };

  return (
    <span className={`
      inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium capitalize whitespace-nowrap
      ${badgeStyles[status]}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}
