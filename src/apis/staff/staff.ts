import { get, post } from '../../utils/requerst';
// 职员列表
const list = (data: any) => {
  return get('staff/list', data)
}
// 删除接口
const staffdelete = (data: any) => {
  return get('staff/delete', data)
}
// 批删
const taffdele = (data: any) => {
  return post('staff/deleteall', data)
}
const stafftlist = (data: any) => {
  return get('stafftype/list', data)
}
// 添加
// 职员添加
const offadd = (params: any) => {
  return post("staff/add", params)
}
// 楼栋
const buildingList = (params: any) => {
  return get("building/list", params)
}

const typeList = (params: any) => {
  return get("stafftype/list", params)
}
// 修改
export { list, staffdelete, taffdele, stafftlist, buildingList, offadd, typeList };
