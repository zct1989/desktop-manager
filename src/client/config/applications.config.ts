export const applicationsConfig = [
  {
    name: 'user-manage',
    icon: '/icons/user.png',
    title: '用户管理',
    root: () => import('@/apps/user-manage/user-manage.vue'),
  },
];
