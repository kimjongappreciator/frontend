<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <v-card>
    <v-card-title>Citas</v-card-title>
    <table>
      <thead>
      <tr>
        <th class="text-left pa-4">Fecha</th>
        <th class="text-left pa-4">Id Hospital</th>
        <th class="text-left pa-4">Dni Paciente</th>
        <th class="text-left pa-4">Dni Doctor</th>
        <th class="text-left pa-4">Detalles</th>
        <th class="text-left pa-4">Editar</th>
        <th class="text-left pa-4">Eliminar</th>

        <td>
          <v-btn @click="addOverlay = !addOverlay" color="success" rounded class="glyphicon glyphicon-plus mx-3"></v-btn>
        </td>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(appointment, i) in appointments" :key= i>
        <td class="text-left px-4 py-5">{{appointment.date}}</td>
        <td class="text-left px-4 py-5">{{appointments.hospitalId}}</td>
        <td class="text-left px-4 py-5">{{appointment.patientId}}</td>
        <td class="text-left px-4 py-5">{{appointment.doctorId}}</td>

        <td>
          <v-btn @click="details(appointment.id)" color="warning" rounded class="glyphicon glyphicon-plus mx-3"></v-btn>
        </td>

        <td>
          <v-btn @click="editD(appointment.dni)" color="warning" rounded class="glyphicon glyphicon-pencil mx-3"></v-btn>
        </td>
        <td>
          <v-btn @click="deleteDoctor(appointment.id)" color="danger" rounded class="glyphicon glyphicon-trash mx-3"></v-btn>
        </td>
      </tr>
      </tbody>

    </table>

  </v-card>

  <v-overlay v-model ="editOverlay">
    <v-row class="overlayrow">
      <v-col class ="overlaycol">
        <v-card class="mx-auto">
          <v-card-title>Editar Cita</v-card-title>
          <v-row>
            <v-text-field class="pa-4" placeholder="Fecha"
                          v-model="tempAppointment.date"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="ID Hospital"
                          v-model="tempAppointment.hospitalId"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="DNI Paciente"
                          v-model="tempAppointment.patientId"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="DNI Doctor"
                          v-model="tempAppointment.doctorId"></v-text-field>
          </v-row>
          <v-col>
            <v-btn @click="editDoctor()">Guardar</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="editOverlay= !editOverlay">Cerrar</v-btn>
          </v-col>

        </v-card>
      </v-col>
    </v-row>
  </v-overlay>


  <v-overlay v-model ="addOverlay">
    <v-row class="overlayrow">
      <v-col class ="overlaycol">
        <v-card class="pa-10">
          <v-card-title>Nueva Cita</v-card-title>

          <v-row>
            <v-text-field class="pa-4" placeholder="ID Hospital"
                          v-model="newAppointment.hospitalId"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="DNI Paciente"
                          v-model="newAppointment.patientId"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="DNI Doctor"
                          v-model="newAppointment.doctorId"></v-text-field>
          </v-row>


          <v-col>
            <v-btn @click="addDoctor()">Guardar</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="addOverlay= !addOverlay">Cerrar</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script>
import AppointmentService from "@/services/appointmentService";
import appointmentService from "@/services/appointmentService";

export default {
  name: "appointmentComponent",
  data:()=> ({
    appointments : [],
    newAppointment: {},
    tempAppointment: {},
    addOverlay: false,
    editOverlay:false
  }),
  methods:{
    retrieveAppointment(){
      AppointmentService.getAll().then((response)=>{
        console.log(response.data)
        this.appointments=response.data;
      })
    },
    deleteDoctor(id){
      console.log(id)
      AppointmentService.delete(id).then(console.log(id)).catch(e => {
        console.log(e);
      })
    },
    editDoctor(){
      let appointment = this.tempAppointment
      let id = this.tempAppointment.id
      console.log(appointment);
      AppointmentService.update(id,appointment).then(console.log(appointment.id)).catch(e => {
        console.log(e)
      })
      this.retrieveAppointment();
    },

    editD(id){
      this.editOverlay = !this.editOverlay;
      this.tempAppointment.id = id
      console.log(this.tempAppointment)
    },

    addDoctor(){
      this.newAppointment.date = new Date();
      let appointment = this.newAppointment
      console.log(appointment)
      appointmentService.create(appointment).catch(e => {
        console.log(e)
      })

    },
    details(id){
      AppointmentService.getById(id).then((response)=>{
        console.log(response.data)
        this.tempAppointment=response.data;
      })
      console.log(this.tempAppointment)

    }
  },

  mounted() {
    this.retrieveAppointment();
  }
}
</script>

<style scoped>
.overlaycol{
  position: relative;
  margin-left: 400%;


}
.overlaycol{
  margin-top: 35px;
  position: relative;
  align-self: center;
}
</style>
