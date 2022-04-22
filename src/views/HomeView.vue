<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png">


    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { httpGet } from '@/services/http'

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {

  async created() {
    try {
      const { data } = await httpGet('/users');

      const { content } = data;
      console.log(content)
    }catch (err: any) {
      console.log(err)
    }
  }
}
</script>
