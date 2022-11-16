import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
  EnvironmentFilled,
  PhoneFilled,
  CheckOutlined, CloseOutlined
} from '@ant-design/icons';
import type { Moment } from 'moment';
import { Listc, repairstype, del, delall, lista, newadd } from '../../apis/news/news'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Breadcrumb, Layout, Menu, Select, MenuProps, Input, DatePicker, Button, Space, Table, Tag, Form, InputNumber, message, Modal, Steps, Image, Upload, Switch, TimePicker } from 'antd';
import { createContext } from "react"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './../../assets/css/repairs/repairs.css';
import { useNavigate, Outlet } from 'react-router-dom';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType } from 'antd/es/table';
import Chome from '../../components/repairscom/repairscom'
import Item from 'antd/lib/list/Item';
import ImgCrop from 'antd-img-crop';
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { Option } = Select;
const { Step } = Steps;
const format = 'HH:mm';
const description = 'This is a description.';
export const Context = createContext({});
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
  const route = useNavigate()
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [size, setSize] = useState<SizeType>('large');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const title = useRef()
  const [data, setdata]: any = useState([])      //列表
  const [typeup, settypeup]: any = useState()  //回显
  const [stype, settype]: any = useState([]) //服务范围
  const [open, setOpen] = useState(false);
  const [ate, setate] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    onFinish()
  }, []);
  useEffect(() => {
    irstype()
    onFinish()

  }, [typeup]);
  //维修状态接口 
  const irstype = async () => {
    const res: any = await repairstype({})
    settype(res.data.list)
  }
  // 
  const handleOka = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancela = () => {
    setOpen(false);
  };
  // 
  // 对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取单条显示
  const showModal = (val: any) => {
    return async () => {
      const res: any = await lista({ id: val.id })
      settypeup(res.data)
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
  // 开关
  const onChanged = (checked: boolean) => {
    setate(checked ? '1' : '0')
  };
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
  const up = (index: any) => {
    return () => {
      route(`/newsadd?id=${index}`)
      setOpen(true);
    }
  }
  // 修改开关
  const upswit = (data: any) => {
    return async () => {
      if (data.state === 1) {
        data.state = 0
      } else {
        data.state = 1
      }
      data.addtime = data.addtime.slice(0, -2)
      delete data.typename
      const res:any = await newadd(data)
      if(res.errCode===10000){
        message.success('修改成功');
      }
    }
  }
  // 添加
  const add=()=>{
    route('/newsadd')
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
          onFinish()
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
      title: '类型',
      align: 'center',
      dataIndex: 'typename',
      render: (text, record) =>
        <div>
          <a className='bottom' onClick={showModal(record)}>{record.typename}</a>
        </div>
    },
    {
      title: '标题',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '图片',
      dataIndex: 'picture',
      align: 'center',
      key: 'id',
      render: (text, record) => (
        <div>
          {
            text ? <img width={100} src={'http://estate.eshareedu.cn/estate/upload/' + text} style={{ height: '3.5rem' }} className='img' /> : ''
          }
        </div>
      )
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
      render: (text, data) => (
        <span onClick={upswit(data)}>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text == 1 ? true : false} onChange={onChanged} />
        </span>
      )
    },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'addtime',
      render: (text) => (
        <span>
          {moment(text).format("YYYY-MM-DD HH:mm")}
        </span>
      )
    },
    {
      title: '发布人',
      align: 'center',
      dataIndex: 'content',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      key: 'id',
      render: (text, record) =>
        <div>
          <Button type="primary" danger className='selecta grren' onClick={up(text)}>修改</Button>
          <Button type="primary" danger className='selecta' onClick={dela(text)}>删除</Button>
        </div>
    },
  ];
  // 调用列表
  const onFinish = async (val?: any) => {
    const res: any = await Listc(val);
    setdata(res.data.list)
  };
  // 下拉菜单事件
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // 查询
  const onFinishs = (values: any) => {
    onFinish(values)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return <div className='pwd'>
    <div className='header'>
      <h3>公告列表</h3>
    </div>
    <Form layout='inline' name="nest-messages" onFinish={onFinishs}>
      <Form.Item name={['key']} label="新闻" >
        <Input placeholder="新闻名" />
      </Form.Item>
      <Form.Item name={['type']} label="公告类型">
        <Select placeholder="请选择" style={{ width: 140 }} >
          {
            stype.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit" className='select'>
          查询
        </Button>
      </Form.Item>
    </Form>
    <div className='item' >
      <Button type="primary" size={size} style={{ width: 100 }} className='selecta' onClick={add}>
        添加
      </Button>
      <Button type="primary" danger size={size} onClick={alldel} style={{ width: 100 }} className='selecta'>
        批量删除
      </Button>
    </div>
    <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data} style={{ marginTop: "20px" }} />
    {isModalOpen ? <Modal title="门店详情  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} width={900}>
      <div className='modaltime'>

        <h2>
          {typeup.title}
        </h2>
      </div>
      <div style={{ fontSize: '18px' }}>
        <HistoryOutlined style={{ marginRight: '4px' }} /> 添加时间：{typeup.addtime}
      </div>
      <div style={{ height: '312px' }}>
        <Image.PreviewGroup>

          <Image width={200} src={'http://estate.eshareedu.cn/estate/upload/' + typeup.picture} alt="" style={{ width: '850px', height: '312px', marginTop: '10px' }} />

        </Image.PreviewGroup>
      </div>
      <div className='textsize'>
        {typeup.content}
      </div>
    </Modal>

      : ''
    }
    <>
      <Modal
        title="修改门店"
        open={open}
        onOk={handleOka}
        confirmLoading={confirmLoading}
        onCancel={handleCancela}
        width={700}
        centered={true}
      >

        <Form name="nest-messages" labelAlign={'right'} >
          <div className='flex'>
            <div style={{ width: '300px' }} >
              <Form.Item name={['address']} label="维修地址" rules={[{ required: true }]}>
                <Input width={500} />
              </Form.Item>
              <Form.Item name={['type']} label="故障类型" rules={[{ required: true }]}>
                <Select placeholder="请选择"  >
                  {
                    stype.map((item: any) => (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item name={['userid']} label="业主名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['tel']} label=" 电 话 " rules={[{ required: true }]}  >
                <Input />
              </Form.Item>
              <Form.Item name={['state']} label="故障状态">
                <Select placeholder="请选择">
                  {/* {
                repairst.map((item:any)=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))
              } */}
                </Select>
              </Form.Item>

              <Form.Item name={['content']} label="故障描述" rules={[{ required: true }]}>
                <Input.TextArea style={{ width: '230px' }} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  </div>;
};
export default Home;
function ref(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}

function route(arg0: string) {
  throw new Error('Function not implemented.');
}

