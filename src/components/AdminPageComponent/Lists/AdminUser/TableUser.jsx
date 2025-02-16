import React, { useEffect, useState } from 'react';
import { Divider, Radio, Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, FolderViewOutlined } from '@ant-design/icons';
const TableUser = ({ data }) => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const columns = () => [
        {
            title: 'RoleName',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.length - b.role.length,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button icon={<FolderViewOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        View
                    </Button>
                    <Popconfirm title="Are you sure you want to delete this item?">
                        <Button
                            style={{
                                background: '#ffffff',
                                borderColor: ' #d9d9d9',
                            }}
                            icon={<DeleteOutlined />}
                            type="danger"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleEdit = (user) => {
        console.log(user?.id);
    };

    const handleSelectChange = (selectedKeys) => {
        console.log('Selected Row Keys:', selectedKeys);
        setSelectedRowKeys(selectedKeys);
    };

    return (
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns()}
                dataSource={data}
                rowKey="_id"
                scroll={{ x: 'max-content' }} //kích hoạt cuộn ngang
            />
        </div>
    );
};

export default TableUser;