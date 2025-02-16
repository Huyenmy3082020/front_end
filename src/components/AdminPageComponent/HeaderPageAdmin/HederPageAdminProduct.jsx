import Search from 'antd/es/transfer/search';
import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';
import {
    Discount,
    FullScreen,
    GiaoDien,
    IconDashboard,
    IconStart,
    Login,
    MessageAdmin,
    Notification,
    ThongTinThanhToan,
    TotalSell,
    User,
} from '../../IconComponent/IconComponent';
import { AutoComplete, Dropdown, message } from 'antd';
import AutoCompleteAdmin from '../HeaderPageAdmin/AutoCompleteAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllProducts } from '../../../../src/redux/slides/ProductSlide';
import {
    BellOutlined,
    MoonOutlined,
    SettingOutlined,
    UserOutlined,
    GlobalOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
function HeaderPageAdminProduct({ onSelectProduct }) {
    const user = useSelector((state) => state.userv1);
    console.log(user.avatar);
    const dispatch = useDispatch();
    const handleDelete = () => {
        // delete all products
        dispatch(deleteAllProducts());
    };

    const items = [
        {
            key: '1',
            label: 'Thiết lập tài khoản',
            icon: <SettingOutlined />,
            onClick: () => handleMenuClick('Xác nhận đơn hàng'),
        },
        {
            key: '2',
            label: 'Ngôn ngữ',
            icon: <GlobalOutlined />,
            onClick: () => handleMenuClick('Gửi hàng đi'),
        },
        {
            key: '3',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: () => handleMenuClick('Nhập hàng'),
        },
    ];

    const handleMenuClick = async (label) => {
        console.log(label);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.wrapperList} ${styles.searchSection}`}>
                <h1>Tổng quan</h1>
            </div>

            <div className={`${styles.wrapperList} ${styles.iconSection}`}>
                <div className={styles.wrapperItem} onClick={handleDelete}>
                    <SettingOutlined />
                </div>
                <div className={styles.wrapperItem}>
                    <MoonOutlined />
                </div>
                <div className={styles.wrapperItem}>
                    <BellOutlined />
                </div>
                <Dropdown menu={{ items }} placement="bottomLeft">
                    <div className={styles.wrapperItem}>
                        <UserOutlined />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
