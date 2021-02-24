<template lang="pug">
.application-container(
  @mousedown="onActiveApp"
  :style="style"
  )
  .application-header-wrapper
    application-header
  .application-body-wrapper
    application-body
  application-border
</template>

<script setup lang="ts">
import {
  watch,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  reactive,
  defineProps,
} from 'vue';
import ApplicationHeader from './components/application-header.vue';
import ApplicationBody from './components/application-body.vue';
import ApplicationBorder from './components/application-border.vue';

import { useStore } from 'vuex';

// Store
const store = useStore();
// Props
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

// #region Variable
// 位置数据
const position = reactive({
  top: 0,
  left: 0,
  width: 400,
  height: 400,
  minWidth: 400,
  minHeight: 400,
  index: props.app.index,
  before: {},
});

// 屏幕尺寸
const parentSize = { width: 0, height: 0 };

// 应用路由
const routes = [];

// 应用路由监听列表
const routerChangeListeners = [];
// #endregion

//#region Function

// 获取屏幕尺寸
function getParentSize(ctx) {
  const parent = ctx.parent as any;
  const height = parent.ctx.$el.clientHeight;
  const width = parent.ctx.$el.clientWidth;

  return {
    width,
    height,
  };
}

// 计算默认位置
function getDefaultPosition() {
  const { width, height } = getParentSize(getCurrentInstance());
  parentSize.width = width;
  parentSize.height = height;

  position.left = (parentSize.width - position.width) / 2;
  position.top = (parentSize.height - position.height) / 2;
}

// 激活窗口
function onActiveApp() {
  store.commit('activeApp', props.app.id);
}
//#endregion

// #region Position Logic

// 监听Index更新
store.commit('onAppIndexChange', {
  id: props.app.id,
  caller: (index) => {
    position.index = index;
  },
});

// 监听窗口最大化状态变化
store.commit('onMaximizeChange', {
  id: props.app.id,
  caller: (value) => {
    if (value) {
      // 保存历史位置
      position.before = {
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
      };

      position.width = '100%';
      position.height = '100%';
      position.left = 0;
      position.top = 0;

      store.commit('activeApp', props.app.id);
    } else {
      const before = position.before as any;
      position.width = before.width;
      position.height = before.height;
      position.left = before.left;
      position.top = before.top;
    }
  },
});

// 生成样式
const style = computed(() => {
  const target = {
    top: position.top,
    left: position.left,
    height: position.height,
    width: position.width,
    zIndex: props.app.index,
  } as any;

  if (props.app.minimize) {
    target.display = 'none';
  }
  return target;
});

// #endregion

// #region Resize Logic
const resizeStyle = {};

// #endregion

// #region Launch
const navigate = {
  push({ component, props }) {
    const route = { component, props };
    routes.push(route);
    routerChangeListeners.forEach((listener) => listener('push', route));
  },
  back() {
    routerChangeListeners.forEach((listener) => listener('pop'));
  },
};

// 位置数据
provide('position', position);
// 应用数据
provide('app', props.app);
// 应用路由监听注册函数
provide('onRouterChange', (caller) => {
  routerChangeListeners.push(caller);
});

// 导航操作
provide('navigate', navigate);

onMounted(() => {
  // 获取默认位置
  getDefaultPosition();
});
// #endregion
</script>

<style lang="stylus" scoped>
.application-container
  position: absolute
  display: flex
  flex-direction: column
  border-radius: 4px
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3)

  .application-header-wrapper
    flex-basis: 36px
    position: relative
    background-color: #fff

  .application-body-wrapper
    flex: 1
    position: relative
    background-color: #fff
    padding: 5px
</style>
