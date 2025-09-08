import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token"),
  company: localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.company = action.payload.user?.company || null;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      if (action.payload.user?.company) {
        localStorage.setItem("company", JSON.stringify(action.payload.user.company));
      }
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.company = null;
      state.error = action.payload;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("company");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.company = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("company");
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      if (action.payload?.company) {
        state.company = action.payload.company;
        localStorage.setItem("company", JSON.stringify(action.payload.company));
      }
    },
    setCompany: (state, action) => {
      state.company = action.payload;
      localStorage.setItem("company", JSON.stringify(action.payload));
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  setUser,
  setCompany,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentCompany = (state) => state.auth.company;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
