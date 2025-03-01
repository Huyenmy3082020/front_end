import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import { fetchShipmentDeliveries } from '../../../../service/GoodsDeliveryService';
import { FolderViewOutlined } from '@ant-design/icons';
import GoodsDeliveryTableV1 from './Update/GoodDeliveryTableV1';

const ShipmentDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shipment = await fetchShipmentDeliveries();
                setData(shipment.data);
            } catch (error) {
                console.error('❌ Lỗi khi lấy dữ liệu đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleView = (record) => {
        console.log(record);
        setSelectedShipment(record);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Mã Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Người Dùng',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Tổng Tiền (VNĐ)',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => price.toLocaleString('vi-VN') + ' đ',
        },
        {
            title: 'Ngày Giao Hàng',
            dataIndex: 'shipmentDate',
            key: 'shipmentDate',
            render: (date) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = status === 'Pending' ? 'orange' : status === 'SHIPPED' ? 'green' : 'blue';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Button icon={<FolderViewOutlined />} onClick={() => handleView(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    console.log(selectedShipment);
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="_id"
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn hàng`,
                }}
            />

            <Modal
                title="Chi tiết Đơn Hàng"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                {selectedShipment && (
                    <GoodsDeliveryTableV1
                        selectedDelivery={selectedShipment}
                        setSelectedDelivery={setSelectedShipment}
                        setIsModalVisible={setIsModalVisible}
                    />
                )}
            </Modal>
        </>
    );
};

export default ShipmentDeliveryTable;
