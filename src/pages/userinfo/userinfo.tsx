import React, { useEffect, useState } from 'react';
import { Cascader, message, } from 'antd';
import { Form, Input, Radio } from 'antd';
import { Select } from 'antd';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './../../assets/css/home/home.css';
import Add from '../../components/userifoadd/add'
import { Modal, Space } from 'antd';
import { list, delte, rowdel, buildinglist } from '../../apis/userinfo/userinfo'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const Home: React.FC = () => {
  // 弹框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onChange = (value: any) => {
    console.log(value);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      align: 'center',

      dataIndex: 'id',
    },
    {
      title: '头像',
      align: 'center',
      dataIndex: 'photo',
      render: (photo, id) =>
        <div>
          {/* 三元判断 */}
          {
            photo ? <img src={"http://www.eshareedu.cn/estate/upload/" + photo} alt="" style={{ width: '50px', height: '50px' }} /> : ''
          }

        </div>
    },
    {
      title: '姓名',
      align: 'center',

      dataIndex: 'name',
    },
    {
      title: '业主类型',
      align: 'center',
      dataIndex: 'usertypeName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'usertypeName',
      render: (usertypeName) => {
        // 使用三元表达式进行判断
        return (
          usertypeName == 0 ? '男' : '女'
        )
      }
    },
    {
      title: '身份证号',
      align: 'center',
      dataIndex: 'cardid',
    },
    {
      title: '手机号',
      align: 'center',
      dataIndex: 'usertypeName',
    },
    {
      title: '籍贯',
      align: 'center',
      dataIndex: 'usernative',
    },
    {
      title: '民族',
      align: 'center',
      dataIndex: 'nation',
    },
    {
      title: '小区',
      align: 'center',
      dataIndex: 'building',
    },
    {
      title: '房间号',
      align: 'center',
      dataIndex: 'houseno',
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'stateName',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: '',
      render: (id) =>
        <div>
          <Button type="primary" style={{ backgroundColor: "#67c23a", borderColor: "#67c23a" }}>
            修改
            </Button>
          <Button type="primary" danger style={{ marginLeft: "10px" }} onClick={dete(id)}>
            删除
            </Button>
        </div>


    },
  ];

  const [data, setData] = useState([])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // 调用列表接口
  const userlist = async () => {
    const res: any = await list({})
    console.log(res);
    if (res.errCode === 10000) {
      setData(res.data.list)
    }
  }
  useEffect(() => {
    userlist()
    buillist()
  }, [])
  // 批量删除
  // async的意思就是将异步转化为同步
  const { confirm } = Modal;
  const del = async () => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确认要删除这些数据嘛？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const res: any = await delte({
          ids: selectedRowKeys
        })
        if (res.errCode === 10000) {
          console.log(res);
        }
        message.success('删除成功');
        userlist()
      },
    });
  }
  // 删除
  const dete = (listid: any) => {
    return async () => {

      console.log(listid);
      const res = await rowdel({ id: listid.id })
      console.log(res);
    }
  }
  // userlist()


  // 弹框
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = () => {

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [opacity, setopacity] = useState([])
  // 列表的级联选择器
  const buillist = async () => {
    const res: any = await buildinglist({})
    console.log(res);
    if (res.errCode === 10000) {
      setopacity(res.data.list)
    }

  }
  return (
    <div>
      <div>
        <div style={{ color: "#427ff4" }}>居民管理</div>
        <Form
          style={{ marginTop: "20px" }}
          layout={"inline"}
        >
          <Form.Item label="楼栋id:">
            <Cascader options={opacity} style={{ width: "200px" }} onChange={onChange} fieldNames={{ label: 'name', value: 'id', children: 'children' }} placeholder="请选择" />
          </Form.Item>
          <Form.Item label="姓名">
            <Input placeholder="居民姓名" />
          </Form.Item>
          <Form.Item label="电话">
            <Input placeholder="居民电话" />
          </Form.Item>
          <Form.Item label="房间号">
            <Input placeholder="房间号" />
          </Form.Item>
          <>
            <Form.Item label="房间号">
              <Select
                defaultValue="请选择"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: '业主',
                    label: '业主',
                  },
                  {
                    value: '租户',
                    label: '租户',
                  },

                ]}
              />
            </Form.Item>

          </>
          <Form.Item>
            <Button type="primary">
              查询
            </Button>
          </Form.Item><br />
          <Form.Item>
            <Add></Add>
            {/* <Button type="primary" onClick={showModal}>
              添加
            </Button> */}
            {/* <Modal title="添加居民" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
              <Userifoadd></Userifoadd>
            </Modal> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={del}>
              批量删除
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ backgroundColor: "#67c23a", borderColor: "#67c23a" }}>
              批量审核
            </Button>
          </Form.Item>

          <div>
          </div>
        </Form>
        <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />

      </div>

    </div>
  );
};
export default Home;
