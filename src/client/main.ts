import App from './App.vue';
import { createSSRApp } from 'vue';
import createRouter from './router';
import store from './store';

export function createApp(type) {
  const app = createSSRApp(App);
  const router = createRouter(type);
  app.use(router);
  app.use(store);
  return app;
}
