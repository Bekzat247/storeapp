import React, { useState } from 'react';
import { getProducts, saveProducts } from '../data/storage';
import ProductModal from '../components/ProductModal';

const filters = ['All items', 'Low stock', 'Out of stock', 'Dairy'];

export default function Inventory({ dark }) {
  const [products, setProducts] = useState(getProducts());
  const [filter, setFilter] = useState('All items');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | product

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'Low stock') return matchSearch && p.units > 0 && p.units <= 5;
    if (filter === 'Out of stock') return matchSearch && p.units === 0;
    if (filter === 'Dairy') return matchSearch && p.category === 'Dairy';
    return matchSearch;
  });

  const handleSave = (product) => {
    const existing = products.find(p => p.id === product.id);
    let updated;
    if (existing) {
      updated = products.map(p => p.id === product.id ? product : p);
    } else {
      updated = [...products, product];
    }
    saveProducts(updated);
    setProducts(updated);
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    setModal(null);
  };

  const getStatus = (units) => {
    if (units === 0) return { label: 'Out of stock', cls: 'badge-red' };
    if (units <= 5) return { label: 'Low stock', cls: 'badge-orange' };
    return { label: 'In stock', cls: 'badge-green' };
  };

  return (
    <div style={{ padding: '20px 20px 0' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? '#fff' : '#1a1a1a', marginBottom: 16 }}>Inventory</h1>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: dark ? '#2c2c2e' : '#f0f0f5',
        borderRadius: 12, padding: '10px 14px', marginBottom: 14
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <input
          style={{ border: 'none', background: 'transparent', fontSize: 15, flex: 1, outline: 'none', color: dark ? '#fff' : '#1a1a1a' }}
          placeholder="Search products..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
              background: filter === f ? '#00C896' : (dark ? '#2c2c2e' : '#f0f0f5'),
              color: filter === f ? 'white' : (dark ? '#ccc' : '#555'),
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {filtered.map(p => {
          const status = getStatus(p.units);
          return (
            <div key={p.id} className={`card${dark ? ' dark' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer' }}
              onClick={() => setModal(p)}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, fontSize: 24,
                background: dark ? '#2c2c2e' : '#f5f5f7',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: dark ? '#fff' : '#1a1a1a', fontSize: 15 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>
                  {p.category} · {p.units} units · ${p.price.toFixed(2)}
                </div>
              </div>
              <span className={`badge ${status.cls}`}>{status.label}</span>
            </div>
          );
        })}
      </div>

      {/* Add button */}
      <div style={{ padding: '0 0 10px' }}>
        <button className="btn-primary" onClick={() => setModal('add')}>+ Add new product</button>
      </div>

      {/* Modal */}
      {modal && modal !== 'add' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className={`modal-sheet${dark ? ' dark' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40 }}>{modal.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, color: dark ? '#fff' : '#1a1a1a' }}>{modal.name}</div>
                <div style={{ color: '#8e8e93', fontSize: 13 }}>{modal.category}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[['Units', modal.units], ['Price', `$${modal.price}`], ['Cost', `$${modal.cost}`]].map(([l, v]) => (
                <div key={l} style={{ background: dark ? '#2c2c2e' : '#f5f5f7', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: dark ? '#fff' : '#1a1a1a' }}>{v}</div>
                  <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <button className={`btn-secondary${dark ? ' dark' : ''}`} onClick={() => setModal(null)}>Close</button>
              <button className={`btn-secondary${dark ? ' dark' : ''}`} style={{ color: '#FF3B30' }}
                onClick={() => handleDelete(modal.id)}>Delete</button>
              <button className="btn-primary" onClick={() => {
                setModal(null);
                setTimeout(() => setModal(modal), 50);
              }}>Edit</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'add' && (
        <ProductModal dark={dark} onSave={handleSave} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
