import App from './App.vue';
import { createSSRApp } from 'vue';
import createRouter from './router';
import store from './store';
import { createGraphQL } from './graphql';

export function createApp(type) {
  const app = createSSRApp(App);
  const router = createRouter(type);
  const graphQL = createGraphQL();
  app.use(router);
  app.use(store);
  app.use(graphQL);
  return app;
}
