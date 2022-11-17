import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Select, Modal, message, Popover } from 'antd';
import './../../assets/css/home/home.css';
import type { ColumnsType } from 'antd/es/table';
import { list, staffdelete, taffdele, stafftlist } from '../../apis/staff/staff'
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { delte } from '../../apis/userinfo/userinfo';
import OfficeAdd from '../../components/statssadd/statssadd'
// import 
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const Home: React.FC = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    // 表格

  };
  const [flag, setflag] = useState(false)
  const add = () => {
    console.log(123);
    setflag(true)

  }
  const [row, setrow] = useState([])
  const [id, setid] = useState(0)
  const unp: any = (row: any) => {
    return () => {
      setrow(row)
      setflag(true)
      setid(row.id)
      console.log(123);

    }

  }
  const fn = (val: any) => {
    setflag(val)
    stafflist()
  }
  // 表格
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

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
  const [datas, setDatas] = useState([])
  // 调用列表接口
  const stafflist = async () => {
    const res: any = await list({})
    console.log(res);
    if (res.errCode === 10000) {
      setDatas(res.data.list)
    }
  }
  useEffect(() => {
    stafflist()

  }, [])

  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',

      // render: text => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '职员类型',
      dataIndex: 'typename',
      align: 'center',

    },
    {
      title: '性别',
      dataIndex: 'sex',

      align: 'center',
      render(sex) {
        return (
          sex == 0 ? '男' : '女'
        )
      }
    },
    {
      title: '身份证号码',
      dataIndex: 'cardid',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '管理小区',
      dataIndex: 'building',
      align: 'center',
      render: (texts: any) =>
        <div>
          {
            texts.map((item: any, index: number) =>
              index === 0 &&
              <span key={index}>{item.building}</span>
            )}
          {
            texts.length > 1 &&
            <span>
              <Popover placement="left" content={(
                <div>
                  {
                    texts.map((items: any, indexs: any) => (
                      <div key={indexs}>{items.building}</div>
                    ))
                  }
                </div>
              )} title="全部职务
              ">
                <span style={{ marginLeft: '5px', color: '#409eff' }}>查看全部</span>
              </Popover>
            </span>
          }
        </div>
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (id) =>
        <div>
          <Button type="primary" style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }} onClick={unp(id)}>修改</Button>
          <Button type="primary" danger style={{ marginLeft: '20px ' }} onClick={() => dete(id)}>删除</Button>
        </div>


    },
  ];
  // 删除
  const dete = async (listid: any) => {
    // return async () => {
    console.log(listid);
    const res = await staffdelete({ id: listid.id })
    console.log(res);
    // }

  }
  // 职员类型
  const [lists, setlists] = useState([])
  const officelerk = async () => {
    const res: any = await stafftlist({})
    console.log(res);
    if (res.errCode === 10000) {
      setlists(res.data.list)
    }
  }
  useEffect(() => {
    officelerk()
  }, [])
  // const dete = (listid: any) => {


  //     console.log(listid);
  //     const res = await rowdel({ id: listid.id })
  //     console.log(res);
  //   }
  // }
  // 批删
  // async的意思就是将异步转化为同步
  const { confirm } = Modal;
  const delte = async () => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确认要删除这些数据嘛？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const res: any = await taffdele({
          ids: selectedRowKeys
        })
        if (res.errCode === 10000) {
          console.log(res);
        }
        message.success('删除成功');
      },
    });
  }
  return (
    <div>
      <Form
        key="id"
        layout={"inline"}
      >
        <Form.Item label="姓名：">
          <Input placeholder="职员名" />
        </Form.Item>
        <Form.Item label="职员类型：">
          <Select
            placeholder="请选择"
            style={{ width: 120 }}
            fieldNames={{ label: 'name', value: 'id' }}
            options={lists}
          />

        </Form.Item>
        <Form.Item >
          <Button type="primary" style={{ marginLeft: '20px ' }}>查询</Button>
          <Button type="primary" style={{ marginLeft: '20px ' }} onClick={add}>添加</Button>
          <Button type="primary" danger style={{ marginLeft: '20px ' }} onClick={delte}>
            批量删除
    </Button>
        </Form.Item>
      </Form>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={datas} />
      <OfficeAdd flag={flag} fn={fn} row={row} id={id}></OfficeAdd>
    </div >
  );
};
export default Home;
