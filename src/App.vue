<template>
  <v-app>
    <v-main>
      <v-toolbar
          elevation="4"
          color="indigo lighten-1"
          title="Crud hospital"
      ></v-toolbar>

      <v-row class="py-10">
        <v-col cols="2">
          <v-card
              elevation="2"
              outlined
              class="mx-auto">
            <v-row class="py-5"></v-row>
            <v-row>
              <v-btn @click="status=0" block color="indigo lighten-1" class="pa-lg-8 mt-4 mb-12 white--text">Citas</v-btn>
            </v-row>
            <v-row>
              <v-btn @click="status=1" block color="indigo lighten-1" class="pa-lg-8 mt-4 mb-12 white--text">Doctores</v-btn>
            </v-row>
            <v-row>
              <v-btn @click="status=2" block color="indigo lighten-1" class="pa-lg-8 mt-4 mb-12 white--text">Hospitales</v-btn>
            </v-row>
            <v-row>
              <v-btn @click="status=3" block color="indigo lighten-1" class="pa-lg-8 mt-4 mb-12 white--text">Pacientes</v-btn>
            </v-row>


           </v-card>
        </v-col>

        <v-col>
          <v-container
              elevation="2"
              outlined
              class="mx-auto">
            <appointment-component v-if="status==0"></appointment-component>
            <doctor-component v-if="status==1"></doctor-component>
            <hospital-component v-if="status==2"></hospital-component>
            <patient-component v-if="status==3"></patient-component>
          </v-container>
        </v-col>
      </v-row>




      <v-footer padless class="bottom-0">
        <v-col
            class="text-center"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Sebastian Chacón</strong>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>


import DoctorComponent from "@/components/doctorComponent";
import AppointmentComponent from "@/components/appointmentComponent";
import HospitalComponent from "@/components/hospitalComponent";
import PatientComponent from "@/components/patientComponent";
export default {
  name: 'App',

  components: {
    PatientComponent,
    HospitalComponent,
    AppointmentComponent,
    DoctorComponent

  },

  data: () => ({
    status: 0,
    items: [

    ],
    //
  }),
}
</script>
