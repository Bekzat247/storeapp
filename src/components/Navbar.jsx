import React from 'react';

const icons = {
  home: (active) => (
    <svg viewBox="0 0 24 24" fill={active ? '#00C896' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  stock: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      {active && <rect x="6" y="7" width="4" height="6" fill="#00C896" stroke="none" rx="1"/>}
    </svg>
  ),
  scan: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke={active ? '#00C896' : 'currentColor'} strokeWidth="2.5"/>
    </svg>
  ),
  analytics: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  profile: (active) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

const tabs = [
  { id: 'dashboard', label: 'Home', icon: 'home' },
  { id: 'inventory', label: 'Stock', icon: 'stock' },
  { id: 'scanner', label: 'Scan', icon: 'scan' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

export default function Navbar({ active, setPage, dark }) {
  return (
    <nav className={`bottom-nav${dark ? ' dark' : ''}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item${active === tab.id ? ' active' : ''}`}
          onClick={() => setPage(tab.id)}
        >
          {icons[tab.icon](active === tab.id)}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
