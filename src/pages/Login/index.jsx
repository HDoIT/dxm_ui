import React, { useEffect, useState } from 'react';
import './login.scss';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProForm,
    ProFormText,
    ProFormSelect,
    ProFormDatePicker,
    ProFormRadio,
    ProFormCaptcha,
    ProFormCheckbox,
    setAlpha
} from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { Space, Tabs, message, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login, register } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { MetaData } from '../../components/Layout/MetaData';

function Login() {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState('account');
    const [isRegister, setIsRegister] = useState(false); // State để quản lý form đăng ký
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const iconStyles = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSubmit = async (values) => {
        console.log('Login Form Data:', values);
        dispatch(login(values.username, values.password));
    };

    const handleRegisterSubmit = async (values) => {
        console.log('Register Form Data:', values);
        dispatch(register(values));
    };

    useEffect(() => {
        console.log("isAuthen1 ", isAuthenticated);
        if (error) {
            // Xử lý lỗi
        }
        if (isAuthenticated) {
            dispatch(loadUser());
            navigate("/dashboard");
        }
    }, [dispatch, error, isAuthenticated]);

    return (
        <>
            <MetaData title="DXM - LOGIN"></MetaData>
            <ConfigProvider locale={viVN}>

                <div>
                    {!isRegister ? (
                        // Form đăng nhập
                        <LoginForm
                            logo="/assets/images/DMX.png"
                            title="Do Expense Management"
                            subTitle="Đăng nhập"
                            onFinish={handleLoginSubmit}
                            submitter={{
                                searchConfig: {
                                    submitText: 'Đăng nhập',
                                },
                            }}
                            actions={
                                <Space>
                                    VIA
                                    <AlipayCircleOutlined style={iconStyles} />
                                    <TaobaoCircleOutlined style={iconStyles} />
                                    <WeiboCircleOutlined style={iconStyles} />
                                </Space>
                            }
                        >
                            <Tabs
                                centered
                                activeKey={loginType}
                                onChange={(activeKey) => setLoginType(activeKey)}
                                items={[
                                    { key: 'account', label: 'Tài khoản' },
                                    { key: 'phone', label: 'Số điện thoại' },
                                ]}
                            />
                            {loginType === 'account' && (
                                <>
                                    <ProFormText
                                        name="username"
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <UserOutlined className="prefixIcon" />,
                                        }}
                                        placeholder="Tên đăng nhập"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Tên đăng nhập không được để trống',
                                            },
                                        ]}
                                    />
                                    <ProFormText.Password
                                        name="password"
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <LockOutlined className="prefixIcon" />,
                                        }}
                                        placeholder="Mật khẩu"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mật khẩu không được để trống',
                                            },
                                        ]}
                                    />
                                </>
                            )}
                            {loginType === 'phone' && (
                                <>
                                    <ProFormText
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <MobileOutlined className="prefixIcon" />,
                                        }}
                                        name="mobile"
                                        placeholder="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Yêu cầu nhập số điện thoại',
                                            },
                                            {
                                                pattern: /^(0\d{9,10}|84\d{9,10}|\+84\d{9,10})$/,
                                                message: 'Số điện thoại không chính xác!',
                                            },
                                        ]}
                                    />
                                    <ProFormCaptcha
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <LockOutlined className="prefixIcon" />,
                                        }}
                                        captchaProps={{
                                            size: 'large',
                                        }}
                                        placeholder="Mã xác nhận"
                                        captchaTextRender={(timing, count) => {
                                            if (timing) {
                                                return `${count} giây`;
                                            }
                                            return 'Gửi mã';
                                        }}
                                        name="captcha"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mã xác nhận không được để trống',
                                            },
                                        ]}
                                        onGetCaptcha={async () => {
                                            message.success('Mã xác nhận đã được gửi');
                                        }}
                                    />
                                </>
                            )}
                            <div
                                style={{
                                    marginBlockEnd: 24,
                                }}
                            >
                                <ProFormCheckbox noStyle name="autoLogin">
                                    Lưu đăng nhập
                                </ProFormCheckbox>
                                <a
                                    style={{
                                        float: 'right',
                                    }}
                                >
                                    Quên mật khẩu
                                </a>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <a onClick={() => setIsRegister(true)}>Đăng ký tài khoản mới</a>
                            </div>
                        </LoginForm>
                    ) : (
                        // Form đăng ký
                        <div className="register-form-container">
                            <ProForm
                                onFinish={handleRegisterSubmit}
                                submitter={{
                                    searchConfig: {
                                        submitText: 'Đăng ký',
                                        resetText: 'Đặt lại',
                                    },
                                }}
                            >
                                <ProFormText
                                    name="userName"
                                    label="Tên đăng nhập"
                                    placeholder="Nhập tên đăng nhập"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đăng nhập',
                                        },
                                    ]}
                                />
                                <ProFormText
                                    name="fullName"
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ và tên',
                                        },
                                    ]}
                                />
                                <ProFormText
                                    name="email"
                                    label="Email"
                                    placeholder="Nhập email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ',
                                        },
                                    ]}
                                />
                                <ProFormText
                                    name="phone"
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại',
                                        },
                                        {
                                            pattern: /^(0\d{9,10}|84\d{9,10}|\+84\d{9,10})$/,
                                            message: 'Số điện thoại không hợp lệ',
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu',
                                        },
                                    ]}
                                />
                                {/* <ProFormSelect
                name="role"
                label="Vai trò"
                placeholder="Chọn vai trò"
                options={[
                    { label: 'Người dùng', value: 'user' },
                    { label: 'Quản trị viên', value: 'admin' },
                ]}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn vai trò',
                    },
                ]}
            /> */}
                                <ProFormDatePicker
                                    name="dateOfBirth"
                                    label="Ngày sinh"
                                    placeholder="Chọn ngày sinh"
                                    fieldProps={{
                                        format: 'DD/MM/YYYY',
                                    }}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn ngày sinh' },
                                    ]}
                                />
                                <ProFormRadio.Group
                                    name="gender"
                                    label="Giới tính"
                                    options={[
                                        { label: 'Nam', value: 'male' },
                                        { label: 'Nữ', value: 'female' },
                                    ]}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn giới tính',
                                        },
                                    ]}
                                />
                                <ProFormText
                                    name="budget"
                                    label="Ngân sách"
                                    placeholder="Nhập ngân sách"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập ngân sách',
                                        },
                                    ]}
                                />
                                <div style={{ textAlign: 'center' }}>
                                    <a onClick={() => setIsRegister(false)}>Quay lại đăng nhập</a>
                                </div>
                            </ProForm>
                        </div>
                    )}
                </div>
            </ConfigProvider>
        </>

    );
}

export default Login;