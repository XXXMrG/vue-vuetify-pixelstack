<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      row
      wrap
      justify-center>
      <v-flex xs12>
        <material-card title="评论管理" text="在这里管理涉嫌违规的评论" color="myinfo">
          <v-layout
            row
            wrap
            justify-start>
            <v-flex
              v-for="item in comments"
              :key="item"
              xs10
              offset-xs1>
              <material-card :title="'评论 ID：' + item.cid" color="pink">
                <v-layout
                  row
                  wrap
                  justify-start>
                  <v-flex xs2>评论用户：{{ item.username }}</v-flex>
                  <v-flex
                    xs10
                    offset-xs1>评论内容：{{ item.content }}</v-flex>
                  <v-flex
                    xs4
                    offset-xs9>评论时间：{{ item.cdate }}</v-flex>
                  <v-flex
                    xs4
                    offset-xs8>
                    <v-btn
                      block
                      depressed
                      color="star"
                      @click="dealWithReport(true, item.cid)"
                    >确认违规，删除评论</v-btn>
                    <v-spacer/>
                    <v-btn
                      block
                      depressed
                      color="lightblue"
                      @click="dealWithReport(false, item.cid)"
                    >举报无效，打回举报</v-btn>
                  </v-flex>
                </v-layout>
              </material-card>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    comments: [
      {
        username: '',
        content: '',
        cdata: '',
        cid: ''
      }
    ]
  }),

  created: function () {
    this.getList()
  },

  methods: {
    getList () {
      this.$api.admin
        .getReportComment()
        .then(res => {
          this.comments = res.data.comments
        })
        .catch(err => {})
    },
    dealWithReport (isRight, cid) {
      this.$confirm('请确认处理操作 ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.admin
            .dealWithReport({
              cid: cid,
              reportRight: isRight
            })
            .then(res => {
              this.$message({
                type: 'success',
                message: '处理成功'
              })
              console.log(res)
              this.getList()
            })
            .catch(err => {})
        })
        .catch(() => {})
    }
  }
}
</script>
