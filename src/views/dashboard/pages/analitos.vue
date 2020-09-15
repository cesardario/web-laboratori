<template>
<v-container id="user-profile" fluid tag="section">
    <v-row>
        <v-col cols="12" md="12">
            <base-material-card>
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                        Especie
                    </div>
                </template>

                <v-form ref="form" v-model="valid">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.name" label="Nombre" :rules="[reglas[0]]" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.specie" label="especie" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="datos.age" type="number" label="años" class="purple-input" :rules="reglas" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="datos.owner" label="Dueño" class="purple-input" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="datos.contact_owner" label="Contacto Dueño" class="purple-input" :rules="[reglas[0]]" />
                            </v-col>
                            <v-col cols="12" md="12">

                                <v-textarea label="Observaciones" v-model="datos.details"></v-textarea>
                            </v-col>

                            <v-col cols=" 12" class="text-right">
                                <v-btn :disabled="!valid" color="success" class="mr-0">
                                    Guardar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </base-material-card>

        </v-col>
    </v-row>
    <regular-tables v-bind:title="titulo"></regular-tables>
</v-container>
</template>

<script>
export default {
    components: {
        RegularTables: () => import('@/views/dashboard/tables/RegularTables')
    },
    data(v) {
        return {
            titulo: "Analitos",
            valid: true,
            datos: {
                name: "",
                species: "",
                age: "",
                owner: "",
                details: "",
            },
            especies: ['felino', 'canino', 'equino'],
            data: [],
            reglas: [
                v => !!v || 'Este campo es requerido.'
            ],

            headers: [{
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'Nombre Paterno',
                    value: 'name'
                },
                {
                    text: 'Apellido ',
                    value: 'fat'
                },
                {
                    text: 'Carbs (g)',
                    value: 'carbs'
                },
                {
                    text: 'Protein (g)',
                    value: 'protein'
                },
                {
                    text: 'Iron (%)',
                    value: 'iron'
                },
            ]
        }
    },

}
</script>
