import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import './advercss.css';
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  Upload,
  Radio,
} from 'antd';
import {
  AdtypeList,
  AdvertisementGet,
} from './../../apis/advertusenent/advertusenent';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps, RadioChangeEvent } from 'antd';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14, offset: 4 },
};

const Adver: React.FC<any> = (porps: any) => {
  const [selectLis, setSelect] = useState<any>([]);
  const getSelect = async () => {
    const res: any = await AdtypeList({ page: 1, psize: 100 });
    if (res.errCode == '10000') setSelect(res.data.list);
  };
  const useInfoData = async () => {
    const res: any = await AdvertisementGet({ id: porps.ModelId });
    if (res.errCode == '10000') {
      form.setFieldsValue(res.data);
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
    }
    console.log(res);
  };
  useEffect(() => {
    getSelect();

    if (porps.ModelId != 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInfoData();
    }
  }, []);
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);
  //单选题
  const [value, setValue] = useState<number>(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const props: any = {
    name: 'file',
    action: 'http://estate.eshareedu.cn/estate/api/upload/add',
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Modal
      title={porps.Title}
      open={porps.isModalOpen}
      width={800}
      onCancel={porps.handleCancel}
      okText={false}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={porps.onFinish}
        autoComplete="off"
      >
        <Form.Item {...formItemLayout} name="title" label="标题">
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="typeid" label="位置">
          <Select
            placeholder="请选择位置"
            style={{ width: 280 }}
            options={selectLis}
            fieldNames={{
              value: 'id',
              label: 'name',
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} name="url" label="URL">
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="picture" label="图片">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...formItemLayout} name="sort" label="排序">
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="enabled" label="是否显示">
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Adver;
