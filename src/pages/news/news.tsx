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
  const [data, setdata]: any = useState([])      //??????
  const [typeup, settypeup]: any = useState()  //??????
  const [stype, settype]: any = useState([]) //????????????
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
  //?????????????????? 
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
  // ?????????
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ??????????????????
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
  // ???????????????
  // ??????
  const onChanged = (checked: boolean) => {
    setate(checked ? '1' : '0')
  };
  // ??????
  const dela = (index: any) => {
    return () => {
      confirm({
        title: '??????!',
        icon: <ExclamationCircleOutlined />,
        content: '???????????????????',
        async onOk() {
          const res: any = await del({ id: index })
          if (res.errCode == '10000') {
            message.success('????????????');
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
  // ??????
  const up = (index: any) => {
    return () => {
      route(`/newsadd?id=${index}`)
      setOpen(true);
    }
  }
  // ????????????
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
        message.success('????????????');
      }
    }
  }
  // ??????
  const add=()=>{
    route('/newsadd')
  }
  // ??????
  const alldel = async () => {
    confirm({
      title: '??????!',
      icon: <ExclamationCircleOutlined />,
      content: '?????????????????????????',
      async onOk() {
        const res: any = await delall({ ids: selectedRowKeys })
        if (res.errCode == '10000') {
          message.success('????????????');
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
  // ????????????
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      key: "id",
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '??????',
      align: 'center',
      dataIndex: 'typename',
      render: (text, record) =>
        <div>
          <a className='bottom' onClick={showModal(record)}>{record.typename}</a>
        </div>
    },
    {
      title: '??????',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '??????',
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
      title: '??????',
      align: 'center',
      dataIndex: 'state',
      render: (text, data) => (
        <span onClick={upswit(data)}>
          <Switch checkedChildren="??????" unCheckedChildren="??????" defaultChecked={text == 1 ? true : false} onChange={onChanged} />
        </span>
      )
    },
    {
      title: '????????????',
      align: 'center',
      dataIndex: 'addtime',
      render: (text) => (
        <span>
          {moment(text).format("YYYY-MM-DD HH:mm")}
        </span>
      )
    },
    {
      title: '?????????',
      align: 'center',
      dataIndex: 'content',
    },
    {
      title: '??????',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      key: 'id',
      render: (text, record) =>
        <div>
          <Button type="primary" danger className='selecta grren' onClick={up(text)}>??????</Button>
          <Button type="primary" danger className='selecta' onClick={dela(text)}>??????</Button>
        </div>
    },
  ];
  // ????????????
  const onFinish = async (val?: any) => {
    const res: any = await Listc(val);
    setdata(res.data.list)
  };
  // ??????????????????
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // ??????
  const onFinishs = (values: any) => {
    onFinish(values)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return <div className='pwd'>
    <div className='header'>
      <h3>????????????</h3>
    </div>
    <Form layout='inline' name="nest-messages" onFinish={onFinishs}>
      <Form.Item name={['key']} label="??????" >
        <Input placeholder="?????????" />
      </Form.Item>
      <Form.Item name={['type']} label="????????????">
        <Select placeholder="?????????" style={{ width: 140 }} >
          {
            stype.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit" className='select'>
          ??????
        </Button>
      </Form.Item>
    </Form>
    <div className='item' >
      <Button type="primary" size={size} style={{ width: 100 }} className='selecta' onClick={add}>
        ??????
      </Button>
      <Button type="primary" danger size={size} onClick={alldel} style={{ width: 100 }} className='selecta'>
        ????????????
      </Button>
    </div>
    <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data} style={{ marginTop: "20px" }} />
    {isModalOpen ? <Modal title="????????????  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} width={900}>
      <div className='modaltime'>

        <h2>
          {typeup.title}
        </h2>
      </div>
      <div style={{ fontSize: '18px' }}>
        <HistoryOutlined style={{ marginRight: '4px' }} /> ???????????????{typeup.addtime}
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
        title="????????????"
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
              <Form.Item name={['address']} label="????????????" rules={[{ required: true }]}>
                <Input width={500} />
              </Form.Item>
              <Form.Item name={['type']} label="????????????" rules={[{ required: true }]}>
                <Select placeholder="?????????"  >
                  {
                    stype.map((item: any) => (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item name={['userid']} label="????????????" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['tel']} label=" ??? ??? " rules={[{ required: true }]}  >
                <Input />
              </Form.Item>
              <Form.Item name={['state']} label="????????????">
                <Select placeholder="?????????">
                  {/* {
                repairst.map((item:any)=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))
              } */}
                </Select>
              </Form.Item>

              <Form.Item name={['content']} label="????????????" rules={[{ required: true }]}>
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

