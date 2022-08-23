// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mixin, Mixins } from 'vue-mixin-decorator';
import {httpDelete} from "@/services/http";
import LoadingMixin from "@/components/mixins/loadingMixin";

@Mixin
export default class ReportMixin extends Mixins<LoadingMixin>(LoadingMixin) {

    async delete(route: string, reportId: number) {
        this.openFullScreenLoading()
        try {
            await httpDelete(`${route}/${reportId}`);
            this.$notify.success({
                title: 'Sucesso',
                message: 'Relatório deletado com sucesso'
            })
        } catch (err) {
            this.$notify.error({
                title: 'Erro',
                message: 'Não foi possível deletar o relatório'
            })
        } finally {
            this.loadingFull.close()
        }
    }
}