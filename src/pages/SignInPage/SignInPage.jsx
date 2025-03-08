import { Col, message, Row } from 'antd';
//import styles from '../../pages/SignUpPage/SignUpPage.module.scss';
import styles from '../../pages/SignInPage/SignInPage.module.scss';
import slider1 from '../../assets/slider/slider1.png';
import slider2 from '../../assets/slider/slider2.png';
import slider3 from '../../assets/slider/slider3.png';
import slider4 from '../../assets/slider/slider4.png';
import slider5 from '../../assets/slider/slider5.png';
import { jwtDecode } from 'jwt-decode';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { useState } from 'react';
import * as UserService from '../../service/Userservice';
import { logout, updateUser } from '../../redux/slides/UserSlideV1';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Productservice from '../../service/Productservice';
import { addProductAll, addProductv1 } from '../../redux/slides/ProductSlide';
import { Eye, EyeOff } from 'lucide-react';
function SignInPage() {
    const [email, setEmmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const getDetailUser = async () => {
        try {
            const res = await UserService.getDetailUser();
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const dataLogin = await UserService.loginUser({ email, password });
            const token = dataLogin.access_token;
            message.success('Đăng nhập thành công');
            localStorage.setItem('access_token', token);
            const res = await getDetailUser();
            dispatch(updateUser(res));
            navigate('/');

            const ress = await Productservice.getAllIngredientV1();
            dispatch(addProductAll(ress.data));
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

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
                            <h1 className={styles.registerName}>Đăng nhập Pancake ID</h1>
                            <span className={styles.notiRegis}>
                                Sử dụng email và password để truy cập vào tài khoản của bạn.
                            </span>
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Email/ SĐT/ Username</div>
                                <input
                                    type="text"
                                    className={styles.wrapperInfoInput}
                                    value={email}
                                    onChange={(e) => {
                                        setEmmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Mật khẩu</div>
                                <div className={styles.wrapperInputContainer}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={styles.wrapperInfoInput}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePasswordBtn}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.wrapperInfo}>
                                <button className={styles.wrapperButton} onClick={handleSubmit}>
                                    Đăng nhập Pancake ID
                                </button>
                            </div>
                            <div className={styles.wrapperInfo}>
                                <div>
                                    <button className={styles.wrapperButtonGoogle}>
                                        <img
                                            src="data:image/png;base64,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"
                                            width={40}
                                        ></img>
                                        <span style={{ marginLeft: '150px' }}>Đăng ký bằng google</span>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.wrapperInfo}>
                                <div>
                                    <button className={styles.wrapperButtonGoogle}>
                                        <img
                                            src="data:image/png;base64,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"
                                            width={40}
                                        ></img>
                                        <span style={{ marginLeft: '150px' }}>Đăng ký bằng apple</span>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.wrapperInfo}>
                                <h3 style={{ marginTop: '24px', fontSize: '24x' }}>
                                    Bạn chưa có tài khoản?
                                    <a style={{ color: '#2D65C3' }} href="/sign-up">
                                        Đăng kí ngay
                                    </a>
                                </h3>
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

export default SignInPage;
