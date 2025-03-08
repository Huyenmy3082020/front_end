import axios from 'axios';
import axiosInstance from '../ultil/axios';
import { logout } from '../redux/slides/UserSlideV1';
import { store } from '../redux/store';
import { axiosJWT } from '.';
import { jwtDecode } from 'jwt-decode';
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

axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi không phải 401 thì trả về lỗi luôn, không gọi refresh token
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Kiểm tra token có hết hạn không
        if (isTokenExpired(accessToken)) {
            console.log('⚠️ Token hết hạn, thực hiện refresh...');
            try {
                const newToken = await refreshToken();
                console.log('✅ Token đã được refresh, thử gọi lại request');

                originalRequest.headers['Authorization'] = `Bearer ${newToken.access_token}`;
                return axiosJWT(originalRequest); // Gửi lại request với token mới
            } catch (refreshError) {
                console.error('❌ Refresh token thất bại, đăng xuất người dùng...');
                store.dispatch(logout()); // Đăng xuất nếu refresh thất bại
                return Promise.reject(refreshError);
            }
        }

        // Nếu token không hết hạn nhưng vẫn lỗi 401 thì trả về lỗi luôn (ví dụ: đăng nhập sai)
        return Promise.reject(error);
    },
);

export const getDetailUser = async () => {
    try {
        const res = await axiosJWT.get(`/user/getUser`);
        console.log('✅ Lấy thông tin user thành công:', res.data);
        return res.data;
    } catch (error) {
        return error.response.data.mess;
    }
};

export const refreshToken = async () => {
    try {
        const res = await axiosJWT.post('/user/refreshtoken', {});
        console.log('✅ Token đã được refresh:', res.data);

        localStorage.setItem('access_token', res.data.access_token);
        return res.data;
    } catch (error) {
        console.error('❌ Refresh token thất bại:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}user/logout`, {}, { withCredentials: true });
        store.dispatch(logout());
        console.log(' Đăng xuất thành công:', res.data);
        return res.data;
    } catch (error) {
        console.error('❌ Lỗi khi logout:', error);
        throw error;
    }
};
export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}user/sign-in`, data, {
            withCredentials: true,
        });

        return res.data;
    } catch (e) {
        throw e;
    }
};

export const signUpUser = async (data) => {
    console.log(data);
    const res = await axios.post(`http://localhost:2000/user/sign-up`, data);
    return res.data;
};
