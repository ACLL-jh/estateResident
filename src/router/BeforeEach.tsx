import { Navigate } from 'react-router-dom';
import { FC } from 'react';
interface Meta {
  title: string;
  isLogin: boolean;
}
interface Props {
  meta: Meta;
  children: JSX.Element;
}
const BeforeEach: FC<Props> = ({ meta, children }) => {
  console.log(meta);

  if (meta) {
    document.title = meta.title;
  }

  if (!sessionStorage.getItem('token') && !meta.isLogin) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default BeforeEach;
