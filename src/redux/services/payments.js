import { api } from '../api.js';

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Invoices
    getInvoices: builder.query({
      query: (params = {}) => ({
        url: '/invoices',
        params,
      }),
      providesTags: ['Invoice'],
    }),
    getInvoice: builder.query({
      query: (id) => `/invoices/${id}`,
      providesTags: (result, error, id) => [{ type: 'Invoice', id }],
    }),
    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: '/invoices',
        method: 'POST',
        body: invoiceData,
      }),
      invalidatesTags: ['Invoice'],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...invoiceData }) => ({
        url: `/invoices/${id}`,
        method: 'PUT',
        body: invoiceData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Invoice', id }],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
    updateInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/invoices/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Invoice', id }],
    }),
    generateInvoicePdf: builder.query({
      query: (id) => `/invoices/${id}/pdf`,
      providesTags: (result, error, id) => [{ type: 'Invoice', id }],
    }),
    sendInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoices/${id}/send`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Invoice', id }],
    }),

    // Payments
    getPayments: builder.query({
      query: (params = {}) => ({
        url: '/payments',
        params,
      }),
      providesTags: ['Payment'],
    }),
    getPayment: builder.query({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Payment', id }],
    }),
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Payment', 'Invoice'],
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...paymentData }) => ({
        url: `/payments/${id}`,
        method: 'PUT',
        body: paymentData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Payment', id }],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment', 'Invoice'],
    }),
    exportPayments: builder.query({
      query: (format = 'csv') => ({
        url: '/payments/export',
        params: { format },
      }),
    }),
  }),
});

export const {
  // Invoices
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useGenerateInvoicePdfQuery,
  useSendInvoiceMutation,

  // Payments
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useExportPaymentsQuery,
} = paymentsApi;
