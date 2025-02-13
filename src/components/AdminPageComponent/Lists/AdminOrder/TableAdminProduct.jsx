import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../../../redux/slides/OrderSlide';
import { formatVND } from '../../../../ultil/index';
import * as ProductService from '../../../../service/Productservice';

const TableAdminProduct = ({ selectedProduct, onUpdateQuantity }) => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.items);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDelete = async (id) => {
        try {
            await ProductService.deleteProduct(id);
            message.success('Xóa sản phẩm thành công!');
        } catch (error) {
            message.error('Xóa sản phẩm thất bại!');
        }
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span style={{ fontSize: '13px' }}>{text}</span>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <strong>{formatVND(price)}</strong>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => onUpdateQuantity(record._id, value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId) => categoryId?.name || 'Chưa có danh mục',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm title="Bạn có chắc muốn xóa sản phẩm này?" onConfirm={() => handleDelete(record._id)}>
                    <Button icon={<DeleteOutlined />} danger>
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={selectedProduct} rowKey="_id" pagination={false} scroll={{x: 'max-content'}} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', marginRight: '10px'}}>
                Tổng tiền: {formatVND(totalPrice)}
            </div>
        </div>
    );
};

export default TableAdminProduct;
