<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <material-card color="info" title="登录 PixelStack" text="fuck the world">
          <v-form ref="form">
            <v-container justify-start>
              <v-layout wrap row>
                <v-flex md6 offset-md1>
                  <v-text-field
                    label="输入用户名"
                    class="purple-input"
                    v-model="username"
                    :rules="nameRules"
                  />
                </v-flex>
                <v-flex md6 offset-md1>
                  <v-text-field
                    label="输入密码"
                    class="purple-input"
                    type="password"
                    v-model="pwd"
                    :rules="pwdRules"
                    clearable
                    @keyup.enter="test"
                  />
                </v-flex>
                <v-flex md6 offset-md6>
                  <router-link to="/register">
                    <p class="text-info">还没有账户？点击注册</p>
                  </router-link>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="test()">登录</v-btn>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="test_03()">fuck</v-btn>
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
    username: "",
    pwd: "",
    nameRules: [v => !!v || "用户名不能为空"],
    pwdRules: [v => !!v || "密码不能为空"]
  }),

  watch: {
    username: "validateField",
    pwd: "validateField"
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    },
    // click listener add by keith
    go() {
      if (this.$refs.form.validate()) {
        console.log("yyyy");
        this.$api.user.login();
      }
    },

    test() {
      if (this.$refs.form.validate()) {
        this.$api.user
          .login({
            username: this.username,
            password: this.pwd
          })
          .then(res => {
            console.log(res);
            this.$store.commit("setToken", res.data.userInfo.token);
            this.$store.commit("setUser", res.data.userInfo);
          });
      }
    },

    test_02() {
      this.$store.commit("setToken", "123123");
      this.$store.commit("setUser", {
        username: this.username,
        pwd: this.pwd
      });
    },

    test_03() {
      this.$api.user
        .test_02({})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
