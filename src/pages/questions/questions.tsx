import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../../assets/css/questions/questions.css';
import type { MenuProps } from 'antd';
import {
  Breadcrumb,
  Layout,
  Menu,
  Space,
  Table,
  Tag,
  Button,
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from 'antd';
import './../../assets/css/home/home.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { Card } from 'antd';
import {
  QuestionsList,
  QuestiontypeList,
  QuestionstateList,
  QuestionsDelete,
  QuestionsDeleteall,
} from '../../apis/questions/questions';
import moment from 'moment';
import { rejects } from 'assert';
const Home: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const { RangePicker } = DatePicker;
  //table表格展示类型 start
  const columns = [
    {
      title: '问题类型',
      dataIndex: 'typename',
      key: 'id',
      render: (record: any) => (
        <Space size="middle">
          <span onClick={diolog(record)}>{record}1</span>
        </Space>
      ),
    },
    {
      title: '问题地址',
      dataIndex: 'address',
      key: 'id',
    },
    {
      title: '问题描述',
      dataIndex: 'content',
      key: 'id',
    },
    {
      title: '处理状态',
      dataIndex: 'statename',
      key: 'id',
    },
    {
      title: '业主名称',
      dataIndex: 'username',
      key: 'id',
    },
    {
      title: '业主电话',
      dataIndex: 'tel',
      key: 'id',
    },
    {
      title: '维修日期',
      dataIndex: 'addtime',
      key: 'id',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary" danger onClick={DelModel(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  //table表格展示类型 end
  const [params, setParams] = useState<any>({
    page: 1,
    psize: 10,
  });
  //投诉列表 start
  const getList = async () => {
    const res: any = await QuestionsList(params);
    if (res.errCode == '10000') {
      res.data.list.forEach((item: any) => {
        item.addtime = moment(item.addtime).format('YYYY-MM-DD HH:MM');
      });
      setDataSource(res.data.list);
    }
  };
  //投诉列表 end
  //投诉类型列表 start
  const [getTypes, setTypes] = useState<any>([]);
  const GettypeList = async () => {
    const res: any = await QuestiontypeList({ page: 1, psize: 1000 });
    if (res.errCode === 10000) {
      setTypes(res.data.list);
    }   
  };
  //投诉类型列表 end
  //获取表单值 start
  const onFinish = (values: any) => {
    if (values.user.beengindate) {
      values.user.begindate = moment(values.user.beengindate[0]).format(
        'YYYY-MM-DD HH:MM'
      );
      values.user.enddate = moment(values.user.beengindate[1]).format(
        'YYYY-MM-DD HH:MM'
      );
    }
    values.user.page = 1;
    values.user.psize = 10;
    console.log({ ...params, ...values.user });

    setParams(values.user);
  };
  //获取表单值 end

  //获取投诉状态

  const [getState, setState] = useState<any>([]);
  const getStates = async () => {
    const res: any = await QuestionstateList({ page: 1, psize: 1000 });
    if (res.errCode == '10000') {
      setState(res.data.list);
    }
    console.log(res);
  };
  //table表格 复选框 start
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //table表格 复选框 end

  //批量删除 start
  const { confirm } = Modal;
  const DelAll = () => {
    confirm({
      title: '删除该数据，删除将无法挽回，是否删除？',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        const res: any = await QuestionsDeleteall({ ids: selectedRowKeys });
        if (res.errCode == '10000') {
          message.success('删除成功！');
          getList();
        } else {
          message.error(res.errMag);
        }
      },
      onCancel() {
        message.success('取消删除');
      },
    });
  };

  //批量删除 end
  const DelModel = (id: number) => {
    return () => {
      confirm({
        title: '删除该条数据，删除将无法挽回，是否删除？',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          console.log('123');
          const res: any = await QuestionsDelete({ id });
          if (res.errCode == '10000') {
            message.success('删除成功！');
            getList();
          } else {
            message.error(res.errMag);
          }
        },
        onCancel() {
          message.success('取消删除');
        },
      });
    };
  };
  useEffect(() => {
    getList();
  }, [params]);
  useEffect(() => {
    GettypeList();
    getStates();
  }, []);
  const diolog = (item: any) => {
    return () => {
      console.log(item);
    };
  };
  return (
    <div className="quest">
      <Card title="投诉列表" style={{ width: 'auto' }}>
        <Form layout="inline" name="nest-messages" onFinish={onFinish}>
          <Form.Item name={['user', 'key']} label="投诉标题">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'address']} label="地址">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'tel']} label="电话">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'beengindate']} label="按时间查询">
            <RangePicker />
          </Form.Item>
          <Form.Item name={['user', 'state']} label="投诉状态">
            <Select
              style={{ width: 120 }}
              options={getState}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item name={['user', 'type']} label="投诉类型">
            <Select
              style={{ width: 120 }}
              options={getTypes}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item name={['user', 'userid']} label="居民">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={DelAll}>
              批量删除
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
export default Home;
