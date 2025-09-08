import { api } from '../api.js';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Role', 'Permission', 'Company'],
      transformResponse: (response) => {
        // Ensure user role, permissions, and company are properly structured
        if (response.data && response.data.user) {
          const user = response.data.user;

          // Transform permissions array for easier access
          if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions.map((p) => p.name);
          }

          // Ensure company information is available
          if (user.company) {
            // Company info is already in user object
          }
        }
        return response;
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    // Company registration endpoint
    registerCompany: builder.mutation({
      query: (companyData) => ({
        url: '/companies',
        method: 'POST',
        body: companyData,
      }),
      invalidatesTags: ['User', 'Company'],
      transformResponse: (response) => {
        // Transform response for company registration
        if (response.data && response.data.user) {
          const user = response.data.user;
          if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions.map((p) => p.name);
          }
        }
        return response;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Role', 'Permission', 'Company'],
    }),
    verifyToken: builder.query({
      query: () => '/auth/verify-token',
      providesTags: ['User', 'Company'],
      transformResponse: (response) => {
        // Transform user data to include permission names and company info
        if (response.data) {
          if (response.data.role && response.data.role.permissions) {
            response.data.permissions = response.data.role.permissions.map((p) => p.name);
          }
        }
        return response;
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User', 'Role'],
      transformResponse: (response) => {
        // Transform user profile to include permission names
        if (response.data && response.data.role && response.data.role.permissions) {
          response.data.permissions = response.data.role.permissions.map((p) => p.name);
        }
        return response;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRegisterCompanyMutation, // Add this export
  useLogoutMutation,
  useVerifyTokenQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
} = authApi;
