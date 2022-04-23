<template>
  <main>
    <img alt="Vue logo" src="../../assets/logo.png" class="logo">
    <p class="text-center">Informe suas credenciais para continuar</p>
    <div class="form">
      <form class="login-form w-100 d-flex center">
        <div class="centerx">
          <vs-input v-validate="'required'" name="email" type="email" :color="errors.has('email') ? 'danger' : 'success'" label-placeholder="E-mail"
                    v-model="model.email"/>
          <error-form  :error="errors.first('email')"></error-form>
        </div>
        <div class="centerx">
          <vs-input v-validate="'required'" name="senha" color="success" label-placeholder="Senha" type="password" v-model="model.password"/>
          <error-form :error="errors.first('senha')"></error-form>
        </div>

        <div class="centerx">
          <vs-button color="success" type="filled" @click="login">Entrar</vs-button>
        </div>
      </form>


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

@Component({
  components: {
    ErrorForm
  }
})
export default class LoginView extends Vue {
  model: Login = new Login();


  async login() {
    try {
      const validate: boolean = await this.$validator.validateAll();
      if (!validate) return;
      const { data: {user, access_token} } = await httpPost(apiRoutes.login, this.model);
      this.$store.commit('SET_STATE', {token: access_token, user: user});
      if (user.is_first_access) {
        return this.$router.push({name: 'changePassword'});
      }
      return this.$router.push({name: 'home'});
    } catch (err: any) {
      this.$toast.error('E-mail e/ou senha inálido!');
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
.text-center {
  text-align: center;
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

.centerx {
  margin-top: 1.1rem;
}

button {
  margin-top: .6rem;
}


</style>

