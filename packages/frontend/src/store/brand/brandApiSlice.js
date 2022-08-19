import { apiSlice } from "store/apiSlice";

const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: (data) => ({
        url: "/brand",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandQuery } = brandApiSlice;
