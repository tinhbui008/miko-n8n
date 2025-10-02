'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Divider, Typography, message } from 'antd';
import {
    MailOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    GoogleOutlined
} from '@ant-design/icons';
import styles from './LoginPage.module.css';
import MikoLogo from '@/components/ui/logo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Text, Link } = Typography;

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                message.success('Đăng nhập thành công!');

                if (typeof window !== 'undefined') {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }
                    if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                    }
                }

                router.push('/dashboard');
            } else {
                message.error(data.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra. Vui lòng thử lại!');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            console.log(`Login with ${provider}`);
            // TODO: Xử lý đăng nhập social với API ở đây
            message.info(`Đang đăng nhập với ${provider}...`);
        } catch (error) {
            message.error(`Đăng nhập ${provider} thất bại!`);
            console.error(`${provider} login error:`, error);
        }
    };

    const handleForgotPassword = () => {
        // TODO: Xử lý quên mật khẩu
        message.info('Chức năng quên mật khẩu đang được phát triển');
    };

    const handleSignUp = () => {
        // TODO: Chuyển đến trang đăng ký
        message.info('Chuyển đến trang đăng ký');
    };

    return (
        <div className={styles.container}>
            <div style={{
                zIndex: 9, position: 'relative', boxShadow: 'none',
                maxWidth: '471px', padding: '40px'
            }} className={styles.loginBox}>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <div className="mb-6 flex justify-center">
                        <MikoLogo width={200} className="drop-shadow-sm m-auto" />
                    </div>
                </div>

                <Form
                    form={form}
                    onFinish={handleLogin}
                    layout="vertical"
                    requiredMark={false}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                    // rules={[
                    //     { required: true, message: 'Vui lòng nhập email!' },
                    //     { type: 'email', message: 'Email không hợp lệ!' }
                    // ]}
                    >
                        <Input
                            prefix={<MailOutlined className={styles.inputIcon} />}
                            placeholder="Email"
                            size="large"
                            className={`${styles.input}`}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                    // rules={[
                    //     { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    //     { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                    // ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className={styles.inputIcon} />}
                            placeholder="Password"
                            size="large"
                            className={`${styles.input}`}
                            iconRender={(visible) => (
                                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                            )}
                        />
                    </Form.Item>

                    <Form.Item className={styles.submitButtonItem}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            block
                            className={styles.submitButton}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                {/* Divider */}
                <Divider className={styles.divider}>
                    OR
                </Divider>

                {/* Social Login Buttons */}
                <div className={styles.socialButtonsContainer}>
                    <Button
                        size="large"
                        block
                        onClick={() => handleSocialLogin('Google')}
                        className={styles.socialButton}
                    >
                        <Image alt='google-icon' src="/images/google-icon.png" width={30} height={30} />
                        <span>Google</span>
                    </Button>

                    <Button
                        size="large"
                        block
                        onClick={() => handleSocialLogin('Microsoft')}
                        className={styles.socialButton}
                    >
                        {/* <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
                            <rect width="11" height="11" fill="#F25022" />
                            <rect x="12" width="11" height="11" fill="#7FBA00" />
                            <rect y="12" width="11" height="11" fill="#00A4EF" />
                            <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                        </svg> */}
                        <Image alt='microsoft-icon' src="/images/microsoft-icon.png" width={30} height={30} />
                        <span>Microsoft</span>
                    </Button>
                </div>

                {/* Footer Links */}
                <div className={styles.footerLinks}>
                    <Text className={styles.footerText}>
                        <Link
                            href="#"
                            className={styles.link}
                            style={{ color: '#39AEA1' }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleForgotPassword();
                            }}
                        >
                            Quên mật khẩu?
                        </Link>
                    </Text>
                    <br />
                    <Text className={styles.footerTextMargin} style={{ color: '#999999' }}>
                        Don't have an account?{' '}
                        <Link
                            href="#"
                            className={styles.link}
                            style={{ color: '#39AEA1' }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSignUp();
                            }}
                        >
                            Đăng ký ngay
                        </Link>
                    </Text>
                </div>
            </div>

            <svg
                className={styles.overlay}
                width="1920"
                height="545"
                viewBox="0 0 1920 545"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_f_12052_1733)">
                    <path
                        d="M-584 683C-154.36 379.314 375.619 200 949 200C1522.38 200 2052.36 379.314 2482 683H-584Z"
                        fill="url(#paint0_radial_12052_1733)"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_f_12052_1733"
                        x="-784"
                        y="0"
                        width="3466"
                        height="883"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_12052_1733" />
                    </filter>
                    <radialGradient
                        id="paint0_radial_12052_1733"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(949 2705.95) rotate(90) scale(2505.95 2596.93)"
                    >
                        <stop offset="0.836538" stopColor="#B5F0E9" />
                        <stop offset="1" stopColor="#EDFBFA" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
}