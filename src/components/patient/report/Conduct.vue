<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="sickness-form" :model="model" label-width="120px"
             label-position="top">
      <p>Paciente: <strong>{{ patient.name }}</strong></p>
      <div v-if="user.user_type">
        <el-form-item label="Preencha a conduta para o paciente" prop="sickness"
                      v-if="user.user_type == 1 || user.user_type == 4">

          <el-input

              type="textarea"
              :rows="4"
              v-model="model.conduct">
          </el-input>
        </el-form-item>
        <p v-else>{{ model.conduct }}</p>
      </div>


      <div class="is-flex is-justify-end" v-if="user.user_type">
        <el-button :loading="loading" type="success" native-type="submit" :disabled="user.user_type != 1 && user.user_type != 4">Salvar</el-button>
      </div>

    </el-form>
  </main>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {VForm} from "@/helpers/VFormType";
import {NurseReportModel} from "@/models/NurseReportModel";
import {PatientModel} from "@/models/PatientModel";
import {httpGet, httpPost, httpPut} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {ConductModel} from "@/models/ConductModel";
import store from "@/store";

@Component({
  name: 'Conduct'
})
export default class DoctorReport extends Vue {
  $refs!: {
    form: VForm
  }
  model: ConductModel = new ConductModel();
  loading = false
  patient: PatientModel = new PatientModel()

  hasConduct = false
  user: null | object


  async setInformation(patient: PatientModel) {
    this.user = store.state.user
    this.patient = patient
    try {
      this.loading = true
      const {data} = await httpGet(`${apiRoutes.conduct}/${this.patient.id}`)
      if (data.content.length > 0) {
        this.hasConduct = true
        this.model.conduct = data.content[data.constructor.length - 1].conduct

        console.log(this.model)
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      this.loading = false;
    }
  }

  submitForm() {
    if (!this.model.conduct) {
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
      await httpPost(apiRoutes.conduct, {...this.model, patient_id: this.patient.id});
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Conduta salva com sucesso!'
      })
      this.model = new ConductModel()
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


  async update() {
    this.loading = true
    try {
      await httpPut(`${apiRoutes.conduct}/${this.model.id}`, {...this.model})
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Conduta salva com sucesso!'
      })
    } catch (err: any) {
      console.log(err)
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possível salvar as informações.'
      })
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>