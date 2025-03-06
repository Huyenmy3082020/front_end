import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';
import { Dropdown, message } from 'antd';
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
} from '@ant-design/icons';
import { logout } from '../../../redux/slides/UserSlideV1';
import * as UserService from '../../../service/Userservice';
import { useNavigate } from 'react-router-dom';
import Notification from '../../NotificationComponent/Notification';
import _ from 'lodash';
function HeaderPageAdminProduct({ setsearchProduct }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteAllProducts());
    };
    const user = useSelector((state) => state.userv1);
    const items = [
        {
            key: '1',
            label: 'Thiết lập tài khoản',
            icon: <SettingOutlined />,
            onClick: () => handleMenuClick('Thiết lập tài khoản'),
        },
        {
            key: '2',
            label: 'Ngôn ngữ',
            icon: <GlobalOutlined />,
            onClick: () => handleMenuClick('Ngôn ngữ'),
        },
        {
            key: '3',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: () => handleMenuClick('Đăng xuất'),
        },
        {
            key: '4',
            label: 'Đăng nhập',
            icon: <LoginOutlined />,
            onClick: () => navigate('/sign-in'),
        },
        {
            key: '5',
            label: 'Đăng ký',
            icon: <UserAddOutlined />,
            onClick: () => navigate('/sign-up'),
        },

        {
            key: '4',
            label: `Email : ${user.email}`,
        },
    ];

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
                    <Notification></Notification>
                </div>

                <Dropdown menu={{ items }} placement="bottomLeft">
                    <div className={styles.wrapperItem}>
                        {user._id === '' ? <UserOutlined /> : <img className={styles.avatar} src={user?.avatar}></img>}
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
