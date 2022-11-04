import { lazy, Suspense, FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

interface Meta {
  title: string;
  isLogin: boolean;
}
interface Props {
  meta: Meta;
  children: JSX.Element;
}

const BeforeEach: FC<Props> = ({ meta, children }) => {
  if (meta) {
    document.title = meta.title;
  }

  if (!sessionStorage.getItem('token') && !meta.isLogin) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const routes = [
  {
    path: '/',
    meta: { title: '登录', isLogin: true },
    component: lazy(() => import('../pages/login/login')),
  },
  {
    path: '/login',
    meta: { title: '登录', isLogin: true },
    component: lazy(() => import('../pages/login/login')),
  },
  {
    path: '/home',
    meta: { title: '新闻', isLogin: true },
    component: lazy(() => import('../pages/home/home')),
  },
];

const getRouters = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = getRouters(item.children);
    }
    item.element = (
      <Suspense fallback={<div>加载中...</div>}>
        <BeforeEach meta={item.meta}>
          <item.component />
        </BeforeEach>
      </Suspense>
    );
    return item;
  });
};

const Routers = () => {
  const _routes = getRouters(routes);
  return useRoutes(_routes);
};
export default Routers;
