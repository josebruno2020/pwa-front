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
    <vs-navbar-item @click="logout" index="3">
      <span class="logout" @click="logout">Logout</span>
    </vs-navbar-item>
  </vs-navbar>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})

export default class MenuInterface extends Vue {
  active = true;
  activeItem = 0;

  logout() {
    this.$store.commit('LOGOUT_USER');
    return this.$router.push({name: 'login'});
  }
}


</script>

<style scoped>
.logout {
  color: darkred;
}
</style>