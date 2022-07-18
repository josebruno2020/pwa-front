<template>
  <main>
    <page-title title="Pacientes Cadastrados"></page-title>
    <el-row :gutter="20" class="row-main">
      <el-col :span="22">
        <div class="row-action">
          <router-link :to="{name: 'createPatient'}" class="router-button">
            <el-button line-origin="left" plain type="success">Cadastrar novo paciente</el-button>
          </router-link>
        </div>
        <el-card shadow="hover">
          <el-table
              v-loading="loading"
              :data="patients"
              style="width: 100%"
              empty-text="Nenhum paciente">
            <el-table-column
                prop="name"
                label="Nome">
            </el-table-column>
            <el-table-column
                prop="name_mother"
                label="Nome da Mãe">
            </el-table-column>
            <el-table-column label="Ações">
              <template slot-scope="scope">
                <el-button @click="showPatient(scope.row)" type="warning" circle>
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="danger" circle>
                  <i class="el-icon-delete"></i>
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
        :visible.sync="showPatientModal"
        width="90%">
      <h2 class="mt-4">Infomações do Paciente</h2>
      <el-row :gutter="20" class="row-patient">
        <p>Nome: {{ patient.name }}</p>
        <p>Nome da Mãe: {{ patient.name_mother }}</p>
      </el-row>

      <h2 class="mt-4">Infomações</h2>
      <h2 class="mt-4">Ações</h2>

      <el-button type="success" @click="openNurseReport(patient)" plain>Relatório de Enfermagem</el-button>
      <el-button type="success" plain>Relatório Médico</el-button>
    </el-dialog>
    <el-dialog
        title="Relatório de Enfermagem"
        :visible.sync="showNurseReportModal"
        width="90%">
    <nurse-report ref="nurseReportModal"/>
    </el-dialog>

  </main>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PatientModel} from "@/models/PatientModel";
import {httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import NurseReport from "@/views/Report/NurseReport.vue";
import {VForm} from "@/helpers/VFormType";

@Component({
  components: {
    PageTitle,
    NurseReport
  }
})
export default class ListPatient extends Vue {
  $refs!: {
    form: VForm
  }
  patients: PatientModel[] = []
  loading = true
  patient: PatientModel = new PatientModel()
  showPatientModal = false
  showNurseReportModal = false
  showDoctorReportModal = false

  async created() {
    try {
      const {data: {content}} = await httpGet(apiRoutes.patients);
      this.patients = content;
    } catch (e: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar os pacientes.'
      })
    } finally {
      this.loading = false;
    }
  }

  showPatient(patient: PatientModel) {
    this.showPatientModal = true
    this.patient = patient
  }

  async openNurseReport(patient: PatientModel) {
    this.showNurseReportModal = true

    this.$nextTick(() => {
      return this.$refs['nurseReportModal'].setInformation(patient)
    })

  }
}
</script>

<style scoped>
.row-main {
  display: flex;
  justify-content: center;
}

.row-patient {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

}

/*h2 {*/
/*  margin-top: 3rem;*/
/*}*/
</style>