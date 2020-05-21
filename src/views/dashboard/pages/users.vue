<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Usuarios
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
                    v-model="name"
                    class="purple-input"
                    label="Nombre"
                    :rules="[reglas[0]]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="username"
                    class="purple-input"
                    label="Usuario"
                    filled
                    :rules="[reglas[0]]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="email"
                    label="Correo"
                    class="purple-input"
                    :rules="reglas"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="pass"
                    type="password"
                    label="Contraseña"
                    class="purple-input"
                    :rules="[reglas[0]]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-0"
                    @click="guardarDatos"
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
        <v-simple-table
            :headers="headers"
            :items="data"
            class="elevation-1"
        
        >

        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    data (v) {
      return {
        valid: true,
        name: '',
        username: '',
        email: '',
        pass: '',
        confirm_password: '',
        data:[],
        reglas: [
          v => !!v || 'Este campo es requerido.',
          v => /.+@.+/.test(v) || 'E-mail no valido',
        ],
        
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nombre Paterno', value: 'name' },
          { text: 'Apellido ', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ]   
      }
    },
    computed: {
    },
    mounted () {
      this.$http('http://localhost:5050/patients').then(resultadoFinal => {
        this.data = resultadoFinal.data
      })
    },
    methods: {
      guardarDatos () {
        this.$http.post({
          method: 'post',
          url: 'http://localhost:5050/users',
          data: {
            name: this.name,
            username: this.username,
            email: this.email,
            password_digest: this.pass,
          },
        }).then(resultadoFinal => {
          this.data = resultadoFinal
        })
      },
    },

  }
</script>
