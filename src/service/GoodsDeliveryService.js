import axios from 'axios';
import { axiosJWT } from '.';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// lấy danh sách phiếu nhâp
export const fetchGoodsDeliveries = async () => {
    try {
        const res = await axiosJWT.get(`good/getAll`);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message || error);
        throw new Error('Failed to create order');
    }
};
export const fetchShipmentDeliveries = async () => {
    try {
        const res = await axiosJWT.get(`shipment/getAll`);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message || error);
        throw new Error('Failed to create order');
    }
};
export const update = async (id, data) => {
    try {
        const res = await axiosJWT.put(`good/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message || error);
        throw new Error('Failed to create order');
    }
};
