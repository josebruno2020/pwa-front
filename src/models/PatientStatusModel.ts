export default class PatientStatusModel {
    status_to = ''
    status_from = 0
    companion = ''
    relationship = ''
    obs = ''

    constructor(status_to = '', status_from = 0, companion = '', relationship = '', obs = '') {
        this.status_from = status_from
        this.status_to = status_to
        this.companion = companion
        this.relationship = relationship
        this.obs = obs
    }
}