import React, { useState, useEffect, useRef, FC } from 'react';
import {
  Button,
  Table,
  Form,
  Input,
  Modal,
  message,
  DatePicker,
  Space,
  Select,
  Cascader,
  RadioChangeEvent,
  Radio,
} from 'antd';
import {
  FeeList,
  FeeDelete,
  FeeDeleteall,
  buildingList,
  // FeeAdd,
  Feetype,
} from '../../apis/fee/fee';
import './../../assets/css/fee/fee.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// 横向布局属性
type LayoutType = Parameters<typeof Form>[0]['layout'];
const Fee: React.FC = (): JSX.Element => {
  const [ListData, useFeeList] = useState([]);
  const [buildings, setbuildings] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //添加弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usertype, setUsertype] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //日期选择器
  const { RangePicker } = DatePicker;
  // 下拉菜单
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  //单选框
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  //表格
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
    },
    {
      title: '楼栋名',
      dataIndex: 'building',
      key: 'building',
      align: 'center',
    },
    {
      title: '房号',
      dataIndex: 'houseno',
      align: 'center',
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '缴费类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '账期',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '应缴金额（元）',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: '导入时间',
      dataIndex: 'addtime',
      align: 'center',
    },
    {
      title: '添加者',
      dataIndex: 'admin',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'stateName',
      align: 'center',
    },
    {
      title: '操作',
      width: '300px',
      align: 'center',
      render: (id: any) => (
        <div className="btn">
          <Button type="primary">详情</Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }}
          >
            修改
          </Button>
          <Button type="primary" danger onClick={del(id)}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  //缴费列表
  const List = async () => {
    let res: any = await FeeList({});
    let { list } = res.data;
    useFeeList(list);
    if (res.errCode === 10000) {
      console.log(res.data.list);
      setLoading(true);
    }
  };
  //缴费添加
  // const add = async () => {
  //   let res: any = await FeeAdd({});
  //   console.log(res);
  // };
  //缴费删除
  const del = (listid: any) => {
    return async () => {
      confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '确定删除该条数据吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          let res: any = await FeeDelete({ id: listid.id });
          //console.log(res);
          if (res.errCode === 10000) {
            // console.log(res);
            message.success('删除成功');
          }
          List();
        },
        onCancel() {
          message.error('取消删除');
        },
      });
    };
  };
  //批量删除
  const { confirm } = Modal;
  const delall = async () => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确定批量删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        let res: any = await FeeDeleteall({ ids: selectedRowKeys });
        // console.log(res);
        if (res.errCode === 10000) {
          // console.log(res);
          message.success('删除成功');
        }
        List();
      },
      onCancel() {
        message.error('取消删除');
      },
    });
  };
  //缴费类型
  const types = async () => {
    let res = await Feetype({});
    // console.log(res);
    setUsertype(res.data.list);
  };

  const Buildinglist = async () => {
    const res = await buildingList({});
    setbuildings(res.data.list);
  };
  useEffect(() => {
    List();
    types();
    Buildinglist();
  }, []);
  return (
    <div>
      <Form layout={'inline'}>
        <Form.Item label="姓名">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="园区名称">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="房号">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="联系方式">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="账期">
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </Form.Item>
        <Form.Item label="添加人">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="流水单号">
          <Input placeholder="" />
        </Form.Item>
        <div className="btn-box">
          <Form.Item>
            <Button type="primary">查询</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary">重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={showModal}>
              添加
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={delall}>
              批量删除
            </Button>
          </Form.Item>
        </div>
      </Form>
      {/* 添加弹出框 */}
      <Modal
        width={550}
        title="新增缴费"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form 
          labelAlign="left"
          labelCol={{ span:4 }}
          wrapperCol={{ span: 12}}
          >
          <Form.Item label="费用类型:">
            <Select
              defaultValue="物业费"
              onChange={handleChange}
              options={usertype}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item label="金额:">
            <Input placeholder=""/>
          </Form.Item>
          <Form.Item label="账期:">
            <RangePicker  />
          </Form.Item>
          <Form.Item label="小区:">
            <Cascader
              options={buildings}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              placeholder="请选择"
            />
          </Form.Item>
          <Form.Item label="缴费房间:">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>全部房间</Radio>
              <Radio value={2}>部分房间</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={ListData}
        />
    </div>
  );
};
export default Fee;
