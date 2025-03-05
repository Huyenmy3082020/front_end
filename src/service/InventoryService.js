import axios from 'axios';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getIngredientId = async (id) => {
    const res = await axiosInstance.get(`inventor/${id}`);
    return res.data;
};
