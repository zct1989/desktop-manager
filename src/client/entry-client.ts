const createVueApp = () => {
  return import("./main").then(({ createApp }) => createApp());
};

createVueApp().then((app) => app.mount("#app"));
