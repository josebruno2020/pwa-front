<template>
  <main>
    <img alt="Vue logo" src="../../assets/logo.png" class="logo">
    <p class="text-center">Informe seu e-mail para continuar. Após a verificação do e-mail você poderá redefinir sua senha.</p>
    <div class="login-form">
      <el-form class="form" ref="password-form" :model="model" :rules="rules" label-width="120px" label-position="top"
               @submit.native.prevent="validateForm">
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="model.email"></el-input>
        </el-form-item>

        <div class="submit-row">
          <el-button :loading="loading" native-type="submit" type="success">Enviar</el-button>
        </div>
      </el-form>


    </div>
    <router-link class="text-sm" :to="{name:'login'}">Voltar</router-link>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {LoginModel} from "@/models/LoginModel";
import {httpPost} from "@/services/http";
import {passwordRules} from "@/helpers/validation/password";
import {VForm} from "@/helpers/VFormType";
import { apiRoutes } from "@/services/apiRoutes";

@Component({
  name: 'Password'
})
export default class Password extends Vue {
  $refs!: {
    form: VForm
  }
  loading = false
  model: LoginModel = new LoginModel();
  rules = passwordRules
  emailValid = false

  async validateForm() {
    await this.$refs['password-form'].validate((valid: boolean) => {
      if (valid) return this.verifyEmail();
    });
  }

  async verifyEmail() {
    this.loading = true
    try {
      const {data} = await httpPost(apiRoutes.password, this.model);
      console.log(data)


      this.$notify.success({
        title: 'Sucesso',
        message: 'Enviamos o e-mail com link para redefinir a sua senha. Confira sua caixa de entrada.'
      })

    } catch (err: any) {
      let message =  'Erro ao enviar o e-mail'
      if (err.response?.status === 404) {
        message = 'O e-mail informado não existe no sistema.';
      }
      this.$notify.error({
        title: 'Erro!',
        message
      });
    } finally {
      this.loading = false
    }
  }

}
</script>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
}

.logo {
  margin-bottom: 3rem;
  max-width: 10rem;
}

.form {
  min-width: 80vw;
}

.login-form {
  padding: .2rem 1rem 1rem 1rem;
  border: 1px solid rgba(69, 199, 58, 0.8);
  margin: 1rem 0;


  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.submit-row {
  display: flex;
  justify-content: center;
}

button {
  margin-top: .6rem;
}

</style>