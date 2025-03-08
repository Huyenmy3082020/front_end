import React, { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Productservice from '../../../../service/Productservice.js';
import * as CategoryService from '../../../../service/CategoriService.js';
import TableComponent from '../../../TableComponent/TableComponent.jsx';
import { useSelector } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import ModalComponent from '../../../ModalComponent/ModalComponent.jsx';

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const products = useSelector((state) => state.product.products);
    const [searchProduct, setSearchProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await CategoryService.getAll();
                setCategories(res);
            } catch (error) {
                message.error('Lỗi khi tải danh mục sản phẩm!');
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '16px' }}>
            <HeaderPageAdminProduct setsearchProduct={setSearchProduct} />
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#333' }}>Thông tin sản phẩm</h1>

                {/* Nút thêm sản phẩm */}
                <div style={{ marginBottom: '16px' }}>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined style={{ fontSize: '2rem' }} />}
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            height: '80px',
                            width: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                        }}
                    />
                </div>

                {loading ? (
                    <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }} />
                ) : (
                    <TableComponent loading bordered data={searchProduct.length > 0 ? searchProduct : products} />
                )}

                <ModalComponent
                    isModalOpen={isModalOpen}
                    handleOk={() => setIsModalOpen(false)}
                    handleCancel={() => setIsModalOpen(false)}
                    categories={categories}
                    suppliers={suppliers}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    products={products}
                />
            </div>
        </div>
    );
}

export default AdminProduct;
