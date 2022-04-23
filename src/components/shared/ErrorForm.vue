<template>
  <p class="error">{{ error }}</p>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";

@Component
export default class ErrorForm extends Vue {
  @Prop({type: String}) error

}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.35rem;
  font-size: 0.75em;
}
</style>