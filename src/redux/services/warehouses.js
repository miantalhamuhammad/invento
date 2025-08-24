import { api } from '../api.js';

export const warehousesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: () => '/warehouses',
      providesTags: ['Warehouse'],
    }),
    getWarehouse: builder.query({
      query: (id) => `/warehouses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Warehouse', id }],
    }),
    createWarehouse: builder.mutation({
      query: (warehouseData) => ({
        url: '/warehouses',
        method: 'POST',
        body: warehouseData,
      }),
      invalidatesTags: ['Warehouse'],
    }),
    updateWarehouse: builder.mutation({
      query: ({ id, ...warehouseData }) => ({
        url: `/warehouses/${id}`,
        method: 'PUT',
        body: warehouseData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Warehouse', id }],
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Warehouse'],
    }),
    getWarehouseStock: builder.query({
      query: (id) => `/warehouses/${id}/stock`,
      providesTags: (result, error, id) => [{ type: 'Warehouse', id }, 'Stock'],
    }),
    getWarehouseCapacity: builder.query({
      query: (id) => `/warehouses/${id}/capacity`,
      providesTags: (result, error, id) => [{ type: 'Warehouse', id }],
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useGetWarehouseQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetWarehouseStockQuery,
  useGetWarehouseCapacityQuery,
} = warehousesApi;
