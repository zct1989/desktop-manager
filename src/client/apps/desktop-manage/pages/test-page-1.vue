<template lang="pug">
div test-page-1
  button(@click="onBack") back
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
export default defineComponent({
  setup() {
    const navigate = inject('navigate');
    const onBack = () => {
      navigate.back();
    };
    return { onBack };
  },
});
</script>
