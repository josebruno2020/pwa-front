import {requiredMessage} from "@/helpers/validation/validation-helper";

export const changeStatusRules = {
    status_to: [
        { required: true, message: requiredMessage('destino'), trigger: 'submit' },
    ],
}