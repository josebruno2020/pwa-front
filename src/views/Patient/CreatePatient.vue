<template>
  <main>
    <page-title title="Cadastro de paciente"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card shadow="hover">
          <div slot="header">
            <h5>
              Informações básicas
            </h5>
          </div>

          <el-form @submit.native.prevent="submitForm" ref="patient-form" :model="patient" label-width="120px"
                   :rules="rules" label-position="top">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="patient.name"></el-input>
            </el-form-item>

            <el-form-item label="Data de Nascimento" prop="birthdate">
              <el-input type="date" v-model="patient.birthdate"></el-input>
            </el-form-item>

            <el-form-item label="Nome da Mãe" prop="name_mother">
              <el-input v-model="patient.name_mother"></el-input>
            </el-form-item>

            <el-form-item label="CNS" prop="cns">
              <el-input v-model="patient.cns"></el-input>
            </el-form-item>

            <el-form-item label="CPF" prop="cpf">
              <el-input v-model="patient.cpf"></el-input>
            </el-form-item>

            <el-form-item label="RG" prop="rg">
              <el-input v-model="patient.rg"></el-input>
            </el-form-item>

            <el-form-item label="Cidade de origem" prop="from_city">
              <el-input v-model="patient.from_city"></el-input>
            </el-form-item>

            <el-form-item label="Estado" prop="from_state">
              <el-select v-model="patient.from_state" clearable placeholder="selecione..." filterable>
                <el-option
                    v-for="state in states"
                    :key="state.value"
                    :label="state.label"
                    :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Telefone" prop="phone_number">
              <el-input v-model="patient.phone_number"></el-input>
            </el-form-item>

            <el-form-item label="Celular" prop="mobile_number">
              <el-input v-model="patient.mobile_number"></el-input>
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
      <existent-sickness ref="existentModal" @submit="endRegister" />
    </el-dialog>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component, {mixins} from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PatientModel} from "@/models/PatientModel";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {VForm} from "@/helpers/VFormType";
import {createPatientRules} from "@/helpers/validation/create-patient";
import {states} from "@/helpers/form/states";
import ExistentSickness from "@/views/Patient/ExistentSickness.vue";

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
  rules = createPatientRules
  patient: PatientModel = new PatientModel();
  loading = false
  states = states
  existentSicknessModal = false

  async submitForm() {
    await this.$refs['patient-form'].validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        return this.savePatient();
      }
    });
  }

  async savePatient() {
    try {
      const validator: boolean = await this.$validator.validateAll();
      if (!validator) return;
      const {data: {content}} = await httpPost(apiRoutes.patients, this.patient);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Paciente cadastrado com sucesso.'
      });
      console.log(content)
      this.existentSicknessModal = true
      this.$nextTick(() => {
        return this.$refs['existentModal'].patientId = content.id;
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
    this.$router.push({name: 'ListPatient'})
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