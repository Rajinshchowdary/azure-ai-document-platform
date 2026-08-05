interface ProgressBarProps {
  progress: number;
  label?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({ progress, label, size = 'md' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-medium text-text-primary">{label}</span>
          <span className="text-text-muted font-mono">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-800 rounded-full overflow-hidden border border-white/5 ${height}`}>
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out relative shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ width: `${progress}%` }}
        >
          {/* Subtle animated overlay */}
          <div className="absolute inset-0 bg-white/20" style={{
            backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
            backgroundSize: '1rem 1rem',
            animation: 'progress-stripe 1s linear infinite'
          }} />
        </div>
      </div>
    </div>
  );
}
