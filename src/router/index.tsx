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
  /*  if (meta) {
    document.title = meta.title;
  } */
  document.title = '智慧社区';
  if (!sessionStorage.getItem('token') && !meta.isLogin) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const routes = [
  {
    path: '/login',
    meta: { isLogin: true },
    component: lazy(() => import('../pages/login/login')),
  },
  {
    path: '/',
    meta: {},
    component: lazy(() => import('../pages/home/home')),
    children: [
      {
        path: 'index',
        meta: {},
        component: lazy(() => import('../pages/index/index')),
      },
      {
        path: 'resident',
        meta: {},
        component: lazy(() => import('../pages/resident/resident')),
      },

      {
        path: 'fee',
        meta: {},
        component: lazy(() => import('../pages/fee/fee')),
      },
      {
        path: 'userinfo',
        meta: {},
        component: lazy(() => import('../pages/userinfo/userinfo')),
      },
      {
        path: 'repairs',
        meta: {},
        component: lazy(() => import('../pages/repairs/repairs')),
      },
      {
        path: 'questions',
        meta: {},
        component: lazy(() => import('../pages/questions/questions')),
      },
      {
        path: 'staffs',
        meta: {},
        component: lazy(() => import('../pages/staffs/staffs')),
      },
      {
        path: 'news',
        meta: {},
        component: lazy(() => import('../pages/news/news')),
      },
      {
        path: 'stores',
        meta: {},
        component: lazy(() => import('../pages/stores/stores')),
      },
      {
        path: 'advertisement',
        meta: {},
        component: lazy(() => import('../pages/advertisement/advertisement')),
      },
    ],
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
