export const requiredMessage = (field: string): string => {
    return `Campo ${field} é obrigatório`;
}


export const emailValidation = () => {
    return [
        {required: true, message: requiredMessage('e-mail'), trigger: 'submit'},
        {type: 'email', message: 'Campo e-mail deve ser um e-mail válido', trigger: 'submit'},
    ]
}


export const passwordValidation = () => {
    return [
        {required: true, message: requiredMessage('senha'), trigger: 'submit'},
        {min: 4, message: 'Campo senha deve ter no mínimo 4 dígitos', trigger: 'submit'},
    ]
}