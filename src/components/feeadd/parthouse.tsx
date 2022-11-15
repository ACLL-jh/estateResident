import React,{FC,useState,useEffect} from 'react'
import {Modal,Form,Input,Button,Table} from 'antd';
import {housesList} from '../../apis/fee/fee'
import '../../assets/css/parthouse/parthouse.css'
const Gethouseid:FC<any>=(props:any):JSX.Element=> {
  const [form] = Form.useForm();
  const [listarr,setlistarr] = useState([]);
  const [pagesize,setpagesize] = useState(1);
  const [pagenum,setpagenum] = useState(5);
  const [counts,setcounts] = useState();
  const [houseids,sethouseids] = useState<any>()
  const houseidsOk = ()=>{
    props.isModalCloce(false)
    props.getid(houseids)
  }
  const houseidsClose = ()=>{
    props.isModalCloce(false)
  }
  const gethouselist = async ()=>{
    let params = {
      buildingid:props.id,
      page:pagesize,
      psize:pagenum,
    }
    const res:any = await housesList(params)
    if(res.errCode===10000){
      setcounts(res.data.counts)
      let newarr = res.data.list
      for(let i in newarr){
        newarr[i].key=newarr[i].id
      }
      setlistarr(newarr)
    }
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[],) => {
      console.log(selectedRowKeys);
      sethouseids(selectedRowKeys)
    },
    getCheckboxProps: (record:any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
    
  };
  const columns:any = [
    {
      title: '楼号',
      dataIndex: 'building',
      align:'center'
    },
    {
      title:'房间号',
      dataIndex:'houseno',
      align:'center'
    },
    {
      title:'业主',
      align:'center'
    },
    {
      title:'电话',
      align:'center'
    },
  ]
  useEffect(()=>{
    gethouselist()
  },[props.id])
  return(
    <div className='app'>
      <Modal title="选择房屋" width={760} open={props.isModalOpen} onOk={houseidsOk} onCancel={houseidsClose}>
        <div className='box' id='box'>
          <div className='searchbox'>
              <Form
              className='searchfrom'
              name="basic"
              colon = {false}
              form={form}
              >
              <Form.Item
                style={{marginRight:'10px'}}
                label="房间号:"
                name="username"
                >
                <Input />
              </Form.Item>
              <Form.Item
              style={{marginRight:'10px'}}
                label="小区名称:"
                name="username"
                >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Form>
          </div>
            <Table
            rowSelection={{
              ...rowSelection,
            }}
            bordered 
            pagination={false}
            columns={columns}
            dataSource={listarr}/>
          </div>
      </Modal>
    </div>
  )
}
export default Gethouseid