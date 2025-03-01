export const validateForm = (email, password, confirmPassword) => {
    let errors = {};

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Email không đúng định dạng.';
    }

    // Kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password) {
        errors.password = 'Mật khẩu không được để trống.';
    } else if (password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    } else if (!passwordRegex.test(password)) {
        errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt.';
    }

    // Kiểm tra xác nhận mật khẩu
    if (!confirmPassword) {
        errors.confirmPassword = 'Vui lòng nhập lại mật khẩu.';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    return errors;
};
