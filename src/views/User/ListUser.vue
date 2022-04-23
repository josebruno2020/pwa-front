<template>
  <main>
    <page-title title="Usuários cadastrados"/>
    <vs-row class="card" vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="11">
        <vs-card>
          <div class="card-header" slot="header">
            <vs-button line-origin="left" icon="done" color="success" :to="{name: 'createUser'}" type="line">Cadastrar novo usuário</vs-button>

          </div>
          <vs-table  max-items="10" pagination :data="users">
            <template slot="thead">
              <vs-th>
                Nome
              </vs-th>
              <vs-th>
                E-mail
              </vs-th>
              <vs-th>
                Função
              </vs-th>
              <vs-th>
                Ações
              </vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="index" v-for="(user, index) in data">
                <vs-td :data="data[index].name">
                  {{ data[index].name }}
                </vs-td>

                <vs-td :data="data[index].email">
                  {{ data[index].email }}
                </vs-td>

                <vs-td :data="data[index].user_type">
                  {{ userTypes.find(u => u.type === data[index].user_type).rol }}
                </vs-td>
                <vs-td >
                  <vs-avatar @click="editUser(data[index].id)" size="small"  color="warning" icon="border_color" />
                  <vs-button @click="popupActivo=true" color="primary" type="border">Open Default popup</vs-button>
                </vs-td>

              </vs-tr>
            </template>
          </vs-table>
          <vs-popup class="holamundo"  title="Lorem ipsum dolor sit amet" :active.sync="popupActivo">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            </p>
          </vs-popup>


        </vs-card>
      </vs-col>
    </vs-row>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {User} from "@/models/User";
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
  users: User[] = [];
  userTypes: userTypeInterface[] = userType;
  popupActivo = false;

  async created() {
    try {
      const {data} = await httpGet(apiRoutes.users);
      this.users = data.content;
    } catch (err: any) {
      console.log(err);
    }
  }

  async editUser(id: number) {
    alert(`editar ${id}`);
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: end;
  margin-bottom: .5rem;
}
</style>