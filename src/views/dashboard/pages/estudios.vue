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
                            <v-col cols="12" md="4">
                                <v-text-field v-model="store_datos.code" label="code" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="store_datos.name" label="Nombre" :rules="[reglas[0]]" />
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="store_datos.method" label="Metodo" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="store_datos.tube" label="Tubo" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="store_datos.sample" label="Muestra" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="store_datos.patient_conditions" label="Condicion del paciente" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select type="number" :items="items" item-text="name" item-value="id" v-model="store_datos.area_id" filled label="Areas" :rules="[reglas[0]]"></v-select>
                            </v-col>
                            {{ store_datos.area_id }}

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

            </base-material-card>
            <v-snackbar v-model="snackbar" color="success" right="right" top="top" :timeout="350">
                {{ mns }}
            </v-snackbar>
        </v-col>
    </v-row>
    <regular-tables v-bind:title="titulo" v-bind:data="data" v-bind:headers="headers" v-bind:api="api"></regular-tables>
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
    },
    components: {
        RegularTables: () => import('@/views/dashboard/tables/RegularTables')
    },
    data(v) {
        return {
            api: "studies",
            snackbar: false,
            mns: "",
            titulo: "Estudios",
            items: [],
            valid: true,
            headers: [{
                    text: 'Folio',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'code',
                    value: 'code'
                },
                {
                    text: 'nombre',
                    value: 'name'
                },
                {
                    text: 'metodo',
                    value: 'method'
                },
                {
                    text: 'tubo',
                    value: 'tube'
                },
                {
                    text: 'muestra',
                    value: 'sample'
                },
                {
                    text: 'Condicion de paciente',
                    value: 'patient_conditions'
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

        this.consulta()
    },
    methods: {
        ...mapMutations(['true_form', 'false_form', 'true_editar', 'false_editar', 'get_data', 'asig_data', 'CLEAN_DATA']),
        guardarDatos() {
            this.store_datos.area_id = 2
            this.valid = false
            this.$http.post(
                `${this.url}/${this.api}`, this.store_datos,
            ).then(resultadoFinal => {
                if (resultadoFinal.status === 201) {
                    this.mns = JSON.stringify("Los datos se an Guardo Correctamente")
                    this.valid = true
                    this.consulta()
                    this.limpiar()
                    this.$store.commit('CLEAN_DATA')

                } else {
                    this.valid = true

                }
            }).catch(error => {
                console.log(error)
                this.valid = true

            });

        },
        consulta() {
            this.$http(`${this.url}/${this.api}`).then(resultadoFinal => {
                this.data = resultadoFinal.data
                console.log(this.data)
            })
            this.$http(`${this.url}/areas`).then(resultadoFinal => {
                this.items = resultadoFinal.data
                console.log(this.items)
            })
        },
        editar_datos(item) {
            console.log(item)
            this.$http.put(`${this.url}/${this.api}/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 200) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.snackbar = true
                        this.consulta()
                        this.$store.commit('CLEAN_DATA')

                    } else {
                        this.valid = true
                    }
                }).catch(error => {
                    this.valid = true
                });
        },
        limpiar() {
            this.datos.name = ""
            this.datos.description = ""
        },
        ocultar() {
            this.$store.commit('false_form')
        },
    }

}
</script>

<style >

</style>
