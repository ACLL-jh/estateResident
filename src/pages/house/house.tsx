import { FC,useEffect, useState } from 'react';
import { Button,Input,Table } from 'antd';
import {getHousesList} from '../../apis/house/house';
import type { ColumnsType } from 'antd/es/table';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const Index:FC<any> = (props:any):JSX.Element=>{
  const columns:ColumnsType<any> = [
    {
      title: '房间id',
      dataIndex: 'id',
      align:'center'
    },
    {
      title: '楼号',
      dataIndex: 'buildingid',
      align:'center'
    },
    {
      title: '房间号',
      dataIndex: 'building',
      align:'center'
    },
    {
      title: '面积(平方)',
      dataIndex: 'areas',
      align:'center'
    },
    {
      title: '房间类型',
      dataIndex: 'type',
      align:'center'
    },
    {
      title: '朝向',
      dataIndex: 'orientation',
      align:'center'
    },
    {
      title: '操作',
      dataIndex: 'id',
      align:'center',
      render: (id)=>(
        <div>
          <Button type="primary" style={{marginRight:10}}>
            修改
          </Button>
          <Button type="primary" className='delbtn' danger>
            删除
          </Button>
          </div>
    ),
    }
  ]
  const [list,setList] = useState<any>([]);
  const getData = async()=>{
    const res:any = await getHousesList({}).catch(()=>{})
    console.log(res)
    if(res.errCode === 10000){
      setList(res.data.list)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  // 选择框
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
      <div>
        <div id='box'>
          <p id='title'>房屋</p>
        </div>
        <div className="top">
          <Collapse accordion>
          <Panel header="筛选查询" key="1">
          <div>
            <p>楼栋id</p>
            <Input type='text'/>
          </div>
          </Panel>
          </Collapse>
        </div>
        <div className="list">
          <Table bordered className='table' rowKey="id" rowSelection={rowSelection} dataSource={list} columns={columns} />
        </div>
      </div>
  );
}

export default Index;
