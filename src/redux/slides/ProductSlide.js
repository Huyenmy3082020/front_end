import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload);

            state.products.push(action.payload);
        },
        upsertProduct: (state, action) => {
            console.log(action.payload);
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            } else {
                state.products.push(action.payload);
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
        // deleteteAll
        deleteAllProducts: (state) => {
            state.products = [];
        },
    },
});

export const { addProduct, upsertProduct, deleteProduct, deleteAllProducts } = productSlice.actions;

export default productSlice.reducer;
