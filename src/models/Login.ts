export interface LoginInterface {
    email: string;
    password: string;
}

export class Login {
    email = '';
    password = '';
    constructor(email = '', password = '') {
        this.email = email;
        this.password = password;
    }
}