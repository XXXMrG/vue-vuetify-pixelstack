<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <material-card title="评论管理">
          <v-layout row wrap justify-start>
            <v-flex v-for="item in comments" :key="item" xs8 offset-xs1>
              <material-card :title="item.cid">
                <v-layout row wrap justify-start>
                  <v-flex xs2>{{item.username}}:</v-flex>
                  <v-flex xs10 offset-xs1>{{item.content}}</v-flex>
                  <v-flex xs2 offset-xs10>{{item.cdate}}</v-flex>
                  <v-flex xs2 offset-xs9>
                    <v-btn block depressed color="pink"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn block depressed color="lightblue"></v-btn>
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
        username: "",
        content: "",
        cdata: "",
        cid: ""
      }
    ]
  }),

  methods: {
    getList() {
      this.$api.admin
        .getReportComment()
        .then(res => {
          this.comments = res.data.comments;
        })
        .catch(err => {});
    }
  },

  created: function() {
    this.getList();
  }
};
</script>
