import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../../../TableComponent/TableComponent';
import TableUser from './TableUser';
import * as Usersevice from '../../../../service/Userservice';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct';
function AdminUser() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const res = await Usersevice.getAllUser();

                setUser(res.data || []);
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
                <h1 style={{ fontSize: '2.6rem' }}>Thông tin người dùng</h1>

                <TableUser data={user}></TableUser>
            </div>
        </div>
    );
}

export default AdminUser;