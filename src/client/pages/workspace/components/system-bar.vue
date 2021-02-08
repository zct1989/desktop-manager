<template lang="pug">
.system-bar
  .menu
    AppMenuSvg.icon
  .taskbar-container
    task-bar
  .tool-container
    tool-bar

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TaskBar from './task-bar.vue';
import ToolBar from './tool-bar.vue';
import AppMenuSvg from '@/assets/icons/svg/app.svg';

export default defineComponent({
  components: {
    TaskBar,
    ToolBar,
    AppMenuSvg,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.system-bar {
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  .menu {
    .icon {
      height: 30px;
      width: 30px;
      padding: 0 10px;
      fill: rgba(255, 255, 255, 0.9);
    }
  }

  .taskbar-container {
    flex: 1;
    position: relative;
    height: 100%;
  }
}
</style>
