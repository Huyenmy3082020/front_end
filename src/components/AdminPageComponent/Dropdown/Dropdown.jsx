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
import {
    CheckOutlined,
    CloseOutlined,
    DollarCircleOutlined,
    FileTextOutlined,
    SaveOutlined,
    SendOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
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

    useEffect(() => {
        let total = selectedProduct.reduce((acc, product) => acc + product.quantity * product.price, 0);
        setTotalPrice(formatVND(total));
        handleTotalPrice(total);
    }, [selectedProduct]);

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
                status: 'Pending',
            })),
            supplierName: selectedsupplier,
            deliveryAddress,
            totalPrice: selectedProduct.reduce(
                (acc, product) => acc + (product.quantity || 1) * (product.price || 0),
                0,
            ),
        };
        if (label === 'Gửi hàng') {
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
        } else if (label === 'Xác nhận đơn hàng') {
            message.info('Đang gửi hàng...');
           
            try {
                await OrderService.ExportV1(data);
                message.success('Xác nhận đơn hàng thành công!');
                setDeliveryAddress('');
                setIsActionImport(true);
            } catch (error) {
                message.error('Vui long chon nha cung cap')
            }
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span>
                    <CheckOutlined style={{ marginRight: 8 }} />
                    Xác nhận đơn hàng
                </span>
            ),
            onClick: () => handleMenuClick('Xác nhận đơn hàng'),
        },
        {
            key: '2',
            label: (
                <span>
                    <SendOutlined style={{ marginRight: 8 }} />
                    Gửi hàng
                </span>
            ),
            onClick: () => handleMenuClick('Gửi hàng'),
        },
        
    ];

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items }} placement="topRight">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button icon={<SaveOutlined />}>Lưu</Button>
                    </div>
                </Dropdown>
            </Space>
        </Space>
    );
};

export default DropdownPage;
