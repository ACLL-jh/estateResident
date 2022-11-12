import { Button, Modal, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
const BuilLog: React.FC<any> = (props: any) => {
  const [addForm] = useForm();
  const titleId = props.buiId;
  const titlName = props.name;
  addForm.setFieldValue('pid', titleId);
  addForm.setFieldValue('name', titlName);
  return (
    <Modal title={props.title} open={props.isShow} footer={null}>
      <Form
        form={addForm}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={props.handOk}
        autoComplete="off"
      >
        <Form.Item name="pid" label="pid">
          <Input disabled={true} defaultValue={titleId} />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input defaultValue={titlName} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
          <div>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Button onClick={props.handCancel} style={{ marginLeft: '10px' }}>
              取消
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BuilLog;
