import { FC, useEffect, useState } from "react"
import { Input, Button, Form, notification, Table, Popconfirm, Pagination } from 'antd';
import { administrator, deladmin } from "../../apis/addadmin/addadmin"
import Addadmins from '../../components/addadmin/addaadmin'
const Administrator: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addorupdate, setaddorupdata] = useState(0)
  const [listarr, setlistarr] = useState<any>()
  const [form] = Form.useForm();
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '登陆账号',
      dataIndex: 'username',
      width: 200,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      align: 'center'
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      width: 200,
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      width: 200,
      align: 'center'
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (row: any) =>
        <div className="tabbtns">
          <Button type="primary"
            onClick={() => { open(row) }}
            className="upbtn" style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }}>修改</Button>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => { delet(row) }}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" className="delbtn" style={{ marginLeft: '20px', backgroundColor: '#f56c6c', borderColor: ' #f56c6c' }}>删除</Button>
          </Popconfirm>
        </div>
    }
  ]
  const open = (v: any) => {
    if (v !== 0) {
      setaddorupdata(v)
    } else {
      setaddorupdata(0)
    }
    setIsModalOpen(true)
  }
  const delet = async (v: any) => {
    let params = {
      id: v.id
    }
    const res: any = await deladmin(params)
    console.log(res);
    if (res.errCode === 10000) {
      notification.success({
        message: `删除成功`,
        description: ``, placement: 'top', duration: 1
      });
      getlist(null)
    } else {
      notification.error({
        message: `删除失败：${res.errMsg}`,
        description: ``, placement: 'top', duration: 1
      });
    }
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[],) => {
      console.log(selectedRowKeys);
    },
  };
  const colose = (v: boolean) => {
    setIsModalOpen(v)
  }
  const [counts, setcounts] = useState<any>(0)
  const [pagesize, setpagesize] = useState(1);
  const [pagenum, setpagenum] = useState(5);
  const getlist = async (k: any) => {
    let data: any = {
      pageSize: pagesize,
      psize: pagenum,
      key: k
    }
    const res: any = await administrator(data)
    console.log(res);
    if (res.errCode === 10000) {
      let newarr = res.data.list;
      for (let i in newarr) {
        newarr[i].key = newarr[i].id
      }
      setcounts(res.data.counts)
      setlistarr(newarr)
    }
  }
  const search = (v: any) => {
    getlist(v.key)
  }
  const pagechange = async (page: any, pageSize: any) => {
    await setpagesize(page)
    await setpagenum(pageSize)
    getlist(null)
  }
  useEffect(() => {
    getlist(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesize, pagenum])
  return (
    <div className='app'>
      <div className='top'>
        <div className='titfont'>
          <h3>
            管理员列表
        </h3>
        </div>
      </div>
      <div className='middle'>
        <div className='search'>
          <Form
            form={form}
            className='searchfrom'
            name="noname"
            colon={false}
            onFinish={search}
          >
            <Form.Item
              label="关键字"
              name="key"
            >
              <Input placeholder="关键字" allowClear style={{ width: 120 }} />
            </Form.Item>
            <Form.Item>
              <Button className="searchbut" type="primary" htmlType="submit">
                查询
            </Button>
            </Form.Item>
          </Form>
          <div className='buttons'>
            <Button className='addbut' type="primary" onClick={() => { open(0) }}>
              添加
              </Button>
          </div>
          <div className='tablebox'>
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
      </div>
      <Addadmins isadd={addorupdate} colse={colose} refresh={getlist} isopen={isModalOpen} />
    </div>
  )
}
export default Administrator