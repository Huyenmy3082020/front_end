export const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export const encodeIdToHex = (id) => {
    return Buffer.from(id).toString('hex').toUpperCase(); // Chuyển thành hex, chữ hoa
};

export const decodeHexToId = (hex) => {
    return Buffer.from(hex, 'hex').toString(); // Chuyển ngược từ hex về string
};
