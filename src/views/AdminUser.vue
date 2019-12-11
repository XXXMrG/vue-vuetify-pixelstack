<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <material-card class="card-tabs" color="myinfo">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span class="subheading font-weight-light mr-3" style="align-self: center">用户身份：</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>Users
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>Admin
              </v-tab>
              <v-spacer/>
              <v-btn small color="pink" bottom @click="dialogVisible = true">
                <v-icon>edit</v-icon>添加管理员
              </v-btn>
            </v-tabs>
          </v-flex>
          <v-flex xs4 offset-xs8>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-account-search"
              single-line
              hide-details
            />
          </v-flex>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="n in 2" :key="n">
              <v-data-table 
                :headers="headers" 
                :items="datas[n-1]" 
                :search="search" 
                :rows-per-page-items="[10, 15, 20]"
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>
                <template slot="items" slot-scope="{ item }">
                  <td>{{ item.uid }}</td>
                  <td>
                    <router-link :to="getPath(item.uid)">{{ item.username }}</router-link>
                  </td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.authority }}</td>
                  <td>
                    <v-edit-dialog lazy @save="save(item.uid, item.status)">
                      {{ item.status }}
                      <template v-slot:input>
                        <v-select v-model="item.status" :items="status" label="封禁或解封账户"/>
                      </template>
                    </v-edit-dialog>
                  </td>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
        <el-dialog :visible.sync="dialogVisible" title="增加管理员">
          <v-layout row wrap>
            <v-flex md6 offset-md3>
              <v-text-field v-model="adminname" color="myinfo" label="输入新管理员用户名"/>
            </v-flex>
            <v-flex md6 offset-md3>
              <v-text-field v-model="adminEmail" color="myinfo" label="输入新管理员邮箱"/>
            </v-flex>
            <v-flex md6 offset-md3>
              <v-text-field
                v-model="adminpwd"
                color="myinfo"
                label="设置密码"
                type="password"
                @keyup.enter="create"
              />
            </v-flex>
            <v-flex md6 offset-md3>
              <v-btn block color="pink" @click="create">新建管理员</v-btn>
            </v-flex>
          </v-layout>
        </el-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    tabs: 0,
    status: ["normal", "frozen", "terminate"],
    headers: [
      {
        sortable: false,
        text: "uid",
        value: "uid"
      },
      {
        sortable: false,
        text: " 用户名",
        value: "username"
      },
      {
        sortable: false,
        text: "用户邮箱",
        value: "email"
      },
      {
        sortable: false,
        text: "用户权限",
        value: "authority"
      },
      {
        sortable: false,
        text: "用户账号状态",
        value: "status"
      }
    ],
    // 用户信息数据格式
    users: [
      {
        uid: "",
        username: "",
        authority: "",
        email: "",
        status: ""
      }
    ],
    datas: [],
    // 控制弹窗
    dialogVisible: false,
    // 新增管理员信息的字段
    adminname: "",
    adminpwd: "",
    adminEmail: ""
  }),

  created: function() {
    this.initData()
  },

  methods: {
    // 保存修改后的用户状态
    save(uid, status) {
      console.log(uid, status);
      const json = '{"' + uid + '"' + ':"' + status + '"}';
      this.$api.admin
        .manageStatus(json)
        .then(res => {
          this.$message({
            type: "success",
            message: res.data.message
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async initData() {
      let list = await this.$api.admin.getUserList({type: 0})
      this.datas.push(list.data.userList)
      list = await this.$api.admin.getUserList({type: 1})
      this.datas.push(list.data.userList)
    },
    // 获取用户信息, type0 是普通用户 type1 是管理员
    getUser(type) {
      this.$api.admin
        .getUserList({
          type: type
        })
        .then(res => {
          this.datas.push(res.data.userList)
        })
        .catch(err => {});
    },
    // 获取用户主页路由
    getPath(uid) {
      return "/user-profile/" + uid + "/type/info";
    },
    // 添加管理员
    create() {
      this.$api.admin
        .createCount({
          username: this.adminname,
          email: this.adminEmail,
          password: this.adminpwd,
          authority: window.localStorage.authority
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              type: "success",
              message: "添加管理员成功"
            });
            this.dialogVisible = false;
            this.datas.pop()
            this.getUser(1);
          } else {
            this.$message.error(res.data.message);
            this.dialogVisible = false;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
