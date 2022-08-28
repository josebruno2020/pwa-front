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

      </div>
      <div class="form-flex">
        <el-form-item class="form-choose" v-if="model._39" label="39- Qual tipo de deficiência /transtorno?">
          <div v-for="(v, index) in value39" :key="index" class="form-select-item">
            <div>
              {{ v.label }}
              -
              <strong>{{ model._39[v.value] }}</strong>
            </div>
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._39, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._39, 2, v.value)">Não</el-button>
              <el-button plain type="warning" size="mini" @click="setInformationInArray(model._39, 8, v.value)">Não se aplica</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._39, 9, v.value)">Ignorado</el-button>
            </div>


          </div>
        </el-form-item>

        <el-form-item  label="39- Outras">
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

        <el-form-item  label="41- Município de ocorrência">
          <el-input v-model="model._41"></el-input>
        </el-form-item>

        <el-form-item label="41- Código IBGE">
          <el-input v-model="model._4105" maxlength="6" @input="onlyNumbers($event)"></el-input>
        </el-form-item>

        <el-form-item  label="42- Distrito">
          <el-input v-model="model._42"></el-input>
        </el-form-item>

        <el-form-item  label="43- Bairro">
          <el-input v-model="model._43"></el-input>
        </el-form-item>

        <el-form-item  label="44- Logradouro (rua, avenida,...)">
          <el-input v-model="model._44"></el-input>
        </el-form-item>

        <el-form-item  label="44- Código">
          <el-input v-model="model._4405" maxlength="6"></el-input>
        </el-form-item>

        <el-form-item  label="45- Número">
          <el-input v-model="model._45"></el-input>
        </el-form-item>

        <el-form-item  label="46- Complemento (apto., casa, ...)">
          <el-input v-model="model._46"></el-input>
        </el-form-item>

        <el-form-item  label="47- Geo campo 3">
          <el-input v-model="model._47"></el-input>
        </el-form-item>

        <el-form-item  label="48- Geo campo 4">
          <el-input v-model="model._48"></el-input>
        </el-form-item>

        <el-form-item  label="49- Ponto de Referência">
          <el-input v-model="model._49"></el-input>
        </el-form-item>

        <el-form-item label="50- Zona">
          <el-select v-model="model._50" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value31"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="51- Hora da ocorrência">
          <el-input v-model="model._51" type="time"></el-input>
        </el-form-item>

        <el-form-item label="52- Local de ocorrência">
          <el-select v-model="model._52" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value52"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="model._52 && model._52 === '09'"  label="52- Outro">
          <el-input v-model="model._5205"></el-input>
        </el-form-item>

        <el-form-item label="53- Ocorreu outras vezes?">
          <el-select v-model="model._53" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value53"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="54- A lesão foi autoprovocada?">
          <el-select v-model="model._54" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value54"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <p class="subtitle">Violência</p>
      <div class="form-flex">
        <el-form-item label="55- Essa violência foi motivada por">
          <el-select v-model="model._55" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value55"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="model._55 && model._55 === '09'"  label="55- Outro">
          <el-input v-model="model._5505"></el-input>
        </el-form-item>

        <el-form-item class="form-choose" v-if="model._56" label="56- Tipo de violência">
          <div v-for="(v, index) in value56" :key="index" class="form-select-item">
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._56, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._56, 2, v.value)">Não</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._56, 9, v.value)">Ignorado</el-button>
            </div>

            <div>
              {{ v.label }}
              -
              <strong>{{ model._56[v.value] }}</strong>
            </div>

          </div>
        </el-form-item>

        <el-form-item  label="56- Outras">
          <el-input v-model="model._5605"></el-input>
        </el-form-item>

        <el-form-item class="form-choose" v-if="model._57" label="57- Meio de agressão">
          <div v-for="(v, index) in value57" :key="index" class="form-select-item">
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._57, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._57, 2, v.value)">Não</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._57, 9, v.value)">Ignorado</el-button>
            </div>

            <div>
              {{ v.label }}
              -
              <strong>{{ model._57[v.value] }}</strong>
            </div>

          </div>
        </el-form-item>

        <el-form-item  label="57- Outras">
          <el-input v-model="model._5705"></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Violência Sexual</p>
      <div class="form-flex">
        <el-form-item class="form-choose" v-if="model._58" label="58- Se ocorreu violência sexual, qual o tipo?">
          <div v-for="(v, index) in value58" :key="index" class="form-select-item">
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._58, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._58, 2, v.value)">Não</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._58, 9, v.value)">Ignorado</el-button>
            </div>

            <div>
              {{ v.label }}
              -
              <strong>{{ model._58[v.value] }}</strong>
            </div>

          </div>
        </el-form-item>

        <el-form-item  label="58- Outro">
          <el-input v-model="model._5805"></el-input>
        </el-form-item>

        <el-form-item class="form-choose" v-if="model._59" label="59- Procedimento realizado">
          <div v-for="(v, index) in value59" :key="index" class="form-select-item">
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._59, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._59, 2, v.value)">Não</el-button>
              <el-button plain type="warning" size="mini" @click="setInformationInArray(model._59, 8, v.value)">Não se aplica</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._59, 9, v.value)">Ignorado</el-button>
            </div>

            <div>
              {{ v.label }}
              -
              <strong>{{ model._59[v.value] }}</strong>
            </div>

          </div>
        </el-form-item>

      </div>
      <p class="subtitle">Dados do provável autor da violência</p>
      <div class="form-flex">

        <el-form-item label="60- Número de envolvidos">
          <el-select v-model="model._60" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value60"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item class="form-choose" v-if="model._61" label="61- Vínculo/grau de parentesco com a pessoa atendida">
          <div v-for="(v, index) in value61" :key="index" class="form-select-item">
            <div>
              <el-button plain type="success" size="mini" @click="setInformationInArray(model._61, 1, v.value)">Sim</el-button>
              <el-button plain type="danger" size="mini" @click="setInformationInArray(model._61, 2, v.value)">Não</el-button>
              <el-button plain type="info" size="mini" @click="setInformationInArray(model._61, 9, v.value)">Ignorado</el-button>
            </div>

            <div>
              {{ v.label }}
              -
              <strong>{{ model._61[v.value] }}</strong>
            </div>

          </div>
        </el-form-item>

        <el-form-item label="62- Sexo do provável autor da violência">
          <el-select v-model="model._62" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value62"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="63- Suspeita de uso de álcool">
          <el-select v-model="model._63" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value63"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="64- Ciclo de vida do provável autor da violência:">
          <el-select v-model="model._64" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value64"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

      </div>

      <p class="subtitle">Encaminhamento</p>
      <div class="form-flex">

      </div>

      <p class="subtitle">Dados finais</p>
      <div class="form-flex">

      </div>

      <h5>Informações complementares e observações</h5>
      <div class="form-flex">

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
import {_06, _13, _14, _15, _31, _35, _36, _37, _38, _39, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64} from "@/helpers/notifications/arraysToChoose";

@Component({
  name: 'AutoPersonal'
})
export default class AutoPersonal extends Vue {
  patient: PatientModel = new PatientModel()
  model = {}

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
  value52 = _52
  value53 = _53
  value54 = _54
  value55 = _55
  value56 = _56
  value57 = _57
  value58 = _58
  value59 = _59
  value60 = _60
  value61 = _61
  value62 = _62
  value63 = _63
  value64 = _64

  selectedValue39: number[] = []

  created() {
    this.model = {
      _39: [],
      _56: [],
      _57: [],
      _58: [],
      _59: [],
      _61: [],
      _65: []
    }
  }

  setInformation(patient: PatientModel) {
    this.patient = patient
    this.model = {
      ...this.model,
      _10: this.patient.name,
      _11: this.patient.birthdate,
      _18: this.patient.name_mother,
      _19: this.patient.state,
      _20: this.patient.city,
      _22: this.patient.neighborhood,
      _23: this.patient.street,
      _24: this.patient.number,
      _30: this.patient.phone_number,
      _32: 'Brasil',
    }
    this.selectedValue39 = []
  }

  private onlyNumbers(value: string) {
    return value.replace(/[^\d]/g, '')
  }

  submitForm() {
    console.log(Object.entries(this.model))
    //confirmar para salvar;
  }


  private setInformationInArray(model: any, value: number, valueInArray: number): void {
    Vue.set(model, valueInArray, value)
  }

  async handle() {
    alert('handle')
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

.form-choose
  width: 330px

//.form-select-item
//  display: flex
</style>