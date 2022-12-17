export class ConductModel {
    conduct = '';
    id: string| number = ''
    constructor(conduct = '', id = '') {
        this.conduct = conduct
        this.id = id
    }
}