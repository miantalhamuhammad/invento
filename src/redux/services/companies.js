import { api } from '../api.js';

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerCompany: builder.mutation({
      query: (companyData) => ({
        url: '/companies',
        method: 'POST',
        body: companyData,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => {
        // Transform response to ensure proper structure
        if (response.data && response.data.user) {
          const user = response.data.user;
          if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions.map((p) => p.name);
          }
        }
        return response;
      },
    }),
    getCompanies: builder.query({
      query: () => '/companies',
      providesTags: ['Company'],
    }),
    getCompany: builder.query({
      query: (id) => `/companies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Company', id }],
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Company', id },
        'Company',
      ],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});

export const {
  useRegisterCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
