import {passwordValidation} from "@/helpers/validation/validation-helper";

export const changePasswordRules = {
    password: passwordValidation()
}