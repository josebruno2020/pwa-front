<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script lang="ts">

import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class PageTitle extends Vue {
  @Prop({type: String, required: true}) title;
}
</script>

<style scoped>
.title {
  margin-top: 2rem;
  text-align: center;
}
</style>