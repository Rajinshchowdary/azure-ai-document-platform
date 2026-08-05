import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileStack,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/documents', label: 'Documents', icon: FileStack },
  { to: '/profile', label: 'Profile', icon: User },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-40
        bg-surface-950/50 backdrop-blur-xl border-r border-white/5
        flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5 flex-shrink-0">
        <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-500 flex-shrink-0 border border-primary-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden whitespace-nowrap">
            <h1 className="text-base font-semibold text-text-primary tracking-tight">DocuMind AI</h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md text-sm font-medium transition-all duration-200 group
              ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'}
              ${
                isActive
                  ? 'bg-surface-800 text-text-primary shadow-[inset_2px_0_0_0_var(--color-primary-500)]'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-800/50'
              }`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0 transition-colors group-hover:text-text-primary" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/5 flex-shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm text-text-muted hover:text-text-primary hover:bg-surface-800/50 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
