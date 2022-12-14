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
  const [data,setdata]:any=useState([])      //??????
  const [sid , setid] =useState('')
  const [typeup,settypeup]:any = useState()  //??????
  const [stype,settype]:any = useState([]) //????????????
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
  //?????????????????? 
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
  // ?????????
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ??????????????????
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
  // ???????????????
  // ??????
  const dela =(index:any)=>{
    return()=>{
      confirm({
        title: '??????!',
        icon: <ExclamationCircleOutlined />,
        content: '???????????????????',
        async onOk() {
          const res:any=await del({id:index})
          if(res.errCode=='10000'){
              message.success('????????????');
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
  // ??????
  const up =(index:any)=>{
    return ()=>{
      setisopen(true)
      setid(index)
    }
  }
  // ??????
  const alldel=async()=>{
       confirm({
      title: '??????!',
      icon: <ExclamationCircleOutlined />,
      content: '?????????????????????????',
      async onOk() {
        const res:any=await delall({ids:selectedRowKeys})
        if(res.errCode=='10000'){
            message.success('????????????');
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
  // ????????????
  const settime=(text:any)=>{
    console.log(moment(text).format('HH:mm'));
  }
  // ????????????
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      key:"id",
      align:'center',
      dataIndex: 'id',
    },
    {
      title: '??????',
      align:'center',
      dataIndex: 'name',
      key: 'id',
      render: (text,record) => 
      <div>
        <a className='bottom'  onClick={showModal(record)}>{record.name}</a>
      </div>
    },
    {
      title: '??????',
      align:'center',
      dataIndex: 'address',
    },
    {
      title: '??????logo',
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
      title: '????????????',
      align:'center',
      dataIndex: 'services',
    },
    {
      title: '??????',
      align:'center',
      dataIndex: 'username',
    },
    {
      title: '????????????',
      align:'center',
      dataIndex: 'mobile',
    },
    {
      title: '????????????',
      align:'center',
      dataIndex: 'startTime',
    },
    {
      title: '??????',
      align:'center', 
      dataIndex: 'id',
      width:200,
      key: 'id',
      render: (text,record) => 
      <div>
      <Button type="primary" danger  className='selecta grren'  onClick={up(text)}>
        ??????
      </Button> 
      <Button type="primary" danger  className='selecta'  onClick={dela(text)}>??????</Button> 
      </div>
    },
  ];
  // ????????????
  const onFinish = async (val?:any) => {
    const res: any = await List(val);
    setdata(res.data.list)
  };
  // ??????????????????
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // ??????
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
         <h3>????????????</h3>
    </div>
    <Form layout='inline' name="nest-messages" onFinish={onFinishs}>
      <Form.Item name={['key']} label="??????" >
        <Input placeholder="?????????" />
      </Form.Item>
      <Form.Item name={['services']} label="????????????">
        <Select placeholder="?????????" style={{width:140}} >
          {
            stype.map((item:any)=>(
              <Option key={item.id} value={item.name}>{item.name}</Option>
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
        <Button type="primary"  size={size}   style={{width:100}} className='selecta' onClick={add}>
            ??????
        </Button> 
        <Button type="primary" danger size={size} onClick={alldel}  style={{width:100}} className='selecta'>
            ????????????
        </Button> 
    </div>
      <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data}  style={{marginTop:"20px"}}/>
     {isModalOpen ? <Modal title="????????????  "  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} width={900}>
        <div className='modaltop' >
            <div >
              <img src={'http://estate.eshareedu.cn/estate/upload/'+typeup.logo} alt="" />
              <span className='modalspan' > {typeup.name}</span>
            </div>
            <div className='modalsize'>
              ????????????
            </div>
        </div>  
        <div className='modaltime'>

        <HistoryOutlined style={{ fontSize: '20px', color: '#333' }} /> ??????????????? {typeup.startTime}
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

