import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../ui/select';
import { productService } from '../../services/index.js';

export const SelectProduct = ({
                                value,
                                onChange,
                                error,
                                disabled = false,
                                placeholder = "Select a product",
                                ...props
                              }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({ limit: 1000 });

      console.log("API raw response:", response);

      let rawData = [];

      // Handles /api/products?limit=1000 structure
      if (Array.isArray(response.data?.data?.data)) {
        rawData = response.data.data.data;
      } else if (Array.isArray(response.data?.data)) {
        rawData = response.data.data;
      } else if (Array.isArray(response.data)) {
        rawData = response.data;
      }

      console.log("Parsed products:", rawData);

      const options = rawData.map(product => ({
        value: product.id,
        label: `${product.product_name} - ${product.sku_code || 'No SKU'}`,
        product
      }));

      setProducts(options);
    } catch (err) {
      console.error('Error loading products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Select
          value={products.find(opt => opt.value === value) || null}
          onChange={selectedOption => onChange(selectedOption ? selectedOption.value : '')}
          options={products}
          placeholder={loading ? "Loading products..." : placeholder}
          disabled={disabled || loading}
          error={error}
          {...props}
      />

  );
};

SelectProduct.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};
