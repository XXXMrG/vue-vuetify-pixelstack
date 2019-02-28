<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <material-card color="info" title="注册 PixelStack" text="fuck the world">
          <v-form>
            <v-container justify-start>
              <v-layout wrap row>
                <v-flex md6 offset-md1>
                  <v-text-field label="输入用户名" class="purple-input"/>
                </v-flex>
                <v-flex md6 offset-md1>
                  <v-text-field label="输入密码" class="purple-input" type="password"/>
                </v-flex>
                <v-flex md6 offset-md1>
                  <v-text-field label="重复输入密码" class="purple-input" type="password"/>
                </v-flex>
                <v-flex md6 offset-md6>
                  <router-link to="/login"><p class="text-info">已有账户？直接登录</p></router-link>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">注册</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
