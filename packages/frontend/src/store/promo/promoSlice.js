import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promos: [],
  promo: {},
  pageNumber: 0,
  pageNumberTotal: 0,
  mode: "",
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromo: (state, { payload }) => {
      if (payload) {
        state.promo = payload;
      }
    },
    setPromos: (state, { payload }) => {
      if (payload) {
        const { page = 0, promos = [], total = 0 } = payload;
        state.pageNumber = page ?? 0;
        state.pageNumberTotal = total ?? 0;

        if (page <= 1) {
          state.promos = promos;
        } else {
          state.promos = [...state.promos, ...promos];
        }
      }
    },
    setCreatePromo: (state, { payload }) => {
      if (payload) {
        state.promos = [...state.promos, payload];
      }
    },
    setUpdatePromo: (state, { payload }) => {
      if (payload) {
        const updatedPromos = state.promos?.map((promo) => {
          return promo?.id === payload?.id ? payload : promo;
        });
        state.promos = updatedPromos;
      }
    },
    setRemovePromo: (state, { payload }) => {
      if (payload) {
        state.promos = state.promos?.filter((promo) => {
          return promo?.id !== payload?.id;
        });
      }
    },
  },
});

export const {
  setPromo,
  setPromos,
  setCreatePromo,
  setUpdatePromo,
  setRemovePromo,
} = promoSlice.actions;

export const selectPromo = (state) => state?.promo;

export default promoSlice.reducer;
