import React, { useEffect, useState } from 'react';
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
  const [isShow, setisShow] = useState<boolean>(false);
  const [rou, setrou] = useState<any>(sessionStorage.getItem('routes'));
  const [routes, setroutes] = useState<any>(JSON.parse(rou));
  const [urs, seturl] = useState<string>(
    sessionStorage.getItem('url') as string
  );
  const NavHome = (text: string) => {
    return () => {
      if (window.location.href.split('/')[3] === 'index') {
        setisShow(false);
      } else {
        setisShow(true);
        let socr: any = routes.map((item: any) => {
          item.checked = 0;
          return item;
        });
        setroutes(socr);
        sessionStorage.setItem('routes', JSON.stringify(socr));
      }

      navigate(text);
      sessionStorage.setItem('url', 'index');
    };
  };
  const NavClik = (ites: any) => {
    return () => {
      let socr: any = routes.map((item: any) => {
        if (item.id === ites.id) {
          item.checked = 1;
        } else {
          item.checked = 0;
        }
        return item;
      });
      // console.log(socr);
      sessionStorage.setItem('routes', JSON.stringify(socr));
      setroutes(socr);
      // console.log(routes);
      sessionStorage.setItem('url', ites.url);
      navigate(ites.url);
    };
  };
  useEffect(() => {
    if (window.location.href.split('/')[3] === 'index') {
      setisShow(true);
    } else {
      setisShow(false);
    }
  });
  useEffect(() => {
    navigate(urs);
  }, []);
  return (
    <Layout>
      <Header>
        <div className="headerLeft">
          <div className="headerLeftImg">
            <img
              src="http://www.eshareedu.cn/dist/img/logo.1296c0b5.jpg"
              style={{ width: '130px', height: '30px' }}
              alt=""
            />
          </div>
          <div className="headerLeftHome" onClick={NavHome('/index')}>
            <span
              className={
                isShow ? 'iconfont icon-shouye1' : 'iconfont icon-shouye'
              }
            ></span>
            <div
              className={isShow ? 'show' : 'name'}
              style={{ fontSize: '14px', paddingBottom: '0px' }}
            >
              首页
            </div>
          </div>
          <div style={{ marginLeft: '20px' }}>PPP,周末的晚霞,别有一番风景</div>
        </div>
        <div className="headerRight">
          <div className="setup">
            <span className="iconfont icon-shezhi"></span>
            <span style={{ marginLeft: '5px' }}>设置 </span>
          </div>
          <div className="goLogin">
            <span className="iconfont icon-tuichu1"></span>
            <span style={{ marginLeft: '5px' }}>退出登录</span>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width={95}>
          <div className="nav" style={{ listStyle: 'none' }}>
            {routes.map(
              (item: any) =>
                item.postion === 'left' && (
                  <div
                    className={item.checked === 0 ? 'lis' : 'list'}
                    key={item.id}
                    onClick={NavClik(item)}
                  >
                    <span className={'iconfont ' + item.ico}></span>
                    <span className="spanme">{item.name.substring(0, 2)}</span>
                  </div>
                )
            )}
          </div>
        </Sider>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
