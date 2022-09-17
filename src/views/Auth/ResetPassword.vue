<template>
  <main>
    <page-title title="Resetar a senha"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <h5>
              Agora você pode redefinir a sua nova senha!
            </h5>
          </div>

          <el-form @submit.native.prevent="validationForm" ref="password-form" :model="model" label-width="120px"
                   :rules="rules" label-position="top">
            <el-form-item label="Nova Senha" prop="password">
              <el-input type="password" v-model="model.password" show-password></el-input>
            </el-form-item>

            <el-form-item label="Confirme sua nova senha" prop="password_confirmation">
              <el-input type="password" v-model="model.password_confirmation" show-password></el-input>
            </el-form-item>

            <div class="footer">
              <el-button :loading="loading" native-type="submit" type="success">Salvar</el-button>
            </div>
          </el-form>
        </el-card>
        <router-link class="text-sm" :to="{name:'login'}">Ir para Login</router-link>
      </el-col>

    </el-row>

  </main>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import PageTitle from "@/components/shared/PageTitle.vue";
import ChangePasswordModel from "@/models/ChangePasswordModel";
import {changePasswordRules} from "@/helpers/validation/change-password";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {VForm} from "@/helpers/VFormType";

@Component({
  name: 'ResetPassword',
  props: ['token'],
  components: {
    PageTitle
  }
})

export default class ResetPassword extends Vue {
  $refs!: {
    form: VForm
  }
  @Prop({
    type: String
  })
  token

  email

  created() {
    this.email = this.$route.query?.email

    console.log(this.email)
  }


  model: ChangePasswordModel = new ChangePasswordModel();
  userId = this.$store.state.user.id;
  loading = false

  validateConfirmPassword = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== this.model.password) {
      callback(new Error('Two inputs don\'t match!'));
    } else {
      callback();
    }
  }

  rules = {
    ...changePasswordRules,
    password_confirmation: [
      {required: true, validator: this.validateConfirmPassword, message: 'As senhas não são iguais', trigger: 'submit'},
    ]
  }

  async validationForm() {
    await this.$refs['password-form'].validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        return this.resetPassword();
      }
    });
  }

  async resetPassword() {
    try {
      await httpPost(`${apiRoutes.resetPassword}`, {
        password: this.model.password,
        token: this.token,
        email: this.email
      });
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Senha redefinida com sucesso!'
      })
      return this.$router.push({name: 'login'});
    } catch (err: any) {
      let message = 'Não foi possivel redefinir a senha. Tente novamente mais tarde!'
      if (err.response?.status === 403) {
        message = 'O Link está inválido. Solicite um novo na página: Esqueci minha Senha'
      }
      this.$notify.error({
        title: 'Erro!',
        message
      })
    } finally {
      this.loading = false;
    }
  }

}
</script>

<style scoped lang="sass">
.row-main
  width: 100vw
  display: flex
  justify-content: center
  margin: 0 !important

.card
  margin-top: .8rem

.footer
  display: flex
  justify-content: center


</style>