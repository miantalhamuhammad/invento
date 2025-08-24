import { api } from '../api.js';

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all roles with pagination and search
    getRoles: builder.query({
      query: ({ page = 1, limit = 10, search } = {}) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (search) params.append('search', search);
        return `/roles?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Role', id })),
              { type: 'Role', id: 'LIST' },
            ]
          : [{ type: 'Role', id: 'LIST' }],
      transformResponse: (response) => {
        // Handle both array response and paginated response
        return Array.isArray(response) ? response : response.data || response;
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch roles',
      }),
    }),

    // Get role by ID with full permissions
    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Role', id }],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to fetch role',
      }),
    }),

    // Create new role
    createRole: builder.mutation({
      query: (roleData) => ({
        url: '/roles',
        method: 'POST',
        body: roleData,
      }),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to create role',
        errors: response.data?.errors || [],
      }),
    }),

    // Update role
    updateRole: builder.mutation({
      query: ({ id, ...roleData }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Role', id },
        { type: 'Role', id: 'LIST' },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to update role',
        errors: response.data?.errors || [],
      }),
    }),

    // Delete role
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Role', id },
        { type: 'Role', id: 'LIST' },
      ],
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to delete role',
      }),
    }),

    // Assign permissions to role
    assignPermissions: builder.mutation({
      query: ({ roleId, permissionIds }) => ({
        url: `/roles/${roleId}/permissions`,
        method: 'POST',
        body: { permissionIds },
      }),
      invalidatesTags: (result, error, { roleId }) => [
        { type: 'Role', id: roleId },
        { type: 'Role', id: 'LIST' },
        { type: 'Permission', id: 'LIST' },
        { type: 'RolePermission', id: 'LIST' },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to assign permissions',
        errors: response.data?.errors || [],
      }),
    }),

    // Remove permissions from role
    removePermissions: builder.mutation({
      query: ({ roleId, permissionIds }) => ({
        url: `/roles/${roleId}/permissions`,
        method: 'DELETE',
        body: { permissionIds },
      }),
      invalidatesTags: (result, error, { roleId }) => [
        { type: 'Role', id: roleId },
        { type: 'Role', id: 'LIST' },
        { type: 'Permission', id: 'LIST' },
        { type: 'RolePermission', id: 'LIST' },
      ],
      transformResponse: (response) => response.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'Failed to remove permissions',
      }),
    }),

    // Check if role has permission
    checkRolePermission: builder.query({
      query: ({ roleId, permission }) => `/roles/${roleId}/permissions/check/${permission}`,
      providesTags: (result, error, { roleId, permission }) => [
        { type: 'RolePermission', id: `${roleId}-${permission}` }
      ],
      transformResponse: (response) => response.data || response,
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsMutation,
  useRemovePermissionsMutation,
  useCheckRolePermissionQuery,
} = rolesApi;
