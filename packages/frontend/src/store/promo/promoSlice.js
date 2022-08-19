import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promos: [],
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromos: (state, { payload }) => {
      if (Array.isArray(payload) && payload?.length > 0) {
        state.promos = payload ?? [];
      }
    },
    setPromo: (state, { payload }) => {
      if (payload) {
        const existingItem = state?.promos?.find(
          (promo) => promo?._id === payload?._id
        );
        if (existingItem) {
          const updatedPromos = state.promos?.map((promo) => {
            return promo?._id === payload?._id ? payload : promo;
          });
          state.promos = updatedPromos;
        } else {
          state.promos = [payload, ...state.promos];
        }
      }
    },
    removePromo: (state, { payload }) => {
      if (payload) {
        state.promos = state.promos?.filter((promo) => {
          return promo?._id !== payload?._id;
        });
      }
    },
  },
});

export const { setPromos, setPromo, removePromo } = promoSlice.actions;

export const selectPromo = (state) => state?.promo?.promos;

export default promoSlice.reducer;
