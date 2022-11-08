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
    path: '/login',
    meta: { title: '登录', isLogin: true },
    component: lazy(() => import('../pages/login/login')),
  },
  {
    path: '/',
    meta: { title: '首页' },
    component: lazy(() => import('../pages/home/home')),
    children: [
      {
        path: 'resident',
        meta: {},
        component: lazy(() => import('../pages/resident/resident')),
      },
      {
        path: 'index',
        meta: { title: '首页' },
        component: lazy(() => import('../pages/index/index')),
      },
      {
        path: 'fee',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/fee/fee')),
      },
      {
        path: 'userinfo',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/userinfo/userinfo')),
      },
      {
        path: 'repairs',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/repairs/repairs')),
      },
      {
        path: 'questions',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/questions/questions')),
      },
      {
        path: 'staffs',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/staffs/staffs')),
      },
      {
        path: 'news',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/news/news')),
      },
      {
        path: 'stores',
        meta: {title: 'estate'},
        component: lazy(() => import('../pages/stores/stores')),
      },
      {
        path: 'advertisement',
        meta: {title: 'estate'},
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
