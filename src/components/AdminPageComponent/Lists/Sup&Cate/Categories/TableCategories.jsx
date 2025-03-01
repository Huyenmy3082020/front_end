import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, FolderViewOutlined } from '@ant-design/icons';

const TableCategories = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) =>
                isActive ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Không hoạt động</Tag>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button icon={<FolderViewOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Xem
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button icon={<DeleteOutlined />} type="danger">
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleEdit = (category) => {
        console.log('Xem danh mục:', category);
    };

    const handleDelete = (id) => {
        console.log('Xóa danh mục với ID:', id);
    };

    return (
        <div>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns}
                dataSource={data}
                rowKey="_id"
                scroll={{ x: 'max-content' }} // kích hoạt cuộn ngang
            />
        </div>
    );
};

export default TableCategories;
