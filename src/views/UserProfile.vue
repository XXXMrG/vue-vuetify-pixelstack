<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-layout row wrap v-for="i in 10" :key="i">
            <v-flex v-for="i in 12" :key="i" md4>
              <material-my-card :pixel="pixels[0]"></material-my-card>
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
            <v-card-text>
              <router-link to="/pixel">
                <span>Follow: {{follow}}</span>
              </router-link>
              <router-link to="/pixel" class="items">
                <span>Star: {{star}}</span>
              </router-link>
              <router-link to="/pixel" class="items">
                <span>Fans: {{fans}}</span>
              </router-link>
            </v-card-text>
            <v-btn color="success" round class="font-weight-light" to="/edit-profile">Edit profile</v-btn>
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
    pixels: [
      {
        smallUrl:
          "http://47.94.111.235:8080/image/lubenwei/2019-03-03/small/cover02.jpg",
        pid: 100000,
        views: 100000,
        stars: 100000,
        likes: 100000
      }
    ]
  }),

  created: function() {
    this.$api.user
      .getInfo({
        uid: window.localStorage.uid
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
      })
      .catch(err => {});
  }
};
</script>

<style>
.items {
  margin-left: 50px;
}
</style>

