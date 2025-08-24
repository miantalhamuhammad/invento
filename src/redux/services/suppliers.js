import { api } from '../api.js';

export const suppliersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: (params = {}) => ({
        url: '/suppliers',
        params,
      }),
      providesTags: ['Supplier'],
    }),
    getSupplier: builder.query({
      query: (id) => `/suppliers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Supplier', id }],
    }),
    createSupplier: builder.mutation({
      query: (supplierData) => ({
        url: '/suppliers',
        method: 'POST',
        body: supplierData,
      }),
      invalidatesTags: ['Supplier'],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...supplierData }) => ({
        url: `/suppliers/${id}`,
        method: 'PUT',
        body: supplierData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Supplier', id }],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Supplier'],
    }),
    searchSuppliers: builder.query({
      query: (searchQuery) => ({
        url: '/suppliers/search',
        params: { q: searchQuery },
      }),
      providesTags: ['Supplier'],
    }),
    exportSuppliers: builder.query({
      query: (format = 'csv') => ({
        url: '/suppliers/export',
        params: { format },
      }),
    }),
    getSupplierProducts: builder.query({
      query: (id) => `/suppliers/${id}/products`,
      providesTags: (result, error, id) => [{ type: 'Supplier', id }],
    }),
    getSupplierOrders: builder.query({
      query: (id) => `/suppliers/${id}/orders`,
      providesTags: (result, error, id) => [{ type: 'Supplier', id }],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useSearchSuppliersQuery,
  useExportSuppliersQuery,
  useGetSupplierProductsQuery,
  useGetSupplierOrdersQuery,
} = suppliersApi;
