import {requiredMessage} from "@/helpers/validation/validation-helper";

export const createPatientRules = {
    name: [
        { required: true, message: requiredMessage('nome'), trigger: 'submit' },
    ],
}