<template>
  <main>
    <page-title title="Cadastro de paciente"/>

    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-steps :active="active" finish-status="success">
          <el-step title="Escolher paciente"></el-step>
          <el-step title="Cadastro paciente"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row v-if="active == 0" :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card shadow="hover">
          <div slot="header">
            <h5>
              Procurar Paciente
            </h5>
          </div>
          <p>Verifique se o paciente já existe nos registros antes de continuar.</p>
          <el-form @submit.native.prevent="searchPatient" :inline="true" ref="patient-form" label-width="120px">

            <el-form-item label="Campo de busca">
              <el-input v-model="search" placeholder="Buscar pelo nome ou nome da mãe..."></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" plain :loading="loading" native-type="submit">Procurar</el-button>
            </el-form-item>
          </el-form>

          <el-table
              v-if="patientsSearched.length"
              v-loading="loading"
              :data="patientsSearched"
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
            <el-table-column
                prop="cpf"
                label="CPF">
            </el-table-column>
            <el-table-column
                label="Ação">
              <template slot-scope="scope">
                <el-button type="success" plain circle>
                  <el-tooltip class="item" effect="dark" content="Escolher paciente e continuar"
                              placement="top-start">
                    <i class="el-icon-check" @click="choosePatient(scope.row)"></i>
                  </el-tooltip>
                </el-button>

              </template>
            </el-table-column>
          </el-table>

          <div class="footer">
            <el-button type="success" @click="confirmContinue()" :loading="loading" native-type="button">Continuar
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="active == 1" :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card shadow="hover">
          <div slot="header">
            <h5>
              Informações básicas
            </h5>
          </div>

          <p v-if="patientChoosed">Por ter escolhido um paciente já existente, algumas informações estarão desabilitadas
            :)</p>

          <el-form @submit.native.prevent="submitForm" ref="patient-form" :model="patient" label-width="120px"
                   :rules="rules" label-position="top">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="patient.name"></el-input>
            </el-form-item>

            <el-form-item label="Data de Nascimento" prop="birthdate">
              <el-input type="date" v-model="patient.birthdate" :disabled="patientChoosed"></el-input>
            </el-form-item>

            <el-form-item label="Nome da Mãe" prop="name_mother">
              <el-input v-model="patient.name_mother"></el-input>
            </el-form-item>

            <el-form-item label="CNS" prop="cns">
              <el-input v-model="patient.cns"></el-input>
            </el-form-item>

            <el-form-item label="CPF" prop="cpf">
              <el-input v-mask="'###.###.###-##'" v-model="patient.cpf"
                        :disabled="patientChoosed"></el-input>
            </el-form-item>

            <el-form-item label="RG" prop="rg">
              <el-input v-mask="'##.###.###-#'" v-model="patient.rg"></el-input>
            </el-form-item>

            <el-form-item label="Cidade de origem" prop="from_city">
              <el-input v-model="patient.from_city" :disabled="patientChoosed"></el-input>
            </el-form-item>

            <el-form-item label="Estado" prop="from_state">
              <el-select v-model="patient.from_state" clearable placeholder="selecione..." filterable
                         :disabled="patientChoosed">
                <el-option
                    v-for="state in states"
                    :key="state.value"
                    :label="state.label"
                    :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Telefone" prop="phone_number">
              <el-input v-mask="'(##) #####-####'" v-model="patient.phone_number"></el-input>
            </el-form-item>

            <el-form-item label="Celular" prop="mobile_number">
              <el-input v-mask="'(##) #####-####'" v-model="patient.mobile_number"></el-input>
            </el-form-item>

            <div>
              <h4 class="subtitle">
                Informações de Endereço
              </h4>
            </div>
            <el-form-item label="Rua" prop="street">
              <el-input v-model="patient.street"></el-input>
            </el-form-item>

            <el-form-item label="Número" prop="number">
              <el-input v-model="patient.number"></el-input>
            </el-form-item>

            <el-form-item label="Complemento">
              <el-input v-model="patient.complement"></el-input>
            </el-form-item>

            <el-form-item label="Bairro" prop="neighborhood">
              <el-input v-model="patient.neighborhood"></el-input>
            </el-form-item>

            <el-form-item label="Cidade" prop="city">
              <el-input v-model="patient.city"></el-input>
            </el-form-item>

            <el-form-item label="Estado" prop="state">
              <el-select v-model="patient.state" clearable placeholder="selecione..." filterable>
                <el-option
                    v-for="state in states"
                    :key="state.value"
                    :label="state.label"
                    :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="footer">
              <el-button type="light" @click="back" :loading="loading" native-type="button">Voltar</el-button>
              <el-button type="success" :loading="loading" native-type="submit">Salvar</el-button>
            </div>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
        title="Doenças Pré-existentes"
        :visible.sync="existentSicknessModal"
        width="90%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false">
      <existent-sickness ref="existentModal" @submit="endRegister"/>
    </el-dialog>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component, {mixins} from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PatientModel} from "@/models/PatientModel";
import {httpGet, httpPost, httpPut} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {VForm} from "@/helpers/VFormType";
import {createPatientRules} from "@/helpers/validation/create-patient";
import {states} from "@/helpers/form/states";
import ExistentSickness from "@/components/patient/ExistentSickness.vue";
import StringHelper from "@/helpers/string/string-helper";

@Component({
  components: {
    PageTitle,
    ExistentSickness
  }
})

export default class CreatePatient extends Vue {
  $refs!: {
    form: VForm,
  }
  active = 0
  search = ''
  patientsSearched: PatientModel[] = []
  patientChoosed = false

  rules = createPatientRules
  patient: PatientModel = new PatientModel();
  loading = false
  states = states
  existentSicknessModal = false

  async searchPatient() {
    this.loading = true
    try {
      const {data} = await httpGet(apiRoutes.patients, {search: this.search});
      console.log(data)
      this.patientsSearched = data.content
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel mudar os pacientes.'
      });
    } finally {
      this.loading = false
    }
  }

  choosePatient(patient: PatientModel) {
    this.patient = patient
    this.next()
    this.patientChoosed = true
    this.$notify.success({
      title: 'Sucesso!',
      message: 'Paciente escolhido com sucesso!'
    });
  }

  async submitForm() {
    console.log(this.patient)
    await this.$refs['patient-form'].validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        return this.savePatient();
      }
    });
  }

  removeMaskFromModel() {
    this.patient.phone_number = StringHelper.onlyNumbers(this.patient.phone_number)
    this.patient.mobile_number = StringHelper.onlyNumbers(this.patient.mobile_number)
    this.patient.cpf = StringHelper.onlyNumbers(this.patient.cpf)
    this.patient.rg = StringHelper.onlyNumbers(this.patient.rg)
  }


  async savePatient() {
    try {
      this.removeMaskFromModel();
      let response: PatientModel;
      if (!this.patientChoosed) {
        const {data: {content}} = await httpPost(apiRoutes.patients, this.patient);
        response = content
      } else {
        const {data: {content}} = await httpPut(`${apiRoutes.patients}/${this.patient.id}`, {
          ...this.patient,
          is_choosed: true
        });
        response = content
      }
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Paciente cadastrado com sucesso.'
      });
      this.existentSicknessModal = true
      this.$nextTick(() => {
        return this.$refs['existentModal'].patientId = response.id;
      })

    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel cadastrar o paciente'
      });
    } finally {
      this.loading = false;
    }
  }

  endRegister() {
    this.existentSicknessModal = false
    this.$router.push({name: 'listPatient'})
  }

  back() {
    this.active--;
    this.patient = new PatientModel();
  }

  confirmContinue() {
    this.$confirm('Deseja continuar o cadastro sem escolher um paciente?', 'Atenção', {
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      type: 'info'
    }).then(() => {
      this.next();
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Operação cancelada.'
      });
    });
  }

  next() {
    if (this.active++ > 2) this.active = 0;
  }
}
</script>

<style lang="sass">
.row-main
  width: 100vw
  display: flex
  justify-content: center
  margin: 0 !important

.el-card
  margin-top: .5rem

label
  padding-bottom: 0 !important
  width: auto

.footer
  display: flex
  justify-content: center
</style>