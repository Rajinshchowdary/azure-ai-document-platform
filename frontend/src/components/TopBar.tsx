import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <header className="h-16 bg-surface-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="relative max-w-md flex-1 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted transition-colors group-focus-within:text-primary-500" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-10 pr-4 py-1.5 rounded-md bg-surface-900/50 border border-white/5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 focus:bg-surface-900 transition-all shadow-sm"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-800 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-5 border-l border-white/5">
          <div className="w-8 h-8 rounded-full bg-surface-800 border border-white/10 flex items-center justify-center text-xs font-semibold text-text-primary">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary leading-tight">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-2 rounded-md text-text-muted hover:text-error-500 hover:bg-surface-800 transition-colors cursor-pointer ml-2"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
