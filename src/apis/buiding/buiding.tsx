import { get, post } from '../../utils/requerst';
const BuildingList = (params: any) => {
  return get('building/list', params);
};
const BuildingAdd = (data: any) => {
  return post('/building/add', data);
};
const BuildingDel = (id: any) => {
  return get('/building/delete', id);
};
const MenuList = (id: any) => {
  return get('/menu/list', id);
};
export { BuildingList, BuildingAdd, BuildingDel, MenuList };
