import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.token = "token";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
