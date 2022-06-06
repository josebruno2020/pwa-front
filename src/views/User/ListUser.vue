<template>
  <main class="container">
    <page-title title="Usuários cadastrados"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="22">
        <div class="row-action">
          <router-link  :to="{name: 'createUser'}" class="router-button">
            <el-button line-origin="left"  plain type="success">Cadastrar novo usuário</el-button>
          </router-link>
        </div>       
        

        <el-card shadow="hover">
          <el-table
            v-loading="loading"
            :data="users"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Nome">
            </el-table-column>
            <el-table-column
              prop="email"
              label="E-mail">
            </el-table-column>
            <el-table-column
              label="Tipo">
              <template slot-scope="scope">{{ userTypes.find(u => u.type === scope.row.user_type).rol  }}</template>
            </el-table-column>
            <el-table-column label="Ações">
              <template slot-scope="scope">
              <!-- <router-link> -->
                <el-button type="warning" circle>
                  {{ scope.row.id }}
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="danger" circle>
                  <i class="el-icon-delete"></i>  
                </el-button>
              <!-- </router-link> -->
              
              </template>
            </el-table-column>
          </el-table>
          </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {UserModel} from "@/models/UserModel";
import {httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import PageTitle from "@/components/shared/PageTitle.vue";
import {userType, userTypeInterface} from "@/enums/userType";

@Component({
  components: {
    PageTitle
  }
})
export default class CreateUser extends Vue {
  users: UserModel[] = [];
  userTypes: userTypeInterface[] = userType;
  loading = true

  async created() {
    try {
      const {data: {content}} = await httpGet(apiRoutes.users);
      this.users = content;
    } catch (err: any) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async editUser(id: number) {
    alert(`editar ${id}`);
  }
}
</script>

<style scoped>
.row-main {
  display: flex;
  justify-content: center;
}
.row-action {
  margin: 2rem 0;
  display: flex;
  justify-content: end;
}

.card-header {
  display: flex;
  justify-content: end;
  margin-bottom: .5rem;
}
</style>