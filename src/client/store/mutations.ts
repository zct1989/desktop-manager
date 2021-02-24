import { ApplicationList } from '@/config/application.config';

export default {
  ready(state) {
    state.ready = true;
  },
  // 打开应用
  openApp(state: any, name) {
    const target = ApplicationList.find((x) => x.name === name);
    const index = Math.max(
      ...state.applicationInstances.map((x) => x.index),
      0,
    );

    if (!target) {
      return;
    }
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
  // 激活应用
  activeApp(state: any, id) {
    const index = Math.max(...state.applicationInstances.map((x) => x.index));
    const app = state.applicationInstances.find((x) => x.id === id);

    if (app.minimize) {
      app.minimize = !app.minimize;
    }

    if (!app.active) {
      state.applicationInstances.forEach((x) => (x.active = false));
      app.index = index + 1;
      app.active = true;
      app.event.index(app.index);
    }
  },
  // 关闭应用
  closeApp(state: any, id) {
    const index = state.applicationInstances.findIndex((x) => x.id === id);
    state.applicationInstances.splice(index, 1);
  },
  // 最小化应用
  minimizeApp(state: any, id) {
    const app = state.applicationInstances.find((x) => x.id === id);
    app.minimize = !app.minimize;
  },
  // 最大化应用
  maximizeApp(state: any, id) {
    const app = state.applicationInstances.find((x) => x.id === id);
    app.maximize = !app.maximize;

    if (app.event.maximize) {
      app.event.maximize(app.maximize);
    }
  },
  // 监听Index更新
  onAppIndexChange(state, { id, caller }) {
    const app = state.applicationInstances.find((x) => x.id === id);
    app.event.index = caller;
  },
  // 监听最大化状态更新
  onMaximizeChange(state: any, { id, caller }) {
    const app = state.applicationInstances.find((x) => x.id === id);
    app.event.maximize = caller;
  },
};
