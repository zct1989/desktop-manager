<template lang="pug">
.desktop
  div.application(
    v-for="app of applications" 
    :key="app.name"
    @dblclick="onOpenApp(app.name)"
    )
    div.icon: img(:src="app.icon")
    div.title {{app.title}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { ApplicationList } from '@/config/application.config';

const applicationSetup = () => {
  const store = useStore();

  const applications = store.state.applications.map((app) => {
    const application = ApplicationList.find((x) => x.name === app);
    return application;
  });

  const onOpenApp = (app) => {
    store.commit('openApp', app);
  };

  return {
    applications,
    onOpenApp,
  };
};

export default defineComponent({
  components: {},
  setup() {
    return {
      ...applicationSetup(),
    };
  },
});
</script>

<style lang="less" scoped>
.application {
  margin: 20px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px rgba(255, 255, 255, 0);
  border-radius: 5px;
  user-select: none;
  .icon {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
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
