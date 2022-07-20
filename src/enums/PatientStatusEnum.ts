export interface PatientStatusInterface {
    status: number;
    description: string;
}

export const patientStatusEnumArray: PatientStatusInterface[] = [
    {
        status: 1,
        description: 'Em Obsersavação'
    },
    {
        status: 2,
        description: 'Entubado'
    },
    {
        status: 3,
        description: 'Hospital'
    },
    {
        status: 4,
        description: 'Alta Médica'
    }
]

export enum PatientStatusEnum {
    OBSERVATION = 1,
    INTUBATED = 2,
    HOSPITAL = 3,
    HOME = 4,
    DIED = 5
}
