<script lang="ts">
import { defineAsyncComponent, defineComponent, h, inject } from 'vue';
export default defineComponent({
  render() {
    const app = inject('app') as any;
    const Component = defineAsyncComponent(app.root);
    return h('div', { class: 'application-body' }, [h(Component)]);
  },
});
</script>
<style lang="less" scoped>
.applicatoin-body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
