import { api } from "./api.js";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getRecentOrders: builder.query({
      query: (limit = 10) => `/dashboard/recent-orders?limit=${limit}`,
      providesTags: ["Dashboard"],
    }),
    getLowStockAlerts: builder.query({
      query: () => "/dashboard/low-stock-alerts",
      providesTags: ["Dashboard"],
    }),
    getRevenueChart: builder.query({
      query: (days = 30) => `/dashboard/revenue-chart?days=${days}`,
      providesTags: ["Dashboard"],
    }),
    getTopProducts: builder.query({
      query: (limit = 10) => `/dashboard/top-products?limit=${limit}`,
      providesTags: ["Dashboard"],
    }),
    getRecentActivities: builder.query({
      query: () => "/dashboard/recent-activities",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentOrdersQuery,
  useGetLowStockAlertsQuery,
  useGetRevenueChartQuery,
  useGetTopProductsQuery,
  useGetRecentActivitiesQuery,
} = dashboardApi;
