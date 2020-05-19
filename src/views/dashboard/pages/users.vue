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
        reglas: [
          v => !!v || 'Este campo es requerido.',
          v => /.+@.+/.test(v) || 'E-mail no valido',
        ],
      }
    },
    computed: {
    },
    mounted () {
      this.$http('https://jsonplaceholder.typicode.com/users').then(resultadoFinal => {
        console.log(`Obtenido el resultado final: ${resultadoFinal}`)
      })
    },
    methods: {
      guardarDatos () {
        this.$http.post({
          method: 'post',
          url: 'http://localhost:3000/users',
          data: {
            name: this.name,
            username: this.username,
            email: this.email,
            password_digest: this.pass,
          },
        }).then(resultadoFinal => {
          console.log(`Obtenido el resultado final: ${resultadoFinal}`)
        })
      },
    },

  }
</script>
