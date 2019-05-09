<template>
  <v-container>
    <v-layout justify-center>
      <v-flex
        xs12
        sm10
        md8>
        <material-card
          color="myinfo"
          title="注册 PixelStack"
          text="加入 PixelStack 来上传并分享您的作品">
          <v-form ref="form">
            <v-container justify-start>
              <v-layout
                wrap
                row>
                <v-flex
                  md6
                  offset-md1>
                  <v-text-field
                    :counter="max"
                    :rules="userRules"
                    v-model="username"
                    label="输入用户名"
                    color="myprimary"
                  />
                </v-flex>
                <v-flex
                  md6
                  offset-md1>
                  <v-text-field
                    :rules="rules"
                    v-model="pwd"
                    label="输入密码"
                    color="myprimary"
                    type="password"
                  />
                </v-flex>
                <v-flex
                  md6
                  offset-md1>
                  <v-text-field
                    :rules="rules"
                    v-model="model"
                    label="重复输入密码"
                    color="myprimary"
                    type="password"
                    @keyup.enter="register"
                  />
                </v-flex>
                <v-flex
                  md6
                  offset-md6>
                  <router-link to="/login">
                    <p class="text-info">已有账户？直接登录</p>
                  </router-link>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="myprimary"
                    @click="register">注册</v-btn>
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
// from vaildate by keith
export default {
  data: () => ({
    username: '',
    pwd: '',
    max: 16,
    allowSpaces: false,
    model: ''
  }),

  computed: {
    rules () {
      const rules = []
      if (!this.allowSpaces) {
        const rule = v => (v || '').indexOf(' ') < 0 || '不允许出现空格'
        rules.push(rule)
      }

      if (this.pwd) {
        const rule = v => (!!v && v) === this.pwd || '两次密码输入不一致'

        rules.push(rule)
      }

      // add vaild by keith
      const rule = v => !!v || '此为必填字段'
      rules.push(rule)

      return rules
    },
    userRules () {
      const rules = []
      if (this.max) {
        const rule = v =>
          (v || '').length <= this.max ||
          `用户名长度不能超过 ${this.max} 个字符 `
        rules.push(rule)
      }
      if (!this.allowSpaces) {
        const rule = v => (v || '').indexOf(' ') < 0 || '不允许出现空格'
        rules.push(rule)
      }

      // add vaild by keith
      const rule = v => !!v || '此为必填字段'
      rules.push(rule)

      return rules
    }
  },
  // 为属性提供验证监听
  watch: {
    match: 'validateField',
    max: 'validateField',
    model: 'validateField'
  },

  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    // click listener add by keith
    register () {
      if (this.$refs.form.validate()) {
        this.$api.user
          .register({
            username: this.username,
            password: this.pwd
          })
          .then(res => {
            switch (res.status) {
              case 200:
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                this.$router.replace('/login')
                break
            }
          })
          .catch(err => {})
      }
    }
  }
}
</script>
