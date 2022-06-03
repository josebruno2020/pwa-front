<template>
  <main>
    <img alt="Vue logo" src="../../assets/logo.png" class="logo">
    <p class="text-center">Informe suas credenciais para continuar</p>
    <div class="login-form">
      <el-form class="form" ref="login-form" :model="model" :rules="rules" label-width="120px" label-position="top"
               @submit.native.prevent="validateForm">
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="model.email"></el-input>
        </el-form-item>

        <el-form-item label="Senha" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>

        <div class="submit-row">
          <el-button :loading="loading" native-type="submit" type="success">Entrar</el-button>
        </div>
      </el-form>


    </div>
    <router-link class="text-sm" :to="{name:'password'}">Esqueci senha</router-link>
  </main>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Login} from "@/models/Login";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import ErrorForm from '@/components/shared/ErrorForm.vue';
import {VForm} from "@/helpers/VFormType";
import {loginRules} from "@/helpers/validation/login";

@Component({
  components: {
    ErrorForm
  }
})
export default class LoginView extends Vue {
  $refs!: {
    form: VForm
  }
  loading = false
  model: Login = new Login();
  rules = loginRules

  async validateForm() {
    await this.$refs['login-form'].validate((valid: boolean) => {
      if (valid) return this.login();
    });
  }

  async login() {
    this.loading = true
    try {
      const {data: {user, access_token}} = await httpPost(apiRoutes.login, this.model);
      this.$store.commit('SET_STATE', {token: access_token, user: user});
      if (user.is_first_access) {
        return this.$router.push({name: 'changePassword'});
      }
      return this.$router.push({name: 'home'});
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'E-mail e/ou senha inálido!'
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

