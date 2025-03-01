import axios from 'axios';
import axiosInstance from '../ultil/axios';
import { logout } from '../redux/slides/UserSlideV1';
import { store } from '../redux/store';
import { axiosJWT } from '.';
import { jwtDecode } from 'jwt-decode';

// 🌟 Interceptor request: Không cần chỉnh sửa
axiosJWT.interceptors.request.use(
    async (config) => config,
    (error) => Promise.reject(error),
);

const accessToken = localStorage.getItem('access_token');

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
        return decoded.exp < currentTime; // So sánh thời gian hết hạn
    } catch (error) {
        return true;
    }
};
console.log(isTokenExpired(accessToken));
// axiosJWT.interceptors.response.use(
//     // (response) => response,
//     // async (error) => {
//     //     const originalRequest = error.config;

//     //     if (isTokenExpired(accessToken)) {
//     //         console.log('⚠️ Token hết hạn, thực hiện refresh...');
//     //         try {
//     //             // await refreshToken();
//     //             console.log('✅ Token đã được refresh, thử gọi lại request');
//     //             return axiosJWT(originalRequest); // Retry request với token mới
//     //         } catch (refreshError) {
//     //             console.error('❌ Refresh token thất bại, đăng xuất người dùng...');
//     //             return Promise.reject(refreshError);
//     //         }
//     //     }
//     //     return Promise.reject(error);
//     // },
// );

export const getDetailUser = async () => {
    try {
        const res = await axiosJWT.get(`/user/getUser`);
        console.log('✅ Lấy thông tin user thành công:', res.data);
        return res.data;
    } catch (error) {
        console.error('❌ Lỗi khi lấy thông tin user:', error);
        throw new Error('Failed to fetch user details');
    }
};

export const refreshToken = async () => {
    try {
        const res = await axiosInstance.post('/user/refreshtoken', {}, { withCredentials: true });
        console.log('✅ Token đã được refresh:', res);
        localStorage.setItem('access_token', res.data.access_token); // Cập nhật token mới vào localStorage
        return res.data;
    } catch (error) {
        console.error('❌ Refresh token thất bại:', error);
        if (error.response?.status === 403) {
            console.error('❌ Refresh token hết hạn, logout ngay');
            store.dispatch(logout()); // 🚀 Đăng xuất ngay nếu refresh hết hạn
        }
        throw error;
    }
};
// 🔥 API logout
export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}user/logout`, {}, { withCredentials: true });
        store.dispatch(logout());
        console.log('�� Đăng xuất thành công:', res.data);
        return res.data;
    } catch (error) {
        console.error('❌ Lỗi khi logout:', error);
        throw error;
    }
};
export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}user/sign-in`, data, {
        withCredentials: true,
    });
    return res.data;
};

export const signUpUser = async (data) => {
    console.log(data);
    const res = await axios.post(`http://localhost:2000/user/sign-up`, data);
    return res.data;
};
export const getAllUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}user/getAll`);
    return res.data;
};
