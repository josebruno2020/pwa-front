<template>
  <main>
    <page-title title="Relatório de Enfermagem"/>
  </main>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {NurseReportModel} from "@/models/NurseReportModel";

@Component({
  components: {
    PageTitle
  }
})
export default class NurseReport extends Vue {
  model: NurseReportModel = new NurseReportModel();
}
</script>

<style scoped>

</style>