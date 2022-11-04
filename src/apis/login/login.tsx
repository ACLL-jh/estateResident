import { get, post } from '../../utils/requerst';
const Login = (data: any) => {
  return post('administrator/checklogin', data);
};
export { Login };
