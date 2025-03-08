import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FooterAdmin.module.scss';
import DropdownPage from '../Dropdown/Dropdown';
import { formatVND } from '../../../ultil/index';
import { setOrder } from '../../../redux/slides/OrderSlide';

function FooterAdmin({
    selectedSupplier,
    selectedProduct,
    isActionImport,
    setIsActionImport,
    deliveryAddress,
    setDeliveryAddress,
}) {
    const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(0);

    const handleTotalPrice = (price) => {
        setCalculatedTotalPrice(price);
    };

    console.log('selectedSupplier', selectedSupplier);
    return (
        <div className={styles.wrapperList}>
            <div className={styles.footerRight}>
                <DropdownPage
                    selectedSupplier={selectedSupplier}
                    selectedProduct={selectedProduct}
                    handleTotalPrice={handleTotalPrice}
                    isActionImport={isActionImport}
                    setIsActionImport={setIsActionImport}
                    deliveryAddress={deliveryAddress}
                    setDeliveryAddress={setDeliveryAddress}
                />
            </div>
        </div>
    );
}

export default FooterAdmin;
