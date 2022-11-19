import { useState, useEffect } from 'react'
import { Form, Modal, Upload, message, Cascader, Select, Input, Radio } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RadioChangeEvent } from 'antd';
import { buildingList, housesList, userinfotypeList, userinfoAdd } from '../../apis/userinfo/userinfo'
const UserinfoAdd = (props: any) => {
  useEffect(() => {
    setOpen(props.aaaa)
    console.log(props.add);
    builList()
    utypeList()
    if (props.id !== 0) {
      settitle('修改居民')
      setImageUrl('http://estate.eshareedu.cn/estate/upload/' + props.row.photo);
      forms.setFieldsValue({ ...props.row, buildingid: props.row.building })
      // console.log(props.row);
    } else {
      console.log(props.row);
      settitle('添加居民')
      setImageUrl('')
      forms.setFieldsValue({})
    }
  }, [])
  const [title, settitle] = useState('')
  // 练级选择器
  const [opts, optss] = useState([])
  const [buildingVal, buildingVals] = useState([])
  const builList = async () => {
    const res: any = await buildingList({})
    // console.log(res);
    if (res.errCode === 10000) {
      optss(res.data.list)
    }
  }
  // 房间号
  const [room, roomNum] = useState([])
  const roomList = async () => {
    console.log(buildingVal);
    const res: any = await housesList({
      buildingid: buildingVal[buildingVal.length - 1]
    })
    // console.log(res);
    if (res.errCode === 10000) {
      roomNum(res.data.list)
    }
  }
  // 用户类型
  const [opt, option] = useState([])
  const utypeList = async () => {
    const res: any = await userinfotypeList({})
    // console.log(res);
    if (res.errCode === 10000) {
      option(res.data.list)
    }
  }
  useEffect(() => {
    roomList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingVal])
  const onChange = (value: any) => {
    // console.log(value);
    buildingVals(value);
  };
  const [open, setOpen] = useState(false);
  // 添加 上传头像
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        forms.setFieldValue("photo", info.file.response.data);
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  );
  // 性别
  const [value, setValue] = useState('');
  const sexChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [forms] = Form.useForm();
  const confirm = async () => {
    props.yess(false)
    const val = { ...forms.getFieldsValue() }
    const vals = { id: props.id, ...val }
    // console.log(val);
    const res: any = await userinfoAdd({
      ...val,
      buildingid: buildingVal[buildingVal.length - 1],
      ...vals
    })
    console.log(res);
  }
  const cancel = () => {
    props.yess(false)
  }
  return (
    <Modal
      width={650}
      title={title}
      centered
      open={open}
      onCancel={cancel}
      onOk={confirm}
      okText="确认"
      cancelText="取消"
    >
      <div className='froms'>
        <Form
          form={forms}
          labelCol={{ span: 5 }}
          labelAlign="left"
          className='leftFrom'>
          <Form.Item
            label="头像"
            name='photo'
          >
            <Upload
              name="file"
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
          <Form.Item
            label="楼栋"
            name='buildingid'
          >
            <Cascader style={{ width: '180px' }} options={opts} fieldNames={{ label: 'name', value: 'id', children: 'children' }} onChange={onChange} placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="房间号"
            name='houseid'
          >
            <Select
              placeholder="请选择"
              style={{ width: '180px' }}
              allowClear
              options={room.map((item: any) => (
                {
                  label: item.houseno,
                  value: item.id
                }
              ))}
            />
          </Form.Item>
          <Form.Item
            label="姓名"
            name='name'
          >
            <Input style={{ width: '180px' }} />
          </Form.Item>
          <Form.Item
            label="性别"
            name='sex'
          >
            <Radio.Group onChange={sexChange} value={value}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Form
          form={forms}
          className='rightFrom'
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Form.Item
            label="民族"
            name='nation'
          >
            <Input style={{ width: '180px' }} />
          </Form.Item>
          <Form.Item
            label="籍贯"
            name='usernative'
          >
            <Input style={{ width: '180px' }} />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name='cardid'
          >
            <Input style={{ width: '180px' }} />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name='mobile'
          >
            <Input style={{ width: '180px' }} />
          </Form.Item>
          <Form.Item
            label="用户类型"
            name='usertype'
          >
            <Select
              placeholder="请选择"
              style={{ width: 120 }}
              allowClear
              options={opt.map((item: any) => (
                {
                  label: item.name,
                  value: item.id
                }
              ))}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
export default UserinfoAdd