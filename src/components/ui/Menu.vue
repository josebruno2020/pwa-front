<template>
  <header class="header">  
    <nav class="navbar">  
    <button aria-label="Open Mobile Menu" class="open-mobile-menu">  
      <i class="material-icons" aria-hidden="true">menu</i>  
    </button>  
    <router-link :to="{name: 'home'}">  
      <h1 class="logo vertical-logo" alt="logo">Monintox</h1>  
    </router-link>  
    <div class="top-menu-wrapper">  
      <ul class="top-menu">  
      <li class="mob-block">  
        <h1 class="logo" alt="sidebar logo">Menu</h1>  
        <button aria-label="Close Mobile Menu" class="close-mobile-menu">  
        <i class="material-icons" aria-hidden="true">clear</i>  
        </button>  
      </li>  
      <li><span class="menu-link" @click="toRoute('home')">Página incial</span></li>  
      <li><span class="menu-link" @click="toRoute('listPatient')">Listar Pacientes</span></li>  
      <li><span class="menu-link" @click="toRoute('createPatient')">Cadastrar Paciente</span></li>  
      <li><span class="menu-link" @click="toRoute('listUser')">Listar Usuários</span></li>  
      <li><span class="menu-link" @click="toRoute('createUser')">Cadastrar Usuário</span></li>  
      <li><span class="logout-link" @click="logout()">Sair do sistema</span></li>
      </ul>  
    </div>  
    </nav>  
  </header> 


</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  name: 'Menu'
})

export default class MenuInterface extends Vue {
  showMenu = false
  isCollapse = false
  showOffCanvas = "show-offcanvas";
  noTransition = "no-transition";  
  isVisible = "is-visible";

  mounted() {
    const pageHeader = document.querySelector(".header");  
    const openMobMenu = document.querySelector(".open-mobile-menu");  
    const closeMobMenu = document.querySelector(".close-mobile-menu");  
    const topMenuWrapper = document.querySelector(".top-menu-wrapper");  
    let resize;  
    // Opening Mobile Menu
    openMobMenu?.addEventListener("click", () => {  
      topMenuWrapper?.classList.add(this.showOffCanvas);  
    });  
    // Closing Mobile Menu  
    closeMobMenu?.addEventListener("click", () => {  
      topMenuWrapper?.classList.remove(this.showOffCanvas);  
    });  
    // Resizing Screen  
    window.addEventListener("resize", () => {  
      pageHeader?.querySelectorAll("*").forEach((el) => {  
        el.classList.add(this.noTransition);  
      });  
      clearTimeout(resize);  
      resize = setTimeout(() => this.resizingComplete(pageHeader), 500);  
    });
  }

  resizingComplete(pageHeader: any) {  
    pageHeader?.querySelectorAll("*").forEach((el) => {  
      el.classList.remove(this.noTransition);  
    });  
  }

  logout() {
    this.$store.commit('LOGOUT_USER');
    return this.$router.push({name: 'login'});
  }

  toRoute(routeName: string) {
    if (this.$route.name === routeName) return
    const btn = document.querySelector(".close-mobile-menu") as HTMLButtonElement
    btn?.click()
    return this.$router.push({name: routeName});
  }
}


</script>

<style scoped>

*, *::before, *::after {  
       padding: 0;  
       margin: 0;  
       box-sizing: border-box;  
 }  
  body {  
       font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;  
       font-size: 1rem;  
       line-height: 1.5;  
       color: #fff;  
       min-height: 100vh;  
 }  
  ul {  
       list-style: none;  
 }  
  a, span {  
       text-decoration: none;  
       color: inherit;  
 }  
  img {  
       display: block;  
       max-width: 100%;  
       height: auto;  
 }  
  a, button, span {  
       cursor: default;  
 }  
  button {  
       color: inherit;  
       background: transparent;  
       border: none;  
       outline: none;  
 }  
  .no-transition {  
       transition: none !important;  
 }  
  .header {  
       position: relative;  
       padding: .5rem 1rem;  
       background: #fff;  
       box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 2px 1px -5px rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.2);  
 }  
  .header .navbar {  
       display: flex;  
       flex-direction: row;  
       flex: 1;  
       flex-basis: auto;  
       align-items: center;  
       justify-content: space-between;  
 }  
  .header .navbar .vertical-logo {  
       font-size: 1.7rem;  
       font-weight: 700;  
       text-transform: uppercase;  
       color: #247C1DFF;  
 }  
  .header .navbar .top-menu-wrapper {  
       color: #221f1f;  
 }  
  .header .navbar .top-menu-wrapper::before {  
       content: "";  
       position: fixed;  
       top: 0;  
       left: 0;  
       right: 0;  
       bottom: 0;  
       z-index: -1;  
       transition: background 0.5s;  
 }  
  .header .navbar .open-mobile-menu i {  
       color: #221f1f;  
 }  
  .header .navbar .top-menu {  
       position: fixed;  
       top: 0;  
       left: 0;  
       bottom: 0;  
       z-index: 2;  
       transform: translate3d(-100%, 0, 0);  
       transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);  
 }  
  .header .navbar .top-menu {  
       display: flex;  
       flex-direction: column;  
       width: 100%;  
       overflow-y: auto;  
       padding: 1.5rem 1.5rem;  
       background: #fff;  
 }  
  .header .navbar .top-menu-wrapper.show-offcanvas::before {  
       background: rgba(0, 0, 0, 0.5);  
       z-index: 1;  
 }  
  .header .navbar .top-menu-wrapper.show-offcanvas .panel, .header .navbar .top-menu-wrapper.show-offcanvas .top-menu {  
       transform: translate3d(0, 0, 0);  
       transition-duration: 0.7s;  
 }  
  .header .navbar .top-menu-wrapper.show-offcanvas .top-menu {  
       transition-delay: 0.2s;  
 }  
  .header .navbar ul span {  
       display: inline-block;  
       font-size: 1rem;  
       font-weight: 600;  
       text-transform: none;  
       transition: all 0.35s ease-out;  
 }  
  .header .navbar ul span:hover {  
       opacity: .8;
 }  
  .header .navbar .has-dropdown i {  
       display: none;  
 }  
  .header .navbar .sub-menu {  
       padding: 0.5rem 1.5rem 0 1.5rem;  
 }  
  .header .navbar .sub-menu a {  
       text-transform: capitalize;  
       font-size: 1rem;  
       font-weight: 400;  
       margin-top: 0rem;  
 }  
  .header .navbar .top-menu li + li {  
       margin-top: 1.3rem;  
 }  
  .header .navbar .top-menu .mob-block {  
       display: flex;  
       align-items: center;  
       justify-content: space-between;  
       margin-bottom: 2rem;  
 }  
  .header .navbar .top-menu .mob-block .logo {  
       font-size: 1.7rem;  
       font-weight: 700;  
       text-transform: uppercase;  
       color: #247C1DFF;  
 }  
  .header .navbar .top-menu .mob-block i {  
       color: #221f1f;  
 }

.logout-link {
  color: #d93622;
}

</style>