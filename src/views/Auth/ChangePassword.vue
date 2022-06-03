<template>
  <main>
    <page-title title="Mudar a senha"/>

    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <h5>
              Para sua segurança, é necessário mudar a senha no primeiro acesso!
            </h5>
          </div>

          <el-form @submit.native.prevent="validationForm" ref="password-form" :model="model" label-width="120px"
                   :rules="rules" label-position="top">
            <el-form-item label="Nova Senha" prop="password">
              <el-input type="password" v-model="model.password"></el-input>
            </el-form-item>

            <el-form-item label="Confirme sua nova senha" prop="password_confirmation">
              <el-input type="password" v-model="model.password_confirmation"></el-input>
            </el-form-item>

            <div class="footer">
              <el-button :loading="loading" native-type="submit" type="success">Salvar</el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

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
import {VForm} from "@/helpers/VFormType";
import {changePasswordRules} from "@/helpers/validation/change-password";

@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class ChangePassword extends Vue {
  $refs!: {
    form: VForm
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
        return this.changePassword();
      }
    });
  }

  async changePassword() {
    try {
      await httpPost(`${apiRoutes.changePassword}/${this.userId}`, this.model);
      this.$notify.success({
        title: 'Sucesso!',
        message: 'Nova senha salva com sucesso!'
      })
      return this.$router.push({name: 'home'});
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro!',
        message: 'Não foi possivel mudar a senha. Tente novamente mais tarde!'
      })
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="sass">
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