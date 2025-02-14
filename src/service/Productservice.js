import { ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const createProduct = async (data) => {
    console.log(data);

    const res = await axiosInstance.post(`ingredient`, data);
    console.log('res:', res);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axiosInstance.delete(`ingredient/${id}`);
    return res.data;
};

// export const updateProduct = async (id, data) => {
//     const res = await axiosInstance.put(`product/updateProduct/${id}`, data);
//     return res.data;
// };

export const updateProduct = async (id, data) => {
    try {
        const res = await axiosInstance.put(`ingredient/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};


export const getAllIngredient = async () => {
    try {
        const res = await axiosInstance.get(`/ingredient`);
        return res;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};
