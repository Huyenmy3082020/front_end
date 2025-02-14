import React, { useEffect, useState } from 'react';
import { Table, InputNumber, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../../../../redux/slides/OrderSlide';
import { decodeDisplayId, formatVND } from '../../../../../ultil/index';
import * as OrderService from '../../../../../service/OrderService';

const GoodsDeliveryTableV1 = ({ selectedDelivery }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    const dataSource = selectedDelivery.items?.map((item) => ({
        _id: item.ingredientsId._id,
        name: item.ingredientsId.name,
        price: item.ingredientsId.price,
        quantity: item.quantity
    }));
    console.log(selectedDelivery);

    useEffect(() => {
        if (dataSource?.length) {
            let total = dataSource.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    }, [selectedDelivery]);


  
    console.log(  decodeDisplayId(selectedDelivery._id));
    const onUpdateQuantity = (id,value)=>
    {

        // update san pham trong chi tiet nhap hang
        console.log(id,value)
    }
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
            title: 'Tổng tiền',
            key: 'total',
            render: (_, record) => <strong>{formatVND(record.price * record.quantity)}</strong>,
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold' }}>
                Tổng tiền: {formatVND(totalPrice)}
                
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
>
  Cập nhật đơn hàng
</button>

        </div>
    );
};

export default GoodsDeliveryTableV1;
