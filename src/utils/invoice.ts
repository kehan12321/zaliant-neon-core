// Invoice generation utility
export interface Invoice {
  id: string;
  orderId: string;
  userId: string;
  email: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface InvoiceItem {
  productId: string;
  title: string;
  plan: string;
  quantity: number;
  price: number;
  total: number;
}

export function generateInvoice(
  orderId: string,
  userId: string,
  email: string,
  items: any[],
  total: number,
  paymentMethod: string
): Invoice {
  const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const invoiceItems: InvoiceItem[] = items.map(item => ({
    productId: item.id,
    title: item.title,
    plan: item.selectedPlan,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }));

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const tax = 0; // Calculate tax based on region if needed

  return {
    id: invoiceId,
    orderId,
    userId,
    email,
    date: new Date().toISOString(),
    items: invoiceItems,
    subtotal,
    tax,
    total: subtotal + tax,
    paymentMethod,
    status: 'paid',
  };
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = JSON.parse(localStorage.getItem('zaliant_invoices') || '[]');
  invoices.push(invoice);
  localStorage.setItem('zaliant_invoices', JSON.stringify(invoices));
}

export function getInvoicesByUserId(userId: string): Invoice[] {
  const invoices = JSON.parse(localStorage.getItem('zaliant_invoices') || '[]');
  return invoices.filter((inv: Invoice) => inv.userId === userId);
}

export function downloadInvoice(invoice: Invoice): void {
  const content = formatInvoiceText(invoice);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${invoice.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatInvoiceText(invoice: Invoice): string {
  return `
╔══════════════════════════════════════════════════════════════╗
║                    ZALIANT SERVICES                          ║
║                   INVOICE ${invoice.id}                      ║
╚══════════════════════════════════════════════════════════════╝

Date: ${new Date(invoice.date).toLocaleDateString()}
Order ID: ${invoice.orderId}
Customer Email: ${invoice.email}

──────────────────────────────────────────────────────────────

ITEMS:
${invoice.items.map(item => `
  ${item.title} (${item.plan})
  Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${item.total.toFixed(2)}
`).join('\n')}

──────────────────────────────────────────────────────────────

Subtotal:        $${invoice.subtotal.toFixed(2)}
Tax:             $${invoice.tax.toFixed(2)}
TOTAL:           $${invoice.total.toFixed(2)}

Payment Method:  ${invoice.paymentMethod.toUpperCase()}
Status:          ${invoice.status.toUpperCase()}

──────────────────────────────────────────────────────────────

Thank you for choosing Zaliant Services!
For support, contact: support@zaliant.com

╚══════════════════════════════════════════════════════════════╝
  `.trim();
}
