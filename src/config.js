export const COMPANY_DETAILS = {
  name: "IN-TA SOLUTIONS PRIVATE LIMITED",
  cin: "U62010KL2025PTC092951",
  address: "Mananthavady, Wayanad - 670645, Kerala",
  phone: "+91 9447595381",
  email: "info@in-tasolutions.com",
  website: "www.in-tasolutions.com",
  logoUrl: "/logo.jpeg"
};

export const DEFAULT_QUOTE_DATA = {
  fileName: "New Quote",
  quoteNumber: "QT-0001",
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  items: [
    { id: "1", title: "Website Development", description: "Development of a responsive website.", quantity: 1, unitPrice: 0 }
  ],
  taxRate: 0,
  notes: "Thank you for your business."
};
