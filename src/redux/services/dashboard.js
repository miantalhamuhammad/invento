import { api } from '../api.js';

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard statistics
    getDashboardStats: builder.query({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),

    // Get recent orders (both sale and purchase orders)
    getRecentOrders: builder.query({
      query: (limit = 10) => `/dashboard/recent-orders?limit=${limit}`,
      providesTags: ['Dashboard'],
    }),

    // Get low stock alerts
    getLowStockAlerts: builder.query({
      query: () => '/dashboard/low-stock-alerts',
      providesTags: ['Dashboard'],
    }),

    // Get revenue chart data
    getRevenueChart: builder.query({
      query: (days = 30) => `/dashboard/revenue-chart?days=${days}`,
      providesTags: ['Dashboard'],
    }),

    // Get top selling products
    getTopProducts: builder.query({
      query: (limit = 10) => `/dashboard/top-products?limit=${limit}`,
      providesTags: ['Dashboard'],
    }),

    // Get recent activities
    getRecentActivities: builder.query({
      query: (limit = 20) => `/dashboard/recent-activities?limit=${limit}`,
      providesTags: ['Dashboard'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentOrdersQuery,
  useGetLowStockAlertsQuery,
  useGetRevenueChartQuery,
  useGetTopProductsQuery,
  useGetRecentActivitiesQuery,
} = dashboardApi;
