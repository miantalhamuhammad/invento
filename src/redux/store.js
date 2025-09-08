import { configureStore } from "@reduxjs/toolkit";
import { api, apiMiddleware } from "./api.js";
import authSlice from "./slices/authSlice.js";
import permissionsSlice from "./slices/permissionsSlice.js";

// Import all API services to ensure they're injected
import "./services/auth.js";
import "./services/dashboard.js";
import "./services/products.js";
import "./services/categories.js";
import "./services/suppliers.js";
import "./services/customers.js";
import "./services/warehouses.js";
import "./services/stock.js";
import "./services/orders.js";
import "./services/payments.js";
import "./services/employees.js";
import "./services/roles.js";
import "./services/permissions.js";
import "./services/users.js";
import "./services/supplier.js";
import "./services/companies.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiMiddleware),
  devTools: import.meta.env.DEV,
});
