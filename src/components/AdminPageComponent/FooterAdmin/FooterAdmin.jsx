import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FooterAdmin.module.scss';
import DropdownPage from '../Dropdown/Dropdown';
import { formatVND } from '../../../ultil/index';
import { setOrder } from '../../../redux/slides/OrderSlide';

function FooterAdmin({ selectedProduct, isActionImport, setIsActionImport }) {
    const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(0);

    // Hàm cập nhật tổng tiền
    const handleTotalPrice = (price) => {
        setCalculatedTotalPrice(price);
    };

    return (
        <div className={styles.wrapperList}>
            <div className={styles.footerLeft}>
                <p className={styles.totalPrice}>💰 Tổng tiền {formatVND(calculatedTotalPrice)} </p>
            </div>
            <div className={styles.footerRight}>
                <DropdownPage
                    selectedProduct={selectedProduct}
                    handleTotalPrice={handleTotalPrice}
                    isActionImport={isActionImport}
                    setIsActionImport={setIsActionImport}
                />
            </div>
        </div>
    );
}

export default FooterAdmin;
