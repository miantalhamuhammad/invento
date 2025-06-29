import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/",
});

const api = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default api;
