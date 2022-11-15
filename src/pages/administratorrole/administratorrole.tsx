import React, { useEffect, useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Table,Modal,message } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import './../../assets/css/administratorrole/administratorrole.css';
import { rolelist,roledelete} from '../../apis/administratorrole/administratorrole';
const App: React.FC = () => {
  const [ListData, useroleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const { confirm } = Modal;
  //角色列表
  const List = async () => {
    let res: any = await rolelist({});
    let { list } = res.data;
    useroleList(list);
    if (res.errCode === 10000) {
      console.log(res.data.list);
      setLoading(true);
    }
  };
    //角色删除
    const del = (listid: any) => {
      return async () => {
        confirm({
          title: '警告',
          icon: <ExclamationCircleOutlined />,
          content: '确定删除该条数据吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          async onOk() {
            let res: any = await roledelete({ id: listid.id });
            //console.log(res);
            if (res.errCode === 10000) {
              // console.log(res);
              message.success('删除成功');
            }
            List();
          },
          onCancel() {
            message.error('取消删除');
          },
        });
      };
    };
  //表格
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '登陆账号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (id: any) => (
        <div className="btn">
          <Button
            type="primary"
            style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }}
          >
            修改
          </Button>
          <Button type="primary" danger onClick={del(id)}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    List();
  }, []);
  return (
    <div>
      {/* <span>角色</span> */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary">添加</Button>
      </div>
      <Table
        style={{width:900,border:'1px solid #ebeef5'}}
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={ListData}
      />
    </div>
  );
};

export default App;
