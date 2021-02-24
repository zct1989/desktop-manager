<template lang="pug">
.page-container
  .systembar-container
    system-bar
  .desktop-container(ref="desktopContainer")
    desktop
    application(
      v-for="app in applications"
      :key="app.name"
      :app="app"
    )
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, provide, ref } from 'vue';
import Desktop from './components/desktop.vue';
import { useStore } from 'vuex';
import { ApplicationList } from '@/config/application.config';
import Application from '@/shared/components/application/application.vue';
import SystemBar from './components/system-bar.vue';

const store = useStore();

// 用户列表
const applications = store.state.applicationInstances;

const desktopContainer = ref<any>();

const screenWidth = ref(0);
const screenHeight = ref(0);

provide('screenWidth', screenWidth);
provide('screenHeight', screenHeight);

onMounted(() => {
  screenWidth.value = desktopContainer.value.clientWidth;
  screenHeight.value = desktopContainer.value.clientHeight;
});
</script>
<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image: url('/wallpapers/wallpaper-01.jpg');
  background-size: 100% 100%;
  overflow: hidden;

  .systembar-container {
    flex-basis: 40px;
    position: relative;
  }

  .desktop-container {
    flex: 1;
    position: relative;
  }
}
</style>
