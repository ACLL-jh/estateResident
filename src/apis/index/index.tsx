import { get, post } from '../../utils/requerst';
const Lists = (data: any) => {
  return get('repairs/list', data);
};
const Service = (data: any) => {
  return get('repairs/getcounts', data);
};
const queslist = (data: any) => {
  return get('questions/list', data);
};
const getcounts = (data: any) => {
  return get('repairs/getcounts', data);
};
export { Lists, Service, queslist,getcounts };
