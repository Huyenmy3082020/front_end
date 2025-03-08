import React, { useEffect, useState } from 'react';
import { Divider, Radio, Table, Button, Popconfirm, Modal, Form, Input, Tooltip, Tag } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import * as Productservice from '../../service/Productservice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProduct, upsertProduct } from '../../redux/slides/ProductSlide';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '../../ultil';

//

const TableComponent = ({ data, isActionEdit }) => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [form] = Form.useForm();

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
    const columns = () => [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => formatVND(price),
            sorter: (a, b) => a.price - b.price,
        },

        {
            title: 'Trạng thái tồn kho',
            dataIndex: 'statusList',
            key: 'statusList',
            render: (statusList) => {
                if (!statusList || statusList.length === 0 || statusList.includes('Không có dữ liệu')) {
                    return (
                        <Tooltip title="Không có dữ liệu">
                            <Tag color="gray">Không có dữ liệu</Tag>
                        </Tooltip>
                    );
                }

                if (statusList.includes('out-of-stock')) {
                    return (
                        <Tooltip title="Hết hàng">
                            <Tag color="red">Out-stock</Tag>
                        </Tooltip>
                    );
                }

                return (
                    <Tooltip title="Còn hàng">
                        <Tag color="green">In-stock</Tag>
                    </Tooltip>
                );
            },
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'totalStock',
            key: 'totalStock',
            render: (totalStock) => totalStock ?? '0',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'inventoryUnit',
            render: (unit) => unit ?? 'Không có dữ liệu',
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
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

    const handleOk = () => {
        form.resetFields();
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };
    const dispatch = useDispatch();

    const handleEdit = (product) => {
        console.log('Edit product:', product);

        setCurrentProduct(product);
        form.resetFields();
        form.setFieldsValue(product);

        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            console.log('Delete product:', id);

            const res = await Productservice.deleteProduct(id);
            dispatch(deleteProduct(id));
            console.log(res);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const onFinish = async (values) => {
        try {
            if (currentProduct) {
                const updatedProduct = await Productservice.updateProduct(currentProduct._id, values);
                console.log(updatedProduct);
                dispatch(updateProduct(updatedProduct.ingredient));
                form.resetFields();
                setIsModalOpen(false);
                setCurrentProduct(null);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                    setSelectedRowKeys([]);
                }}
                value={selectionType}
            ></Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns()}
                dataSource={data}
                rowKey="_id"
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`,
                }}
            />

            <Modal
                title={currentProduct ? 'Edit Product' : 'Create Product'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="productForm"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={currentProduct}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name Product"
                        name="name"
                        rules={[{ required: true, message: 'Please input your product name!' }]}
                    >
                        <Input placeholder="Enter name product" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input price!' },
                            { pattern: /^[0-9]+$/, message: 'Vui lòng nhập số!' },
                        ]}
                    >
                        <Input placeholder="Enter price" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input placeholder="Enter description" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableComponent;
