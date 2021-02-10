<template lang="pug">
.task-bar
  .application(
    v-for="app in applications"
    :key="app.name"
    @click="onActiveApp(app)"
  )
    .icon: img(:src="app.icon")
    .title {{app.title}}
</template>

<script setup lang="ts">
import { ApplicationList } from '@/config/application.config';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 应用列表
const applications = store.state.applicationInstances;
// 激活应用
const onActiveApp = (app) => {
  store.commit('minimizeApp', app.id);
};
</script>

<style lang="less" scoped>
.task-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.application {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  height: 90%;
  padding: 0 20px 0 10px;
  margin: 0 5px;
  cursor: pointer;

  .icon {
    width: 25px;
    height: 25px;
    img {
      width: 80%;
      height: 80%;
    }
  }

  .title {
    font-size: 14px;
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
