<template>
  <main>
    <el-form @submit.native.prevent="submitForm" ref="sickness-form" :model="model" label-width="120px"
             :rules="rules" label-position="top">
      <el-form-item label="Doença" prop="sickness">
        <el-checkbox-group v-model="model.sickness">
          <el-checkbox label="DM"></el-checkbox>
          <el-checkbox label="HAS"></el-checkbox>
          <el-checkbox label="TABAGISTA"></el-checkbox>
          <el-checkbox label="ETILISTA"></el-checkbox>
          <el-checkbox label="DEPENDENTE QUÍMICO"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="Outros" prop="sickness">
        <el-input
            type="textarea"
            :rows="2"
            v-model="model.others">
        </el-input>

      </el-form-item>

      <div class="is-flex is-justify-end">
        <el-button :loading="loading" type="success" native-type="submit">Salvar</el-button>
      </div>

    </el-form>
  </main>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Vue} from "vue-property-decorator";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PreExistentSicknessModel} from "@/models/PreExistentSicknessModel";
import {VForm} from "@/helpers/VFormType";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {existentSicknessRules} from "@/helpers/validation/existent-sickness";


@Component({
  components: {
    PageTitle
  }
})

export default class ExistentSickness extends Vue {
  $refs!: {
    form: VForm
  }
  model: PreExistentSicknessModel = new PreExistentSicknessModel()
  loading = false
  rules = existentSicknessRules
  public patientId: number

  submitForm() {
    if (!this.model.others && !this.model.sickness.length) {
      return this.$notify.warning({
        title: 'Atenção.',
        message: 'Preencha ao menos uma informação.'
      })
    }
    this.loading = true;
    return this.save();
  }

  async save(): Promise<void> {
    console.log(this.patientId)
    try {
      const {data} = await httpPost(apiRoutes.sickness, {...this.model, patient_id: this.patientId});
      console.log(data)
      this.$notify.success({
        title: 'Sucesso',
        message: 'Informações salvas com sucesso!'
      })
      this.$emit('submit')
    } catch (e: any) {
      this.$notify.error({
        title: 'Erro',
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