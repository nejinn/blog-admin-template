import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/login/Login.vue");

const TheContainer = () => import("../views/layout/TheContainer.vue");
const Home = () => import("../views/home/Home.vue");
const UserList = () => import("../views/user/UserList.vue");

const Sidebar = () => import("../views/setting/Sidebar.vue");
const Permission = () => import("../views/setting/Permission.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Index",
    component: TheContainer,
    redirect: "/home",
    meta: {
      login: true,
      title: "首页"
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "首页",
          login: true
        }
      },
      {
        path: "user",
        name: "User",
        redirect: "/user/list/",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: "用户",
          login: true
        },
        children: [
          {
            path: "list",
            name: "UserList",
            component: UserList,
            meta: {
              title: "用户列表",
              login: true
            }
          }
        ]
      },
      {
        path: "setting",
        name: "Setting",
        redirect: "/setting/sidebar-list/",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: "设置",
          login: true
        },
        children: [
          {
            path: "sidebar-list",
            name: "Sidebar",
            component: Sidebar,
            meta: {
              title: "导航设置",
              login: true
            }
          },
          {
            path: "permission-list",
            name: "Permisssion",
            component: Permission,
            meta: {
              title: "权限设置",
              login: true
            }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
