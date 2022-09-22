<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <v-card>
    <v-card-title>Hospitales</v-card-title>
    <table>
      <thead>
      <tr>
        <th class="text-left pa-4">ID</th>
        <th class="text-left pa-4">Nombre</th>
        <th class="text-left pa-4">Distrito</th>
        <th class="text-left pa-4">Dirección</th>
        <th class="text-left pa-4">Editar</th>
        <th class="text-left pa-4">Eliminar</th>

        <td>
          <v-btn @click="addOverlay = !addOverlay" color="success" rounded class="glyphicon glyphicon-plus mx-3"></v-btn>
        </td>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(hospital, i) in hospitals" :key= i>
        <td class="text-left px-4 py-5">{{hospital.id}}</td>
        <td class="text-left px-4 py-5">{{hospital.name}}</td>
        <td class="text-left px-4 py-5">{{hospital.district}}</td>
        <td class="text-left px-4 py-5">{{hospital.address}}</td>


        <td>
          <v-btn @click="editD(hospital.id)" color="warning" rounded class="glyphicon glyphicon-pencil mx-3"></v-btn>
        </td>
        <td>
          <v-btn @click="deleteDoctor(hospital.id)" color="danger" rounded class="glyphicon glyphicon-trash mx-3"></v-btn>
        </td>
      </tr>
      </tbody>

    </table>

  </v-card>

  <v-overlay v-model ="editOverlay">
    <v-row class="overlayrow">
      <v-col class ="overlaycol">
        <v-card class="mx-auto">
          <v-card-title>Editar Hospital</v-card-title>
          <v-row>
            <v-text-field class="pa-4" placeholder="Nombre"
                          v-model="tempHospital.name"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="Distrito"
                          v-model="tempHospital.district"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="Direccion"
                          v-model="tempHospital.address"></v-text-field>
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
          <v-card-title>Nuevo Hospital</v-card-title>

          <v-row>
            <v-text-field class="pa-4" placeholder="nombre"
                          v-model="newHospital.name"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="distrito"
                          v-model="newHospital.district"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="pa-4" placeholder="direccioó"
                          v-model="newHospital.address"></v-text-field>
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

import hospitalService from "@/services/hospitalService";

export default {
  name: "hospitalComponent",
  data:()=> ({
    hospitals : [],
    newHospital: {},
    tempHospital: {},
    addOverlay: false,
    editOverlay:false
  }),
  methods:{
    retrieveHospital(){
      hospitalService.getAll().then((response)=>{
        console.log(response.data)
        this.hospitals=response.data;
      })
    },
    deleteDoctor(id){
      console.log(id)
      hospitalService.delete(id).then(console.log(id)).catch(e => {
        console.log(e);
      })
    },
    editDoctor(){
      let hospital = this.tempHospital
      let id = this.tempHospital.id
      console.log(hospital);
      hospitalService.update(id,hospital).then(console.log(hospital.id)).catch(e => {
        console.log(e)
      })
      this.retrieveHospital();
    },

    editD(id){
      this.editOverlay = !this.editOverlay;
      this.tempHospital.id = id
      console.log(this.tempHospital)
    },

    addDoctor(){
      let hospital = this.newHospital
      console.log(hospital)
      hospitalService.create(hospital).catch(e => {
        console.log(e)
      })

    }
  },

  mounted() {
    this.retrieveHospital();
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
