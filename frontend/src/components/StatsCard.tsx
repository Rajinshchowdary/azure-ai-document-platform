import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
}

export default function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <div className="enterprise-card p-6 md:p-8 hover-lift animate-fade-in group flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-surface-800 border border-white/5 text-text-secondary group-hover:text-primary-500 group-hover:border-primary-500/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full border ${
            trend.positive 
              ? 'text-primary-500 bg-primary-500/10 border-primary-500/20' 
              : 'text-error-500 bg-error-500/10 border-error-500/20'
          }`}>
            {trend.positive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-auto pt-2">
        <p className="text-3xl font-bold text-text-primary tracking-tight mb-1">{value}</p>
        <p className="text-sm font-medium text-text-muted">{title}</p>
        {subtitle && <p className="text-xs text-text-secondary mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
}
