export class PatientModel {
    id = '';
    name = '';
    birthdate = '';
    name_mother = '';
    cns = '';
    cpf = '';
    rg = '';
    from_city = '';
    from_state = '';
    phone_number = '';
    mobile_number = '';
    street = '';
    number = '';
    complement = '';
    neighborhood = '';
    city = '';
    state = ''
    status = 0
    constructor(
        name = '',
        birthdate = '',
        name_mother = '',
        cns = '',
        cpf = '',
        rg = '',
        from_city = '',
        from_state = '',
        phone_number = '',
        mobile_number = '',
        street = '',
        number = '',
        complement = '',
        neighborhood = '',
        city = '',
        state = '',
        status = 0
    ) {
        this.name = name;
        this.birthdate = birthdate;
        this.name_mother = name_mother;
        this.cns = cns;
        this.cpf = cpf;
        this.rg = rg;
        this.from_city = from_city;
        this.from_state = from_state;
        this.phone_number = phone_number;
        this.mobile_number = mobile_number;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.status = status;
    }
}