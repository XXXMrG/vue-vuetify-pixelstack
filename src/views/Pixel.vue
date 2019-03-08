<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(item,index) of pixels.slice(1)" :key="index" md2 xs12>
        <material-my-card :pixel="item"></material-my-card>
      </v-flex>
    </v-layout>
    <el-pagination layout="prev, pager, next" background @current-change="pagechange" :page-count="pageCount"></el-pagination>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    pixels: [{}],
    pageCount: 0
  }),

  created: function() {
    this.getImageList()
  },

  methods: {
    getImageList(currentPage = 1) {
      this.$api.image
        .getImageList({
          pageNo: currentPage
        })
        .then(res => {
          this.pageCount = res.data.lastPage
          for (let data of res.data.imageList) {
            this.$api.root.getOriginalUrl(data.url);
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
    pagechange(val) {
      console.log(val);
      this.pixels = []
      this.getImageList(val)
    }
  }
};
</script>
