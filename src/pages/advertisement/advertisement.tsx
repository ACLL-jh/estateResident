import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import AdverDalog from './../../components/dialog/adverDalog';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Table,
  Space,
  Select,
  Pagination,
  message,
} from 'antd';
import {
  AdvertisementList,
  AdvertisementAdd,
  AdtypeList,
} from './../../apis/advertusenent/advertusenent';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const Home: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '位置',
      dataIndex: 'typeName',
    },
    {
      title: '图片',
      dataIndex: 'picture',
      render: (record: number) => (
        <img
          src={'http://estate.eshareedu.cn/estate/upload/' + record}
          alt=""
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      render: (record: number) => <span>{record === 1 ? '显示' : '禁止'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'id',

      render: (record: number) => (
        <Space size="middle">
          <Button type="primary" onClick={editList(record)}>
            修改
          </Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  //修改
  const editList = (ids: number) => {
    return () => {
      setModelId(ids);
      setTitle('修改图片');
      setIsModalOpen(true);
    };
  };

  const [dataList, setDataList] = useState<any>([]);
  const [params, setParams] = useState<any>({
    page: 1,
    psize: 10,
    total: null,
    typeid: null,
  });
  const Advertisemen = async () => {
    const res: any = await AdvertisementList(params);
    if (res.errCode === 10000) {
      setDataList(res.data.list);
      // setParams({ ...params, total: res.data.counts });
    }
  };
  useEffect(() => {
    Advertisemen();
    getSelect();
  }, []);
  const handleChange = (value: string) => {
    setParams({ ...params, typeid: value });
    Advertisemen();
  };
  useEffect(() => {
    Advertisemen();
  }, [params]);
  const [selectLis, setSelect] = useState<any>([]);
  const getSelect = async () => {
    const res: any = await AdtypeList({ page: 1, psize: 100 });
    if (res.errCode == '10000') setSelect(res.data.list);
  };
  const AddListAdver = () => {
    setTitle('添加图片');
    setIsModalOpen(true);
  };

  //弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModelId, setModelId] = useState<number>(0);
  const [Title, setTitle] = useState<string>('');
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const AddAdver = async (values: any) => {
    console.log('Success:', values, values.picture.file);
    values.sort = Number(values.sort);
    if (values.id != 0) {
      values.id = ModelId;
    } else {
      values.id = 0;
    }
    if (values.picture.file) {
      values.picture = values.picture.file.response.data;
    } else {
      values.picture = values.picture;
    }

    const res: any = await AdvertisementAdd(values);
    if (res.errCode == '10000') {
      setIsModalOpen(false);
      Advertisemen();
      message.success('成功');
    } else {
      message.error('失败');
    }
  };
  return (
    <Card title="图片管理" bordered={false}>
      <div style={{ marginBottom: '20px' }}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item label="位置" name="username">
            <Select
              placeholder="请选择位置"
              style={{ width: 180 }}
              onChange={handleChange}
              options={selectLis}
              fieldNames={{
                value: 'id',
                label: 'name',
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" onClick={AddListAdver}>
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={dataList} />
      {/*   <Pagination
        total={params.total}
        showSizeChanger
        showQuickJumper
        defaultCurrent={params.page}
        defaultPageSize={params.psize}
        showTotal={(total) => `共${total} 条`}
      /> */}
      {isModalOpen && (
        <AdverDalog
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          ModelId={ModelId}
          Title={Title}
          onFinish={AddAdver}
        ></AdverDalog>
      )}
    </Card>
  );
};
export default Home;
