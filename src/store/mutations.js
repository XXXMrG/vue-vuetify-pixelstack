// https://vuex.vuejs.org/en/mutations.html

export default {
  // state is a default param to find the state
  setToken (state, params) {
    // token 写入本地存储
    localStorage.token = params
    state.token = params
  },
  setUser (state, params) {
    // 全局维护 uid 和用户身份 authority
    state.user.uid = params.uid
    state.user.authority = params.authority
    localStorage.uid = params.uid
    localStorage.authority = params.authority
  }
}
