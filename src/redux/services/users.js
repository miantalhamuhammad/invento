import { api } from '../api.js';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users with their roles
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search, role } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        });
        if (search) params.append('search', search);
        if (role) params.append('role', role);
        return `/users?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User', id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
      transformResponse: (response) => {
        return Array.isArray(response) ? response : response.data || response;
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch users',
      }),
    }),

    // Get user by ID with role and permissions
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
      transformResponse: (response) => {
        const user = response.data || response;
        // Transform permissions for easier access
        if (user.role && user.role.permissions) {
          user.permissions = user.role.permissions.map(p => p.name);
        }
        return user;
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch user',
      }),
    }),

    // Create new user
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to create user',
        errors: response.data?.errors || [],
      }),
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to update user',
        errors: response.data?.errors || [],
      }),
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to delete user',
      }),
    }),

    // Assign role to user
    assignUserRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: `/users/${userId}/role`,
        method: 'PUT',
        body: { roleId },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'User', id: userId },
        { type: 'User', id: 'LIST' },
        { type: 'UserRole', id: userId },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to assign role to user',
      }),
    }),

    // Remove role from user
    removeUserRole: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/role`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'User', id: userId },
        { type: 'User', id: 'LIST' },
        { type: 'UserRole', id: userId },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to remove role from user',
      }),
    }),

    // Get users by role
    getUsersByRole: builder.query({
      query: (roleId) => `/users/role/${roleId}`,
      providesTags: (result, error, roleId) => [
        { type: 'UserRole', id: roleId },
        { type: 'User', id: 'LIST' }
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch users by role',
      }),
    }),

    // Bulk assign roles
    bulkAssignRoles: builder.mutation({
      query: ({ userIds, roleId }) => ({
        url: '/users/bulk/assign-role',
        method: 'POST',
        body: { userIds, roleId },
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' },
        { type: 'UserRole', id: 'LIST' },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to bulk assign roles',
        errors: response.data?.errors || [],
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignUserRoleMutation,
  useRemoveUserRoleMutation,
  useGetUsersByRoleQuery,
  useBulkAssignRolesMutation,
} = usersApi;
