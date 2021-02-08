import { createStore } from 'vuex';
import { ApplicationList, ApplicationState } from '@/config/application.config';
import { ref } from 'vue';

export default createStore({
  state() {
    return {
      applications: ['user-manage', 'desktop-manage'],
      applicationInstances: [],
    };
  },
  mutations: {
    openApp(state: any, name) {
      const target = ApplicationList.find((x) => x.name === name);
      const index =
        Math.max(state.applicationInstances.map((x) => x.index)) || 0;
      // 创建应用对象
      const application = {
        name: name,
        id: Math.random().toString(32).slice(-6),
        minimize: false,
        maximize: false,
        root: target.root,
        icon: target.icon,
        title: target.title,
        index: index + 1,
        active: true,
        event: {
          maximize: null,
          index: null,
        },
      };

      state.applicationInstances.forEach((x) => (x.active = false));
      state.applicationInstances.push(application);
    },
    activeApp(state: any, id) {
      const index = Math.max(...state.applicationInstances.map((x) => x.index));
      const app = state.applicationInstances.find((x) => x.id === id);
      if (!app.active) {
        state.applicationInstances.forEach((x) => (x.active = false));
        app.index = index + 1;
        app.active = true;
        app.event.index(app.index);
      }
    },
    closeApp(state: any, id) {
      const index = state.applicationInstances.findIndex((x) => x.id === id);
      state.applicationInstances.splice(index, 1);
    },
    minimizeApp(state: any, id) {
      const app = state.applicationInstances.find((x) => x.id === id);
      app.minimize = !app.minimize;
    },
    maximizeApp(state: any, id) {
      const app = state.applicationInstances.find((x) => x.id === id);
      app.maximize = !app.maximize;

      if (app.event.maximize) {
        app.event.maximize(app.maximize);
      }
    },
    onAppIndexChange(state, { id, caller }) {
      const app = state.applicationInstances.find((x) => x.id === id);
      app.event.index = caller;
    },
    onMaximizeChange(state: any, { id, caller }) {
      const app = state.applicationInstances.find((x) => x.id === id);
      app.event.maximize = caller;
    },
  },
});
