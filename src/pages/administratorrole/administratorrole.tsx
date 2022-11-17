import React, { useEffect, useState } from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { Button, Table,Modal,message,Checkbox } from 'antd';
import { MenuList } from '../../apis/buiding/buiding';
import Upload from '../../components/uplod/uplode';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import '../../assets/css/role/role.css'
// import { useNavigate, Outlet } from 'react-router-dom';
import { rolelist,roledelete,roleadd} from '../../apis/administratorrole/administratorrole';
const CheckboxGroup = Checkbox.Group;
const App: React.FC<any> = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ListData, useroleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const { confirm } = Modal;
  const { setImageUrl } = props;
  const [plainOptions, setplainOptions] = useState<any>([]);
  const [checkedList, setCheckedList] = useState<any>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const { target } = e;
    console.log(e.target.value);
    MenuS.forEach((item: any) => {
      if (item.id == e.target.value) {
        if (e.target.checked == true) {
          item.checked = 1;
          item.children.forEach((check: any) => {
            check.checked = 1;
          });
        } else {
          item.checked = 0;
          item.children.forEach((check: any) => {
            check.checked = 0;
          });
        }
      }
    });
    const menuData = MenuS.filter((item: any) => {
      if (item.id === target.value) {
        if (e.target.checked == true) {
          item.checked = 1;
          item.children.forEach((check: any) => {
            check.checked = 1;
          });
        } else {
          item.checked = 0;
          item.children.forEach((check: any) => {
            check.checked = 0;
          });
        }
        item.checkS = item.children.map((sub: any) => sub.id);
        return item;
      }
    });
    console.log(MenuS);

    setMenuS(
      MenuS.map((item: any) =>
        item.id === target.value ? { ...item, checked: target.checked } : item
      )
    );
    if (target.checked) {
      setCheckedList([...new Set(checkedList.concat(menuData[0].checkS))]);
    } else {
      setCheckedList([
        ...new Set(
          checkedList.filter((item: any) => !menuData[0].checkS.includes(item))
        ),
      ]);
    }
  };
  const [MenuS, setMenuS] = useState<any>([]);
  const AdminroleList = async () => {
    const res: any = await MenuList({ page: 1, psize: 1000 });
    if (res.errCode == '10000') {
      setMenuS(res.data.list);
    }
  };
  //角色列表
  const List = async () => {
    let res: any = await rolelist({});
    let { list } = res.data;
    useroleList(list);
    if (res.errCode === 10000) {
      console.log(res.data.list);
      setLoading(true);
    }
  };
    //角色删除
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
            let res: any = await roledelete({ id: listid.id });
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
  //表格
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '登陆账号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (id: any) => (
        <div className="btn">
          <Button
            type="primary"
            style={{ backgroundColor: '#67c23a', borderColor: '#67c23a',marginRight:10}}
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
  useEffect(() => {
    List();
    AdminroleList();
  }, []);
  const onChangeCheck = (e: any, item: any) => {
    const { target } = e;
    MenuS.forEach((items: any) => {
      if (items.id == item.id) {
        items.children.forEach((item: any) => {
          if (item.id === target.value) {
            if (target.checked === true) {
              item.checked = 1;
            } else {
              item.checked = 0;
            }
          }
        });
        let checkeds = items.children.filter((cheS: any) => cheS.checked == 1);
        items.checked = checkeds.length === items.children.length ? 1 : 0;
        if (checkeds.length > 0 && items.checked != 1) {
          items.indeterminate = true;
        } else if (checkeds.length === 0 || items.checked == 1) {
          items.indeterminate = false;
        }
      }
    });
    if (target.checked) {
      setCheckedList([...new Set(checkedList.concat(target.value))]);
    } else {
      setCheckedList([
        ...new Set(checkedList.filter((item: any) => item !== target.value)),
      ]);
    }
    setMenuS(MenuS);
  };
  const [DataUrl, setDataUrl] = useState(
    'http://estate.eshareedu.cn/estate/api/upload/add'
  );
  const [urls, setUrl] = useState();
  useEffect(() => {
    console.log(urls);
  }, [urls]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showModal}>添加</Button>
      </div>
      <Table
        style={{width:900,border:'1px solid #ebeef5'}}
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={ListData}
      />
      <Modal title="添加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {MenuS.map((item: any, index: number) => (
          <div key={item.id}>
            <Checkbox
              indeterminate={item.indeterminate}
              onChange={onCheckAllChange}
              value={item.id}
              checked={item.checked}
            >
              {item.name}
            </Checkbox>
            <br />
            <CheckboxGroup style={{ marginLeft: '20px' }} value={checkedList}>
              {item.children.map((items: any) => (
                <Checkbox
                  value={items.id}
                  onChange={(e) => onChangeCheck(e, item)}
                  key={items.id}
                  // checked={items.checked}
                >
                  {items.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        ))}
      </Modal>
      <Upload actionUrl={DataUrl} setImageRPops={setUrl}></Upload>
      {urls}
    </div>
  );
};

export default App;
