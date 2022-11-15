import { get, post } from '../../utils/requerst';
// 管理员列表
const list = (data: any) => {
  return get('administrator/list', data)
}
const delte = (data: any) => {
  return get('administrator/delete', data)
}

export { list,delte};
