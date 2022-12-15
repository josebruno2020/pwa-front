import {requiredMessage} from "@/helpers/validation/validation-helper";

export const createPatientRules = {
    name: [
        { required: true, message: requiredMessage('nome'), trigger: 'submit' },
    ],

    // birthdate: [
    //     { required: true, message: requiredMessage('data de nascimento'), trigger: 'submit' },
    // ],
    //
    // name_mother: [
    //     { required: true, message: requiredMessage('nome da mãe'), trigger: 'submit' },
    // ],
    //
    // cns: [
    //     { required: true, message: requiredMessage('CNS'), trigger: 'submit' },
    // ],
    //
    // cpf: [
    //     { required: true, message: requiredMessage('CPF'), trigger: 'submit' },
    // ],
    //
    // rg: [
    //     { required: true, message: requiredMessage('RG'), trigger: 'submit' },
    // ],
    //
    // from_city: [
    //     { required: true, message: requiredMessage('Cidade de origem'), trigger: 'submit' },
    // ],
    //
    // from_state: [
    //     { required: true, message: requiredMessage('Estado de origem'), trigger: 'submit' },
    // ],
    //
    // phone_number: [
    //     { required: true, message: requiredMessage('Telefone'), trigger: 'submit' },
    // ],
    //
    // mobile_number: [
    //     { required: true, message: requiredMessage('Celular'), trigger: 'submit' },
    // ],
    //
    // street: [
    //     { required: true, message: requiredMessage('Rua'), trigger: 'submit' },
    // ],
    //
    // number: [
    //     { required: true, message: requiredMessage('Número'), trigger: 'submit' },
    // ],
    //
    // neighborhood: [
    //     { required: true, message: requiredMessage('Bairro'), trigger: 'submit' },
    // ],
    //
    //
    // city: [
    //     { required: true, message: requiredMessage('Cidade'), trigger: 'submit' },
    // ],
    //
    // state: [
    //     { required: true, message: requiredMessage('Estado'), trigger: 'submit' },
    // ],
}