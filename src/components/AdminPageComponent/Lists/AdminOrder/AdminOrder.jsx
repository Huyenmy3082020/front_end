import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import AutoCompleteAdmin from '../../HeaderPageAdmin/AutoCompleteAdmin.jsx';
import TableAdminProduct from './TableAdminProduct.jsx';
import FooterAdmin from '../../FooterAdmin/FooterAdmin.jsx';
import * as Userservice from '../../../../service/Userservice.js';
import { logout } from '../../../../redux/slides/UserSlideV1.js';
import { Form, Select } from 'antd';
import * as CategoryService from '../../../../service/CategoriService.js';
function AdminOrder() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const dispatch = useDispatch();
    const [isActionImport, setIsActionImport] = useState(false);
    const state = useSelector((state) => state);

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
    };
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await CategoryService.getAllSupplies();
                setSuppliers(res);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);

    const [selectedsupplier, setSelectedSupllier] = useState('');
    const handleOnChange = (values) => {
        setSelectedSupllier(values);
    };
    const handleDeleteProduct = (id) => {
        setSelectedProduct((prev) => prev.filter((product) => product._id !== id));
    };
    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <Form.Item
                            label="Nhà cung cấp"
                            name="supplier"
                            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                        >
                            <Select placeholder="Chọn nhà cung cấp" style={{ width: 300 }} onChange={handleOnChange}>
                                {suppliers.map((supplier) => (
                                    <Select.Option key={supplier._id} value={supplier.name}>
                                        {supplier.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <AutoCompleteAdmin onSelectProduct={handleSelectProduct} />
                    </div>
                    <TableAdminProduct
                        selectedProduct={selectedProduct}
                        onUpdateQuantity={handleUpdateQuantity}
                        onDeleteProduct={handleDeleteProduct}
                    />
                </div>
            </div>
            <FooterAdmin
                selectedsupplier={selectedsupplier}
                selectedProduct={selectedProduct}
                isActionImport={isActionImport}
                setIsActionImport={setIsActionImport}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
            />
        </div>
    );
}

export default AdminOrder;
