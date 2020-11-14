<template>
<v-container id="user-profile" fluid tag="section">
    <v-row v-if="this.create">
        <v-col cols="12" md="12">
            <base-material-card>
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                        {{ titulo }}
                    </div>
                </template>

                <v-form ref="form" v-model="valid" v-if="this.create">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-autocomplete v-model="paciente" item-text="name" item-value="id" :items="pacientes" dense filled label="Paciente"></v-autocomplete>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-autocomplete v-model="estudio" item-text="name" item-value="id" :items="estudios" dense filled label="Estudios"></v-autocomplete>
                            </v-col>
                            <v-col cols=" 12" class="text-right">
                                <v-btn v-if="this.editar === false" :disabled="!valid" color="success" class="mr-0" @click="guardarDatos">
                                    Guardar
                                </v-btn>
                                <v-btn v-else :disabled="!valid" color="success" class="mr-0" @click="editar_datos(store_datos)">
                                    Actulizar
                                </v-btn>
                                <v-btn color="warning" @click="ocultar">
                                    Salir
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                {{ paciente }} {{ estudio }}

            </base-material-card>
            <v-snackbar v-model="snackbar" color="success" right="right" top="top" :timeout="350">
                {{ mns }}
            </v-snackbar>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    computed: {
        ...mapState(['url', 'create', 'editar', 'store_datos']),
        nombrecompleto() {

        }
    },
    components: {},
    data(v) {
        return {
            estudio: "",
            paciente: 0,
            pacientes: [],
            estudios: [],
            api: "areas",
            snackbar: false,
            mns: "",
            titulo: "Orden de Estudio",
            valid: true,
            headers: [{
                    text: 'Folio',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Descripcion',
                    value: 'description'
                },
                {
                    text: 'Operaciones',
                    value: 'actions',
                    sortable: false
                },
            ],
            data: [],
            reglas: [
                v => !!v || 'Este campo es requerido.'
            ],
        }
    },
    mounted() {

        this.$store.commit('true_form')
        this.$store.commit('false_editar')
        this.consulta()
    },
    methods: {
        ...mapMutations(['true_form', 'false_form', 'true_editar', 'false_editar', 'get_data', 'asig_data', 'CLEAN_DATA']),
        guardarDatos() {
            console.log(this.store_datos)
            this.valid = false
            this.$http.post(
                `${this.url}/areas`, this.store_datos,
            ).then(resultadoFinal => {
                if (resultadoFinal.status === 201) {
                    this.snackbar = true
                    this.mns = JSON.stringify("Los datos se an Guardo Correctamente")

                    this.valid = true
                    this.consulta()
                    this.limpiar()
                } else {
                    this.valid = true

                }
            }).catch(error => {
                console.log(error)
                this.valid = true

            });

        },
        consulta() {
            this.$http(`${this.url}/patients`).then(resultadoFinal => {
                this.pacientes = resultadoFinal.data

            })
            this.$http(`${this.url}/studies`).then(resultadoFinal => {
                this.estudios = resultadoFinal.data

            })

        },
        editar_datos(item) {
            console.log(item)
            this.$http.put(`${this.url}/areas/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 200) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.snackbar = true
                        this.$store.commit('CLEAN_DATA')
                        this.consulta()

                    } else {
                        this.valid = true
                    }
                }).catch(error => {
                    this.valid = true
                });
        },
        limpiar() {

        },
        ocultar() {
            this.$store.commit('false_form')
        },
    }

}
</script>

<style >

</style>
