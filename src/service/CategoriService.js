import axios from 'axios';
import { axiosJWT } from '.';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getAll = async () => {
    try {
        const res = await axiosJWT.get(`/category`);
        return res.data;
    } catch (error) {
        console.error('Error fetching category by slug:', error.response || error.message || error);
        throw new Error('Failed to fetch category by slug');
    }
};
export const getAllSupplies = async () => {
    try {
        const res = await axiosJWT.get(`/supplier`);
        return res.data;
    } catch (error) {
        console.error('Error fetching category by slug:', error.response || error.message || error);
        throw new Error('Failed to fetch category by slug');
    }
};
