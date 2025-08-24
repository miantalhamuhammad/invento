import { api } from '../api.js';

// Inject supplier endpoints into the main API
export const supplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // PO Requests endpoints
    getSupplierPORequests: builder.query({
      query: () => '/supplier/po-requests',
      providesTags: ['PORequest'],
    }),

    getSupplierPORequestDetail: builder.query({
      query: (id) => `/supplier/po-requests/${id}`,
      providesTags: (result, error, id) => [{ type: 'PORequest', id }],
    }),

    // Quotations endpoints
    submitQuotation: builder.mutation({
      query: (quotationData) => ({
        url: '/supplier/quotations',
        method: 'POST',
        body: quotationData,
      }),
      invalidatesTags: ['Quotation', 'PORequest'],
    }),

    getSupplierQuotations: builder.query({
      query: ({ status, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (status) {
          params.append('status', status);
        }

        return `/supplier/quotations?${params.toString()}`;
      },
      providesTags: ['Quotation'],
    }),

    getSupplierQuotationDetail: builder.query({
      query: (id) => `/supplier/quotations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Quotation', id }],
    }),

    updateQuotationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/supplier/quotations/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Quotation', id }, 'Quotation'],
    }),

    // Profile endpoints
    getSupplierProfile: builder.query({
      query: () => '/supplier/profile',
      providesTags: ['Profile'],
    }),

    updateSupplierProfile: builder.mutation({
      query: (profileData) => ({
        url: '/supplier/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetSupplierPORequestsQuery,
  useGetSupplierPORequestDetailQuery,
  useSubmitQuotationMutation,
  useGetSupplierQuotationsQuery,
  useGetSupplierQuotationDetailQuery,
  useUpdateQuotationStatusMutation,
  useGetSupplierProfileQuery,
  useUpdateSupplierProfileMutation,
} = supplierApi;
