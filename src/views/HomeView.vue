<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ name }}
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  data() {
    return {
      name: 'jose'
    }
  },
  created() {
    alert('fui criado');
  },
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
