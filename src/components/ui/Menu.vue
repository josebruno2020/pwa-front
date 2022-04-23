<template>

  <vs-navbar type="border" v-model="activeItem" class="nabarx">

    <div slot="title">
      <vs-navbar-title>
        Vue.js
      </vs-navbar-title>
    </div>

    <vs-navbar-item index="0">
      <router-link :to="{name: 'home'}">Home</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <router-link :to="{name: 'listPatient'}">Pacientes</router-link>
<!--      <a href="#">Pacientes</a>-->
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <router-link :to="{name: 'listUser'}">Usuários</router-link>
    </vs-navbar-item>
  </vs-navbar>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})

export default class MenuInterface extends Vue {
  active = true;
  activeItem = 0;
}


</script>

<style scoped>

</style>