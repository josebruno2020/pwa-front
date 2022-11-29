<template>
  <header class="header">
    <h1 class="logo vertical-logo" alt="logo">Monintox</h1>
    <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" @click="toRoute('home')">Início</el-menu-item>
      <el-submenu index="2" :default-openeds="subOpen">
        <template slot="title">Pacientes</template>
        <el-menu-item index="2-1" @click="toRoute('listPatient')">Listar</el-menu-item>
        <el-menu-item index="2-2" @click="toRoute('createPatient')">Cadastrar</el-menu-item>
      </el-submenu>
      <el-submenu index="3" :default-openeds="subOpen">
        <template slot="title">Usuários</template>
        <el-menu-item index="3-1" @click="toRoute('listPatient')">Listar</el-menu-item>
        <el-menu-item index="3-2" v-if="loggedUser.user_type === 1" @click="toRoute('createPatient')">Cadastrar</el-menu-item>
      </el-submenu>
      <el-menu-item index="4"   @click="logout()">
        <span class="logout-link">Sair</span>
      </el-menu-item>
    </el-menu>
  </header>


</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  name: 'Menu'
})

export default class MenuInterface extends Vue {
  loggedUser = null
  activeIndex =  '1'
  subOpen = []

  created() {
    this.loggedUser = this.$store.state.user
  }

  handleSelect(key, keyPath) {
    this.activeIndex = key
    this.subOpen = keyPath
  }

  logout() {
    this.$store.commit('LOGOUT_USER');
    return this.$router.push({name: 'login'});
  }

  toRoute(routeName: string) {
    if (this.$route.name === routeName) return
    return this.$router.push({name: routeName});
  }
}


</script>

<style scoped>


.vertical-logo {
  font-size: 1.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #247C1DFF;
  text-align: center;
  margin: 0;
}


.logout-link {
  color: #d93622;
  font-weight: bold;
}

</style>