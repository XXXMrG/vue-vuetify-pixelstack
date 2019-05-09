<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs10>
        <material-card title="上传作品">
          <el-row>
            <el-col :span="12" :offset="5">
              <v-text-field v-model="title" label="键入本组作品的标题" color="textField"/>
            </el-col>
            <el-col :span="12" :offset="7">
              <el-upload
                :data="params"
                :headers="head"
                :on-preview="preview"
                :on-success="success"
                ref="upload"
                :auto-upload="true"
                :on-remove="handleRemove"
                class="upload-demo"
                :before-upload="ready"
                drag
                action="http://13.77.160.68:8080/user/upload"
                multiple
                accept=".jpg, .png"
                list-type="picture"
              >
                <i class="el-icon-upload"/>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
            </el-col>
            <el-col :span="12" :offset="5">
              <div class="div-tag">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  :disable-transitions="false"
                  closable
                  @close="handleClose(tag)"
                >{{ tag }}</el-tag>
              </div>
            </el-col>
            <el-col :span="12" :offset="5">
              <div class="div-add-tag">
                <v-text-field
                  v-model="inputValue"
                  color="textField"
                  label="添加新标签，按回车确定"
                  @keyup.enter="handleInputConfirm"
                />
              </div>
            </el-col>
            <el-col :span="12" :offset="5">
              <template>
                <v-btn block color="secondary" dark @click="upload">完成上传</v-btn>
              </template>
            </el-col>
            <el-col :span="24"/>
          </el-row>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.div-tag {
  margin-top: 20px;
}
.div-add-tag {
  margin-top: 20px;
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
      pids: [],
      inputVisible: false,
      inputValue: "",
      title: "",
      // 上传照片时所需的额外参数
      params: {
        uid: window.localStorage.uid,
        title: ""
      },
      // 上传组件走独立的请求，无法通过 axios 请求拦截器增加 toekn
      head: {
        Authorization: window.localStorage.token
      }
    };
  },
  methods: {
    handleClose(tag) {
      // 删除标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleInputConfirm() {
      // 键入回车添加标签
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 点击上传列表中图片的钩子
    preview() {},
    // 上传成功时的钩子
    success(response, file, fileList) {
      console.log(response);
      this.pids.push(response.upload[0].iid);
    },
    // 完成上传的钩子
    upload() {
      this.$api.user
        .addTag({
          pids: this.pids,
          tags: this.dynamicTags
        })
        .then(res => {
          console.log(res);
          if ((res.data.status = 200)) {
            this.$message({
              type: "success",
              message: "作品上传成功"
            });
            // 导航到首页
            this.$router.replace("/pixel");
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(data);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 准备上传前的钩子，设置参数中的 title
    ready(file) {
      this.params.title = this.title;
    }
  }
};
</script>
