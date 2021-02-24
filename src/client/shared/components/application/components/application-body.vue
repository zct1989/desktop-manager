<template lang="pug">
.application-body
  keep-alive
    component(:is="currentComponent")
</template>
<script lang="tsx">
import { Root } from '@nestjs/graphql';
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onMounted,
  ref,
  shallowRef,
  toRaw,
  triggerRef,
} from 'vue';

export default defineComponent({
  components: {
    VNode: {
      functional: true,
      props: {
        component: {
          required: true,
        },
      },
      render: (props) => {
        return h(props.component);
      },
    },
  },
  setup() {
    const app = inject('app') as any;
    const onRouterChange = inject('onRouterChange') as any;

    const routes = shallowRef<any>([]);

    // 加载组件
    const loadComponent = (component) => {
      return defineAsyncComponent(component);
    };

    // 初始化根组件
    const RootComponent = loadComponent(app.root);
    routes.value.push(RootComponent);

    // 获取当前组件
    const currentComponent = computed(() => {
      const [component] = routes.value.slice(-1);
      return component;
    });

    // 页面跳转处理
    onRouterChange(
      (
        type: string,
        { component, props }: { component?: any; props?: any } = {},
      ) => {
        const actions = {
          push: () => {
            const Component = loadComponent(component);
            routes.value.push(Component);
            triggerRef(routes);
          },
          pop: () => {
            routes.value.pop();
            triggerRef(routes);
          },
        };

        actions[type]();
      },
    );

    return {
      routes,
      currentComponent,
    };
  },
});
</script>
<style lang="less" scoped>
.applicatoin-body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
