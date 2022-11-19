import { get, post } from '../../utils/requerst';
const getHousesList = (data: any) => {
  return get('houses/list', data);
};
export { getHousesList};
