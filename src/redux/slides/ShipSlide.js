import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    fullname: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    phone: '',
    status: '',
};

export const shipSlide = createSlice({
    name: 'ship', // Tên slice
    initialState, // State ban đầu
    reducers: {
        // Cập nhật thông tin giao hàng
        updateShipInfo: (state, action) => {
            const { fullname, address, city, district, ward, phone, status } = action.payload;
            return { ...state, fullname, address, city, district, ward, phone, status };
        },
        // Reset thông tin giao hàng
        resetShipInfo: () => initialState,
    },
});

export const { updateShipInfo, resetShipInfo } = shipSlide.actions;

export default shipSlide.reducer;
