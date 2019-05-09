<template>
  <v-card flat>
    <v-card-text>
      <v-container
        fluid
        grid-list-md>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-img :src="detail.url"/>
          </v-flex>
          <v-flex xs12>
            <p class="headline">{{ detail.title }}</p>
            <v-text-field
              v-if="isOwner"
              v-model="newTitle"
              class="headline"
              label="修改作品标题"
              @keyup.enter="changeTitle"
            />
          </v-flex>
          <v-flex md8>
            <material-card
              color="commentinfo"
              title="评论列表">
              <v-list three-line>
                <template v-for="(item, index) in comments">
                  <v-subheader
                    v-if="item.username"
                    :key="index">{{ item.username }}:</v-subheader>
                  <v-list-tile
                    :key="index"
                    avatar>
                    <v-list-tile-content>
                      <v-list-group v-text="item.content"/>
                      <v-list-tile-sub-title
                        class="text-xs-right"
                        v-text="item.cdate"/>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        color="tertiary"
                        flat
                        @click="report(item.cid)">
                        <v-icon>mdi-alert-circle</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider
                    :key="index"
                    :inset="true"/>
                </template>
              </v-list>
              <v-textarea
                v-model="input"
                :rules="rules"
                label="键入评论"
                @keyup.enter="submit"/>
              <v-btn
                color="cButton"
                @click="submit">
                <v-icon>edit</v-icon>评论该作品
              </v-btn>
            </material-card>
          </v-flex>
          <v-flex md4>
            <v-layout
              row
              wrap
              class="text-xs-left">
              <v-flex md6>
                <v-btn
                  v-if="isStar"
                  flat
                  icon
                  color="pink"
                  @click="onChange(0)">
                  <v-icon>star</v-icon>
                  :{{ detail.star }}
                </v-btn>
                <v-btn
                  v-else
                  flat
                  icon
                  color="tertiary"
                  @click="onChange(0)">
                  <v-icon>mdi-star-outline</v-icon>
                  :{{ detail.star }}
                </v-btn>
              </v-flex>
              <v-flex md6>
                <v-btn
                  v-if="isThumb"
                  flat
                  icon
                  color="lightblue"
                  @click="onChange(1)">
                  <v-icon>thumb_up</v-icon>
                  :{{ detail.thumb }}
                </v-btn>
                <v-btn
                  v-else
                  flat
                  icon
                  color="tertiary"
                  @click="onChange(1)">
                  <v-icon>mdi-thumb-up-outline</v-icon>
                  :{{ detail.thumb }}
                </v-btn>
              </v-flex>
              <v-flex md1>
                <v-icon small>loyalty</v-icon>
              </v-flex>
              <v-flex
                v-for="tag in detail.tags"
                :key="tag"
                md4>
                <router-link :to="/search/ + tag">{{ tag }}</router-link>
              </v-flex>
              <v-flex md12>
                <v-divider/>
              </v-flex>
              <v-flex md4>作者</v-flex>
              <v-flex md8>
                <div>
                  <router-link :to="authorPage">{{ detail.author }}</router-link>
                </div>
              </v-flex>
              <v-flex md4>上传时间</v-flex>
              <v-flex md8>:{{ detail.upload }}</v-flex>
              <v-flex md4>浏览量</v-flex>
              <v-flex md8>:{{ detail.count }}</v-flex>
              <v-flex md12>
                <template v-if="isOwner">
                  <v-btn
                    block
                    color="pDelete"
                    dark
                    @click="delPic">删除该作品</v-btn>
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
// 图片详情组件，弹窗组件，接收从父组件传来的图片 id
export default {
  props: {
    pid: Number
  },
  data: () => ({
    // 图片详细信息，通过 id 来调用 api
    detail: {
      author: '',
      count: 0,
      star: 0,
      thumb: 0,
      title: '',
      upload: '',
      url: '',
      tags: []
    },
    // 评论验证规则
    rules: [v => !!v || '评论不能为空'],
    isThumb: Boolean,
    isStar: Boolean,
    input: '',
    comments: [
      {
        username: '',
        content: '',
        cdate: '',
        cid: ''
      }
    ],
    // 权限控制
    isOwner: false,
    // 图片作者个人信息页面路由
    authorPage: '',
    newTitle: ''
  }),

  watch: {
    input: 'validateField'
  },
  created: function () {
    this.getImageDetails()
    this.getComment()
  },

  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    // 判断是否为该图片作者
    judge () {
      this.$api.user
        .getUid({
          username: this.detail.author
        })
        .then(res => {
          // 通过点击的用户 id 来构造动态路由
          this.authorPage = '/user-profile/' + res.data.uid + '/type/info'
          if (res.data.uid.toString() === window.localStorage.uid) {
            this.isOwner = true
          }
        })
        .catch(err => {})
      if (
        window.localStorage.authority == 'root' ||
        window.localStorage.authority == 'admin'
      ) {
        this.isOwner = true
      }
    },
    // 提交新评论
    submit () {
      if (this.input != '') {
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
                message: '评论成功'
              })
              this.getComment()
              this.input = ''
            }
          })
          .catch(err => {})
      }
    },
    // 读取图片评论列表
    getComment () {
      this.$api.image
        .getCommentsByiid({
          iid: this.pid
        })
        .then(res => {
          this.comments = res.data.comments
        })
        .catch(err => {})
    },
    // 举报该条不当评论
    report (cid) {
      this.$confirm('确认举报该条评论嘛 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.image
            .report({
              cid: cid
            })
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data.message
              })
            })
            .catch(err => {})
        })
        .catch(() => {})
    },
    //
    onChange (item) {
      switch (item) {
        // 更改收藏状态
        case 0:
          this.isStar = !this.isStar
          this.$api.image
            .setStar({
              uid: window.localStorage.uid,
              iid: this.pid,
              isStar: this.isStar
            })
            .then(res => {
              this.getImageDetails()
            })
            .catch(res => {})
          break
        // 更改点赞次数
        case 1:
          this.isThumb = !this.isThumb
          this.$api.image
            .setThumb({
              uid: window.localStorage.uid,
              iid: this.pid,
              isThumb: this.isThumb
            })
            .then(res => {
              this.getImageDetails()
            })
            .catch(err => {})
          break
      }
    },
    // 删除该图片
    delPic () {
      this.$confirm('此操作将永久删除该图片与其相关数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.user
            .delPic({
              iid: this.pid
            })
            .then(res => {
              console.log(res)
              this.$router.replace('/pixel')
              location.reload()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(err => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 读取图片详细数据并切割 url
    getImageDetails () {
      this.$api.image
        .getImageDetails({
          iid: this.pid,
          uid: window.localStorage.uid
        })
        .then(res => {
          console.log(res)
          var data = res.data
          data.url = this.$api.root.getUrl(data.url)
          this.detail = data
          this.isStar = data.isStar
          this.isThumb = data.isThumb
          // 在回调函数中判断，保证数据都已成功渲染
          this.judge()
        })
        .catch(err => {})
    },
    // 更改图片标题
    changeTitle () {
      this.$confirm('确定修改图片标题？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.image
            .updateTitle({
              iid: this.pid,
              title: this.newTitle
            })
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.newTitle = ''
              this.getImageDetails()
            })
            .catch(err => {})
        })
        .catch(() => {})
    }
  }
}
</script>
