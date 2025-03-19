import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './ChangePassword.css';
import api from '../../../../../src/services/api';
const ChangePassword = (user) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu mới và mật khẩu xác nhận không khớp!');
            return;
        }
        if (currentPassword === newPassword) {
            message.error('Mật khấu mới phải khác với mật khẩu hiện tại!');
            return;
        }
        if (newPassword.length < 8) {
            message.error('Mật khẩu phải dài ít nhất 8 ký tự!');
            return;
        }
        // Xử lý logic thay đổi mật khẩu ở đây
        try {
            await api.changePassword(user?.user?.id, currentPassword, newPassword).then((res) => {
                if (res.status === 200 && res.data?.type === 2) {
                    message.success(res.data?.message);
                } else if (res.status === 200 && res.data?.type === 1) {
                    message.error(res.data?.message);
                }
            })
        } catch (error) {
            message.error("Lỗi chưa xác định, hãy thử lại sau!");
        }


    };

    return (
        <div className="change-password-container">
            <h1>Đổi mật khẩu</h1>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                >
                    <Input.Password
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Nhập mật khẩu hiện tại"
                        iconRender={(visible) =>
                            visible ? <EyeOutlined onClick={() => setShowCurrentPassword(!showCurrentPassword)} /> : 
                            <EyeInvisibleOutlined onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                        { min: 8, message: 'Mật khẩu phải dài ít nhất 8 ký tự!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('currentPassword') !== value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới và mật khẩu hiện tại không được trùng nhau!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        iconRender={(visible) =>
                            visible ? <EyeOutlined onClick={() => setShowNewPassword(!showNewPassword)} /> : 
                            <EyeInvisibleOutlined onClick={() => setShowNewPassword(!showNewPassword)} />
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Nhập mật khẩu mới lần nữa"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới và mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới lần nữa"
                        iconRender={(visible) =>
                            visible ? <EyeOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : 
                            <EyeInvisibleOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        }
                    />
                </Form.Item>

                <p className="password-guidelines">Mật khẩu phải dài ít nhất 8 ký tự</p>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Cập nhật mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;