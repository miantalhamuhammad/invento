import { api } from '../api.js';

export const stockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStock: builder.query({
      query: (params = {}) => ({
        url: '/stock',
        params,
      }),
      providesTags: ['Stock'],
    }),
    getLowStock: builder.query({
      query: () => '/stock/low-stock',
      providesTags: ['Stock'],
    }),
    getStockMovements: builder.query({
      query: (params = {}) => ({
        url: '/stock/movements',
        params,
      }),
      providesTags: ['Stock'],
    }),
    createStockAdjustment: builder.mutation({
      query: (adjustmentData) => ({
        url: '/stock/adjustment',
        method: 'POST',
        body: adjustmentData,
      }),
      invalidatesTags: ['Stock'],
    }),
    transferStock: builder.mutation({
      query: (transferData) => ({
        url: '/stock/transfer',
        method: 'POST',
        body: transferData,
      }),
      invalidatesTags: ['Stock'],
    }),
    exportStock: builder.query({
      query: (format = 'csv') => ({
        url: '/stock/export',
        params: { format },
      }),
    }),
  }),
});

export const {
  useGetStockQuery,
  useGetLowStockQuery,
  useGetStockMovementsQuery,
  useCreateStockAdjustmentMutation,
  useTransferStockMutation,
  useExportStockQuery,
} = stockApi;
