import { message } from 'antd';
import { axiosJWT } from '.';
export const createOrder = async (data) => {
    try {
        const res = await axiosJWT.post(`good`, data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.data || error.message || error);
        throw new Error('Failed to create order');
    }
};
export const ExportV1 = async (data) => {
    try {
        const res = await axiosJWT.post(`good/v1`, data);
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create order');
    }
};
export const Export = async (data) => {
    try {
        const res = await axiosJWT.post(`shipment/redis`, data);
        console.log(res);
        return res.data;
    } catch (error) {
        message.error(error.response.data.message || error.response.data.mess);
        throw new Error('Failed to create order');
    }
};
export const deleteOrder = async (id) => {
    try {
        const res = await axiosJWT.delete(`good/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting order:', error.response || error.message || error);
        throw new Error('Failed to delete order');
    }
};
