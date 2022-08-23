import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mixin } from 'vue-mixin-decorator';

@Mixin
export default class EditRowMixin extends Vue {
    editRow(index: number) {
        const formEdit = document.querySelector(`#edit-report-${index}`)
        formEdit?.classList.remove('d-none')
        const report = document.querySelector(`#report-${index}`)
        report?.classList.add('d-none')
    }

    removeEditRow(index: number) {
        const formEdit = document.querySelector(`#edit-report-${index}`)
        formEdit?.classList.add('d-none')
        const report = document.querySelector(`#report-${index}`)
        report?.classList.remove('d-none')
    }
}