import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, FolderViewOutlined } from '@ant-design/icons';

const TableSupplier = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
            dataIndex: 'status', // Đổi từ isActive thành status
            key: 'status',
            render: (status) => (status ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Không hoạt động</Tag>),
        },

        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhà cung cấp này?"
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

    const handleEdit = (supplier) => {
        console.log('Xem nhà cung cấp:', supplier);
    };

    const handleDelete = (id) => {
        console.log('Xóa nhà cung cấp với ID:', id);
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
                dataSource={data || []} // Tránh lỗi nếu data là null hoặc undefined
                rowKey="_id"
                scroll={{ x: 'max-content' }} // kích hoạt cuộn ngang
            />
        </div>
    );
};

export default TableSupplier;
