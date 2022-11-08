import React from 'react';
import { Card, Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './../../assets/css/login/login.css';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Login } from './../../apis/login/login';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const res: any = await Login(values);
    if (res.errCode === 10000) {
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('routes', JSON.stringify(res.data.menu));
      navigate('/index');
      message.success('登录成功');
    } else {
      message.error(res.errMag);
    }
    console.log(res);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      className="site-card-border-less-wrapper"
      style={{ background: '#f7f5f6' }}
    >
      <div className="header">
        <img
          src={require('./../../assets/images/loginlog.png')}
          className="simg"
          alt=""
        />
      </div>
      <div className="logios">
        <img
          src={require('../../assets/images/backlog.jpg')}
          alt=""
          className="images"
        />
        <div className="logForm">
          <h2>账号登录</h2>
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号 ！' }]}
            >
              <Input
                className="inpu"
                prefix={<UserOutlined />}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="pass"
              rules={[{ required: true, message: '请输入密码 ！' }]}
            >
              <Input.Password
                className="inpu"
                prefix={<UnlockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <div style={{ float: 'right', color: '#3a78dd' }}>忘记密码？</div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
