<template lang="pug">
.application-container(
  @click="onActiveApp"
  :style="style"
  )
  .application-header-wrapper
    application-header
  .application-body-wrapper
    application-body
</template>

<script lang="ts">
import {
  watch,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  reactive,
} from 'vue';
import ApplicationHeader from './components/application-header.vue';
import ApplicationBody from './components/application-body.vue';
import { useStore } from 'vuex';

const getParentSize = (ctx) => {
  const parent = ctx.parent as any;
  const height = parent.ctx.$el.clientHeight;
  const width = parent.ctx.$el.clientWidth;

  return {
    width,
    height,
  };
};

/**
 *  位置相关
 **/
const positionSetup = (app) => {
  const parentSize = getParentSize(getCurrentInstance());
  const store = useStore();

  // 位置数据
  const position = reactive({
    top: 0,
    left: 0,
    width: 400,
    height: 400,
    index: app.index,
    before: {},
  });

  // 更新Index
  store.commit('onAppIndexChange', {
    id: app.id,
    caller: (index) => {
      position.index = index;
    },
  });

  // 监听窗口最大化状态变化
  store.commit('onMaximizeChange', {
    id: app.id,
    caller: (value) => {
      if (value) {
        // 保存历史位置
        position.before = {
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
        };

        position.width = parentSize.width;
        position.height = parentSize.height;
        position.left = 0;
        position.top = 0;
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
      top: `${position.top}px`,
      left: `${position.left}px`,
      height: `${position.height}px`,
      width: `${position.width}px`,
      zIndex: app.index,
    } as any;

    if (app.minimize) {
      target.display = 'none';
    }
    return target;
  });

  return {
    position,
    style,
  };
};

export default defineComponent({
  components: {
    ApplicationHeader,
    ApplicationBody,
  },
  props: {
    app: {
      required: true,
    },
  },
  setup(props) {
    const parentSize = getParentSize(getCurrentInstance());
    const store = useStore();
    const { position, style } = positionSetup(props.app);

    const getDefaultPosition = () => {
      position.left = (parentSize.width - position.width) / 2;
      position.top = (parentSize.height - position.height) / 2;
    };

    provide('position', position);
    provide('app', props.app);

    onMounted(() => {
      getDefaultPosition();
    });

    const onActiveApp = () => {
      store.commit('activeApp', props.app.id);
    };

    return {
      style,
      onActiveApp,
    };
  },
});
</script>

<style lang="less" scoped>
.application-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3);
  .application-header-wrapper {
    flex-basis: 30px;
    position: relative;
    background-color: #fff;
  }
  .application-body-wrapper {
    flex: 1;
    position: relative;
    background-color: rgba(245, 245, 245);
    padding: 5px;
  }
}
</style>
