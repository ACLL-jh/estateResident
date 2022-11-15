import { FC, useEffect, useState } from 'react';
import {
  Tabs,
  Input,
  Button,
  Form,
  Table,
  notification,
  Popconfirm,
} from 'antd';
import Feesadd from '../../components/feeadd/feeadd';
import '../../assets/css/fee/fee.css'
import { FeeList, FeeDelete, FeeDeleteall } from '../../apis/fee/fee';
const Fee: FC = (): JSX.Element => {
  const [listarr, setlistarr] = useState([]);
  const [delall, setdelall] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange = (key: string) => {
    console.log(key);
  };
  const isrefresh = (val: any) => {
    console.log(val);
    if (val === true) {
      getfeelist(null);
    }
  };
  const search = (values: any) => {
    console.log('Success:', values);
    getfeelist(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  // 删除
  const confirm = async (e: any) => {
    // console.log(e);
    let data = { id: e.id };
    const dels: any = await FeeDelete(data);
    // console.log(dels);
    if (dels.errCode === 10000) {
      notification.success({
        message: `删除成功`,
        description: ``,
        placement: 'top',
        duration: 1.5,
      });
      getfeelist(null);
    } else {
      notification.error({
        message: `删除失败`,
        description: ``,
        placement: 'top',
        duration: 1.5,
      });
    }
  };
  // 确认删除
  const confirmall = async () => {
    // 批删
    let data = { ids: delall };
    const res: any = await FeeDeleteall(data);
    console.log(res);
    if (res.errCode === 10000) {
      notification.success({
        message: `删除成功`,
        description: ``,
        placement: 'top',
        duration: 1.5,
      });
      getfeelist(null);
    } else {
      notification.error({
        message: `删除失败`,
        description: ``,
        placement: 'top',
        duration: 1.5,
      });
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setdelall(selectedRowKeys);
    },
  };
  // 关闭弹框
  const getChildrenValue = (val: any) => {
    setIsModalOpen(val);
  };
  // 表格
  const columns:any = [
    {
      title: 'id',
      dataIndex: 'id',
      align:'center'
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      align:'center'
    },
    {
      title: '楼栋名',
      dataIndex: 'building',
      align:'center'
    },
    {
      title: '房号',
      dataIndex: 'houseid',
      align:'center'
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      align:'center'
    },
    {
      title: '缴费类型',
      dataIndex: 'type',
      align:'center'
    },
    {
      title: '账期',
      dataIndex: 'begindate',
      align:'center'
    },
    {
      title: '应缴金额（元）',
      dataIndex: 'price',
      align:'center'
    },
    {
      title: '导入时间',
      dataIndex: 'addtime',
      align:'center'
    },
    {
      title: '添加者',
      dataIndex: 'admin',
      align:'center'
    },
    {
      title: '状态',
      dataIndex: 'stateName',
      align:'center'
    },
    {
      title: '操作',
      align:'center',
      render: (row: any) => (
        <div className="tabbtns">
          <Button type="primary" className="xqbtn" disabled={true}>
            详情
          </Button>
          <Button type="primary" className="upbtn" disabled={true} >
            修改
          </Button>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => confirm(row)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" danger className="delbtn">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const getfeelist = async (params: any) => {
    const res: any = await FeeList(params);
    // console.log(res);
    if (res.errCode === 10000) {
      let newarr = res.data.list;
      for (let i in newarr) {
        newarr[i].key = newarr[i].id;
      }
      setlistarr(newarr);
    }
  };
  useEffect(() => {
    getfeelist(null);
  }, []);
  const [form] = Form.useForm();
  return (
    <div className="app">
      <div className="top">
        <div className="titfont">
          <h3>缴费列表</h3>
        </div>
      </div>
      <div className="middle">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `已缴费`,
              key: '1',
              children: (
                <div className="search">
                  <Form
                    className="searchfrom"
                    name="noname"
                    form={form}
                    colon={false}
                    onFinish={search}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item label="姓名" name="key">
                      <Input  />
                    </Form.Item>

                    <Form.Item label="园区名称" name="buildingid">
                      <Input />
                    </Form.Item>
                    <Form.Item label="房号" name="houseno">
                      <Input />
                    </Form.Item>
                    <Form.Item label="联系方式" name="mibile">
                      <Input />
                    </Form.Item>
                    <Form.Item label="账期" name="begindate">
                      <Input />
                    </Form.Item>
                    <Form.Item label="添加人" name="admin">
                      <Input />
                    </Form.Item>
                    <Form.Item label="流水单号" name="orderno">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => {
                          form.resetFields();
                        }}
                      >
                        重置
                      </Button>
                    </Form.Item>
                    <div className="buttons">
                    <Button
                      className="addbut"
                      type="primary"
                      htmlType="submit"
                      onClick={showModal}
                    >
                      添加
                    </Button>
                    <Popconfirm
                      title="确认删除吗?"
                      onConfirm={confirmall}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button className="delbut" type="primary" danger htmlType="submit">
                        批量删除
                      </Button>
                    </Popconfirm>
                  </div>
                  </Form>
            
                  <div className="tablebox">
                    <Table
                      rowSelection={{
                        ...rowSelection,
                      }}
                      bordered
                      pagination={false}
                      columns={columns}
                      dataSource={listarr}
                    />
                  </div>
                </div>
              ),
            },
            {
              label: `未缴费`,
              key: '2',
              children: <h1>第二页面</h1>,
            },
          ]}
        />
      </div>
      <Feesadd
        isrefresh={isrefresh}
        showmodal={isModalOpen}
        getvalue={getChildrenValue}
      />
    </div>
  );
};
export default Fee;
