<template>
<v-container id="user-profile" fluid tag="section">
    <v-row>
        <v-col cols="12" md="12">
            <base-material-card>
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                        Area
                    </div>
                </template>

                <v-form ref="form" v-model="valid">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="2">
                                <v-text-field v-model="datos.name" label="Nombre" :rules="[reglas[0]]" />
                            </v-col>

                            <v-col cols="12" md="2">
                                <v-text-field v-model="datos.description" label="especie" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols=" 12" class="text-right">
                                <v-btn :disabled="!valid" @click="guardarDatos" color="success" class="mr-0">
                                    Guardar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

            </base-material-card>

        </v-col>
    </v-row>
    {{ datos.name }} {{ datos.description }}
    <regular-tables v-bind:title="titulo"></regular-tables>

</v-container>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    computed: {
        ...mapState(['url']),
    },
    components: {
        RegularTables: () => import('@/views/dashboard/tables/RegularTables')
    },
    data(v) {
        return {
            valid: true,
            datos: {
                name: "",
                description: ""

            },
            reglas: [
                v => !!v || 'Este campo es requerido.'
            ],
        }
    },
    methods: {
        guardarDatos() {
            this.valid = false
            this.$http.post(
                `${this.url}/areas`, {
                    name: this.datos.name,
                    description: this.datos.first_name,
                },
            ).then(resultadoFinal => {
                if (resultadoFinal.status === 201) {
                    this.mns = JSON.stringify("Los datos se an Guardo Correctamente")

                }
            }).catch(error => {
                console.log(error)
            });
        },
    }

}
</script>

<style >

</style>
