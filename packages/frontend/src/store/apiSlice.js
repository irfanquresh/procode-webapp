import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("Un-Authorized Access");
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
