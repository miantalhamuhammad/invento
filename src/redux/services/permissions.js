import { api } from '../api.js';

export const permissionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all permissions with pagination and search
    getPermissions: builder.query({
      query: ({ page = 1, limit = 10, search } = {}) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (search) params.append('search', search);
        return `/permissions?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Permission', id })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
      transformResponse: (response) => {
        // Handle both array response and paginated response
        return Array.isArray(response) ? response : response.data || response;
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch permissions',
      }),
    }),

    // Get user permissions by user ID
    getUserPermissions: builder.query({
      query: (userId) => `/users/${userId}/permissions`,
      providesTags: (result, error, userId) => [
        { type: 'UserPermission', id: userId },
        { type: 'Permission', id: 'USER_LIST' }
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch user permissions',
      }),
    }),

    // Check if user has specific permission
    checkUserPermission: builder.query({
      query: ({ userId, permission }) => `/users/${userId}/permissions/check/${permission}`,
      providesTags: (result, error, { userId, permission }) => [
        { type: 'UserPermission', id: `${userId}-${permission}` }
      ],
      transformResponse: (response) => response.data || response,
    }),

    // Get permissions grouped by category
    getPermissionsByCategory: builder.query({
      query: () => '/permissions/grouped',
      providesTags: [{ type: 'Permission', id: 'GROUPED' }],
      transformResponse: (response) => response.data || response,
    }),

    // Get permission by ID
    getPermissionById: builder.query({
      query: (id) => `/permissions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Permission', id }],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch permission',
      }),
    }),

    // Get permission by name
    getPermissionByName: builder.query({
      query: (name) => `/permissions/name/${name}`,
      providesTags: (result, error, name) => [{ type: 'Permission', id: name }],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch permission',
      }),
    }),

    // Create new permission
    createPermission: builder.mutation({
      query: (permissionData) => ({
        url: '/permissions',
        method: 'POST',
        body: permissionData,
      }),
      invalidatesTags: [
        { type: 'Permission', id: 'LIST' },
        { type: 'Permission', id: 'GROUPED' }
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to create permission',
        errors: response.data?.errors || [],
      }),
    }),

    // Update permission
    updatePermission: builder.mutation({
      query: ({ id, ...permissionData }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: permissionData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Permission', id },
        { type: 'Permission', id: 'LIST' },
        { type: 'Permission', id: 'GROUPED' },
        { type: 'Role', id: 'LIST' },
        { type: 'UserPermission', id: 'LIST' }
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to update permission',
        errors: response.data?.errors || [],
      }),
    }),

    // Delete permission
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Permission', id },
        { type: 'Permission', id: 'LIST' },
        { type: 'Permission', id: 'GROUPED' },
        { type: 'Role', id: 'LIST' },
        { type: 'RolePermission', id: 'LIST' },
        { type: 'UserPermission', id: 'LIST' }
      ],
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to delete permission',
      }),
    }),

    // Bulk operations
    bulkAssignPermissions: builder.mutation({
      query: ({ targetType, targetId, permissionIds }) => ({
        url: `/${targetType}/${targetId}/permissions/bulk`,
        method: 'POST',
        body: { permissionIds },
      }),
      invalidatesTags: (result, error, { targetType, targetId }) => [
        { type: 'Permission', id: 'LIST' },
        { type: targetType === 'users' ? 'UserPermission' : 'Role', id: targetId },
        { type: targetType === 'users' ? 'UserPermission' : 'Role', id: 'LIST' }
      ],
    }),

    bulkRemovePermissions: builder.mutation({
      query: ({ targetType, targetId, permissionIds }) => ({
        url: `/${targetType}/${targetId}/permissions/bulk`,
        method: 'DELETE',
        body: { permissionIds },
      }),
      invalidatesTags: (result, error, { targetType, targetId }) => [
        { type: 'Permission', id: 'LIST' },
        { type: targetType === 'users' ? 'UserPermission' : 'Role', id: targetId },
        { type: targetType === 'users' ? 'UserPermission' : 'Role', id: 'LIST' }
      ],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetUserPermissionsQuery,
  useCheckUserPermissionQuery,
  useGetPermissionsByIdQuery,
  useGetPermissionByNameQuery,
  useGetPermissionsByCategoryQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useBulkAssignPermissionsMutation,
  useBulkRemovePermissionsMutation,
} = permissionsApi;
