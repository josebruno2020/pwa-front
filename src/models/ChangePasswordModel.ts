export default class ChangePasswordModel {
    password = '';
    password_confirmation = '';
    constructor(
        password = '',
        password_confirmation = ''
    ) {
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
}