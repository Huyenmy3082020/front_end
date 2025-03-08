import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct';
import GoodsDeliveryTable from '../../Lists/AdminInvoidIn/GoodsDeliveryTable ';
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
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <HeaderPageAdminProduct />

            <div style={{ padding: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        padding: '15px',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <GoodsDeliveryTable />
                </div>
            </div>
        </div>
    );
}

export default AdminInvoidIn;
