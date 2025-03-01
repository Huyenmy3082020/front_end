import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Space, message } from 'antd';
import * as OrderService from '../../../service/OrderService';
import { formatVND } from '../../../ultil/index';
import { useDispatch, useSelector } from 'react-redux';
import * as InventoryService from '../../../service/InventoryService.js';
import {
    decreaseProductQuantity,
    decreaseStock,
    increaseStock,
    updateProduct,
    updateProductStatus,
    updateProductStock,
} from '../../../redux/slides/ProductSlide.js';
const DropdownPage = ({
    selectedsupplier,
    selectedProduct,
    handleTotalPrice,
    isActionImport,
    setIsActionImport,
    deliveryAddress,
    setDeliveryAddress,
}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector((state) => state.userv1);

    console.log(selectedProduct);
    useEffect(() => {
        let total = selectedProduct.reduce((acc, product) => acc + product.quantity * product.price, 0);
        setTotalPrice(formatVND(total));
        handleTotalPrice(total);
    }, [selectedProduct]);

    selectedProduct.map((product) => console.log(product._id));

    const dispatch = useDispatch();

    const handleMenuClick = async (label) => {
        if (!selectedProduct || selectedProduct.length === 0) {
            message.warning('Vui lòng chọn ít nhất một sản phẩm!');
            return;
        }
        const data = {
            userId: user._id,
            items: selectedProduct.map((product) => ({
                ingredientsId: product._id,
                ingredientNameAtPurchase: product.name || 'Không xác định',
                quantity: product.quantity || 1,
                priceAtPurchase: product.price || 0,
                status: 'pending',
            })),
            supplierName: selectedsupplier,
            deliveryAddress,
            totalPrice: selectedProduct.reduce(
                (acc, product) => acc + (product.quantity || 1) * (product.price || 0),
                0,
            ),
        };
        if (label === 'Nhập hàng') {
            try {
                console.log(data.supplierName);
                if (data.supplierName === '') {
                    message.error('Vui lòng chọn nhà cung cấp!');
                    return;
                }
                await OrderService.createOrder(data);
                message.success('Nhập hàng thành công!');

                if (selectedProduct && selectedProduct.length > 0) {
                    selectedProduct.forEach((product) => {
                        dispatch(increaseStock(product));
                        dispatch(updateProductStatus(product));
                    });
                }

                setDeliveryAddress('');
                setIsActionImport(true);
            } catch (error) {
                console.error('Lỗi tạo đơn hàng:', error);
                message.error('Tạo đơn hàng thất bại');
            }
        } else if (label === 'Gửi hàng') {
            message.info('Đang gửi hàng...');
            try {
                await OrderService.Export(data);
                message.success('Gửi hàng thành công!');
                selectedProduct.map((product) => {
                    dispatch(decreaseStock(product));
                    dispatch(updateProductStatus(product));
                });

                setDeliveryAddress('');
                setIsActionImport(true);
            } catch (error) {}
        }
    };

    const items = [
        {
            key: '1',
            label: 'Xác nhận đơn hàng',
            onClick: () => handleMenuClick('Xác nhận đơn hàng'),
        },
        {
            key: '2',
            label: 'Gửi hàng',
            onClick: () => handleMenuClick('Gửi hàng'),
        },
        {
            key: '3',
            label: 'Nhập hàng',
            onClick: () => handleMenuClick('Nhập hàng'),
        },
    ];

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items }} placement="topRight">
                    <div>
                        <Button>Lưu</Button>
                    </div>
                </Dropdown>
            </Space>
        </Space>
    );
};

export default DropdownPage;
