import { get, post } from '../../utils/requerst';
//缴费列表
const FeeList = (data: any) => {
  return get('fee/list', data);
};
//缴费删除
const FeeDelete = (data: any) => {
  return get('fee/delete', data);
};
//缴费批量删除
const FeeDeleteall = (data: any) => {
  return post('fee/deleteall', data);
};
//缴费添加
const FeeAdd = (data: any) => {
  return post('fee/add', data);
};
//缴费类型
const Feetype = (data: any) => {
  return post('feetype/list', data);
};
// 获取楼栋列表
const buildingList = (data: any) => {
  return get('building/list', data);
};
//获取房间列表
const housesList = (data: any) => {
  return get('houses/list', data);
};
export { FeeList,FeeDelete,FeeDeleteall,FeeAdd,Feetype ,buildingList,housesList};
