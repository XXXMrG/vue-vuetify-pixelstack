// https://vuex.vuejs.org/en/mutations.html


export default {
  // state is a default param to find the state
  setToken(state,t) {
    console.log(t)
    localStorage.token = t
    state.token = t
    console.log(state.token)
  },
  setUser(state, params) {
    state.user = params
  }
}
