<template>
  <main>
    <div>
      <h4 class="subtitle">
        Informações de acesso
      </h4>
    </div>
    <el-form ref="user-form" :model="user" :rules="rules" label-position="top">
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

      <div class="footer">
        <div class="center">
          <el-button :loading="loading" type="success" @click="submitForm">Atualizar</el-button>
        </div>
      </div>
    </el-form>
  </main>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {VForm} from "@/helpers/VFormType";
import {UserModel} from "@/models/UserModel";
import {userType, userTypeInterface} from "@/enums/userType";
import {httpPut} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import {createUserRules} from "@/helpers/validation/create-user";

@Component({
  name: 'EditUser'
})
export default class EditUser extends Vue {
  $refs!: {
    form: VForm
  }
  loading = false
  user: UserModel = new UserModel();
  userType: userTypeInterface[] = userType;
  userId: number;

  rules = createUserRules

  setInformation(user: UserModel) {
    this.user = user;
    this.userId = user.id

    console.log(this.user)
  }

  async submitForm() {
    await this.$refs['user-form'].validate((valid: boolean) => {
      if (valid) return this.editUser();
    });
  }


  async editUser() {
    this.loading = true;
    try {
      const {data} = await httpPut(`${apiRoutes.users}/${this.userId}`, this.user);
      console.log(data);

      this.$notify.success({
        title: 'Sucesso!',
        message: 'Usuário atualizado com sucesso'
      });
      this.user = new UserModel();
      return this.$emit('submit')

    } catch (err: any) {
      let message = 'Não foi possivel atualiar o usuário'
      console.log(err?.response?.status)
      if (err?.response?.status === 422) {
        message = 'E-mail já utilizado no sistema.'
      }
      this.$notify.error({
        title: 'Erro!',
        message
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>