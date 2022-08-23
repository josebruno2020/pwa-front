<template>
  <main>
    <page-title title="Listagem Pacientes" />
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
              empty-text="Nenhum registro">
            <el-table-column
                prop="name"
                label="Nome">
            </el-table-column>
            <el-table-column
                prop="name_mother"
                label="Nome da Mãe">
            </el-table-column>
            <el-table-column
                align="right">
              <template slot="header">
                <el-input
                    v-model="patientSearch"
                    @input="test"
                    placeholder="Buscar..."
                    size="mini" />
              </template>
              <template slot-scope="scope">
                <el-button @click="showPatient(scope.row)" type="warning" circle>
                  <el-tooltip class="item" effect="dark" content="Ver informações e ações do cliente"
                              placement="top-start">
                    <i class="el-icon-view"></i>
                  </el-tooltip>
                </el-button>

              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="content"
              :current-page="page"
              :page-size="10"
              :pager-count="5"
              layout="prev, pager, next"
              :total="content.total"
              @current-change="changePage">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
        :fullscreen="true"
        :visible.sync="showPatientModal">
      <h1>Infomações do Paciente</h1>
      <show-patient ref="showPatientModal"/>

      <h1 class="patient-title">Históricos</h1>
      <ul class="li-link">
        <li>
          <span class="link blue" @click="openSicknessModal(patient)">Doenças pré-existentes <i
              class="el-icon-view"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openNurseReportHistory(patient)">Histórico de Enfermagem <i
              class="el-icon-view"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openDoctorReportHistory(patient)">Histórico Médico <i
              class="el-icon-view"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openVitalSignsHistoryModal(patient)">Histórico Sinais Vitais <i
              class="el-icon-view"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openPatientChartModal(patient)">Prontuário <i
              class="el-icon-view"></i></span>
        </li>
      </ul>


      <h1 class="patient-title">Ações</h1>

      <ul class="li-link">
        <li>
          <span class="link blue" @click="openNurseReport(patient)">Adicionar Relatório de Enfermagem <i
              class="el-icon-edit"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openDoctorReport(patient)">Adicionar Relatório Médico <i
              class="el-icon-edit"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openVitalSignsModal(patient)">Adicionar Sinais Vitais <i
              class="el-icon-edit"></i></span>
        </li>

        <li>
          <span class="link blue" @click="openChangeStatusModal(patient)">Mudar Status do Paciente <i class="el-icon-edit"></i></span>
        </li>


        <li>
          <span class="link blue">Editar Paciente (a fazer) <i class="el-icon-edit"></i></span>
        </li>

        <li>
          <span class="link red" @click="confirmDeletePatient(patient.id)">Deletar paciente <i
              class="el-icon-delete"></i></span>
        </li>
      </ul>


      <h1 class="patient-title">Notificações</h1>

      <ul>
        <li>A fazer....</li>
      </ul>
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
        title="Histórico de Sinais Vitais"
        :visible.sync="showVitalSignsHistoryModal"
        width="90%">
      <history-vital-signs ref="vitalSignsHistoryModal"/>
    </el-dialog>

    <el-dialog
        title="Prontuário"
        :visible.sync="showPatientChart"
        width="90%">
      <patient-chart ref="patientChartModal"/>
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
        width="90%"
        @close="$refs['vitalSignsModal'].resetForm()">
      <vital-signs ref="vitalSignsModal" @submit="showVitalSignsModal = false"/>
    </el-dialog>

    <el-dialog
        title="Mudar Status do Paciente"
        :visible.sync="showChangeStatusModal"
        width="90%">
      <change-status ref="changeStatusModal" @submit="endChangeStatus()"/>
    </el-dialog>
  </main>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PatientModel} from "@/models/PatientModel";
import {httpDelete, httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import NurseReport from "@/components/patient/report/NurseReport.vue";
import HistoryNurseReport from "@/components/patient/report/HistoryNurseReport.vue";
import {VForm} from "@/helpers/VFormType";
import ShowPatient from "@/components/patient/ShowPatient.vue";
import HistoryExistentSickness from "@/components/patient/HistoryExistentSickness.vue";
import VitalSigns from "@/components/patient/VitalSigns.vue";
import DoctorReport from "@/components/patient/report/DoctorReport.vue";
import HistoryDoctorReport from "@/components/patient/report/HistoryDoctorReport.vue";
import HistoryVitalSigns from "@/components/patient/HistoryVitalSigns.vue";
import {ElLoadingComponent} from "element-ui/types/loading";
import ChangeStatus from "@/components/patient/ChangeStatus.vue";
import PatientChart from "@/components/patient/PatientChart.vue";

@Component({
  components: {
    PageTitle,
    NurseReport,
    HistoryNurseReport,
    ShowPatient,
    HistoryExistentSickness,
    VitalSigns,
    DoctorReport,
    HistoryDoctorReport,
    HistoryVitalSigns,
    ChangeStatus,
    PatientChart
  }
})
export default class ListPatient extends Vue {
  $refs!: {
    form: VForm
  }
  patients: PatientModel[] = []
  content: any = null
  page = 1
  // size = 10

  public patientSearch = ''
  loading = true
  patient: PatientModel = new PatientModel()
  showPatientModal = false
  showNurseReportModal = false
  showDoctorReportModal = false
  showNurseReportHistoryModal = false
  showDoctorReportHistoryModal = false
  showSicknessModal = false
  showVitalSignsModal = false
  showVitalSignsHistoryModal = false
  showChangeStatusModal = false
  showPatientChart = false

  loadingFull: ElLoadingComponent

  created() {
    this.fetchPatients();
  }

  private async fetchPatients() {
    this.loading = true
    try {
      const {data: {content}} = await httpGet(apiRoutes.patients, { page: this.page });
      this.patients = content.data;
      this.content = content
    } catch (e: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar os pacientes.'
      })
    } finally {
      this.loading = false;
    }
  }

  changePage(newPage) {
    this.page = newPage
    return this.fetchPatients();
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

  async openChangeStatusModal(patient: PatientModel) {
    this.showChangeStatusModal = true
    this.$nextTick(() => {
      return this.$refs['changeStatusModal'].setInformation(patient)
    })
  }

  endChangeStatus() {
    this.showChangeStatusModal = false
    this.showPatientModal = false
    return this.fetchPatients();
  }

  async openVitalSignsHistoryModal(patient: PatientModel) {
    this.showVitalSignsHistoryModal = true
    this.$nextTick(() => {
      return this.$refs['vitalSignsHistoryModal'].setInformation(patient)
    })
  }

  async openPatientChartModal(patient: PatientModel) {
    this.showPatientChart = true
    this.$nextTick(() => {
      return this.$refs['patientChartModal'].setInformation(patient)
    })
  }


  confirmDeletePatient(patientId: string | number) {
    this.$confirm('Tem certeza que deseja deletar o Paciente com TODOS os dados e histórico?', 'Atenção', {
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      dangerouslyUseHTMLString: true,
      type: 'warning'
    }).then(() => {
      this.openFullScreenLoading()
      this.deletePatient(patientId)
    });
  }

  async deletePatient(patientId: string | number) {
    try {
      await httpDelete(`${apiRoutes.patients}/${patientId}`);
      this.$notify.success({
        title: "Sucesso!",
        message: 'Paciente excluido com sucesso!'
      })
      await this.fetchPatients()
      this.showPatientModal = false;
    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível deletar o paciente.'
      })
    } finally {
      this.loadingFull.close();
    }
  }


  openFullScreenLoading() {
    this.loadingFull = this.$loading({
      lock: true,
      text: 'Carregando',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.7)'
    });
  }
}
</script>

<style scoped>

h1 {
  margin-top: 0;
}

.row-main {
  display: flex;
  justify-content: center;
}

.patient-title {
  margin-top: 3rem;
}

.li-link li {
  margin-bottom: 1rem;
}

.link {
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;

  transition: all .2s;
}

.link:hover {
  opacity: .6;
}

.red {
  color: #fd2727;
}

.blue {
  color: #3737fa;
}
</style>