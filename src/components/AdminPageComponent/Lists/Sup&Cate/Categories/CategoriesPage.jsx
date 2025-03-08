import React, { useEffect, useState } from 'react';

import * as CategoriService from '../../../../../service/CategoriService';
import HeaderPageAdminProduct from '../../../HeaderPageAdmin/HederPageAdminProduct';
import TableCategories from '../Categories/TableCategories';
function Categories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const res = await CategoriService.getAll();
                console.log(res);
                setCategories(res);
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
                <h1 style={{ fontSize: '2.6rem' }}>Thông tin danh mục</h1>

                <TableCategories data={categories}></TableCategories>
            </div>
        </div>
    );
}

export default Categories;
