<template>
  <main>
    <h5>Formulário de Notificação de Intoxicação Exógena</h5>

    <el-form class="form-auto-personal" @submit.native.prevent="submitForm" ref="autopersonal-form" :model="model"
             label-width="250px"
             label-position="top">
      <p class="subtitle">Dados Gerais</p>

      <div class="form-flex">
        <el-form-item label="03- Data da notificação">
          <el-input v-model="model._03" type="date" ></el-input>
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

        <el-form-item label="05- Município de Notificação">
          <el-input v-model="model._05"></el-input>
        </el-form-item>


        <el-form-item label="Código IBGE">
          <el-input v-model="model._0505" maxlength="6"></el-input>
        </el-form-item>


        <el-form-item label="06- Unidade de Saúde (ou outra fonte notificadora)">
          <el-input v-model="model._06"></el-input>
        </el-form-item>

        <el-form-item label="06- Código">
          <el-input v-model="model._0605"></el-input>
        </el-form-item>

        <el-form-item label="07- Data dos Primeiros Sintomas">
          <el-input v-model="model._07" type="date" ></el-input>
        </el-form-item>

      </div>

      <p class="subtitle">NotificaçãoIndividual</p>
      <div class="form-flex">
        <el-form-item label="08- Nome do Paciente">
          <el-input v-model="model._08" ></el-input>
        </el-form-item>


        <el-form-item label="09- Data de nascimento">
          <el-input v-model="model._09" type="date"></el-input>
        </el-form-item>


        <el-form-item label="10- Idade">
          <el-input v-model="model._10" maxlength="3"></el-input>
        </el-form-item>

        <el-form-item label="10- Idade">
          <el-select v-model="model._1005" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value10"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="11- Sexo">
          <el-select v-model="model._11" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value11"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="12- Gestante">
          <el-select v-model="model._12" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value12"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="13- Raça/Cor">
          <el-select v-model="model._13" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value13"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="14- Escolaridade">
          <el-select v-model="model._14" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value14"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="15- Número do Cartão SUS">
          <el-input v-model="model._15" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item label="16- Nome da Mãe">
          <el-input v-model="model._16"></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Dados de Residência</p>

      <div class="form-flex">
        <el-form-item label="17- UF">
          <el-select v-model="model._17" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="18- Município de Residência">
          <el-input v-model="model._18"></el-input>
        </el-form-item>

        <el-form-item label="18- Código (IBGE)">
          <el-input v-model="model._1805" maxlength="6"></el-input>
        </el-form-item>

        <el-form-item label="19- Distrito">
          <el-input v-model="model._19"></el-input>
        </el-form-item>

        <el-form-item label="20- Bairro">
          <el-input v-model="model._20"></el-input>
        </el-form-item>

        <el-form-item label="21- Logradouro (rua, avenida,...)">
          <el-input v-model="model._21"></el-input>
        </el-form-item>


        <el-form-item label="21- Código">
          <el-input v-model="model._2105" maxlength="6"></el-input>
        </el-form-item>

        <el-form-item label="22- Número">
          <el-input v-model="model._22"></el-input>
        </el-form-item>

        <el-form-item label="23- Complemento (apto., casa, ...)">
          <el-input v-model="model._23"></el-input>
        </el-form-item>

        <el-form-item label="24- Geo campo 1">
          <el-input v-model="model._24"></el-input>
        </el-form-item>

        <el-form-item label="25- Geo campo 2">
          <el-input v-model="model._25"></el-input>
        </el-form-item>

        <el-form-item label="26- Ponto de Referência">
          <el-input v-model="model._26"></el-input>
        </el-form-item>

        <el-form-item label="27- CEP">
          <el-input v-model="model._27"></el-input>
        </el-form-item>

        <el-form-item label="28- (DDD) Telefone">
          <el-input v-model="model._28"></el-input>
        </el-form-item>

        <el-form-item label="29- Zona">
          <el-select v-model="model._29" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value29"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="30- País (se residente fora do Brasil)">
          <el-input v-model="model._30"></el-input>
        </el-form-item>
      </div>

      <h5>Dados Complementares do Caso</h5>

      <p class="subtitle">Antecedentes Epidemiológicos</p>

      <div class="form-flex">
        <el-form-item label="31- Data da Investigação">
          <el-input v-model="model._31" type="date"></el-input>
        </el-form-item>

        <el-form-item label="32- Ocupação">
          <el-input v-model="model._32"></el-input>
        </el-form-item>


        <el-form-item label="33- Situação no Mercado de Trabalho">
          <el-select v-model="model._33" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value33"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="33- Outros">
          <el-input v-model="model._3305"></el-input>
        </el-form-item>


        <el-form-item label="34- Local de ocorrência da exposição">
          <el-select v-model="model._34" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value34"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="34- Outro">
          <el-input v-model="model._3405"></el-input>
        </el-form-item>

      </div>

      <p class="subtitle">Dados da Exposição</p>
      <div class="form-flex">
        <el-form-item label="35- Nome do local/estabelecimento de ocorrência">
          <el-input v-model="model._35"></el-input>
        </el-form-item>


        <el-form-item label="36- Atividade Econômica (CNAE)">
          <el-input v-model="model._36"></el-input>
        </el-form-item>

        <el-form-item label="37- UF">
          <el-select v-model="model._37" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="38- Município do estabelecimento">
          <el-input v-model="model._38"></el-input>
        </el-form-item>

        <el-form-item label="38- Código (IBGE)">
          <el-input v-model="model._3805" maxlength="6"></el-input>
        </el-form-item>

        <el-form-item label="39- Distrito">
          <el-input v-model="model._39"></el-input>
        </el-form-item>

        <el-form-item label="40- Bairro">
          <el-input v-model="model._40"></el-input>
        </el-form-item>

        <el-form-item label="41- Logradouro ">
          <el-input v-model="model._41"></el-input>
        </el-form-item>

        <el-form-item label="42- Número">
          <el-input v-model="model._42"></el-input>
        </el-form-item>

        <el-form-item label="43- Complemento (apto., casa, ...)">
          <el-input v-model="model._43"></el-input>
        </el-form-item>

        <el-form-item label="44- Ponto de Referência do estabelecimento">
          <el-input v-model="model._44"></el-input>
        </el-form-item>

        <el-form-item label="45- CEP">
          <el-input v-model="model._45"></el-input>
        </el-form-item>

        <el-form-item label="46- (DDD) Telefone">
          <el-input v-model="model._46"></el-input>
        </el-form-item>


        <el-form-item label="47- Zona de exposição">
          <el-select v-model="model._47" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value47"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="48- País">
          <el-input v-model="model._48"></el-input>
        </el-form-item>

        <el-form-item label="49- Grupo do agente tóxico/Classificação geral">
          <el-select v-model="model._49" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value49"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="49- Outro">
          <el-input v-model="model._4905"></el-input>
        </el-form-item>

        <el-form-item label="50- Agente tóxico" >
          <div v-for="(value, index) in model._50" :key="index" >
            <el-input class="input-array"  v-model="value.value">
              <template slot="append">
                <el-button type="light" @click="add(model._50)">Adicionar</el-button>
              </template>
            </el-input>
          </div>

        </el-form-item>

        <el-form-item label="50- Princípio Ativo" >
          <div v-for="(value, index) in model._5005" :key="index" >
            <el-input class="input-array"  v-model="value.value">
              <template slot="append">
                <el-button type="light" @click="add(model._5005)">Adicionar</el-button>
              </template>
            </el-input>
          </div>

        </el-form-item>


        <el-form-item label="51- Se agrotóxico, qual a finalidade da utilização">
          <el-select v-model="model._51" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value51"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="52- Se agrotóxico, quais as atividades exercidas na exposição atual">
          <div v-for="(value, index) in model._52" :key="index">
            <el-select class="input-array"  v-model="value.value" clearable
                       placeholder="selecione..." filterable>
              <el-option
                  v-for="(v, index) in value52"
                  :key="index"
                  :label="v.label"
                  :value="v.value">
              </el-option>
            </el-select>
            <el-button type="light" @click="add(model._52)">Adicionar</el-button>
          </div>
        </el-form-item>


        <el-form-item label="53- Se agrotóxico de uso agrícola, qual a cultura/lavoura">
          <el-input v-model="model._53"></el-input>
        </el-form-item>


        <el-form-item label="54- Via de exposição/contaminação">
          <div v-for="(value, index) in model._54" :key="index">
            <el-select class="input-array"  v-model="value.value" clearable
                       placeholder="selecione..." filterable>
              <el-option
                  v-for="(v, index) in value54"
                  :key="index"
                  :label="v.label"
                  :value="v.value">
              </el-option>
            </el-select>
            <el-button type="light" @click="add(model._54)">Adicionar</el-button>
          </div>
        </el-form-item>


        <el-form-item label="55- Grupo do agente tóxico/Classificação geral">
          <el-select v-model="model._55" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value55"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="56- A exposição/contaminação foi decorrente do trabalho/ocupação?">
          <el-select v-model="model._56" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value56"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="57- Tipo de Exposição">
          <el-select v-model="model._57" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value57"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

      </div>

      <p class="subtitle">Dados do Atendimento</p>
      <div class="form-flex">

        <el-form-item label="58- Tempo Decorrido entre a Exposição e o Atendimento">
          <el-input v-model="model._58"  maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="58- Tempo Decorrido entre a Exposição e o Atendimento">
          <el-select v-model="model._5805" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value58"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="59- Tipo de atendimento">
          <el-select v-model="model._59" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value59"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="60- Houve hospitalização?">
          <el-select v-model="model._60" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(v, index) in value60"
                :key="index"
                :label="v.label"
                :value="v.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="61- Data da internação">
          <el-input v-model="model._61"  type="date"></el-input>
        </el-form-item>

        <el-form-item label="62- UF">
          <el-select v-model="model._62" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="63- Município de hospitalização">
          <el-input v-model="model._63" ></el-input>
        </el-form-item>

        <el-form-item label="63- Código (IBGE)">
          <el-input v-model="model._6305"  maxlength="6"></el-input>
        </el-form-item>

        <el-form-item label="64- Unidade de saúde">
          <el-input v-model="model._64" ></el-input>
        </el-form-item>

        <el-form-item label="64- Código">
          <el-input v-model="model._6405" maxlength="7" ></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Conclusão do Caso</p>
      <div class="form-flex">
        <el-form-item label="65- Classificação final">
          <el-select v-model="model._65" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in value65"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="66- Se intoxicação confirmada, qual o diagnóstico">
          <el-input v-model="model._66" ></el-input>
        </el-form-item>

        <el-form-item label="66- CID - 10">
          <el-input v-model="model._6605" maxlength="4" ></el-input>
        </el-form-item>

        <el-form-item label="67- Critério de confirmação">
          <el-select v-model="model._67" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in value67"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="68- Evolução do Caso">
          <el-select v-model="model._68" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in value68"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="69- Data do óbito">
          <el-input v-model="model._69" type="date" ></el-input>
        </el-form-item>

        <el-form-item label="70- Comunicação de Acidente de Trabalho - CAT.">
          <el-select v-model="model._70" clearable placeholder="selecione..." filterable>
            <el-option
                v-for="(state, index) in value70"
                :key="index"
                :label="state.label"
                :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="71- Data do Encerramento">
          <el-input v-model="model._71" type="date" ></el-input>
        </el-form-item>

      </div>

      <h5>Informações complementares e observações</h5>

      <div class="form-flex">
        <el-form-item  label="Observações Adicionais:">
          <el-input v-model="model.obs" type="textarea" :rows="3"  maxlength="150" show-word-limit></el-input>
        </el-form-item>
      </div>

      <p class="subtitle">Notificador</p>
      <div class="form-flex">
        <el-form-item  label="Município/Unidade de Saúde">
          <el-input v-model="model.city"></el-input>
        </el-form-item>

        <el-form-item  label="Cód. da Unid. de Saúde/CNES">
          <el-input v-model="model.code" maxlength="8"></el-input>
        </el-form-item>

        <el-form-item  label="Nome">
          <el-input v-model="model.name" disabled></el-input>
        </el-form-item>

        <el-form-item  label="Função">
          <el-input v-model="model.function"></el-input>
        </el-form-item>
      </div>



      <div class="is-flex is-justify-end">
        <el-button type="light" @click="close">Cancelar</el-button>
        <el-button :loading="loading" type="success" native-type="submit">Salvar</el-button>
      </div>
    </el-form>
  </main>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import {PatientModel} from "@/models/PatientModel";
import {states} from "@/helpers/form/states";
import { _10, _11, _12, _13, _14, _29, _33, _34, _47, _49, _51, _52, _54, _55, _56, _57, _58, _59, _60, _65, _67, _68, _70 } from "@/helpers/notifications/intoxicationHelper";
import {httpPost, httpPut} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {UserModel} from "@/models/UserModel";
import LoadingMixin from "@/components/mixins/loadingMixin";

@Component({
  name: 'Intoxication'
})
export default class Intoxication extends Mixins<LoadingMixin>(LoadingMixin) {
  model: any = {}
  patient: PatientModel = new PatientModel()
  user: UserModel = this.$store.state.user
  now = new Date()
  states = states

  loading = false
  value10 = _10
  value11 = _11
  value12 = _12
  value13 = _13
  value14 = _14
  value29 = _29
  value33 = _33
  value34 = _34
  value47 = _47
  value49 = _49
  value51 = _51
  value52 = _52
  value54 = _54
  value55 = _55
  value56 = _56
  value57 = _57
  value58 = _58
  value59 = _59
  value60 = _60
  value65 = _65
  value67 = _67
  value68 = _68
  value70 = _70

  isEdit = false



  created() {
    this.model = {
      _03: this.now.toLocaleDateString()?.split('/')?.reverse()?.join('-'),
      _04: 'PR',
      _12: [],
      _30: 'Brasil',
      _48: 'Brasil',
      _50: [{value: ''}],
      _5005: [{ value: ''}],
      _52: [{ value: '' }],
      _54: [{ value: '' }],
    }
  }

  setInformation(patient:PatientModel) {
    this.patient = patient
    this.model = {
      ...this.model,
      patient_id: this.patient.id,
      _08: this.patient.name,
      _09: this.patient.birthdate,
      _16: this.patient.name_mother,
      _17: this.patient.state,
      _18: this.patient.city,
      _20: this.patient.neighborhood,
      _21: this.patient.street,
      _22: this.patient.number,
      _28: this.patient.phone_number,
      name: this.user.name
    }

    this.isEdit = false
  }

  setInformationToEdit(patient: PatientModel, model: any) {
    this.patient = patient
    this.model = model
    this.isEdit = true

    this.setInformationInEdit()

    console.log(this.model)
  }

  private setInformationInEdit() {
    this.model._50 = this.model._50?.split(',').map(v => ({value: v}))
    this.model._5005 = this.model._5005?.split(',').map(v => ({value: v}))
    this.model._52 = this.model._52?.split(',').map(v => ({value: v}))
    this.model._54 = this.model._54?.split(',').map(v => ({value: v}))

    this.model.name = this.user.name
  }


  add(model) {
    if (model.length === 3) return
    return model.push({value: ''})
  }


  submitForm() {
    this.$confirm('Tem certeza que deseja finalizar o preenchimento do formulário?', 'Finalizar', {
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      this.formatModel();

      if (!this.isEdit) return this.handle()
      return this.edit()
    })
  }

  async handle() {
    this.openFullScreenLoading()
    try {
      await httpPost(apiRoutes.notificationIntoxication, this.model)
      this.$notify.success({
        title: 'Successo',
        message: 'Notificação cadastrada com sucesso'
      })
      this.close();
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível salvar as informações'
      })
    } finally {
      this.loadingFull.close()
    }
  }

  async edit() {
    this.openFullScreenLoading()
    try {
      await httpPut(`${apiRoutes.notificationIntoxication}/${this.model.id}`, this.model);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Notificação editada com sucesso!'
      })
      this.close()
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi editar as informações'
      })
    } finally {
      this.loadingFull.close()
    }
    console.log('TODO')
  }


  private formatModel() {
    this.model._50 = this.model?._50?.map(v => v.value)
    this.model._5005 = this.model?._5005?.map(v => v.value)
    this.model._52 = this.model?._52?.map(v => v.value)
    this.model._54 = this.model?._54?.map(v => v.value)
  }

  close() {
    this.$emit('close')
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

.el-textarea
  width: 500px

.form-choose
  width: 400px
  max-height: 350px
  overflow-y: auto

.input-array
  margin-bottom: .5rem

@media only screen and (max-width: 450px)
  .form-flex
    justify-content: center
    align-items: center

  .el-textarea
    width: 250px
</style>