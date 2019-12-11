<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card :title="title" :text="subtitle" color="myinfo">
          <v-layout row wrap>
            <v-flex v-for="(pixel,index) of pixels" :key="index" md4>
              <material-my-card :pixel="pixel"/>
            </v-flex>
          </v-layout>
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
            <v-card-text class="body-2">
              <router-link :to="followPath">
                <span color="lightinfo">Follow: {{ follow }}</span>
              </router-link>
              <el-button type="text" class="items" @click="goStar">
                <span color="lightinfo">Star: {{ star }}</span>
              </el-button>
              <router-link :to="fansPath" class="items">
                <span color="lightinfo">Fans: {{ fans }}</span>
              </router-link>
            </v-card-text>
            <v-btn
              v-if="isOwner"
              color="darkinfo"
              round
              class="font-weight-light"
              to="/edit-profile"
            >Edit profile</v-btn>
            <template v-else>
              <v-btn
                v-if="isFollow"
                color="darkinfo"
                round
                class="font-weight-light"
                @click="goFollow"
              >Unfollowed</v-btn>
              <v-btn
                v-else
                color="darkinfo"
                round
                class="font-weight-light"
                @click="goFollow"
              >Follow</v-btn>
            </template>
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
    isOwner: false,
    followPath: "",
    fansPath: "",
    starPath: "",
    isFollow: false,
    title: "",
    subtitle: ""
  }),

  watch: {
    // 监听路由以响应路由参数变化
    $route: "getInfo",
    followPath: "getData"
  },

  created: function() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      // 根据路由参数构造页面关联的路由
      this.followPath = "/user/" + this.$route.params.id + "/type/follow";
      this.fansPath = "/user/" + this.$route.params.id + "/type/fans";
      this.starPath = "/user-profile/" + this.$route.params.id + "/type/star";
      // 判断用户权限
      this.isOwner = this.$route.params.id === window.localStorage.uid;
      // 清空并获取新的数据
      this.pixels = [];
      this.getTitle();
      this.getData();
      this.getPic();
    },
    getTitle() {
      // 判断用户当前列表
      switch (this.$route.params.type) {
        case "info":
          this.title = "作品列表";
          this.subtitle = "在这里查看并管理您的作品";
          break;
        case "star":
          this.title = "收藏列表";
          this.subtitle = "在这里查看并管理您收藏的作品";
          break;
      }
    },
    getData() {
      // 请求用户个人信息
      this.$api.user
        .getInfo({
          uid: this.$route.params.id
        })
        .then(res => {
          const info = res.data.userInfo;
          this.username = info.username;
          this.email = info.email;
          this.about = info.introduction;
          this.follow = info.follow;
          this.star = info.star;
          this.fans = info.fans;
          this.judge();
        })
        .catch(err => {});
    },
    getPic() {
      this.pixels = []
      switch (this.$route.params.type) {
        case "info":
          // 请求用户上传的图片
          this.$api.image
            .getImageListByUid({
              uid: this.$route.params.id
            })
            .then(res => {
              for (let data of res.data.imageList) {
                const pixel = {
                  smallUrl: this.$api.root.getOriginalUrl(data.url),
                  pid: data.iid,
                  views: data.count,
                  stars: data.star,
                  likes: data.thumb
                };
                this.pixels.push(pixel);
              }
            })
            .catch(err => {});
          break;
        case "star":
          this.$api.image
            .myStars({
              uid: this.$route.params.id
            })
            .then(res => {
              for (let data of res.data.starList) {
                const pixel = {
                  smallUrl: this.$api.root.getOriginalUrl(data.url),
                  pid: data.iid,
                  views: data.count,
                  stars: data.star,
                  likes: data.thumb
                };
                this.pixels.push(pixel);
              }
            })
            .catch(err => {});
          break;
      }
    },
    goFollow() {
      // 关注或取消关注用户
      this.$api.user
        .goFollow({
          isFollow: !this.isFollow,
          uid: window.localStorage.uid,
          fid: this.$route.params.id
        })
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(err => {});
    },
    goStar() {
      // 访问用户 star 列表
      // route 的改变会重新触发 create
      this.$router.replace(this.starPath);
    },
    judge() {
      // 判断用户是否已经关注该用户
      this.$api.user
        .followRelate({
          uid: window.localStorage.uid,
          fid: this.$route.params.id
        })
        .then(res => {
          this.isFollow = res.data.isFollow;
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
