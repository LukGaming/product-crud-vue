import $http from "@/plugins/axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    count: 0,
    products: [],
  },
  actions: {
    increaseCounter({ commit }) {
      commit("increaseCounter");
    },
    decreaseCounter({ commit }) {
      commit("decreaseCounter");
    },
    fetchAllproducts({ commit }) {
      $http.get("Product").then((res) => console.log(res));
      return commit;
    },
  },
  mutations: {
    increaseCounter(state) {
      state.count++;
    },
    decreaseCounter(state) {
      state.count--;
    },
  },
  getters: {
    count(state) {
      return state.count;
    },
  },
});
