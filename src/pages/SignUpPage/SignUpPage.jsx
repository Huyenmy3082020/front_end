import { Alert, Col, Row } from 'antd';
import styles from '../../pages/SignUpPage/SignUpPage.module.scss';
import slider1 from '../../assets/slider/slider1.png';
import slider2 from '../../assets/slider/slider2.png';
import slider3 from '../../assets/slider/slider3.png';
import slider4 from '../../assets/slider/slider4.png';
import slider5 from '../../assets/slider/slider5.png';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { useState } from 'react';
import { validateForm } from '../../Validate/validate';

import * as UserService from '../../service/Userservice';
function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [errorsserver, setErrorsserver] = useState(false);
    const handleSubmit = async () => {
        const validationErrors = validateForm(email, password, confirmPassword);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const register = await UserService.signUpUser({ email, password, confirmPassword });
            console.log('Đăng ký thành công:', register);
        } catch (error) {
            if (error.response) {
                setErrorsserver(true);
            }
        }
    };
    if (errorsserver === true) {
        console.log('Đăng ký thất bại');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperList}>
                <Row>
                    <Col xs={24} sm={24} md={11}>
                        <div className={styles.wrapperItem1}>
                            <div>
                                <div className={styles.formItem}>
                                    <div>
                                        <img
                                            src="https://account.pancake.vn/static/images/pancake_logo_3.png"
                                            width="200"
                                            height="50"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.lag}>
                                        <img
                                            src="https://account.pancake.vn/static/images/country_flags/vi.svg"
                                            alt=""
                                            width="19px"
                                            height="19px"
                                            className={styles.vietnam}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 256 256"
                                        >
                                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className={styles.registerName}>Đăng ký</h1>
                            <span className={styles.notiRegis}>Điền thông tin tài khoản để tạo tài khoản Pancake</span>
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Email</div>
                                <input
                                    type="text"
                                    className={styles.wrapperInfoInput}
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Mật khẩu</div>
                                <input
                                    type="password"
                                    className={styles.wrapperInfoInput}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className={styles.error}>{errors.password}</p>}
                            </div>
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Xác nhận mật khẩu</div>
                                <input
                                    type="password"
                                    className={styles.wrapperInfoInput}
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                            </div>
                            <div className={styles.wrapperInfo}>
                                <button className={styles.wrapperButton} onClick={handleSubmit}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={13}>
                        <div className={styles.wrapperItem}>
                            <SliderComponent arrImg={[slider1, slider2, slider3, slider4, slider5]} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SignUpPage;
