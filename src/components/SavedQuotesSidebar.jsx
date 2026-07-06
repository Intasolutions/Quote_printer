import React from 'react';
import { PlusCircle, FileText, Trash2 } from 'lucide-react';
import { deleteQuote } from '../utils/storage';

export default function SavedQuotesSidebar({ quotes, activeQuoteId, onSelectQuote, onNewQuote, onQuotesUpdate }) {
  
  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this quote?")) {
      deleteQuote(id);
      onQuotesUpdate();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Saved Quotes</h2>
        <button className="btn-icon" onClick={onNewQuote} title="Create New Quote">
          <PlusCircle size={24} />
        </button>
      </div>
      
      <div className="quote-list">
        {quotes.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>
            No saved quotes. Create one!
          </p>
        ) : (
          quotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(quote => (
            <div 
              key={quote.id} 
              className={`quote-item ${activeQuoteId === quote.id ? 'active' : ''}`}
              onClick={() => onSelectQuote(quote)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div className="quote-item-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <FileText size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}/>
                    {quote.fileName || "Untitled Quote"}
                  </div>
                  <div className="quote-item-meta">
                    {quote.quoteNumber} • {new Date(quote.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <button className="btn-icon btn-danger" style={{ padding: '4px' }} onClick={(e) => handleDelete(e, quote.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
