import React, { useEffect, useState } from 'react';

import * as ProductService from '../../../../../service/Productservice';
import HeaderPageAdminProduct from '../../../HeaderPageAdmin/HederPageAdminProduct';
import TableCategories from '../Categories/TableCategories';
function Categories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const res = await ProductService.getAllCategory();

                console.log(res);
                setCategories(res);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
            }
        };

        fetchProductAll();
    }, []);
    console.log(categories);
    return (
        <div>
            <HeaderPageAdminProduct></HeaderPageAdminProduct>
            <div style={{ backgroundColor: '#f4f4f4', paddingLeft: '16px', paddingTop: '16px' }}>
                <h1 style={{ fontSize: '2.6rem' }}>Thông tin người dùng</h1>

                <TableCategories data={categories}></TableCategories>
            </div>
        </div>
    );
}

export default Categories;
