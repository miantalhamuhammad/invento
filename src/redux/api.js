import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, redirect to login
    api.dispatch({ type: "auth/logout" });
    window.location.href = "/login";
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Product",
    "Category",
    "Supplier",
    "Customer",
    "Warehouse",
    "Stock",
    "PurchaseOrder",
    "SalesOrder",
    "Shipment",
    "Invoice",
    "Payment",
    "Employee",
    "Department",
    "Dashboard",
    "Role",
    "Permission",
    "RolePermission",
    "UserRole",
    "PORequest",
    "Quotation",
    "Profile",
  ],
  endpoints: () => ({}),
});

export const { middleware: apiMiddleware } = api;
export default api;
