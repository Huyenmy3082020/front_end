import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { logout, updateUser } from './redux/slides/UserSlideV1';
import * as Userservice from './service/Userservice';

const queryClient = new QueryClient();

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetDetailUser();
    }, []);

    const handleGetDetailUser = async () => {
        try {
            const res = await Userservice.getDetailUser();
            dispatch(updateUser({ ...res.data }));
        } catch (error) {
            if (error.response?.status === 401) {
                console.error('Token expired. Logging out...');
                dispatch(logout());
            }
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
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
            </Router>
        </QueryClientProvider>
    );
};

export default App;
