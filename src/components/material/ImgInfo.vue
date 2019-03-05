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
                  <v-list-tile :key="index" avatar>
                    <v-list-tile-content>
                      <v-list-group v-text="item.content"></v-list-group>
                      <v-list-tile-sub-title v-text="item.cdate" class="text-xs-right"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple @click="report" color="tertiary" flat>
                        <v-icon>mdi-alert-octagon</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="index" :inset="true"></v-divider>
                </template>
              </v-list>
              <v-text-field label="键入评论" v-model="input" :rules="rules" @keyup.enter="submit"></v-text-field>
              <v-btn color="pink" @click="submit">
                <v-icon>edit</v-icon>评论该作品
              </v-btn>
            </material-card>
          </v-flex>
          <v-flex md4>
            <v-layout row wrap class="text-xs-left">
              <v-flex md6>
                <v-btn v-if="isStar" flat icon color="pink" @click="onChange(0)">
                  <v-icon>star</v-icon>
                  :{{detail.star}}
                </v-btn>
                <v-btn v-else flat icon color="tertiary" @click="onChange(0)">
                  <v-icon>mdi-star-outline</v-icon>
                  :{{detail.star}}
                </v-btn>
              </v-flex>
              <v-flex md6>
                <v-btn v-if="isThumb" flat icon color="lightblue" @click="onChange(1)">
                  <v-icon>thumb_up</v-icon>
                  :{{detail.thumb}}
                </v-btn>
                <v-btn v-else flat icon color="tertiary" @click="onChange(1)">
                  <v-icon>mdi-thumb-up-outline</v-icon>
                  :{{detail.thumb}}
                </v-btn>
              </v-flex>
              <v-flex md1>
                <v-icon small>loyalty</v-icon>
              </v-flex>
              <v-flex v-for="tag in detail.tags" :key="tag" md4>{{tag}}</v-flex>
              <v-flex md12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex md4>作者</v-flex>
              <v-flex md8>
                <div>
                  <router-link :to="authorPage">{{detail.author}}</router-link>
                </div>
              </v-flex>
              <v-flex md4>时间</v-flex>
              <v-flex md8>:{{detail.upload}}</v-flex>
              <v-flex md4>浏览量</v-flex>
              <v-flex md8>:{{detail.count}}</v-flex>
              <v-flex md12>
                <template v-if="isOwner">
                  <v-btn block color="error" dark @click="delPic">删除该作品</v-btn>
                </template>
              </v-flex>
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
    rules: [v => !!v || "评论不能为空"],
    isThumb: Boolean,
    isStar: Boolean,
    input: "",
    comments: [
      {
        username: "",
        content: "",
        cdate: ""
      }
    ],
    isOwner: false,
    authorPage: ""
  }),
  props: {
    pid: Number
  },

  watch: {
    input: "validateField"
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    },
    // 判断是否为该图片作者
    judge() {
      this.$api.user
        .getUid({
          username: this.detail.author
        })
        .then(res => {
          // 通过点击的用户 id 来构造动态路由
          this.authorPage = "/user-profile/" + res.data.uid;
          if (res.data.uid.toString() === window.localStorage.uid) {
            this.isOwner = true;
          }
        })
        .catch(err => {});
    },
    // 提交新评论
    submit() {
      if (this.input != "") {
        this.$api.image
          .addComment({
            iid: this.pid,
            uid: window.localStorage.uid,
            content: this.input
          })
          .then(res => {
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "评论成功"
              });
              this.getComment();
              this.input = "";
            }
          })
          .catch(err => {});
      }
    },
    // 读取图片评论列表
    getComment() {
      this.$api.image
        .getCommentsByiid({
          iid: this.pid
        })
        .then(res => {
          this.comments = res.data.comments;
        })
        .catch(err => {});
    },
    // 举报该条不当评论
    report() {},
    //
    onChange(item) {
      switch (item) {
        // 更改收藏状态
        case 0:
          this.isStar = !this.isStar;
          this.$api.image
            .setStar({
              uid: window.localStorage.uid,
              iid: this.pid,
              isStar: this.isStar
            })
            .then(res => {
              this.getImageDetails();
            })
            .catch(res => {});
          break;
        // 更改点赞次数
        case 1:
          this.isThumb = !this.isThumb;
          this.$api.image
            .setThumb({
              uid: window.localStorage.uid,
              iid: this.pid,
              isThumb: this.isThumb
            })
            .then(res => {
              this.getImageDetails();
            })
            .catch(err => {});
          break;
      }
    },
    // 删除该图片
    delPic() {
      this.$confirm("此操作将永久删除该图片与其相关数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.user
            .delPic({
              iid: this.pid
            })
            .then(res => {
              console.log(res);
              this.$router.replace("/user-profile");
              location.reload();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 读取图片详细数据并切割 url
    getImageDetails() {
      this.$api.image
        .getImageDetails({
          iid: this.pid,
          uid: window.localStorage.uid
        })
        .then(res => {
          console.log(res);
          var data = res.data;
          data.url = this.$api.root.getUrl(data.url);
          this.detail = data;
          this.isStar = data.isStar;
          this.isThumb = data.isThumb;
          // 在回调函数中判断，保证数据都已成功渲染
          this.judge();
        })
        .catch(err => {});
    }
  },

  created: function() {
    this.getImageDetails();
    this.getComment();
  }
};
</script>
