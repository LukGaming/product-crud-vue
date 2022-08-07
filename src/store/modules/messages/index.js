export const messages = {
  namespaced: true,
  state: {
    defaultSnackBar: {
      snackbar: false,
      message: "",
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  },
  getters: {
    defaultSnackBar(state) {
      return state.defaultSnackBar;
    },
  },
  actions: {
    setDefaultSnackBar({ commit }, payload) {
      commit("setDefaultSnackBar", payload);
    },
  },
  mutations: {
    setDefaultSnackBar(state, payload) {
      state.defaultSnackBar[payload.part] = payload.value;
    },
  },
};
