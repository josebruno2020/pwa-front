<template>
  <main>
    <div id="print">
      <h2 class="report-title">Paciente: {{ patient.name }}</h2>
      <el-skeleton v-if="loading" :rows="6" animated />
      <div class="report" v-for="(report, index) in reports" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Doutor(a): <strong>{{ report.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{
                new Date(report.created_at).toLocaleString()
              }}</strong></span>
          </div>
          <div class="report-body">
            <p>{{ report.report }}</p>
          </div>
        </el-card>
      </div>

      <p v-if="!reports.length && !loading">Nenhum registro encontrado</p>
    </div>

    <div class="report-print">
      <el-button type="warning" plain @click="printReport()">
        <i class="el-icon-printer"></i>
      </el-button>
    </div>
  </main>
</template>

<script lang="ts">

import { PatientModel } from "@/models/PatientModel";
import { apiRoutes } from "@/services/apiRoutes";
import { httpGet } from "@/services/http";
import {Component, Vue} from "vue-property-decorator";

@Component({
  name: 'HistoryDoctorReport'
})
export default class HistoryDoctorReport extends Vue {
  loading = false
  patient: PatientModel = new PatientModel()
  reports: Array<any> = []

  async setInformation(patient: PatientModel) {
    this.reports = []
    this.patient = patient
    this.loading = true
    try {
      const {data} = await httpGet(`${apiRoutes.doctorReport}/${this.patient.id}`)
      console.log(data)
      this.reports = data.content
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel buscar o histórico de Relatórios'
      })
    } finally {
      this.loading = false
    }
  }

  printReport() {
    // Get HTML to print from element
    const prtHtml = document.getElementById('print')?.innerHTML;

    // Get all stylesheets HTML
    let stylesHtml = '';
    for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
      stylesHtml += node.outerHTML;
    }

    // Open the print window
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    WinPrint?.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

    WinPrint?.document.close();
    WinPrint?.focus();
    WinPrint?.print();
    WinPrint?.close();
  }
}
</script>

<style scoped>
.report-title {
  margin-bottom: 2rem;
}
.report-body {
  font-size: 1.1rem;
}

.report-print {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

</style>
