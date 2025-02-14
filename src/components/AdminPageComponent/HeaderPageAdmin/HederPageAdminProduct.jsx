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
import { AutoComplete } from 'antd';
import AutoCompleteAdmin from '../HeaderPageAdmin/AutoCompleteAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllProducts } from '../../../../src/redux/slides/ProductSlide';
function HeaderPageAdminProduct({ onSelectProduct }) {
    const user = useSelector((state) => state.userv1);
    console.log(user.avatar);
    const dispatch = useDispatch();
    const handleDelete = () => {
        // delete all products
        dispatch(deleteAllProducts());
    };
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.wrapperList} ${styles.searchSection}`}>
                <AutoCompleteAdmin onSelectProduct={onSelectProduct} />
            </div>

            <div className={`${styles.wrapperList} ${styles.iconSection}`}>
                <div className={styles.wrapperItem} onClick={handleDelete}>
                    <Notification />
                </div>
                <div className={styles.wrapperItem}>
                    <Notification />
                </div>
                <div className={styles.wrapperItem}>
                    <Notification />
                </div>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
