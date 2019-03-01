<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs10>
        <material-card title="上传作品">
          <el-row>
            <el-col :span="12" :offset="6">
              <el-upload class="upload-demo" drag action="https://www.baidu.com" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
            <el-col :span="12" :offset="5">
              <div class="div-tag">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >{{tag}}</el-tag>
              </div>
            </el-col>
            <el-col :span="12" :offset="5">
              <div class="div-add-tag">
              <v-text-field label="添加新标签" class="purple-input" v-model="inputValue" @keyup.enter="handleInputConfirm"/>
              </div>
            </el-col>
          </el-row>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<style>
.div-tag {
  margin-top: 20px
}
.div-add-tag {
  margin-top: 20px
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin-top: 10px;
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>