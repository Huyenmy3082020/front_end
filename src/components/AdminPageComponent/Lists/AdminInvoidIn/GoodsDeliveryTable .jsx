import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, Tag } from 'antd';
import { fetchGoodsDeliveries } from '../../../../service/GoodsDeliveryService';
import { formatDateTime, generateDisplayId } from '../../../../ultil';
import { FolderViewOutlined, SearchOutlined } from '@ant-design/icons';
import GoodsDeliveryTableV1 from './Update/GoodDeliveryTableV1';

const GoodsDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goods = await fetchGoodsDeliveries();
                console.log('Fetched goods deliveries:', goods);
                const enrichedData = goods.map((delivery) => ({
                    _id: delivery._id,

                    deliveryDate: delivery.deliveryDate,
                    items: delivery.items.map((item) => ({
                        _id: item._id,
                        ingredientName: item.ingredientsId?.name || 'Unknown',
                        price: item.priceAtPurchase,
                        quantity: item.quantity,
                        ingredientsId: item.ingredientsId?._id || null, // ✅ Thêm ingredientsId
                    })),
                    supplierId: delivery.supplierId,
                    status: 'CREATED',
                }));

                console.log(goods);
                setData(enrichedData);
            } catch (error) {
                console.error('Error fetching goods deliveries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleView = (record) => {
        console.log(record);
        setSelectedDelivery(record);
        setIsModalVisible(true);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Tìm kiếm...`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => confirm()}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Tìm
                </Button>
                <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                    Xóa
                </Button>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    });
    console.log(data);

    const columns = [
        { title: 'Phiếu Nhập', dataIndex: '_id', key: '_id', ...getColumnSearchProps('_id') },

        {
            title: 'Ngày nhập hàng',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (text) => formatDateTime(text),
            sorter: (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate),
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'supplierId',
            key: 'supplierId',
            render: (supplierId) => supplierId.name,
        },

        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color =
                    status === 'Pending'
                        ? 'orange'
                        : status === 'SHIPPED'
                        ? 'green'
                        : status === 'CREATED'
                        ? 'green'
                        : 'default';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button icon={<FolderViewOutlined />} onClick={() => handleView(record)} style={{ marginRight: 8 }}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

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
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`,
                }}
            />

            <Modal
                title="Chi tiết Phiếu Nhập"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                {selectedDelivery && (
                    <GoodsDeliveryTableV1
                        selectedDelivery={selectedDelivery}
                        setSelectedDelivery={setSelectedDelivery}
                        setIsModalVisible={setIsModalVisible}
                    />
                )}
            </Modal>
        </>
    );
};

export default GoodsDeliveryTable;
