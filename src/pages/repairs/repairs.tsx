import React, { useEffect, useState, useRef, createContext } from 'react';
import moment from 'moment'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Moment } from 'moment';
import { Breadcrumb, Layout, Menu, Select, MenuProps, Input, DatePicker, Button, Space, Table, Tag, Form, InputNumber, message, Modal, Steps, Image } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './../../assets/css/repairs/repairs.css';
import { useNavigate, Outlet } from 'react-router-dom';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { List, del, delall, repairstype, repairstate } from './../../apis/repairs/repairs';
import type { ColumnsType } from 'antd/es/table';
import Item from 'antd/lib/list/Item';
import Chome from '../../components/repairscom/repairscom'
export const Context = createContext({});
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { Option } = Select;
const { Step } = Steps;

type RangeValue = [Moment | null, Moment | null] | null;
interface DataType {
  images: any;
  typename: string;
  address: string;
  name: string;
  content: string;
  statename: string;
  username: string;
  addtime: string;
  id: React.Key;
}
const Home: React.FC = () => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [size, setSize] = useState<SizeType>('large');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const title = useRef()
  const [data, setdata]: any = useState([])      //列表
  const [typeup, settypeup]: any = useState()  //故障类型回显
  const [repairst, setrepairst]: any = useState([]) //状态
  const [stype, settype]: any = useState([]) //类型
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    onFinish()
  }, []);
  useEffect(() => {
    irstype()
    irstate()
    onFinish()
  }, [typeup]);
  //维修状态接口 
  const irstate = async () => {
    const res: any = await repairstate({})
    setrepairst(res.data.list)
  }
  const irstype = async () => {
    const res: any = await repairstype({})
    settype(res.data.list)
  }
  // 对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (val: any) => {
    return () => {
      settypeup(val)
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 对话框结束
  // 删除
  const dela = (index: any) => {
    return () => {
      confirm({
        title: '警告!',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除?',
        async onOk() {
          const res: any = await del({ id: index })
          if (res.errCode == '10000') {
            message.success('删除成功');
            onFinish()
          } else {
            message.error(res.errMsg);
          }
          console.log(res);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
  // 修改
  const [ListModel, setListModel] = useState<any>()
  const up = (data: any) => {
    return () => {
      setListModel(data)
      setIsshow(true)
    }
  }
  // 批删
  const alldel = async () => {
    confirm({
      title: '警告!',
      icon: <ExclamationCircleOutlined />,
      content: '确定要批量删除吗?',
      async onOk() {
        const res: any = await delall({ ids: selectedRowKeys })
        if (res.errCode == '10000') {
          message.success('删除成功');
        } else {
          message.error(res.errMsg);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 列表数据
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      key: "id",
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '故障类型',
      align: 'center',
      dataIndex: 'typename',
      key: 'id',
      render: (text, record) =>
        <div>
          <a className='bottom' onClick={showModal(record)}>{record.typename}</a>
        </div>
    },
    {
      title: '维修地址',
      align: 'center',
      dataIndex: 'address',
    },
    {
      title: '故障图片',
      dataIndex: 'images',
      width: 300,
      align: 'center',
      key: 'id',
      render: (text, record) => (
        <Image.PreviewGroup>
          {record.images.map((item: any) => (
            <Image width={100} key={item.id} src={'http://estate.eshareedu.cn/estate/upload/' + item.url} style={{ height: '4rem', paddingLeft: 15 }} className='img' />
          ))}
        </Image.PreviewGroup>
      )
    },
    {
      title: '故障描述',
      align: 'center',
      dataIndex: 'content',
    },
    {
      title: '维修状态',
      align: 'center',
      dataIndex: 'statename',
    },
    {
      title: '业主名称',
      align: 'center',
      dataIndex: 'username',
    },
    {
      title: '维修日期',
      align: 'center',
      dataIndex: 'addtime',
      render: (text) => (
        <span>
          {moment(text).format("YYYY-MM-DD HH:mm")}
        </span>
      )
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      key: 'id',
      render: (text, record) =>
        <div>
          <Button type="primary" danger className='selecta grren' onClick={up(record)}>修改</Button>
          <Button type="primary" danger className='selecta' onClick={dela(text)}>删除</Button>
        </div>
    },
  ];
  const close = () => {
    setIsshow(false)
  }
  const [isshow, setIsshow] = useState<boolean>(false)
  // 调用列表
  const onFinish = async (val?: any) => {
    const res: any = await List(val);
    console.log(res);
    setdata(res.data.list)
  };
  // 下拉菜单事件
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // 查询
  const onFinishs = (values: any) => {

    if (values.begindate != undefined) {
      values.enddate = moment(values.begindate[1]).format('YYYY-MM-DD')
      values.begindate = moment(values.begindate[0]).format('YYYY-MM-DD')
    }
    onFinish(values)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return <div className='pwd'>
    <div className='header'>
      <h3>故障报修列表</h3>
    </div>
    <Form layout='inline' name="nest-messages" onFinish={onFinishs} >
      <Form.Item name={['userid']} label="报修标题" >
        <Input placeholder="报修标题" />
      </Form.Item>
      <Form.Item name={['address']} label="地址" >
        <Input placeholder="地址" />
      </Form.Item>
      <Form.Item name={['tel']} label="电话" >
        <Input placeholder="电话" />
      </Form.Item>
      <Form.Item name={['begindate']} label="按时间查询">
        <RangePicker
        />
      </Form.Item>
      <Form.Item name={['state']} label="维修状态">
        <Select placeholder="请选择" style={{ width: 140 }} >
          {
            repairst.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item name={['type']} label="维修类型">
        <Select placeholder="请选择" style={{ width: 140 }}>
          {
            stype.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item name={['key']} label="居民">
        <Input placeholder="请输入关键字" />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit" className='select'>
          查询
        </Button>
      </Form.Item>
    </Form>
    <div className='item' >
      <Button type="primary" danger size={size} onClick={alldel} style={{ width: 100 }} className='selecta'>
        批量删除
      </Button>
    </div>
    <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data} style={{ marginTop: "20px" }} />
    {isModalOpen &&
    <Modal title="详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} width={800}>
      <div className='span'>
        <p>
          提交人：{typeup.username}
        </p>
        <p>
          维修地址:{typeup.address}
        </p>
        <p>
          手机号：{typeup.tel}
        </p>
        <p>
          问题类型：{typeup.typename}
        </p>
        <p>
          问题描述：{typeup.statename}
        </p>
      </div>
      <div className='align'>
        <Image.PreviewGroup>
          {typeup.images.map((item: any) => (
            <Image width={200} key={item.id} src={'http://estate.eshareedu.cn/estate/upload/' + item.url} style={{ height: '6rem', margin: 15 }} alt="" className='img' />
          ))}
        </Image.PreviewGroup>
      </div>
      <Steps current={typeup.state} style={{ marginTop: 20 }}>
        <Step title="等待处理" />
        <Step title="正在处理" />
        <Step title="处理完成" />
        <Step title="已评价" />
      </Steps>
    </Modal>
   
    }
    <Context.Provider value={{ user: ListModel, repairst: repairst, stype: stype }}>
      {
        isshow &&
        <Chome state={isshow} close={close}></Chome>
      }
    </Context.Provider>
  </div>;
};
export default Home;
function ref(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}

