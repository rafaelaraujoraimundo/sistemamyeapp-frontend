import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import checkPermission from '../../utils/permissions'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    usuario: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, usuario) => {
    state.usuario = usuario
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    checkPermission()
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      
    login({ username: username.trim(), password: password }).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_USER',data.user)
        commit('SET_NAME', data.user.first_name)
        commit('SET_AVATAR', data.user.perfil)
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get Info User
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const user = data
        commit('SET_USER',user)
        commit('SET_NAME', user.first_name)
        commit('SET_AVATAR', user.perfil)
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

