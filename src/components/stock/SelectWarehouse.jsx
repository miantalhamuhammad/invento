import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../ui/select';
import { warehouseService } from '../../services/index.js';

export const SelectWarehouse = ({
                                  value,
                                  onChange,
                                  error,
                                  disabled = false,
                                  placeholder = "Select a warehouse",
                                  ...props
                                }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      const response = await warehouseService.getWarehouses({ limit: 1000 });

      console.log("API raw warehouse response:", response);

      let rawData = [];

      // Handle nested structure like /api/warehouses?limit=1000
      if (Array.isArray(response.data?.data?.data)) {
        rawData = response.data.data.data;
      } else if (Array.isArray(response.data?.data)) {
        rawData = response.data.data;
      } else if (Array.isArray(response.data)) {
        rawData = response.data;
      }

      console.log("Parsed warehouses:", rawData);

      const options = rawData.map(warehouse => ({
        value: warehouse.id,
        label: `${warehouse.warehouse_name} - ${warehouse.warehouse_id || 'No Code'}`,
        warehouse
      }));

      setWarehouses(options);
    } catch (error) {
      console.error('Error loading warehouses:', error);
      setWarehouses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Select
          value={warehouses.find(opt => opt.value === value) || null} // Pass full option
          onChange={selectedOption => onChange(selectedOption?.value || '')} // Handle object
          options={warehouses}
          placeholder={loading ? "Loading warehouses..." : placeholder}
          disabled={disabled || loading} // ✅ Fixed here
          error={error}
          {...props}
      />
  );
};

SelectWarehouse.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};
