import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import productSlice from "../features/productSlice";

// create store
export const store = configureStore({
    reducer: {
        allCart: cartSlice,
        allProducts: productSlice
    }
})