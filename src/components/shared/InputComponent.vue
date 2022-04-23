<template>
  <div class="centerx input-div" >
    <vs-input :v-validate="inputRole"
              :name="name"
              :type="inputType"
              :color="errors.has(name) ? 'danger' : 'success'"
              :label-placeholder="placeholder"
              @input="handleInput"
    />
    <error-form  :error="errors.first(name)"></error-form>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import ErrorForm from './ErrorForm.vue';

@Component({
  components: {
    ErrorForm
  }
})
export default class InputComponent extends Vue {
  @Prop({type: String, required: true}) name
  @Prop({type: String, default: 'text'}) inputType;
  @Prop({type: String, required: true}) placeholder
  @Prop({required: true}) value
  @Prop({type: Array}) rules
  // content = this.value;
  data() {
    return {
      content: this.value
    }
  }
  get inputRole() {
    return this.rules.join('|');
  }

  handleInput(e: any) {
    const content = this.value;
    this.$emit('inputHandle', content);
  }

}
</script>

<style scoped>
/*.vs-component {*/
/*  min-width: 80%;*/
/*}*/
/*.input-div {*/
/*  margin-top: .5rem;*/
/*}*/
</style>