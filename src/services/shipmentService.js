import { apiService } from './api.js';

export const shipmentService = {
  async getShipments(params = {}) {
    // Use the correct endpoint and pass params directly
    return apiService.get('/shipments', params);
  },

  async createShipment(data) {
    return apiService.post('/shipments', data);
  },

  // Add other shipment-related methods as needed
};
