import { RouteRecordRaw } from 'vue-router';
import store from '@/store';
import launch from '@/bootstrap/launch';

const canUserAccess = () => {
  const result = !!store.state.user.current.username;
  return result;
};

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: () => import('@/pages/welcome/welcome.vue'),
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
