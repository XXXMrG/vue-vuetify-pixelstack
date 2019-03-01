<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-form ref="form">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field class="purple-input" label="User Name" v-model="newName"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Email Address" class="purple-input" v-model="newEmail"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="New Password"
                    class="purple-input"
                    type="password"
                    hint="修改密码需要重新登录哦"
                    v-model="newPwd"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="Repeat Password"
                    class="purple-input"
                    type="password"
                    v-model="match"
                    :rules="rules"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    clearable
                    hint="向大家介绍一下自己吧"
                    v-model="about"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="commit()"
                  >Update Profile</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p
              class="card-description font-weight-light"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
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
    newName: "",
    newEmail: "",
    newPwd: "",
    match: "",
    about: ""
  }),

  computed: {
    rules() {
      const rules = [];
      if (this.newPwd) {
        const rule = v => (!!v && v) === this.newPwd || "两次密码输入不一致";
        rules.push(rule);
      }
      return rules;
    }
  },

  watch: {
    match: "validateField"
  },
  methods: {
    validateField() {
      this.$refs.form.validate();
    },

    commit() {
        console.log(window.localStorage.uid)
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
            console.log(res);
            this.$message({
              message: "信息修改成功！",
              type: "success"
            });
            if (res.data) {
              router.replace({
                path: "/login",
                query: {
                  redirect: "/user-profile"
                }
              });
            }
          })
          .catch(err => {});
      }
    }
  }
};
</script>
