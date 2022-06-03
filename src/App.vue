<template>
  <div id="app">
    <menu-interface class="menu" v-if="logged"></menu-interface>
    <router-view class="page-view"/>
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

<style lang="sass">


//#app
//  display: flex
//  min-height: 100vh


.page-view
  width: 100%


</style>
