import {emailValidation, passwordValidation} from "@/helpers/validation/validation-helper";

export const loginRules = {
    email: emailValidation(),

    password: passwordValidation()
}