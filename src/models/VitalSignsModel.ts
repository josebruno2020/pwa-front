export class VitalSignsModel {
    blood_pressure = ''
    blood_pressure_first = ''
    blood_pressure_second = ''
    heart_pressure = ''
    respiratory_frequency = ''
    axiliary_temperature = ''
    sap = ''
    capillary_blood_glucose = ''

    constructor(
        blood_pressure = '',
        blood_pressure_first = '',
        blood_pressure_second = '',
        heart_pressure = '',
        respiratory_frequency = '',
        axiliary_temperature = '',
        sap = '',
        capillary_blood_glucose = ''
    ) {
        this.blood_pressure = blood_pressure
        this.blood_pressure_first = blood_pressure_first
        this.blood_pressure_second  = blood_pressure_second
        this.heart_pressure = heart_pressure
        this.respiratory_frequency = respiratory_frequency
        this.axiliary_temperature = axiliary_temperature
        this.sap = sap
        this.capillary_blood_glucose = capillary_blood_glucose
    }
}