<template>
  <v-container>
    <v-layout justify-center>
      <v-flex
        xs12
        sm10
        md8>
        <material-card
          color="myinfo"
          title="登录 PixelStack"
          text="使用用户名来登录">
          <v-form ref="form">
            <v-container justify-start>
              <v-layout
                wrap
                row>
                <v-flex
                  md6
                  offset-md1>
                  <v-text-field
                    v-model="username"
                    :rules="nameRules"
                    label="输入用户名"
                    color="myprimary"
                  />
                </v-flex>
                <v-flex
                  md6
                  offset-md1>
                  <v-text-field
                    v-model="pwd"
                    :rules="pwdRules"
                    color="myprimary"
                    label="输入密码"
                    type="password"
                    clearable
                    @keyup.enter="login"
                  />
                </v-flex>
                <v-flex
                  md6
                  offset-md6>
                  <router-link to="/register">
                    <p class="text-info">还没有账户？点击注册</p>
                  </router-link>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="myprimary"
                    @click="login()">登录</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    username: '',
    pwd: '',
    nameRules: [v => !!v || '用户名不能为空'],
    pwdRules: [v => !!v || '密码不能为空']
  }),

  watch: {
    username: 'validateField',
    pwd: 'validateField'
  },

  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    // click listener add by keith
    go () {
      if (this.$refs.form.validate()) {
        console.log('yyyy')
        this.$api.user.test().then(res => {
          console.log(res)
        })
      }
    },

    login () {
      if (this.$refs.form.validate()) {
        this.$api.user
          .login({
            username: this.username,
            password: this.pwd
          })
          .then(res => {
            console.log(res)
            switch (res.data.status) {
              case '200':
                this.$store.commit('setToken', res.data.userInfo.token)
                this.$store.commit('setUser', res.data.userInfo)
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                // 重新渲染侧边栏
                location.reload()
                this.$router.replace({
                  path: '/pixel'
                })
                break
              default:
                this.$message.error(res.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
