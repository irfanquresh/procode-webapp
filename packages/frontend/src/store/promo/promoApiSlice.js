import { apiSlice } from "store/apiSlice";

const promoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromo: builder.query({
      query: (id) => ({
        url: "/promo/" + id,
        method: "GET",
      }),
    }),
    getPromos: builder.query({
      query: (data) => ({
        url: "/promo?pageNumber=" + (data.pageNumber ?? 1),
        method: "GET",
      }),
    }),
    createPromo: builder.mutation({
      query: (data) => ({
        url: "/promo",
        method: "POST",
        body: { ...data },
      }),
    }),
    updatePromo: builder.mutation({
      query: (data) => ({
        url: "/promo/" + data?.id,
        method: "PUT",
        body: { ...data },
      }),
    }),
    deletePromo: builder.mutation({
      query: (data) => ({
        url: "/promo/" + data.id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPromoQuery,
  useGetPromosQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} = promoApiSlice;
