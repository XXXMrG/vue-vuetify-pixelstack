// https://vuex.vuejs.org/en/mutations.html


export default {
  // state is a default param to find the state
  setToken(state,params) {
    // 写入本地存储
    localStorage.token = params
    state.token = params
  },
  setUser(state, params) {
    state.user.uid = params.uid
    state.user.authority = params.authority
    localStorage.uid = params.uid
  }
}
