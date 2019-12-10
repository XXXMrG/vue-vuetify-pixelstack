<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(item, index) of pixels.slice(1)" :key="index" md3 xs12>
        <material-my-card :pixel="item" :onclose="pagechange" />
      </v-flex>
    </v-layout>
    <el-pagination
      :page-count="pageCount"
      layout="prev, pager, next"
      background
      @current-change="pagechange"
    />
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
    getImageList(currentPage = 1, clear) {
      this.$api.image
        .getImageList({
          pageNo: currentPage
        })
        .then(res => {
          this.pageCount = res.data.lastPage
          // 切割 url
          for (let data of res.data.imageList) {
            this.$api.root.getOriginalUrl(data.url)
            const pixel = {
              smallUrl: this.$api.root.getOriginalUrl(data.url),
              pid: data.iid,
              views: data.count,
              stars: data.star,
              likes: data.thumb
            }
            this.pixels.push(pixel)
          }
        })
        .catch(err => {})
    },
    pagechange(val) {
      // 这个钩子里的参数是新的页码
      this.pixels = []
      this.getImageList(val)
    }
  }
}
</script>
