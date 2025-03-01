import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import * as ProductService from '../../service/Productservice';
import { useDispatch } from 'react-redux';
import { addProduct, addProductAll, addProductv1, upsertProduct } from '../../redux/slides/ProductSlide';

const ModalComponent = ({
    isModalOpen,
    handleCancel,
    onFinish,
    onFinishFailed,
    categories,
    suppliers,
    setProducts,
}) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        onFinish(values);
        console.log(values);
        form.resetFields();
        try {
            const res = await ProductService.createProduct(values);
            console.log(res);
            console.log(res.ingredient);
            dispatch(addProduct(res.ingredient));
            message.success('Tạo sản phẩm thành công');
        } catch (err) {
            if (err.status === 401) {
                message.error('Bạn không có quyền tạo mới sản phẩm');
            }
        }
    };
    const unitOptions = ['ml', 'l', 'g', 'kg', 'cái', 'hộp', 'gói', 'chai', 'ly'];

    return (
        <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    label="Danh mục sản phẩm"
                    name="category"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
                >
                    <Select placeholder="Chọn danh mục sản phẩm">
                        {categories.map((category) => (
                            <Select.Option key={category._id} value={category.name}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                    <Input placeholder="Nhập giá" />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                >
                    <Input placeholder="Nhập mô tả sản phẩm" />
                </Form.Item>
                <Form.Item
                    label="Đơn vị"
                    name="unit"
                    rules={[{ required: true, message: 'Vui lòng chọn đơn vị của sản phẩm!' }]}
                >
                    <Select placeholder="Chọn đơn vị">
                        {unitOptions.map((unit) => (
                            <Select.Option key={unit} value={unit}>
                                {unit}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                ;
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalComponent;
