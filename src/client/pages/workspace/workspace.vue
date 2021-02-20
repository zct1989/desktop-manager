<template lang="pug">
.page-container
  .systembar-container
    system-bar
  .desktop-container
    desktop(foo="123")
    application(
      v-for="app in applications"
      :key="app.name"
      :app="app"
    )
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import Desktop from './components/desktop.vue';
import { useStore } from 'vuex';
import { ApplicationList, ApplicationState } from '@/config/application.config';
import Application from '@/shared/components/application/application.vue';
import SystemBar from './components/system-bar.vue';
import { getUserList } from '@/graphql/user.graph';
import { useRequest } from '@/graphql';

const store = useStore();

// 用户列表
const applications = store.state.applicationInstances;
const request = useRequest();

// 获取用户列表
request(getUserList).then((data) => {
  console.log(data);
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
