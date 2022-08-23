import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mixin } from 'vue-mixin-decorator';

@Mixin
export default class DateMixin extends Vue {
    formatDate(createdAt: string): string {
        return new Date(createdAt).toLocaleString()
    }
}