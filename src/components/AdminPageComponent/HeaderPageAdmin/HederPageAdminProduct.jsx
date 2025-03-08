import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';
import { Dropdown, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllProducts } from '../../../../src/redux/slides/ProductSlide';
import {
    MoonOutlined,
    SettingOutlined,
    UserOutlined,
    GlobalOutlined,
    LogoutOutlined,
    UserAddOutlined,
    LoginOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { logout } from '../../../redux/slides/UserSlideV1';
import * as UserService from '../../../service/Userservice';
import { useNavigate } from 'react-router-dom';
import Notification from '../../NotificationComponent/Notification';
import _ from 'lodash';

function HeaderPageAdminProduct({ setsearchProduct }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userv1);
    const navigate = useNavigate();

    const handleMenuClick = async (label) => {
        if (label === 'Đăng xuất') {
            try {
                await UserService.logoutUser();
                dispatch(logout());
                dispatch(deleteAllProducts());
                message.success('Đăng xuất thành công!');
                navigate('/sign-in');
            } catch (error) {
                message.error('Đăng xuất thất bại!');
                console.error('Lỗi khi đăng xuất:', error);
            }
        } else if (label === 'Thiết lập tài khoản') {
            navigate('/profile_page');
        }
    };

    const menuItems = [
        {
            key: '1',
            label: 'Thiết lập tài khoản',
            icon: <SettingOutlined style={{ color: '#1890ff' }} />,
            onClick: () => handleMenuClick('Thiết lập tài khoản'),
        },
        {
            key: '2',
            label: 'Ngôn ngữ',
            icon: <GlobalOutlined style={{ color: '#52c41a' }} />,
            onClick: () => handleMenuClick('Ngôn ngữ'),
        },
        {
            key: '3',
            label: 'Đăng xuất',
            icon: <LogoutOutlined style={{ color: 'red' }} />,
            onClick: () => handleMenuClick('Đăng xuất'),
        },
        {
            key: '4',
            label: 'Đăng nhập',
            icon: <LoginOutlined style={{ color: '#1890ff' }} />,
            onClick: () => navigate('/sign-in'),
        },
        {
            key: '5',
            label: 'Đăng ký',
            icon: <UserAddOutlined style={{ color: '#faad14' }} />,
            onClick: () => navigate('/sign-up'),
        },
        {
            key: '6',
            label: `Email : ${user.email}`,
        },
    ];

    return (
        <div className={styles.wrapper}>
            {/* Tiêu đề trang */}
            <div className={`${styles.wrapperList} ${styles.searchSection}`}>
                <h1>Tổng quan</h1>
            </div>

            {/* Khu vực icon */}
            <div className={`${styles.wrapperList} ${styles.iconSection}`}>
                <Button className={styles.iconHover} icon={<SettingOutlined />} />

                <Button className={styles.iconHover} icon={<MoonOutlined />} />

                <Button className={styles.iconHover} icon={<BellOutlined />} />

                <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
                    <div className={styles.wrapperItem}>
                        {user._id === '' ? (
                            <UserOutlined className={styles.iconHover} />
                        ) : (
                            <img className={styles.avatar} src={user?.avatar} alt="User Avatar" />
                        )}
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
