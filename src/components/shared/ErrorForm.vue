<template>
  <p class="error">{{ error }}</p>
</template>

<script>
import {Component, Vue, Prop} from "vue-property-decorator";

@Component
export default class ErrorForm extends Vue {
  // @Prop(String) readonly error: string | undefined;
  @Prop({type: String}) error

}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.35rem;
  font-size: 0.7em;
}
</style>