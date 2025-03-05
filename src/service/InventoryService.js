import axios from 'axios';
import { axiosJWT } from '.';

export const getIngredientId = async (id) => {
    const res = await axiosJWT.get(`inventor/${id}`);
    return res.data;
};
