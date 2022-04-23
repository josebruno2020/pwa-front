export interface userTypeInterface {
    type: number;
    rol: string;
}

export const userType: userTypeInterface[] = [
    {
        type: 1,
        rol: 'Administrador'
    },
    {
        type: 2,
        rol: 'Médico'
    },
    {
        type: 3,
        rol: 'Enfermeiro'
    }
]