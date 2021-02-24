<template lang="pug">
.page-container.absolute.inset-0.flex.justify-center.items-center
  .form-container.bg-white.py-10.px-32
    .title.text-4xl.font-bold.text-center.text-blue-500 Welcome
    a-divider
    .tips.text-sm.text-blue-600 
      span 请设置默认的系统管理员
      span.text-blue-800.font-bold.px-1 ( root )
      span 的密码:
    .root-form.py-5
      a-form(
        layout="vertical"
        :model="rootModel"
        :rules="rootRules"
        @finish="onSubmit")
        a-form-item(name="password" label=" 新密码:")
          a-input-password(
            v-model:value="rootModel.password"
            type="password"
          )
        a-form-item(name="repassword" label="确认密码:")
          a-input-password(
            v-model:value="rootModel.repassword"
            type="password"
          )
        .submit-wrapper.flex.justify-center
          a-button.login-button(type="primary" shape='circle' html-type="submit")
            template(#icon)
              CheckOutlined.text-3xl
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons-vue';

import { useStore } from 'vuex';
import { useRequest } from '@/graphql';
import { createRootUser } from '@/graphql/user.graph';

const request = useRequest();
const router = useRouter();
const store = useStore();

const rootModel = reactive({
  password: '',
  repassword: '',
});

const rootRules = {
  password: [
    {
      type: 'string',
      required: true,
      validator: checkPasswordEqual,
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      type: 'string',
      required: true,
      validator: checkPasswordEqual,
      trigger: 'blur',
    },
  ],
};

function checkPasswordEqual(rule, value) {
  if (value === '') {
    return Promise.reject('密码不能为空');
  }

  if (!value.match(/^[A-Za-z0-9]{6,16}$/)) {
    return Promise.reject('密码必须为6-16位的大小写字母或数字');
  }

  if (
    rootModel.password !== '' &&
    rootModel.repassword !== '' &&
    rootModel.password !== rootModel.repassword
  ) {
    return Promise.reject('两次输入密码不一致');
  }

  return Promise.resolve();
}

function onSubmit() {
  const password = rootModel.password;
  request(createRootUser, { password }).then(({ createRootUser: root }) => {
    store.commit('user/updateUser', root);
    router.push('/');
  });
}
</script>

<style lang="stylus" scoped>
.page-container
  background-image:url('/wallpapers/wallpaper-02.jpg')
  background-size: 100% 100%;
  overflow: hidden;

  .form-container
    min-width:600px;
    border-radius:5px

    .login-button
      width:50px;
      height:50px;
</style>
