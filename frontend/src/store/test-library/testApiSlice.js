import { apiSlice } from "store/apiSlice";

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: () => ({
        url: "/test/all",
        method: "GET",
      }),
    }),
    getTests: builder.query({
      query: (data) => ({
        url:
          "/test?pageNumber=" +
            (data.pageNumber ?? 1) +
            "&keyword=" +
            data?.keyword ?? "",
        method: "GET",
      }),
    }),
    getTest: builder.query({
      query: (id) => ({
        url: "/test/" + id,
        method: "GET",
      }),
    }),
    createTest: builder.mutation({
      query: (data) => ({
        url: "/test",
        method: "POST",
        body: { ...data },
      }),
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: "/test/" + data?.id,
        method: "PUT",
        body: { ...data },
      }),
    }),
    deleteTest: builder.mutation({
      query: (data) => ({
        url: "/test/" + data.id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTestsQuery,
  useGetTestsQuery,
  useGetTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useExportTestsQuery,
} = testApiSlice;
