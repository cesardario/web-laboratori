<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="20"
      >
        <base-material-card v-if="create">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Pacientes
            </div>
          </template>

          <v-form
            ref="form"
            v-model="valid"
          >
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="datos.name"
                    class="purple-input"
                    label="Nombres"
                    :rules="[rules.required]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="datos.first_last_name"
                    class="purple-input"
                    label="Apellido Paterno"
                    filled
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="datos.second_last_name"
                    class="purple-input"
                    label="Apellido Materno"
                    filled
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="datos.treating_doctor"
                    label="Medico Tratante"
                    class="purple-input"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Fecha de Nacimiento"
                        hint="DD/MM/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-account-box"
                        @blur="datos.date = parseDate(dateFormatted)"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="datos.birth_day"
                      no-title
                      locale="es-cl"
                      :max="maximo"
                      @input="menu1 = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="3"
                  md="2"
                >
                  <v-select
                    v-model="datos.sex"
                    :rules="[v => !!v || 'Item is required']"
                    :items="sexo"
                    label="Sexo"
                    locale="es-cl"
                    :max="maximo"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    v-if="editar===true"
                    :disabled="!valid"
                    color="success"
                    class="mr-0"
                    @click="guardarDatos"
                  
                  >
                    Guardar
                  </v-btn>
                  <v-btn
                     v-else
                    :disabled="!valid"
                    color="success"
                    class="mr-0"
                    @click="editar_datos(datos)"
                   
                  >
                    Actulizar
                  </v-btn>                  
                  <v-btn color="warning" @click="create = false, editar=true">Salir</v-btn>
                  
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-1"
        >
        
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Pacientes</v-toolbar-title>
          
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" @click="create = true">Agregar</v-btn>

        </v-toolbar>
      </template>    

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="edit(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="dialog3=true ,datos = item"
        >
          mdi-delete
        </v-icon>
      </template>
  </v-data-table>
    <v-snackbar
          v-model="snackbar"
          color="success"
          right="right"
          top="top"
          :timeout="350"
        >
          {{ mns }}
        </v-snackbar>
      </v-col>
    </v-row>
          <v-dialog
            v-model="dialog3"
            max-width="400"
          >
            <v-card>
              <v-card-title>
                Esta seguro en eliminar el paciente?

                <v-spacer />

                <v-icon
                  aria-label="Close"
                  @click="dialog3 = false"
                >
                  mdi-close
                </v-icon>
              </v-card-title>

              <v-card-text class="pb-6 pt-12 text-center">
                <v-btn
                  class="mr-3"
                  text
                  @click="dialog3 = false"
                >
                  cerrar
                </v-btn>

                <v-btn
                  color="success"
                  text
                  @click="eliminar(datos)"
                >
                  Si
                </v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
  </v-container>
</template>

<script>

  export default {
    data (vm) {
      return {
        dialog3:false,
        editar: true,
        create: false,
        editedIndex: -1,
        snackbar: false,
        mns: '',
        data: [],
        valid: true,
        headers: [
          {
            text: 'Folio',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nombre', value: 'name' },
          { text: 'Apellido Paterno', value: 'first_last_name' },
          { text: 'Apellido Materno', value: 'second_last_name' },
          { text: 'Medico atendio ', value: 'treating_doctor' },
          { text: 'Fecha de nacimiento', value: 'birth_day' },
          { text: 'sexo', value: 'sex' },
          { text: 'Operaciones', value: 'actions', sortable: false },
        ],
           datos:{
              name: "",
              first_last_name: "",
              second_last_name: "",
              treating_doctor: "",
              sex:"",
              birth_day: new Date().toISOString().substr(0, 10),
           },
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        maximo: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        sexo: ['hombre', 'mujer'],
        rules: {
          required: v => !!v || 'Este campo es requerido.',
        },
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    mounted () {
      this.consulta()
       },  
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      guardarDatos () {
        this.valid = false
        this.$http.post(
      'http://localhost:5050/patients',
          {
            name: this.datos.name,
            first_last_name: this.datos.first_last_name,
            second_last_name: this.datos.second_last_name,
            treating_doctor: this.datos.treating_doctor,
            birth_day: this.datos.birth_day,
            sex: this.datos.sex,
          },
        ).then(resultadoFinal => {
          if(resultadoFinal.status === 201){
            this.mns = JSON.stringify(resultadoFinal)
            this.snackbar =true
            this.valid =true
            this.consulta()
            this.limpiar()

          }else {
            this.valid =true
          }
        }).catch(error => {
           this.valid =true
           console.log('asdasdasdsa',error)
          });
      },
      consulta () {
      this.$http('http://localhost:5050/patients').then(resultadoFinal => {
        this.data = resultadoFinal.data
      })
      },
      edit (item) {
        this.editar= false
        this.create = true
        this.datos = Object.assign({}, item)
        console.log(JSON.stringify(this.datos))
      },
      editar_datos (item) {
            console.log(item)
            this.$http.put(`http://localhost:5050/patients/${item.id}`, item)
            .then(resultadoFinal => {
                if(resultadoFinal.status === 200){
                  this.mns = JSON.stringify(resultadoFinal)
                  this.snackbar =true
                  this.consulta()

                }else {
                  this.valid =true
                }
              }).catch(error => {
                this.valid =true
                console.log('asdasdasdsa',error)
                });
      },
      eliminar (item) {
             console.log(item)
            this.$http.delete(`http://localhost:5050/patients/${item.id}`, item)
            .then(resultadoFinal => {
                if(resultadoFinal.status === 204){
                  this.mns = JSON.stringify(resultadoFinal)
                  this.dialog3=false
                  this.snackbar =true
                  this.consulta()
                  this.dialog3=false

                }
              }).catch(error => {
                console.log('asdasdasdsa',error)
                });        
      },
      limpiar() {
         this.datos = JSON.stringify({})
      }
    },
  }
</script>
