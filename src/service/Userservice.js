import axios from 'axios';
import { logout } from '../redux/slides/UserSlideV1';
import { store } from '../redux/store';
import { axiosJWT } from '.';
import { jwtDecode } from 'jwt-decode';



const accessToken = localStorage.getItem('access_token');





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
        const res = await axiosJWT.post('/user/refreshtoken', {}, { withCredentials: true });
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
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}user/getAll`);
    return res.data;
};

