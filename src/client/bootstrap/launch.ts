import store from '@/store';
import { getRootUser } from '@/graphql/user.graph';
import { createRequest, useRequest } from '@/graphql';

export default async function launch() {
  const request = createRequest();

  // 获取用户列表
  return request(getRootUser).then((data) => {
    const { root } = data;

    store.commit('ready');

    if (!root) {
      return '/welcome';
    }

    return true;
  });
}
