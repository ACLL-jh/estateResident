import React, { useEffect, useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Collapse, Form, Input, Cascader, Select, Button, Space } from 'antd';
import { UnorderedListOutlined, SearchOutlined , RightOutlined} from '@ant-design/icons';
import './../../assets/css/house/house.css';
import { useNavigate, Outlet } from 'react-router-dom';
const { Panel } = Collapse;
// 下拉菜单
const handleChange = (value: string) => {
  // console.log(`selected ${value}`);
};
// 横向布局属性
type LayoutType = Parameters<typeof Form>[0]['layout'];
const Home: React.FC = (): JSX.Element => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div>
      <span style={{ color: '#427ff4', fontSize: 15 }}>房间列表</span>
      <Form>
        <Collapse defaultActiveKey={['1']} onChange={onChange}>
          <Panel showArrow={false} header="筛选查询" key="2">
          <Space>
            <SearchOutlined />
          </Space>
            <Form.Item label="楼栋ID:" name="building">
              <Cascader
                style={{ width: 200 }}
                // options={buildings}
                fieldNames={{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }}
                placeholder="请选择"
              />
            </Form.Item>
            <Form.Item label="房间号:" name="price">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="房间类型:" name="begindate">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="房屋面积范围:" name="building">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="房间朝向:" name="building">
              <Select
                style={{ width: 200 }}
                placeholder="请选择"
                onChange={handleChange}
                // options={usertype}
                fieldNames={{ label: 'name', value: 'id' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{ marginLeft: 50, width: 80 }}>
                查询
              </Button> 
            </Form.Item> 
          </Panel>
        </Collapse>
      </Form>
      <Form>
        <div className={'datalist'}>
          <Space>
            <UnorderedListOutlined />
          </Space>
          <span>数据列表</span>
          <Button type="primary" style={{ marginLeft: 50, width: 80 }}>
            添加
          </Button>
          <Button type="primary" style={{ marginLeft: 50, width: 80 }}>
            批量删除
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Home;
