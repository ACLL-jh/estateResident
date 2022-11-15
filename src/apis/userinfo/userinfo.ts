import { get, post } from '../../utils/requerst';
const list = (data: any) => {
  return get('userinfo/list', data);
};
const delte = (data: any) => {
  return post('userinfo/deleteall', data)
}
const rowdel = (data: any) => {
  return get('userinfo/delete', data)
}
// 添加接口
const userinfoadd = (data: any) => {
  return post('userinfo/add', data)
}
// 级联选择器接口
const buildinglist = (data: any) => {
  return get('building/list', data)
}
// 住户类型接口
const userlist = (data:any)=>{
  return get('userinfotype/list',data)
}
const houseslist = (data:any) =>{
  return get('houses/list',data)
}
export { list, delte, rowdel, userinfoadd, buildinglist,userlist,houseslist };
