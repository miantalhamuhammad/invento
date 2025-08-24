import { apiService } from './api.js';

class ProductService {
  async getProducts(params = {}) {
    try {
      const response = await apiService.get('/products', params);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message,
        data: { products: [] }
      };
    }
  }

  async getProduct(id) {
    try {
      const response = await apiService.get(`/products/${id}`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createProduct(productData) {
    try {
      const response = await apiService.post('/products', productData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateProduct(id, productData) {
    try {
      const response = await apiService.put(`/products/${id}`, productData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteProduct(id) {
    try {
      const response = await apiService.delete(`/products/${id}`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const productService = new ProductService();
