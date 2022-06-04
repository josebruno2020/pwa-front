<template>
  <div id="app">
    <menu-interface ref="menu" class="menu" v-if="logged"></menu-interface>
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
    // this.disabledMenu();
    if (this.$store.state.token) {
      return this.logged = true;
    }
    return this.logged = false;
  },

  methods: {
    disabledMenu () {
      return this.$refs.menu.showMenu = false
    }
  }


}
</script>

<style lang="sass">
.page-view
  width: 100%

.row-main
  width: 100vw
  display: flex
  justify-content: center
  margin: 0 !important

.el-card
  margin-top: .5rem


label
  padding-bottom: 0 !important
  width: auto

.el-select
  width: 100%


.subtitle
  padding: .8rem 0


.footer
  padding-top: 1rem

  .center
    display: flex
    justify-content: center

</style>
