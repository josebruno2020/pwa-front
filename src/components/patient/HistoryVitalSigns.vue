<template>
  <main>
    <h2 class="history-title">Paciente: {{ patient.name }}</h2>
    <el-skeleton v-if="loading" :rows="6" animated />
    <div class="report" v-for="(vital, index) in vitalSigns" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Enfermeiro(a): <strong>{{ vital.user.name }}</strong></span>
          <span style="float: right; padding: 3px 0" type="text"><strong>{{
              new Date(vital.created_at).toLocaleString()
            }}</strong></span>
        </div>
        <div class="report-body">
          <p>Pressão Arterial: <strong>{{ vital.blood_pressure.split(',')[0] }}</strong>x<strong>{{ vital.blood_pressure.split(',')[1] }}</strong> mmHg</p>
          <p>Frequência Cardíaca: <strong>{{ vital.heart_pressure }}</strong> bpm</p>
          <p>Frequência Respiratória: <strong>{{ vital.respiratory_frequency }}</strong> rpm</p>
          <p>Temperatura axiliar: <strong>{{ vital.axiliary_temperature }}</strong> C°</p>
          <p>SapO²: <strong>{{ vital.sap }}</strong> %</p>
          <p>Glicemia capilar: <strong>{{ vital.capillary_blood_glucose }}</strong> mg/dl</p>
        </div>
      </el-card>

    </div>
    <p v-if="!vitalSigns.length && !loading">Nenhum registro encontrado</p>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {PatientModel} from "@/models/PatientModel";
import {httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";

@Component({
  name: 'HistoryVitalSigns'
})
export default class HistoryVitalSigns extends Vue {
  patient: PatientModel = new PatientModel()
  loading = false
  vitalSigns = []

  async setInformation(patient: PatientModel) {
    this.vitalSigns = []
    this.patient = patient
    this.loading = true

    try {
      const { data } = await httpGet(`${apiRoutes.vitalSign}/${patient.id}`)
      this.vitalSigns = data.content

      console.log(this.vitalSigns)

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

</style>