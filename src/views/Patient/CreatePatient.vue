<template>
  <main>
    <page-title title="Cadastro de paciente"/>
    <vs-row class="card" vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-card class="card-content">
          <div slot="header">
            <h5>
              Informações básicas
            </h5>
          </div>

          <form class="form">
            <vs-row vs-type="flex" vs-align="center">
              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Nome Completo</label>
                <vs-input v-validate="'required'"
                          name="name" type="text"
                          :color="errors.has('name') ? 'danger' : 'success'"
                          placeholder="Nome"
                          v-model="patient.name"/>
                <error-form :error="errors.first('name')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Data de nascimento</label>
                <vs-input v-validate="'required|date_format:yyyy-MM-dd'"
                          name="nascimento" type="date"
                          :color="errors.has('nascimento') ? 'danger' : 'success'"

                          v-model="patient.birthdate"/>
                <error-form :error="errors.first('nascimento')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Nome da Mãe</label>
                <vs-input v-validate="'required'"
                          name="nome_mae" type="text"
                          :color="errors.has('nome_mae') ? 'danger' : 'success'"
                          placeholder="Nome da Mãe"
                          v-model="patient.name_mother"
                          data-vv-as="nome da mãe"/>
                <error-form :error="errors.first('nome_mae')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">CNS</label>
                <vs-input v-validate="'required'"
                          name="cns" type="text"
                          :color="errors.has('cns') ? 'danger' : 'success'"
                          placeholder="CNS"
                          v-model="patient.cns"/>
                <error-form :error="errors.first('cns')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">CPF</label>
                <vs-input v-validate="'required'"
                          name="cpf" type="text"
                          :color="errors.has('cpf') ? 'danger' : 'success'"
                          placeholder="CPF"
                          v-model="patient.cpf"/>
                <error-form :error="errors.first('cpf')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">RG</label>
                <vs-input v-validate="'required'"
                          name="rg" type="text"
                          :color="errors.has('rg') ? 'danger' : 'success'"
                          placeholder="RG"
                          v-model="patient.rg"/>
                <error-form :error="errors.first('rg')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Cidade de origem</label>
                <vs-input
                          name="from_city" type="text"
                          :color="errors.has('from_city') ? 'danger' : 'success'"
                          placeholder="RG"
                          v-model="patient.from_city"
                          data-vv-as="cidade de origem"/>
                <error-form :error="errors.first('from_city')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Estado de origem</label>
                <vs-input
                    name="from_state" type="text"
                    :color="errors.has('from_state') ? 'danger' : 'success'"
                    placeholder="Estade de origem"
                    v-model="patient.from_state"
                    data-vv-as="estado de origem"/>
                <error-form :error="errors.first('from_state')"></error-form>
              </vs-col>


              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Telefone</label>
                <vs-input
                    name="telefone" type="text"
                    :color="errors.has('telefone') ? 'danger' : 'success'"
                    placeholder="Telefone"
                    v-model="patient.phone_number"/>
                <error-form :error="errors.first('telefone')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Celular</label>
                <vs-input
                    name="celular" type="text"
                    :color="errors.has('celular') ? 'danger' : 'success'"
                    placeholder="Celular"
                    v-model="patient.mobile_number"/>
                <error-form :error="errors.first('celular')"></error-form>
              </vs-col>
            </vs-row>

            <div>
              <h4 class="subtitle">
                Informações de Endereço
              </h4>
            </div>
            <vs-row vs-type="flex" vs-align="center">
              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Endereço</label>
                <vs-input
                    name="endereco" type="text"
                    :color="errors.has('endereco') ? 'danger' : 'success'"
                    placeholder="Endereço"
                    v-model="patient.street"/>
                <error-form :error="errors.first('endereco')"></error-form>
              </vs-col>


            </vs-row>
          </form>


          <div class="footer">
            <div class="centerx">
              <vs-button color="success" icon="done" type="filled" @click="savePatient">Salvar</vs-button>
            </div>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
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

@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class CreatePatient extends Vue {
  patient: Patient = new Patient();

  async savePatient() {
    try {
      const validator: boolean = await this.$validator.validateAll();
      if (!validator) return;
      const {data} = await httpPost(apiRoutes.patients, this.patient);
      this.$toast.success('Paciente cadastrado com sucesso.');
      console.log(data)
    }catch (err: any) {
      this.$toast.error('Não foi possivel cadastrar o paciente');
    }
  }
}
</script>

<style scoped>

</style>