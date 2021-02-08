<template lang="pug">
.application-header(
    @mousedown.prevent="onHeaderMouseDown"
)
  .info-container
    .icon: img(:src="app.icon")
    .title {{app.title}}
  .tool-container
    MinSvg.icon(@click.stop.prevent="onMin")
    MaxSvg.icon(@click.stop.pervent="onMax")
    CloseSvg.icon(@click.stop.prevent="onClose")
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import MaxSvg from '@/assets/icons/svg/max.svg';
import MinSvg from '@/assets/icons/svg/min.svg';
import CloseSvg from '@/assets/icons/svg/close.svg';
import { useStore } from 'vuex';

const windowSetup = () => {
  const store = useStore();
  const app = inject('app') as any;

  const onClose = () => {
    store.commit('closeApp', app.id);
  };

  const onMax = () => {
    store.commit('maximizeApp', app.id);
  };

  const onMin = () => {
    store.commit('minimizeApp', app.id);
  };

  return { onClose, onMax, onMin };
};

/**
 *  拖动相关处理
 **/
const dragSetup = () => {
  const position = inject('position') as any;
  const app = inject('app') as any;
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
    app,
    onHeaderMouseDown: onDragStart,
  };
};

export default defineComponent({
  components: {
    MaxSvg,
    MinSvg,
    CloseSvg,
  },
  setup() {
    return {
      ...dragSetup(),
      ...windowSetup(),
    };
  },
});
</script>

<style lang="less" scoped>
.application-header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;

  .info-container {
    flex: 1;
    display: flex;
    align-items: center;

    .icon {
      img {
        padding: 0 10px;
        width: 16px;
        height: 16px;
      }
    }
    .title {
      font-size: 12px;
      flex: 1;
      text-align: center;
      user-select: none;
    }
  }
  .tool-container {
    .icon {
      padding: 0 5px;
      width: 18px;
      height: 18px;
      border: solid 1px transparent;

      &:hover {
        border: solid 1px rgba(200, 200, 200, 0.2);
        background-color: rgba(200, 200, 200, 0.2);
      }

      &:active {
        border: solid 1px rgba(200, 200, 200, 0.1);
        background-color: rgba(200, 200, 200, 0.1);
      }
    }
  }
}
</style>
