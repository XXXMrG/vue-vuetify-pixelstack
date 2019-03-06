<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <material-card class="card-tabs" color="myinfo">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span class="subheading font-weight-light mr-3" style="align-self: center">Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>Users
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>Admin
              </v-tab>
              <v-spacer></v-spacer>
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
            ></v-text-field>
          </v-flex>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="n in 2" :key="n">
              <v-data-table :headers="headers" :items="datas[n-1]" :search="search">
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>
                <template slot="items" slot-scope="{ item }">
                  <td>{{ item.uid }}</td>
                  <td>
                    <router-link :to="getPath(item.uid)">{{item.username}}</router-link>
                  </td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.authority }}</td>
                  <td>
                    <v-edit-dialog lazy @save="save(item.uid, item.status)">
                      {{ item.status }}
                      <template v-slot:input>
                        <v-select v-model="item.status" :items="status" label="封禁或解封账户"></v-select>
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
        <el-dialog title="增加管理员" :visible.sync="dialogVisible">
          <v-layout row wrap>
            <v-flex md6 offset-md3>
              <v-text-field color="myinfo" label="输入新管理员用户名" v-model="adminname"></v-text-field>
            </v-flex>
            <v-flex md6 offset-md3>
              <v-text-field color="myinfo" label="输入新管理员邮箱" v-model="adminEmail"></v-text-field>
            </v-flex>
            <v-flex md6 offset-md3>
              <v-text-field color="myinfo" label="设置密码" v-model="adminpwd" type="password" @keyup.enter="create"></v-text-field>
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
    users: [
      {
        uid: "Dakota Rice",
        username: "Niger",
        authority: "Oud-Tunrhout",
        email: "$35,738",
        status: "root"
      }
    ],
    datas: [[]],
    dialogVisible: false,
    adminname: "",
    adminpwd: "",
    admiEmail: ""
  }),

  created: function() {
    this.getUser(0);
    this.getUser(1);
  },

  methods: {
    save(uid, status) {
      console.log(uid, status);
      var json = '{"' + uid + '"' + ':"' + status + '"}';
      this.$api.admin
        .manageStatus(json)
        .then(res => {
          this.$message({
            type: "success",
            message: res.data.message
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUser(type) {
      this.$api.admin
        .getUserList({
          type: type
        })
        .then(res => {
          this.users = res.data.userList;
          this.datas[type] = this.users;
        })
        .catch(err => {});
    },
    getPath(uid) {
      return "/user-profile/" + uid + "/type/info";
    },
    create() {
      this.$api.admin
        .createCount({
          username: this.adminname,
          email: this.admiEmail,
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
