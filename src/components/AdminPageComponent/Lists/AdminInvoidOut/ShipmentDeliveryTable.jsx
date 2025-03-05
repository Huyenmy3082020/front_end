import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag, Input } from 'antd';
import { fetchShipmentDeliveries } from '../../../../service/GoodsDeliveryService';
import { FolderViewOutlined, SearchOutlined } from '@ant-design/icons';
import GoodsDeliveryTableV1 from './Update/GoodDeliveryTableV1';

const ShipmentDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shipment = await fetchShipmentDeliveries();
                setData(shipment.data);
                setFilteredData(shipment.data);
            } catch (error) {
                console.error('❌ Lỗi khi lấy dữ liệu đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleView = (record) => {
        setSelectedShipment(record);
        setIsModalVisible(true);
    };

    const handleSearch = (value) => {
        const filtered = data.filter(
            (item) =>
                item._id.toLowerCase().includes(value.toLowerCase()) ||
                item.userId.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredData(filtered);
        setSearchText(value);
    };

    const columns = [
        {
            title: 'Mã Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm theo Mã Đơn Hàng"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 200, marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Người Dùng',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (a, b) => a.userId.localeCompare(b.userId),
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm theo Người Dùng"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 200, marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
        },
        {
            title: 'Tổng Tiền (VNĐ)',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (price) => price.toLocaleString('vi-VN') + ' đ',
        },
        {
            title: 'Ngày Giao Hàng',
            dataIndex: 'shipmentDate',
            key: 'shipmentDate',
            sorter: (a, b) => new Date(a.shipmentDate) - new Date(b.shipmentDate),
            render: (date) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Shipped', value: 'SHIPPED' },
                { text: 'Completed', value: 'COMPLETED' },
            ],
            onFilter: (value, record) => record.status === value,
            sorter: (a, b) => a.status.localeCompare(b.status),
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

    return (
        <>
            <Input
                placeholder="🔍 Nhập từ khóa tìm kiếm..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 300, marginBottom: 16 }}
            />

            <Table
                columns={columns}
                dataSource={filteredData}
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
