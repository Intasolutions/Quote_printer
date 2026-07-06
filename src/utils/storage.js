const STORAGE_KEY = 'in_ta_quotes_data';

export const getSavedQuotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse quotes from local storage", error);
    return [];
  }
};

export const saveQuote = (quoteData) => {
  const quotes = getSavedQuotes();
  const existingIndex = quotes.findIndex(q => q.id === quoteData.id);
  
  if (existingIndex >= 0) {
    // Update existing
    quotes[existingIndex] = { ...quoteData, updatedAt: new Date().toISOString() };
  } else {
    // Add new
    quotes.push({ ...quoteData, updatedAt: new Date().toISOString() });
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    return true;
  } catch (error) {
    console.error("Failed to save quote", error);
    return false;
  }
};

export const deleteQuote = (id) => {
  const quotes = getSavedQuotes();
  const newQuotes = quotes.filter(q => q.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuotes));
    return true;
  } catch (error) {
    console.error("Failed to delete quote", error);
    return false;
  }
};
