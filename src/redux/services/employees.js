import { api } from '../api.js';

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Employees
    getEmployees: builder.query({
      query: (params = {}) => ({
        url: '/employees',
        params,
      }),
      providesTags: ['Employee'],
    }),
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: '/employees',
        method: 'POST',
        body: employeeData,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...employeeData }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: employeeData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
    exportEmployees: builder.query({
      query: (format = 'csv') => ({
        url: '/employees/export',
        params: { format },
      }),
    }),

    // Departments
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Department'],
    }),
    getDepartment: builder.query({
      query: (id) => `/departments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Department', id }],
    }),
    createDepartment: builder.mutation({
      query: (departmentData) => ({
        url: '/departments',
        method: 'POST',
        body: departmentData,
      }),
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...departmentData }) => ({
        url: `/departments/${id}`,
        method: 'PUT',
        body: departmentData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Department', id }],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  // Employees
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useExportEmployeesQuery,

  // Departments
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = employeesApi;
