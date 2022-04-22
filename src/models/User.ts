export interface UserInterface {
    name: string;
    email: string;
    user_type: number;
    birthdate: string;
    number_category: string;
    is_first_access: boolean;
}

export class User {
    private name: string;
    private email: string;
    private user_type: number;
    private birthdate: string;
    private number_category: string;
    private is_first_access: boolean;

    constructor({name, email, user_type, birthdate, number_category, is_first_access}: UserInterface) {
        this.email = email;
        this.user_type = user_type;
        this.birthdate = birthdate;
        this.number_category = number_category;
        this.is_first_access = is_first_access;
        this.name = name;
    }
}