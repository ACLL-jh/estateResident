import { get, post } from '../../utils/requerst';
const del = (params: any) => {
  return get('news/delete', params);
};
const delall = (params: any) => {
  return post('news/deleteall', params);
};
const repairstype = (data: any) => {
  return get('newstype/list', data);
};
const Listc = (params: any) => {
  return get('news/list', params);
};
const lista=(params:any)=>{
  return get('news/get',params)
}
const newadd=(params:any)=>{
  return post('news/add',params)
}
const newstypeList=(params:any)=>{
  return get('newstype/list',params)
}
export {
  Listc,del,delall,repairstype,lista,newadd,newstypeList
};
