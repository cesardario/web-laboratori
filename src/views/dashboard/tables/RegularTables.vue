<template>
<v-container id="user-profile" fluid tag="section">
    <v-row>
        <v-data-table :headers="headers" :items="data" class="elevation-1">

            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>{{ title }}</v-toolbar-title>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="inicio">Agregar</v-btn>

                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="edit(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="this.dialog3=true ,datos = item">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-row>
    <v-dialog v-model="this.dialog3" max-width="400">
        <v-card>
            <v-card-title>
                Esta seguro en eliminar el paciente?

                <v-spacer />

                <v-icon aria-label="Close" @click="false_form,
                     editar=true">
                    mdi-close
                </v-icon>
            </v-card-title>

            <v-card-text class="pb-6 pt-12 text-center">
                <v-btn class="mr-3" text @click="this.dialog3 = false">
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
    computed: {
        ...mapState(['dialog3', 'create', 'editar']),
    },
    props: {
        title: {
            type: String,
            default: "Titulo"
        },
        data: {
            type: Array
        },
        headers: {
            type: Array
        }

    },
    data() {
        return {}
    },
    methods: {
        ...mapMutations(['true_form', 'false_form', 'true_editar', 'false_editar']),
        inicio() {
            this.$store.commit('true_editar')
            this.$store.commit('true_form')
        },
        edit(item) {
            console.log(item)
            this.$store.commit('true_form');
            this.$store.commit('false_editar');
            this.datos = Object.assign({}, item)
        },
    }
}
</script>
