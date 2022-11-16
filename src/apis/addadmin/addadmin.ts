import { get, post } from '../../utils/requerst';
// 管理员列表
const administrator = (params:any) => {
  return get('administrator/list',params)
}

// 角色列表
const administratorrole = ()=>{
  return get('administratorrole/list')
}

// 添加管理员
const addadmin = (params:any) => {
  return post('administrator/add',params)
  
}
// 删除管理员
const deladmin = (params:any) => {
  return get('administrator/delete',params)
}
export {
  deladmin,
  administrator,
  administratorrole,
  addadmin
}