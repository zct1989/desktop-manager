<template lang="pug">
.page-container
  .systembar-container
    system-bar
  .desktop-container
    desktop
    application(
      v-for="app in applications"
      :key="app.name"
      :app="app"
    )
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Desktop from './components/desktop.vue';
import { useStore } from 'vuex';
import { ApplicationList, ApplicationState } from '@/config/application.config';
import Application from '@/shared/components/application/application.vue';
import SystemBar from './components/system-bar.vue';
import { getUserList } from '@/graphql/user.graph';
import { useRequest } from '@/graphql';

export default defineComponent({
  components: {
    Application,
    Desktop,
    SystemBar,
  },
  setup() {
    const store = useStore();
    const applications = store.state.applicationInstances;
    const request = useRequest();
    request(getUserList).then((data) => {
      console.log(data);
    });
    return {
      applications,
    };
  },
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
  background-image: url('/wallpapers/wallpaper-01.png');
  background-size: 100% 100%;

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
