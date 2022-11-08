import { get, post } from '../../utils/requerst';
const list = (data: any) => {
  return get('userinfo/list', data);
};
const delte = (data:any) =>{
  return post('userinfo/deleteall',data)
}
const rowdel = (data:any) =>{
  return get('userinfo/delete',data)
}
export { list,delte,rowdel };
