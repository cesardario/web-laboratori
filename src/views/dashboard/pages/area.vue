<template>
<v-container id="user-profile" fluid tag="section">
    <v-row v-if="this.create">
        <v-col cols="12" md="12">
            <base-material-card>
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                        Area
                    </div>
                </template>

                <v-form ref="form" v-model="valid" v-if="this.create">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.name" label="Nombre" :rules="[reglas[0]]" />
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="datos.description" label="Descripcion" />
                            </v-col>
                            <v-col cols=" 12" class="text-right">
                                <v-btn v-if="this.editar === true" :disabled="!valid" color="success" class="mr-0" @click="guardarDatos">
                                    Guardar
                                </v-btn>
                                <v-btn v-else :disabled="!valid" color="success" class="mr-0" @click="editar_datos(datos)">
                                    Actulizar
                                </v-btn>
                                <v-btn color="warning" @click="ocultar">
                                    Salir
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

            </base-material-card>
            <v-snackbar v-model="snackbar" color="success" right="right" top="top" :timeout="350">
                {{ mns }}
            </v-snackbar>
        </v-col>
    </v-row>
    <regular-tables v-bind:title="titulo" v-bind:data="data" v-bind:headers="headers"></regular-tables>

</v-container>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    computed: {
        ...mapState(['url', 'dialog3', 'create', 'editar']),
    },
    components: {
        RegularTables: () => import('@/views/dashboard/tables/RegularTables')
    },
    data(v) {
        return {
            snackbar: false,
            mns: "",
            titulo: "Areas",
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
            datos: {
                name: "",
                description: ""

            },
            data: [],
            reglas: [
                v => !!v || 'Este campo es requerido.'
            ],
        }
    },
    mounted() {
        this.consulta()

    },
    methods: {
        ...mapMutations(['true_form', 'false_form', 'true_editar', 'false_editar', 'get_data']),
        guardarDatos() {

            this.valid = false
            this.$http.post(
                `${this.url}/areas`, {
                    name: this.datos.name,
                    description: this.datos.description,
                },
            ).then(resultadoFinal => {
                if (resultadoFinal.status === 201) {
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
            this.$http(`${this.url}/areas`).then(resultadoFinal => {
                this.data = resultadoFinal.data
            })
        },
        editar_datos(item) {
            console.log(item)
            this.$http.put(`${this.url}/areas/${item.id}`, item)
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
            this.$http.delete(`${this.url}/areas/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 204) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.dialog3 = false
                        this.snackbar = true
                        this.consulta()
                        this.dialog3 = false

                    }
                }).catch(error => {
                    console.log('error', error)
                });
        },
        limpiar() {
            this.datos.name = ""
            this.datos.description = ""
        },
        ocultar() {
            this.limpiar()
            this.$store.commit('false_form')

        },
        updated() {
            console.log("asdasd")
        },
    }

}
</script>

<style >

</style>
