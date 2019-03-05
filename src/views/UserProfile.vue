<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="作品列表" text="在这里查看并管理您上传的图片">
          <v-layout row wrap>
            <v-flex v-for="(pixel,index) of pixels.slice(1)" :key="index" md4>
              <material-my-card :pixel="pixel"></material-my-card>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
          <v-spacer></v-spacer>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{email}}</h6>
            <h4 class="card-title font-weight-light">{{username}}</h4>
            <p class="card-description font-weight-light">{{about}}</p>
            <v-card-text class="body-2">
              <router-link :to="followPath">
                <span>Follow: {{follow}}</span>
              </router-link>
              <router-link to="/pixel" class="items">
                <span>Star: {{star}}</span>
              </router-link>
              <router-link :to="fansPath" class="items">
                <span>Fans: {{fans}}</span>
              </router-link>
            </v-card-text>
            <v-btn
              v-if="isOwner"
              color="success"
              round
              class="font-weight-light"
              to="/edit-profile"
            >Edit profile</v-btn>
            <template v-else>
              <v-btn
                v-if="isFollow"
                color="success"
                round
                class="font-weight-light"
                @click="goFollow"
              >Unfollowed</v-btn>
              <v-btn v-else color="success" round class="font-weight-light" @click="goFollow">Follow</v-btn>
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
    isFollow: false
  }),

  created: function() {
    this.followPath = "/user/" + this.$route.params.id + "/type/follow";
    this.fansPath = "/user/" + this.$route.params.id + "/type/fans";
    this.isOwner = this.$route.params.id === window.localStorage.uid;
    this.getData()
    // 请求用户上传的图片
    this.$api.image
      .getImageListByUid({
        uid: this.$route.params.id
      })
      .then(res => {
        for (let data of res.data.imageList) {
          var pixel = {
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
  },

  methods: {
    getData() {
      // 请求用户个人信息
      this.$api.user
        .getInfo({
          uid: this.$route.params.id
        })
        .then(res => {
          console.log(res);
          var info = res.data.userInfo;
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
    goFollow() {
      this.$api.user
        .goFollow({
          isFollow: !this.isFollow,
          uid: window.localStorage.uid,
          fid: this.$route.params.id
        })
        .then(res => {
          console.log(res);
          this.getData()
        })
        .catch(err => {});
    },

    judge() {
      this.$api.user
        .followRelate({
          uid: window.localStorage.uid,
          fid: this.$route.params.id
        })
        .then(res => {
          console.log(res);
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

