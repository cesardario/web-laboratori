<template>
<v-container id="user-profile" fluid tag="section">
    <v-row>
        <v-col cols="12" md="20">
            <base-material-card v-if="create">
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                        Pacientes
                    </div>
                </template>

                <v-form ref="form" v-model="valid">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.name" class="purple-input" label="Nombres" :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.first_name" class="purple-input" label="Apellido Paterno" filled :rules="[rules.required]" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.last_name" class="purple-input" label="Apellido Materno" filled :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dateFormatted" label="Fecha de Nacimiento" hint="DD/MM/YYYY format" persistent-hint prepend-icon="mdi-account-box" @blur="datos.birth_date = parseDate(dateFormatted)" v-on="on" />
                                    </template>
                                    <v-date-picker v-model="datos.birth_date" no-title locale="es-cl" :max="maximo" @input="menu1 = false" />
                                </v-menu>
                            </v-col>

                            <v-col cols="3" md="2">
                                <v-select v-model="datos.sex" :rules="[v => !!v || 'Item is required']" :items="sexo" label="Sexo" locale="es-cl" :max="maximo" required />
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-text-field v-model="datos.phone" label="Telefono" class="purple-input" type="number" :counter="10" :rules="[rules.required]" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.doctor_attended" label="Medico Tratante" class="purple-input" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.email" class="purple-input" label="Correo" :rules="[rules.emailRules]" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea label="Observaciones" v-model="datos.observations"></v-textarea>
                            </v-col >

                            <v-col cols="12" md="12" >    

<v-autocomplete v-model="select" item-text="name" item-value="name" :items="autoComplete " label="Pruebas" return-object
  multiple
></v-autocomplete>

</v-col>
                            <v-col cols="12" class="text-right">
                                <v-btn v-if="editar=== true" :disabled="!valid" color="success" class="mr-0" @click="guardarDatos">
                                    Guardar
                                </v-btn>
                                <v-btn v-else :disabled="!valid" color="success" class="mr-0" @click="editar_datos(datos)">
                                    Actulizar
                                </v-btn>
                                <v-btn color="warning" @click="create = false,
                     editar=true">
                                    Salir
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </base-material-card>


  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
      >
      </v-text-field>

     <v-col
          cols="12"
          sm="6"
          md="3"
        >
        <v-autocomplete v-model="id" item-text="id" item-value="id" :items="data " label="Folio" 
  
></v-autocomplete>

        </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filterId"
      :search="search"
    >
    
                   <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Pacientes</v-toolbar-title>

                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" @click="create = true">Agregar</v-btn>

                    </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="edit(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="dialog3=true ,datos = item">
                        mdi-delete
                    </v-icon>

        <v-icon small class="mr-2" @click="edit(item)">
        mdi-arrow-bottom-left
                    </v-icon>
                </template> 
    
    
    </v-data-table>
  </v-card>
                {{ id }}




            <v-snackbar v-model="snackbar" color="success" right="right" top="top" :timeout="350">
                {{ mns }}
            </v-snackbar>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog3" max-width="400">
        <v-card>
            <v-card-title>
                Esta seguro en eliminar el paciente?

                <v-spacer />

                <v-icon aria-label="Close" @click="dialog3 = false">
                    mdi-close
                </v-icon>
            </v-card-title>

            <v-card-text class="pb-6 pt-12 text-center">
                <v-btn class="mr-3" text @click="dialog3 = false">
                    cerrar
                </v-btn>

                <v-btn color="success" text @click="eliminar(datos)">
                    Si
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    data(vm) {
        return {
            select:0,
            tipo_estudios:[{
                id:1,
                name:"Codigo"
                
            },{
                id:2,
                name:"nombre"
                
            },{
                id:3,
                name:"abreviatura"
                
            }],
            id:0,
            search:"",
            dialog3: false,
            editar: true,
            create: false,
            editedIndex: -1,
            snackbar: false,
            mns: '',
            data: [],
            items:[],
            autocomplete:[],
            valid: true,
            headers: [{
                    text: 'Folio',
                    align: 'start',
                    value: 'id',
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Apellido Paterno',
                    value: 'first_name'
                },
                {
                    text: 'Apellido Materno',
                    value: 'last_name'
                },
                {
                    text: 'Medico atendio ',
                    value: 'doctor_attended'
                },
                {
                    text: 'Fecha de nacimiento',
                    value: 'birth_date'
                },
                {
                    text: 'sexo',
                    value: 'sex'
                },
                {
                    text: 'Telefono',
                    value: 'phone'
                },
                {
                    text: 'Correo',
                    value: 'email'
                },
                {
                    text: 'Observaciones',
                    value: 'observations'
                },
                {
                    text: 'Operaciones',
                    value: 'actions',
                    sortable: false
                },
            ],
            datos: {
                name: "",
                first_last_name: "",
                second_last_name: "",
                phone: "",
                treating_doctor: "",
                sex: "",
                birth_date: new Date().toISOString().substr(0, 10),
            },
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            maximo: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            sexo: ['hombre', 'mujer','macho','hembra'],
            rules: {
                required: v => !!v || 'Este campo es requerido.',
                emailRules: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'No es correcto el formato del correo'

            },
        }
    },
    computed: {
        ...mapState(['url']),
        computedDateFormatted() {
            return this.formatDate(this.birth_date)
        },
        filterId () {
console.log(this.id)
            if(this.id !== 0  ){
        return  this.data.filter(key => key.id === parseInt(this.id ) )
            }

            return this.data
      },
    autoComplete () {
        console.log(this.autocomplete)
        return  this.autocomplete.reduce(( acc, el  ) => acc.concat(el),[])
      }
    },
    mounted() {
        this.consulta()
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.birth_date)
        },
    },
    methods: {
        formatDate(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        guardarDatos() {
            this.valid = false
            this.$http.post(
                `${this.url}/patients`, {
                    name: this.datos.name,
                    first_name: this.datos.first_name,
                    last_name: this.datos.last_name,
                    doctor_attended: this.datos.doctor_attended,
                    birth_date: this.datos.birth_date,
                    sex: this.datos.sex,
                    phone: this.datos.phone,
                    doctor_attended: this.datos.doctor_attended,
                    email: this.datos.email,
                    observations: this.datos.observations
                },
            ).then(resultadoFinal => {
                if (resultadoFinal.status === 201) {
                    this.mns = JSON.stringify("Los datos se an Guardo Correctamente")
                    this.snackbar = true
                    this.valid = true
                    this.consulta()
                    this.limpiar()

                } else {
                    this.valid = true
                }
            }).catch(error => {
                this.valid = true
            });
        },
        consulta() {
            this.$http(`${this.url}/patients`).then(resultadoFinal => {
                this.data = resultadoFinal.data
            })
              this.$http(`${this.url}/analytes`).then(resultadoFinal => {
                this.autocomplete.push(resultadoFinal.data)

            })
            this.$http(`${this.url}/studies`).then(resultadoFinal => {
                this.autocomplete.push(resultadoFinal.data)

            })
        },
        edit(item) {
            this.editar = false
            this.create = true
            this.datos = Object.assign({}, item)
            console.log(JSON.stringify(this.datos))
        },
        editar_datos(item) {
            console.log(item)
            this.$http.put(`${this.url}/patients/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 200) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.snackbar = true
                        this.consulta()

                    } else {
                        this.valid = true
                    }
                }).catch(error => {
                    this.valid = true
                });
        },
        eliminar(item) {
            console.log(item)
            this.$http.delete(`${this.url}/patients/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 204) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.dialog3 = false
                        this.snackbar = true
                        this.consulta()
                        this.dialog3 = false

                    }
                }).catch(error => {
                    console.log('asdasdasdsa', error)
                });
        },
        limpiar() {
            this.datos.name = "",
                this.datos.first_name = "",
                this.datos.last_name = "",
                this.datos.doctor_attended = "",
                this.datos.birth_date = "",
                this.datos.sex = "",
                this.datos.phone = "",
                this.datos.doctor_attended = "",
                this.datos.email = "",
                this.datos.observations = ""
        }
    },
}
</script>

