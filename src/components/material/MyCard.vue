<template>
  <v-container >
    <v-layout
      row
      wrap>
      <v-flex md12>
        <v-card>
          <v-img
          :src="pixel.smallUrl"
            :lazy-src="pixel.smallUrl"
            aspect-ratio="1"
            @click="dialog"/>
          <v-layout
            row
            wrap
            class="caption">
            <v-flex md4>
              <v-icon small>mdi-eye-outline</v-icon>
              {{ pixel.views }}
            </v-flex>
            <v-flex md4>
              <v-icon small>mdi-star-outline</v-icon>
              {{ pixel.stars }}
            </v-flex>
            <v-flex md4>
              <v-icon small>mdi-thumb-up-outline</v-icon>
              {{ pixel.likes }}
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="onClose"
      lock-scroll>
      <material-img-info :pid="pid"/>
    </el-dialog>
  </v-container>
</template>

<script>
// 小图组件，参数是从父组件传来的图片信息对象
export default {
  props: {
    pixel: {
      smallUrl: "",
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
    },
    onclose: Function
  },
  data: () => ({
    dialogVisible: false,
    pid: 157
  }),
  methods: {
    dialog () {
      this.pid = this.pixel.pid
      this.dialogVisible = true
    },
    onClose () {
      // 由于 prop 的单向绑定，这里无法实现数据的重新请求，因此主页数据无法实时更新，一定程度上为了复用牺牲了用户体验
      // this.onclose(1)
    }
  }
}
</script>
