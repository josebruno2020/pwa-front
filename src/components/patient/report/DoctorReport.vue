<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="sickness-form" :model="model" label-width="120px"
             label-position="top">
      <p>Paciente: <strong>{{ patient.name }}</strong></p>
      <el-form-item label="Preencha o relatório para o paciente" prop="sickness">
        <el-input
            type="textarea"
            :rows="4"
            v-model="model.report">
        </el-input>

      </el-form-item>

      <div class="is-flex is-justify-end">
        <el-button :loading="loading" type="success" native-type="submit">Salvar</el-button>
      </div>

    </el-form>
  </main>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {VForm} from "@/helpers/VFormType";
import {NurseReportModel} from "@/models/NurseReportModel";
import {PatientModel} from "@/models/PatientModel";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";

@Component({
  name: 'DoctorReport'
})
export default class DoctorReport extends Vue {
  $refs!: {
    form: VForm
  }
  model: NurseReportModel = new NurseReportModel();
  loading = false
  patient: PatientModel = new PatientModel()

  setInformation(patient: PatientModel) {
    this.patient = patient
  }

  submitForm() {
    if (!this.model.report) {
      return this.$notify.warning({
        title: 'Atenção.',
        message: 'Preencha o relatório'
      })
    }
    this.loading = true;
    return this.save();
  }

  async save() {
    try {
      const {data} = await httpPost(apiRoutes.doctorReport, {...this.model, patient_id: this.patient.id});
      console.log(data)
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Relatório salvo com sucesso!'
      })
      this.$emit('submit')
    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possível salvar as informações.'
      })
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>