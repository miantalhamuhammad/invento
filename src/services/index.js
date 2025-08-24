// Export all services from a single entry point
export { apiService } from './api.js';
export { productService } from './productService.js';
export { warehouseService } from './warehouseService.js';
export { stockService } from './stockService.js';
export { purchaseOrderService } from './purchaseOrderService.js';
export { saleOrderService } from './saleOrderService.js';
export { shipmentService } from './shipmentService.js';

// Utility to download a file from a given URL
export async function downloadFile(url, filename = 'download') {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utility to handle API errors
export function handleApiError(error) {
  if (error && error.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred.';
}
