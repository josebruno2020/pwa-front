<template>
  <main>
    <div id="print-doctor">
      <h2 class="report-title">Relatório Médico</h2>
      <p class="report-subtitle">Paciente: {{ patient.name }}</p>
      <el-skeleton v-if="loading" :rows="6" animated />
      <div class="report" v-for="(report, index) in reports" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Doutor(a): <strong>{{ report.user.name }}</strong></span>
            <span style="float: right; padding: 3px 0" type="text"><strong>{{ formatDate(report.created_at) }}</strong>
            </span>
            <span class="report-action no-print"  v-if="report.user.id === userId">
              <el-button size="mini" title="Editar Relatório" type="warning" plain @click="editRow(index)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" title="Excluir Relatório" type="danger" plain @click="deleteReport(report.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
          </div>
          <div class="report-body">
            <p :id="`report-${index}`">{{ report.report }}</p>
            <div :id="`edit-report-${index}`" class="d-none no-print">
              <el-input type="textarea" v-model="report.report"></el-input>
              <el-button
                  class="btn-edit"
                  type="light"
                  size="mini"
                  @click="removeEditRow(index)">
                Cancelar</el-button>
              <el-button class="btn-edit" type="success" plain size="mini"
                         @click="updateReport(report.id, report.report)">
                Salvar
              </el-button>
            </div>
          </div>
        </el-card>
      </div>

      <p v-if="!reports.length && !loading">Nenhum registro encontrado</p>
    </div>

    <div class="report-print">
      <el-button type="warning" plain @click="printReport">
        <i class="el-icon-printer"></i>
      </el-button>
    </div>
  </main>
</template>

<script lang="ts">

import { PatientModel } from "@/models/PatientModel";
import { apiRoutes } from "@/services/apiRoutes";
import {httpDelete, httpGet, httpPut} from "@/services/http";
import {Mixins, Component} from "vue-mixin-decorator";
import LoadingMixin from "@/components/mixins/loadingMixin";
import DateMixin from "@/components/mixins/dateMixin";
import EditRowMixin from "@/components/mixins/editRowMixin";

@Component({
  name: 'HistoryDoctorReport'
})
export default class HistoryDoctorReport extends Mixins<LoadingMixin>(LoadingMixin, DateMixin, EditRowMixin) {
  loading = false
  patient: PatientModel = new PatientModel()
  reports: Array<any> = []
  userId: number
  $htmlToPaper: any;

  async setInformation(patient: PatientModel) {
    this.patient = patient
    this.userId = this.$store.state.user.id
    await this.fetchReport();
  }

  async fetchReport() {
    this.loading = true
    this.reports = []
    try {
      const {data} = await httpGet(`${apiRoutes.doctorReport}/${this.patient.id}`)
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



  async updateReport(reportId: number, newReport: string) {
    this.openFullScreenLoading()
    try {
      await httpPut(`${apiRoutes.doctorReport}/${reportId}`, {
        report: newReport
      });
      this.$notify.success({
        title: 'Sucesso',
        message: 'Relatório atualizado com sucesso'
      })
      return this.fetchReport();
    } catch (err) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível deletar o relatório'
      })
    } finally {
      this.loadingFull.close();
    }
  }

  async deleteReport(reportId: number) {
    this.openFullScreenLoading()
    try {
      await httpDelete(`${apiRoutes.doctorReport}/${reportId}`);
      this.$notify.success({
        title: 'Sucesso',
        message: 'Relatório deletado com sucesso'
      })
      return this.fetchReport();
    } catch (err) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível deletar o relatório'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  async printReport() {
    await this.$htmlToPaper('print-doctor');
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
</style>
