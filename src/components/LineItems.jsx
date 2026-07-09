import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function LineItems({ items, onChange }) {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    onChange(newItems);
  };

  const addItem = () => {
    onChange([
      ...items,
      { id: Date.now().toString(), title: '', description: '', quantity: 1, unitPrice: 0 }
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="line-items-section">
      <table className="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="td-number">Quantity</th>
            <th className="td-number">Unit Price</th>
            <th className="td-number">Total</th>
            <th className="td-action"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const qty = item.quantity !== undefined ? item.quantity : 1;
            const price = item.unitPrice !== undefined ? item.unitPrice : 0;
            const total = qty * price;

            return (
              <tr key={item.id}>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', fontWeight: 'bold', marginBottom: '8px' }}>
                    <span style={{ marginRight: '4px', whiteSpace: 'nowrap', paddingTop: '2px' }}>{index + 1}.</span>
                    <textarea
                      className="minimal-input"
                      placeholder="Component Title (e.g. Website Development)"
                      value={item.title !== undefined ? item.title : item.description}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                      rows={1}
                      style={{ fontWeight: 'bold', fontSize: '1rem', width: '100%', margin: 0, padding: 0, resize: 'none', overflow: 'hidden', lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                    />
                  </div>
                  <textarea
                    className="minimal-input"
                    placeholder="Component description and specifications..."
                    value={item.title !== undefined ? item.description : ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                    rows={2}
                    style={{ width: '100%', minHeight: '60px', height: 'auto', resize: 'none', overflow: 'hidden', marginLeft: '16px', padding: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  />
                </td>
                <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  <input
                    type="number"
                    className="input-field"
                    min="1"
                    value={qty}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </td>
                <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  <input
                    type="number"
                    className="input-field"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </td>
                <td style={{ verticalAlign: 'top', paddingTop: '24px', fontWeight: 500 }}>
                  ₹ {total.toFixed(2)}
                </td>
                <td className="td-action" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  <button 
                    className="btn-icon btn-danger" 
                    onClick={() => removeItem(index)}
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <button className="btn btn-outline add-item-btn" onClick={addItem}>
        <Plus size={16} /> Add Item
      </button>
    </div>
  );
}
