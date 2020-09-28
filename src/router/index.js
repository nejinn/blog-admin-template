import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/login/Login.vue");

const Home = () => import("../views/home/Home.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      login: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
