<template>
  <main>
    <page-title title="Pacientes" ></page-title>
  </main>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";

@Component({
  components: {
    PageTitle
  }
})
export default class ListPatient extends Vue {}
</script>

<style scoped>

</style>