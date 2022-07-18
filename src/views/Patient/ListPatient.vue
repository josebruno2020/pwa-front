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
                  <el-tooltip class="item" effect="dark" content="Ver informações e ações do cliente" placement="top-start">
                    <i class="el-icon-circle-plus"></i>
                  </el-tooltip>
                </el-button>
                <el-button type="danger" @click="confirmDeletePatient(scope.row.id)" circle>
                  <i class="el-icon-delete"></i>
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
        :fullscreen="true"
        :visible.sync="showPatientModal">
      <h1>Infomações do Paciente</h1>
      <show-patient ref="showPatientModal"/>

      <h1 class="patient-title">Históricos</h1>
      <el-button type="light" @click="openSicknessModal(patient)" plain>Doenças pré-existentes</el-button>
      <el-button type="light" @click="openNurseReportHistory(patient)" plain>Histórico de Enfermagem</el-button>
      <el-button type="light" @click="openDoctorReportHistory(patient)" plain>Histórico Médico</el-button>


      <h1 class="patient-title">Ações</h1>

      <el-button type="success" @click="openNurseReport(patient)" plain>Relatório de Enfermagem</el-button>
      <el-button type="success" @click="openDoctorReport(patient)" plain>Relatório Médico</el-button>
      <el-button type="success" @click="openVitalSignsModal(patient)" plain>Sinais Vitais</el-button>
    </el-dialog>

    <el-dialog
        title="Histórico de Relatório de Enfermagem"
        :visible.sync="showNurseReportHistoryModal"
        width="90%">
      <history-nurse-report ref="nurseReportHistoryModal"/>
    </el-dialog>
    <el-dialog
        title="Histórico de Relatório Médico"
        :visible.sync="showDoctorReportHistoryModal"
        width="90%">
      <history-doctor-report ref="doctorReportHistoryModal"/>
    </el-dialog>
    <el-dialog
        title="Relatório de Enfermagem"
        :visible.sync="showNurseReportModal"
        width="90%">
      <nurse-report ref="nurseReportModal" @submit="showNurseReportModal = false"/>
    </el-dialog>
    <el-dialog
        title="Relatório Médico"
        :visible.sync="showDoctorReportModal"
        width="90%">
      <doctor-report ref="doctorReportModal" @submit="showDoctorReportModal = false"/>
    </el-dialog>
    <el-dialog
        title="Doenças Pré-existentes"
        :visible.sync="showSicknessModal"
        width="90%">
      <history-existent-sickness ref="sicknessModal"/>
    </el-dialog>

    <el-dialog
        title="Sinais Vitais do Paciente"
        :visible.sync="showVitalSignsModal"
        width="90%">
      <vital-signs ref="vitalSignsModal" @submit="showVitalSignsModal = false"/>
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
import NurseReport from "@/components/patient/report/NurseReport.vue";
import HistoryNurseReport from "@/components/patient/report/HistoryNurseReport.vue";
import {VForm} from "@/helpers/VFormType";
import ShowPatient from "@/components/patient/ShowPatient.vue";
import HistoryExistentSickness from "@/components/patient/HistoryExistentSickness.vue";
import VitalSigns from "@/components/patient/VitalSigns.vue";
import DoctorReport from "@/components/patient/report/DoctorReport.vue";
import HistoryDoctorReport from "@/components/patient/report/HistoryDoctorReport.vue";

@Component({
  components: {
    PageTitle,
    NurseReport,
    HistoryNurseReport,
    ShowPatient,
    HistoryExistentSickness,
    VitalSigns,
    DoctorReport,
    HistoryDoctorReport
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
  showNurseReportHistoryModal = false
  showDoctorReportHistoryModal = false
  showSicknessModal = false
  showVitalSignsModal = false

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

    this.$nextTick(() => {
      return this.$refs['showPatientModal'].setInformation(patient)
    })
  }

  async openNurseReport(patient: PatientModel) {
    this.showNurseReportModal = true

    this.$nextTick(() => {
      return this.$refs['nurseReportModal'].setInformation(patient)
    })

  }

  async openDoctorReport(patient: PatientModel) {
    this.showDoctorReportModal = true
    this.$nextTick(() => {
      return this.$refs['doctorReportModal'].setInformation(patient)
    })
  }

  async openNurseReportHistory(patient: PatientModel) {
    this.showNurseReportHistoryModal = true

    this.$nextTick(() => {
      return this.$refs['nurseReportHistoryModal'].setInformation(patient)
    })

  }

  async openDoctorReportHistory(patient: PatientModel) {
    this.showDoctorReportHistoryModal = true

    this.$nextTick(() => {
      return this.$refs['doctorReportHistoryModal'].setInformation(patient)
    })

  }

  async openSicknessModal(patient: PatientModel) {
    this.showSicknessModal = true

    this.$nextTick(() => {
      return this.$refs['sicknessModal'].setInformation(patient)
    })

  }

  async openVitalSignsModal(patient: PatientModel) {
    this.showVitalSignsModal = true
    this.$nextTick(() => {
      return this.$refs['vitalSignsModal'].setInformation(patient)
    })
  }

  confirmDeletePatient(patientId: string | number) {
    this.$confirm('Tem certeza que deseja deletar o Paciente com TODOS os dados e histórico?', 'Atenção', {
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      this.deletePatient(patientId)
    });
  }

  async deletePatient(patientId: string | number) {
    alert('deletar' + patientId)
  }
}
</script>

<style scoped>
.row-main {
  display: flex;
  justify-content: center;
}

.patient-title {
  margin-top: 3rem;
}
</style>