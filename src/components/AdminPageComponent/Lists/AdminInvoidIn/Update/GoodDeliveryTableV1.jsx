import React, { useEffect, useState } from 'react';
import { Table, InputNumber, Button, message } from 'antd';
import { update } from '../../../../../service/GoodsDeliveryService';
import { useDispatch } from 'react-redux';
import { updateProduct, updateProductStock } from '../../../../../redux/slides/ProductSlide';
import * as InventoryService from '../../../../../service/InventoryService.js';
const GoodsDeliveryTableV1 = ({ selectedDelivery, setSelectedDelivery, setIsModalVisible }) => {
    const [quantities, setQuantities] = useState({});

    // 🔹 Cập nhật state `quantities` khi `selectedDelivery` thay đổi
    useEffect(() => {
        if (selectedDelivery?.items) {
            const initialQuantities = {};
            selectedDelivery.items.forEach((item) => {
                initialQuantities[item._id] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [selectedDelivery]);

    console.log(selectedDelivery);
    // 🔹 Xử lý cập nhật số lượng từng sản phẩm
    const onUpdateQuantity = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const dataSource = selectedDelivery?.items?.map((item) => ({
        _id: item._id,
        name: item.ingredientName,
        price: item.price,
        quantity: quantities[item._id] || item.quantity, // Sử dụng giá trị từ `quantities`
    }));

    const totalPrice = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const dataUpdate = {
        items: selectedDelivery.items.map((item) => ({
            _id: item._id,
            quantity: quantities[item._id] || item.quantity,
            priceAtPurchase: item.price,
            ingredientNameAtPurchase: item.ingredientNameAtPurchase,
            ingredientsId: item.ingredientsId,
        })),
    };
    const dispatch = useDispatch();

    console.log(selectedDelivery);
    const handleUpdate = async () => {
        try {
            const a = await update(selectedDelivery._id, dataUpdate);
            console.log(a.data.items);
            a.data.items.forEach((product) => {
                dispatch(updateProductStock(product));
            });

            setIsModalVisible(false);
            message.success('Cập nhật thành công!');
        } catch (error) {
            console.error('❌ Lỗi cập nhật:', error);
            alert('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) =>
                price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) : 'N/A',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={quantities[record._id] || record.quantity}
                    onChange={(value) => onUpdateQuantity(record._id, value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            render: (_, record) => {
                const total = record.price * record.quantity;
                return (
                    <strong>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                    </strong>
                );
            },
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
            </div>

            <Button type="primary" style={{ marginTop: '10px' }} onClick={handleUpdate}>
                Cập nhật đơn hàng
            </Button>
        </div>
    );
};

export default GoodsDeliveryTableV1;
