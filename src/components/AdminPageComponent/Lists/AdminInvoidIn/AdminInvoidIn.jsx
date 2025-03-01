import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import AutoCompleteAdmin from '../../HeaderPageAdmin/AutoCompleteAdmin.jsx';
import GoodsDeliveryTable from './GoodsDeliveryTable .jsx';
import FooterAdmin from '../../FooterAdmin/FooterAdmin.jsx';

function AdminInvoidIn() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const dispatch = useDispatch();
    const [isActionImport, setIsActionImport] = useState(false);

    useEffect(() => {
        if (isActionImport) {
            setSelectedProduct([]);
            setIsActionImport(false);
        }
    }, [isActionImport]);

    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <GoodsDeliveryTable />
                </div>
            </div>
        </div>
    );
}

export default AdminInvoidIn;
