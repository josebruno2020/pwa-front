<template>
  <main>
    <page-title title="Cadastrar Usuário"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card shadow="hover">
          <div slot="header">
            <h4>
              Informações básicas
            </h4>
          </div>

          <el-form ref="user-form" :model="user" label-width="120px" :rules="rules" label-position="top">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>

            <el-form-item label="Data de Nascimento" prop="birthdate">
              <el-input type="date" v-model="user.birthdate"></el-input>
            </el-form-item>

            <el-form-item label="Número Registro" prop="number_category">
              <el-input v-model="user.number_category"></el-input>
            </el-form-item>

            <div>
              <h4 class="subtitle">
                Informações de acesso
              </h4>
            </div>

            <el-form-item label="Tipo de Usuário" prop="user_type">
              <el-select v-model="user.user_type" clearable placeholder="selecione...">
                <el-option
                    v-for="u in userType"
                    :key="u.type"
                    :label="u.rol"
                    :value="u.type">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="E-mail" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item label="Senha" prop="password">
              <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item label="Confirme sua senha" prop="password_confirmation">
              <el-input type="password" v-model="user.password_confirmation"></el-input>
            </el-form-item>
          </el-form>

          <div class="footer">
            <div class="center">
              <el-button :loading="loading" type="success" @click="submitForm">Salvar</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
import {VForm} from "@/helpers/VFormType";
import {createUserRules} from "@/helpers/validation/create-user";
import {requiredMessage} from "@/helpers/validation/validation-helper";

@Component({
  components: {
    PageTitle,
    ErrorForm
  }
})
export default class CreateUser extends Vue {
  $refs!: {
    form: VForm
  }
  user: User = new User()
  userType: userTypeInterface[] = userType;
  loading = false;
  validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== this.user.password) {
      callback(new Error('Two inputs don\'t match!'));
    } else {
      callback();
    }
  }
  rules = {
    ...createUserRules,
    password_confirmation: [
      {validator: this.validatePass2, message: 'As senhas não são iguais', trigger: 'submit'},
    ]
  }

  async submitForm() {
    await this.$refs['user-form'].validate((valid: boolean) => {
      if (valid) return this.saveUser();
    });
  }

  async saveUser() {
    this.loading = true;
    try {
      const {data} = await httpPost(apiRoutes.users, this.user);
      console.log(data);

      this.$notify.success({
        title: 'Sucesso!',
        message: 'Usuário cadastrado com sucesso'
      });
      return this.$router.push({name: 'listUser'});

    } catch (err: any) {
      this.$notify.error({
        title: 'Sucesso!',
        message: 'Não foi possivel cadastrar o usuário'
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="sass">
</style>