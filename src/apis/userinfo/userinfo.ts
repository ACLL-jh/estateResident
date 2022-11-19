import {get, post,del,put} from "../../utils/requerst";
// 居民列表接口
const userinfoList = (params:any)=>{
  return post("userinfo/list",params)
}
// 删除居民
const userinfoDelete = (params:any) =>{
  return get ("userinfo/delete",params)
}
// 获取居民类型
const userinfotypeList = (params:any) =>{
  return get ("userinfotype/list",params)
}
// 添加居民
const userinfoAdd = (params:any) =>{
  return post ("userinfo/add",params)
}
// 获取楼栋
const buildingList = (params:any) =>{
  return get ("building/list",params)
}
// 根据楼栋获取房间列表
const housesList = (params:any) => {
  return get ("houses/list",params)
}
// 居民批删
const userinfoDeleteall = (params:any) => {
  return post ("userinfo/deleteall",params)
}
export {
    userinfoList,
    userinfoDelete,
    userinfotypeList,
    userinfoAdd,
    buildingList,
    housesList,
    userinfoDeleteall
}