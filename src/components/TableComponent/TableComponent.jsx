import React, { useEffect, useState } from 'react';
import { Divider, Radio, Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import * as Productservice from '../../service/Productservice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/slides/ProductSlide';

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

    const columns = () => [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'category',
            render: (categoryId) => categoryId?.name || 'N/A',
        },
        {
            title: 'Trạng thái tồn kho',
            dataIndex: 'inventory',
            key: 'inventoryStatus',
            render: (inventory) => inventory?.statusList?.join(', ') || 'Không có dữ liệu',
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'inventory',
            key: 'inventoryStock',
            render: (inventory) => inventory?.totalStock ?? 'Không có dữ liệu',
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

    // const handleEdit = (id, values) => {
    //     // lay dc id
    //     console.log('Edit product:', id);
    //     try {
    //         // goi api sua
    //     } catch (error) {}
    //     setCurrentProduct(product);
    //     setIsModalOpen(true);
    // };

    const handleEdit = (product) => {
        console.log('Edit product:', product);
        setCurrentProduct(product); // Cập nhật sản phẩm đang chỉnh sửa
        form.setFieldsValue(product); // Gán dữ liệu vào form
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };
    const dispatch = useDispatch();

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

    // const onFinish = (values) => {};
    const onFinish = async (values) => {
        try {
            if (currentProduct) {
                // Gọi API updateProduct
                const updatedProduct = await Productservice.updateProduct(currentProduct._id, values);
                console.log('Product updated:', updatedProduct);
            }
            form.resetFields(); // Reset form sau khi cập nhật xong
            setIsModalOpen(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (selectedKeys) => {
        console.log('Selected Row Keys:', selectedKeys);
        setSelectedRowKeys(selectedKeys);
    };

    const product = useSelector((state) => state.product.products);
    console.log('Product:', product);
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
            />
            <Button type="primary">Xoa tat</Button>

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

                    {/* <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image URL!' }]}
                    >
                        <Input placeholder="Enter image URL" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type!' }]}
                    >
                        <Input placeholder="Enter product type" />
                    </Form.Item> */}

                    {/* <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <Input placeholder="Enter price" />
                    </Form.Item> */}

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

                    {/* <Form.Item
                        label="Count In Stock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input count in stock!' }]}
                    >
                        <Input placeholder="Enter count in stock" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input rating!' }]}
                    >
                        <Input placeholder="Enter rating" />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input discount!' }]}
                    >
                        <Input placeholder="Enter discount" />
                    </Form.Item>

                    <Form.Item
                        label="Selled"
                        name="selled"
                        rules={[{ required: true, message: 'Please input selled!' }]}
                    >
                        <Input placeholder="Enter selled" />
                    </Form.Item> */}

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input placeholder="Enter description" />
                    </Form.Item>

                    {/* <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please input Category!' }]}
                    >
                        <Input placeholder="Enter Category" />
                    </Form.Item> */}
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
