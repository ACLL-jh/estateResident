import React, { useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import './../../assets/css/home/home.css';
import { useNavigate, Outlet } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [isShow, setisShow] = useState<boolean>(true);
  const NavHome = (text: string) => {
    return () => {
      console.log(window.location.href.split('/').length);
      if (window.location.href.split('/').length > 4) {
        setisShow(false);
      } else {
        setisShow(true);
      }

      navigate(text);
    };
  };
  return <div>首页</div>;
};
export default Home;
