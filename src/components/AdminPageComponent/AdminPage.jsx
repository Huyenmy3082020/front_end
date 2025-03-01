import React, { useState } from 'react';
import {
    AppstoreOutlined,
    BankOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DashboardFilled,
    DashboardOutlined,
    OrderedListOutlined,
    ProductOutlined,
    ShopOutlined,
    SwapOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminProduct from '../AdminPageComponent/Lists/AdminProduct/AdminProduct';
import styles from './AdminPage.module.scss';
import DashboardPage from '../../components/AdminPageComponent/Main/DashboardPage';
import AdminOrder from './Lists/AdminOrder/AdminOrder';

import AdminInvoidIn from './Lists/AdminInvoidIn/AdminInvoidIn';

import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../../src/service/Userservice';
import { logout } from '../../redux/slides/UserSlideV1';
import { IconDashboard } from '../IconComponent/IconComponent';
import Categories from './Lists/Sup&Cate/Categories/CategoriesPage';
import Suppliers from './Lists/Sup&Cate/Supplier/SupplierPage';
import AdminInvoidOut from './Lists/AdminInvoidOut/AdminInvoidOut';
const items = [
    {
        key: 'dashboard',
        label: 'Trang chủ',
        icon: <DashboardOutlined />,
    },

    {
        key: 'product',
        label: 'Sản phẩm',
        icon: <ProductOutlined></ProductOutlined>,
    },
    {
        key: 'order',
        label: 'Xuất & nhập hàng',
        icon: <SwapOutlined />,
    },
    {
        key: 'invoice',
        label: 'Danh sách xuất nhập hàng',
        icon: <ShopOutlined />,
        children: [
            {
                key: 'invoid-in',
                label: 'Danh sách nhập',
                icon: <CloudDownloadOutlined />,
            },
            {
                key: 'invoid-out',
                label: 'Danh sách xuất',
                icon: <CloudUploadOutlined />,
            },
        ],
    },
    {
        key: '',
        label: 'Danh mục & Nhà cung cấp',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'Suppliers',
                label: 'Nhà cung cấp',
                icon: <TagsOutlined />,
            },
            {
                key: 'Categories',
                label: 'Danh mục',
                icon: <ShopOutlined />,
            },
        ],
    },
];
const renderPage = (key) => {
    switch (key) {
        case 'product':
            return <AdminProduct></AdminProduct>;
        case 'order':
            return <AdminOrder></AdminOrder>;
        case 'invoid-in':
            return <AdminInvoidIn></AdminInvoidIn>;
        case 'invoid-out':
            return <AdminInvoidOut></AdminInvoidOut>;
        case 'dashboard':
            return <DashboardPage></DashboardPage>;
        case 'Suppliers':
            return <Suppliers></Suppliers>;
        case 'Categories':
            return <Categories></Categories>;
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
