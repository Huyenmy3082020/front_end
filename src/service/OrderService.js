import { message } from 'antd';
import axios from 'axios';
import { axiosJWT } from '.';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const createOrder = async (data) => {
    try {
        const res = await axiosJWT.post(`good`, data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.data || error.message || error);
        throw new Error('Failed to create order');
    }
};
export const Export = async (data) => {
    try {
        const res = await axiosJWT.post(`shipment/redis`, data);
        console.log(res);
        return res.data;
    } catch (error) {
        message.error(error.response.data.message);
        throw new Error('Failed to create order');
    }
};

export const getOrder = async () => {
    try {
        const res = await axiosInstance.get(`/order/getOrder`);
        return res.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response || error.message || error);
        throw new Error('Failed to fetch orders');
    }
};

export const getOrderPaid = async () => {
    try {
        const res = await axiosInstance.get(`/order/getOrderPage`);
        return res.data;
    } catch (error) {
        console.error('Error fetching paid orders:', error.response || error.message || error);
        throw new Error('Failed to fetch paid orders');
    }
};

export const deleteOrder = async (id) => {
    try {
        const res = await axiosInstance.delete(`good/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting order:', error.response || error.message || error);
        throw new Error('Failed to delete order');
    }
};
