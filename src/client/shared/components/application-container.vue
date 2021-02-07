<template lang="pug">
.application-container(
  :style="style"
  )
  .application-header(
    @mousedown.prevent="onHeaderMouseDown"
  )
  
  .application-body
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';

/**
 *  位置相关
 **/
const positionSetup = () => {
  const position = reactive({
    top: 0,
    left: 0,
    width: 400,
    height: 400,
  });

  const style = computed(() => ({
    top: `${position.top}px`,
    left: `${position.left}px`,
    height: `${position.height}px`,
    width: `${position.width}px`,
  }));

  return {
    position,
    style,
  };
};

/**
 *  拖动相关处理
 **/
const dragSetup = (position) => {
  let posX = 0;
  let posY = 0;

  // 拖动处理
  const onDragMove = (e) => {
    const left = posX - e.clientX;
    const top = posY - e.clientY;
    posX = e.clientX;
    posY = e.clientY;

    position.top -= top;
    position.left -= left;
  };

  // 结束拖动监听
  const onDragEnd = () => {
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('mousemove', onDragMove);
  };

  // 开始拖动监听
  const onDragStart = (e) => {
    posX = e.clientX;
    posY = e.clientY;

    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('mousemove', onDragMove);
  };

  return {
    onHeaderMouseDown: onDragStart,
  };
};

export default defineComponent({
  setup() {
    const { position, style } = positionSetup();

    onMounted(() => {});

    return {
      style,
      ...dragSetup(position),
    };
  },
});
</script>

<style lang="less" scoped>
.application-container {
  width: 600px;
  height: 500px;
  background: yellow;
  position: absolute;
  .application-header {
    min-height: 60px;
    background: red;
  }
}
</style>
