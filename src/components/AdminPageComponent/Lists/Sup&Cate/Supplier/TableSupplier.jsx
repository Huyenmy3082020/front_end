import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TableSupplier = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleDelete = (id) => {
        console.log('Xóa nhà cung cấp với ID:', id);
    };

    const columns = [
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Liên hệ',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color={status ? 'green' : 'red'}>{status ? 'Hoạt động' : 'Không hoạt động'}</Tag>,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhà cung cấp này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowSelection={{
                type: 'checkbox',
                selectedRowKeys,
                onChange: handleSelectChange,
            }}
            columns={columns}
            dataSource={data || []}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
        />
    );
};

export default TableSupplier;
