import React, { useEffect, useState } from 'react';

import * as CategoriService from '../../../../../service/CategoriService';
import HeaderPageAdminProduct from '../../../HeaderPageAdmin/HederPageAdminProduct';
import TableSupplier from './TableSupplier';
function Supplier() {
    const [supplier, setSuppliers] = useState([]);
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const res = await CategoriService.getAllSupplies();

                setSuppliers(res);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
            }
        };

        fetchProductAll();
    }, []);
    return (
        <div>
            <HeaderPageAdminProduct></HeaderPageAdminProduct>
            <div style={{ backgroundColor: '#f4f4f4', paddingLeft: '16px', paddingTop: '16px' }}>
                <h1 style={{ fontSize: '2.6rem' }}>Thông tin nhà cung cấp</h1>

                <TableSupplier data={supplier}></TableSupplier>
            </div>
        </div>
    );
}

export default Supplier;
