<template>
  <main>
    <h2 class="history-title">Paciente: {{ patient.name }}</h2>
    <el-skeleton v-if="loading" :rows="6" animated />
    <div class="report" v-for="(vital, index) in vitalSigns" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Enfermeiro(a): <strong>{{ vital.user.name }}</strong></span>
          <span style="float: right; padding: 3px 0" type="text"><strong>{{formatDate(vital.created_at)}}</strong></span>
          <span class="report-action"  v-if="vital.user.id === userId">
              <el-button size="mini" title="Excluir Relatório" type="danger" plain @click="deleteVitalSign(vital.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
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
import {httpDelete, httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {Mixins} from "vue-mixin-decorator";
import DateMixin from "@/components/mixins/dateMixin";
import LoadingMixin from "@/components/mixins/loadingMixin";

@Component({
  name: 'HistoryVitalSigns'
})
export default class HistoryVitalSigns extends Mixins<LoadingMixin>(DateMixin, LoadingMixin) {
  patient: PatientModel = new PatientModel()
  loading = false
  vitalSigns = []
  userId: number

  async setInformation(patient: PatientModel) {
    this.patient = patient
    this.userId = this.$store.state.user.id

    await this.fetchInformation();
  }

  async fetchInformation() {
    this.loading = true
    this.vitalSigns = []

    try {
      const { data } = await httpGet(`${apiRoutes.vitalSign}/${this.patient.id}`)
      this.vitalSigns = data.content

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel buscar as doenças pré-existentes'
      })
    } finally {
      this.loading = false
    }
  }

  async deleteVitalSign(vitalId: number) {
    this.openFullScreenLoading()
    try {
      await httpDelete(`${apiRoutes.vitalSign}/${vitalId}`);
      this.$notify.success({
        title: 'Sucesso',
        message: 'Relatório deletado com sucesso'
      })
      return this.fetchInformation();
    } catch (err) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível deletar o relatório'
      })
    } finally {
      this.loadingFull.close()
    }
  }
}
</script>

<style scoped>

</style>