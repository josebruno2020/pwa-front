<template>
  <div id="app">
    <menu-interface></menu-interface>
    <router-view/>
  </div>
</template>

<script lang="ts">
import MenuInterface from '@/components/ui/Menu.vue'
export default {
  components: {
    MenuInterface
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
