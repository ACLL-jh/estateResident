import React, { FC, useState, useEffect } from 'react';
import { Modal, Form, Select, Input, notification } from 'antd';
import { administratorrole, addadmin } from '../../apis/addadmin/addadmin'
const Addadmins: FC<any> = (props: any): JSX.Element => {
  const [form] = Form.useForm();
  const [rolelist, setrolelist] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, settitle] = useState('添加管理员')
  //  确定按钮
  const handleOk = () => {
    setConfirmLoading(true);
    const formdata: any = form.getFieldsValue()
    console.log(formdata);
    try {
      add(formdata);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      setConfirmLoading(false);
    }
  };
  const add = async (data: any) => {
    data.id = props.isadd.id
    console.log(data);
    const res: any = await addadmin(data)
    console.log(res);
    if (res.errCode === 10000) {
      if (props.isadd.id !== 0) {
        notification.success({
          message: `修改成功`,
          description: ``, placement: 'top', duration: 1
        });
        setTimeout(() => {
          setConfirmLoading(false);
          props.colse(false)
          props.refresh()
        }, 1500);
      } else {
        notification.success({
          message: `添加成功`,
          description: ``, placement: 'top', duration: 1
        });
        setTimeout(() => {
          setConfirmLoading(false);
          props.colse(false)
          props.refresh()
        }, 1500);
      }
    } else {
      notification.error({
        message: `添加失败：${res.errMsg}`,
        description: ``, placement: 'top', duration: 1
      });
      setConfirmLoading(false);
    }
  }
  const handleCancel = () => {
    props.colse(false);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const getrolelist = async () => {
    const res: any = await administratorrole();
    console.log(res);
    let newarr = res.data.list
    for (let i in newarr) {
      newarr[i].key = newarr[i].id
      newarr[i].label = newarr[i].name
      newarr[i].value = newarr[i].id
    }
    setrolelist(newarr)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    console.log(sessionStorage.getItem('token'));
    // getrolelist()
    if (props.isadd !== 0) {
      settitle('修改管理员')
      form.setFieldsValue(props.isadd)
    } else {
      settitle('添加管理员')
      form.resetFields()
    }
  }, [props.isadd])
  return (
    <div>
      <Modal
        title={title}
        open={props.isopen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className='frombox'>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            validateTrigger='onBlur'
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ marginRight: '70px' }}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '账号不能为空!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="pass"
              rules={[{ required: true, message: '密码不能为空!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['pass']}
              rules={[{
                required: true,
                message: '两次输入的密码不一致!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pass') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '账号不能为空!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="联系方式"
              name="tel"
              rules={[{ required: true, message: '账号不能为空!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="角色"
              name="typeid"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select placeholder="请选择" options={rolelist} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
export default Addadmins