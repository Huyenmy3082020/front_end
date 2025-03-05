import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slides/UserSlideV1';
import * as Userservice from './service/Userservice';

const queryClient = new QueryClient();

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGetDetailUser = async () => {
        try {
            const res = await Userservice.getDetailUser();
            console.log('🚀 ~ file: App.js ~ line 41 ~ handleGetDetailUser ~ res', res);
            if (res === 'Unauthorized' || res === undefined) {
                navigate('/sign-in');
                return;
            }
            dispatch(updateUser({ ...res }));
        } catch (error) {
            console.error('❌ Lỗi lấy thông tin user:', error);
        }
    };

    useEffect(() => {
        handleGetDetailUser();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.page;
                    const Layout = route.isShowHeader ? Fragment : React.Fragment;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </QueryClientProvider>
    );
};

export default App;
