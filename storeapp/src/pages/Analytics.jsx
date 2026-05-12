import React, { useState } from 'react';


const weekData = [
  { day: 'Mon', revenue: 620 },
  { day: 'Tue', revenue: 840 },
  { day: 'Wed', revenue: 590 },
  { day: 'Thu', revenue: 1100 },
  { day: 'Fri', revenue: 950 },
  { day: 'Sat', revenue: 1280 },
  { day: 'Sun', revenue: 1420 },
];

const topProducts = [
  { name: 'Whole Milk 1L', emoji: '🥛', revenue: 820, max: 820 },
  { name: 'White Bread', emoji: '🍞', revenue: 540, max: 820 },
  { name: 'Shampoo 400ml', emoji: '🧴', revenue: 380, max: 820 },
];

export default function Analytics({ dark }) {
  const [period, setPeriod] = useState('Week');
  const maxRevenue = Math.max(...weekData.map(d => d.revenue));
  const total = weekData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div style={{ padding: '20px 20px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>Analytics</h1>
        <div style={{ display: 'flex', gap: 6, background: '#1c1c1e', borderRadius: 20, padding: 4 }}>
          {['Day', 'Week', 'Month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{
                padding: '6px 14px', borderRadius: 16, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                background: period === p ? '#00C896' : 'transparent',
                color: period === p ? 'white' : '#8e8e93',
              }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Revenue card */}
      <div style={{ background: '#1c1c1e', borderRadius: 20, padding: 20, marginBottom: 14 }}>
        <p style={{ color: '#8e8e93', fontSize: 13, marginBottom: 4 }}>Total revenue</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>${total.toLocaleString()}</span>
          <span style={{
            fontSize: 12, fontWeight: 700, color: '#00C896',
            background: 'rgba(0,200,150,0.15)', padding: '4px 10px', borderRadius: 20
          }}>+14% vs last week</span>
        </div>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: '100%',
                height: `${(d.revenue / maxRevenue) * 64}px`,
                borderRadius: 6,
                background: d.day === 'Sun' ? '#00C896' : '#2c2c2e',
                transition: 'height 0.3s',
              }} />
              <span style={{ fontSize: 10, color: '#555' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ background: '#1c1c1e', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>312</div>
          <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>Total orders</div>
        </div>
        <div style={{ background: '#1c1c1e', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>$27.00</div>
          <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>Avg. order value</div>
        </div>
      </div>

      {/* Top products */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Top products</h2>
        <span style={{ fontSize: 13, color: '#00C896', fontWeight: 600, cursor: 'pointer' }}>See all</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {topProducts.map((p, i) => (
          <div key={i} style={{ background: '#1c1c1e', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: '#2c2c2e',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
              }}>{p.emoji}</div>
              <span style={{ flex: 1, fontWeight: 600, color: '#fff', fontSize: 15 }}>{p.name}</span>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>${p.revenue}</span>
            </div>
            <div style={{ height: 4, background: '#2c2c2e', borderRadius: 2 }}>
              <div style={{
                height: '100%', borderRadius: 2, width: `${(p.revenue / p.max) * 100}%`,
                background: i === 0 ? '#00C896' : i === 1 ? '#007AFF' : '#FF9500',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
