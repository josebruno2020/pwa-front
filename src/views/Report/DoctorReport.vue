<template>
  <main>
    <page-title title="Relatório Médico" />
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
export default class DoctorReport extends Vue {}
</script>

<style scoped>

</style>