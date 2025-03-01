import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as Userservice from '../service/Userservice';
import { logout, updateUser } from '../redux/slides/UserSlideV1';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Đảm bảo cookies được gửi trong mỗi request
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
    (config) => {
        // Nếu cần, có thể thêm logic ở đây để gắn token vào headers của request
        console.log('Request Config:', config);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    },
);

// Interceptor để xử lý lỗi (token hết hạn)
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    async (error) => {
        console.error('Response Error:', error);
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là do token hết hạn (status 401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Lấy refresh token từ cookies (hoặc từ storage, tùy thuộc vào cách lưu trữ)
                const refreshToken = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('refresh_token='))
                    ?.split('=')[1];

                console.log('Refresh Token:', refreshToken);

                // Gửi yêu cầu lấy accessToken mới từ refreshToken
                const { data } = await Userservice.refreshToken({ refreshToken });

                // Cập nhật accessToken mới vào cookie
                document.cookie = `access_token=${data.accessToken}; path=/;`;

                // Cập nhật lại headers của request gốc với accessToken mới
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // Thực hiện lại request gốc với accessToken mới
                console.log('Retrying original request with new access token');
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Nếu không thể refresh token, logout người dùng
                console.error('Error refreshing token:', refreshError);
                useDispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
