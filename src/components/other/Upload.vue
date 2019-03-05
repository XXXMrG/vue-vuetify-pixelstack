<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs10>
        <material-card title="上传作品">
          <el-row>
            <el-col :span="12" :offset="5">
              <v-text-field v-model="title" label="键入本组作品的标题"></v-text-field>
            </el-col>
            <el-col :span="12" :offset="7">
              <el-upload
                class="upload-demo"
                drag
                action="http://47.94.111.235:8080/user/upload"
                multiple
                :data="params"
                :headers="head"
                accept=".jpg, .png"
                list-type="picture"
                :on-preview="preview"
                :on-success="success"
                :auto-upload="true"
                ref="upload"
                :on-remove="handleRemove"
                :before-upload="ready"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
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
                <v-text-field
                  label="添加新标签，按回车确定"
                  v-model="inputValue"
                  @keyup.enter="handleInputConfirm"
                />
              </div>
            </el-col>
            <el-col :span="12" :offset="5">
              <template>
                <v-btn block color="secondary" dark @click="upload">完成上传</v-btn>
              </template>
            </el-col>
            <el-col :span="24"></el-col>
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
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      0;
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
          if (res.data.status = 200){
            this.$message({
              type: 'success',
              message: '作品上传成功'
            })
            this.$router.replace('/user-profile')
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