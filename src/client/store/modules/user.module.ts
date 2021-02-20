export default {
  namespaced: true,
  state: () => ({
    current: {},
  }),
  mutations: {
    updateUser(state, user) {
      state.current = user;
    },
  },
};
