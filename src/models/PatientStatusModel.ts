export default class PatientStatusModel {
    destiny = ''
    status_from = 0
    companion = ''
    relationship = ''
    obs = ''
    is_alta = 1

    constructor(destiny = '', status_from = 0, companion = '', relationship = '', obs = '', is_alta = 1) {
        this.status_from = status_from
        this.destiny = destiny
        this.companion = companion
        this.relationship = relationship
        this.obs = obs
        this.is_alta = is_alta
    }
}