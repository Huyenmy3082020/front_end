import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Card, message, Spin, Typography } from 'antd';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import AutoCompleteAdmin from '../../HeaderPageAdmin/AutoCompleteAdmin.jsx';
import TableAdminProduct from './TableAdminProduct.jsx';
import FooterAdmin from '../../FooterAdmin/FooterAdmin.jsx';
import * as CategoryService from '../../../../service/CategoriService.js';

const { Title } = Typography;

function AdminOrder() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [isActionImport, setIsActionImport] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isActionImport) {
            setSelectedProduct([]);
            setIsActionImport(false);
        }
    }, [isActionImport]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const res = await CategoryService.getAllSupplies();
                setSuppliers(res);
            } catch (error) {
                message.error('Lỗi khi tải danh sách nhà cung cấp!');
                console.error('Error fetching suppliers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleUpdateQuantity = (id, value) => {
        setSelectedProduct((prev) =>
            prev.map((product) => (product._id === id ? { ...product, quantity: value } : product)),
        );
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct((prev) => {
            const isExist = prev.some((item) => item._id === product._id);
            if (!isExist) {
                return [...prev, { ...product, quantity: 1 }];
            }
            return prev;
        });
    };

    const handleDeleteProduct = (id) => {
        setSelectedProduct((prev) => prev.filter((product) => product._id !== id));
    };

    console.log(selectedSupplier);
    return (
        <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
            <HeaderPageAdminProduct />

            <Card style={{ borderRadius: '10px', padding: '20px', backgroundColor: '#fff' }}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                    Quản lý đơn hàng
                </Title>

                {/* Chọn nhà cung cấp và thêm sản phẩm */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <Form.Item
                        label="Nhà cung cấp"
                        name="supplier"
                        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                        style={{ flex: 1 }}
                    >
                        {loading ? (
                            <Spin size="small" />
                        ) : (
                            <Select
                                placeholder="Chọn nhà cung cấp"
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedSupplier(value)}
                            >
                                {suppliers.map((supplier) => (
                                    <Select.Option key={supplier._id} value={supplier.name}>
                                        {supplier.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>

                    <AutoCompleteAdmin onSelectProduct={handleSelectProduct} />
                </div>

                {/* Bảng danh sách sản phẩm */}
                <TableAdminProduct
                    selectedProduct={selectedProduct}
                    onUpdateQuantity={handleUpdateQuantity}
                    onDeleteProduct={handleDeleteProduct}
                />
            </Card>

            {/* Footer */}
            <FooterAdmin
                selectedSupplier={selectedSupplier}
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
