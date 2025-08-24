import { apiService } from './api.js';

// Sale Order API Service
export const saleOrderService = {
  // Get all sale orders with optional filtering
  getSaleOrders: async (params = {}) => {
    try {
      const response = await apiService.get('/sale-orders', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching sale orders:', error);
      throw error;
    }
  },

  // Get single sale order by ID
  getSaleOrder: async (id) => {
    try {
      const response = await apiService.get(`/sale-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sale order:', error);
      throw error;
    }
  },

  // Create new sale order
  createSaleOrder: async (orderData) => {
    try {
      const response = await apiService.post('/sale-orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating sale order:', error);
      throw error;
    }
  },

  // Update sale order
  updateSaleOrder: async (id, updateData) => {
    try {
      const response = await apiService.put(`/sale-orders/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating sale order:', error);
      throw error;
    }
  },

  // Delete sale order
  deleteSaleOrder: async (id) => {
    try {
      const response = await apiService.delete(`/sale-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting sale order:', error);
      throw error;
    }
  },

  // Update sale order status
  updateSaleOrderStatus: async (id, status) => {
    try {
      const response = await apiService.patch(`/sale-orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating sale order status:', error);
      throw error;
    }
  },

  // Get sale order items
  getSaleOrderItems: async (orderId) => {
    try {
      const response = await apiService.get(`/sale-orders/${orderId}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sale order items:', error);
      throw error;
    }
  },

  // Add item to sale order
  addSaleOrderItem: async (orderId, itemData) => {
    try {
      const response = await apiService.post(`/sale-orders/${orderId}/items`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error adding sale order item:', error);
      throw error;
    }
  },

  // Update sale order item
  updateSaleOrderItem: async (orderId, itemId, updateData) => {
    try {
      const response = await apiService.put(`/sale-orders/${orderId}/items/${itemId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating sale order item:', error);
      throw error;
    }
  },

  // Remove item from sale order
  removeSaleOrderItem: async (orderId, itemId) => {
    try {
      const response = await apiService.delete(`/sale-orders/${orderId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing sale order item:', error);
      throw error;
    }
  },

  // Get sale orders by customer
  getSaleOrdersByCustomer: async (customerId, params = {}) => {
    try {
      const response = await apiService.get(`/customers/${customerId}/orders`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer sale orders:', error);
      throw error;
    }
  },

  // Generate sale order invoice
  generateSaleOrderInvoice: async (id) => {
    try {
      const response = await apiService.post(`/sale-orders/${id}/invoice`);
      return response.data;
    } catch (error) {
      console.error('Error generating sale order invoice:', error);
      throw error;
    }
  },

  // Generate sale order PDF
  generateSaleOrderPDF: async (id) => {
    try {
      const response = await apiService.get(`/sale-orders/${id}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating sale order PDF:', error);
      throw error;
    }
  },

  // Export sale orders
  exportSaleOrders: async (format = 'csv', params = {}) => {
    try {
      const response = await apiService.get('/sale-orders/export', {
        params: { format, ...params },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting sale orders:', error);
      throw error;
    }
  }
};
