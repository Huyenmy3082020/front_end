import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined, FolderViewOutlined } from '@ant-design/icons';

const TableCategories = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleEdit = (category) => {
        console.log('Edit:', category);
    };

    const handleDelete = (id) => {
        console.log('Delete:', id);
    };

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Hoạt động' : 'Không hoạt động'}</Tag>
            ),
            filters: [
                { text: 'Hoạt động', value: true },
                { text: 'Không hoạt động', value: false },
            ],
            onFilter: (value, record) => record.isActive === value,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
            render: (date) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<FolderViewOutlined />} onClick={() => handleEdit(record)}>
                        Xem
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => handleDelete(record._id)}
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
            bordered
            rowSelection={{
                type: 'checkbox',
                selectedRowKeys,
                onChange: handleSelectChange,
            }}
            columns={columns}
            dataSource={data}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} danh mục`,
            }}
        />
    );
};

export default TableCategories;
