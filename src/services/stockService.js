import { apiService } from './api.js';

export const stockService = {
  // Get all stock with pagination and filtering
  getStock: async (params = {}) => {
    try {
      const response = await apiService.get('/stock', params);
      //return response.data;
      return {
        succeeded: response.succeeded,
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching stock:', error);
      throw error;
    }
  },

  // Get single stock entry
  getStockById: async (id) => {
    try {
      const response = await apiService.get(`/stock/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock:', error);
      throw error;
    }
  },

  // Create new stock entry
  createStock: async (stockData) => {
    try {
      const response = await apiService.post('/stock', stockData);
      return response.data;
    } catch (error) {
      console.error('Error creating stock:', error);
      throw error;
    }
  },

  // Update stock entry
  updateStock: async (id, stockData) => {
    try {
      const response = await apiService.put(`/stock/${id}`, stockData);
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  },

  // Delete stock entry
  deleteStock: async (id) => {
    try {
      const response = await apiService.delete(`/stock/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting stock:', error);
      throw error;
    }
  },

  // Get stock movements
  getStockMovements: async (params = {}) => {
    try {
      const response = await apiService.get('/stock/movements', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock movements:', error);
      throw error;
    }
  },

  // Create stock movement
  createStockMovement: async (movementData) => {
    try {
      const response = await apiService.post('/stock/movements', movementData);
      return response.data;
    } catch (error) {
      console.error('Error creating stock movement:', error);
      throw error;
    }
  },

  // Get low stock items
  getLowStockItems: async (warehouseId = null) => {
    try {
      const params = warehouseId ? { warehouse_id: warehouseId } : {};
      const response = await apiService.get('/stock/low-stock', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  }
};
