import { Button, Modal, message, Upload, Form, Input, Select, Cascader, Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
// import '../../assets/css/office/officeAdd.css'
import { typeList, buildingList, offadd } from '../../apis/staff/staff'
import { useForm } from 'antd/es/form/Form';


// 上传事件
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

const OfficeAdd = (props: any) => {
  useEffect(() => {
    if (props.id !== 0) {
      settitle('修改职员')
      forms.setFieldsValue({
        ...props.row, building: props.row.building.map((item: any) => (
          item.building
        ))
      })
      console.log(props.row.photo);

      setImageUrl('http://estate.eshareedu.cn/estate/upload/' + props.row.photo);
    } else {
      settitle('添加职员')
      forms.resetFields();
      setImageUrl('')
    }

    setOpen(props.flag)
  }, [props.flag])

  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    props.fn(false)
  };
  // 上传
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);

      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);

        forms.setFieldValue("photo", info.file.response.data);
        setImageUrl('http://estate.eshareedu.cn/estate/upload/' + info.file.response.data);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {/* <div style={{ marginTop: 8 }}>Upload</div> */}
    </div>
  );
  // 类型
  const [type, settype] = useState<any>([])
  const tList = async () => {
    let res: any = await typeList({})
    console.log(res);
    if (res.errCode === 10000) {
      settype(res.data.list)
    }
  }
  // 楼栋
  const [building, setbuilding] = useState([])
  const BList = async () => {
    let res: any = await buildingList({})
    console.log(res);
    if (res.errCode === 10000) {
      setbuilding(res.data.list)
    }
  }
  // 提交
  const [forms]: any = Form.useForm()
  const handleOk = async () => {
    console.log(forms.getFieldsValue());
    let form = { ...forms.getFieldsValue(), building: forms.getFieldsValue().building.map((item: any) => ({ buildingid: item })) }
    // console.log(form);
    form = { ...form, id: props.id }
    let res: any = await offadd(form)
    console.log(res);
    if (res.errCode === 10000) {
      forms.setFieldsValue({});

      props.fn(false)
    }
  };
  // 修改



  const [title, settitle] = useState('')
  useEffect(() => {
    tList()
    BList()
  }, [])
  return (
    <div>
      <Modal
        className='offadd'
        width={'40%'}
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Form
            form={forms}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <div>
              <Form.Item label='照片' name="photo" className='img'>
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="http://estate.eshareedu.cn/estate/api/upload/add"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  headers={{
                    'Authorization': sessionStorage.getItem('token') || ''
                  }}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
            </div>
            <div className='text'>
              <div className='left'>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '姓名不能为空' }]}
                >
                  <Input value={props.row} />
                </Form.Item>
                <Form.Item label="管辖范围" name='building'>
                  {/* <Cascader
                    style={{ width: '100%' }}
                    options={building}
                    fieldNames={{label:'name',value:'id'}}
                    // onChange={onChange}
                    multiple
                    // maxTagCount="responsive"
                  /> */}
                  <Cascader
                    options={building}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
                <Form.Item name="type" label="职员类型" rules={[{ required: true, message: '职员不能为空' }]}>
                  <Select
                    placeholder="请选择"
                    // onChange={handleChanges}
                    allowClear
                    options={type.map((item: any) => ({ label: item.name, value: item.id }))}
                  >
                  </Select>
                </Form.Item>
                <Form.Item label="性别" name='sex'>
                  <Radio.Group>
                    <Radio value={1}> 男 </Radio>
                    <Radio value={0}> 女 </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className='right'>
                <Form.Item
                  label="身份证号"
                  name="cardid"
                  rules={[{ required: true, message: '身份证不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="联系电话"
                  name="mobile"
                  rules={[{ required: true, message: '电话不能为空' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default OfficeAdd;