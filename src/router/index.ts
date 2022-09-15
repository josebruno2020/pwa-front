import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/mudar-senha",
    name: "changePassword",
    component: () => import("../views/Auth/ChangePassword.vue"),
  },
  {
    path: "/resetar-senha/:token",
    name: "resetPassword",
    component: () => import("../views/Auth/ResetPassword.vue"),
    props: true,
    meta: {
      public: true,
    },
  },
  {
    path: "/esqueci-senha",
    name: "password",
    component: () => import("@/views/Auth/Password.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/usuarios/criar",
    name: "createUser",
    component: () => import("@/views/User/CreateUser.vue"),
  },
  {
    path: "/usuarios",
    name: "listUser",
    component: () => import("@/views/User/ListUser.vue"),
  },
  {
    path: "/pacientes",
    name: "listPatient",
    component: () => import("@/views/Patient/ListPatient.vue"),
  },
  {
    path: "/pacientes/criar",
    name: "createPatient",
    component: () => import("@/views/Patient/CreatePatient.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((route, routeFrom, routeNext) => {
  if (!route.meta?.public && !store.state.token) {
    return routeNext({ path: "/login" });
  }

  routeNext();
});

export default router;
