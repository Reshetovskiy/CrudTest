import Vue from 'vue'
import Vuex from 'vuex'
import {axios} from '@/plugins/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listPosts: []
  },
  mutations: {
    SET(state, payload) {
      state[payload.type] = payload.value
    },
    UPDATE_USER(state, payload) {
      const index = state.listPosts.findIndex(payload => payload.id)
      Object.assign(state.listPosts[index], payload.user)
    },
    NEW_USER(state, payload) {
      console.log(payload, 'vpayload new user')
      state.listPosts.push(payload.user)
    },
    DELETE_USER(state, payload) {
      const index = state.listPosts.findIndex(payload => payload.id)
      state.listPosts.splice(index, 1)
    }
  },
  actions: {
    async getListPost({commit}) {
      try {
        let response = await axios.get(`/users`)
        if (response.status === 200) {
          commit('SET', {type: 'listPosts', value: response.data});
        }
      } catch (e) {
        console.log('errorMessage', e)
      }
    },
    async handleNewUser({commit, dispatch}, user) {
      try {
        let response = await axios.post(`/users/`, {user})
        if (response.status === 201) {
          console.log(response.data, 'response.data')
          commit('NEW_USER', response.data)
        }
      } catch (e) {
        console.log('errorMessage', e)
      }
    },

    async handleEditUser({commit, dispatch}, user) {
      try {
        let response = await axios.put(`/users/${user.id}`, {user})
        if (response.status === 200) {
          console.log(response, 'response')
          commit('UPDATE_USER', response.data);
        }
      } catch (e) {
        console.log('errorMessage', e)
      }
    },
    async handleDeleteUser({commit, dispatch}, id) {
      try {
        let response = await axios.delete(`/users/${id}`)
        if (response.status === 200) {
          commit('DELETE_USER', response.data);
        }
      } catch (e) {
        console.log('errorMessage', e)
      }
    },
  },

})
