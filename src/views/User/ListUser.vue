<template>
  <main>
    <page-title title="Usuários cadastrados"/>
    <el-row :gutter="20" class="row-main">
      <el-col :span="22">
        <div class="row-action">
          <router-link  :to="{name: 'createUser'}" class="router-button">
            <el-button :disabled="loggedUser.user_type !== 1" line-origin="left"  plain type="success">Cadastrar novo usuário</el-button>
          </router-link>
        </div>
        <el-card shadow="hover">
          <el-table
            v-loading="loading"
            :data="users"
            style="width: 100%"
            empty-text="Nenhum registro"
            :row-class-name="tableRowClassName">
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
                <el-button :disabled="loggedUser.user_type !== 1" type="warning" circle @click="editUser(scope.row)">
                  <i class="el-icon-edit"></i>
                </el-button>
                <!-- <el-button type="danger" circle @click="confirmDeleteUser(scope.row.id)">
                  <i class="el-icon-delete"></i>  
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="content"
              :current-page="page"
              :page-size="10"
              :pager-count="5"
              layout="prev, pager, next"
              :total="content.total"
              @current-change="changePage">
          </el-pagination>
          </el-card>
      </el-col>
    </el-row>

    <el-dialog
        title="Editar Usuário"
        :visible.sync="showEditUserModal"
        width="90%">
      <edit-user ref="editUserModal" @submit="closeModal" />
    </el-dialog>
  </main>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import {UserModel} from "@/models/UserModel";
import {httpDelete, httpGet} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import PageTitle from "@/components/shared/PageTitle.vue";
import {userType, userTypeInterface} from "@/enums/userType";
import EditUser from "@/components/user/EditUser.vue";
import {VForm} from "@/helpers/VFormType";
import {Mixins} from "vue-mixin-decorator";
import LoadingMixin from "@/components/mixins/loadingMixin";

@Component({
  components: {
    PageTitle,
    EditUser
  }
})
export default class ListUser extends Mixins<LoadingMixin>(LoadingMixin) {
  $refs!: {
    form: VForm
  }
  users: UserModel[] = [];
  userTypes: userTypeInterface[] = userType;
  loading = true
  showEditUserModal = false;
  page = 1
  content: any = null
  loggedUser = null

  async created() {
    this.loggedUser = this.$store.state.user
    await this.fetchUsers();
  }

  async fetchUsers() {
    this.loading = true
    try {
      const {data: {content}} = await httpGet(apiRoutes.users, { page: this.page });
      this.users = content.data;
      this.content = content
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível buscar os usuários'
      })
    } finally {
      this.loading = false;
    }
  }

  changePage(newPage) {
    this.page = newPage
    return this.fetchUsers();
  }

  tableRowClassName({row, rowIndex}) {
    if(Number(rowIndex)/2 == 0) {
      return 'warning-row'
    }
    return ''
  }

  async editUser(user: UserModel) {
    this.showEditUserModal = true

    this.$nextTick(() => {
      return this.$refs['editUserModal'].setInformation(user)
    })
  }

  closeModal() {
    this.showEditUserModal = false
    return this.fetchUsers()
  }

  confirmDeleteUser(userId: string | number) {
    this.$confirm('Tem certeza que deseja deletar o Usuário com TODOS os dados e histórico?', 'Atenção', {
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      dangerouslyUseHTMLString: true,
      type: 'warning'
    }).then(() => {
      this.openFullScreenLoading()
      // this.deletePatient(patientId)
    });
  }

  async deleteUser(userId: string | number) {
    try {
      await httpDelete(`${apiRoutes.users}/${userId}`);
      this.$notify.success({
        title: "Sucesso!",
        message: 'Usuário excluido com sucesso!'
      })
      await this.fetchUsers()
    } catch (err: any) {
      this.$notify.error({
        title: 'Erro',
        message: 'Não foi possível deletar o paciente.'
      })
    } finally {
      this.loadingFull.close();
    }
  }
}
</script>

<style scoped>
.row-main {
  display: flex;
  justify-content: center;
}
</style>