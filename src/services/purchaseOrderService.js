import { apiService } from './api.js';

// Purchase Order API Service
export const purchaseOrderService = {
  // Get all purchase orders with optional filtering
  getPurchaseOrders: async (params = {}) => {
    try {
      const response = await apiService.get('/purchase-orders', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
      throw error;
    }
  },

  // Get single purchase order by ID
  getPurchaseOrder: async (id) => {
    try {
      const response = await apiService.get(`/purchase-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase order:', error);
      throw error;
    }
  },

  // Create new purchase order
  createPurchaseOrder: async (orderData) => {
    try {
      const response = await apiService.post('/purchase-orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating purchase order:', error);
      throw error;
    }
  },

  // Update purchase order
  updatePurchaseOrder: async (id, updateData) => {
    try {
      const response = await apiService.put(`/purchase-orders/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating purchase order:', error);
      throw error;
    }
  },

  // Delete purchase order
  deletePurchaseOrder: async (id) => {
    try {
      const response = await apiService.delete(`/purchase-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting purchase order:', error);
      throw error;
    }
  },

  // Update purchase order status
  updatePurchaseOrderStatus: async (id, status) => {
    try {
      const response = await apiService.patch(`/purchase-orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating purchase order status:', error);
      throw error;
    }
  },

  // Get purchase order items
  getPurchaseOrderItems: async (orderId) => {
    try {
      const response = await apiService.get(`/purchase-orders/${orderId}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase order items:', error);
      throw error;
    }
  },

  // Add item to purchase order
  addPurchaseOrderItem: async (orderId, itemData) => {
    try {
      const response = await apiService.post(`/purchase-orders/${orderId}/items`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error adding purchase order item:', error);
      throw error;
    }
  },

  // Update purchase order item
  updatePurchaseOrderItem: async (orderId, itemId, updateData) => {
    try {
      const response = await apiService.put(`/purchase-orders/${orderId}/items/${itemId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating purchase order item:', error);
      throw error;
    }
  },

  // Remove item from purchase order
  removePurchaseOrderItem: async (orderId, itemId) => {
    try {
      const response = await apiService.delete(`/purchase-orders/${orderId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing purchase order item:', error);
      throw error;
    }
  },

  // Generate purchase order PDF
  generatePurchaseOrderPDF: async (id) => {
    try {
      const response = await apiService.get(`/purchase-orders/${id}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating purchase order PDF:', error);
      throw error;
    }
  },

  // Export purchase orders
  exportPurchaseOrders: async (format = 'csv', params = {}) => {
    try {
      const response = await apiService.get('/purchase-orders/export', {
        params: { format, ...params },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting purchase orders:', error);
      throw error;
    }
  }
};
