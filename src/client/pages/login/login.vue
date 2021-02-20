<template lang="pug">
.page-container.flex.justify-end.items-center
  .login-container.p-16
    .welcome.text-blue-500 Welcome
    .login-form.py-10
      a-form(
        layout="vertical"
        :model="loginModel"
        :rules="loginRules"
        @finish="onSubmit")
        a-form-item(name="username")
          a-input(
            v-model:value="loginModel.username"
            placeholder="用户名"
          )
        a-form-item(name="password")
          a-input(
            v-model:value="loginModel.password"
            type="password"
            placeholder="密码"
          )
        a-button.login-button(type="primary" html-type="submit") 
          template(#icon)
            ArrowRightOutlined.text-3xl
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// #region Variable
const loginModel = reactive({
  username: 'admin',
  password: '123456',
});

const loginRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};
// #endregion

// #region Function
// 用户登陆
function onSubmit() {
  const { username } = toRaw(loginModel);

  store.commit('user/updateUser', {
    username,
  });

  router.push({ path: '/' });
}

// #endregion
</script>

<style lang="stylus" scoped>
.page-container
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image:url('/wallpapers/wallpaper-02.jpg')
  background-size: 100% 100%;
  overflow: hidden;

  .login-container
    position:relative
    margin-right:200px;
    height:500px
    width:400px;
    background:#fff;
    border-radius:5px;
    box-shadow:0 0 5px 5px rgba(0,0,0,0.3)

    .welcome
      font-size:24px
      font-weight:bold

    .login-form
      .ant-input
        border:none;
        border-bottom:solid 1px rgba(0,0,0,0.1)
        padding:5px 0;
        &:focus
          border-bottom:solid 1px rgba(59, 130, 246, 0.5)
          outline: 0;
          box-shadow: none;

    .login-button
      position:absolute;
      right:-40px;
      bottom:100px;
      width:75px
      height:75px
      border-radius:100%
</style>
