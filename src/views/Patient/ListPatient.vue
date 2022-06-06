<template>
  <main>
    <page-title title="Pacientes Cadastrados"></page-title>
    <el-row :gutter="20" class="row-main">
      <el-col :span="22">
        <div class="row-action">
          <router-link :to="{name: 'createPatient'}" class="router-button">
            <el-button line-origin="left" plain type="success">Cadastrar novo paciente</el-button>
          </router-link>
        </div>
        <el-card shadow="hover">
          <el-table
              v-loading="loading"
              :data="patients"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="Nome">
            </el-table-column>
            <el-table-column
                prop="email"
                label="E-mail">
            </el-table-column>
            <el-table-column label="Ações">
              <template slot-scope="scope">
                <!-- <router-link> -->
                <el-button type="warning" circle>
                  {{ scope.row.id }}
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="danger" circle>
                  <i class="el-icon-delete"></i>
                </el-button>
                <!-- </router-link> -->

              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PageTitle from "@/components/shared/PageTitle.vue";
import {PatientModel} from "@/models/PatientModel";
import {httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";

@Component({
  components: {
    PageTitle
  }
})
export default class ListPatient extends Vue {
  patients: PatientModel[] = []
  loading = true

  async created() {
    try {
      const {data: {content}} = await httpGet(apiRoutes.patients);
      this.patients = content;
    } catch (e: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar os pacientes.'
      })
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.row-main {
  display: flex;
  justify-content: center;
}
</style>