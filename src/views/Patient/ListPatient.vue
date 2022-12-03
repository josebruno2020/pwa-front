<template>
  <main>
    <page-title title="Listagem Pacientes"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="22">
        <div class="row-action">
          <router-link :to="{name: 'createPatient'}" class="router-button">
            <el-button line-origin="left" plain type="success">Cadastrar novo paciente</el-button>
          </router-link>
        </div>
        <el-row class="row-search">
          <el-input placeholder="Buscar cliente...." v-model="patientSearch" @keydown.native.enter="fetchPatients">
            <el-select  slot="prepend" v-model="patientStatus">
              <el-option :value="1" label="EM OBSERVAÇÃO"/>
              <el-option :value="4" label="EM ALTA"/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="fetchPatients"></el-button>
          </el-input>

        </el-row>
        <el-card shadow="hover">
          <el-table
              v-loading="loading"
              :data="patients"
              style="width: 100%"
              empty-text="Nenhum registro"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="name"
                label="Nome">
            </el-table-column>
            <el-table-column
                prop="name_mother"
                label="Nome da Mãe">
            </el-table-column>
            <el-table-column
                prop="status"
                label="Status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">EM OBSERVAÇÃO</span>
                <span v-if="scope.row.status === 4">ALTA</span>
              </template>
            </el-table-column>
            <el-table-column
                align="right"
                label="Informações">

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
          <span class="link blue" @click="openNurseEvolutionHistory(patient)">Histórico de Evolução de Enfermagem <i
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
          <span class="link blue" @click="openNurseEvolutionReport(patient)">Adicionar Evolução de Enfermagem <i
              class="el-icon-edit"></i></span>
        </li>
        <li>
          <span class="link blue" @click="openVitalSignsModal(patient)">Adicionar Sinais Vitais <i
              class="el-icon-edit"></i></span>
        </li>

        <li>
          <span class="link blue" @click="openChangeStatusModal(patient)">Mudar Status do Paciente <i
              class="el-icon-edit"></i></span>
        </li>

        <li>
          <span class="link blue" @click="openPatientEditModal(patient)">Editar Paciente<i class="el-icon-edit"></i></span>
        </li>

        <li>
          <span class="link red" @click="confirmDeletePatient(patient.id)">Deletar paciente <i
              class="el-icon-delete"></i></span>
        </li>
      </ul>


      <h1 class="patient-title">Notificações</h1>

      <p class="subtitle">Violência Interpessoal/Autoprovocada</p>
      <ul class="li-link">
        <li>
          <span @click="openAutoPersonal(patient)" class="link blue">Cadastro</span>
        </li>

        <el-table
            v-loading="autoPersonalLoading"
            :data="autoPersonalNotifications"
            style="width: 100%"
            empty-text="Nenhum registro">
          <el-table-column
              prop="id"
              label="#">
          </el-table-column>
          <el-table-column
              prop="created_at"
              label="Data de Criação">

            <template slot-scope="scope">
              {{new Date(scope.row.created_at).toLocaleString()}}
            </template>
          </el-table-column>

          <el-table-column
              align="right"
              label="Ações">

            <template slot-scope="scope">
              <el-button @click="printAutoPersonal(scope.row.id)" type="success" circle>
                <el-tooltip class="item" effect="dark" content="Gerar PDF Notificação"
                            placement="top-start">
                  <i class="el-icon-printer"></i>
                </el-tooltip>
              </el-button>

              <el-button @click="openAutoPersonalEdit(scope.row.id)" type="warning" circle>
                <el-tooltip class="item" effect="dark" content="Editar Notificação"
                            placement="top-start">
                  <i class="el-icon-edit"></i>
                </el-tooltip>
              </el-button>

              <el-button :disabled="loggedUser.user_type !== 1" @click="confirmDeleteAutoPersonal(scope.row.id)" type="danger" circle>
                <el-tooltip class="item" effect="dark" content="Excluir Notificação"
                            placement="top-start">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </el-button>

            </template>
          </el-table-column>
        </el-table>

      </ul>

      <p class="subtitle">Intoxicação Exógena</p>
      <ul class="li-link">
        <li>
          <span @click="openIntoxication(patient)" class="link blue">Cadastro</span>
        </li>

        <el-table
            v-loading="intoxicationLoading"
            :data="intoxicationNotifications"
            style="width: 100%"
            empty-text="Nenhum registro">
          <el-table-column
              prop="id"
              label="#">
          </el-table-column>
          <el-table-column
              prop="created_at"
              label="Data de Criação">

            <template slot-scope="scope">
              {{new Date(scope.row.created_at).toLocaleString()}}
            </template>
          </el-table-column>

          <el-table-column
              align="right"
              label="Ações">

            <template slot-scope="scope">
              <el-button @click="printIntoxication(scope.row.id)" type="success" circle>
                <el-tooltip class="item" effect="dark" content="Gerar PDF Notificação"
                            placement="top-start">
                  <i class="el-icon-printer"></i>
                </el-tooltip>
              </el-button>

              <el-button @click="openIntoxicationEdit(scope.row.id)" type="warning" circle>
                <el-tooltip class="item" effect="dark" content="Editar Notificação"
                            placement="top-start">
                  <i class="el-icon-edit"></i>
                </el-tooltip>
              </el-button>

              <el-button :disabled="loggedUser.user_type !== 1" @click="confirmDeleteAutoPersonal(scope.row.id, false)" type="danger" circle>
                <el-tooltip class="item" effect="dark" content="Excluir Notificação"
                            placement="top-start">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </el-button>

            </template>
          </el-table-column>
        </el-table>
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
        title="Histórico de Evolução de Enfermagem"
        :visible.sync="showNurseEvolutionHistoryModal"
        width="90%">
      <history-nurse-evolution-report ref="nurseEvolutionHistoryModal"/>
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
        title="Relatório Evolução de Enfermagem"
        :visible.sync="showNurseEvolution"
        width="90%">
      <nurse-evolution ref="nurseEvolutionModal" @submit="showNurseEvolution = false"/>
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

    <el-dialog
        title="Editar Paciente"
        :visible.sync="showPatientEdit"
        width="90%">
      <edit-patient ref="patientEdit" @submit="closePatientEdit($event)"/>
    </el-dialog>


    <el-dialog
        title="Violência Interpessoal/Autoprovocada"
        :visible.sync="showNotificationAutoPersonal"
        :fullscreen="true">
      <auto-personal ref="autoPersonal" @close="showNotificationAutoPersonal = false; fetchAutoPersonalByPatient(patient)"/>
    </el-dialog>

    <el-dialog
        title="Intoxicação Exógena"
        :visible.sync="showNotificationIntoxication"
        :fullscreen="true">
      <intoxication ref="intoxication" @close="showNotificationIntoxication = false; fetchIntoxicationByPatient(patient)"/>
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
import AutoPersonal from "@/components/notifications/AutoPersonal.vue";
import Intoxication from "@/components/notifications/Intoxication.vue";
import EditPatient from "@/components/patient/EditPatient.vue";
import axios from "axios";
import {UserModel} from "@/models/UserModel";
import HistoryNurseEvolutionReport from "@/components/patient/report/HistoryNurseEvolutionReport.vue";
import NurseEvolution from "@/components/patient/report/NurseEvolution.vue";


@Component({
  components: {
    NurseEvolution,
    HistoryNurseEvolutionReport,
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
    PatientChart,
    AutoPersonal,
    Intoxication,
    EditPatient
  }
})
export default class ListPatient extends Vue {
  $refs!: {
    form: VForm
  }
  loggedUser: UserModel

  patients: PatientModel[] = []
  content: any = null
  page = 1
  patientStatus = 1

  public patientSearch = ''
  loading = true
  patient: PatientModel = new PatientModel()
  showPatientModal = false
  showNurseReportModal = false
  showDoctorReportModal = false
  showNurseReportHistoryModal = false
  showDoctorReportHistoryModal = false
  showNurseEvolutionHistoryModal = false
  showSicknessModal = false
  showVitalSignsModal = false
  showVitalSignsHistoryModal = false
  showChangeStatusModal = false
  showPatientChart = false
  showPatientEdit = false

  showNotificationAutoPersonal = false
  showNotificationIntoxication = false

  loadingFull: ElLoadingComponent

  autoPersonalNotifications: any[] = []
  autoPersonalLoading = false

  intoxicationNotifications: any[] = []
  intoxicationLoading = false

  showNurseEvolution = false

  created() {
    this.loggedUser = this.$store.state.user
    this.fetchPatients();
  }

  private async fetchPatients() {
    this.loading = true
    try {
      const {data: {content}} = await httpGet(apiRoutes.patients, {
        page: this.page,
        search: this.patientSearch,
        status: this.patientStatus
      });
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

  tableRowClassName({row, rowIndex}) {
    if(Number(rowIndex)/2 == 0) {
      return 'warning-row'
    }
    return ''
  }

  showPatient(patient: PatientModel) {
    this.showPatientModal = true
    this.patient = patient

    this.$nextTick(() => {
      return this.$refs['showPatientModal'].setInformation(patient)
    })

    this.patient = patient

    this.fetchAutoPersonalByPatient(patient)
    this.fetchIntoxicationByPatient(patient)
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

  async openNurseEvolutionReport(patient: PatientModel) {
    this.showNurseEvolution = true
    this.$nextTick(() => {
      return this.$refs['nurseEvolutionModal'].setInformation(patient)
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

  async openNurseEvolutionHistory(patient: PatientModel) {
    this.showNurseEvolutionHistoryModal = true

    this.$nextTick(() => {
      return this.$refs['nurseEvolutionHistoryModal'].setInformation(patient)
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

  async openPatientEditModal(patient: PatientModel) {
    this.showPatientEdit = true
    let patientCopy = new PatientModel()
    Object.assign(patientCopy, patient)
    this.$nextTick(() => {
      return this.$refs['patientEdit'].setInformation(patientCopy)
    })
  }

  closePatientEdit(newPatient: PatientModel) {
    this.patient = newPatient
    this.showPatientEdit = false
    this.$nextTick(() => {
      return this.$refs['showPatientModal'].setInformation(newPatient)
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


  async openAutoPersonal(patient: PatientModel) {
    this.showNotificationAutoPersonal = true
    this.$nextTick(() => {
      return this.$refs['autoPersonal'].setInformation(patient)
    })

  }

  async fetchAutoPersonalByPatient(patient: PatientModel) {
    this.autoPersonalLoading = true
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationAutoPersonal}/${patient.id}`)
      this.autoPersonalNotifications = content

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar as notificações do paciente'
      })
    } finally {
      this.autoPersonalLoading = false
    }
  }

  async openAutoPersonalEdit(id: number) {
    this.openFullScreenLoading()
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationAutoPersonalShow}/${id}`)

      this.showNotificationAutoPersonal = true
      this.$nextTick(() => {
        return this.$refs['autoPersonal'].setInformationToEdit(this.patient, content)
      })
    } catch (err) {
     this.$notify.error({
       title: 'Erro',
       message: 'Notificação não encontrada'
     })
    } finally {
      this.loadingFull.close()
    }
  }

  confirmDeleteAutoPersonal(id: number, isPersonal = true) {
    this.$confirm('Tem certeza que deseja excluir a notificação selecionada?', 'Excluir', {
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      if (isPersonal) return this.deleteAutoPersonal(id)
      return this.deleteIntoxication(id)
    })
  }

  async deleteAutoPersonal(id: number) {
    this.openFullScreenLoading()
    try {
      await httpDelete(`${apiRoutes.notificationAutoPersonal}/${id}`);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Notifcação excluída com sucesso'
      })
      await this.fetchAutoPersonalByPatient(this.patient)
    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title:'Erro',
        message: 'Não foi possível deletar a notificação.'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  async openIntoxication(patient: PatientModel) {
    this.showNotificationIntoxication = true
    this.$nextTick(() => {
      return this.$refs['intoxication'].setInformation(patient)
    })
  }

  async fetchIntoxicationByPatient(patient: PatientModel) {
    this.intoxicationLoading = true
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationIntoxication}/${patient.id}`)
      this.intoxicationNotifications = content

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar as notificações do paciente'
      })
    } finally {
      this.intoxicationLoading = false
    }
  }

  async openIntoxicationEdit(id: number) {
    this.openFullScreenLoading()
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationIntoxicationShow}/${id}`)

      this.showNotificationIntoxication = true
      this.$nextTick(() => {
        return this.$refs['intoxication'].setInformationToEdit(this.patient, content)
      })
    } catch (err) {
      this.$notify.error({
        title: 'Erro',
        message: 'Notificação não encontrada'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  async deleteIntoxication(id: number) {
    this.openFullScreenLoading()
    try {
      await httpDelete(`${apiRoutes.notificationIntoxication}/${id}`);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Notifcação excluída com sucesso'
      })
      await this.fetchIntoxicationByPatient(this.patient)
    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title:'Erro',
        message: 'Não foi possível deletar a notificação.'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  async printAutoPersonal(id: number) {
    this.openFullScreenLoading()
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationAutoPersonalShow}/${id}`);


      const {data} = await axios.post(`${process.env.VUE_APP_API_NODE_URL}/reports/auto-personal`, content, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        }
      })
      const fileName = `${this.patient.name.split(' ')[0]}-${new Date().getTime()}.pdf`
      this.downloadFile(data, fileName)

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível imprimir a notificação.'
      })
    } finally {
      this.loadingFull.close()
    }
  }


  async printIntoxication(id: number) {
    this.openFullScreenLoading()
    try {
      const {data: {content}} = await httpGet(`${apiRoutes.notificationIntoxicationShow}/${id}`);

      const {data} = await axios.post(`${process.env.VUE_APP_API_NODE_URL}/reports/intoxication`, content, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        }
      })
      const fileName = `${this.patient.name.split(' ')[0]}-${new Date().getTime()}.pdf`
      this.downloadFile(data, fileName)

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível imprimir a notificação.'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  private downloadFile(data, fileName: string) {

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
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

.row-search {
  margin-top: 1rem;
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

.subtitle {
  font-weight: bold;
  margin: 1rem 0;
}

.disabled-action {
  cursor: no-drop;
  pointer-events: none;
  opacity: 0.4;

}

.el-select {
  width: 180px;
}

</style>