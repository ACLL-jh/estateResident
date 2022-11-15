import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState, useEffect } from 'react';
import { Cascader, Select, Input, Form, } from 'antd';
import { userinfoadd, buildinglist, userlist } from '../../apis/userinfo/userinfo'
const onChange = (value: any) => {
  console.log(value);
};
const useradd = async () => {
  const res = await userinfoadd({
    "id": 0,
    "photo": "",
    " ": "",
    "houseid": 0,
    "usertype": 0,
    "sex": 0,
    "mobile": "",
    "usernative": "",
    "cardid": "",
    "nation": ""
  })
  console.log(res);

}
//房间号选择器
const handleChange = (name: string) => {
  console.log(`selected ${name}`);
};
// const [data, setData] = useState([])

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Userifoadd: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  // 添加的级联选择器
  const buillist = async () => {
    const res: any = await buildinglist({})
    console.log(res);
    if (res.errCode === 10000) {
      setopacity(res.data.list)
    }

  }
  // 住户类型接口 
  // 声明一个数组把接口返回的数据放进数组里面
  const [types, seytypes] = useState([])
  const userinfolist = async () => {
    const res: any = await userlist({})
    console.log(res);
    if (res.errCode === 10000) {
      seytypes(res.data.list)
    }
  }
  const handleOk = () => {

  };
  const [opacity, setopacity] = useState([])
  useEffect(() => {
    // useradd()
    buillist()
    userinfolist()
  }, [])
  const uploadButton = (

    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}></div>
    </div>
  );
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="头像">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://estate.eshareedu.cn/estate/api/upload/add"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="楼道:">
          <Cascader defaultValue={['请选择']} options={opacity} fieldNames={{ label: 'name', value: 'id', children: 'children' }} onChange={onChange} style={{ width: "160px" }} /></Form.Item>
        <Form.Item label=" 房间号：">
          <Select
            // defaultValue="lucy"
            style={{ width: '160px' }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
            ]}
          /></Form.Item>
        <Form.Item label=" 姓名：">
          <Input placeholder="" style={{ width: '160px', }} />
        </Form.Item>
      </Form>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginLeft: "140px", marginTop: "30px" }}
      >
        <Form.Item
          label="民族"
          name="nation"
          style={{ width: '250px' }}
          rules={[{ required: true, message: '民族不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="籍贯"
          name="籍贯"
          style={{ width: '250px' }}
          rules={[{ required: true, message: '籍贯不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="身份证号"
          style={{ width: '250px' }}
          rules={[{ required: true, message: '身份证号不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系电话"
          name="联系电话"
          style={{ width: '250px' }}
          rules={[{ required: true, message: '联系电话不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="住户类型："
          // name="住户类型"
          style={{ width: '250px' }}
          rules={[{ required: true, message: '住户类型不能为空' }]}>

          <Select
            // defaultValue="lucy"
            fieldNames={{ label: 'name', value: 'id' }}
            onChange={handleChange}
            options={types}
          /></Form.Item>
      </Form>

    </div>
  );
};

export default Userifoadd;