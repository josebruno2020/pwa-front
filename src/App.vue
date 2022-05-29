<template>
  <div id="app">
    <menu-interface v-if="logged"></menu-interface>
    <router-view/>
  </div>
</template>

<script lang="js">
import MenuInterface from '@/components/ui/Menu.vue'
export default {
  data() {
    return {
      logged: false
    }
  },
  components: {
    MenuInterface
  },
  created() {
    if (this.$store.state.token) {
      this.logged = true;
    }
  },
  updated() {
    if (this.$store.state.token) {
      return this.logged = true;
    }

    return this.logged = false;
  }
}
</script>

<style>
#app {

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
