import React, { useEffect, useState,useRef } from 'react';
import moment from 'moment'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
  EnvironmentFilled,
  PhoneFilled
} from '@ant-design/icons';
import type { Moment } from 'moment';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Breadcrumb, Layout, Menu,Select,MenuProps,Input,DatePicker,Button, Space, Table, Tag, Form,InputNumber,message,Modal,Steps,Image, Upload ,TimePicker } from 'antd';
import {createContext} from "react"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './../../assets/css/repairs/repairs.css';
import { useNavigate, Outlet } from 'react-router-dom';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { List,del,delall,repairstype,lista } from './../../apis/stores/stores';
import type { ColumnsType } from 'antd/es/table';
import Strore from '../../components/addstores/addstores'
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
export const Context= createContext({});
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
  id:React.Key;
}
const Home: React.FC = () => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [size, setSize] = useState<SizeType>('large');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const title =useRef()
  const [data,setdata]:any=useState([])      //列表
  const [sid , setid] =useState('')
  const [typeup,settypeup]:any = useState()  //回显
  const [stype,settype]:any = useState([]) //服务范围
  const [open, setOpen] = useState(false);
  const [from] =Form.useForm()
  const [isopen,setisopen] = useState<boolean>(false)
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
  }, [typeup]);
  //维修状态接口 
  const irstype =async ()=>{
    const res:any =await repairstype({})    
    settype(res.data.list)
  }
// 
const handleOka = () => {
  const params=from.getFieldsValue()
  params.startTime=moment(params.startTime).format('HH:mm')
  console.log(params);
  
  setConfirmLoading(true);
  setTimeout(() => {
    setOpen(false);
    setConfirmLoading(false);
  }, 500);
};
const handleCancela = () => {
  console.log('Clicked cancel button');
  setOpen(false);
};
// 
  // 对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取单条显示
  const showModal = (val:any) => {
    return async()=>{      
      const res:any=await lista({id:val.id})
      console.log(res);
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
  // 删除
  const dela =(index:any)=>{
    return()=>{
      confirm({
        title: '警告!',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除?',
        async onOk() {
          const res:any=await del({id:index})
          if(res.errCode=='10000'){
              message.success('删除成功');
              onFinish()
          }else{
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
  const up =(index:any)=>{
    return ()=>{
      setisopen(true)
      setid(index)
    }
  }
  // 批删
  const alldel=async()=>{
       confirm({
      title: '警告!',
      icon: <ExclamationCircleOutlined />,
      content: '确定要批量删除吗?',
      async onOk() {
        const res:any=await delall({ids:selectedRowKeys})
        if(res.errCode=='10000'){
            message.success('删除成功');
            onFinish()
        }else{
          message.error(res.errMsg);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 时间获取
  const settime=(text:any)=>{
    console.log(moment(text).format('HH:mm'));
  }
  // 列表数据
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      key:"id",
      align:'center',
      dataIndex: 'id',
    },
    {
      title: '门店',
      align:'center',
      dataIndex: 'name',
      key: 'id',
      render: (text,record) => 
      <div>
        <a className='bottom'  onClick={showModal(record)}>{record.name}</a>
      </div>
    },
    {
      title: '地址',
      align:'center',
      dataIndex: 'address',
    },
    {
      title: '门店logo',
      dataIndex: 'logo',  
      width:300,
      align:'center',
      key: 'id',
      render: (text,record) => (
            <div>
                {
                text?<img width={100}  src={'http://estate.eshareedu.cn/estate/upload/'+text} style={{height:'3.5rem'}}  className='img' />:''
                }
            </div>
      )
    },
    {
      title: '服务范围',
      align:'center',
      dataIndex: 'services',
    },
    {
      title: '店主',
      align:'center',
      dataIndex: 'username',
    },
    {
      title: '联系电话',
      align:'center',
      dataIndex: 'mobile',
    },
    {
      title: '营业时间',
      align:'center',
      dataIndex: 'startTime',
    },
    {
      title: '操作',
      align:'center', 
      dataIndex: 'id',
      width:200,
      key: 'id',
      render: (text,record) => 
      <div>
      <Button type="primary" danger  className='selecta grren'  onClick={up(text)}>
        修改
      </Button> 
      <Button type="primary" danger  className='selecta'  onClick={dela(text)}>删除</Button> 
      </div>
    },
  ];
  // 调用列表
  const onFinish = async (val?:any) => {
    const res: any = await List(val);
    setdata(res.data.list)
  };
  // 下拉菜单事件
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // 查询
  const onFinishs =(values: any)=>{
    onFinish(values)
  }
  const onFinishup =(values: any)=>{
    // onFinish(values)
    console.log(values);
    
  }
  // 
  const close = (v:boolean)=>{
    setisopen(v)
  }
  const add = ()=>{
    setid('0')
    setisopen(true)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return <div className='pwd'>
    <div className='header'>
         <h3>门店列表</h3>
    </div>
    <Form layout='inline' name="nest-messages" onFinish={onFinishs}>
      <Form.Item name={['key']} label="门店" >
        <Input placeholder="门店名" />
      </Form.Item>
      <Form.Item name={['services']} label="服务范围">
        <Select placeholder="请选择" style={{width:140}} >
          {
            stype.map((item:any)=>(
              <Option key={item.id} value={item.name}>{item.name}</Option>
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
        <Button type="primary"  size={size}   style={{width:100}} className='selecta' onClick={add}>
            添加
        </Button> 
        <Button type="primary" danger size={size} onClick={alldel}  style={{width:100}} className='selecta'>
            批量删除
        </Button> 
    </div>
      <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data}  style={{marginTop:"20px"}}/>
     {isModalOpen ? <Modal title="门店详情  "  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} width={900}>
        <div className='modaltop' >
            <div >
              <img src={'http://estate.eshareedu.cn/estate/upload/'+typeup.logo} alt="" />
              <span className='modalspan' > {typeup.name}</span>
            </div>
            <div className='modalsize'>
              早点美食
            </div>
        </div>  
        <div className='modaltime'>

        <HistoryOutlined style={{ fontSize: '20px', color: '#333' }} /> 营业时间： {typeup.startTime}
        </div>
        <div className='modaltop'>
          <div className='modalleft' >
          <EnvironmentFilled style={{ fontSize: '16px', color: '#3259ce' }} />  {typeup.address}
          </div>
          <div className='modalright'>
          <PhoneFilled  style={{ fontSize: '16px', color: '#499c54' }} />   {typeup.mobile}
          </div>
        </div>
        <div className='pad'> 
        <Image.PreviewGroup>
                {typeup.images.map((item:any)=>(
                  <Image width={200} key={item.id} src={'http://estate.eshareedu.cn/estate/upload/'+item.url} style={{height:'6rem',margin:8}} alt="" className='img' />
                ))}
        </Image.PreviewGroup>
        </div>
        <div className='textsize'> 
            {typeup.intro}
        </div>
      </Modal>
      :''
    }
    {
      isopen?<Strore getlist={onFinish}   open={isopen} close={close} addorupd={sid} />:''
    }
  </div>;
};
export default Home;
function ref(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}

