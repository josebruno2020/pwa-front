<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="status-form" :model="model" label-width="120px"
             :rules="rules" label-position="top">
      <el-form-item label="Destino" prop="status_to">
        <el-radio v-model="model.status_to" :label="patientStatusEnum.INTUBATED">
          ENTUBADO E MANTIDO EM VENTILAÇÃO MECÂNICA
        </el-radio>
        <el-radio v-model="model.status_to" :label="patientStatusEnum.HOSPITAL">
          ENCAMINHADA AO HOSPITAL VIA SAMU
        </el-radio>
        <el-radio v-model="model.status_to" :label="patientStatusEnum.HOME">
          ALTA MÉDICA PARA DOMICÍLIO
        </el-radio>
      </el-form-item>

      <el-form-item label="Acompanhante" prop="companion">
        <el-input v-model="model.companion"></el-input>
      </el-form-item>

      <el-form-item label="Parentesco" prop="relationship">
        <el-input v-model="model.relationship"></el-input>
      </el-form-item>

      <el-form-item label="Observação" prop="sickness">
        <el-input
            type="textarea"
            :rows="2"
            v-model="model.obs">
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
import {PatientModel} from "@/models/PatientModel";
import PatientStatusModel from "@/models/PatientStatusModel";
import {changeStatusRules} from "@/helpers/validation/change-status";
import {VForm} from "@/helpers/VFormType";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {PatientStatusEnum} from "@/enums/PatientStatusEnum";

@Component({
  name: 'ChangeStatus'
})
export default class ChangeStatus extends Vue {
  $refs!: {
    form: VForm
  }
  loading = false
  patient: PatientModel = new PatientModel()
  model: PatientStatusModel = new PatientStatusModel()
  rules = changeStatusRules
  patientStatusEnum = PatientStatusEnum

  setInformation(patient: PatientModel) {
    this.model = new PatientStatusModel()
    this.patient = patient
    this.model.status_from = this.patient.status

    console.log(this.patient)
  }

  async submitForm() {
    await this.$refs['status-form'].validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        return this.save();
      }
    });
  }

  async save() {
    try {
      const {data} = await httpPost(apiRoutes.changeStatus, {...this.model, patient_id: this.patient.id});

      console.log(data)

      this.$notify.success({
        title: 'Sucesso!',
        message: 'Staus do paciente alterado com sucesso!'
      })
      this.$emit('submit')

    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível mudar o status do paciente.'
      })
    }
  }
}
</script>

<style scoped>

</style>