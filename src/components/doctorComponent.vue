<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <v-card>
    <v-card-title>Doctores</v-card-title>
    <table>
      <thead>
      <tr>
        <th class="text-left pa-4">DNI</th>
        <th class="text-left pa-4">Nombre</th>
        <th class="text-left pa-4">Apellido</th>
        <th class="text-left pa-4">Especialidad</th>
        <th class="text-left pa-4">Editar</th>
        <th class="text-left pa-4">Eliminar</th>

        <td>
          <v-btn @click="addOverlay = !addOverlay" color="success" rounded class="glyphicon glyphicon-plus mx-3"></v-btn>
        </td>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(doctor, i) in doctors" :key= i>
        <td class="text-left px-4 py-5">{{doctor.dni}}</td>
        <td class="text-left px-4 py-5">{{doctor.name}}</td>
        <td class="text-left px-4 py-5">{{doctor.surname}}</td>
        <td class="text-left px-4 py-5">{{doctor.speciality}}</td>


        <td>
          <v-btn @click="editD(doctor.dni)" color="warning" rounded class="glyphicon glyphicon-pencil mx-3"></v-btn>
        </td>
        <td>
          <v-btn @click="deleteDoctor(doctor.dni)" color="danger" rounded class="glyphicon glyphicon-trash mx-3"></v-btn>
        </td>
      </tr>
      </tbody>

    </table>

  </v-card>

  <v-overlay v-model ="editOverlay">
    <v-row class="overlayrow">
      <v-col class ="overlaycol">
        <v-card class="mx-auto">
          <v-card-title>Editar Doctor</v-card-title>
          <v-row>
            <v-text-field class="pa-4" placeholder="nombre"
                          v-model="tempDoctor.name"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="apellido"
                          v-model="tempDoctor.surname"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="especialidad"
                          v-model="tempDoctor.speciality"></v-text-field>
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
          <v-card-title>Nuevo Doctor</v-card-title>
          <v-row>
            <v-text-field class="pa-4 mx-3" placeholder="dni"
                          v-model="newDoctor.dni"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="nombre"
                          v-model="newDoctor.name"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="apellido"
                          v-model="newDoctor.surname"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="especialidad"
                          v-model="newDoctor.speciality"></v-text-field>
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
import doctorService from "@/services/doctorService";

export default {
  name: "doctorComponent",
  data:()=> ({
    doctors : [],
    newDoctor: {},
    tempDoctor: {},
    addOverlay: false,
    editOverlay:false
  }),
  methods:{
    retrieveDoctor(){
      doctorService.getAll().then((response)=>{
        console.log(response.data)
        this.doctors=response.data;
      })
    },
    deleteDoctor(id){
      console.log(id)
      doctorService.delete(id).then(console.log(id)).catch(e => {
        console.log(e);
      })
    },
    editDoctor(){
      let doctor = this.tempDoctor
      let id = this.tempDoctor.dni
      console.log(doctor);
      doctorService.update(id,doctor).then(console.log(doctor.id)).catch(e => {
        console.log(e)
      })
      this.retrieveDoctor();
    },

    editD(id){
      this.editOverlay = !this.editOverlay;
      this.tempDoctor.dni = id
      console.log(this.tempDoctor)
    },

    addDoctor(){
      let doctor = this.newDoctor
      console.log(doctor)
      doctorService.create(doctor).catch(e => {
        console.log(e)
      })

    }
  },

  mounted() {
    this.retrieveDoctor();
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
