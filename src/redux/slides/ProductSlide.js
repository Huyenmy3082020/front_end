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
            const exists = state.products.some((p) => p._id === action.payload._id);
            if (!exists) {
                state.products.push({
                    ...action.payload,
                    inventory: action.payload.inventory || { stock: 0, status: 'Chưa có hàng' },
                });
            }
        },
        addProductAll: (state, action) => {
            console.log('Payload received in addProductAll:', action.payload);
            state.products = action.payload; // Giữ nguyên dữ liệu từ payload
        },
        updateProduct: (state, action) => {
            console.log('🛠 Cập nhật sản phẩm:', action.payload);

            state.products = state.products.map((p) =>
                p._id === action.payload._id ? { ...p, ...action.payload } : p,
            );
        },
        updateProductStock: (state, action) => {
            console.log('🔄 Cập nhật số lượng sản phẩm:', action.payload);

            console.log(state.products);
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
        deleteAllProducts: (state) => {
            state.products = [];
        },
        increaseStock: (state, action) => {
            console.log('increaseStock', action.payload);

            const product = state.products.find((p) => p._id === action.payload._id);

            product.totalStock = (product.totalStock || 0) + action.payload.quantity;
        },

        decreaseStock: (state, action) => {
            const product = state.products.find((p) => p._id === action.payload._id);
            if (product && product.totalStock >= action.payload.quantity) {
                product.totalStock -= action.payload.quantity;
            }
        },
        updateProductStatus: (state, action) => {
            console.log('🔄 Cập nhật trạng thái sản phẩm:', action.payload);

            const product = state.products.find((p) => p._id === action.payload._id);
            if (product) {
                // Đảm bảo statusList luôn là một mảng
                product.statusList = [product.totalStock <= 0 ? 'out-of-stock' : 'in-stock'];
            }
        },
    },
});

export const {
    addProduct,
    deleteProduct,
    deleteAllProducts,
    updateProduct,
    addProductAll,
    increaseStock,
    decreaseStock,
    updateProductStock,
    updateProductStatus,
} = productSlice.actions;

export default productSlice.reducer;
