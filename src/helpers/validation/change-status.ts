import {requiredMessage} from "@/helpers/validation/validation-helper";

export const changeStatusRules = {
    destiny: [
        { required: true, message: requiredMessage('destino'), trigger: 'submit' },
    ],

    is_alta: [
        { required: true, message: requiredMessage('recebeu alta'), trigger: 'submit' },
    ],
}