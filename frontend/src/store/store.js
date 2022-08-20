import { configureStore } from "@reduxjs/toolkit";

import loggerMiddleware from "store/logger";
import monitorReducerEnhancer from "store/monitorReducer";
import { apiSlice } from "store/apiSlice";

import brandReducer from "store/brand/brandSlice";
import productReducer from "store/products/productSlice";
import promoReducer from "store/promo/promoSlice";
import { nodeEnv } from "config/constants";

export default function configureAppStore() {
  const preloadedState = {
    brand:{},
    product:{},
    promo: {},
  };

  const rootReducer = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    brand: brandReducer,
    product: productReducer,
    promo: promoReducer,
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
    devTools: nodeEnv !== "production",
    preloadedState,
    enhancers: [monitorReducerEnhancer],
  });
  
  return store;
}
