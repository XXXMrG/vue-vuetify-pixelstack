<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <v-card>
          <v-img :src="pixel.smallUrl" @click="dialog"></v-img>
          <v-layout row wrap class="caption">
            <v-flex md4>
              <v-icon small>mdi-eye-outline</v-icon>
              {{pixel.views}}
            </v-flex>
            <v-flex md4>
              <v-icon small>mdi-star-outline</v-icon>
              {{pixel.stars}}
            </v-flex>
            <v-flex md4>
              <v-icon small>mdi-thumb-up-outline</v-icon>
              {{pixel.likes}}
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <el-dialog :visible.sync="dialogVisible" lock-scroll>
      <material-img-info :pid="pid"></material-img-info>
    </el-dialog>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    dialogVisible: false,
    myPic:
      "http://47.94.111.235:8080/image/lubenwei/2019-03-04/original/IMG_0653.JPG",
    pid: 157
  }),
  props: {
    pixel: {
      pid: {
        type: Number,
        default: 0
      },
      views: {
        type: Number,
        default: 0
      },
      stars: {
        type: Number,
        default: 0
      },
      likes: {
        type: Number,
        default: 0
      }
    }
  },
  methods: {
    dialog() {
      this.pid = this.pixel.pid
      this.dialogVisible = true
    }
  }
};
</script>
