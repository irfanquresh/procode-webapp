import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  test: {},
  pageNumber: 0,
  pageNumberTotal: 0,
  mode: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTest: (state, { payload }) => {
      if (payload) {
        state.test = payload;
      }
    },
    setTests: (state, { payload }) => {
      if (payload) {
        const { page = 0, tests = [], total = 0 } = payload;
        console.log("🚀 ~ -->>>> tests", tests);
        state.pageNumber = page ?? 0;
        state.pageNumberTotal = total ?? 0;

        if (page <= 1) {
          state.tests = tests;
        } else {
          state.tests = [...state.tests, ...tests];
        }
      }
    },
    setCreateTest: (state, { payload }) => {
      if (payload) {
        state.tests = [...state.tests, payload];
      }
    },
    setUpdateTest: (state, { payload }) => {
      if (payload) {
        const updatedTests = state.tests?.map((test) => {
          return test?.id === payload?.id ? payload : test;
        });
        state.tests = updatedTests;
      }
    },
    setRemoveTest: (state, { payload }) => {
      if (payload) {
        state.tests = state.tests?.filter((test) => {
          return test?.id !== payload?.id;
        });
      }
    },
  },
});

export const {
  setTest,
  setTests,
  setCreateTest,
  setUpdateTest,
  setRemoveTest,
} = testSlice.actions;

export const selectTest = (state) => state?.test;

export default testSlice.reducer;
