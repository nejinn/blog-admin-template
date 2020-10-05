import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "nly-adminlte-vue/dist/adminlte/css/adminlte.css";
import "nly-adminlte-vue/dist/adminlte/fontawesome-free/css/all.css";
import "nly-adminlte-vue/dist/adminlte/icon/iconfont.css";
import "nly-adminlte-vue/dist/nly-adminlte-vue.css";
import { NlyAdminlteVue, NlyAdminlteVueIcons } from "nly-adminlte-vue";
Vue.use(NlyAdminlteVue);
Vue.use(NlyAdminlteVueIcons);

import Toast from "./utils/toast";
import Api from "./utils/http";
import RenderContext from "./utils/render-context/context";
import "./assets/custom.css";
Vue.prototype.$toast = Toast;
Vue.prototype.$api = Api;
Vue.prototype.$renderContext = RenderContext;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    // 判断跳转的路由是否需要登录
    if (store.state.login.loginToken) {
      // vuex.state判断token是否存在
      next(); // 已登录
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
