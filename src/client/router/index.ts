import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import store from '@/store';

const canUserAccess = () => {
  const result = !!store.state.user.current.username;
  return result;
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/login.vue'),
  },
  {
    name: 'worksapce',
    path: '/workspace',
    component: () => import('@/pages/workspace/workspace.vue'),
    beforeEnter: async () => {
      const canAccess = await canUserAccess();
      if (!canAccess) return '/login';
    },
  },
];

const routerHistory = import.meta.env.SSR
  ? createMemoryHistory()
  : createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
