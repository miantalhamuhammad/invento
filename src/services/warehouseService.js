import { apiService } from './api.js';

class WarehouseService {
  async getWarehouses(params = {}) {
    try {
      const response = await apiService.get('/warehouses', params);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      return {
        success: false,
        error: error.message,
        data: { warehouses: [] }
      };
    }
  }

  async getWarehouse(id) {
    try {
      const response = await apiService.get(`/warehouses/${id}`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const warehouseService = new WarehouseService();

