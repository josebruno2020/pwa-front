import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue'),
  },
  {
    path: '/mudar-senha',
    name: 'changePassword',
    component: () => import('../views/Auth/ChangePassword.vue'),
  },
  {
    path: '/esqueci-senha',
    name: 'password',
    component: () => import('@/views/Auth/Password.vue')
  },
  {
    path: '/usuarios/criar',
    name: 'createUser',
    component: () => import('@/views/User/CreateUser.vue')
  },
  {
    path: '/usuarios',
    name: 'listUser',
    component: () => import('@/views/User/ListUser.vue')
  },
  {
    path: '/pacientes',
    name: 'listPatient',
    component: () => import('@/views/Patient/ListPatient.vue')
  },
  {
    path: '/pacientes/criar',
    name: 'createPatient',
    component: () => import('@/views/Patient/CreatePatient.vue')
  },

  {
    path: '/pacientes/doencas',
    name: 'existentSickness',
    component: () => import('@/views/Patient/ExistentSickness.vue')
  },
  {
    path: '/relatorio/enfermeira',
    name: 'reportNurse',
    component: () => import('@/views/Report/NurseReport.vue')
  },
  {
    path: '/relatorio/doutor',
    name: 'reportDoctor',
    component: () => import('@/views/Report/DoctorReport.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
