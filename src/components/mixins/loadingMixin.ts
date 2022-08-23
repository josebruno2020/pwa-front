import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import {ElLoadingComponent} from "element-ui/types/loading";


@Mixin
export default class LoadingMixin extends Vue {
  loadingFull: ElLoadingComponent

  openFullScreenLoading() {
    this.loadingFull = this.$loading({
      lock: true,
      text: 'Carregando',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.7)'
    });
  }
}