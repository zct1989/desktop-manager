<template lang="pug">
div 
  button(@click="onEnter") test
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const navigate = inject('navigate') as any;
    const onEnter = () => {
      navigate.push({
        component: () => import('./pages/test-page-1.vue'),
      });
    };
    return {
      onEnter,
    };
  },
});
</script>
