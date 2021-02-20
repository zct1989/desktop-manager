import Antd from 'ant-design-vue';

const createVueApp = () => {
  return import('./main').then(({ createApp }) => createApp('client'));
};

createVueApp()
  .then((app) => {
    app.use(Antd);
    return app;
  })
  .then((app) => app.mount('#app'));
