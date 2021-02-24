<template lang="pug">
.desktop
  .application(
    v-for="app of applications" 
    :key="app.name"
    @dblclick="onOpenApp(app.name)"
    )
    div.icon: img(:src="app.icon")
    div.title {{app.title}}
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  ref,
} from 'vue';
import { useStore } from 'vuex';
import { ApplicationList } from '@/config/application.config';

const store = useStore();

// 应用列表
const applications = store.state.applications.map((app) => {
  const application = ApplicationList.find((x) => x.name === app);
  return application;
});

// 打开应用
const onOpenApp = (app) => {
  store.commit('openApp', app);
};
</script>

<style lang="less" scoped>
.application {
  margin: 20px;
  padding: 5px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px rgba(255, 255, 255, 0);
  border-radius: 5px;
  user-select: none;
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 10px;
    img {
      padding: 5px;
    }
  }
  .title {
    font-size: 14px;
    color: #fff;
  }

  &:hover {
    border: solid 1px rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    border: solid 1px rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
