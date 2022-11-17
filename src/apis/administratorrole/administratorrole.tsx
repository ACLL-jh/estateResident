import { get, post } from '../../utils/requerst';
//角色列表
const rolelist = (data: any) => {
  return get('administratorrole/list', data);
};
//角色删除
const roledelete = (data: any) => {
  return get('administratorrole/delete', data);
};
//角色添加
const roleadd = (data: any) => {
  return get('administratorrole/add', data);
};

export {rolelist,roledelete,roleadd};
