<template>
  <main>
    <page-title title="Cadastrar Usuário" />
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
                          v-model="user.name"/>
                <error-form :error="errors.first('name')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Data de nascimento</label>
                <vs-input v-validate="'required|date_format:yyyy-MM-dd'"
                          name="nascimento" type="date"
                          :color="errors.has('nascimento') ? 'danger' : 'success'"

                          v-model="user.birthdate"/>
                <error-form :error="errors.first('nascimento')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Número Registro</label>
                <vs-input v-validate="'required'"
                          name="registro" type="text"
                          :color="errors.has('registro') ? 'danger' : 'success'"
                          placeholder="Registro"
                          v-model="user.number_category"/>
                <error-form :error="errors.first('registro')"></error-form>
              </vs-col>
            </vs-row>

            <div>
              <h4 class="subtitle">
                Informações de acesso
              </h4>
            </div>
            <vs-row vs-type="flex" vs-align="center">
              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Tipo de usuário</label>
                <vs-select
                    v-model="user.user_type"
                    name="tipo"
                    v-validate="'required'"
                >
                  <vs-select-item :key="type" :value="type" :text="rol" v-for="{type, rol} in userType"/>
                </vs-select>
                <error-form :error="errors.first('tipo')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">E-mail</label>
                <vs-input v-validate="'required|email'"
                          name="email" type="email"
                          :color="errors.has('email') ? 'danger' : 'success'"
                          placeholder="E-mail"
                          v-model="user.email"/>
                <error-form :error="errors.first('email')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Senha de acesso</label>
                <vs-input v-validate="'required|min:4'"
                          name="senha" type="password"
                          :color="errors.has('senha') ? 'danger' : 'success'"
                          placeholder="Senha de acesso"
                          v-model="user.password"
                          ref="senha"/>
                <error-form :error="errors.first('senha')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Confirme a senha de acesso</label>
                <vs-input v-validate="'required|confirmed:senha'"
                          name="senha_confirmacao" type="password"
                          :color="errors.has('senha_confirmacao') ? 'danger' : 'success'"
                          placeholder="Senha de acesso"
                          data-vv-as="confirmacao de senha"
                          v-model="user.password_confirmation"/>
                <error-form :error="errors.first('senha_confirmacao')"></error-form>
              </vs-col>
            </vs-row>
          </form>


          <div  class="footer">
            <div class="centerx">
              <vs-button color="success" icon="done" type="filled" @click="saveUser">Salvar</vs-button>
            </div>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </main>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {User} from "@/models/User";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import PageTitle from "@/components/shared/PageTitle.vue";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {userType, userTypeInterface} from "@/enums/userType";


@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class CreateUser extends Vue {
  user: User = new User();
  userType: userTypeInterface[] = userType;

  async saveUser() {
    try {
      const validator: boolean = await this.$validator.validateAll();
      if (!validator) return;
      const {data} = await httpPost(apiRoutes.users, this.user);
      console.log(data);

      this.$toast.success('Usário cadastrado com sucesso!');
      return this.$router.push({name: 'listUser'});

    } catch (err: any) {
      this.$toast.error('Não foi possivel cadastrar o usuário');
    }
  }
}
</script>

<style scoped>



.label {
  margin: .3rem 0;
}

.subtitle {
  margin: 1rem 0;
}

.footer {
  padding-top: .2rem;
}
</style>