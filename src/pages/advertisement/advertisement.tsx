import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuProps, Space } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import './../../assets/css/home/home.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Card, Table } from 'antd';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const Home: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'name',
    },
    {
      title: '位置',
      dataIndex: 'age',
    },
    {
      title: '图片',
      dataIndex: 'address',
    },
    {
      title: '排序',
      dataIndex: 'address',
    },
    {
      title: '状态',
      dataIndex: 'address',
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: (record: number) => (
        <Space size="middle">
          <Button type="primary">修改</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <Card title="图片管理" bordered={false}>
      <div style={{ marginBottom: '20px' }}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item label="位置" name="username">
            <Input />
          </Form.Item>

          <Form.Item
            label="关键字"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};
export default Home;
