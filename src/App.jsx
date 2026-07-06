import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Printer, Save, Copy } from 'lucide-react';
import SavedQuotesSidebar from './components/SavedQuotesSidebar';
import QuoteEditor from './components/QuoteEditor';
import { getSavedQuotes, saveQuote } from './utils/storage';
import { DEFAULT_QUOTE_DATA } from './config';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [activeQuote, setActiveQuote] = useState(() => ({ ...DEFAULT_QUOTE_DATA, id: uuidv4() }));
  
  const refreshQuotes = () => {
    setQuotes(getSavedQuotes());
  };

  useEffect(() => {
    refreshQuotes();
  }, []);

  // Update browser title so the PDF pre-fills with the correct file name!
  useEffect(() => {
    const defaultName = activeQuote.clientName 
      ? `Quote - ${activeQuote.clientName}` 
      : `Quote_${activeQuote.quoteNumber}`;
      
    document.title = activeQuote.fileName || defaultName;
  }, [activeQuote.fileName, activeQuote.clientName, activeQuote.quoteNumber]);

  const handleNewQuote = () => {
    setActiveQuote({ ...DEFAULT_QUOTE_DATA, id: uuidv4() });
  };

  const handleSelectQuote = (quote) => {
    setActiveQuote(quote);
  };

  const handleSave = () => {
    const success = saveQuote(activeQuote);
    if (success) {
      refreshQuotes();
      alert("Quote saved successfully!");
    }
  };

  const handleSaveAsNew = () => {
    // Generate a new ID, and append ' (Copy)' to file name
    const newQuote = { 
      ...activeQuote, 
      id: uuidv4(), 
      fileName: activeQuote.fileName + " (Copy)",
      quoteNumber: activeQuote.quoteNumber + "-REV"
    };
    setActiveQuote(newQuote);
    saveQuote(newQuote);
    refreshQuotes();
    alert("Saved as new version!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <SavedQuotesSidebar 
        quotes={quotes}
        activeQuoteId={activeQuote.id}
        onSelectQuote={handleSelectQuote}
        onNewQuote={handleNewQuote}
        onQuotesUpdate={refreshQuotes}
      />
      
      <main className="main-content">
        <div style={{ width: '100%', maxWidth: '800px' }}>
          
          {/* Top Actions Bar (Hidden on print) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }} className="quote-top-bar">
            <button className="btn btn-outline" onClick={handleSaveAsNew}>
              <Copy size={16} /> Save as New Version
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Quote
            </button>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--text-main)' }} onClick={handlePrint}>
              <Printer size={16} /> Print / PDF
            </button>
          </div>

          <QuoteEditor 
            quoteData={activeQuote} 
            setQuoteData={setActiveQuote} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
