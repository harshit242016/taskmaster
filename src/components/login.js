import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const response = await axios.post(`${serverUrl}/api/authenticate`, values);
      const { token } = response.data;
      login(token);
      navigate(0); // Redirect to dashboard page
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300 }}
      >
        <h1 style={{ marginBottom: 24 }}>Login</h1>
        {error && <Alert message={error} type="error" style={{ marginBottom: 16 }} />}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
