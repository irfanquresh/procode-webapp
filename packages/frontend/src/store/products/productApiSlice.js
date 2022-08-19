import { apiSlice } from "store/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (data) => ({
        url: "/product",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductQuery } = productApiSlice;
