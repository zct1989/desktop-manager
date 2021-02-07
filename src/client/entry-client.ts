const createVueApp = () => {
  return import('./main').then(({ createApp }) => createApp('client'));
};

createVueApp().then((app) => app.mount('#app'));
