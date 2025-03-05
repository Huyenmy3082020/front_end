import { ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';
import { axiosJWT } from '.';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const createProduct = async (data) => {
    try {
        const res = await axiosJWT.post(`ingredient`, data);
        return res.data;
    } catch (e) {
        message.error(e.response.data.mess);
        throw e;
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await axiosJWT.delete(`ingredient/${id}`);
        return res.data;
    } catch (error) {
        message.error(error.response.data.error);
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const res = await axiosJWT.put(`ingredient/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const getAllIngredient = async () => {
    try {
        const res = await axiosJWT.get(`/ingredient`);
        return res.data;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};

export const getAllIngredientV1 = async () => {
    try {
        const res = await axiosJWT.get(`/inventor`);
        return res.data;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};

export const getAllSupplier = async () => {
    try {
        const res = await axiosJWT.get(`/supplier`);
        return res.data.suppliers;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};

export const getAllCategory = async () => {
    try {
        const res = await axiosJWT.get(`/category`);
        return res.data.categories;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};

export const searchElastic = async (searchQuery) => {
    try {
        const res = await axiosJWT.get(`ingredient/search?searchQuery=${searchQuery.querySearch}`);
        return res;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};
