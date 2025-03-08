import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DashboardOutlined,
    SwapOutlined,
    TagsOutlined,
    UserOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    HomeOutlined,
    BankOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminProduct from '../AdminPageComponent/Lists/AdminProduct/AdminProduct';
import styles from './AdminPage.module.scss';
import DashboardPage from '../../components/AdminPageComponent/Main/DashboardPage';
import AdminOrder from './Lists/AdminOrder/AdminOrder';
import AdminInvoidIn from './Lists/AdminInvoidIn/AdminInvoidIn';
import AdminInvoidOut from './Lists/AdminInvoidOut/AdminInvoidOut';
import Categories from './Lists/Sup&Cate/Categories/CategoriesPage';
import Suppliers from './Lists/Sup&Cate/Supplier/SupplierPage';

const items = [
    {
        key: 'dashboard',
        label: 'Trang chủ',
        icon: <HomeOutlined style={{ color: '#1890ff' }} />,
    },
    {
        key: 'product',
        label: 'Sản phẩm',
        icon: <ShoppingOutlined style={{ color: '#52c41a' }} />,
    },
    {
        key: 'order',
        label: 'Xuất & nhập hàng',
        icon: <SwapOutlined style={{ color: '#faad14' }} />,
    },
    {
        key: 'invoice',
        label: 'Danh sách xuất nhập hàng',
        icon: <FileTextOutlined style={{ color: '#722ed1' }} />,
        children: [
            {
                key: 'invoid-in',
                label: 'Danh sách nhập',
                icon: <CloudDownloadOutlined style={{ color: '#13c2c2' }} />,
            },
            {
                key: 'invoid-out',
                label: 'Danh sách xuất',
                icon: <CloudUploadOutlined style={{ color: '#eb2f96' }} />,
            },
        ],
    },
    {
        key: 'category_supplier',
        label: 'Danh mục & Nhà cung cấp',
        icon: <AppstoreOutlined style={{ color: '#ff4d4f' }} />,
        children: [
            {
                key: 'Suppliers',
                label: 'Nhà cung cấp',
                icon: <BankOutlined style={{ color: '#faad14' }} />,
            },
            {
                key: 'Categories',
                label: 'Danh mục',
                icon: <TagsOutlined style={{ color: '#1890ff' }} />,
            },
        ],
    },
];

const renderPage = (key) => {
    switch (key) {
        case 'product':
            return <AdminProduct />;
        case 'order':
            return <AdminOrder />;
        case 'invoid-in':
            return <AdminInvoidIn />;
        case 'invoid-out':
            return <AdminInvoidOut />;
        case 'dashboard':
            return <DashboardPage />;
        case 'Suppliers':
            return <Suppliers />;
        case 'Categories':
            return <Categories />;
        default:
            return <></>;
    }
};

const App = () => {
    const [selectedKey, setSelectedKey] = useState('dashboard');

    const onClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <div className={styles.container}>
            <Menu onClick={onClick} className={styles.menu} style={{ width: 256 }} mode="inline" items={items} />
            <div className={styles.content}>{renderPage(selectedKey)}</div>
        </div>
    );
};

export default App;
