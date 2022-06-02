<template>
  <main>
    <page-title title="Cadastrar Usuário" />
    <el-row :gutter="20" class="row-main">
      <el-col :span="20">
        <el-card shadow="hover">
          <div slot="header">
            <h4>
              Informações básicas
            </h4>
          </div>

          <el-form ref="user-form" :model="user"  label-width="120px" :rules="rules"  label-position="top">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="user.name"></el-input>               
            </el-form-item>

            <el-form-item label="Data de Nascimento" prop="birthdate">
              <el-input type="date" v-model="user.birthdate"></el-input>               
            </el-form-item>

            <el-form-item label="Número Registro" prop="numberCategory">
              <el-input v-model="user.number_category"></el-input>               
            </el-form-item>

            <div>
              <h4 class="subtitle">
                Informações de acesso
              </h4>
            </div>

            <el-form-item label="Tipo de Usuário" prop="userType">
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

            <el-form-item label="Confirme sua senha" prop="passwordConfirm">
              <el-input type="password" v-model="user.password_confirmation"></el-input>               
            </el-form-item>
          </el-form>

          <div  class="footer">
            <div class="center">
              <el-button  type="success" @click="submitForm">Salvar</el-button>
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
import { VForm } from "@/helpers/VFormType";
import { createUserRules } from "@/helpers/validation/create-user";

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
  user: User = new User();
  userType: userTypeInterface[] = userType;
  loading = false;
  rules = createUserRules

  async submitForm() {
    console.log(this.user);
    
    await this.$refs['user-form'].validate((valid: boolean) => {
      if (valid) return this.saveUser();
    });
  }

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

<style lang="sass">

.row-main 
  width: 100vw
  display: flex
  justify-content: center
  margin: 0 !important

.el-card
  margin-top: .5rem



label 
  padding-bottom: 0 !important
  width: auto
.el-select 
  width: 100%
  

.subtitle
  padding: .8rem 0


.footer 
  padding-top: 1rem
  .center
    display: flex
    justify-content: center


</style>