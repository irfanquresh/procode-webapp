import { apiSlice } from "store/apiSlice";

const promoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromos: builder.query({
      query: (data) => ({
        url: "/promo",
        method: "GET",
      }),
    }),
    getPromo: builder.query({
      query: (data) => ({
        url: "/promo/" + data._id,
        method: "GET",
      }),
    }),
    postPromo: builder.mutation({
      query: (data) => ({
        url: "/promo",
        method: "POST",
        body: { ...data },
      }),
    }),
    updatePromo: builder.mutation({
      query: (data) => ({
        url: "/promo",
        method: "PUT",
        body: { ...data },
      }),
    }),
    deletePromo: builder.mutation({
      query: (data) => ({
        url: "/promo/" + data._id,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetPromosQuery, useGetPromoQuery, usePostPromoMutation } =
  promoApiSlice;
