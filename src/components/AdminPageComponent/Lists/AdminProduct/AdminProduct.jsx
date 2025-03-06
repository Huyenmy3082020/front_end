import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Productservice from '../../../../service/Productservice.js';
import * as CategoryService from '../../../../service/CategoriService.js';
// import * as InventoryService from '../../../../service/InventoryService.js';
import TableComponent from '../../../TableComponent/TableComponent.jsx';
import { useNavigate } from 'react-router-dom';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import ModalComponent from '../../../ModalComponent/ModalComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const products = useSelector((state) => state.product.products);
    const [searchProduct, setSearchProduct] = useState([]);

    useEffect(() => {}, [products]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {};

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await CategoryService.getAll();
                setCategories(res);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <HeaderPageAdminProduct setsearchProduct={setSearchProduct} />
            <div style={{ backgroundColor: '#f4f4f4' }}>
                <h1 style={{ fontSize: '2.6rem', marginLeft: '16px', paddingTop: '16px' }}>Thông tin sản phẩm</h1>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                        marginLeft: '32px',
                    }}
                    onClick={showModal}
                >
                    <PlusOutlined style={{ fontSize: '5rem' }} />
                </Button>
                <TableComponent loading bordered data={searchProduct.length > 0 ? searchProduct : products} />

                <ModalComponent
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    categories={categories}
                    suppliers={suppliers}
                    products={products}
                />
            </div>
        </div>
    );
}

export default AdminProduct;
