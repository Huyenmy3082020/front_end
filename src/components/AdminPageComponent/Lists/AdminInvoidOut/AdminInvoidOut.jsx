import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import ShipmentDeliveryTable from './ShipmentDeliveryTable.jsx';

function AdminInvoidOut() {
    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <ShipmentDeliveryTable></ShipmentDeliveryTable>
                </div>
            </div>
        </div>
    );
}

export default AdminInvoidOut;
