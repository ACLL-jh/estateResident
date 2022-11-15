import React, { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Select, TimePicker, Upload, message } from 'antd'
import type { SelectProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import { storesadd, storeservices, storeslist } from '../../apis/stores/stores'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import '../../assets/css/repairs/addstores.css'
import moment from 'moment';
const { TextArea } = Input;
const Addstores: FC<any> = (props: any): JSX.Element => {
  const [form] = Form.useForm();
  const [stores, setstores] = useState<any>()
  const [title, settitle] = useState('添加门店')
  const handleOk = () => {
    props.close(false)
    console.log('确定');
    const formdata: any = form.getFieldsValue()
    let addinfo = formdata
    addinfo.startTime = addinfo.startTime.format("HH:mm")
    addinfo.endTime = addinfo.endTime.format("HH:mm")
    addinfo.id = props.addorupd
    addinfo.services = addinfo.services.join(',')
    addinfo.pass = null
    addinfo.mobile = addinfo.tel
    if (addinfo.logo) {
      addinfo.logo = addinfo.logo.file.response.data
    }
    if (addinfo.images) {
      let url = []
      for (let i in addinfo.images.fileList) {
        let aa = {
          url: addinfo.images.fileList[i].response.data
        }
        url.push(aa)
      }
      console.log(addinfo.images.fileList);
      
      addinfo.images = url
    }
    add(addinfo)
  }
  const add = async (params: any) => {
    const res: any = await storesadd(params)
    console.log(res);
    if (res.errCode === 10000) {
      props.getlist()
      props.close(false)
    }
  }
  const handleCancel = () => {
    props.close(false)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传JPG/PNG格式的文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const logoChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
        console.log(info);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  );
  const [fileList, setfileList]: UploadFile[] = [];
  const imageschange = (v: any) => {
    console.log(v);
    console.log(fileList);
  }
  const getstoreserviceslist = async () => {
    const res: any = await storeservices({})
    if (res.errCode === 10000) {
      let newarr = res.data.list;
      for (let i in newarr) {
        newarr[i].key = newarr[i].id
        newarr[i].value = newarr[i].name
        newarr[i].label = newarr[i].name
      }
      setstores(newarr)
    }
  }
  useEffect(() => {
    sessionStorage.getItem('token')
    if (props.addorupd != 0) {
      settitle('修改门店')
      listc()
    } else {
      settitle('添加门店')
    }
    getstoreserviceslist()
  }, [props.addorupd])
  const [useImages, setImages] = useState<any>([])
  const listc = async () => {
    const res = await storeslist({ 'id': props.addorupd })
    res.data.images = res.data.images.map((item: any) => {
      return {
        uid: item.id,
        name: item.url,
        status: 'done',
        url: 'http://estate.eshareedu.cn/estate/upload/' + item.url,
        thumbUrl: 'http://estate.eshareedu.cn/estate/upload/' + item.url
      }
    })
    if (res.data.images) { setImages(res.data.images) }

    setImageUrl('http://estate.eshareedu.cn/estate/upload/' + res.data.logo)
    form.setFieldsValue({ 'name': res.data.name })
    form.setFieldsValue({ 'tel': res.data.tel })
    form.setFieldsValue({ 'services': res.data.services.split(',') })
    form.setFieldsValue({ 'endTime': moment(res.data.endTime, 'HH:mm') })
    form.setFieldsValue({ 'startTime': moment(res.data.startTime, 'HH:mm') })
    form.setFieldsValue({ 'username': res.data.username })
    form.setFieldsValue({ 'intro': res.data.intro })
    form.setFieldsValue({ 'address': res.data.address })
    form.setFieldsValue({ 'logo': res.data.logo })
    let url = []
    for (let i in res.data.images.fileList) {
      let aa = {
        url: res.data.images.fileList[i].response.data
      }
      url.push(aa)
    }
    console.log(url);
    console.log(res);

  }
  return (
    <div className='all'>
      <Modal width={700} wrapClassName={'dialog'} title={title} open={props.open} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          className='form'
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className='left'>
            <Form.Item
              label="店名"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="tel"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="服务范围"
              className='time'
            >
              <Form.Item
                name="startTime"
              >
                <TimePicker showNow={false} format={'HH:mm'} />
              </Form.Item>

              <Form.Item
                name="endTime"
              >
                <TimePicker showNow={false} format={'HH:mm'} />
              </Form.Item>

            </Form.Item>

            <Form.Item
              label="服务范围"
              name="services"
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                options={stores}
              />
            </Form.Item>
            <Form.Item
              label="店主"
              name="username"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="门店介绍"
              name="intro"
            >
              <TextArea autoSize={false} rows={3} />
            </Form.Item>
          </div>
          <div className='right'>
            <Form.Item
              label="门店地址"
              name="address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="门店logo"
              name="logo"
              rules={[{ required: true, message: '请输入店名' }]}
            >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                headers={
                  { Authorization: `${sessionStorage.getItem('token')}` }
                }
                action="http://estate.eshareedu.cn/estate/api/upload/add"
                beforeUpload={beforeUpload}
                onChange={logoChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              label="门店图片"
              name="images"
              rules={[{ required: true, message: '请输入店名' }]}
            >
              <Upload
                action="http://estate.eshareedu.cn/estate/api/upload/add"
                listType="picture"
                maxCount={3}
                name={'file'}
                defaultFileList={[...useImages]}
                onChange={imageschange}
                headers={
                  { Authorization: `${sessionStorage.getItem('token')}` }
                }
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
export default Addstores