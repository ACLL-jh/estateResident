import { Button, Modal, Form,Input,Select, Cascader } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {BuildingList} from "../../apis/buiding/buiding";
// import {getHousesList} from '../../apis/house/house'
import {getHousesList} from '../../apis/house/house'
// import { findP } from '../../utils/treeUtils';
const Administratoradd = (props: any) => {
  // 下拉选择
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [form] = Form.useForm();
  // Form表单
  const onFinish = async(values:any) => {
    console.log(values);
    const res:any = await getHousesList({
      id:props.adminadd.id,
      ...values,
    }).catch()
    if(res.errCode===10000){
      props.handleCancels()
    }
  };
   // 楼栋
   const [options, setOptions]: any = useState([]);
   const getBuildinglist = async () => {
     const res: any = await BuildingList({}).catch();
     console.log(res,123)
     if(res && res.errCode === 10000){
      setOptions(res.data.list)
     }
   };
  //取消
  const getNo = ()=>{
    props.handleCancels()
  }
  const [confirmLoading,] = useState(false);
  const handleCancel = () => {
    props.handleCancels()
  };

  //修改
  const upData = useRef<any>()
  useEffect(() => {
    getBuildinglist()
    upData.current.setFieldsValue(props.adminadd)
  }, []);
  return (
    <div>
      <Modal
        title={props.adminadd.id?'修改房屋':'添加房屋'}
        width="40%"
        open={props.isModalOpen}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          ref={upData}
        >
          <Form.Item label="楼栋" name="buildingid">
            <Cascader
              style={{ width: '240px' }}
              changeOnSelect
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              options={options}
              expandTrigger="hover"
              placeholder="请选择"
            />
            </Form.Item>
          <Form.Item name="houseno" label="房间号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="areas" label="房间面积(平方)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="房间类型" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="orientation"
            label="朝向"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>          
          <Form.Item style={{ textAlign:'center' }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            <Button htmlType="button" onClick={getNo}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Administratoradd;
