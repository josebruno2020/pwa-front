<template>
  <main>
    <page-title title="Página inicial"/>
    <section class="home">

      <img alt="Vue logo" src="../assets/logo.png" class="logo">
      <p class="text-center">Seja bem-vindo, {{ loggedName }}</p>

      <div class="button">
        <vs-button line-origin="left" icon="done" color="success" :to="{name: 'createPatient'}" type="line">Cadastrar
          novo paciente
        </vs-button>
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
  loggedName = this.$store.state.user.name;


}
</script>

<style scoped>
.home {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  margin-bottom: 1rem;
}

.button {
  margin-top: 2rem;
}

</style>
