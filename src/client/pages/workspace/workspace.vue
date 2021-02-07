<template lang="pug">
div.page-container
  div.desktop-container
    desktop
  div.applications

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApplicationContainer from '@/shared/components/application-container.vue';
import Desktop from './components/desktop.vue';

export default defineComponent({
  components: {
    Desktop,
    ApplicationContainer,
  },
  setup() {
    return {};
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
}
</style>
