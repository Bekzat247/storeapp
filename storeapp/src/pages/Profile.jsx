import React, { useState } from 'react';

export default function Profile({ dark, setDark }) {
  const [name, setName] = useState('Bekzat');
  const [storeName, setStoreName] = useState('My Store');
  const [editing, setEditing] = useState(false);

  const menuItems = [
    { icon: '🏪', label: 'Store settings', sub: storeName },
    { icon: '🔔', label: 'Notifications', sub: 'Enabled' },
    { icon: '💳', label: 'Subscription', sub: 'Free plan' },
    { icon: '📊', label: 'Export data', sub: 'CSV / Excel' },
    { icon: '🌐', label: 'Language', sub: 'English' },
    { icon: '❓', label: 'Help & Support', sub: '' },
  ];

  return (
    <div style={{ padding: '20px 20px 0' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? '#fff' : '#1a1a1a', marginBottom: 24 }}>Profile</h1>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C896, #007AFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: 26
        }}>
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <input value={name} onChange={e => setName(e.target.value)}
                style={{ border: '1.5px solid #00C896', borderRadius: 8, padding: '4px 8px', fontSize: 16, fontWeight: 700, background: 'transparent', color: dark ? '#fff' : '#1a1a1a' }} />
              <input value={storeName} onChange={e => setStoreName(e.target.value)}
                style={{ border: '1px solid #ccc', borderRadius: 8, padding: '4px 8px', fontSize: 13, background: 'transparent', color: '#8e8e93' }} />
              <button onClick={() => setEditing(false)}
                style={{ background: '#00C896', color: 'white', border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Save
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#1a1a1a' }}>{name}</div>
              <div style={{ color: '#8e8e93', fontSize: 14 }}>{storeName}</div>
              <button onClick={() => setEditing(true)}
                style={{ background: 'none', border: 'none', color: '#00C896', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 4 }}>
                Edit profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className={`card${dark ? ' dark' : ''}`}
        style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', marginBottom: 12, cursor: 'pointer' }}
        onClick={() => setDark(!dark)}>
        <span style={{ fontSize: 20, marginRight: 14 }}>{dark ? '☀️' : '🌙'}</span>
        <span style={{ flex: 1, fontWeight: 600, color: dark ? '#fff' : '#1a1a1a', fontSize: 15 }}>
          {dark ? 'Light mode' : 'Dark mode'}
        </span>
        <div style={{
          width: 44, height: 26, borderRadius: 13, background: dark ? '#00C896' : '#e0e0e0',
          position: 'relative', transition: 'background 0.2s'
        }}>
          <div style={{
            position: 'absolute', top: 3, left: dark ? 21 : 3,
            width: 20, height: 20, borderRadius: '50%', background: 'white',
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }} />
        </div>
      </div>

      {/* Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {menuItems.map((item, i) => (
          <div key={i} className={`card${dark ? ' dark' : ''}`}
            style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', marginBottom: 2 }}>
            <span style={{ fontSize: 20, marginRight: 14 }}>{item.icon}</span>
            <span style={{ flex: 1, fontWeight: 600, color: dark ? '#fff' : '#1a1a1a', fontSize: 15 }}>{item.label}</span>
            {item.sub && <span style={{ color: '#8e8e93', fontSize: 13 }}>{item.sub}</span>}
            <span style={{ color: '#8e8e93', marginLeft: 8, fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0', color: '#8e8e93', fontSize: 13 }}>
        StoreApp v1.0.0 · Free Plan
      </div>
    </div>
  );
}
