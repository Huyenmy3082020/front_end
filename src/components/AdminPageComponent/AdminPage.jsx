import React, { useState } from 'react';
import {
    BankOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DashboardFilled,
    DashboardOutlined,
    LogoutOutlined,
    OrderedListOutlined,
    ProductOutlined,
    ShopOutlined,
    SwapOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminProduct from '../AdminPageComponent/Lists/AdminProduct/AdminProduct';
import AdminUser from '../AdminPageComponent/Lists/AdminUser/AdminUser';
import styles from './AdminPage.module.scss';
import DashboardPage from '../../components/AdminPageComponent/Main/DashboardPage';
import AdminOrder from './Lists/AdminOrder/AdminOrder';

import AdminInvoidIn from './Lists/AdminInvoidIn/AdminInvoidIn';

import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../../src/service/Userservice';
import { logout } from '../../redux/slides/UserSlideV1';
import { IconDashboard } from '../IconComponent/IconComponent';
const items = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
    },
    {
        key: 'user',
        label: 'User',
        icon: <UserOutlined />,
    },
    {
        key: 'product',
        label: 'Product',
        icon: <ProductOutlined></ProductOutlined>,
    },
    {
        key: 'order',
        label: 'Warehousing and Exporting',
        icon: <SwapOutlined />,
    },
    {
        key: 'invoice',
        label: 'Invoice',
        icon: <ShopOutlined />,
        children: [
            {
                key: 'invoid-in',
                label: 'Invoid-in',
                icon: <CloudDownloadOutlined />,
            },
            {
                key: 'invoid-out',
                label: 'Invoid-out',
                icon: <CloudUploadOutlined />,
            },
        ],
    },
];

const renderPage = (key) => {
    switch (key) {
        case 'user':
            return <AdminUser></AdminUser>;
        case 'product':
            return <AdminProduct></AdminProduct>;
        case 'order':
            return <AdminOrder></AdminOrder>;
        case 'invoid-in':
            return <AdminInvoidIn></AdminInvoidIn>;
        case 'invoid-out':
            return <AdminOrder></AdminOrder>;
        case 'dashboard':
            return <DashboardPage></DashboardPage>;
        default: {
            return <></>;
        }
    }
};
const App = () => {
    const [selectedKey, setSelectedKey] = useState('product');

    const onClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <>
            <div className={styles.container}>
                <Menu
                    onClick={onClick}
                    className={styles.menu}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div className={styles.content}>{renderPage(selectedKey)}</div>
            </div>
        </>
    );
};

export default App;
