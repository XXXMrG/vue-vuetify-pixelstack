<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <v-card>
          <v-img :src="pixel.smallUrl" @click="dialog" aspect-ratio="1"></v-img>
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
    <el-dialog :visible.sync="dialogVisible" lock-scroll :close="onClose">
      <material-img-info :pid="pid"></material-img-info>
    </el-dialog>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    dialogVisible: false,
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
      this.pid = this.pixel.pid;
      this.dialogVisible = true;
    },
    onClose() {
      // 由于 prop 的单向绑定，这里无法实现数据的重新请求，因此主页数据无法实时更新，一定程度上为了复用牺牲了用户体验
    }
  }
};
</script>
