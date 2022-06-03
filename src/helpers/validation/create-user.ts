import {emailValidation, passwordValidation, requiredMessage} from "@/helpers/validation/validation-helper";


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

  email: emailValidation(),

  password: passwordValidation()
}