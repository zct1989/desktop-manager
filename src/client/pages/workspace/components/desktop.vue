<template lang="pug">
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

const applicationSetup = () => {
  const store = useStore();
  return {};
};

export default defineComponent({
  setup() {
    return {
      ...applicationSetup(),
    };
  },
});
</script>
