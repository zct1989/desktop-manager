import { createStore } from 'vuex';
import state from './state';
import mutations from './mutations';
import modules from './modules';
import createPersistedState from 'vuex-persistedstate';

const plugins: any[] = [];

if (!import.meta.env.SSR) {
  plugins.push(
    createPersistedState({
      paths: ['user'],
    }),
  );
}

const store = createStore({
  state,
  mutations,
  modules,
  plugins,
});

export default store;
