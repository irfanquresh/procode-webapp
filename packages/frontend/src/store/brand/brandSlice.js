import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action?.payload ?? [];
    },
  },
});

export const { setBrands } = brandSlice.actions;

export const selectBrand = (state) => state?.brand?.brands;

export default brandSlice.reducer;
