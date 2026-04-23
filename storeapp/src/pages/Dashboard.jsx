import React from 'react';
import { getStats, getOrders } from '../data/storage';

export default function Dashboard({ dark }) {
  const stats = getStats();
  const orders = getOrders();

  const statCards = [
    { value: `$${stats.todaySales.toLocaleString()}`, label: "Today's sales", color: '#00C896' },
    { value: stats.orders, label: 'Orders', color: '#007AFF' },
    { value: stats.lowStock, label: 'Low stock', color: '#FF3B30' },
    { value: stats.totalProducts, label: 'Products', color: '#FF9500' },
  ];

  return (
    <div style={{ padding: '20px 20px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: dark ? '#8e8e93' : '#8e8e93', marginBottom: 2 }}>Good morning,</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? '#fff' : '#1a1a1a' }}>Bekzat</h1>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 15
          }}>BT</div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
        {statCards.map((s, i) => (
          <div key={i} className={`card${dark ? ' dark' : ''}`} style={{ padding: '16px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, marginBottom: 8 }} />
            <div style={{ fontSize: 28, fontWeight: 800, color: dark ? '#fff' : '#1a1a1a', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#8e8e93', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: dark ? '#fff' : '#1a1a1a' }}>Recent orders</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {orders.map((order, i) => (
          <div key={i} className={`card${dark ? ' dark' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: dark ? '#2c2c2e' : '#f5f5f7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
            }}>{order.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: dark ? '#fff' : '#1a1a1a', fontSize: 15 }}>{order.product}</div>
              <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>{order.time}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: dark ? '#fff' : '#1a1a1a' }}>
              ${order.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
