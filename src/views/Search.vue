<template>
  <v-container grid-list-md>
    <material-card title="探索您感兴趣的作品">
      <v-layout row wrap>
        <v-flex xs1 offset-xs3>
          <v-select label="检索依据" :items="types" v-model="type"></v-select>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="输入关键字并键入回车来搜索感兴趣的作品..."
            append-icon="mdi-image-search-outline"
            @keyup.enter="search"
            v-model="keywords"
          ></v-text-field>
        </v-flex>
        <v-divider></v-divider>
        <v-flex v-for="(item,index) of pixels" :key="index" xs3>
          <material-my-card :pixel="item"></material-my-card>
        </v-flex>
      </v-layout>
    </material-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    pixels: [],
    types: ["标题", "标签", "作者"],
    type: "",
    keywords: ""
  }),

  created: function() {
    this.searchByparam();
  },

  methods: {
    searchByparam() {
      switch (this.$route.params.type) {
        case "all":
          break;
        default:
          this.getListBySearch();
          break;
      }
    },
    cutUrl(list) {
      for (let data of list) {
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
    },
    getListBySearch(type = "tag", keywords = this.$route.params.type) {
      this.pixels = [];
      this.$api.image
        .getListBySearch({
          type: type,
          search: keywords
        })
        .then(res => {
          console.log(res);
          this.cutUrl(res.data.ImageList);
        })
        .catch(err => {});
    },
    search() {
      var keyword = this.keywords;
      switch (this.type) {
        case "标签":
          this.getListBySearch("tag", keyword);
          break;
        case "标题":
          this.getListBySearch("title", keyword);
          break;
        case "作者":
          this.getListBySearch("author", keyword);
          break;
      }
    }
  }
};
</script>
