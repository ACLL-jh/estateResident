import React, { useEffect, useState,useContext,useRef } from 'react';
import {Context} from '../../pages/repairs/repairs'
import { Breadcrumb, Layout, Menu ,Button, Modal,MenuProps,Select,Upload,Cascader  } from 'antd';
import { useNavigate, Outlet, useFetcher } from 'react-router-dom';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {  Form, Input, InputNumber } from 'antd';
import './../../assets/css/repairs/repairs.css'
import ImgCrop from 'antd-img-crop';
import {repairsup,building} from '../../apis/repairs/repairs'
const { Option } = Select
const comindex:number =1;
const headers:any = {Authorization:sessionStorage.getItem('token')}
const Chome: React.FC<any> = ({ title,state,close }) => {
  const [from] =Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [build,setbuild] =useState<any>([])
  const [newbuild,setnew]=useState<any>([])
  
  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }
  const showModal = () => {
    close()
  };
  // 发送修改
  const handleOk = async() => {
    const params=from.getFieldsValue()
    params['id']=user.id
    params.address=newbuild.join('')
    console.log(params);
    const res=await repairsup(params)
    console.log(res);
    
    close()
  };
  const handleCancel = () => {        
    close()
    setIsModalOpen(false);
  };
  // 接取共享
  const {user,stype,repairst}=useContext<any>(Context)
  const [imgs,setimgs] = useState<any>([])
  console.log(user);
  
  useEffect(()=>{
    select()
    user.address=''
    from.setFieldsValue(user)
    setimgs(user.images)
  },[])
  // 表单验证
    const validateMessages = {
    required: '${label} 不可为空!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between 11 and 11',
    },
  };  
  // 图片上传
  const [fileList, setFileList] = useState<UploadFile[]>([
  ]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const imgs:any = fileList.map((item:any) => ({url:item.response.data}))
    console.log(fileList,imgs);
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  // 图片上传结束
  // 三级联动
  const select =async()=>{
      const res=await building({})
      setbuild(res.data.list)  
          
  }
  const getCity = (arr:any, data:any, city:any) => {
    if (typeof data === "object") {
        for (let i = 0; arr[i] !== undefined; i++) {
            for (let j = 0; data[j] !== undefined; j++) {
                if (arr[i] === data[j].id) {
                    city.push(data[j].name);
                }
            }
        };
        for (let i = 0; data[i] !== undefined; i++) {
          if(data[i].children !==null){
            getCity(arr, data[i].children, city);
          }
           
        };
    }
    return city;
}
  const onChangex = (value: any) => {
    setnew(getCity(value,build,[]))
  };
  // 结束
  return <div className="title">
    <Modal title="修改故障报修 " open={state}  width={800} maskStyle={{background:"rgba(245, 245, 245, 0.01)"}} centered onOk={handleOk} onCancel={handleCancel}>
      <Form name="nest-messages"  validateMessages={validateMessages} labelAlign={'right'}  form={from}>
        <div  className='flex'>
        <div style={{width:'300px'}} >
        <Form.Item name={[ 'address']} label="维修地址" rules={[{ required: true }]}>
        <Cascader fieldNames={{label:'name',value:'id',children:'children'}} options={build} onChange={onChangex}  />
        </Form.Item>
        <Form.Item name={[ 'type']} label="故障类型" rules={[{ required: true }]}>
        <Select placeholder="请选择"  >
            {
              stype.map((item:any)=>(
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name={[ 'userid']} label="业主名称"  rules={[{ required: true }]}>
        <Input />
        </Form.Item>
        <Form.Item name={[ 'tel']} label=" 电 话 " rules={[{ required: true }]}  >
          <Input  />
        </Form.Item>
       
        <Form.Item name={[ 'state']} label="故障状态">
        <Select placeholder="请选择">
              {
                repairst.map((item:any)=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))
              }
          </Select>
        </Form.Item>
        </div>
        <div style={{marginRight:"20px"}}>
        <Form.Item name={[ 'content']} label="故障描述" rules={[{ required: true }]}>
        <Input.TextArea  style={{width:'230px'}} />
        </Form.Item>
        <Form.Item name={[ 'img']} label=" 图片 " rules={[{ required: true }]}  >
          {
            imgs.map((item:any)=>(
              <img src={'http://estate.eshareedu.cn/estate/upload/'+ item.url} alt=""  style={{width:'50px',height:'50px',marginLeft:'5px'}}/>
            ))
          }
          
        </Form.Item>
        <Form.Item name={[ 'images']} label="上传图片" rules={[{ required: true }]}>
          <ImgCrop rotate>
            <Upload
              action="http://estate.eshareedu.cn/estate/api/upload/add"
              listType="picture-card"
              fileList={fileList}
              headers={headers}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Form.Item>
        </div>
        </div>
      </Form>
    </Modal>
  </div>;
};
export default Chome;