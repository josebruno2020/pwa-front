<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="vital-form" :model="model" label-width="120px"
             label-position="top" :rules="rules">
      <el-form-item label="Pressão arterial" prop="blood_pressure_first">
        <div class="input-flex">
          <el-input v-model="model.blood_pressure_first">
            <template slot="append">X</template>
          </el-input>
          <el-input v-model="model.blood_pressure_second">
            <template slot="append">mmHg</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item label="Frequência Cardíaca" prop="heart_pressure">
        <el-input v-model="model.heart_pressure">
          <template slot="append">bpm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Frequência Respiratória" prop="respiratory_frequency">
        <el-input v-model="model.respiratory_frequency">
          <template slot="append">rpm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Temperatura axiliar" prop="axiliary_temperature">
        <el-input v-model="model.axiliary_temperature">
          <template slot="append">C°</template>
        </el-input>
      </el-form-item>

      <el-form-item label="SapO²" prop="sap">
        <el-input v-model="model.sap">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Glicemia capilar" prop="capillary_blood_glucose">
        <el-input v-model="model.capillary_blood_glucose">
          <template slot="append">mg/dl</template>
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
import {VitalSignsModel} from "@/models/VitalSignsModel";
import {VForm} from "@/helpers/VFormType";
import {vitalSignsRules} from "@/helpers/validation/vital-signs";
import { apiRoutes } from "@/services/apiRoutes";
import { httpPost } from "@/services/http";

@Component({
  name: 'VitalSigns'
})
export default class VitalSigns extends Vue {
  $refs!: {
    form: VForm
  }
  loading = false
  patient: PatientModel = new PatientModel()
  model: VitalSignsModel = new VitalSignsModel()
  rules = vitalSignsRules

  setInformation(patient: PatientModel) {
    this.patient = patient
  }

  async submitForm() {
    await this.$refs['vital-form'].validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        return this.save();
      }
    });
  }

  async save() {
    const blood_pressure = `${this.model.blood_pressure_first},${this.model.blood_pressure_second}`
    try {
      const { data } = await httpPost(apiRoutes.vitalSign, {
        ...this.model,
        "patient_id": this.patient.id,
        "blood_pressure": blood_pressure
      })
      console.log(data)
      this.$notify.error({
        title: 'Sucesso!',
        message: 'Sinais vitais salvos com sucesso.'
      })

      this.$emit('submit')
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel salvar os sinais vitais.'
      })
    } finally {
      this.loading = false
    }
    console.log('salvar')
  }
}
</script>

<style scoped>
.input-flex {
  display: flex;
  justify-content: space-between;
}
</style>