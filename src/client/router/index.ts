import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import store from '@/store';
import launch from '@/bootstrap/launch';
import { routes } from './routes';

const canUserAccess = () => {
  const result = !!store.state.user.current.username;
  return result;
};

const canReadyAccess = async () => {
  const ready = !!store.state.ready;
  if (!ready) {
    return await launch();
  }
};

const routerHistory = import.meta.env.SSR
  ? createMemoryHistory()
  : createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes,
});

// 系统初始化
router.beforeEach(canReadyAccess);

export default router;
