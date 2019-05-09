<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap>
      <v-flex
        xs12
        md8>
        <material-card
          color="myinfo"
          title="Edit Profile"
          text="Complete your profile">
          <v-form ref="form">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    v-model="newName"
                    color="myprimary"
                    label="User Name"/>
                </v-flex>
                <v-flex
                  xs12
                  md8>
                  <v-text-field
                    v-model="newEmail"
                    label="Email Address"
                    color="myprimary"/>
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field
                    v-model="newPwd"
                    label="New Password"
                    color="myprimary"
                    type="password"
                    hint="修改密码需要重新登录哦"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field
                    v-model="match"
                    :rules="rules"
                    label="Repeat Password"
                    color="myprimary"
                    type="password"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="about"
                    color="myprimary"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    clearable
                    hint="向大家介绍一下自己吧"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="myprimary"
                    @click="commit()"
                  >Update Profile</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md4>
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{ this.newName }}</h6>
            <h4 class="card-title font-weight-light">{{ this.newEmail }}</h4>
            <p class="card-description font-weight-light">{{ this.about }}</p>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // create by keith
  data: () => ({
    newName: '',
    newEmail: '',
    newPwd: '',
    match: '',
    about: ''
  }),

  computed: {
    rules () {
      const rules = []
      if (this.newPwd) {
        const rule = v => (!!v && v) === this.newPwd || '两次密码输入不一致'
        rules.push(rule)
      }
      return rules
    }
  },

  watch: {
    match: 'validateField'
  },

  created: function () {
    this.$api.user
      .getInfo({
        uid: window.localStorage.uid
      })
      .then(res => {
        var info = res.data.userInfo
        this.newName = info.username
        this.newEmail = info.email
        this.about = info.introduction
      })
      .catch(err => {})
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },

    commit () {
      if (this.$refs.form.validate()) {
        this.$api.user
          .edit({
            username: this.newName,
            email: this.newEmail,
            password: this.newPwd,
            introduction: this.about,
            uid: window.localStorage.uid
          })
          .then(res => {
            console.log(res)
            switch (res.data.status) {
              case '200':
                this.$message({
                  message: '信息修改成功！',
                  type: 'success'
                })
                var path =
                  '/user-profile/' + window.localStorage.uid + '/type/info'
                this.$router.replace(path)
                break
              case '201':
                this.$message({
                  message: '信息修改成功！需要重新登录',
                  type: 'success'
                })
                // remove old user info and token
                window.localStorage.clear()
                this.$router.replace({
                  path: '/login',
                  query: {
                    redirect: '/user-profile'
                  }
                })
                break
              default:
                this.$message.error(res.data.message)
            }
          })
          .catch(err => {})
      }
    }
  }
}
</script>
