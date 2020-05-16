<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="rigth">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Pacientes
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
                    v-model="nombre"
                    class="purple-input"
                    label="Nombres"
                    :rules="[rules.required]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="apellido_paterno"
                    class="purple-input"
                    label="Apellido Paterno"
                    filled
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="apellido_materno"
                    class="purple-input"
                    label="Apellido Materno"
                    filled
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="medico_tratante"
                    label="Medico Tratante"
                    class="purple-input"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Fecha de Nacimiento"
                        hint="DD/MM/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-account-box"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      locale="es-cl"
                      :max="maximo"
                      @input="menu1 = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="3"
                  md="2"
                >
                  <v-select
                    v-model="selecionado"
                    :rules="[v => !!v || 'Item is required']"
                    :items="sexo"
                    label="Sexo"
                    locale="es-cl"
                    :max="maximo"
                    required
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
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  ID
                </th>
                <th class="text-left">
                  Nombre
                </th>
                <th class="text-left">
                  Apellidos
                </th>
                <th class="text-left">
                  Medico Refiere
                </th>
                <th class="text-left">
                  Fecha de Nacimiento
                </th>
                <th class="text-left">
                  Sexo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,index) of patient"
                :key="item.id"
              >
                <td>{{ index }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    data (vm) {
      return {
        valid: true,
        patient: [],
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        medico_tratante: '',
        email: '',
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        maximo: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        sexo: ['hombre', 'mujer'],
        selecionado: '',
        rules: {
          required: v => !!v || 'Este campo es requerido.',
        },
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

    },
  }
</script>
