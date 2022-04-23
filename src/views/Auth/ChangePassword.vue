<template>
  <main>
    <page-title title="Mudar a senha"/>

    <vs-row class="card" vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-card class="card-content">
          <div slot="header">
            <h5>
              Para sua segurança, é necessário mudar a senha no primeiro acesso!
            </h5>
          </div>

          <form>
            <vs-row vs-type="flex" vs-align="center">
              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Nova senha</label>
                <vs-input v-validate="'required|min:4'"
                          name="senha" type="password"
                          :color="errors.has('senha') ? 'danger' : 'success'"
                          placeholder="Senha"
                          v-model="model.password"
                          ref="senha"/>
                <error-form :error="errors.first('senha')"></error-form>
              </vs-col>

              <vs-col class="col" vs-col vs-type="flex" vs-justify="center" vs-lg="3" vs-sm="4" vs-xs="12">
                <label class="label">Confirme a nova senha</label>
                <vs-input v-validate="'required|confirmed:senha'"
                          name="confirmarcao_senha" type="password"
                          :color="errors.has('confirmarcao_senha') ? 'danger' : 'success'"
                          placeholder="Confirmação de senha"
                          data-vv-as="confirmacao de senha"
                          v-model="model.password_confirmation"/>
                <error-form :error="errors.first('confirmarcao_senha')"></error-form>
              </vs-col>
            </vs-row>
          </form>


          <div class="footer">
            <div class="centerx">
              <vs-button color="success" icon="done" type="filled" @click="changePassword">Salvar</vs-button>
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
import ChangePasswordModel from "@/models/ChangePasswordModel";
import PageTitle from "@/components/shared/PageTitle.vue";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import {httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";

@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class ChangePassword extends Vue {
  model: ChangePasswordModel = new ChangePasswordModel();
  userId = this.$store.state.user.id;

  async changePassword() {
    const validate: boolean = await this.$validator.validateAll();
    if (!validate) return;
    try {
      await httpPost(`${apiRoutes.changePassword}/${this.userId}`, this.model);
      this.$toast.success('Nova senha salva com sucesso!');
      return this.$router.push({name: 'home'});
    } catch (err: any) {
      this.$toast.error('Não foi possivel mudar a senha. Tente novamente mais tarde!');
    }
  }
}
</script>

<style scoped>

</style>