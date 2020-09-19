import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    url: 'http://localhost:3000',
    dialog3: false,
    create: false,
    editar:false,
    datos:{}

  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    true_form (state) {
      state.create = true
    },
    false_form (state) {
      state.create = false
    },
    true_editar(state){
      state.editar = true
    },
    false_editar(state){
      state.editar = false
    },
    asig_data(state,datos) {
      data = datos
    }

  },
  actions: {

  },
})
