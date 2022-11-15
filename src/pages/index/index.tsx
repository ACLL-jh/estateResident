import React, { useState, useEffect, FC } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import './../../assets/css/home/home.css';
import { useNavigate, Outlet } from 'react-router-dom';
import './index.css'
import EchartDom from '../../components/echart/echartDom'
import { Lists, queslist, getcounts } from '../../apis/index/index'
const Home: React.FC = () => {

  const [list, setList] = useState<any>([]);
  const [arr, setUser,] = useState<any>([]);
  const [feed, setfeek,] = useState<any>([])


  const getcountlist = async () => {
    const res: any = await getcounts({})
    console.log(res);
    if (res.errCode === 10000) {
      setList(res.data)

    }
  }

  const getlist = async () => {
    const res = await Lists({})
    console.log(res);
    setUser(res.data.list)
  }

  useEffect(() => {
    getlist()
    feedback()
    getcountlist()
  }, [])
  const feedback = async () => {
    const res = await queslist({})
    console.log(res);
    setfeek(res.data.list)
  }
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
  return (
    <div className='bod'>
      <div className='hed-lef'>
        <div className='hed-lef-top'>
          <div className='lef-top-on'>数据统计</div>
          <div className='lef-top-bo'>
            <div className='lef-top-bo-lef'>
              <div className='on-lef-one'>
                <span>房间总数: </span> <span className='numb'>{list.houses}</span>
              </div>
              <div className='on-lef-one'>
                <span>居民总数: </span> <span className='numb'>{list.users}</span>
              </div>
              <div className='on-lef-one'>
                <span>商店总数: </span> <span className='numb'>{list.stores}</span>
              </div>
            </div>
            <div className='lef-top-bo-rig'>
              <div className='on-lef-one'>
                <span>保修总数</span>
                <span className='numb'>{list.repairs}</span>
                <span>次</span>
              </div>
              <div className='on-lef-one'>
                <span>投诉总数</span>
                <span className='numb'>{list.questions}</span>
                <span>次</span>
              </div>
            </div>
          </div>
        </div>

        <div className='hed-lef-cen'>
          <div className='lef-top-on'>今日数据变动</div>
          <div className='lef-top-bo'>
            <div className='lef-top-bo-lef2'>
              <div className='on-lef-one2'>
                <span>新增维修: </span> <span className='numb'>{list.todayRepairs}</span><span> 处</span>
              </div>
              <div className='on-lef-one2'>
                <span>未处理保修: </span> <span className='numb'>{list.notFinishedRepairs}</span><span> 处</span>
              </div>
              <div className='on-lef-one2'>
                <span>新增投诉: </span> <span className='numb'>{list.todayQuestions}</span><span> 次</span>
              </div>
              <div className='on-lef-one2'>
                <span>未处理投诉: </span> <span className='numb'>{list.notAnswer}</span><span> 次</span>
              </div>
            </div>
          </div>

        </div>

        <div>
          <EchartDom></EchartDom>

        </div>


      </div>
      <div className='hed-rig'>
        <div className='hed-rig-top'>
          <div className='hed-rig-top-to'>待维修处理</div>
          <div className='hed-rig-top-bo'>
            {
              arr.map((item: any, index: number) => (
                <div className='hed-rig-top-li' key={item.id}>
                  <span>{index + 1}、</span><span className='colo'>{item.address}</span><span>: {item.content}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='hed-rig-top2'>
          <div className='hed-rig-top-to'>待投诉处理</div>
          <div className='hed-rig-top-bo'>
            <div className='hed-rig-top-li'>
              {
                feed.map((item: any, index: number) => (
                  <div className='hed-rig-top-li' key={item.id}>
                    <span>{index + 1}、</span><span className='colo'>{item.address}</span><span>: {item.content}</span>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;