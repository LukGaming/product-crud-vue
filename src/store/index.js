import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { product } from "./modules/product/index.js";
export default new Vuex.Store({
  modules: { product: product },
});
