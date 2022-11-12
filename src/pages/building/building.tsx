import React, { useEffect, useState } from 'react';
import './../../assets/css/buiding/buiding.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tree, Button, Form, Input, message, Modal } from 'antd';
import './../../assets/css/home/home.css';
import {
  BuildingList,
  BuildingAdd,
  BuildingDel,
} from '../../apis/buiding/buiding';
import BuilLog from './../../components/building/buildingLog';
import { useForm } from 'antd/es/form/Form';
const Home: React.FC = () => {
  const getbuiding = async () => {
    const res: any = await BuildingList({ page: 1, psize: 10000 });
    console.log(res);
    if (res.errCode == '10000') {
      let list = JSON.parse(JSON.stringify(res.data.list));
      setTrrData(treeToArr(list));
      setTrrs(toParse(res.data.list));
    }
  };
  useEffect(() => {
    getbuiding();
  }, []);
  const getNode = (name: string, id: number, pid: number) => {
    return (
      <div className="tree_node">
        <div className="node_name"> {name} </div>
        <div className="fn_btns">
          <Button type="primary" onClick={addChilde('添加子类', id, pid)}>
            添加子类
          </Button>
          <Button
            type="primary"
            className="edit"
            style={{ backgroundColor: '#67c23a', border: '1px solid #67c23a' }}
            onClick={editChilde('修改节点', id, pid, name)}
          >
            修改
          </Button>
          <Button type="primary" danger onClick={dell(id)}>
            删除
          </Button>
        </div>
      </div>
    );
  };
  const [trrList, setTrrs] = useState<any>([]);
  const [trrData, setTrrData] = useState<any>([]);
  let fieldNames: any = {
    title: 'name',
    key: 'id',
  };
  //将树形转换成无限级
  const treeToArr = (data: any) => {
    let result: any = [];
    data.forEach((item: any) => {
      const loop = (data: any) => {
        result.push({
          id: data.id,
          name: data.name,
          children: data.children,
          pid: data.pid,
        });
        let child = data.children;
        if (child) {
          for (let i = 0; i < child.length; i++) {
            loop(child[i]);
          }
        }
      };

      loop(item);
    });
    result = result.map((item: any) => ({ ...item, children: null }));
    return result;
  };
  //递归修改称虚拟Dom
  const toParse = (arr: any) => {
    arr.forEach((item: any) => {
      item.name = getNode(item.name, item.id, item.pid);
      if (item.children && Array.isArray(item.children)) {
        toParse(item.children);
      }
    });
    return arr;
  };

  //所有数据的展示
  const treeConvertArr = (tree: any, arr: any) => {
    tree.map((item: any) => {
      if (item.children) {
        treeConvertArr(item.children, arr);
        delete item.children;
      }
      arr.push(item);
    });
    return arr;
  };

  //找父级对象
  const toPropid = (arr: any, value: any, list: any) => {
    arr.forEach((item: any) => {
      if (item.id === value.pid) {
        toPropid(arr, item, list);
        list.push(item);
      }
    });

    return list;
  };
  //查询的要搜索的数据
  const toCholid = (data: any, dataLsit: any) => {
    let DataList: any = [];
    data.forEach((item: any) => {
      console.log(item.name.indexOf(vales));

      if (item.name.indexOf(vales) >= 0) {
        dataLsit.push(item);
        if (item.pid !== 0) {
          DataList = DataList.concat(toPropid(data, item, []));
        }
      }
    });
    const res = new Map();
    DataList = DataList.filter(
      (a: any) =>
        !res.get(a.id) &&
        res.set(a.id, 1) &&
        !res.get(a.name) &&
        res.set(a.name, 1)
    );
    return DataList.concat(dataLsit);
  };
  //递归查找父级直到没有父级
  let listToTreeData = (data: any, rootValue = 0) => {
    let arr: any = [];
    data.forEach((item: any) => {
      if (item.pid === rootValue) {
        arr.push(item);
        let children = listToTreeData(data, item.id);
        children.length && (item.children = children);
      }
    });
    return arr;
  };
  const [vales, setValue] = useState<string>('');
  //监听 input数据
  useEffect(() => {
    if (!vales) {
      getbuiding();
      return;
    }
    const list: any = JSON.parse(JSON.stringify(trrData)); //深拷贝改变地址
    let arr = treeConvertArr(list, []); //
    setTrrs(toParse(listToTreeData(toCholid(arr, []))));
  }, [vales]);
  //查询按钮
  const onFinish = (values: any) => {
    setValue(values.name);
  };
  //添加
  const onAddList = () => {
    setIsModalOpen(true);
    settitLog('添加小区');
    setBuiname('');
    setBuiId(0);
    setaddbuid(0);
  };
  //delog弹出窗
  const [titLog, settitLog] = useState<string>('添加小区');
  const [buiId, setBuiId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buiname, setBuiname] = useState<string>('');
  const [addbuid, setaddbuid] = useState<number>(0);
  const handleOk = async (values: any) => {
    values.id = addbuid;
    console.log(values);
    const res: any = await BuildingAdd(values);
    if (res.errCode == '10000') {
      message.success('添加成功！');
      getbuiding();
      setBuiname('');
    }
    setIsModalOpen(false);
  };
  //取消添加
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //添加子类
  const addChilde = (title: string, id: number, pid: number) => {
    return () => {
      console.log(pid, id);
      settitLog(title);
      setIsModalOpen(true);
      setBuiname('');
      setaddbuid(0);
      setBuiId(id);
    };
  };
  //修改
  const editChilde = (title: string, id: number, pid: number, name: string) => {
    return () => {
      console.log(pid, id);
      settitLog(title);
      setIsModalOpen(true);
      setBuiname(name);
      setaddbuid(id);
      setBuiId(0);
    };
  };
  //删除
  const { confirm } = Modal;
  const dell = (id: number) => {
    return async () => {
      confirm({
        title: '删除该数据，删除将无法挽回，是否删除？',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          const res: any = await BuildingDel({ id });
          if (res.errCode == '10000') {
            message.success('删除成功');
            getbuiding();
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
  return (
    <div className="buiding">
      <div className="buidHeader">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="inline"
          style={{ marginBottom: '20px' }}
        >
          <Form.Item name="name">
            <Input placeholder="请输入楼栋名称" className="inpu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onAddList}>
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="trrSe">
        {trrList.length > 0 && (
          <Tree
            blockNode={true}
            fieldNames={fieldNames}
            defaultExpandAll
            treeData={trrList}
          />
        )}
      </div>
      {isModalOpen ? (
        <BuilLog
          isShow={isModalOpen}
          title={titLog}
          buiId={buiId}
          addbuiId={addbuid}
          handOk={handleOk}
          handCancel={handleCancel}
          name={buiname}
        ></BuilLog>
      ) : (
        ''
      )}
    </div>
  );
};
export default Home;
