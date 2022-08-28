<template>
  <main>
    <h5>Formulário de Notificação de Violência Interpessoal/Autoprovocada</h5>

    <el-form class="form-auto-personal" @submit.native.prevent="submitForm" ref="autopersonal-form" :model="model"
             label-width="120px"
             label-position="top">
      <p class="subtitle">Dados Gerais</p>
      <div class="form-flex">

        <el-form-item label="03- Data da notificação">
          <el-input v-model="model._03" type="date" :value="now.toLocaleString()"></el-input>
        </el-form-item>

        <el-form-item label="04- UF">
          <el-select v-model="model._04" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="05- Município">
          <el-input v-model="model._05"></el-input>
        </el-form-item>

        <el-form-item label="Código IBGE">
          <el-input v-model="model._0505" maxlength="6" @input="onlyNumbers($event)"></el-input>
        </el-form-item>
      </div>

      <div class="form-flex">
        <el-form-item label="06- Unidade Notificadora">
          <el-select v-model="model._06" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value06"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="07- Nome da Unidade Notificadora">
          <el-input v-model="model._07"></el-input>
        </el-form-item>

        <el-form-item label="07- Cd. da Unidade">
          <el-input v-model="model._0705"></el-input>
        </el-form-item>

        <el-form-item label="08- Unidade de Saúde">
          <el-input v-model="model._08"></el-input>
        </el-form-item>

        <el-form-item label="08- Código (CNES)">
          <el-input v-model="model._0805" maxlength="6"></el-input>
        </el-form-item>


        <el-form-item label="09- Data da ocorrência da violência">
          <el-input v-model="model._09" type="date"></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Notificação Individual</p>
      <div class="form-flex">
        <el-form-item label="10- Nome do paciente">
          <el-input v-model="model._10"></el-input>
        </el-form-item>

        <el-form-item label="11- Data de nascimento">
          <el-input v-model="model._11" type="date"></el-input>
        </el-form-item>

        <!--         TODO -->
        <el-form-item label="12- Idade">
          <el-input v-model="model._12"></el-input>
        </el-form-item>

        <el-form-item label="13- Sexo">
          <el-select v-model="model._13" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value13"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="14- Gestante">
          <el-select v-model="model._14" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value14"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="15- Raça/Cor">
          <el-select v-model="model._15" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value15"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="16- Escolaridade">
          <!--          TODO-->
          <el-select v-model="model._16" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value15"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="17- Número do Cartão SUS">
          <el-input v-model="model._17" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item label="18- Nome da Mãe">
          <el-input v-model="model._18"></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Dados de Residência</p>
      <div class="form-flex">
        <el-form-item label="19- UF">
          <el-select v-model="model._19" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="20- Município de Residência">
          <el-input v-model="model._20"></el-input>
        </el-form-item>

        <el-form-item label="20- Código (IBGE)">
          <el-input v-model="model._2005" maxlength="6"></el-input>
        </el-form-item>


        <el-form-item label="21- Distrito">
          <el-input v-model="model._21"></el-input>
        </el-form-item>

        <el-form-item label="22- Bairro">
          <el-input v-model="model._22"></el-input>
        </el-form-item>

        <el-form-item label="23- Logradouro (rua, avenida,...)">
          <el-input v-model="model._23"></el-input>
        </el-form-item>

        <el-form-item label="23- Código">
          <el-input v-model="model._2305"></el-input>
        </el-form-item>

        <el-form-item label="24- Número">
          <el-input v-model="model._24"></el-input>
        </el-form-item>

        <el-form-item label="25- Complemento">
          <el-input v-model="model._25"></el-input>
        </el-form-item>

        <el-form-item label="26- Geo campo 1">
          <el-input v-model="model._26"></el-input>
        </el-form-item>

        <el-form-item label="27- Geo campo 2">
          <el-input v-model="model._27"></el-input>
        </el-form-item>

        <el-form-item label="28- Ponto de Referência">
          <el-input v-model="model._28"></el-input>
        </el-form-item>

        <el-form-item label="29- CEP">
          <el-input v-model="model._29"></el-input>
        </el-form-item>

        <el-form-item label="30- (DDD) Telefone">
          <el-input v-model="model._30"></el-input>
        </el-form-item>

        <el-form-item label="31- Zona">
          <el-select v-model="model._31" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value31"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="32- País (se residente fora do Brasil)">
          <el-input v-model="model._32"></el-input>
        </el-form-item>

      </div>

      <h5>Dados Complementares</h5>

      <p class="subtitle">Dados da Pessoa Atendida</p>

      <div class="form-flex">
        <el-form-item label="33- Nome Social">
          <el-input v-model="model._33"></el-input>
        </el-form-item>

        <el-form-item label="34- Ocupação">
          <el-input v-model="model._34"></el-input>
        </el-form-item>

        <el-form-item label="35- Situação conjugal / Estado civil">
          <el-select v-model="model._35" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value35"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="36- Orientação Sexual">
          <el-select v-model="model._36" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value36"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="37- Identidade de gênero">
          <el-select v-model="model._37" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value37"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="38- Possui algum tipo de deficiência/ transtorno?">
          <el-select v-model="model._38" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value38"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="39- Qual tipo de deficiência /transtorno?">
          <el-select v-model="model._39" clearable placeholder="selecione..." filterable multiple>
            <el-option
                v-for="(v, index) in value39"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item   v-if="model._39.includes(7)" label="39- Outras">
          <el-input v-model="model._3905"></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Dados da Ocorrência</p>

      <div class="form-flex">
        <el-form-item label="40- UF">
          <el-select v-model="model._40" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="is-flex is-justify-end">
        <el-button :loading="loading" type="success" native-type="submit">Salvar</el-button>
      </div>

    </el-form>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {PatientModel} from "@/models/PatientModel";
import {states} from "@/helpers/form/states";
import {_06, _13, _14, _15, _31, _35, _36, _37, _38, _39} from "@/helpers/notifications/arraysToChoose";

@Component({
  name: 'AutoPersonal'
})
export default class AutoPersonal extends Vue {
  patient: PatientModel = new PatientModel()
  model = {
    _39: []
  }

  now = new Date()
  loading = false
  states = states
  value06 = _06
  value13 = _13
  value14 = _14
  value15 = _15
  value31 = _31
  value35 = _35
  value36 = _36
  value37 = _37
  value38 = _38
  value39 = _39

  setInformation(patient: PatientModel) {
    this.patient = patient
    console.log(this.patient)
    this.model = {
      _10: this.patient.name,
      _11: this.patient.birthdate,
      _18: this.patient.name_mother,
      _19: this.patient.state,
      _20: this.patient.city,
      _22: this.patient.neighborhood,
      _23: this.patient.street,
      _24: this.patient.number,
      _30: this.patient.phone_number,
      _32: 'Brasil'
    }
  }

  private onlyNumbers(value: string) {
    return value.replace(/[^\d]/g, '')
  }

  submitForm() {
    console.log(Object.entries(this.model))
  }
}

</script>

<style scoped lang="sass">
.form-auto-personal
  margin-top: 15px

.subtitle
  font-weight: bold
  font-size: 15px

.form-flex
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  gap: 1rem

.el-select, .el-input
  width: 250px
</style>