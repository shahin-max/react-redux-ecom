import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push({ ...action.payload, id: state.products.length + 1 });
        }
    }
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
