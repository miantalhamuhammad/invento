import { api } from '../api.js';

export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (params = {}) => ({
        url: '/customers',
        params,
      }),
      providesTags: ['Customer'],
    }),
    getCustomer: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: '/customers',
        method: 'POST',
        body: customerData,
      }),
      invalidatesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...customerData }) => ({
        url: `/customers/${id}`,
        method: 'PUT',
        body: customerData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
    searchCustomers: builder.query({
      query: (searchQuery) => ({
        url: '/customers/search',
        params: { q: searchQuery },
      }),
      providesTags: ['Customer'],
    }),
    exportCustomers: builder.query({
      query: (format = 'csv') => ({
        url: '/customers/export',
        params: { format },
      }),
    }),
    getCustomerOrders: builder.query({
      query: (id) => `/customers/${id}/orders`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
    getCustomerInvoices: builder.query({
      query: (id) => `/customers/${id}/invoices`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useSearchCustomersQuery,
  useExportCustomersQuery,
  useGetCustomerOrdersQuery,
  useGetCustomerInvoicesQuery,
} = customersApi;
