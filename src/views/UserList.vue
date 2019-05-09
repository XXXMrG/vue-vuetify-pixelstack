<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card :title="title">
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="item.username" avatar ripple @click="go(item.username)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.username }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.introduction }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="index"/>
            </template>
          </v-list>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
          <v-spacer/>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{ email }}</h6>
            <h4 class="card-title font-weight-light">{{ username }}</h4>
            <p class="card-description font-weight-light">{{ about }}</p>
            <v-card-text color="lightinfo">
              <v-layout row wrap>
                <v-flex md4>
                  <span>Follow: {{ follow }}</span>
                </v-flex>
                <v-flex md4>
                  <span>Star: {{ star }}</span>
                </v-flex>
                <v-flex md4>
                  <span>Fans: {{ fans }}</span>
                </v-flex>
                <v-btn block color="secondary" dark @click="goback">返回用户主页</v-btn>
              </v-layout>
            </v-card-text>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // add by keith
  data: () => ({
    username: "",
    email: "",
    about: "",
    follow: 0,
    star: 0,
    fans: 0,
    pixels: [{}],
    title: "",
    items: [
      {
        username: "",
        introduction: ""
      }
    ]
  }),

  created: function() {
    // 请求用户个人信息
    this.$api.user
      .getInfo({
        uid: this.$route.params.id
      })
      .then(res => {
        var info = res.data.userInfo;
        this.username = info.username;
        this.email = info.email;
        this.about = info.introduction;
        this.follow = info.follow;
        this.star = info.star;
        this.fans = info.fans;
      })
      .catch(err => {});
    // 请求用户相关列表 (follow & fans)
    switch (this.$route.params.type) {
      case "follow":
        this.title = "我关注的人";
        this.$api.user
          .getFollowers({
            uid: this.$route.params.id
          })
          .then(res => {
            console.log(res);
            this.items = res.data.followers;
          })
          .catch(res => {});
        break;
      case "fans":
        this.title = "我的粉丝们";
        this.$api.user
          .getFans({
            uid: this.$route.params.id
          })
          .then(res => {
            console.log(res);
            this.items = res.data.fans;
          })
          .catch(res => {});
        break;
    }
  },

  methods: {
    goback() {
      const path = "/user-profile/" + this.$route.params.id + "/type/info";
      this.$router.replace(path);
    },
    go(username) {
      this.$api.user
        .getUid({
          username: username
        })
        .then(res => {
          var uid = res.data.uid;
          var path = "/user-profile/" + uid + "/type/info";
          this.$router.replace(path);
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
.items {
  margin-left: 50px;
}
</style>
