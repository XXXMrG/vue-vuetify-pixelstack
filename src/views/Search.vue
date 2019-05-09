<template>
  <v-container grid-list-md>
    <material-card title="探索您感兴趣的作品">
      <v-layout
        row
        wrap>
        <v-flex
          xs2
          offset-xs2>
          <v-select
            :items="types"
            v-model="type"
            label="检索依据"/>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="keywords"
            label="输入关键字并键入回车来搜索感兴趣的作品..."
            append-icon="mdi-image-search-outline"
            @keyup.enter="search"
          />
        </v-flex>
        <v-divider/>
        <v-flex
          v-for="(item,index) of pixels"
          :key="index"
          xs3>
          <material-my-card :pixel="item"/>
        </v-flex>
      </v-layout>
    </material-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    pixels: [],
    types: ['标题', '标签', '作者'],
    type: '',
    keywords: ''
  }),

  created: function () {
    this.searchByparam()
  },

  methods: {
    searchByparam () {
      // 这里实际上是在监听路由变化，从而发起检索请求
      switch (this.$route.params.type) {
        case 'all':
          break
        default:
          this.getListBySearch()
          break
      }
    },
    // 全局 api 切割 url 并绑定数据
    cutUrl (list) {
      for (let data of list) {
        this.$api.root.getOriginalUrl(data.url)
        var pixel = {
          smallUrl: this.$api.root.getOriginalUrl(data.url),
          pid: data.iid,
          views: data.count,
          stars: data.star,
          likes: data.thumb
        }
        this.pixels.push(pixel)
      }
    },
    // 这里是通过点击图片详情中的标签而发起的搜索，默认使用标签查询，同时 keyword 通过
    // 路由参数传递
    getListBySearch (type = 'tag', keywords = this.$route.params.type) {
      this.pixels = []
      this.$api.image
        .getListBySearch({
          type: type,
          search: keywords
        })
        .then(res => {
          if (res.data.ImageList == null) {
            this.$message.error('没有检索到相关作品，请换个关键字重试')
            this.keywords = ''
          }
          this.cutUrl(res.data.ImageList)
        })
        .catch(err => {})
    },
    // 通过搜索页面直接发起搜索
    search () {
      var keyword = this.keywords
      switch (this.type) {
        case '标签':
          this.getListBySearch('tag', keyword)
          break
        case '标题':
          this.getListBySearch('title', keyword)
          break
        case '作者':
          this.getListBySearch('author', keyword)
          break
      }
    }
  }
}
</script>
