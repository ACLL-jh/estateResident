import { get, post } from '../../utils/requerst';
const AdvertisementList = (params: any) => {
  return get('advertisement/list', params);
};
const AdtypeList = (params: any) => {
  return get('adtype/list', params);
};
const AdvertisementAdd = (data: any) => {
  return post('advertisement/add', data);
};
const AdvertisementGet = (params: any) => {
  return get('advertisement/get', params);
};
export { AdvertisementList, AdtypeList, AdvertisementAdd, AdvertisementGet };
