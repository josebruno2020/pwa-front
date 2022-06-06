export class PreExistentSicknessModel {
    sickness = [];
    others = '';
    constructor(
        sickness = [],
        others = ''
    ) {
        this.sickness = sickness;
        this.others = others;
    }
}