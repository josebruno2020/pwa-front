<template>
  <main class="show-patient">
    <div class="patient-card">
      <label class="patient-label">NOME COMPLETO:</label>
      <span class="patient-information">{{ patient.name }}</span>
    </div>

    <div class="patient-card">
      <label class="patient-label">NASCIMENTO:</label>
      <span class="patient-information">{{ formatDate(patient.birthdate) }}</span>
    </div>


    <div class="patient-card">
      <label class="patient-label">NOME DA MÂE:</label>
      <span class="patient-information">{{ patient.name_mother }}</span>
    </div>

    <div class="patient-card">
      <label class="patient-label">CPF:</label>
      <span class="patient-information">{{ patient.cpf }}</span>
    </div>

    <div class="patient-card">
      <label class="patient-label">RG:</label>
      <span class="patient-information">{{ patient.rg }}</span>
    </div>

    <div class="patient-card">
      <label class="patient-label">CNS:</label>
      <span class="patient-information">{{ patient.cns }}</span>
    </div>


    <div class="patient-card">
      <label class="patient-label">CIDADE ORIGEM:</label>
      <span class="patient-information">{{ patient.from_city }}</span>
    </div>

    <div class="patient-card">
      <label class="patient-label">ESTADO ORIGEM:</label>
      <span class="patient-information">{{ patient.from_state }}</span>
    </div>

  </main>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {PatientModel} from "@/models/PatientModel";
import {americanToBrazilianFormat} from "@/helpers/date/date-helper";


@Component({
  name: 'ShowPatient'
})
export default class ShowPatient extends Vue {
  patient: PatientModel = new PatientModel()

  setInformation(patient: PatientModel) {
    this.patient = patient
  }

  formatDate(date: string) {
    return americanToBrazilianFormat(date)
  }
}
</script>

<style scoped>
.show-patient {
  padding: 2rem;
  background: #f4f2f8;
  margin-top: 1rem;
  border-radius: 10px;


  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}


.patient-card {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-bottom: 1.5rem;
}
.patient-label {
  font-size: .9rem;
  color: rgba(0, 0, 0, .45);
}

.patient-information {
  font-size: .9rem;
  font-weight: bold;
}
</style>