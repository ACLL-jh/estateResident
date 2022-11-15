import { get, post } from '../../utils/requerst';
const List = (data: any) => {
  return get('repairs/list', data);
};
const del = (params: any) => {
  return get('repairs/delete', params);
};
const delall = (params: any) => {
  return post('repairs/deleteall', params);
};
const repairstype = (data: any) => {
  return get('repairstype/list', data);
};
const repairstate = (params: any) => {
  return get('repairstate/list', params);
};
const repairsup = (params: any) => {
  return post('repairs/add', params);
};
const building=(params:any)=>{
  return get('building/list',params)
}
export {
  List,del,delall,repairstype,repairstate,repairsup,building
};


