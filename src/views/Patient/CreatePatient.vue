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

          <el-form @submit.native.prevent="submitForm" ref="patient-form" :model="patient"  label-width="120px" :rules="rules" label-position="top">
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

            <el-form-item label="Estado de origem" prop="from_state">
              <el-input v-model="patient.from_state"></el-input>
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

            <el-form-item label="Complemento" >
              <el-input v-model="patient.complement"></el-input>
            </el-form-item>

            <el-form-item label="Bairro" prop="neighborhood">
              <el-input v-model="patient.neighborhood"></el-input>
            </el-form-item>

            <el-form-item label="Cidade" prop="city">
              <el-input v-model="patient.city"></el-input>
            </el-form-item>

            <el-form-item label="Estado" prop="state">
              <el-input v-model="patient.state"></el-input>
            </el-form-item>



            <div class="footer">
              <el-button  type="success" native-type="submit">Salvar</el-button>
            </div>

          </el-form>



        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {Patient} from "@/models/Patient";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {VForm} from "@/helpers/VFormType";
import {createPatientRules} from "@/helpers/validation/create-patient";

@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class CreatePatient extends Vue {
  $refs!: {
    form: VForm
  }
  rules = createPatientRules
  patient: Patient = new Patient();
  loading = false

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
      const {data} = await httpPost(apiRoutes.patients, this.patient);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Paciente cadastrado com sucesso.'
      });
      console.log(data)
    }catch (err: any) {
      this.$notify.error({
        title: 'Sucesso!',
        message: 'Não foi possivel cadastrar o paciente'
      });
    } finally {
      this.loading = false;
    }
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