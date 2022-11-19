import React, { useEffect, useState } from "react";
// import '../../assets/css/Userinfo/Userinfo.css'
import type { ColumnsType } from 'antd/es/table';
import { Button, Form, Input, Cascader, Select, Table, Space, Modal } from 'antd';
import { userinfoList, userinfoDelete, userinfotypeList, buildingList, userinfoDeleteall } from '../../apis/userinfo/userinfo'
import UserinfoAdd from "../../components/userifoadd/adduserifo";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const Userinfo = () => {
  useEffect(() => {
    // 列表
    list()
    // 用户类型
    utypeList()
    // 楼栋
    builList()
  }, [])
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = (value: any) => {
    // console.log(value);
    buildingVals(value);
  };
  // interface Option {
  //   value: string | number;
  //   label: string;
  //   children?: Option[];
  // }
  // 用户类型
  const [opt, optionss] = useState([])
  //   练级选择器
  const [opts, optss] = useState([])
  const [buildingVal, buildingVals] = useState([])
  //   表格
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      align: "center"
    },
    {
      title: '头像',
      dataIndex: 'photo',
      render: (photo: any) => (
        <div style={{ width: "80px", height: "80px" }}>
          <img style={{ width: "80%", height: "80%", borderRadius: "5px" }} src={'http://www.eshareedu.cn/estate/upload/' + photo} alt="" />
        </div>
      ),
      align: "center"
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: "center"
    },
    {
      title: '业主类型',
      dataIndex: 'usertypeName',
      align: "center"
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: "center",
      render: (sex: any) => {
        return (
          sex === 0 ? '男' : '女'
        )
      }
    },
    {
      title: '身份证号',
      dataIndex: 'cardid',
      align: "center"
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      align: "center"
    },
    {
      title: '籍贯',
      dataIndex: 'usernative',
      align: "center"
    },
    {
      title: '民族',
      dataIndex: 'nation',
      align: "center"
    },
    {
      title: '小区',
      dataIndex: 'building',
      align: "center"
    },
    {
      title: '房间号',
      dataIndex: 'houseno',
      align: "center"
    },
    {
      title: '审核状态',
      dataIndex: 'stateName',
      align: "center"
    },
    {
      title: '操作',
      render: (record: any) => (
        <Space>
          <Button onClick={amends(record)} style={{ backgroundColor: "#67c23a", color: "#ffffff" }}>修改</Button>
          <Button onClick={del(record.id)} type="primary" danger>删除</Button>
        </Space>
      ),
      align: "center"
    },
  ];
  const [data, setData] = useState([])
  const [ids, setids]: any = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log(selectedRowKeys);
      setids(selectedRowKeys)
    }
  };
  const [lists, setlists] = useState([])
  // 列表
  const list = async () => {
    const res: any = await userinfoList({})
    console.log(res);
    if (res.errCode == 10000) {
      setlists(res.data.list)
    }
  }
  const [setOpen, setOpens] = useState(false)
  // 删除
  const { confirm } = Modal;
  const del: any = (id: any) => {
    return () => {
      confirm({
        title: '',
        icon: <ExclamationCircleOutlined />,
        content: '此操作将会永久删除此数据  确定删除吗',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK');
          yesDel(id)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };
  const yesDel: any = async (id: any) => {
    console.log(id);
    const res: any = await userinfoDelete({ id })
    console.log(res);
    if (res.errCode === 10000) {
      list()
    }
  }
  const utypeList = async () => {
    const res: any = await userinfotypeList({})
    // console.log(res);
    if (res.errCode === 10000) {
      optionss(res.data.list)
    }
  }
  const builList = async () => {
    const res: any = await buildingList({})
    // console.log(res);
    if (res.errCode === 10000) {
      optss(res.data.list)
    }
  }
  // 接受子组件传过来的值
  const yes = (e: any) => {
    setOpens(e)
    list()
  }
  // 批删
  const dels = async () => {
    console.log(ids);
    const res: any = await userinfoDeleteall({
      ids: ids
    })
    console.log(res);
    if (res.errCode === 10000) {
      list()
    }
  }
  const userinfoAdds = () => { }
  // 修改
  const [id, idd] = useState<any>()
  const [row, rows] = useState([])
  const amends: any = (record: any) => {
    return () => {
      idd(record.id)
      setOpens(true)
      rows(record)
    }
  }
  // 添加
  const add = () => {
    idd(0)
    setOpens(true)
    rows([])
  }
  // 查询

  return (
    <div>
      <div className="top">居民 管理</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
        style={{ margin: "20px 0px 0px 0px" }}
      >
        <Form.Item
          label="楼栋ID:"
        >
          <Cascader style={{ width: '180px' }} options={opts} fieldNames={{ label: 'name', value: 'id', children: 'children' }} onChange={onChange} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="username"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="电话"
          name="password"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="房间号"
          name="room"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户类型"
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            查询
                </Button>
        </Form.Item>
      </Form>
      <div className="btn" style={{ marginTop: '20px' }}>
        <Button onClick={add} type="primary">添加</Button>
        <Button onClick={dels} style={{ margin: "0px 10px", }} type="primary" danger>批量删除</Button>
        <Button style={{ backgroundColor: "#67c23a", color: "#ffffff" }}>批量审核</Button>
      </div>
      <Table
        rowKey={'id'}
        columns={columns}
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={lists}
      />
      {
        setOpen &&
        <UserinfoAdd aaaa={setOpen} yess={yes} add={userinfoAdds} id={id} row={row}></UserinfoAdd>
      }
    </div>
  )
}
export default Userinfo;