import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import "./plugins/axios";
import router from "./router";
import "./plugins/v-money";
import "./store/index";
Vue.config.productionTip = false;
import AlertMessages from "@/components/Utils/AlertMessages.vue";

Vue.component("AlertMessages", AlertMessages);
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
