<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <v-card>
    <v-card-title>Pacientes</v-card-title>
    <table>
      <thead>
        <tr>
          <th class="text-left pa-4">DNI</th>
          <th class="text-left pa-4">Nombre</th>
          <th class="text-left pa-4">Apellido</th>
          <th class="text-left pa-4">Distrito</th>
          <th class="text-left pa-4">Sangre</th>
          <th class="text-left pa-4">Genero</th>
          <th class="text-left pa-4">Seguro</th>
          <th class="text-left pa-4">Editar</th>
          <th class="text-left pa-4">Eliminar</th>

          <td>
            <v-btn @click="addOverlay = !addOverlay" color="success" rounded class="glyphicon glyphicon-plus mx-3"></v-btn>
          </td>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, i) in patients" :key= i>
          <td class="text-left px-4 py-5">{{patient.dni}}</td>
          <td class="text-left px-4 py-5">{{patient.name}}</td>
          <td class="text-left px-4 py-5">{{patient.surname}}</td>
          <td class="text-left px-4 py-5">{{patient.district}}</td>
          <td class="text-left px-4 py-5">{{patient.bloodType}}</td>
          <td class="text-left px-4 py-5">{{patient.gender}}</td>
          <td class="text-left px-4 py-5">{{patient.insurance}}</td>

          <td>
            <v-btn @click="editP(patient.dni)" color="warning" rounded class="glyphicon glyphicon-pencil mx-3"></v-btn>
          </td>
          <td>
            <v-btn @click="deletePatient(patient.dni)" color="danger" rounded class="glyphicon glyphicon-trash mx-3"></v-btn>
          </td>
        </tr>
      </tbody>

    </table>

  </v-card>

  <v-overlay v-model ="editOverlay">
    <v-row class="overlayrow">
      <v-col class ="overlaycol">
      <v-card class="mx-auto">
       <v-card-title>Editar Paciente</v-card-title>
        <v-row>
          <v-text-field class="pa-4" placeholder="nombre"
                        v-model="tempPatient.name"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field class="pa-4" placeholder="apellido"
                        v-model="tempPatient.surname"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field class="pa-4" placeholder="distrito"
                        v-model="tempPatient.district"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field class="pa-4" placeholder="sangre"
                        v-model="tempPatient.bloodType"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field class="pa-4" placeholder="genero"
                        v-model="tempPatient.gender"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field class="pa-4" placeholder="seguro"
                        v-model="tempPatient.insurance"></v-text-field>
        </v-row>
        <v-col>
          <v-btn @click="editPatient()">Guardar</v-btn>
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
          <v-card-title>Nuevo Paciente</v-card-title>
          <v-row>
            <v-text-field class="pa-4 mx-3" placeholder="dni"
                          v-model="newPatient.dni"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="nombre"
                          v-model="newPatient.name"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="apellido"
                          v-model="newPatient.surname"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="distrito"
                          v-model="newPatient.district"></v-text-field>
          </v-row>

          <v-row>
            <v-text-field class="pa-4" placeholder="sangre"
                          v-model="newPatient.bloodType"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="genero"
                          v-model="newPatient.gender"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="seguro"
                          v-model="newPatient.insurance"></v-text-field>
          </v-row>
          <v-col>
            <v-btn @click="addPatient()">Guardar</v-btn>
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
import patientService from "@/services/patientService";

export default {
  name: "patientComponent",
  data:()=> ({
    patients : [],
    newPatient: {},
    tempPatient: {},
    addOverlay: false,
    editOverlay:false
  }),
  methods:{
    retrievePatient(){
      patientService.getAll().then((response)=>{
        console.log(response.data)
        this.patients=response.data;
      })
    },
    deletePatient(id){
      console.log(id)
      patientService.delete(id).then(console.log(id)).catch(e => {
            console.log(e);
      })
    },
    editPatient(){
        let patient = this.tempPatient
        let id = this.tempPatient.dni
        console.log(patient);
        patientService.update(id,patient).then(console.log(patient.id)).catch(e => {
        console.log(e)
        })
      this.retrievePatient();
      },

    editP(id){
      this.editOverlay = !this.editOverlay;
      this.tempPatient.dni = id
      console.log(this.tempPatient)
    },

    addPatient(){
      let patient = this.newPatient
      console.log(patient)
      patientService.create(patient).catch(e => {
        console.log(e)
      })

    }
  },

  mounted() {
    this.retrievePatient();
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
