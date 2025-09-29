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

const { Text, Link } = Typography;

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            console.log('Login values:', values);
            // TODO: Xử lý đăng nhập với API ở đây
            // const response = await loginAPI(values);

            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            message.success('Đăng nhập thành công!');
            // Router.push('/dashboard'); // Chuyển hướng sau khi đăng nhập
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng thử lại!');
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
            <div className={styles.loginBox}>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <MikoLogo  />
                </div>

                {/* Login Form */}
                <Form
                    form={form}
                    onFinish={handleLogin}
                    layout="vertical"
                    requiredMark={false}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className={styles.inputIcon} />}
                            placeholder="Email"
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className={styles.inputIcon} />}
                            placeholder="Mật khẩu"
                            size="large"
                            className={styles.input}
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
                        <GoogleOutlined className={styles.googleIcon} />
                        <span>Google</span>
                    </Button>

                    <Button
                        size="large"
                        block
                        onClick={() => handleSocialLogin('Microsoft')}
                        className={styles.socialButton}
                    >
                        <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
                            <rect width="11" height="11" fill="#F25022" />
                            <rect x="12" width="11" height="11" fill="#7FBA00" />
                            <rect y="12" width="11" height="11" fill="#00A4EF" />
                            <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                        </svg>
                        <span>Microsoft</span>
                    </Button>
                </div>

                {/* Footer Links */}
                <div className={styles.footerLinks}>
                    <Text className={styles.footerText}>
                        <Link
                            href="#"
                            className={styles.link}
                            onClick={(e) => {
                                e.preventDefault();
                                handleForgotPassword();
                            }}
                        >
                            Quên mật khẩu?
                        </Link>
                    </Text>
                    <br />
                    <Text className={styles.footerTextMargin}>
                        Chưa có tài khoản?{' '}
                        <Link
                            href="#"
                            className={styles.link}
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
        </div>
    );
}