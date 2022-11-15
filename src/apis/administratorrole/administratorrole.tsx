import { get, post } from '../../utils/requerst';
//角色列表
const rolelist = (data: any) => {
  return get('administratorrole/list', data);
};
//角色删除
const roledelete = (data: any) => {
  return get('administratorrole/delete', data);
};

export {rolelist,roledelete};
