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

    const handleUpdateQuantity = (id, value) => {
        setSelectedProduct((prev) =>
            prev.map((product) => (product._id === id ? { ...product, quantity: value } : product)),
        );
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct((prev) => {
            const isExist = prev.some((item) => item._id === product._id);
            if (!isExist) {
                const newProducts = [...prev, { ...product, quantity: 1 }];

                return newProducts;
            }
            return prev;
        });
    };

    const handleAlo = async () => {
        setSelectedProduct([]);
        console.log('alo');
    };
    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <AutoCompleteAdmin onSelectProduct={handleSelectProduct} />
                    </div>
                    <GoodsDeliveryTable />
                </div>
            </div>
        </div>
    );
}

export default AdminInvoidIn;
