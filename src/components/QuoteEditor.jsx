import React from 'react';
import LineItems from './LineItems';
import { COMPANY_DETAILS } from '../config';

export default function QuoteEditor({ quoteData, setQuoteData }) {

  const handleChange = (field, value) => {
    setQuoteData({ ...quoteData, [field]: value });
  };

  // Calculations
  const subtotal = quoteData.items.reduce((acc, item) => {
    const qty = item.quantity !== undefined ? item.quantity : 1;
    const price = item.unitPrice !== undefined ? item.unitPrice : 0;
    return acc + (qty * price);
  }, 0);
  const taxAmount = subtotal * (quoteData.taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="quote-document">
      
      {/* Top Bar for File Name */}
      <div className="quote-top-bar">
        <input 
          type="text" 
          className="file-name-input" 
          value={quoteData.fileName} 
          onChange={(e) => handleChange('fileName', e.target.value)}
          placeholder="Enter File Name (e.g. Website Quote v1)"
        />
      </div>

      {/* Top Company Header */}
      <div className="invoice-header">
        <div className="company-details">
          <h1>{COMPANY_DETAILS.name}</h1>
          <p>{COMPANY_DETAILS.address}</p>
          <p>{COMPANY_DETAILS.phone} | {COMPANY_DETAILS.email}</p>
          <p>{COMPANY_DETAILS.website}</p>
        </div>
        <div className="company-logo">
          {COMPANY_DETAILS.logoUrl && (
            <img src={COMPANY_DETAILS.logoUrl} alt="Company Logo" />
          )}
        </div>
      </div>

      {/* Info Boxes Grid (Table Box Format) */}
      <div className="info-boxes">
        <div className="info-box client-box">
          <h3>Quote For</h3>
          <input 
            type="text" 
            className="input-field minimal-input" 
            placeholder="Client Name / Company" 
            value={quoteData.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            style={{ fontWeight: 600, fontSize: '1rem' }}
          />
          <textarea 
            className="input-field minimal-input" 
            placeholder="Client Address" 
            style={{ height: '80px', resize: 'none' }}
            value={quoteData.clientAddress}
            onChange={(e) => handleChange('clientAddress', e.target.value)}
          />
        </div>
        
        <div className="info-box meta-box">
          <div className="meta-row">
            <label>Quote No:</label>
            <input 
              type="text" 
              className="input-field minimal-input" 
              value={quoteData.quoteNumber} 
              onChange={(e) => handleChange('quoteNumber', e.target.value)}
              style={{ fontWeight: 'bold' }}
            />
          </div>
          <div className="meta-row">
            <label>Date:</label>
            <input 
              type="date" 
              className="input-field minimal-input" 
              value={quoteData.date} 
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="meta-row">
            <label>Valid Until:</label>
            <input 
              type="date" 
              className="input-field minimal-input" 
              value={quoteData.validUntil} 
              onChange={(e) => handleChange('validUntil', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <LineItems items={quoteData.items} onChange={(items) => handleChange('items', items)} />

      {/* Footer / Totals */}
      <div className="quote-footer">
        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row" style={{ alignItems: 'center' }}>
            <span>
              Tax Rate 
              <input 
                type="number" 
                className="input-field tax-input" 
                min="0" 
                max="100" 
                value={quoteData.taxRate} 
                onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
              /> % :
            </span>
            <span>₹ {taxAmount.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
