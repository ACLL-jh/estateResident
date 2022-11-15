import React, { useEffect, useState } from 'react';
import {UnorderedListOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import '../../assets/css/house/house.css'
import { useNavigate, Outlet } from 'react-router-dom';

const House: React.FC = () => {
  return (
    <div>
        <div className='header'>
            <Space>
              <UnorderedListOutlined />
            </Space>
          <span className='datas'>数据列表</span>
        </div>
    </div>
    
  )
};
export default House;
