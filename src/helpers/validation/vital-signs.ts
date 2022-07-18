import { requiredMessage } from "@/helpers/validation/validation-helper";

export const vitalSignsRules = {
    blood_pressure_first: [
        { required: true, message: requiredMessage('pressão arterial'), trigger: 'submit' },
    ],

    heart_pressure: [
        { required: true, message: requiredMessage('frequência cardíaca'), trigger: 'submit' },
    ],

    respiratory_frequency: [
        { required: true, message: requiredMessage('frequência respiratória'), trigger: 'submit' },
    ],

    axiliary_temperature: [
        { required: true, message: requiredMessage('temperatura axiliar'), trigger: 'submit' },
    ],

    sap: [
        { required: true, message: requiredMessage('sapO²'), trigger: 'submit' },
    ],

    capillary_blood_glucose: [
        { required: true, message: requiredMessage('glicemia capilar'), trigger: 'submit' },
    ],
}