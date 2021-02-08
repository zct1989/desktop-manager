import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      applications: ['user-manage'],
      applicationInstances: [],
    };
  },
  mutations: {
    openApp(state: any, app) {
      state.applicationInstances.push(app);
    },
  },
});
