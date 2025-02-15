import axios from 'axios';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// lấy danh sách phiếu nhâp
export const fetchGoodsDeliveries = async () => {
    try {
        const res = await axiosInstance.get(`good/getAll`);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message || error);
        throw new Error('Failed to create order');
    }
};
export const update = async (id, data) => {
    try {
        console.log('id', id);
        console.log('data', data);
        const res = await axiosInstance.put(`good/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message || error);
        throw new Error('Failed to create order');
    }
};
