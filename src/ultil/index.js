export const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export const generateDisplayId = (id) => {
    return `HD${id.slice(-6).toUpperCase()}`;
};
export const decodeDisplayId = (displayId, originalIdList) => {
    const suffix = displayId.slice(2).toLowerCase(); // Bỏ "HD" và chuyển về chữ thường
    return originalIdList.find(id => id.endsWith(suffix)) || null;
};