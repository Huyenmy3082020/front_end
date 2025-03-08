import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import ShipmentDeliveryTable from './ShipmentDeliveryTable.jsx';

function AdminInvoidOut() {
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
                    <ShipmentDeliveryTable></ShipmentDeliveryTable>
                </div>
            </div>
        </div>
    );
}

export default AdminInvoidOut;
