<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-img :src="detail.url"></v-img>
          </v-flex>
          <v-flex xs12>
            <p class="headline">{{detail.title}}</p>
          </v-flex>
          <v-flex md8>
            <material-card color="info" title="评论列表">
              <v-list three-line>
                <template v-for="(item, index) in comments">
                  <v-subheader v-if="item.username" :key="index">{{ item.username }}:</v-subheader>
                  <v-list-tile :key="item.username" avatar>
                    <v-list-tile-content>
                      <v-list-group v-text="item.content"></v-list-group>
                      <v-list-tile-sub-title v-text="item.cdate"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider :key="index" :inset="true"></v-divider>
                </template>
              </v-list>
              <v-text-field label="键入评论" v-model="input"></v-text-field>
              <v-btn color="pink" @click="submit">
                <v-icon>edit</v-icon>评论该作品
              </v-btn>
            </material-card>
          </v-flex>
          <v-flex md4>
            <v-layout row wrap class="text-xs-left">
              <v-flex md6>
                <v-btn flat icon color="pink">
                  <v-icon>star</v-icon>
                  :{{detail.star}}
                </v-btn>
              </v-flex>
              <v-flex md6>
                <v-btn flat icon color="lightblue">
                  <v-icon>thumb_up</v-icon>
                  :{{detail.thumb}}
                </v-btn>
              </v-flex>
              <v-flex md2>
                <v-icon small>loyalty</v-icon>
              </v-flex>
              <v-flex v-for="tag in detail.tags" :key="tag" md3>{{tag}}</v-flex>
              <v-flex md12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex md3>作者</v-flex>
              <v-flex md9>
                <div>{{detail.author}}</div>
              </v-flex>
              <v-flex md3>时间</v-flex>
              <v-flex md9>:{{detail.upload}}</v-flex>
              <v-flex md3>浏览量</v-flex>
              <v-flex md9>:{{detail.count}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    detail: {
      author: "",
      count: 0,
      star: 0,
      thumb: 0,
      title: "",
      upload: "",
      url: "",
      tags: []
    },
    input: "",
    comments: [
      {
        username: "xxx",
        content: "卢本伟牛逼卢本伟牛逼卢本伟牛逼卢本伟牛逼卢本伟牛逼卢本伟牛",
        cdate: "卢本伟牛逼"
      }
    ]
  }),
  props: {
    pid: Number
  },
  methods: {
    // 提交新评论
    submit() {
      this.$api.image
        .addComment({
          iid: this.pid,
          uid: window.localStorage.uid,
          content: this.input
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: "评论成功"
            })
            this.getComment();
            this.input = "";
          }
        })
        .catch(err => {});
    },
    //
    getComment() {
      // 读取图片评论列表
      this.$api.image
        .getCommentsByiid({
          iid: this.pid
        })
        .then(res => {
          console.log(res);
          this.comments = res.data.comments;
        })
        .catch(err => {});
    }
  },

  created: function() {
    // 读取图片详细数据并切割 url
    this.$api.image
      .getImageDetails({
        iid: this.pid
      })
      .then(res => {
        console.log(res);
        var data = res.data;
        data.url = this.$api.root.getUrl(data.url);
        this.detail = data;
      })
      .catch(err => {});
    this.getComment();
  }
};
</script>
