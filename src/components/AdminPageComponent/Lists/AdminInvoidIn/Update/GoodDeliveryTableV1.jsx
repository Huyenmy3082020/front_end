import React, { useEffect, useState } from 'react';
import { Table, InputNumber } from 'antd';
import { fetchGoodsDeliveries, updateGoodsDeliveries } from '../../../../../service/GoodsDeliveryService';
import { decodeDisplayId, encodeIdToHex } from '../../../../../ultil';
const GoodsDeliveryTableV1 = ({ selectedDelivery }) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (selectedDelivery?.items) {
            const initialQuantities = {};
            selectedDelivery.items.forEach((item) => {
                initialQuantities[item._id] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [selectedDelivery]); // Cập nhật khi selectedDelivery thay đổi

    console.log(quantities);
    const onUpdateQuantity = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value, // Cập nhật số lượng cho từng sản phẩm theo `_id`
        }));
    };

    const dataSource = selectedDelivery?.items?.map((item) => ({
        _id: item._id,
        name: item.ingredientName,
        price: item.price,
        quantity: quantities[item._id] || item.quantity, // Lấy từ state
    }));

    const totalPrice = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0);

    console.log(dataSource);
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

    const dataUpdate = {
        _id: selectedDelivery._id,
        items: dataSource.map((item) => ({ ...item, quantity: parseInt(item.quantity) })),
    };

    // console.log(decodeDisplayId(dataUpdate._id));
    console.log(dataUpdate._id);
    const handleUpdate = async () => {
        // try {
        //     const update = await updateGoodsDeliveries(dataUpdate._id, dataUpdate.items);
        //     console.log('Update successful:', update);
        // } catch (error) {
        //     console.error('Error updating goods delivery:', error);
        // }
    };
    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
            </div>

            <button
                style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#1890ff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#40a9ff')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#1890ff')}
                onClick={handleUpdate}
            >
                Cập nhật đơn hàng
            </button>
        </div>
    );
};

export default GoodsDeliveryTableV1;
