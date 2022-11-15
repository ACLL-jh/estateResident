import { get, post } from '../../utils/requerst';
const Login = (data: any) => {
  return post('administrator/checklogin2', data);
};
export { Login };
