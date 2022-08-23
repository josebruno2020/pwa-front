export class UserModel {
    id: number;
    name: string;
    email: string;
    user_type: number;
    password = '';
    password_confirmation = '';
    birthdate: string;
    number_category: string;
    is_first_access: boolean;

    constructor(
                id = 0,
                name = '',
                email = '',
                user_type = 1,
                birthdate = '',
                number_category = '',
                is_first_access = true,
                password = '',
                password_confirmation = ''
    ) {
        this.id = id;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.email = email;
        this.user_type = user_type;
        this.birthdate = birthdate;
        this.number_category = number_category;
        this.is_first_access = is_first_access;
        this.name = name;
    }
}