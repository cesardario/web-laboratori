<template>
<v-container id="user-profile" fluid tag="section">
      
       <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
    >
    
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
                <v-icon small @click="dialog3=true ,datos=item">
                    mdi-delete
                </v-icon>
            </template>
    
    </v-data-table>
  </v-card> 
      
      
      
      
      

    <v-dialog v-model="dialog3" max-width="400">
        <v-card>
            <v-card-title>
                Esta seguro en eliminar el Area?

                <v-espacer />

                <v-icon aria-label="Close" @click="false_form ">
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
    <v-snackbar v-model="snackbar" color="success" right="right" top="top" :timeout="350">
        {{ mns }}
    </v-snackbar>
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
        },
        api: {
            type: String,
            default: "api"

        }
    },
    data() {
        return {
            search:"",
            dialog3: false,
            datos: [],
            mns: '',
            snackbar: false,
        }
    },
    methods: {
        ...mapMutations(['true_form', 'false_form', 'true_editar', 'false_editar', 'asig_data', 'CLEAN_DATA']),
        inicio() {
            this.$store.commit('true_form')
            this.$store.commit('false_editar')

        },
        edit(item) {
            console.log(item)
            this.$store.commit('true_form');
            this.$store.commit('true_editar')
            this.$store.commit('asig_data', item)
            console.log(this.store_datos)

        },
        eliminar(item) {
            console.log(item.id)
            this.$http.delete(`${this.url}/${this.api}/${item.id}`, item)
                .then(resultadoFinal => {
                    if (resultadoFinal.status === 204) {
                        this.mns = JSON.stringify(resultadoFinal)
                        this.dialog3 = false
                        this.snackbar = true
                        this.dialog3 = false
                        this.consulta()

                    }
                }).catch(error => {
                    console.log('error', error)
                });
        },
        consulta() {
            this.$http(`${this.url}/${this.api}`).then(resultadoFinal => {
                this.data = resultadoFinal.data
            })
        }
    }
}
</script>
