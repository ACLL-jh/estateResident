import React from 'react';
import { Card, Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './../../assets/css/login/login.css';
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
    }
    console.log(res);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      className="site-card-border-less-wrapper"
      style={{ background: '#c4c4c4' }}
    >
      <img
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        alt=""
        className="images"
      />
      <Card title="登录" bordered={false} className="crad">
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
            label="账号："
            name="username"
            rules={[{ required: true, message: '请输入账号 ！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码："
            name="pass"
            rules={[{ required: true, message: '请输入密码 ！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
