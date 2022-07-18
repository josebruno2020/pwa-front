<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="sickness-form" :model="model" label-width="120px"
             label-position="top">
<!--      <p>Paciente: <strong>{{ patientName }}</strong></p>-->
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

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {NurseReportModel} from "@/models/NurseReportModel";
import {VForm} from "@/helpers/VFormType";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {PatientModel} from "@/models/PatientModel";

@Component({
  components: {
    PageTitle
  }
})
export default class NurseReport extends Vue {
  $refs!: {
    form: VForm
  }
  model: NurseReportModel = new NurseReportModel();
  loading = false
  patientId: string|number
  patientName: string

  setInformation(patient: PatientModel) {
    this.patientId = patient.id;
    this.patientName = patient.name
  }

  submitForm() {
    console.log(this.patientId)
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
      const {data} = await httpPost(apiRoutes.nurseReport, {...this.model, patient_id: this.patientId});
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