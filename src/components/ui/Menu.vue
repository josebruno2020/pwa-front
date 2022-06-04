<template>
  <div>
    <el-button type="success" plain v-if="!showMenu" @click="showMenu = true">Abrir menu</el-button>
    <el-menu v-if="showMenu" default-active="2" class="el-menu-vertical-demo"
             @open="handleOpen" @close="handleClose"
             :collapse="isCollapse">
      <el-menu-item index="1" @click="toRoute('home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">Usuários</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="toRoute('listUser')">Listagem</el-menu-item>
          <el-menu-item index="1-2" @click="toRoute('createUser')">Cadastro</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">Pacientes</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="toRoute('listPatient')">Listagem</el-menu-item>
          <el-menu-item index="1-2" @click="toRoute('createPatient')">Cadastro</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Four</span>
      </el-menu-item>

      <el-menu-item type="danger" index="5" @click="logout">
        <i class="el-icon-setting"></i>
        <span slot="title">Logout</span>
      </el-menu-item>

      <el-menu-item index="5" @click="showMenu = false">
        <i class="el-icon-setting"></i>
        <span slot="title">Fechar</span>
      </el-menu-item>
    </el-menu>
  </div>


</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})

export default class MenuInterface extends Vue {
  showMenu = false
  isCollapse = false

  logout() {
    this.$store.commit('LOGOUT_USER');
    return this.$router.push({name: 'login'});
  }

  toRoute(routeName: string) {
    if (this.$route.name === routeName) return
    return this.$router.push({name: routeName});
  }

  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  }

  handleClose(key, keyPath) {
    console.log(key, keyPath);
  }
}


</script>

<style lang="sass">

.el-menu-vertical-demo:not(.el-menu--collapse)
  z-index: 99999
  width: 200px
  min-height: 100vh
  position: absolute
  top: 0
  left: 0
//transition: 2s all



</style>