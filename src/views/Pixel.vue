<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(item,index) of pixels.slice(1)" :key="index" xs2>
        <material-my-card :pixel="item"></material-my-card>
      </v-flex>
    </v-layout>
    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    myPic:
      "http://47.94.111.235:8080/image/lubenwei/2019-03-03/small/cover02.jpg",
    pixels: [{}]
  }),

  created: function() {
    this.$api.image
      .getImageList({})
      .then(res => {
        for (let data of res.data.imageList) {
          this.$api.root.getOriginalUrl(data.url)
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
  }
};
</script>
