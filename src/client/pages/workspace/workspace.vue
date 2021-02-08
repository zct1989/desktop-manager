<template lang="pug">
div.page-container
  div.desktop-container
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
import { applicationsConfig } from '@/config/applications.config';
import Application from '@/shared/components/application/application.vue';

export default defineComponent({
  components: {
    Application,
    Desktop,
  },
  setup() {
    const store = useStore();

    const applications = computed(() => {
      return store.state.applicationInstances.map((app) => {
        const application = applicationsConfig.find((x) => x.name === app);
        return application;
      });
    });

    return {
      applications,
    };
  },
});
</script>
<style lang="less" scoped>
.page-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image: url('/wallpapers/wallpaper-01.png');
  background-size: 100% 100%;

  .applications,
  .desktop-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
