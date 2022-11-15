import { get, post } from '../../utils/requerst';
const del = (params: any) => {
  return get('stores/delete', params);
};
const delall = (params: any) => {
  return post('stores/deleteall', params);
};
const repairstype = (data: any) => {
  return get('storeservices/list', data);
};
const List = (params: any) => {
  return get('stores/list', params);
};
const lista=(params:any)=>{
  return get('stores/get',params)
}
const storeservices = (data: any) => {
  return get('storeservices/list', data);
};
const storesadd=(params:any)=>{
  return post('stores/add',params)
}
const storeslist=(params:any)=>{
  return get('stores/get',params)
}
export {
  List,del,delall,repairstype,lista,storeservices,storesadd,storeslist
};
