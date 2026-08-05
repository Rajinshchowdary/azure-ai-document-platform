import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface-950 text-text-primary selection:bg-primary-500/30">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div
        className="transition-all duration-300 min-h-screen flex flex-col"
        style={{ marginLeft: sidebarCollapsed ? '5rem' : '16rem' }}
      >
        <TopBar />
        <main className="flex-1 p-8 md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
