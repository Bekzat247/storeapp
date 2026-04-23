import React, { useState } from 'react';
import { getProducts, saveProducts, addOrder } from '../data/storage';

export default function Scanner({ dark, setPage }) {
  const [scanned, setScanned] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const simulateScan = () => {
    setScanning(true);
    const products = getProducts();
    setTimeout(() => {
      const random = products[Math.floor(Math.random() * products.length)];
      setScanned(random);
      setScanning(false);
    }, 1200);
  };

  const searchBarcode = () => {
    const products = getProducts();
    const found = products.find(p => p.barcode === manualInput || p.name.toLowerCase().includes(manualInput.toLowerCase()));
    if (found) {
      setScanned(found);
    } else {
      showToast('Product not found');
    }
  };

  const addToOrder = () => {
    if (!scanned) return;
    addOrder({
      id: Date.now().toString(),
      product: `${scanned.name} x1`,
      time: 'Just now',
      amount: scanned.price,
      emoji: scanned.emoji,
    });
    showToast('Added to order ✓');
  };

  const updateStock = (delta) => {
    if (!scanned) return;
    const products = getProducts();
    const updated = products.map(p =>
      p.id === scanned.id ? { ...p, units: Math.max(0, p.units + delta) } : p
    );
    saveProducts(updated);
    setScanned({ ...scanned, units: Math.max(0, scanned.units + delta) });
    showToast(`Stock updated: ${Math.max(0, scanned.units + delta)} units`);
  };

  return (
    <div style={{ padding: '20px 20px 0' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Scanner</h1>

      {/* Camera frame */}
      <div style={{
        background: '#1c1c1e', borderRadius: 20, padding: 20, marginBottom: 16,
        position: 'relative', overflow: 'hidden', minHeight: 200
      }}>
        <p style={{ textAlign: 'center', color: '#8e8e93', fontSize: 13, marginBottom: 16 }}>
          Point camera at barcode or QR
        </p>

        {/* Corner marks */}
        {[['0,0', 'top:0;left:0', 'borderTop', 'borderLeft'],
          ['100,0', 'top:0;right:0', 'borderTop', 'borderRight'],
          ['0,100', 'bottom:0;left:0', 'borderBottom', 'borderLeft'],
          ['100,100', 'bottom:0;right:0', 'borderBottom', 'borderRight']
        ].map(([_, pos], i) => (
          <div key={i} style={{
            position: 'absolute', width: 28, height: 28,
            borderColor: '#00C896', borderStyle: 'solid', borderWidth: 0,
            ...(i === 0 ? { top: 40, left: 20, borderTopWidth: 3, borderLeftWidth: 3, borderRadius: '8px 0 0 0' } :
               i === 1 ? { top: 40, right: 20, borderTopWidth: 3, borderRightWidth: 3, borderRadius: '0 8px 0 0' } :
               i === 2 ? { bottom: 20, left: 20, borderBottomWidth: 3, borderLeftWidth: 3, borderRadius: '0 0 0 8px' } :
                         { bottom: 20, right: 20, borderBottomWidth: 3, borderRightWidth: 3, borderRadius: '0 0 8px 0' })
          }} />
        ))}

        {/* Scanning line */}
        {scanning ? (
          <div style={{
            position: 'absolute', left: 20, right: 20,
            height: 2, background: '#00C896', top: '50%',
            animation: 'scanLine 1s ease-in-out infinite',
            boxShadow: '0 0 8px #00C896'
          }} />
        ) : (
          <div style={{ height: 2, background: 'rgba(0,200,150,0.4)', margin: '40px 0 20px' }} />
        )}

        <p style={{ textAlign: 'center', color: '#555', fontSize: 11, marginTop: 16 }}>
          Supports EAN-13 · QR · Code128
        </p>

        <style>{`
          @keyframes scanLine {
            0% { top: 45px; }
            50% { top: calc(100% - 30px); }
            100% { top: 45px; }
          }
        `}</style>
      </div>

      {/* Simulate scan button */}
      <button className="btn-primary" onClick={simulateScan} style={{ marginBottom: 12 }}>
        {scanning ? '🔍 Scanning...' : '📷 Simulate Scan'}
      </button>

      {/* Manual input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          className="input-field dark"
          style={{ flex: 1, background: '#1c1c1e', color: '#fff', borderColor: '#3a3a3c' }}
          placeholder="Enter barcode or name..."
          value={manualInput}
          onChange={e => setManualInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchBarcode()}
        />
        <button onClick={searchBarcode}
          style={{
            background: '#2c2c2e', border: 'none', borderRadius: 12,
            padding: '0 16px', color: '#00C896', fontSize: 18, cursor: 'pointer'
          }}>🔍</button>
      </div>

      {/* Scanned result */}
      {scanned && (
        <div style={{ background: '#1c1c1e', borderRadius: 20, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, background: '#2c2c2e', borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
            }}>{scanned.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>{scanned.name}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Barcode: {scanned.barcode || 'N/A'}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#00C896' }}>${scanned.price.toFixed(2)}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[['In stock', scanned.units], ['Category', scanned.category], ['Cost price', `$${scanned.cost.toFixed(2)}`]].map(([l, v]) => (
              <div key={l} style={{ background: '#2c2c2e', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>{v}</div>
                <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Stock controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => updateStock(-1)}
              style={{ flex: 1, background: '#2c2c2e', border: 'none', borderRadius: 12, padding: 12, color: '#fff', fontSize: 20, cursor: 'pointer' }}>−</button>
            <button onClick={() => updateStock(1)}
              style={{ flex: 1, background: '#2c2c2e', border: 'none', borderRadius: 12, padding: 12, color: '#fff', fontSize: 20, cursor: 'pointer' }}>+</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button className="btn-secondary dark" onClick={addToOrder}>Add to order</button>
            <button className="btn-primary" onClick={() => updateStock(0)}>Update stock</button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
          background: '#1c1c1e', color: '#00C896', padding: '10px 20px',
          borderRadius: 20, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
          border: '1px solid #2c2c2e', zIndex: 200
        }}>{toast}</div>
      )}
    </div>
  );
}
