<template>
  <main class="history-main">
    <h2 class="history-title">Paciente: {{ patient.name }}</h2>
    <p v-if="loading">Carregando...</p>
    <div v-if="sickness.sickness.length" class="sickness">
      <h4 class="history-subtitle">Doenças Registradas:</h4>
      <ul v-for="(sick, index) in sickness.sickness.split(',')" :key="index">
        <li>{{ sick }}</li>
      </ul>
    </div>
    <div v-if="sickness.others">
      <h4 class="history-subtitle">Outros:</h4>
      <p>{{ sickness.others }}</p>
    </div>
  </main>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {PreExistentSicknessModel} from "@/models/PreExistentSicknessModel";
import {PatientModel} from "@/models/PatientModel";
import { apiRoutes } from "@/services/apiRoutes";
import { httpGet } from "@/services/http";

@Component({
  name: 'HistoryExistentSickness'
})
export default class HistoryExistentSickness extends Vue {
  loading = false
  sickness: PreExistentSicknessModel = new PreExistentSicknessModel()
  patient: PatientModel = new PatientModel()

  async setInformation(patient: PatientModel) {
    this.patient = patient
    this.loading = true

    try {
      const { data } = await httpGet(`${apiRoutes.sickness}/${patient.id}`)
      this.sickness = data.content

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel buscar as doenças pré-existentes'
      })
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.history-main {
  padding: 0 2rem;
}
.history-title {
  margin-bottom: 2rem;
}

.history-subtitle {
  text-align: left !important;
  margin-bottom: 1rem;
}

.sickness {
  margin-bottom: 2rem;
}
</style>