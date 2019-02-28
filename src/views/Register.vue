<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <material-card color="info" title="注册 PixelStack" text="fuck the world">
          <v-form ref="form">
            <v-container justify-start>
              <v-layout wrap row>
                <v-flex md6 offset-md1>
                  <v-text-field
                    label="输入用户名"
                    class="purple-input"
                    :counter="max"
                    :rules="userRules"
                  />
                </v-flex>
                <v-flex md6 offset-md1>
                  <v-text-field
                    label="输入密码"
                    class="purple-input"
                    type="password"
                    :rules="rules"
                    v-model="match"
                  />
                </v-flex>
                <v-flex md6 offset-md1>
                  <v-text-field
                    label="重复输入密码"
                    class="purple-input"
                    type="password"
                    :rules="rules"
                    v-model="model"
                  />
                </v-flex>
                <v-flex md6 offset-md6>
                  <router-link to="/login">
                    <p class="text-info">已有账户？直接登录</p>
                  </router-link>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="go()">注册</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

          <!-- add snackbar by keith -->
          <v-snackbar
            color="warning"
            :bottom="bottom"
            :top="top"
            :left="left"
            :right="right"
            v-model="snackbar"
            dark
          >
            <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
            <div>
              Welcome to
              <b>Vue Material Dashboard</b> - a beautiful freebie for every web developer.
            </div>
            <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
          </v-snackbar>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// from vaildate by keith
export default {
  data: () => ({
    match: "",
    max: 16,
    allowSpaces: false,
    model: "",
    snackbar: false
  }),

  computed: {
    rules() {
      const rules = [];
      if (!this.allowSpaces) {
        const rule = v => (v || "").indexOf(" ") < 0 || "不允许出现空格";
        rules.push(rule);
      }

      if (this.match) {
        const rule = v => (!!v && v) === this.match || "两次密码输入不一致";

        rules.push(rule);
      }

      // add vaild by keith
      const rule = v => !!v || "此为必填字段";
      rules.push(rule);

      return rules;
    },
    userRules() {
      const rules = [];
      if (this.max) {
        const rule = v =>
          (v || "").length <= this.max ||
          `用户名长度不能超过 ${this.max} 个字符 `;
        rules.push(rule);
      }
      if (!this.allowSpaces) {
        const rule = v => (v || "").indexOf(" ") < 0 || "不允许出现空格";
        rules.push(rule);
      }

      // add vaild by keith
      const rule = v => !!v || "此为必填字段";
      rules.push(rule);

      return rules;
    }
  },
  // 为属性提供验证监听
  watch: {
    match: "validateField",
    max: "validateField",
    model: "validateField"
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    },
    // click listener add by keith
    go() {
      if (this.$refs.form.validate()) {
        this["top"] = true;
        this.snackbar = true;
      }
    }
  }
};
</script>
