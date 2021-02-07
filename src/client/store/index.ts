import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      applications: ["user-manage"],
    };
  },
  mutations: {
    openApp(state: any, app) {
      state.applications.push(app);
    },
  },
});
