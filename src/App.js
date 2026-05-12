import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Scanner from './pages/Scanner';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [dark, setDark] = useState(false);

  // Scanner and Analytics always dark (matching design)
  const isDark = dark || page === 'scanner' || page === 'analytics';

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard dark={isDark} />;
      case 'inventory': return <Inventory dark={isDark} />;
      case 'scanner': return <Scanner dark={isDark} setPage={setPage} />;
      case 'analytics': return <Analytics dark={isDark} />;
      case 'profile': return <Profile dark={isDark} setDark={setDark} />;
      default: return <Dashboard dark={isDark} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e0e0e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={`phone-shell${isDark ? ' dark' : ''}`}>
        

        {/* Page content */}
        <div className="screen" style={{ background: isDark ? '#0d0d0d' : '#f2f2f7' }}>
          {renderPage()}
        </div>

        {/* Bottom nav */}
        <Navbar active={page} setPage={setPage} dark={isDark} />
      </div>
    </div>
  );
}
