<template>
  <main>
    <page-title title="Página inicial"/>
    <section class="home">

      <img alt="Vue logo" src="../assets/logo.png" class="logo">
      <p v-if="loggedName" class="text-center">Seja bem-vindo(a), {{ loggedName }}</p>

      <div class="button">
        <router-link :to="{name: 'createPatient'}">
          <el-button type="success" plain>Cadastrar
            novo paciente
          </el-button>
        </router-link>
      </div>

    </section>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageTitle from "@/components/shared/PageTitle.vue";

@Component({
  components: {
    PageTitle
  }

})
export default class HomeView extends Vue {
  loggedName = this.$store.state.user?.name ?? null;


}
</script>

<style lang="sass">
.home
  min-height: 80vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center


.logo
  margin-bottom: 1rem

.button
  margin-top: 2rem


</style>
