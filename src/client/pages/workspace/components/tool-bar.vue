<template lang="pug">
.tool-bar.flex.align-center
  a-dropdown.user
    UserOutlined.text-xl
    template(#overlay)
      a-menu(@click="onAction")
        .title.mx-10 您好，{{$store.state.user.current.username}}
        a-divider.my-2
        a-menu-item.text-center(key="logout") 登出
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const actions = {
  logout: onLogout,
};

function onLogout() {
  store.commit('user/logout');
  router.push('/login');
}

function onAction({ key }) {
  const action = actions[key];

  action && action();
}
</script>

<style lang="stylus" scoped>
.tool-bar
  // height:100%
  // padding:0 10px
  margin:0 20px
  // background:red
</style>
