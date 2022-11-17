import React, { FC, useState, useEffect } from 'react';
import {
  Modal,
  Select,
  Input,
  DatePicker,
  Space,
  Cascader,
  Radio,
  notification,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import { buildingList, FeeAdd, Feetype } from '../../apis/fee/fee';
import Parthouse from '../../components/feeadd/parthouse';
import '../../assets/css/feeadd/feeadd.css';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Feesadd: FC<any> = (props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buildingarr, setbuildingarr] = useState([]);
  const [value, setValue] = useState(1);
  const [textareadefaultValue, settextareadefaultValue] = useState<string>('');
  const [feetype, setfeetype] = useState([]);
  const [adddata, setadddata] = useState<any>({
    type: '',
    begindate: '',
    enddate: '',
    price: null,
    buildingid: null,
    houseids: [],
  });
  const getChildrenValue = (val: any) => {
    setIsModalOpen(val);
  };
  const gethouseids = (val: any) => {
    let houseids: any = val;
    setadddata({ ...adddata, houseids });
    let text = val.join('，');
    settextareadefaultValue(text);
    console.log(adddata);
  };
  const handleDetailData: any = (detailData: any, newDetailData: any) => {
    for (let i in detailData) {
      if (detailData[i].children && detailData[i].children.length > 0) {
        newDetailData.push({
          value: detailData[i].id, 
          label: detailData[i].name,
          children: [],
        });
        handleDetailData(detailData[i].children, newDetailData[i].children);
      } else {
        newDetailData.push({
          value: detailData[i].id,
          label: detailData[i].name,
        });
      }
    }
    return setbuildingarr(newDetailData);
  };
  // 获取楼栋列表
  const buildingListlist = async () => {
    // console.log(sessionStorage.getItem('token'));
    let params = {};
    const res: any = await buildingList(params);
    if (res.errCode === 10000) {
      // console.log(res);
      handleDetailData(res.data.list, []);
    }
  };
  const Feetypelist = async () => {
    let params = {};
    const res: any = await Feetype(params);
    if (res.errCode === 10000) {
      let newarr: any = res.data.list;
      for (let i in newarr) {
        newarr[i].label = newarr[i].name;
        newarr[i].value = newarr[i].name;
      }
      // console.log(newarr);
      setfeetype(newarr);
    }
  };
  // 金额
  const pricechange = (v: any) => {
    // console.log(v);
    let price = Number(v.nativeEvent.target.value);
    setadddata({ ...adddata, price });
  };
  // 日期选择器
  const datachange = (v: any, o: any) => {
    console.log(o);
    if (o[0] === '') {
      console.log('填写日期');
    } else {
      let begindate: any = o[0];
      let enddate: any = o[1];
      console.log(begindate);
      setadddata({ ...adddata, begindate, enddate });
    }
  };
  // 取消弹框回调
  const handleCancel = () => {
    props.getvalue(false);
  };
  const handleOk = () => {
    // console.log(adddata);
    if (adddata.type === '') {
      notification.error({
        message: `请选择费用类型`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else if (adddata.enddate === '' || adddata.begindate === '') {
      notification.error({
        message: `请选择账期`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else if (adddata.price === null) {
      notification.error({
        message: `请输入金额`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else if (adddata.buildingid === null) {
      notification.error({
        message: `请输入房间号`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else {
      add();
    }
  };
  // 添加
  const add = async () => {
    const res: any = await FeeAdd(adddata);
    // console.log(adddata);
    // console.log(res);
    if (res.errCode === 10000) {
      props.getvalue(false);
      props.isrefresh(true);
      notification.success({
        message: `添加成功`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else {
      notification.error({
        message: `添加失败${res.errMsg}`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    }
  };
  // 点击部分房间打开弹出框
  const gethousesid = () => {
    if (adddata.buildingid === null) {
      notification.error({
        message: `请输入房间号`,
        description: ``,
        placement: 'top',
        duration: 1,
      });
    } else {
      setIsModalOpen(true);
    }
  };
  // 小区
  const onChange = (value: any) => {
    let buildingid = value.at(-1);
    setadddata({ ...adddata, buildingid });
  };
  // 缴费类型
  const handleChange = (value: string) => {
    // setfeetype(value)
    let type: string = value;
    setadddata({ ...adddata, type });
  };
  // 缴费房间
  const radioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    buildingListlist();
    Feetypelist();
  }, []);
  return (
    <div className="app">
      <Modal
        width={460}
        wrapClassName={'dialog'}
        title="新增缴费"
        open={props.showmodal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="addbox">
          <div className="addform">
            <div className="formitem">
              <div>费用类型:</div>
              <div>
                <Select
                  style={{ width: 240 }}
                  onChange={handleChange}
                  options={feetype}
                />
              </div>
            </div>
            <div className="formitem">
              <div>金额:</div>
              <div>
                <Input onChange={pricechange} style={{ width: 240 }} />
              </div>
            </div>
            <div className="formitem">
              <div>账期:</div>
              <div>
                <Space style={{ width: 240 }} direction="vertical" size={12}>
                  <RangePicker onChange={datachange} />
                </Space>
              </div>
            </div>
            <div className="formitem">
              <div>小区:</div>
              <div>
                <Cascader
                  style={{ width: 240 }}
                  options={buildingarr}
                  onChange={onChange}
                  placeholder="请选择"
                />
              </div>
            </div>
            <div className="formitem">
              <div>缴费房间:</div>
              <div>
                <Radio.Group
                  style={{ width: 240 }}
                  onChange={radioChange}
                  value={value}
                >
                  <Radio value={1}>全部</Radio>
                  <Radio onClick={gethousesid} value={2}>
                    部分房间
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="formitem">
              <div> </div>
              <div>
                <TextArea
                  value={textareadefaultValue}
                  style={{ width: 240 }}
                  rows={3}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Parthouse
        id={adddata.buildingid}
        isModalOpen={isModalOpen}
        getid={gethouseids}
        isModalCloce={getChildrenValue}
      ></Parthouse>
    </div>
  );
};
export default Feesadd;
