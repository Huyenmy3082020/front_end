import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    email: '',
    role: '',
    phone: '',
    avatar: '',
};

export const UserSliceV1 = createSlice({
    name: 'user1',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log(action);
            state._id = action.payload._id || state._id;
            state.email = action.payload.email || state.email;
            state.role = action.payload.role || state.role;
            state.avatar = action.payload.avatar || state.avatar;
        },
        logout: () => initialState,
    },
});

export const { updateUser, logout } = UserSliceV1.actions;

export default UserSliceV1.reducer;
