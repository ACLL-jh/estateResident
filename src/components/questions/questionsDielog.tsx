import React, { useEffect, useState } from 'react';
import './../../assets/css/questions/questionsLog.css';
import './../../assets/css/home/home.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Modal, Steps, Image } from 'antd';
const QusetLog: React.FC<any> = (props: any) => {
  /*   const getList = async() => {
    const res:any = await  
  }; */ console.log(props);

  useEffect(() => {
    document
      .querySelectorAll('.ant-steps-item-active .ant-steps-icon')
      .forEach((item: any) => {
        item.innerText = '';
      });
    document
      .querySelectorAll('.ant-steps-item-wait .ant-steps-icon')
      .forEach((item: any) => {
        item.innerText = '';
      });
  }, []);
  console.log(props.modelO);

  const [current, setCurrent] = useState<number>(props.modelO.state);
  return (
    <Modal
      title="详情"
      open={props.isShow}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <div className="headerModel">
        <div>
          提交人: {props.modelO.username ? props.modelO.username : '匿名'}
        </div>
        <div>维修地址:{props.modelO.address}</div>
        <div>手机号:{props.modelO.tel}</div>
        <div>
          问题类型:{' '}
          <span style={{ color: '#1890ff' }}>{props.modelO.typename}</span>
        </div>
        <div>问题描述: {props.modelO.content}</div>
      </div>
      <div className="Modelimg">
        {props.modelO.images.map((item: any) => (
          <div key={item.id}>
            <Image
              src={'http://estate.eshareedu.cn/estate/upload/' + item.url}
              alt=""
              className="images"
            />
          </div>
        ))}
      </div>
      <Steps
        type="navigation"
        current={current}
        items={[
          {
            title: '等待处理',
          },
          {
            title: '正在处理',
          },
          {
            title: '处理完成',
          },
          {
            title: '已评价',
          },
        ]}
      />
    </Modal>
  );
};
export default QusetLog;
