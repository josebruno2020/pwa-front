import {emailValidation, requiredMessage} from "@/helpers/validation/validation-helper";

export const loginRules = {
    email: emailValidation(),

    password: [
        { required: true, message: requiredMessage('senha'), trigger: 'submit' },
        { min: 4, message: 'Campo senha deve ter no mínimo 4 dígitos', trigger: 'submit' },
    ],
}