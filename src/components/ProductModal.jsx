import React, { useState } from 'react';

const categories = ['Dairy', 'Bakery', 'Drinks', 'Hygiene', 'Snacks', 'Other'];
const emojis = ['🥛', '🍞', '🧃', '🧴', '🍫', '🥚', '🍎', '🥩', '🧀', '🥦', '📦'];

export default function ProductModal({ product, onSave, onClose, dark }) {
  const [form, setForm] = useState(product || {
    name: '', category: 'Other', units: '', price: '', cost: '', barcode: '', emoji: '📦'
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    onSave({
      ...form,
      id: form.id || Date.now().toString(),
      units: parseInt(form.units) || 0,
      price: parseFloat(form.price) || 0,
      cost: parseFloat(form.cost) || 0,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-sheet${dark ? ' dark' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: dark ? '#fff' : '#1a1a1a' }}>
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        {/* Emoji picker */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {emojis.map(e => (
            <button key={e} onClick={() => update('emoji', e)}
              style={{
                fontSize: 22, padding: 6, borderRadius: 10, border: '2px solid',
                borderColor: form.emoji === e ? '#00C896' : 'transparent',
                background: form.emoji === e ? 'rgba(0,200,150,0.1)' : 'transparent',
                cursor: 'pointer'
              }}>
              {e}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label>Product name</label>
            <input className={`input-field${dark ? ' dark' : ''}`} value={form.name}
              onChange={e => update('name', e.target.value)} placeholder="e.g. Whole Milk 1L" />
          </div>

          <div>
            <label>Category</label>
            <select className={`input-field${dark ? ' dark' : ''}`} value={form.category}
              onChange={e => update('category', e.target.value)}
              style={{ appearance: 'none' }}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label>Price ($)</label>
              <input className={`input-field${dark ? ' dark' : ''}`} type="number" value={form.price}
                onChange={e => update('price', e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <label>Cost ($)</label>
              <input className={`input-field${dark ? ' dark' : ''}`} type="number" value={form.cost}
                onChange={e => update('cost', e.target.value)} placeholder="0.00" />
            </div>
          </div>

          <div>
            <label>Units in stock</label>
            <input className={`input-field${dark ? ' dark' : ''}`} type="number" value={form.units}
              onChange={e => update('units', e.target.value)} placeholder="0" />
          </div>

          <div>
            <label>Barcode (optional)</label>
            <input className={`input-field${dark ? ' dark' : ''}`} value={form.barcode}
              onChange={e => update('barcode', e.target.value)} placeholder="e.g. 4006381333932" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
          <button className={`btn-secondary${dark ? ' dark' : ''}`} onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
