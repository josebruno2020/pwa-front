<template>
  <main>
    <div id="print-chart">
      <h2 class="report-title">Prontuário</h2>
      <p class="report-subtitle">Paciente: {{ patient.name }}</p>
      <p class="subtitle bold">Relatório de Enfermagem</p>
      <el-skeleton v-if="loading" :rows="6" animated />
      <div class="report" v-for="(report, index) in chart.nurseReport" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Enfermeiro(a): <strong>{{ report.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{ formatDate(report.created_at) }}</strong>
            </span>
          </div>
          <div class="report-body">
            <p>{{ report.report }}</p>
          </div>
        </el-card>
      </div>
      <div v-if="!chart.nurseReport.length">-</div>

      <p class="subtitle bold pagebreak">Relatório Médico</p>
      <div class="report" v-for="(report, index) in chart.doctorReport" :key="'A'+index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Doutor(a): <strong>{{ report.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{ formatDate(report.created_at) }}</strong>
            </span>
          </div>
          <div class="report-body">
            <p>{{ report.report }}</p>
          </div>
        </el-card>
      </div>
      <div v-if="!chart.doctorReport.length">-</div>

      <p class="subtitle bold pagebreak">Relatório Evolução de Enfermagem</p>
      <div class="report" v-for="(report, index) in chart.evolution" :key="'A'+index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Doutor(a): <strong>{{ report.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{ formatDate(report.created_at) }}</strong>
            </span>
          </div>
          <div class="report-body">
            <p>{{ report.report }}</p>
          </div>
        </el-card>
      </div>
      <div v-if="!chart.evolution.length">-</div>

      <p class="subtitle bold pagebreak">Relatório de Sinais Vitais</p>
      <div class="report" v-for="(vital, index) in chart.vitalSigns" :key="'B'+index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Enfermeiro(a): <strong>{{ vital.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{formatDate(vital.created_at)}}</strong></span>
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
      <div v-if="!chart.vitalSigns.length">-</div>

      <p v-if="!chart.nurseReport && !chart.doctorReport && !chart.vitalSigns && !loading">Nenhum registro encontrado</p>
    </div>

    <div class="report-print">
      <el-button type="warning" plain @click="print">
        <i class="el-icon-printer"></i>
      </el-button>
    </div>
  </main>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {PatientModel} from "@/models/PatientModel";
import {httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {Mixins} from "vue-mixin-decorator";
import DateMixin from "@/components/mixins/dateMixin";
import PrintMixin from "@/components/mixins/printMixin";

@Component({
  name: 'PatientChart'
})
export default class PatientChart extends Mixins<DateMixin>(DateMixin, PrintMixin){
  loading = false
  chart = {
    nurseReport: [],
    doctorReport: [],
    vitalSigns: [],
    evolution: []
  }
  patient: PatientModel = new PatientModel()
  $htmlToPaper: any;

  async setInformation(patient: PatientModel) {
    this.patient = patient
    await this.fetchReport();
  }


  async fetchReport() {
    this.loading = true
    this.chart = {
      nurseReport: [],
      doctorReport: [],
      vitalSigns: [],
      evolution: []
    }
    try {
      const {data} = await httpGet(`${apiRoutes.chart}/${this.patient.id}`)
      this.chart = data.content
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel buscar o histórico de Relatórios'
      })
    } finally {
      this.loading = false
    }
  }

  async print() {
    await this.$htmlToPaper('print-chart')
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>