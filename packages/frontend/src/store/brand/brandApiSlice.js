import { apiSlice } from "store/apiSlice";

const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandQuery } = brandApiSlice;
