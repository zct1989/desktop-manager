import App from './App.vue';
import { createSSRApp } from 'vue';
import { createGraphQL } from './graphql';
import store from '@/store';
import router from '@/router';

export function createApp() {
  const app = createSSRApp(App);
  const graphQL = createGraphQL();

  app.use(router);
  app.use(store);
  app.use(graphQL);

  return app;
}
