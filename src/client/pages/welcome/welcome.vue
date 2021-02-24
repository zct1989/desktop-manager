<template lang="pug">
div 123123
</template>

<script setup lang="ts">
import { getUserList } from '@/graphql/user.graph';
import { useRequest } from '@/graphql';

const request = useRequest();

// 获取用户列表
request(getUserList).then((data) => {});
</script>
