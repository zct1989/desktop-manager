<script lang="ts">
import { defineAsyncComponent, defineComponent, h } from 'vue';
export default defineComponent({
  props: {
    app: {
      required: true,
    },
  },
  render() {
    const Component = defineAsyncComponent(this.app.root);
    return h(Component);
  },
});
</script>
