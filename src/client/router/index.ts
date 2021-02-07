import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    name: 'worksapce',
    path: '/workspace',
    component: () => import('@/pages/workspace/workspace.vue'),
  },
];

export default function (type: string) {
  const routerHistory =
    type === 'client' ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes,
  });
}
