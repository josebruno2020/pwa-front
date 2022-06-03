import {requiredMessage} from "@/helpers/validation/validation-helper";


export const createUserRules = {
  name: [
    { required: true, message: requiredMessage('nome'), trigger: 'submit' },
  ],

  birthdate: [
    { required: true, message: requiredMessage('data de nascimento'), trigger: 'submit' },
  ],

  number_category: [
    { required: true, message: requiredMessage('número de registro'), trigger: 'submit' },
  ],

  user_type: [
    { required: true, type: 'number', message: requiredMessage('tipo de usuário'), trigger: 'submit' },
  ],

  email: [
    { required: true, message: requiredMessage('e-mail'), trigger: 'submit' },
    { type:'email', message: 'Campo e-mail deve ser um e-mail válido', trigger: 'submit' },
  ],

  password: [
    { required: true, message: requiredMessage('senha'), trigger: 'submit' },
    { min: 4, message: 'Campo senha deve ter no mínimo 4 dígitos', trigger: 'submit' },
  ],
}